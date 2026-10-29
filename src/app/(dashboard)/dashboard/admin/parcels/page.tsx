"use client";

import { useState } from "react";
import { Loader2, Package } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { formatFee } from "@/lib/parcel";
import {
  ALLOWED_NEXT,
  PARCEL_STATUSES,
  type AdminParcel,
  type ParcelStatus,
} from "@/types";
import {
  useAdminParcels,
  useAssignCourier,
  useCancelParcel,
  useCouriersForAssign,
  useUpdateParcelStatus,
} from "@/hooks/useAdmin";
import {
  BTN_GHOST,
  BTN_PRIMARY,
  Badge,
  CARD,
  ConfirmDialog,
  DataTable,
  FilterSelect,
  Modal,
  PARCEL_TONE,
  PAYMENT_TONE,
  Pagination,
  SearchBox,
  Toolbar,
  fieldClass,
  fmtDate,
  prettyEnum,
  type Column,
} from "@/components/dashboard/admin/AdminUI";

type Dialog = {
  type: "assign" | "status" | "cancel";
  parcel: AdminParcel;
} | null;

const TYPES = ["DOCUMENT", "PACKAGE", "FRAGILE", "ELECTRONICS", "OTHER"];

const statusOptions = (p: AdminParcel) =>
  ALLOWED_NEXT[p.status].filter((s) => s !== "ASSIGNED" && s !== "CANCELLED");

export default function AdminParcelsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [dialog, setDialog] = useState<Dialog>(null);

  const q = useAdminParcels({
    page,
    limit: 10,
    searchTerm: search,
    status,
    parcelType: type,
  });
  const close = () => setDialog(null);

  const columns: Column<AdminParcel>[] = [
    {
      header: "Parcel",
      cell: (p) => (
        <>
          <p className="font-semibold text-[#0f2a4a]">{p.trackingId}</p>
          <p className="text-xs text-[#94a3b8]">
            {prettyEnum(p.parcelType)} &middot; {p.weightKg} kg &middot;{" "}
            {fmtDate(p.createdAt)}
          </p>
        </>
      ),
    },
    {
      header: "Route",
      cell: (p) => (
        <>
          <p>
            {p.pickupUpazila}, {p.pickupDistrict}
          </p>
          <p className="text-xs text-[#94a3b8]">
            to {p.deliveryUpazila}, {p.deliveryDistrict}
          </p>
        </>
      ),
    },
    {
      header: "Customer / Receiver",
      cell: (p) => (
        <>
          <p>{p.sender.name}</p>
          <p className="text-xs text-[#94a3b8]">
            to {p.receiverName} &middot;{" "}
            <a href={`tel:${p.receiverPhone}`} className="hover:text-[#e8590c]">
              {p.receiverPhone}
            </a>
          </p>
        </>
      ),
    },
    {
      header: "Courier",
      cell: (p) =>
        p.courier ? (
          <>
            <p>{p.courier.name}</p>
            <p className="text-xs text-[#94a3b8]">
              {p.courier.vehicleType ?? p.courier.phone ?? ""}
            </p>
          </>
        ) : (
          <span className="text-xs text-[#94a3b8]">Not assigned</span>
        ),
    },
    {
      header: "Fee",
      cell: (p) => (
        <>
          <p className="font-semibold text-[#0f2a4a]">{formatFee(p.fee)}</p>
          <Badge tone={p.payment ? PAYMENT_TONE[p.payment.status] : "gray"}>
            {p.payment ? prettyEnum(p.payment.status) : "Unpaid"}
          </Badge>
        </>
      ),
    },
    {
      header: "Status",
      cell: (p) => (
        <Badge tone={PARCEL_TONE[p.status]}>{prettyEnum(p.status)}</Badge>
      ),
    },
    {
      header: "Actions",
      cell: (p) => {
        const canCancel = p.status === "PENDING" || p.status === "APPROVED";
        const options = statusOptions(p);
        return (
          <div className="flex flex-wrap gap-1.5">
            {p.status === "APPROVED" && (
              <button
                type="button"
                className={BTN_PRIMARY}
                onClick={() => setDialog({ type: "assign", parcel: p })}
              >
                Assign
              </button>
            )}
            {options.length > 0 && (
              <button
                type="button"
                className={BTN_GHOST}
                onClick={() => setDialog({ type: "status", parcel: p })}
              >
                Update status
              </button>
            )}
            {canCancel && (
              <button
                type="button"
                className={BTN_GHOST}
                onClick={() => setDialog({ type: "cancel", parcel: p })}
              >
                Cancel
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Parcels"
        description="Review bookings, assign couriers and move parcels through delivery."
      />
      <div className={CARD}>
        <Toolbar>
          <SearchBox
            placeholder="Search tracking ID, receiver name or phone"
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
            options={PARCEL_STATUSES.map((s) => ({
              value: s,
              label: prettyEnum(s),
            }))}
          />
          <FilterSelect
            label="Type"
            value={type}
            onChange={(v) => {
              setType(v);
              setPage(1);
            }}
            options={TYPES.map((t) => ({ value: t, label: prettyEnum(t) }))}
          />
        </Toolbar>
        <DataTable
          columns={columns}
          rows={q.data?.data}
          isLoading={q.isLoading}
          error={q.error}
          icon={Package}
          emptyTitle="No parcels found"
          emptyText="Try a different search or filter."
        />
        <Pagination meta={q.data?.meta} onPage={setPage} />
      </div>

      {dialog?.type === "assign" && (
        <AssignDialog parcel={dialog.parcel} onClose={close} />
      )}
      {dialog?.type === "status" && (
        <StatusDialog parcel={dialog.parcel} onClose={close} />
      )}
      {dialog?.type === "cancel" && (
        <CancelDialog parcel={dialog.parcel} onClose={close} />
      )}
    </>
  );
}

function AssignDialog({
  parcel,
  onClose,
}: {
  parcel: AdminParcel;
  onClose: () => void;
}) {
  const couriers = useCouriersForAssign();
  const assign = useAssignCourier();
  const [courierId, setCourierId] = useState("");
  const available = (couriers.data?.data ?? []).filter(
    (c) => c.isAvailable !== false,
  );

  return (
    <Modal
      title={`Assign courier to ${parcel.trackingId}`}
      onClose={onClose}
      busy={assign.isPending}
    >
      <p className="text-sm text-[#64748b]">
        {parcel.pickupUpazila}, {parcel.pickupDistrict} to{" "}
        {parcel.deliveryUpazila}, {parcel.deliveryDistrict}
      </p>
      <label
        htmlFor="courier"
        className="mb-1.5 mt-4 block text-[13px] font-medium text-[#334155]"
      >
        Available couriers
      </label>
      {couriers.isLoading ? (
        <p className="text-sm text-[#94a3b8]">Loading couriers...</p>
      ) : available.length === 0 ? (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
          No courier is available right now.
        </p>
      ) : (
        <select
          id="courier"
          value={courierId}
          onChange={(e) => setCourierId(e.target.value)}
          className={fieldClass}
        >
          <option value="">Select a courier</option>
          {available.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.vehicleType ? ` (${c.vehicleType})` : ""}
            </option>
          ))}
        </select>
      )}
      {(assign.error || couriers.error) && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {(assign.error ?? couriers.error)?.message}
        </p>
      )}
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          className={BTN_GHOST}
          onClick={onClose}
          disabled={assign.isPending}
        >
          Close
        </button>
        <button
          type="button"
          className={BTN_PRIMARY}
          disabled={!courierId || assign.isPending}
          onClick={() =>
            assign.mutate({ id: parcel.id, courierId }, { onSuccess: onClose })
          }
        >
          {assign.isPending && (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          )}
          Assign
        </button>
      </div>
    </Modal>
  );
}

