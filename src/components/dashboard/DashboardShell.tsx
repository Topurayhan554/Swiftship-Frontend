"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ROLE_NAV, type DashboardRole } from "@/constants/dashboard";
import { useGetMe } from "@/hooks";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const STORAGE_KEY = "swiftship-sidebar-collapsed";

export default function DashboardShell({
  userRole,
  children,
}: {
  userRole: DashboardRole;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { data } = useGetMe();
  const user = data?.data;

  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCollapsed = () =>
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar
        nav={ROLE_NAV[userRole]}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
      />
      <div
        className={`transition-[padding] duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}
      >
        <Topbar user={user ?? {}} onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
