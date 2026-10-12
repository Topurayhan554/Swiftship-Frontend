"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Home, Loader2, LogOut, Menu } from "lucide-react";
import { useLogout } from "@/hooks";

type User = { name?: string; email?: string; role?: string };

export default function Topbar({
  user,
  onMenu,
}: {
  user: User;
  onMenu: () => void;
}) {
  const { mutate: logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-black/5 bg-white/85 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="rounded-md p-2 text-[#0f2a4a] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>
      <div className="hidden lg:block" />

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Account menu"
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3 transition-colors hover:border-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-[#0f2a4a] text-xs font-semibold text-white">
            {initials}
          </span>
          <span className="hidden max-w-[120px] truncate text-sm font-medium text-[#0f2a4a] sm:block">
            {user.name}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 text-[#64748b] transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_40px_rgba(15,42,74,0.14)]"
            >
              <div className="border-b border-black/5 px-4 py-3">
                <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                  {user.name}
                </p>
                <p className="truncate text-xs text-[#64748b]">{user.email}</p>
                <span className="mt-2 inline-block rounded-full bg-[#ff7a1a]/10 px-2 py-0.5 text-[11px] font-medium capitalize text-[#c2570c]">
                  {user.role?.toLowerCase()}
                </span>
              </div>
              <div className="p-1.5">
                <Link
                  href="/"
                  role="menuitem"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#0f2a4a] hover:bg-[#f7f9fc]"
                >
                  <Home aria-hidden="true" className="size-4 text-[#64748b]" />
                  Back to website
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => logout()}
                  disabled={isPending}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  {isPending ? (
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <LogOut aria-hidden="true" className="size-4" />
                  )}
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
