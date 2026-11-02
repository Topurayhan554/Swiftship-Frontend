"use client";
"use no memo";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { Pager, ReviewCard } from "@/components/reviews/review-card";
import { useCreateReview, useMyReviews } from "@/hooks";

const inputClass =
  "w-full rounded-xl border border-[#d8e0ec] bg-white px-4 py-3 text-sm text-[#0f2a4a] placeholder:text-[#8a99ad] focus-visible:border-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]/30";

function CustomerReviews() {
  const params = useSearchParams();
  const [parcelId, setParcelId] = useState(params.get("parcelId") ?? "");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const create = useCreateReview();
  const mine = useMyReviews({ page, limit: 6 });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!parcelId.trim() || !rating) {
      setError("Parcel ID dao ar star rating select koro.");
      return;
    }
    setError("");
    create.mutate(
      {
        parcelId: parcelId.trim(),
        rating,
        comment: comment.trim() || undefined,
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
          setParcelId("");
        },
        onError: (err: any) =>
          setError(
            err?.data?.message ?? "Review post kora jayni. Abar chesta koro.",
          ),
      },
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-[#0f2a4a]">My reviews</h1>

      <form
        onSubmit={submit}
        noValidate
        className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm shadow-[#0f2a4a]/5"
      >
        <h2 className="text-lg font-bold text-[#0f2a4a]">
          Rate a delivered parcel
        </h2>
        <div>
          <label
            htmlFor="parcelId"
            className="mb-1.5 block text-sm font-semibold text-[#0f2a4a]"
          >
            Parcel ID
          </label>
          <input
            id="parcelId"
            value={parcelId}
            onChange={(e) => setParcelId(e.target.value)}
            className={inputClass}
          />
        </div>
        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold text-[#0f2a4a]">
            Rating
          </legend>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} stars`}
                aria-pressed={rating === n}
                onClick={() => setRating(n)}
                className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
              >
                <Star
                  aria-hidden="true"
                  className={`size-7 ${n <= rating ? "fill-[#ff7a1a] text-[#ff7a1a]" : "fill-transparent text-[#c9d3e0]"}`}
                />
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label
            htmlFor="comment"
            className="mb-1.5 block text-sm font-semibold text-[#0f2a4a]"
          >
            Comment (optional)
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={inputClass}
          />
        </div>
        <p role="alert" className="min-h-5 text-sm text-red-600">
          {error}
        </p>
        {create.isSuccess && (
          <p role="status" className="text-sm font-semibold text-[#1a7f4b]">
            Review posted. Thank you!
          </p>
        )}
        <button
          type="submit"
          disabled={create.isPending}
          className="rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e8590c] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2a4a] focus-visible:ring-offset-2"
        >
          {create.isPending ? "Posting..." : "Post review"}
        </button>
      </form>

      <section className="mt-10">
        {mine.isLoading && <p className="text-sm text-[#5b6b82]">Loading...</p>}
        {mine.isError && (
          <p className="text-sm text-red-600">Review load kora jayni.</p>
        )}
        {mine.data && mine.data.data.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-sm text-[#5b6b82]">
            Ekhono kono review dao ni. Delivered parcel-e rating dao.
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {mine.data?.data.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <Pager meta={mine.data?.meta} onPage={setPage} />
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <CustomerReviews />
    </Suspense>
  );
}
