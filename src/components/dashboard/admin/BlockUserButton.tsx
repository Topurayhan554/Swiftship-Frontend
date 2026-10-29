"use client";

import { useState } from "react";
import { BTN_DANGER, BTN_GHOST, ConfirmDialog } from "./AdminUI";
import { AdminUser } from "@/types";
import { useSetUserBlocked } from "@/hooks/useAdmin";

export default function BlockUserButton({ user }: { user: AdminUser }) {
  const [open, setOpen] = useState(false);
  const m = useSetUserBlocked();
  const blocking = !user.isBlocked;

  if (user.role === "SUPER_ADMIN")
    return <span className="text-xs text-[#94a3b8]">-</span>;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          m.reset();
          setOpen(true);
        }}
        className={blocking ? BTN_GHOST : BTN_DANGER}
      >
        {blocking ? "Block" : "Unblock"}
      </button>
      {open && (
        <ConfirmDialog
          title={blocking ? "Block this user?" : "Unblock this user?"}
          text={
            blocking
              ? `${user.name} will no longer be able to sign in or book parcels.`
              : `${user.name} will be able to use the platform again.`
          }
          confirmLabel={blocking ? "Block user" : "Unblock user"}
          danger={blocking}
          busy={m.isPending}
          error={m.error}
          onClose={() => setOpen(false)}
          onConfirm={() =>
            m.mutate(
              { id: user.id, isBlocked: blocking },
              { onSuccess: () => setOpen(false) },
            )
          }
        />
      )}
    </>
  );
}
