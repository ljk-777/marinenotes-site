import Image from "next/image";
import Link from "next/link";
import StoryGallery from "@/components/StoryGallery";
import NoteCard from "@/components/NoteCard";
import PageTransition from "@/components/PageTransition";
import { listPublicProjects } from "@/lib/public-content";
import { listPublicNotes } from "@/lib/public-notes";

export default async function Home() {
  const [publishedProjects, publishedNotes] = await Promise.all([listPublicProjects(), listPublicNotes()]);
  const activeProjects = publishedProjects.filter((project) => project.spotlight ?? (project.slug === "minecombat" || project.slug === "riscv-minisys"));
  const featuredProject = publishedProjects.find((project) => project.slug === "waylog") || publishedProjects[0];

  return (
    <PageTransition>
    <main className="page-main">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-words">
          <p className="overline">MARINE / STUDENT · BUILDER · WRITER</p>
          <h1 id="home-title">你好，我是<br /><em>Marine。</em></h1>
          <p className="hero-description">一个还在学习的学生。我把想法做成项目，也把比赛日、琴弦和路上的片刻写进这本笔记。</p>
          <div className="hero-cta">
            <Link className="pill-button" href="/projects">看看我在做什么 <span aria-hidden="true">↗</span></Link>
            <Link className="quiet-link" href="/about">多认识我一点 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-art">
          <Image src="/editorial/hero.svg" alt="纸页、海色弧线与日光组成的原创插画" width={1200} height={1100} priority />
          <span className="hero-art-caption">A WORK IN PROGRESS, BY MARINE</span>
        </div>
        <a className="scroll-cue" href="#chapters">继续向下 <span aria-hidden="true">↓</span></a>
      </section>

      <StoryGallery />

      <section className="feature-section" aria-labelledby="project-title">
        <div className="section-topline"><span>ON MY DESK / 项目现场</span><span>{featuredProject ? featuredProject.phase : "即将更新"}</span></div>
        <div className="feature-heading">
          <h2 id="project-title" className="section-title">把旅行，做成一张可以探索的地图。</h2>
          <Link className="arrow-link" href="/projects">所有项目 ↗</Link>
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

      <section className="desk-section" aria-labelledby="desk-title">
        <div className="section-topline"><span>STILL IN THE MAKING / 仍在进行</span><span>协作项目</span></div>
        <div className="feature-heading">
          <h2 id="desk-title" className="section-title">一边训练智能体，一边造处理器。</h2>
          <Link className="arrow-link" href="/projects">更多项目 ↗</Link>
        </div>
        <div className="desk-grid">
          {activeProjects.map((project) => (
            <Link className="desk-item" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="desk-art"><Image src={project.cover.src} alt={project.cover.alt} width={1200} height={900} /></div>
              <div className="desk-copy"><span className="overline">{project.kicker}</span><h3>{project.title}</h3><p>{project.summary}</p><span className="desk-arrow">阅读项目 ↗</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="latest-section" aria-labelledby="latest-title">
        <div className="section-topline"><span>RECENT WRITING / 最近写下</span><span>按时间收藏</span></div>
        <div className="feature-heading">
          <h2 id="latest-title" className="section-title">学习之后，记下留下来的问题。</h2>
          <Link className="arrow-link" href="/notes">打开归档 ↗</Link>
        </div>
        <div className="editorial-list">
          {publishedNotes.slice(0, 3).map((note) => <NoteCard key={note.slug} note={note} />)}
        </div>
      </section>

      <section className="life-teaser" aria-labelledby="life-title">
        <div>
          <p className="overline">OFF THE PAGE / 生活的一角</p>
          <h2 id="life-title" className="section-title">红色的比赛日，也是我的一部分。</h2>
          <p>利物浦、吉他、喜欢的歌曲和路上的光。这里不只放作品，也放那些让我愿意反复回看的时刻。</p>
          <Link className="arrow-link" href="/life">进入生活手帖 ↗</Link>
        </div>
        <figure className="life-teaser-photo">
          <Image src="/editorial/liverpool-parade-2019.jpg" alt="利物浦球员在 2019 年欧冠夺冠游行的敞篷巴士上庆祝" width={1280} height={854} />
          <figcaption>2019 欧冠夺冠游行 · 资料照片，非本人拍摄。<a href="https://commons.wikimedia.org/wiki/File:LFC_Parade_2019_01.jpg" target="_blank" rel="noopener noreferrer">Eric The Fish / 来源</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a> · 缩放使用</figcaption>
        </figure>
      </section>
    </main>
    </PageTransition>
  );
}
