"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { NAV_LINKS } from "@/constants/home";
import { useGetMe, useLogout } from "@/hooks";

const DASHBOARD_ROUTES: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SENDER: "/dashboard/sender",
  RECEIVER: "/dashboard/receiver",
};

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2";

export default function Navbar() {
  const pathname = usePathname();
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dashboardHref =
    DASHBOARD_ROUTES[user?.role?.toUpperCase() ?? ""] ?? "/dashboard";

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-[#f7f9fc]/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-4"
      >
        <Logo className="h-10 w-10" />

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative rounded-sm py-1 text-[13px] font-medium transition-colors ${ring} ${
                  isActive(href)
                    ? "text-[#0f2a4a]"
                    : "text-[#64748b] hover:text-[#0f2a4a]"
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-[#ff7a1a]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <Link
            href="/track"
            aria-label="Track a parcel"
            className={`hidden rounded-full p-2 text-[#0f2a4a] transition-colors hover:bg-black/5 sm:block ${ring}`}
          >
            <Search aria-hidden="true" className="size-4" />
          </Link>

          {isLoading ? (
            <div
              aria-hidden="true"
              className="h-9 w-28 animate-pulse rounded-full bg-black/5"
            />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                className={`flex items-center gap-2 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3 transition-colors hover:border-[#ff7a1a] ${ring}`}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-[#0f2a4a] text-xs font-semibold text-white">
                  {initials}
                </span>
                <span className="hidden max-w-[110px] truncate text-sm font-medium text-[#0f2a4a] sm:block">
                  {user.name}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 text-[#64748b] transition-transform ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_40px_rgba(15,42,74,0.14)]"
                >
                  <div className="border-b border-black/5 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#64748b]">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#ff7a1a]/10 px-2 py-0.5 text-[11px] font-medium capitalize text-[#c2570c]">
                      {user.role?.toLowerCase()}
                    </span>
                  </div>
                  <div className="p-1.5">
                    <Link
                      href={dashboardHref}
                      role="menuitem"
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#0f2a4a] transition-colors hover:bg-[#f7f9fc] ${ring}`}
                    >
                      <LayoutDashboard
                        aria-hidden="true"
                        className="size-4 text-[#64748b]"
                      />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => logout()}
                      disabled={isLoggingOut}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 ${ring}`}
                    >
                      {isLoggingOut ? (
                        <Loader2
                          aria-hidden="true"
                          className="size-4 animate-spin"
                        />
                      ) : (
                        <LogOut aria-hidden="true" className="size-4" />
                      )}
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`hidden rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] sm:block ${ring}`}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className={`rounded-full bg-[#ff7a1a] px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-[#ff7a1a]/25 transition-colors hover:bg-[#e8590c] ${ring}`}
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`rounded-md p-2 text-[#0f2a4a] transition-colors hover:bg-black/5 lg:hidden ${ring}`}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-black/5 bg-[#f7f9fc] shadow-lg lg:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${ring} ${
                    isActive(href)
                      ? "bg-[#ff7a1a]/10 text-[#0f2a4a]"
                      : "text-[#64748b] hover:bg-black/5"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {!isLoading && !user && (
              <li className="border-t border-black/5 pt-2">
                <Link
                  href="/login"
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium text-[#64748b] hover:bg-black/5 ${ring}`}
                >
                  Log in
                </Link>
              </li>
            )}
            {user && (
              <li className="space-y-1 border-t border-black/5 pt-2">
                <Link
                  href={dashboardHref}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#0f2a4a] hover:bg-black/5 ${ring}`}
                >
                  <LayoutDashboard aria-hidden="true" className="size-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 ${ring}`}
                >
                  {isLoggingOut ? (
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  ) : (
                    <LogOut aria-hidden="true" className="size-4" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
