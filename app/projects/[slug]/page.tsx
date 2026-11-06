import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProject, publishedProjects } from "@/data/projects";
import PageTransition from "@/components/PageTransition";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  return { title: project ? `${project.title} | Marine Notes` : "项目未找到", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();

  return (
    <PageTransition>
    <main className="page-main interior-page">
      <article className="project-detail">
        <Link className="back-link" href="/projects">← 返回作品</Link>
        <p className="overline">{project.kicker}</p>
        <h1>{project.title}</h1>
        <p className="project-detail-lead">{project.summary}</p>
        <div className="project-detail-art" style={{ viewTransitionName: `project-cover-${project.slug}` }}><Image src={project.cover.src} alt={project.cover.alt} width={1200} height={900} priority /></div>
        <dl className="project-facts">
          <div><dt>状态</dt><dd>{project.phase}</dd></div>
          <div><dt>我的角色</dt><dd>{project.role}</dd></div>
          <div><dt>使用技术</dt><dd>{project.stack.join(" · ")}</dd></div>
        </dl>
        <div className="project-story">
          {project.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        </div>
        <div className="project-outlinks">
          {project.links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
        </div>
      </article>
    </main>
    </PageTransition>
  );
}
