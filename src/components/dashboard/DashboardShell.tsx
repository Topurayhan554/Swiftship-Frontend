"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { ROLE_HOME, ROLE_NAV, normalizeRole } from "@/constants/dashboard";
import { useGetMe } from "@/hooks";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const pageBg = "bg-slate-50 dark:bg-slate-950";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const role = normalizeRole(user?.role);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // /dashboard/<segment>/...  ->  segment is "customer" | "courier" | "admin"
  const segment = pathname.split("/")[2];
  const wrongArea = !!role && !!segment && segment !== role.toLowerCase();

  // theme: saved choice -> else system preference. Hydration-safe (runs after mount)
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    // dashboard theke berole public site e dark class jeno na thake
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !role) {
      router.replace("/login");
      return;
    }
    if (wrongArea) router.replace(ROLE_HOME[role]);
  }, [isLoading, user, role, wrongArea, router]);

  if (isLoading || !user || !role || wrongArea) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${pageBg}`}
        role="status"
        aria-label="Loading dashboard"
      >
        <Loader2
          aria-hidden="true"
          className="size-8 animate-spin text-[#ee7b22]"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen text-slate-900 dark:text-slate-100 ${pageBg}`}
    >
      <Sidebar
        nav={ROLE_NAV[role]}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((p) => !p)}
      />
      <div
        className={`transition-[padding] duration-300 ease-in-out ${
          collapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        <Topbar
          user={user}
          onMenu={() => setMenuOpen(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
