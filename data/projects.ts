import { newestFirst, type ContentRecord, type CoverImage } from "@/data/content";

export const projectCategories = {
  website: "网站",
  application: "应用",
  research: "研究",
  systems: "系统",
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
    slug: "waylog",
    title: "迹刻 Waylog",
    kicker: "COURSE PROJECT / TRAVEL PLANNING",
    summary: "一项旅行规划课程项目：将路线算法、景点发现和 3D 地球放进同一段旅行体验。",
    category: "application",
    tags: ["旅行规划", "算法", "前后端"],
    status: "published",
    publishedAt: "2026",
    phase: "课程项目 · 持续整理",
    role: "课程项目参与开发",
    stack: ["React", "Three.js", "Node.js", "PostgreSQL"],
    cover: {
      src: "/editorial/waylog.svg",
      alt: "路线、地球轨迹和旅行坐标组成的 Waylog 概念插画",
    },
    links: [
      { label: "查看代码仓库", href: "https://github.com/ljk-777/our-tour-system-project" },
    ],
    sections: [
      {
        title: "项目在做什么",
        body: "课程项目围绕旅行的发现与规划展开：景点检索、推荐、路线与日记被组织在同一套体验中。这里先展示仓库中已经公开的内容。",
      },
      {
        title: "值得继续拆解的部分",
        body: "仓库文档列出了 Dijkstra 路线规划、Top-K 推荐、Trie 前缀搜索与 KMP 日记检索，也包含 3D 地球和前后端页面。我会继续把自己负责的实现过程和取舍补充进来。",
      },
      {
        title: "还要补上",
        body: "这页暂时不是完整的项目复盘。下一步会补充我个人负责的模块、关键界面截图和遇到的问题，避免只罗列功能。",
      },
    ],
  },
  {
    slug: "minecombat",
    title: "MineCombat",
    kicker: "TEAM RESEARCH / MINECRAFT RL",
    summary: "参与 Minecraft 战斗智能体研究：以僵尸竞技场为起点，探索视觉输入、原生操作空间与强化学习训练。",
    category: "research",
    tags: ["强化学习", "Minecraft", "智能体"],
    status: "published",
    publishedAt: "2026",
    phase: "研究进行中",
    role: "协作研究与开发；个人负责部分待补充",
    stack: ["Python", "MineStudio", "VPT", "PPO"],
    cover: {
      src: "/editorial/minecombat.svg",
      alt: "为 MineCombat 制作的像素风概念插画，非游戏截图",
    },
    links: [
      { label: "查看团队代码仓库", href: "https://github.com/MAS-W-415/MineCombat" },
    ],
    sections: [
      {
        title: "研究目标",
        body: "团队希望训练能在 Minecraft 中完成战斗任务的智能体。当前公开的路线从可重复的僵尸竞技场开始，逐步研究观察、动作、奖励与评估，再考虑更复杂的敌人。",
      },
      {
        title: "仓库里的进展",
        body: "公开文档记录了环境与基线、VPT 预训练模型上的 PPO 训练，以及按出生距离和角度设计的课程与多次种子评估。它同时明确说明：随机出生场景仍有差距，后续目标尚未完成。",
      },
      {
        title: "我的部分",
        body: "这是协作项目。这里先准确介绍团队仓库中的内容；我个人负责的实验、代码和具体复盘会在核对后单独补充。",
      },
    ],
  },
  {
    slug: "riscv-minisys",
    title: "RISC-V Minisys",
    kicker: "TEAM PROJECT / FPGA & PROCESSOR",
    summary: "参与面向 Minisys FPGA 开发板的五级流水 RISC-V SoC 项目，连接处理器、存储、外设与板上演示。",
    category: "systems",
    tags: ["RISC-V", "FPGA", "计算机体系结构"],
    status: "published",
    publishedAt: "2026",
    phase: "已有公开实现与验证",
    role: "协作设计与实现；个人负责部分待补充",
    stack: ["Verilog", "RISC-V", "Vivado", "FPGA"],
    cover: {
      src: "/editorial/riscv.svg",
      alt: "为 RISC-V Minisys 制作的电路风概念插画，非开发板照片",
    },
    links: [
      { label: "查看团队代码仓库", href: "https://github.com/FenggSh1q1ng/rv32i_pipeline_minisys" },
    ],
    sections: [
      {
        title: "系统做什么",
        body: "公开仓库展示了一套面向 Minisys 开发板的五级流水 RISC-V SoC，包含处理器、数据缓存、分支预测、板级外设和性能计数器。",
      },
      {
        title: "一个具体的演示",
        body: "仓库文档记录了通过 UART 输入手写数字、在 FPGA 上进行 int8 线性分类并维护计算表达式的演示，也列出了相应仿真与回归结果。",
      },
      {
        title: "我的部分",
        body: "这也是协作项目。目前先呈现团队公开的架构与演示；我会再补充自己负责的模块、验证方式和设计取舍。",
      },
    ],
  },
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

export const activeProjects = publishedProjects.filter(
  (project) => project.slug === "minecombat" || project.slug === "riscv-minisys",
);

export function getPublishedProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
