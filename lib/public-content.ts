import "server-only";

import type { PortableTextBlock } from "@portabletext/react";
import { createClient } from "next-sanity";
import { newestFirst, type CoverImage } from "@/data/content";
import { lifeCategories, publishedLifeEntries, type LifeCategory } from "@/data/life";
import { projectCategories, publishedProjects, type PublishedProject } from "@/data/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-06-01", useCdn: false, perspective: "published" })
  : null;

type ProjectImage = CoverImage & { caption?: string };
export type PublicProject = PublishedProject & { gallery?: ProjectImage[]; spotlight?: boolean; source?: "sanity" };
type SanityProject = Omit<PublicProject, "status" | "category" | "cover" | "source"> & {
  category: string;
  cover?: CoverImage;
};

export type LifeSummary = {
  slug: string;
  title: string;
  summary: string;
  category: LifeCategory;
  publishedAt: string;
  cover?: CoverImage;
};
export type LifeDetail = LifeSummary & (
  | { source: "local"; body: string[] }
  | { source: "sanity"; body: PortableTextBlock[] }
);
type SanityLife = Omit<LifeSummary, "category"> & { category: string; body?: PortableTextBlock[] };

const imageFields = `"src": asset->url, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height`;
const projectFields = `
  "slug": slug.current, title, summary, category, publishedAt, kicker, phase, role,
  "stack": coalesce(stack, []), "tags": coalesce(tags, []),
  "spotlight": coalesce(spotlight, false),
  "cover": select(defined(cover.asset) => {${imageFields}}),
  "gallery": coalesce(gallery[defined(asset)]{${imageFields}, caption}, []),
  "links": coalesce(links[]{label, href}, []),
  "sections": coalesce(sections[]{title, body}, [])
`;
const lifeFields = `
  "slug": slug.current, title, summary, category, publishedAt,
  "cover": select(defined(cover.asset) => {${imageFields}})
`;
const allProjectsQuery = `*[_type == "project" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {${projectFields}}`;
const oneProjectQuery = `*[_type == "project" && slug.current == $slug && defined(publishedAt)][0] {${projectFields}}`;
const allLifeQuery = `*[_type == "lifeEntry" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {${lifeFields}}`;
const oneLifeQuery = `*[_type == "lifeEntry" && slug.current == $slug && defined(publishedAt)][0] {
  ${lifeFields},
  body[]{..., _type == "image" => {${imageFields}}}
}`;

function isProjectCategory(value: string): value is PublishedProject["category"] {
  return Object.hasOwn(projectCategories, value);
}

function isLifeCategory(value: string): value is LifeCategory {
  return Object.hasOwn(lifeCategories, value);
}

function toProject(item: SanityProject): PublicProject | null {
  if (!item.slug || !item.title || !item.summary || !item.publishedAt || !item.kicker || !item.phase || !item.role || !isProjectCategory(item.category) || !item.cover?.src || !item.cover.alt || !Array.isArray(item.stack) || !Array.isArray(item.sections) || !item.sections.length) return null;

  return {
    slug: item.slug, title: item.title, summary: item.summary, category: item.category,
    publishedAt: item.publishedAt, status: "published", kicker: item.kicker,
    phase: item.phase, role: item.role, stack: item.stack,
    tags: Array.isArray(item.tags) ? item.tags : [], cover: item.cover,
    links: Array.isArray(item.links) ? item.links.filter((link) => link?.label && /^https?:\/\//.test(link.href)) : [],
    sections: item.sections.filter((section) => section?.title && section?.body),
    gallery: Array.isArray(item.gallery) ? item.gallery.filter((image) => image?.src && image?.alt) : [],
    spotlight: item.spotlight === true, source: "sanity",
  };
}

function toLifeSummary(item: SanityLife): LifeSummary | null {
  if (!item.slug || !item.title || !item.summary || !item.publishedAt || !isLifeCategory(item.category)) return null;
  return {
    slug: item.slug, title: item.title, summary: item.summary,
    publishedAt: item.publishedAt, category: item.category,
    cover: item.cover?.src && item.cover.alt ? item.cover : undefined,
  };
}

export async function listPublicProjects(): Promise<PublicProject[]> {
  const merged = new Map<string, PublicProject>(publishedProjects.map((project) => [project.slug, project]));
  if (client) {
    try {
      const items = await client.fetch<SanityProject[]>(allProjectsQuery, {}, { next: { revalidate: 60 } });
      for (const item of items) {
        const project = toProject(item);
        if (project) merged.set(project.slug, project);
      }
    } catch (error) {
      console.error("Could not load Sanity projects; showing local projects.", error);
    }
  }
  return newestFirst([...merged.values()]);
}

export async function getPublicProject(slug: string): Promise<PublicProject | null> {
  if (client) {
    try {
      const item = await client.fetch<SanityProject | null>(oneProjectQuery, { slug }, { next: { revalidate: 60 } });
      if (item) {
        const project = toProject(item);
        if (project) return project;
      }
    } catch (error) {
      console.error(`Could not load Sanity project ${slug}; checking local projects.`, error);
    }
  }
  return publishedProjects.find((project) => project.slug === slug) || null;
}

export async function listPublicLifeEntries(): Promise<LifeSummary[]> {
  const merged = new Map<string, LifeSummary>(publishedLifeEntries.map((entry) => [entry.slug, entry]));
  if (client) {
    try {
      const items = await client.fetch<SanityLife[]>(allLifeQuery, {}, { next: { revalidate: 60 } });
      for (const item of items) {
        const entry = toLifeSummary(item);
        if (entry) merged.set(entry.slug, entry);
      }
    } catch (error) {
      console.error("Could not load Sanity life entries; showing local entries.", error);
    }
  }
  return newestFirst([...merged.values()]);
}

export async function getPublicLifeEntry(slug: string): Promise<LifeDetail | null> {
  if (client) {
    try {
      const item = await client.fetch<SanityLife | null>(oneLifeQuery, { slug }, { next: { revalidate: 60 } });
      const summary = item && toLifeSummary(item);
      if (summary && Array.isArray(item.body)) return { ...summary, source: "sanity", body: item.body };
    } catch (error) {
      console.error(`Could not load Sanity life entry ${slug}; checking local entries.`, error);
    }
  }
  const local = publishedLifeEntries.find((entry) => entry.slug === slug);
  return local ? { ...local, source: "local", body: local.body } : null;
}
