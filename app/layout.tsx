import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import "./globals.css";
import "./editorial.css";

export const metadata: Metadata = {
  title: "Marine Notes | 写下正在发生的事",
  description: "记录学习、创造与生活的个人空间。",
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
