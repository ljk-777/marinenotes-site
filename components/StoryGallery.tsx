"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stories = [
  {
    number: "01",
    label: "WORK / 作品",
    title: "从 Marine Notes，到 Waylog。",
    body: "我从一个自己的网页开始，继续参与旅行规划、Minecraft 战斗智能体和 RISC-V 处理器项目。每个项目都能走进真实的代码仓库，也会说明哪些成果属于团队。",
    href: "/projects",
    link: "走进作品",
    image: "/editorial/project.svg",
    theme: "work",
  },
  {
    number: "02",
    label: "WRITING / 写作",
    title: "项目之外，我还想留下文字。",
    body: "学习记录、技术札记和生活随笔都会按日期收进这里。比起写一份漂亮的结论，我更想记住自己当时怎么想。",
    href: "/notes",
    link: "翻阅笔记",
    image: "/editorial/writing.svg",
    theme: "writing",
  },
  {
    number: "03",
    label: "LIFE / 生活",
    title: "我也会为一场比赛停下来。",
    body: "利物浦、吉他、喜欢的歌和想重走的路，不是作品页的装饰。它们和代码一样，是认识我的另一种方式。",
    href: "/life",
    link: "看看生活",
    image: "/editorial/liverpool-parade-2019.jpg",
    credit: "Eric The Fish / CC BY 2.0",
    theme: "life",
  },
] as const;

export default function StoryGallery() {
  const [active, setActive] = useState(0);
  const nodes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.storyIndex));
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    nodes.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="story-section" id="chapters" aria-labelledby="story-title">
      <div className="section-topline"><span>THREE SIDES OF ME / 我的三个侧面</span><span>01 — 03</span></div>
      <h2 id="story-title" className="section-title">做东西、写下来、认真生活。</h2>
      <div className="story-layout">
        <div className={`story-stage story-stage--${stories[active].theme}`} aria-hidden="true">
          {stories.map((story, index) => (
            <Image
              className={`story-stage-image ${active === index ? "is-active" : ""}`}
              key={story.number}
              src={story.image}
              alt=""
              width={story.theme === "life" ? 1280 : 1200}
              height={story.theme === "life" ? 854 : 900}
              priority={index === 0}
            />
          ))}
          <span className="story-stage-count">{stories[active].number} / 03</span>
        </div>
        <div className="story-copy-list">
          {stories.map((story, index) => (
            <article
              className="story-copy"
              key={story.number}
              data-story-index={index}
              ref={(node) => { nodes.current[index] = node; }}
            >
              <span className="story-number">{story.number} / {story.label}</span>
              <div className={`story-mobile-image story-stage--${story.theme}`}>
                <Image src={story.image} alt={story.theme === "life" ? "利物浦 2019 年欧冠夺冠游行" : "原创章节插画"} width={story.theme === "life" ? 1280 : 1200} height={story.theme === "life" ? 854 : 900} />
              </div>
              <h3>{story.title}</h3>
              <p>{story.body}</p>
              <Link className="arrow-link" href={story.href}>{story.link}<span aria-hidden="true"> ↗</span></Link>
              {"credit" in story && <span className="story-photo-credit">游行资料照片，非本人拍摄 · <a href="https://commons.wikimedia.org/wiki/File:LFC_Parade_2019_01.jpg" target="_blank" rel="noopener noreferrer">Eric The Fish / 来源</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a> · 缩放使用</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
