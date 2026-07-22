"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/space", label: t("space") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <ul className="flex gap-6 text-sm">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
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
        <LangSwitcher />
      </nav>
    </header>
  );
}
