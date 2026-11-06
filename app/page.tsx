import Image from "next/image";
import Link from "next/link";
import StoryGallery from "@/components/StoryGallery";
import NoteCard from "@/components/NoteCard";
import PageTransition from "@/components/PageTransition";
import { publishedProjects } from "@/data/projects";
import { listPublicNotes } from "@/lib/public-notes";

export default async function Home() {
  const featuredProject = publishedProjects[0];
  const publishedNotes = await listPublicNotes();

  return (
    <PageTransition>
    <main className="page-main">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-words">
          <p className="overline">A PERSONAL FIELD NOTES / 一本仍在写的笔记</p>
          <h1 id="home-title">写下正在<br /><em>发生的事。</em></h1>
          <p className="hero-description">我是 Marine，一个边学习、边制作、边记录的学生。这里有做过的项目，也有生活里不想忘记的片刻。</p>
          <div className="hero-cta">
            <Link className="pill-button" href="/projects">看看作品 <span aria-hidden="true">↗</span></Link>
            <Link className="quiet-link" href="/notes">从文字开始 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-art">
          <Image src="/editorial/hero.svg" alt="纸页、海色弧线与日光组成的原创插画" width={1200} height={1100} priority />
          <span className="hero-art-caption">NOTES FROM SOMEWHERE IN BETWEEN</span>
        </div>
        <a className="scroll-cue" href="#chapters">继续向下 <span aria-hidden="true">↓</span></a>
      </section>

      <StoryGallery />

      <section className="feature-section" aria-labelledby="project-title">
        <div className="section-topline"><span>SELECTED WORK / 精选作品</span><span>{featuredProject ? `01 / ${featuredProject.phase}` : "即将更新"}</span></div>
        <div className="feature-heading">
          <h2 id="project-title" className="section-title">从一个自己的空间开始。</h2>
          <Link className="arrow-link" href="/projects">所有作品 ↗</Link>
        </div>
        {featuredProject ? <Link className="project-feature" href={`/projects/${featuredProject.slug}`}>
          <div className="project-feature-art" style={{ viewTransitionName: `project-cover-${featuredProject.slug}` }}>
            <Image src={featuredProject.cover.src} alt={featuredProject.cover.alt} width={1200} height={900} />
          </div>
          <div className="project-feature-copy">
            <p className="overline">{featuredProject.kicker}</p>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.summary}</p>
            <span className="arrow-link">阅读项目故事 ↗</span>
          </div>
        </Link> : <p className="archive-empty">作品故事还在整理中。</p>}
      </section>

      <section className="focus-section" aria-labelledby="focus-title">
        <div>
          <p className="overline">CURRENT FOCUS / 正在探索</p>
          <h2 id="focus-title" className="section-title">学习，不只发生在完成之后。</h2>
        </div>
        <div className="focus-list">
          <p><span>01</span> 如何让一个网站既能展示作品，也能保存真实的生活？</p>
          <p><span>02</span> 图文与滚动如何帮助叙事，而不是打断阅读？</p>
          <p><span>03</span> 怎样建立一套愿意长期使用的写作方式？</p>
        </div>
      </section>

      <section className="latest-section" aria-labelledby="latest-title">
        <div className="section-topline"><span>RECENT WRITING / 最近写下</span><span>按时间收藏</span></div>
        <div className="feature-heading">
          <h2 id="latest-title" className="section-title">慢慢写，慢慢积累。</h2>
          <Link className="arrow-link" href="/notes">打开归档 ↗</Link>
        </div>
        <div className="editorial-list">
          {publishedNotes.slice(0, 3).map((note) => <NoteCard key={note.slug} note={note} />)}
        </div>
      </section>

      <section className="life-teaser" aria-labelledby="life-title">
        <div>
          <p className="overline">OFF THE PAGE / 生活的一角</p>
          <h2 id="life-title" className="section-title">球场、琴弦、沿途。</h2>
          <p>除了项目与代码，也想留下支持利物浦的热情、喜欢的音乐和那些值得回看的路途。</p>
          <Link className="arrow-link" href="/life">进入生活手帖 ↗</Link>
        </div>
        <Image src="/editorial/life.svg" alt="足球、吉他和旅途元素组成的原创插画" width={1200} height={900} />
      </section>
    </main>
    </PageTransition>
  );
}
