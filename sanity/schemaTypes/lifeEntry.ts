import { defineArrayMember, defineField, defineType } from "sanity";

export const lifeEntryType = defineType({
  name: "lifeEntry",
  title: "生活记录",
  type: "document",
  fields: [
    defineField({ name: "title", title: "标题", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "网址标识", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "摘要", type: "text", rows: 3, validation: (rule) => rule.required().max(260) }),
    defineField({ name: "category", title: "分类", type: "string", options: { list: [{ title: "足球", value: "football" }, { title: "音乐", value: "music" }, { title: "旅行", value: "journeys" }], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "记录日期", description: "生活手帖会按这个日期倒序排列。", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "cover", title: "封面照片", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "图片说明", type: "string", validation: (rule) => rule.required() })] }),
    defineField({ name: "body", title: "正文与照片", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "图片说明", type: "string", validation: (rule) => rule.required() })] })], validation: (rule) => rule.required().min(1) }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "cover" } },
});
