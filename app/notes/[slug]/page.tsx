import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { notes } from "@/data/notes";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const mdxNotes = {
  "first-note": () => import("@/content/notes/first-note.mdx"),
};

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    notFound();
  }

  const loadMdxNote = mdxNotes[slug as keyof typeof mdxNotes];
  let MdxContent: ComponentType | null = null;

  if (loadMdxNote) {
    const imported = await loadMdxNote();
    MdxContent = imported.default;
  }

  return (
    <main>
      <SiteNav />

      <article className="note-page">
        <p className="eyebrow">{note.date}</p>
        <h1>{note.title}</h1>
        <p className="intro">{note.summary}</p>

        <div className="note-body">
          {MdxContent ? (
            <MdxContent />
          ) : (
            note.content?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
