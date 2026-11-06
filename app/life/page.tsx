import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { formatContentDate } from "@/data/content";
import { lifeCategories, lifeTopics, publishedLifeEntries } from "@/data/life";

export const metadata: Metadata = {
  title: "生活手帖 | Marine Notes",
  description: "足球、吉他、歌曲和路上的记忆。",
};

export default function LifePage() {
  return (
    <PageTransition>
    <main className="page-main interior-page">
      <section className="page-intro">
        <p className="overline">LIFE / 生活手帖</p>
        <h1>认真记录，也认真生活。</h1>
        <p>球场、琴弦、喜欢的歌曲和路途。这里先收下兴趣，具体的故事会随着真实的照片与文字慢慢长出来。</p>
      </section>
      <div className="life-stories">
        {lifeTopics.map((interest) => (
          <section className="life-story" key={interest.number}>
            <div className="life-story-art"><Image src={interest.cover.src} alt={interest.cover.alt} width={1200} height={900} /></div>
            <div className="life-story-copy">
              <span className="overline">{interest.number} / {interest.label}</span>
              <h2>{interest.title}</h2>
              <p>{interest.description}</p>
            </div>
          </section>
        ))}
      </div>
      <section className="life-archive" aria-labelledby="life-archive-title">
        <div className="section-topline"><span>MEMORIES / 生活记录</span><span>{publishedLifeEntries.length} 则记录</span></div>
        <h2 id="life-archive-title" className="section-title">留给时间的片段。</h2>
        {publishedLifeEntries.length ? (
          <div className="memory-list">
            {publishedLifeEntries.map((entry) => (
              <Link className="memory-entry" href={`/life/${entry.slug}`} key={entry.slug}>
                <time dateTime={entry.publishedAt}>{formatContentDate(entry.publishedAt)}</time>
                <div>
                  <span>{lifeCategories[entry.category]}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="life-archive-empty">这里还没有公开的生活记录。等有了真实的故事和照片，它们会按日期出现在这里。</p>
        )}
      </section>
      <section className="life-bridge">
        <span className="overline">MEMORIES / 记忆</span>
        <h2>真正的相册，需要真正的照片。</h2>
        <p>这里暂时用原创插画表达主题；之后加入自己的照片与文字，让记录慢慢长出来。</p>
        <Link className="arrow-link" href="/notes">先去读一篇笔记 ↗</Link>
      </section>
    </main>
    </PageTransition>
  );
}
