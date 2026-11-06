import { newestFirst, type ContentRecord, type CoverImage } from "@/data/content";

export const lifeCategories = {
  football: "足球",
  music: "音乐",
  journeys: "旅行",
} as const;

export type LifeCategory = keyof typeof lifeCategories;

export type LifeEntry = ContentRecord<LifeCategory, {
  body: string[];
}>;

export type PublishedLifeEntry = Extract<LifeEntry, { status: "published" }>;

export const lifeTopics: {
  number: string;
  label: string;
  title: string;
  description: string;
  cover: CoverImage;
}[] = [
  {
    number: "01",
    label: "FOOTBALL / 足球",
    title: "跟着利物浦，记住那些比赛日。",
    description: "我喜欢足球，也支持利物浦。这里会记录让我记得很久的比赛、球员和看球时的心情，而不是一份赛事新闻表。",
    cover: { src: "/editorial/football.svg", alt: "红色围巾与足球场线条的原创插画" },
  },
  {
    number: "02",
    label: "MUSIC / 音乐",
    title: "从喜欢一首歌，到试着弹出来。",
    description: "喜欢的歌曲、吉他的练习和偶尔被一段旋律击中的时刻，都值得留下一点痕迹。",
    cover: { src: "/editorial/music.svg", alt: "吉他与声波线条的原创插画" },
  },
  {
    number: "03",
    label: "JOURNEYS / 路上",
    title: "把路上的光，带回纸页里。",
    description: "旅行不必总是完整的攻略。也许是一张照片、一段车窗外的风景，或后来才明白的感受。",
    cover: { src: "/editorial/journey.svg", alt: "车窗与远山的原创插画" },
  },
];

// Add only real memories here; an empty archive is better than invented stories.
export const lifeEntries: LifeEntry[] = [];

export const publishedLifeEntries = newestFirst(
  lifeEntries.filter((entry): entry is PublishedLifeEntry => entry.status === "published"),
);

export function getPublishedLifeEntry(slug: string) {
  return publishedLifeEntries.find((entry) => entry.slug === slug);
}
