import "server-only";

import { createClient } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { newestFirst, type CoverImage } from "@/data/content";
import { getPublishedNote, noteCategories, publishedNotes, type PublishedNote } from "@/data/notes";

type NoteCategory = keyof typeof noteCategories;

export type NoteSummary = {
  slug: string;
  title: string;
  summary: string;
  category: NoteCategory;
  tags: string[];
  publishedAt: string;
  cover?: CoverImage;
};

export type NoteDetail =
  | (NoteSummary & { source: "mdx"; loadBody: PublishedNote["loadBody"] })
  | (NoteSummary & { source: "sanity"; body: PortableTextBlock[] });

type SanityPost = Omit<NoteSummary, "category" | "cover"> & {
  category: string;
  cover?: CoverImage;
  body?: PortableTextBlock[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-06-01", useCdn: false, perspective: "published" })
  : null;

const postFields = `
  "slug": slug.current,
  title,
  summary,
  category,
  "tags": coalesce(tags, []),
  publishedAt,
  "cover": select(defined(cover.asset) => {
    "src": cover.asset->url,
    "alt": cover.alt,
    "width": cover.asset->metadata.dimensions.width,
    "height": cover.asset->metadata.dimensions.height
  })
`;

const allPostsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {${postFields}}`;
const onePostQuery = `*[_type == "post" && slug.current == $slug && defined(publishedAt)][0] {
  ${postFields},
  body[]{
    ...,
    _type == "image" => {
      "src": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
}`;

function isCategory(value: string): value is NoteCategory {
  return Object.hasOwn(noteCategories, value);
}

function toSummary(post: SanityPost): NoteSummary | null {
  if (!post.slug || !post.title || !post.summary || !post.publishedAt || !isCategory(post.category)) return null;

  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category,
    tags: Array.isArray(post.tags) ? post.tags : [],
    publishedAt: post.publishedAt,
    cover: post.cover?.src && post.cover?.alt ? post.cover : undefined,
  };
}

function localSummary(note: PublishedNote): NoteSummary {
  const { slug, title, summary, category, tags, publishedAt, cover } = note;
  return { slug, title, summary, category, tags, publishedAt, cover };
}

export async function listPublicNotes(): Promise<NoteSummary[]> {
  const merged = new Map(publishedNotes.map((note) => [note.slug, localSummary(note)]));

  if (client) {
    try {
      const posts = await client.fetch<SanityPost[]>(allPostsQuery, {}, { next: { revalidate: 60 } });
      for (const post of posts) {
        const summary = toSummary(post);
        if (summary) merged.set(summary.slug, summary);
      }
    } catch (error) {
      console.error("Could not load published Sanity posts; showing local notes.", error);
    }
  }

  return newestFirst([...merged.values()]);
}

export async function getPublicNote(slug: string): Promise<NoteDetail | null> {
  if (client) {
    try {
      const post = await client.fetch<SanityPost | null>(onePostQuery, { slug }, { next: { revalidate: 60 } });
      const summary = post && toSummary(post);
      if (summary && Array.isArray(post.body)) return { ...summary, source: "sanity", body: post.body };
    } catch (error) {
      console.error(`Could not load Sanity post ${slug}; checking local notes.`, error);
    }
  }

  const local = getPublishedNote(slug);
  return local ? { ...localSummary(local), source: "mdx", loadBody: local.loadBody } : null;
}
