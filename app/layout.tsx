import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import "./globals.css";
import "./editorial.css";

export const metadata: Metadata = {
  title: "Marine Notes | Marine 的项目与生活笔记",
  description: "Marine 的个人网站：项目、学习记录、利物浦、音乐与路上的片刻。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <div className="site-shell">
          <SiteNav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
