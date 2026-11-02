"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { Pager, Stars } from "@/components/reviews/review-card";
import { usePublicReviews } from "@/hooks";

const LIMIT = 6;

export default function PublicReviews() {
  const [rating, setRating] = useState<number | "all">("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = usePublicReviews({
    page,
    limit: LIMIT,
    rating: rating === "all" ? undefined : rating,
  });

  const reviews = data?.data.reviews ?? [];
  const summary = data?.data.summary;
  const meta = data?.meta;

  function changeFilter(value: number | "all") {
    setRating(value);
    setPage(1);
  }

  return (
    <main className="bg-[#f7f9fc]">
      <section className="bg-[#0f2a4a] pb-24 pt-16 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4">
          <Stagger gap={0.1} delay={0.1}>
            <StaggerItem>
              <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                What our customers say about their shipments
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                Every review comes from a customer who received a delivery with
                us.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <div className="mx-auto -mt-14 max-w-6xl px-4 pb-20">
        {/* Summary */}
        <Reveal y={28}>
          <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-lg shadow-[#0f2a4a]/10 sm:grid-cols-[auto_1fr] sm:gap-12 sm:p-10">
            {summary ? (
              <>
                <div className="flex flex-col items-start justify-center">
                  <p className="text-6xl font-extrabold text-[#0f2a4a]">
                    {summary.average.toFixed(1)}
                  </p>
                  <div className="mt-2">
                    <Stars value={Math.round(summary.average)} size="size-5" />
                  </div>
                  <p className="mt-2 text-sm text-[#5b6b82]">
                    Based on {summary.total} reviews
                  </p>
                </div>
                <ul className="flex flex-col justify-center gap-2.5">
                  {summary.distribution.map(({ rating: star, count }) => {
                    const pct = summary.total
                      ? (count / summary.total) * 100
                      : 0;
                    return (
                      <li
                        key={star}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="w-12 shrink-0 text-[#0f2a4a]">
                          {star} star
                        </span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e8eef6]">
                          <span
                            className="block h-full rounded-full bg-[#ff7a1a]"
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                        <span className="w-6 shrink-0 text-right text-[#5b6b82]">
                          {count}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div className="h-32 animate-pulse rounded-xl bg-[#e8eef6] sm:col-span-2" />
            )}
          </div>
        </Reveal>

        {/* Filters */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter reviews by rating"
        >
          {(["all", 5, 4, 3, 2, 1] as const).map((value) => {
            const active = rating === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => changeFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2 ${
                  active
                    ? "bg-[#0f2a4a] text-white"
                    : "bg-white text-[#0f2a4a] hover:bg-[#e8eef6]"
                }`}
              >
                {value === "all" ? "All" : `${value} star`}
              </button>
            );
          })}
        </div>

        {/* List */}
        <div
          className={`mt-6 grid gap-5 transition-opacity md:grid-cols-2 ${isFetching && !isLoading ? "opacity-60" : ""}`}
          aria-busy={isFetching}
        >
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl bg-white"
              />
            ))}

          {isError && (
            <p
              role="alert"
              className="rounded-2xl bg-white p-8 text-sm text-red-600 md:col-span-2"
            >
              Reviews load kora jayni. Pore abar chesta koro.
            </p>
          )}

          {!isLoading && !isError && reviews.length === 0 && (
            <p className="rounded-2xl bg-white p-8 text-sm text-[#5b6b82] md:col-span-2">
              {rating === "all"
                ? "Ekhono kono review nei."
                : `Ekhono kono ${rating}-star review nei. Onno rating select koro.`}
            </p>
          )}

          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm shadow-[#0f2a4a]/5"
            >
              <div className="flex items-center justify-between gap-3">
                <Stars value={review.rating} />
                <time
                  dateTime={review.createdAt}
                  className="text-xs text-[#8a99ad]"
                >
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#46566d]">
                {review.comment || "Rated without a written comment."}
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0f2a4a] text-sm font-bold text-white"
                >
                  {review.customerName.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                    {review.customerName}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[#1a7f4b]">
                    <BadgeCheck aria-hidden="true" className="size-3.5" />
                    Verified delivery
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <Pager meta={meta} onPage={setPage} />

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0f2a4a] p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Ready to send your first parcel?
            </h2>
            <p className="mt-2 text-sm text-white/75">
              Create an account and get 30% off your first shipment.
            </p>
          </div>
          <Link
            href="/register"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#e8590c] hover:shadow-lg hover:shadow-[#ff7a1a]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]"
          >
            Create Account
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
