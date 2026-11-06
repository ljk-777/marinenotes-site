"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stories = [
  {
    number: "01",
    label: "WORK / 作品",
    title: "把想法做成可以触摸的页面。",
    body: "从 Marine Notes 开始，记录一个作品如何从问题、草图走到真正上线。这里展示完成的部分，也诚实留下仍在改进的地方。",
    href: "/projects",
    link: "走进作品",
    image: "/editorial/project.svg",
    theme: "work",
  },
  {
    number: "02",
    label: "WRITING / 写作",
    title: "让每一段思考有时间坐标。",
    body: "生活随笔、学习记录与技术札记，按日期慢慢累积。不必每篇都完整成熟，但每篇都是真实发生过的思考。",
    href: "/notes",
    link: "翻阅笔记",
    image: "/editorial/writing.svg",
    theme: "writing",
  },
  {
    number: "03",
    label: "LIFE / 生活",
    title: "球场、琴弦，以及路上的光。",
    body: "足球和利物浦、喜欢的歌曲、练习吉他的时刻，还有想记住的旅行。它们不是网站的边角料，也是我生活的一部分。",
    href: "/life",
    link: "看看生活",
    image: "/editorial/life.svg",
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
      <div className="section-topline"><span>CHAPTERS / 章节</span><span>01 — 03</span></div>
      <h2 id="story-title" className="section-title">一个空间，几种打开方式。</h2>
      <div className="story-layout">
        <div className={`story-stage story-stage--${stories[active].theme}`} aria-hidden="true">
          {stories.map((story, index) => (
            <Image
              className={`story-stage-image ${active === index ? "is-active" : ""}`}
              key={story.number}
              src={story.image}
              alt=""
              width={1200}
              height={900}
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
                <Image src={story.image} alt="原创章节插画" width={1200} height={900} />
              </div>
              <h3>{story.title}</h3>
              <p>{story.body}</p>
              <Link className="arrow-link" href={story.href}>{story.link}<span aria-hidden="true"> ↗</span></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
