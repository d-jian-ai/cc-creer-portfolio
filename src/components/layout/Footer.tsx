import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-foreground/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <p>{t("contact")}</p>
      </div>
    </footer>
  );
}
