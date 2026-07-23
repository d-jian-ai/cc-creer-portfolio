import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";

export default function WorkPage() {
  const t = useTranslations("work");

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-foreground/60">{t("description")}</p>
      </Reveal>
    </section>
  );
}
