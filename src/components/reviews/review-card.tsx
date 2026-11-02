import { BadgeCheck, Star } from "lucide-react";
export type ReviewCardData = {
  rating: number;
  comment?: string | null;
  createdAt: string;
  user?: { name?: string | null } | null;
  parcel?: { trackingId?: string | null } | null;
};

export function Stars({
  value,
  size = "size-4",
}: {
  value: number;
  size?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`${size} ${n <= value ? "fill-[#ff7a1a] text-[#ff7a1a]" : "fill-transparent text-[#c9d3e0]"}`}
        />
      ))}
    </span>
  );
}

const initials = (name = "?") =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function ReviewCard({
  review,
  action,
}: {
  review: ReviewCardData;
  action?: React.ReactNode;
}) {
  const person = review.user;
  const name =
    person?.name ??
    (review.parcel?.trackingId
      ? `Parcel ${review.parcel.trackingId}`
      : "Your review");
  return (
    <article className="flex flex-col rounded-2xl bg-white p-6 shadow-sm shadow-[#0f2a4a]/5">
      <div className="flex items-center justify-between gap-3">
        <Stars value={review.rating} />
        <time className="text-xs text-[#8a99ad]">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[#46566d]">
        {review.comment || "No written comment."}
      </p>
      <footer className="mt-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0f2a4a] text-sm font-bold text-white"
          >
            {initials(name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0f2a4a]">
              {name}
            </p>
            <p className="flex items-center gap-1 text-xs text-[#1a7f4b]">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
              {review.parcel?.trackingId
                ? `Parcel ${review.parcel.trackingId}`
                : "Verified delivery"}
            </p>
          </div>
        </div>
        {action}
      </footer>
    </article>
  );
}

export function Pager({
  meta,
  onPage,
}: {
  meta?: { page: number; totalPages: number };
  onPage: (p: number) => void;
}) {
  if (!meta || meta.totalPages <= 1) return null;
  const btn =
    "rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f2a4a] hover:bg-[#e8eef6] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]";
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        className={btn}
        disabled={meta.page <= 1}
        onClick={() => onPage(meta.page - 1)}
      >
        Previous
      </button>
      <span className="text-sm text-[#5b6b82]">
        Page {meta.page} of {meta.totalPages}
      </span>
      <button
        className={btn}
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPage(meta.page + 1)}
      >
        Next
      </button>
    </div>
  );
}
