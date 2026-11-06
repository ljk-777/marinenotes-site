import type { Metadata } from "next";
import Link from "next/link";
import { noteCategories } from "@/data/notes";
import { listPublicNotes } from "@/lib/public-notes";
import NoteCard from "@/components/NoteCard";
import PageTransition from "@/components/PageTransition";

type NotesPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export const metadata: Metadata = {
  title: "写作归档 | Marine Notes",
  description: "按日期阅读 Marine Notes 的生活随笔、学习记录和技术札记。",
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const publishedNotes = await listPublicNotes();
  const { category: requestedCategory } = await searchParams;
  const category = requestedCategory && requestedCategory in noteCategories
    ? requestedCategory as keyof typeof noteCategories
    : null;
  const filteredNotes = category
    ? publishedNotes.filter((note) => note.category === category)
    : publishedNotes;
  const years = [...new Set(filteredNotes.map((note) => note.publishedAt.slice(0, 4)))];

  return (
    <PageTransition>
    <main className="page-main interior-page">
      <section className="page-intro">
        <p className="overline">WRITING / 写作</p>
        <h1>有时间坐标的文字。</h1>
        <p>随笔、学习记录和技术札记。按时间翻阅，也按当时关心的主题走进来。</p>
      </section>
      <section className="archive-section">
        <div className="section-topline"><span>ARCHIVE / 归档</span><span>{filteredNotes.length} 篇已发表</span></div>
        <nav className="archive-filters" aria-label="文章分类">
          <Link href="/notes" aria-current={!category ? "page" : undefined}>全部</Link>
          {Object.entries(noteCategories).map(([key, label]) => (
            <Link key={key} href={`/notes?category=${key}`} aria-current={category === key ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        {filteredNotes.length ? years.map((year) => (
          <div className="archive-year" key={year}>
            <h2>{year}</h2>
            <div className="editorial-list">
              {filteredNotes.filter((note) => note.publishedAt.startsWith(year)).map((note) => <NoteCard key={note.slug} note={note} />)}
            </div>
          </div>
        )) : (
          <p className="archive-empty">这个分类还没有公开的文章。可以先看看其他笔记。</p>
        )}
      </section>
    </main>
    </PageTransition>
  );
}
