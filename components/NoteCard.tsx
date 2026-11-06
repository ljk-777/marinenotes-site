import Link from "next/link";
import { formatContentDate } from "@/data/content";
import { noteCategories } from "@/data/notes";
import type { NoteSummary } from "@/lib/public-notes";

export default function NoteCard({ note }: { note: NoteSummary }) {
  return (
    <article className="archive-item">
      <div className="archive-item-meta">
        <time dateTime={note.publishedAt}>{formatContentDate(note.publishedAt)}</time>
        <span>{noteCategories[note.category]}</span>
      </div>
      <div className="archive-item-content">
        <h3><Link href={`/notes/${note.slug}`}>{note.title}</Link></h3>
        <p>{note.summary}</p>
      </div>
      <Link className="archive-item-arrow" href={`/notes/${note.slug}`} aria-label={`阅读 ${note.title}`}>↗</Link>
    </article>
  );
}
