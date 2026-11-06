import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import { formatContentDate } from "@/data/content";
import { getPublishedLifeEntry, lifeCategories, publishedLifeEntries } from "@/data/life";

type LifeEntryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedLifeEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: LifeEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPublishedLifeEntry(slug);
  return { title: entry ? `${entry.title} | Marine Notes` : "记录未找到", description: entry?.summary };
}

export default async function LifeEntryPage({ params }: LifeEntryPageProps) {
  const { slug } = await params;
  const entry = getPublishedLifeEntry(slug);
  if (!entry) notFound();

  return (
    <PageTransition>
      <main className="page-main interior-page">
        <article className="article-page">
          <Link className="back-link" href="/life">← 返回生活手帖</Link>
          <p className="overline">{lifeCategories[entry.category]} / <time dateTime={entry.publishedAt}>{formatContentDate(entry.publishedAt)}</time></p>
          <h1>{entry.title}</h1>
          <p className="article-lead">{entry.summary}</p>
          {entry.cover && <div className="article-cover"><Image src={entry.cover.src} alt={entry.cover.alt} width={1200} height={900} /></div>}
          <div className="article-body">
            {entry.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="article-end"><span>END OF MEMORY</span><Link href="/life">继续翻阅 ↗</Link></div>
        </article>
      </main>
    </PageTransition>
  );
}
