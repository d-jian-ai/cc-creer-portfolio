import { getTranslations } from "next-intl/server";
import Reveal from "@/components/motion/Reveal";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("work");

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("detailTitle")}：{slug}
        </h1>
        <p className="mt-4 text-foreground/60">{t("detailBody")}</p>
      </Reveal>
    </section>
  );
}
