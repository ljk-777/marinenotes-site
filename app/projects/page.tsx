import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { publishedProjects } from "@/data/projects";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "作品与探索 | Marine Notes",
  description: "Marine 的项目、制作过程与正在探索的问题。",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
    <main className="page-main interior-page">
      <section className="page-intro">
        <p className="overline">WORK / 作品与探索</p>
        <h1>做出来，也想明白。</h1>
        <p>这里记录从问题到作品的路径。展示已经完成的部分，也保留正在学习和改进的过程。</p>
      </section>

      <section className="projects-section">
        <div className="section-topline"><span>SELECTED PROJECTS / 项目</span><span>{String(publishedProjects.length).padStart(2, "0")} 件作品</span></div>
        {publishedProjects.map((project) => (
          <Link className="project-index-item" href={`/projects/${project.slug}`} key={project.slug}>
            <div className="project-index-art" style={{ viewTransitionName: `project-cover-${project.slug}` }}><Image src={project.cover.src} alt={project.cover.alt} width={1200} height={900} /></div>
            <div className="project-index-copy">
              <span className="overline">{project.kicker}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <span className="project-status">{project.phase}</span>
              <span className="arrow-link">查看过程 ↗</span>
            </div>
          </Link>
        ))}
        {!publishedProjects.length && <p className="archive-empty">项目故事还在整理中。</p>}
      </section>

      <section className="explore-section">
        <div className="section-topline"><span>QUESTIONS / 正在探索</span><span>未完成也值得记录</span></div>
        <div className="explore-grid">
          <div><span>01 / WEB</span><h2>界面如何有温度？</h2><p>在结构清晰和视觉表达之间，寻找让人愿意继续阅读的平衡。</p></div>
          <div><span>02 / LEARNING</span><h2>怎样边做边学？</h2><p>把问题、尝试和修正留在现场，而不只展示最后的答案。</p></div>
        </div>
      </section>
    </main>
    </PageTransition>
  );
}
