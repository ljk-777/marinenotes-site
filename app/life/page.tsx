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
        <h1>除了代码，<br />还有比赛日。</h1>
        <p>我是支持利物浦的球迷，也喜欢吉他、歌曲和旅行。这里先留下兴趣的线索；真正属于我的比赛与路途记忆，会继续按日期写下来。</p>
      </section>
      <div className="life-stories">
        {lifeTopics.map((interest) => (
          <section className="life-story" key={interest.number}>
            <figure className="life-story-art">
              <Image src={interest.cover.src} alt={interest.cover.alt} width={interest.cover.width ?? 1200} height={interest.cover.height ?? 900} />
              {interest.credit && <figcaption>2019 欧冠夺冠游行 · 资料照片，非本人拍摄。<a href={interest.credit.href} target="_blank" rel="noopener noreferrer">{interest.credit.label}</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a> · 缩放使用</figcaption>}
            </figure>
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
        <h2>照片可以借来，记忆要自己写。</h2>
        <p>这张克洛普在 2019 年夺冠游行中的照片，是给未来比赛笔记的一处起点。我的照片和故事，会等真实发生后再放进来。</p>
        <figure className="life-memory-photo">
          <Image src="/editorial/klopp-parade-2019.jpg" alt="克洛普在 2019 年利物浦欧冠夺冠游行中向球迷挥手" width={1280} height={853} />
          <figcaption>资料照片，非本人拍摄 · <a href="https://commons.wikimedia.org/wiki/File:Jurgen_Klopp_LFC_Parade_2019.jpg" target="_blank" rel="noopener noreferrer">Pete / 来源</a> · <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0</a> · 缩放使用</figcaption>
        </figure>
        <Link className="arrow-link" href="/notes">去读我的笔记 ↗</Link>
      </section>
    </main>
    </PageTransition>
  );
}
