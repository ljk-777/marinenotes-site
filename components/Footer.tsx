import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-mark">Marine Notes</p>
        <p>留下一些正在发生的事。</p>
      </div>
      <div className="footer-links">
        <Link href="/notes">写作归档</Link>
        <Link href="/about">关于我</Link>
        <a href="https://github.com/ljk-777" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>
    </footer>
  );
}
