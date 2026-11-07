"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postType } from "./sanity/schemaTypes/post";
import { projectType } from "./sanity/schemaTypes/project";
import { lifeEntryType } from "./sanity/schemaTypes/lifeEntry";

export default defineConfig({
  name: "marine-notes",
  title: "Marine Notes",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aaaaaaaa",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: [postType, projectType, lifeEntryType] },
});
