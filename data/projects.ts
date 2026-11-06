import { newestFirst, type ContentRecord, type CoverImage } from "@/data/content";

export const projectCategories = {
  website: "网站",
} as const;

type ProjectCategory = keyof typeof projectCategories;

export type Project = ContentRecord<ProjectCategory, {
  kicker: string;
  phase: string;
  role: string;
  stack: string[];
  cover: CoverImage;
  links: { label: string; href: string }[];
  sections: { title: string; body: string }[];
}>;

export type PublishedProject = Extract<Project, { status: "published" }>;

export const projects: Project[] = [
  {
    slug: "marine-notes",
    title: "Marine Notes",
    kicker: "PERSONAL WEBSITE / 2026 — NOW",
    summary: "从一页静态网页开始，逐步搭建记录项目、学习和生活的个人空间。",
    category: "website",
    tags: ["个人网站", "设计", "开发"],
    status: "published",
    publishedAt: "2026",
    phase: "持续迭代",
    role: "设计与开发",
    stack: ["Next.js", "TypeScript", "MDX", "Vercel"],
    cover: {
      src: "/editorial/project.svg",
      alt: "Marine Notes 网站的原创界面插画",
    },
    links: [
      { label: "访问网站", href: "https://marinenotes.me" },
      { label: "查看代码", href: "https://github.com/ljk-777/marinenotes-site" },
    ],
    sections: [
      {
        title: "为什么做",
        body: "我想有一个属于自己的地方，不只存放最终成果，也留下学习过程、未完成的想法和生活里的片刻。",
      },
      {
        title: "如何构建",
        body: "项目从静态页面起步，迁移到 Next.js，并用 MDX 保存第一篇文章。设计从手写 M 出发，逐步形成更完整的图文语言。",
      },
      {
        title: "接下来",
        body: "继续完善作品与文章结构，让记录变得更容易，也让每个页面能随着真实内容自然生长。",
      },
    ],
  },
];

export const publishedProjects = newestFirst(
  projects.filter((project): project is PublishedProject => project.status === "published"),
);

export function getPublishedProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
