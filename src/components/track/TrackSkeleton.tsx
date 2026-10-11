import { trackCard } from "./styles";

export default function TrackSkeleton() {
  return (
    <div
      className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
      aria-busy="true"
      aria-label="Loading tracking details"
    >
      {[0, 1].map((n) => (
        <div key={n} className={`${trackCard} animate-pulse space-y-4`}>
          <div className="h-5 w-1/3 rounded bg-black/5" />
          <div className="h-8 w-2/3 rounded bg-black/5" />
          <div className="h-4 w-full rounded bg-black/5" />
          <div className="h-4 w-5/6 rounded bg-black/5" />
          <div className="h-4 w-2/3 rounded bg-black/5" />
          <div className="h-24 w-full rounded-xl bg-black/5" />
        </div>
      ))}
    </div>
  );
}
