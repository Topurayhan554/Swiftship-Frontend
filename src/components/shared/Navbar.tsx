"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useGetMe, useLogout } from "@/hooks";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/track", label: "Track Parcel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data, isLoading } = useGetMe();
  const user = data?.data;

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Logo className="h-10 w-10" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive(href)
                    ? "text-[#0f2a4a]"
                    : "text-[#64748b] hover:text-[#0f2a4a]"
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute inset-x-3 -bottom-[13px] h-[3px] rounded-full bg-[#ff7a1a]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-[#e2e8f0]" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-full border border-[#e2e8f0] py-1 pl-1 pr-3 transition hover:border-[#ff7a1a]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f2a4a] text-xs font-semibold text-white">
                  {initials}
                </span>
                <span className="hidden max-w-[110px] truncate text-sm font-medium text-[#0f2a4a] sm:block">
                  {user.name}
                </span>
                <ChevronDown
                  className={`size-4 text-[#94a3b8] transition ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                >
                  <div className="border-b border-[#e2e8f0] px-4 py-3">
                    <p className="truncate text-sm font-semibold text-[#0f2a4a]">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[#94a3b8]">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#ff7a1a]/10 px-2 py-0.5 text-[11px] font-medium capitalize text-[#ff7a1a]">
                      {user.role?.toLowerCase()}
                    </span>
                  </div>

                  <div className="p-1.5">
                    {/* TODO: Dashboard link pore add korbe */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => logout()}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <LogOut className="size-4" />
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
                className="hidden text-sm font-medium text-[#334155] transition hover:text-[#ff7a1a] sm:block"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[#0f2a4a] px-4 py-2 text-sm font-medium text-white shadow-md shadow-[#0f2a4a]/20 transition hover:bg-[#143a63]"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="rounded-md p-2 text-[#0f2a4a] hover:bg-[#f7f9fc] md:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#e2e8f0] bg-white md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(href)
                      ? "bg-[#ff7a1a]/10 text-[#0f2a4a]"
                      : "text-[#64748b] hover:bg-[#f7f9fc]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {!isLoading && !user && (
              <li>
                <Link
                  href="/login"
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#64748b] hover:bg-[#f7f9fc]"
                >
                  Login
                </Link>
              </li>
            )}

            {user && (
              <li className="border-t border-[#e2e8f0] pt-2">
                <button
                  type="button"
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  <LogOut className="size-4" />
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
