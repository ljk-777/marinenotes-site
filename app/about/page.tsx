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
          <p className="about-lead">一个还在学习的学生，也是在为自己搭建空间的人。</p>
          <p>我喜欢把想法做成能用的页面，也喜欢把生活写下来。Marine Notes 因此不只是作品集：它既记录制作过程，也收纳足球、音乐和路上的记忆。</p>
          <p>这里会不断改变。新的项目、读过的东西、喜欢的比赛或歌曲，都可能成为下一页。</p>
          <div className="about-links">
            <Link className="pill-button" href="/projects">浏览作品 ↗</Link>
            <a className="quiet-link" href="https://github.com/ljk-777" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="about-art"><Image src="/editorial/hero.svg" alt="Marine Notes 的原创手帖插画" width={1200} height={1100} /></div>
      </section>
    </main>
    </PageTransition>
  );
}
