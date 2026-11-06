import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "文章",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "摘要",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "string",
      options: {
        list: [
          { title: "生活随笔", value: "essay" },
          { title: "学习记录", value: "learning" },
          { title: "技术札记", value: "technology" },
        ],
        layout: "radio",
      },
      initialValue: "essay",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "文章日期",
      description: "这会成为网站归档中显示的日期。",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "标签",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "cover",
      title: "封面图",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "图片说明",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "正文",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "图片说明",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "cover" },
  },
});
