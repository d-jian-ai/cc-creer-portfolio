import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroGlow from "@/components/home/HeroGlow";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <HeroGlow />
        <div className="relative z-10">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            {t("name")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/60">
            {t("tagline")}
          </p>
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl font-medium tracking-tight">
              {t("workEntryTitle")}
            </h2>
            <p className="text-sm text-foreground/60">
              {t("workEntryDescription")}
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2 text-sm transition-colors hover:border-foreground/40"
            >
              {t("workEntryCta")}
            </Link>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl font-medium tracking-tight">
              {t("spaceEntryTitle")}
            </h2>
            <p className="text-sm text-foreground/60">
              {t("spaceEntryDescription")}
            </p>
            <Link
              href="/space"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2 text-sm transition-colors hover:border-foreground/40"
            >
              {t("spaceEntryCta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
