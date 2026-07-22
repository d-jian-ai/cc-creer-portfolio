export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">
        文章详情占位：{slug}
      </h1>
      <p className="mt-4 text-foreground/60">文章正文占位 · 待补充</p>
    </section>
  );
}
