import Link from "next/link";
export default function SiteNa() {
  return (
    <nav className="site-nav">
      <span className="site-mark">Marine Notes</span>
      <div className="nav-links">
        <Link href="/notes">Writing</Link>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
