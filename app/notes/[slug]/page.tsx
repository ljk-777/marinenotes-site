import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatContentDate } from "@/data/content";
import { noteCategories, publishedNotes } from "@/data/notes";
import { getPublicNote } from "@/lib/public-notes";
import NoteBody from "@/components/NoteBody";
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publishedNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getPublicNote(slug);
  return { title: note ? `${note.title} | Marine Notes` : "文章未找到", description: note?.summary };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getPublicNote(slug);

  if (!note) {
    notFound();
  }

  const MdxContent = note.source === "mdx" ? (await note.loadBody()).default : null;

  return (
    <PageTransition>
    <main className="page-main interior-page">
      <article className="article-page">
        <Link className="back-link" href="/notes">← 返回写作归档</Link>
        <p className="overline">{noteCategories[note.category]} / <time dateTime={note.publishedAt}>{formatContentDate(note.publishedAt)}</time></p>
        <h1>{note.title}</h1>
        <p className="article-lead">{note.summary}</p>
        {note.cover && <div className="article-cover"><Image src={note.cover.src} alt={note.cover.alt} width={note.cover.width || 1200} height={note.cover.height || 900} sizes="(max-width: 760px) 100vw, 1200px" /></div>}

        <div className="article-body">
          {MdxContent ? <MdxContent /> : note.source === "sanity" ? <NoteBody body={note.body} /> : null}
        </div>
        <div className="article-end"><span>END OF NOTE</span><Link href="/notes">继续翻阅 ↗</Link></div>
      </article>
    </main>
    </PageTransition>
  );
}
