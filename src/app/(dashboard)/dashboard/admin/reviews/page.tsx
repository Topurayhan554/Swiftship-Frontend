"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAdminReviews, useDeleteReview } from "@/hooks/useAdmin";
import {
  BTN_GHOST,
  CARD,
  ConfirmDialog,
  DataTable,
  FilterSelect,
  Pagination,
  SearchBox,
  Toolbar,
  fmtDate,
  type Column,
} from "@/components/dashboard/admin/AdminUI";
import { AdminReview } from "@/types";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" role="img" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-4 ${i < value ? "fill-[#ff7a1a] text-[#ff7a1a]" : "text-[#cbd5e1]"}`}
        />
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [toDelete, setToDelete] = useState<AdminReview | null>(null);
  const del = useDeleteReview();
  const q = useAdminReviews({ page, limit: 10, searchTerm: search, rating });

  const columns: Column<AdminReview>[] = [
    {
      header: "Customer",
      cell: (r) => (
        <>
          <p className="font-semibold text-[#0f2a4a]">{r.user?.name ?? "-"}</p>
          <p className="text-xs text-[#94a3b8]">{r.parcel?.trackingId ?? ""}</p>
        </>
      ),
    },
    { header: "Rating", cell: (r) => <Stars value={r.rating} /> },
    {
      header: "Comment",
      className: "max-w-sm",
      cell: (r) =>
        r.comment ?? <span className="text-xs text-[#94a3b8]">No comment</span>,
    },
    { header: "Date", cell: (r) => fmtDate(r.createdAt) },
    {
      header: "Actions",
      cell: (r) => (
        <button
          type="button"
          className={BTN_GHOST}
          onClick={() => {
            del.reset();
            setToDelete(r);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Customer feedback on delivered parcels. Remove abusive or fake reviews."
      />
      <div className={CARD}>
        <Toolbar>
          <SearchBox
            placeholder="Search comment or tracking ID"
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
          <FilterSelect
            label="Rating"
            value={rating}
            onChange={(v) => {
              setRating(v);
              setPage(1);
            }}
            options={[5, 4, 3, 2, 1].map((n) => ({
              value: String(n),
              label: `${n} star${n > 1 ? "s" : ""}`,
            }))}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={Star}
          emptyTitle="No reviews yet"
          emptyText="Reviews show up once customers rate their deliveries."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>

      {toDelete && (
        <ConfirmDialog
          title="Delete this review?"
          text="This permanently removes the review and cannot be undone."
          confirmLabel="Delete review"
          danger
          busy={del.isPending}
          error={del.error}
          onClose={() => setToDelete(null)}
          onConfirm={() =>
            del.mutate(toDelete.id, { onSuccess: () => setToDelete(null) })
          }
        />
      )}
    </>
  );
}
