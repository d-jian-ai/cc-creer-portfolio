import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        {t("name")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-foreground/60">
        {t("tagline")}
      </p>
    </section>
  );
}
