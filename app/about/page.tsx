import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "关于 | Marine Notes",
  description: "关于 Marine 和这座持续生长的个人网站。",
};

export default function AboutPage() {
  return (
    <PageTransition>
    <main className="page-main interior-page">
      <section className="about-layout">
        <div className="about-copy">
          <p className="overline">ABOUT / 关于</p>
          <h1>你好，我是 Marine。</h1>
          <p className="about-lead">一个还在学习的学生。做项目，写笔记，也认真支持利物浦。</p>
          <p>我用 Marine 这个名字记录自己做过的东西：从搭建这座网站，到参与旅行规划项目 Waylog、Minecraft 战斗智能体研究和 RISC-V SoC。仓库已经公开，个人负责的模块与复盘还会继续补充。</p>
          <p>我也喜欢吉他、歌曲和旅行。它们不是作品集之外的附录，而是我生活里同样重要的部分。这里会随着真实的新项目、新文字和新记忆慢慢变化。</p>
          <div className="about-links">
            <Link className="pill-button" href="/projects">浏览作品 ↗</Link>
            <Link className="quiet-link" href="/life">看看生活 ↗</Link>
            <a className="quiet-link" href="https://github.com/ljk-777" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="about-art"><Image src="/editorial/hero.svg" alt="Marine Notes 的原创手帖插画" width={1200} height={1100} /></div>
      </section>
    </main>
    </PageTransition>
  );
}