function StatusDialog({
  parcel,
  onClose,
}: {
  parcel: AdminParcel;
  onClose: () => void;
}) {
  const update = useUpdateParcelStatus();
  const options = statusOptions(parcel);
  const [next, setNext] = useState<ParcelStatus>(options[0]);
  const [note, setNote] = useState("");

  return (
    <Modal
      title={`Update ${parcel.trackingId}`}
      onClose={onClose}
      busy={update.isPending}
    >
      <p className="text-sm text-[#64748b]">
        Current status: {prettyEnum(parcel.status)}
      </p>
      <label
        htmlFor="next-status"
        className="mb-1.5 mt-4 block text-[13px] font-medium text-[#334155]"
      >
        New status
      </label>
      <select
        id="next-status"
        value={next}
        onChange={(e) => setNext(e.target.value as ParcelStatus)}
        className={fieldClass}
      >
        {options.map((s) => (
          <option key={s} value={s}>
            {prettyEnum(s)}
          </option>
        ))}
      </select>
      <label
        htmlFor="note"
        className="mb-1.5 mt-4 block text-[13px] font-medium text-[#334155]"
      >
        Note <span className="font-normal text-[#94a3b8]">(optional)</span>
      </label>
      <input
        id="note"
        value={note}
        maxLength={300}
        onChange={(e) => setNote(e.target.value)}
        className={fieldClass}
        placeholder="Shown in the tracking history"
      />
      {update.error && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {update.error.message}
        </p>
      )}
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          className={BTN_GHOST}
          onClick={onClose}
          disabled={update.isPending}
        >
          Close
        </button>
        <button
          type="button"
          className={BTN_PRIMARY}
          disabled={update.isPending}
          onClick={() =>
            update.mutate(
              { id: parcel.id, status: next, note: note.trim() || undefined },
              { onSuccess: onClose },
            )
          }
        >
          {update.isPending && (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          )}
          Update
        </button>
      </div>
    </Modal>
  );
}

function CancelDialog({
  parcel,
  onClose,
}: {
  parcel: AdminParcel;
  onClose: () => void;
}) {
  const cancel = useCancelParcel();
  return (
    <ConfirmDialog
      title="Cancel this parcel?"
      text={`${parcel.trackingId} will be cancelled and can no longer be delivered.`}
      confirmLabel="Cancel parcel"
      danger
      busy={cancel.isPending}
      error={cancel.error}
      onClose={onClose}
      onConfirm={() => cancel.mutate(parcel.id, { onSuccess: onClose })}
    />
  );
}
