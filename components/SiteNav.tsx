import Image from "next/image";
import Link from "next/link";

function MarineMark() {
  return (
    <Image
      className="marine-mark"
      src="/marine-mark.svg"
      alt=""
      width={1254}
      height={1254}
      aria-hidden="true"
    />
  );
}

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <Link className="site-mark" href="/">
        <MarineMark />
        <span>Marine Notes</span>
      </Link>
      <div className="nav-links">
        <Link href="/notes">Writing</Link>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
