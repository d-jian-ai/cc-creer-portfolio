"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "作品" },
  { href: "/about", label: "关于" },
  { href: "/writing", label: "文章" },
  { href: "/contact", label: "联系" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium tracking-tight">
          姓名占位 · 待补充
        </Link>
        <ul className="flex gap-6 text-sm">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-foreground"
                      : "text-foreground/50 transition-colors hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
