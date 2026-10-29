"use client";

import { useState } from "react";
import { Users } from "lucide-react";
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
  prettyEnum,
  type Column,
  type Tone,
} from "@/components/dashboard/admin/AdminUI";
import { AdminUser } from "@/types";

const ROLES = ["CUSTOMER", "COURIER", "ADMIN", "SUPER_ADMIN"];
const ROLE_TONE: Record<string, Tone> = {
  CUSTOMER: "blue",
  COURIER: "purple",
  ADMIN: "amber",
  SUPER_ADMIN: "red",
};

const columns: Column<AdminUser>[] = [
  {
    header: "User",
    cell: (u) => (
      <>
        <p className="font-semibold text-[#0f2a4a]">{u.name}</p>
        <p className="text-xs text-[#94a3b8]">{u.email}</p>
      </>
    ),
  },
  { header: "Phone", cell: (u) => u.phone ?? "-" },
  {
    header: "Role",
    cell: (u) => <Badge tone={ROLE_TONE[u.role]}>{prettyEnum(u.role)}</Badge>,
  },
  {
    header: "Status",
    cell: (u) => (
      <Badge tone={u.isBlocked ? "red" : "green"}>
        {u.isBlocked ? "Blocked" : "Active"}
      </Badge>
    ),
  },
  { header: "Joined", cell: (u) => fmtDate(u.createdAt) },
  { header: "Actions", cell: (u) => <BlockUserButton user={u} /> },
];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const q = useAdminUsers({ page, limit: 10, searchTerm: search, role });

  return (
    <>
      <PageHeader
        title="Users"
        description="Everyone with an account on SwiftShip."
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
            label="Role"
            value={role}
            onChange={(v) => {
              setRole(v);
              setPage(1);
            }}
            options={ROLES.map((r) => ({ value: r, label: prettyEnum(r) }))}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={Users}
          emptyTitle="No users found"
          emptyText="Try a different search or filter."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>
    </>
  );
}
