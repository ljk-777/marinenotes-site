import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "项目",
  type: "document",
  fields: [
    defineField({ name: "title", title: "项目名称", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "网址标识", description: "已有项目若要在后台更新，请使用原来的网址标识。", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "一句话介绍", type: "text", rows: 3, validation: (rule) => rule.required().max(260) }),
    defineField({ name: "category", title: "项目类别", type: "string", options: { list: [{ title: "网站", value: "website" }, { title: "应用", value: "application" }, { title: "研究", value: "research" }, { title: "系统", value: "systems" }] }, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "项目日期", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "kicker", title: "英文眉题", description: "例如 TEAM PROJECT / FPGA & PROCESSOR", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phase", title: "目前阶段", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "我负责什么", description: "协作项目请只填写自己实际做过的部分。", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: "stack", title: "使用技术", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" }, validation: (rule) => rule.required().min(1) }),
    defineField({ name: "tags", title: "标签", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "spotlight", title: "放在正在深入的栏目", description: "留空时，已有项目沿用原来的展示位置。", type: "boolean" }),
    defineField({ name: "cover", title: "项目封面", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "图片说明", type: "string", validation: (rule) => rule.required() })], validation: (rule) => rule.required().assetRequired() }),
    defineField({ name: "gallery", title: "项目图片 / 截图", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "图片说明", type: "string", validation: (rule) => rule.required() }), defineField({ name: "caption", title: "图注", type: "string" })] })] }),
    defineField({ name: "links", title: "相关链接", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "显示文字", type: "string", validation: (rule) => rule.required() }), defineField({ name: "href", title: "网址", type: "url", validation: (rule) => rule.required().uri({ scheme: ["https", "http"] }) })] })] }),
    defineField({ name: "sections", title: "项目故事", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "小标题", type: "string", validation: (rule) => rule.required() }), defineField({ name: "body", title: "内容", type: "text", rows: 6, validation: (rule) => rule.required() })] })], validation: (rule) => rule.required().min(1) }),
  ],
  preview: { select: { title: "title", subtitle: "phase", media: "cover" } },
});
