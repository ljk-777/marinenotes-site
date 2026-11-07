import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { activeProjects, publishedProjects } from "@/data/projects";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "作品与探索 | Marine Notes",
  description: "Marine 的项目、制作过程与正在探索的问题。",
};

export default function ProjectsPage() {
  const otherProjects = publishedProjects.filter(
    (project) => !activeProjects.some((active) => active.slug === project.slug),
  );

  return (
    <PageTransition>
    <main className="page-main interior-page">
      <section className="page-intro">
        <p className="overline">MARINE / PROJECT INDEX</p>
        <h1>我做过的，<br />和正在做的。</h1>
        <p>从个人网站到旅行规划，再到游戏和系统方向的尝试。这里不是一份只写结果的清单，也会留下项目怎样发生。</p>
      </section>

      <section className="projects-section" aria-labelledby="project-spotlight-title">
        <div className="section-topline"><span>IN FOCUS / 正在深入</span><span>协作研究与实现</span></div>
        <h2 id="project-spotlight-title" className="section-title">两条正在走的路。</h2>
        <p className="projects-intro">在 Minecraft 里训练战斗智能体，也在 FPGA 上搭起一套 RISC-V 系统。这里展示团队仓库里的真实进展，并持续补充我的负责部分。</p>
        <div className="project-spotlight-grid">
          {activeProjects.map((project, index) => (
            <Link className="project-spotlight-item" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="project-spotlight-art" style={{ viewTransitionName: `project-cover-${project.slug}` }}>
                <Image src={project.cover.src} alt={project.cover.alt} width={1200} height={900} priority={index === 0} />
              </div>
              <div className="project-spotlight-meta"><span>0{index + 1} / {project.kicker}</span><span>{project.phase}</span></div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="arrow-link">走进项目 ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="project-archive" aria-labelledby="project-archive-title">
        <div className="section-topline"><span>ALSO MADE / 也做过这些</span><span>{String(otherProjects.length).padStart(2, "0")} 个项目</span></div>
        <h2 id="project-archive-title" className="section-title">从自己的网页，到一张旅行地图。</h2>
        <div className="project-archive-list">
          {otherProjects.map((project, index) => (
            <Link className="project-archive-row" href={`/projects/${project.slug}`} key={project.slug}>
              <span className="project-archive-number">0{index + 1}</span>
              <div><h3>{project.title}</h3><p>{project.summary}</p></div>
              <span className="project-archive-phase">{project.phase}</span>
              <span className="project-archive-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
    </PageTransition>
  );
}
