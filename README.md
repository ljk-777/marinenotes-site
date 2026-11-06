# Marine Notes

Marine Notes 是一个持续生长的个人网站，使用 Next.js App Router、TypeScript 和 MDX 构建，并部署在 Vercel。页面包括作品、写作归档、生活手帖和关于。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。提交前运行 `npm run lint` 和 `npm run build`。

## 网页写作后台

Sanity 项目 `Marine Notes` 已创建：项目 ID `4f615p3c`，公开数据集 `production`。本地 `.env.local` 已配置但被 Git 忽略；项目和生活记录仍由仓库文件管理。未配置环境变量时，网站继续显示本地 MDX 文章，`/studio` 会给出设置提示。

1. 本地运行 `npm run dev`，打开 `http://localhost:3000/studio`，使用创建项目时的 GitHub 账户登录。新建“文章”，填好标题、网址标识、摘要、分类、日期和正文；封面和正文都能上传照片，图片说明为必填。
2. 点击发布后，文章才会出现在公开网站。保存草稿或修改已发布文章而未再次发布，都不会改变公开版本。
3. 要让线上站点使用同一个编辑后台，在 Vercel 项目中添加 `NEXT_PUBLIC_SANITY_PROJECT_ID=4f615p3c` 和 `NEXT_PUBLIC_SANITY_DATASET=production`，重新部署包含本次代码的版本。生产网站的 `/studio` 也使用同一 Sanity 项目。

新电脑可把 `.env.example` 复制为 `.env.local`。项目 ID 可公开，**不要**把登录密码或 API Token 放进仓库。Sanity 已允许 `http://localhost:3000`、`https://marinenotes.me`、`https://www.marinenotes.me` 和 `https://marinenotes-site.vercel.app` 作为带凭据的 Studio 来源。网站不用 API Token 读取已发布文章；私有数据集需要另行设计安全的服务端访问方案。

公开页面只读取已发布内容，约一分钟内更新。旧的本地 MDX 文章会继续显示；如果后台文章使用相同网址标识，后台版本优先。不要在 Vercel 上删掉旧站或改 DNS，直到新部署验证完成。

## 内容放在哪里

文章、项目和生活记录共享 `slug`、标题、摘要、分类、标签、封面、发布状态和日期字段；公共类型与日期格式在 `data/content.ts`。`status: "draft"` 不会出现在公开列表或详情中；改为 `published` 时必须填写 `publishedAt`，支持 `YYYY`、`YYYY-MM` 或 `YYYY-MM-DD`，只填写自己知道的日期精度。

- 写文章：在 `content/notes/` 新建 MDX 正文，再在 `data/notes.ts` **添加一条记录**，由 `loadBody` 指向该文件。元数据和正文入口都登记在这一条记录里，不再修改路由文件。
- 写项目：在 `data/projects.ts` 添加项目资料、真实的封面说明和过程；公开作品会自动进入列表与详情页。
- 写生活记录：在 `data/life.ts` 的 `lifeEntries` 添加带日期的真实片段；`lifeTopics` 只负责足球、音乐、旅行这三个兴趣栏目。生活记录目前为空，不会编造经历。
- 首页图文叙事在 `components/StoryGallery.tsx`；原创示意插画在 `public/editorial/`。未来换成自己的图片时，要同步更新图片说明。

项目和生活记录暂时仍由仓库文件管理；文章优先从 Sanity 读取，本地 MDX 作为兼容与迁移期间的后备。

## 设计原则

保留暖纸色、海玻璃绿和手写 M；首页使用图文滚动章节，文章正文保持安静。桌面端有粘性图片舞台，窄屏自动改为逐章图文排列，并尊重系统的减少动态效果设置。
