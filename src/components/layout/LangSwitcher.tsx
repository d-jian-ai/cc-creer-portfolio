"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-2 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={
            loc === locale
              ? "text-foreground"
              : "text-foreground/40 transition-colors hover:text-foreground"
          }
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
