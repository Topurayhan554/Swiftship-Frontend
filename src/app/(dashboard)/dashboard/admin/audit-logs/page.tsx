"use client";

import { useState } from "react";
import { ScrollText } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAuditLogs } from "@/hooks/useAdmin";
import {
  Badge,
  CARD,
  DataTable,
  FilterSelect,
  Pagination,
  SearchBox,
  Toolbar,
  fmtDateTime,
  prettyEnum,
  type Column,
} from "@/components/dashboard/admin/AdminUI";
import { AuditLog } from "@/types";

const ENTITIES = ["PARCEL", "USER", "PAYMENT", "REVIEW"];

const columns: Column<AuditLog>[] = [
  {
    header: "When",
    cell: (l) => (
      <span className="whitespace-nowrap">{fmtDateTime(l.createdAt)}</span>
    ),
  },
  {
    header: "Who",
    cell: (l) =>
      l.actor ? (
        <>
          <p>{l.actor.name}</p>
          <p className="text-xs text-[#94a3b8]">{prettyEnum(l.actor.role)}</p>
        </>
      ) : (
        <span className="text-xs text-[#94a3b8]">System</span>
      ),
  },
  {
    header: "Action",
    cell: (l) => <Badge tone="blue">{prettyEnum(l.action)}</Badge>,
  },
  {
    header: "Target",
    cell: (l) => (
      <>
        <p>{prettyEnum(l.entity)}</p>
        {l.entityId && (
          <p
            className="max-w-[160px] truncate text-xs text-[#94a3b8]"
            title={l.entityId}
          >
            {l.entityId}
          </p>
        )}
      </>
    ),
  },
  {
    header: "Details",
    cell: (l) =>
      l.meta ? (
        <details>
          <summary className="cursor-pointer text-xs font-semibold text-[#e8590c]">
            View
          </summary>
          <pre className="mt-2 max-w-xs overflow-x-auto rounded-lg bg-[#f8fafc] p-2 text-[11px] text-[#334155]">
            {JSON.stringify(l.meta, null, 2)}
          </pre>
        </details>
      ) : (
        <span className="text-xs text-[#94a3b8]">-</span>
      ),
  },
];

export default function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [entity, setEntity] = useState("");
  const q = useAuditLogs({ page, limit: 15, searchTerm: search, entity });

  return (
    <>
      <PageHeader
        title="Audit logs"
        description="A read-only record of important actions taken on the platform."
      />
      <div className={CARD}>
        <Toolbar>
          <SearchBox
            placeholder="Search action, user or target ID"
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
          <FilterSelect
            label="Target"
            value={entity}
            onChange={(v) => {
              setEntity(v);
              setPage(1);
            }}
            options={ENTITIES.map((e) => ({ value: e, label: prettyEnum(e) }))}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={ScrollText}
          emptyTitle="No activity yet"
          emptyText="Actions like status changes and assignments will be listed here."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>
    </>
  );
}
