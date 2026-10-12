"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { ROLE_HOME, ROLE_NAV, normalizeRole } from "@/constants/dashboard";
import { useGetMe } from "@/hooks";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const role = normalizeRole(user?.role);
  const [menuOpen, setMenuOpen] = useState(false);

  // /dashboard/<segment>/...  ->  segment is "customer" | "courier" | "admin"
  const segment = pathname.split("/")[2];
  const wrongArea = !!role && !!segment && segment !== role.toLowerCase();

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
        className="flex min-h-screen items-center justify-center bg-[#f7f9fc]"
        role="status"
        aria-label="Loading dashboard"
      >
        <Loader2
          aria-hidden="true"
          className="size-8 animate-spin text-[#ff7a1a]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar
        nav={ROLE_NAV[role]}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="lg:pl-64">
        <Topbar user={user} onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
