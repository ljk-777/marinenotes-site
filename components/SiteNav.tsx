"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/projects", label: "作品" },
  { href: "/notes", label: "写作" },
  { href: "/life", label: "生活" },
  { href: "/about", label: "关于" },
];

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
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Marine Notes 首页" aria-current={pathname === "/" ? "page" : undefined}>
        <MarineMark />
        <span className="brand-wordmark">Marine Notes</span>
      </Link>
      <nav className="site-navigation" aria-label="主导航">
        {navigation.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
