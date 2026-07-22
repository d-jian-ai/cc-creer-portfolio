export default function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} 姓名占位 · 待补充</p>
        <p>邮箱占位 · 待补充　·　社交链接占位 · 待补充</p>
      </div>
    </footer>
  );
}
