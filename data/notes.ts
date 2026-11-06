import type { ComponentType } from "react";
import { newestFirst, type ContentRecord } from "@/data/content";

export const noteCategories = {
  essay: "生活随笔",
  learning: "学习记录",
  technology: "技术札记",
} as const;

type NoteCategory = keyof typeof noteCategories;
type MdxModule = { default: ComponentType };

export type Note = ContentRecord<NoteCategory, {
  loadBody: () => Promise<MdxModule>;
}>;

export type PublishedNote = Extract<Note, { status: "published" }>;

export const notes: Note[] = [
  {
    slug: "first-note",
    publishedAt: "2026-06",
    category: "essay",
    tags: ["建站", "开始"],
    title: "Starting this small corner of the internet",
    summary:
      "The first version of Marine Notes is live. This is where I begin collecting small thoughts, study traces, and project notes.",
    status: "published",
    loadBody: () => import("@/content/notes/first-note.mdx"),
  },
  {
    slug: "coming-soon",
    category: "essay",
    tags: [],
    title: "More notes are on the way",
    summary:
      "More writing will arrive here gradually, one note at a time, as this site grows with me.",
    status: "draft",
    loadBody: () => import("@/content/notes/coming-soon.mdx"),
  },
];

export const publishedNotes = newestFirst(
  notes.filter((note): note is PublishedNote => note.status === "published"),
);

export function getPublishedNote(slug: string) {
  return publishedNotes.find((note) => note.slug === slug);
}
