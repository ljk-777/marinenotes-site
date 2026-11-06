export type CoverImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ContentFields<Category extends string> = {
  slug: string;
  title: string;
  summary: string;
  category: Category;
  tags: string[];
  cover?: CoverImage;
};

export type Publication =
  | { status: "published"; publishedAt: string }
  | { status: "draft"; publishedAt?: never };

export type ContentRecord<Category extends string, Extra = object> =
  ContentFields<Category> & Extra & Publication;

export function newestFirst<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatContentDate(date: string): string {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(date);
  if (!match) return date;

  const [, year, month, day] = match;
  return `${year} 年${month ? ` ${Number(month)} 月` : ""}${day ? ` ${Number(day)} 日` : ""}`;
}
