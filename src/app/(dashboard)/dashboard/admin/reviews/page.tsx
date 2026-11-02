"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAdminReviews, useDeleteReview } from "@/hooks/useAdmin"; 
import { Pager, ReviewCard } from "@/components/reviews/review-card";

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useAdminReviews({ page, limit: 10 });
  const del = useDeleteReview();

  const reviews = data?.data ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#0f2a4a]">Reviews</h1>
      {del.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          Review delete kora jayni.
        </p>
      )}

      <section className="mt-6">
        {isLoading && <p className="text-sm text-[#5b6b82]">Loading...</p>}
        {isError && (
          <p className="text-sm text-red-600">Review load kora jayni.</p>
        )}
        {data && reviews.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-sm text-[#5b6b82]">
            Kono review nei.
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              action={
                <button
                  type="button"
                  aria-label="Delete review"
                  disabled={del.isPending}
                  onClick={() =>
                    window.confirm("Ei review delete korbe?") &&
                    del.mutate(r.id)
                  }
                  className="rounded-full p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                </button>
              }
            />
          ))}
        </div>
        <Pager meta={data?.meta} onPage={setPage} />
      </section>
    </main>
  );
}
