"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import type { NavItem } from "@/constants/dashboard";

function NavList({
  nav,
  onNavigate,
}: {
  nav: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3">
      {nav.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${
              active
                ? "text-white"
                : "text-white/65 hover:bg-white/5 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="sidebar-active"
                className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {active && (
              <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-1 rounded-r-full bg-[#ff7a1a]" />
            )}
            <Icon
              aria-hidden="true"
              className={`relative size-[18px] ${active ? "text-[#ff7a1a]" : ""}`}
            />
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-5">
      <span className="rounded-xl bg-white p-1.5">
        <Logo className="h-8 w-8" />
      </span>
      <span className="text-lg font-bold tracking-tight text-white">
        SwiftShip
      </span>
    </div>
  );
}

export default function Sidebar({
  nav,
  open,
  onClose,
}: {
  nav: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0f2a4a] lg:flex">
        <Brand />
        <NavList nav={nav} />
        <p className="px-5 py-4 text-[11px] text-white/40">
          &copy; {new Date().getFullYear()} SwiftShip
        </p>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-[#0f2a4a]/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0f2a4a] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between pr-3">
                <Brand />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
              <NavList nav={nav} onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
