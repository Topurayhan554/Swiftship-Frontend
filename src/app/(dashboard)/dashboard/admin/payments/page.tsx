"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { formatFee } from "@/lib/parcel";
import { useAdminPayments } from "@/hooks/useAdmin";
import {
  Badge,
  CARD,
  DataTable,
  FilterSelect,
  PAYMENT_TONE,
  Pagination,
  SearchBox,
  Toolbar,
  fmtDateTime,
  prettyEnum,
  type Column,
} from "@/components/dashboard/admin/AdminUI";
import { AdminPayment } from "@/types";

const columns: Column<AdminPayment>[] = [
  {
    header: "Parcel",
    cell: (p) => (
      <>
        <p className="font-semibold text-[#0f2a4a]">
          {p.parcel?.trackingId ?? "-"}
        </p>
        <p className="break-all text-xs text-[#94a3b8]">
          {p.transactionId ?? "No transaction yet"}
        </p>
      </>
    ),
  },
  {
    header: "Customer",
    cell: (p) =>
      p.user ? (
        <>
          <p>{p.user.name}</p>
          <p className="text-xs text-[#94a3b8]">{p.user.email}</p>
        </>
      ) : (
        "-"
      ),
  },
  {
    header: "Gateway",
    cell: (p) => (
      <Badge tone={p.gateway === "BKASH" ? "red" : "blue"}>
        {p.gateway === "BKASH" ? "bKash" : "Stripe"}
      </Badge>
    ),
  },
  {
    header: "Amount",
    cell: (p) => (
      <span className="font-semibold text-[#0f2a4a]">
        {formatFee(p.amount)}
      </span>
    ),
  },
  {
    header: "Status",
    cell: (p) => (
      <Badge tone={PAYMENT_TONE[p.status]}>{prettyEnum(p.status)}</Badge>
    ),
  },
  { header: "Paid at", cell: (p) => fmtDateTime(p.paidAt) },
];

export default function AdminPaymentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gateway, setGateway] = useState("");
  const q = useAdminPayments({
    page,
    limit: 10,
    searchTerm: search,
    status,
    gateway,
  });

  return (
    <>
      <PageHeader
        title="Payments"
        description="bKash and card payments for all parcels."
      />
      <div className={CARD}>
        <Toolbar>
          <SearchBox
            placeholder="Search tracking ID or transaction ID"
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={["PENDING", "PAID", "FAILED"].map((s) => ({
              value: s,
              label: prettyEnum(s),
            }))}
          />
          <FilterSelect
            label="Gateway"
            value={gateway}
            onChange={(v) => {
              setGateway(v);
              setPage(1);
            }}
            options={[
              { value: "BKASH", label: "bKash" },
              { value: "STRIPE", label: "Stripe" },
            ]}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={CreditCard}
          emptyTitle="No payments found"
          emptyText="Payments appear here after customers pay for parcels."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>
    </>
  );
}
