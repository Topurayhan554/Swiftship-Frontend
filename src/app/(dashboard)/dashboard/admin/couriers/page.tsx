"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAdminUsers } from "@/hooks/useAdmin";
import BlockUserButton from "@/components/dashboard/admin/BlockUserButton";
import {
  Badge,
  CARD,
  DataTable,
  FilterSelect,
  Pagination,
  SearchBox,
  Toolbar,
  fmtDate,
  type Column,
} from "@/components/dashboard/admin/AdminUI";
import { AdminUser } from "@/types";

const columns: Column<AdminUser>[] = [
  {
    header: "Courier",
    cell: (u) => (
      <>
        <p className="font-semibold text-[#0f2a4a]">{u.name}</p>
        <p className="text-xs text-[#94a3b8]">{u.email}</p>
      </>
    ),
  },
  {
    header: "Phone",
    cell: (u) =>
      u.phone ? (
        <a href={`tel:${u.phone}`} className="hover:text-[#e8590c]">
          {u.phone}
        </a>
      ) : (
        "-"
      ),
  },
  { header: "Vehicle", cell: (u) => u.vehicleType ?? "-" },
  {
    header: "Availability",
    cell: (u) => (
      <Badge tone={u.isAvailable ? "green" : "gray"}>
        {u.isAvailable ? "Available" : "Unavailable"}
      </Badge>
    ),
  },
  {
    header: "Account",
    cell: (u) => (
      <Badge tone={u.isBlocked ? "red" : "green"}>
        {u.isBlocked ? "Blocked" : "Active"}
      </Badge>
    ),
  },
  { header: "Joined", cell: (u) => fmtDate(u.createdAt) },
  { header: "Actions", cell: (u) => <BlockUserButton user={u} /> },
];

export default function AdminCouriersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const q = useAdminUsers({
    page,
    limit: 10,
    role: "COURIER",
    searchTerm: search,
    isAvailable: availability === "" ? undefined : availability === "yes",
  });

  return (
    <>
      <PageHeader
        title="Couriers"
        description="Delivery partners and whether they can take new parcels."
      />
      <div className={CARD}>
        <Toolbar>
          <SearchBox
            placeholder="Search name, email or phone"
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
          <FilterSelect
            label="Availability"
            value={availability}
            onChange={(v) => {
              setAvailability(v);
              setPage(1);
            }}
            options={[
              { value: "yes", label: "Available" },
              { value: "no", label: "Unavailable" },
            ]}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={Truck}
          emptyTitle="No couriers found"
          emptyText="Couriers appear here once they register."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>
    </>
  );
}
