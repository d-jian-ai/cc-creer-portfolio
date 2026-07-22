export default function LoadingRing() {
  return (
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full border border-white/15" />
      <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-white/70" />
    </div>
  );
}
