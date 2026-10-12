"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsRight, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import type { NavItem } from "@/constants/dashboard";

function NavList({
  nav,
  collapsed = false,
  onNavigate,
}: {
  nav: NavItem[];
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex-1 space-y-1 px-2">
      {nav.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-11 items-center rounded-md border-l-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7b22] ${
              active
                ? "border-[#ee7b22] bg-slate-100 text-[#0f2a4a] dark:bg-slate-800 dark:text-white"
                : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
            }`}
          >
            <span className="grid h-full w-11 shrink-0 place-content-center">
              <Icon aria-hidden="true" className="size-[18px]" />
            </span>
            {!collapsed && (
              <span className="truncate text-sm font-medium">{label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3 border-b border-slate-200 px-3 py-4 dark:border-slate-800">
      <span className="grid size-10 shrink-0 place-content-center rounded-lg bg-white ring-1 ring-slate-200 dark:ring-0">
        <Logo className="h-8 w-8" />
      </span>
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            SwiftShip
          </span>
          <span className="block text-[10px] font-semibold tracking-[0.18em] text-[#ee7b22]">
            DASHBOARD
          </span>
        </div>
      )}
    </div>
  );
}

function ToggleClose({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className="flex items-center border-t border-slate-200 p-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7b22] dark:border-slate-800 dark:hover:bg-slate-800/60"
    >
      <span className="grid size-12 shrink-0 place-content-center">
        <ChevronsRight
          aria-hidden="true"
          className={`size-4 text-slate-500 transition-transform duration-300 dark:text-slate-400 ${
            collapsed ? "" : "rotate-180"
          }`}
        />
      </span>
      {!collapsed && (
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Hide
        </span>
      )}
    </button>
  );
}

export default function Sidebar({
  nav,
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  nav: NavItem[];
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-slate-200 bg-white transition-[width] duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 lg:flex ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <Brand collapsed={collapsed} />
        <NavList nav={nav} collapsed={collapsed} />
        <ToggleClose collapsed={collapsed} onToggle={onToggleCollapse} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="relative">
                <Brand />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7b22] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
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
