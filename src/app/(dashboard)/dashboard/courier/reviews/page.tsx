"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Pager, ReviewCard, Stars } from "@/components/reviews/review-card";
import { useCourierReviews } from "@/hooks";

export default function CourierReviewsPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCourierReviews(user?.id, {
    page,
    limit: 6,
  });

  const reviews = data?.data ?? [];
  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#0f2a4a]">
        Customer feedback
      </h1>

      {reviews.length > 0 && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#0f2a4a] p-6 text-white">
          <p className="text-5xl font-extrabold">{avg.toFixed(1)}</p>
          <div>
            <Stars value={Math.round(avg)} size="size-5" />
            <p className="mt-1 text-sm text-white/75">
              {data?.meta?.total ?? reviews.length} reviews (average ei page-er)
            </p>
          </div>
        </div>
      )}

      <section className="mt-8">
        {isLoading && <p className="text-sm text-[#5b6b82]">Loading...</p>}
        {isError && (
          <p className="text-sm text-red-600">Review load kora jayni.</p>
        )}
        {data && reviews.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-sm text-[#5b6b82]">
            Ekhono kono customer review nei.
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <Pager meta={data?.meta} onPage={setPage} />
      </section>
    </main>
  );
}
