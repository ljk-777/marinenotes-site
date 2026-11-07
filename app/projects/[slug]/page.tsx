import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedProjects } from "@/data/projects";
import PageTransition from "@/components/PageTransition";
import { getPublicProject, listPublicProjects } from "@/lib/public-content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProject(slug);
  return { title: project ? `${project.title} | Marine Notes` : "项目未找到", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublicProject(slug);
  if (!project) notFound();
  const allProjects = await listPublicProjects();
  const nextProject = allProjects[(allProjects.findIndex((item) => item.slug === slug) + 1) % allProjects.length];

  return (
    <PageTransition>
    <main className="page-main interior-page">
      <article className="project-detail">
        <Link className="back-link" href="/projects">← 返回作品</Link>
        <div className="project-detail-heading">
          <div>
            <p className="overline">{project.kicker}</p>
            <h1>{project.title}</h1>
            <p className="project-detail-lead">{project.summary}</p>
          </div>
          <div className="project-detail-side">
            <span className="project-detail-phase">{project.phase}</span>
            <div className="project-detail-actions">
              {project.links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
            </div>
          </div>
        </div>
        <figure className="project-detail-figure">
          <div className="project-detail-art" style={{ viewTransitionName: `project-cover-${project.slug}` }}><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width || 1200} height={project.cover.height || 900} priority /></div>
          <figcaption>{project.source === "sanity" ? project.cover.alt : project.slug === "marine-notes" ? "Marine Notes 的原创界面插画。" : "视觉示意图，非运行截图；实现与验证请以仓库为准。"}</figcaption>
        </figure>
        <dl className="project-facts">
          <div><dt>状态</dt><dd>{project.phase}</dd></div>
          <div><dt>我的角色</dt><dd>{project.role}</dd></div>
          <div><dt>使用技术</dt><dd>{project.stack.join(" · ")}</dd></div>
        </dl>
        <div className="project-story-heading">
          <span className="overline">FIELD NOTES / 项目笔记</span>
          <p>从目标、实现到下一步，留下这项工作的真实轨迹。</p>
        </div>
        <div className="project-story">
          {project.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        </div>
        {!!project.gallery?.length && <div className="project-gallery">
          {project.gallery.map((image) => <figure key={image.src}>
            <Image src={image.src} alt={image.alt} width={image.width || 1200} height={image.height || 900} sizes="(max-width: 760px) 100vw, 960px" />
            <figcaption>{image.caption || image.alt}</figcaption>
          </figure>)}
        </div>}
        <Link className="project-next" href={`/projects/${nextProject.slug}`}>
          <span>下一份项目记录</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </article>
    </main>
    </PageTransition>
  );
}
