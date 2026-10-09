"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { EASE } from "@/components/shared/motion";
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
  const reduce = useReducedMotion() ?? false;
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
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
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`sticky top-0 z-50 bg-[#f7f9fc]/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(15,42,74,0.08)]" : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-4"
      >
        <motion.div
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          className="flex shrink-0 items-center gap-2.5"
        >
          <Logo className="h-10 w-10" />
          <Link
            href="/"
            aria-label="SwiftShip home"
            className={`rounded-sm text-xl font-bold tracking-tight text-[#0f2a4a] ${ring}`}
          >
            Swift<span className="text-[#ff7a1a]">Ship</span>
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ href, label }, i) => (
            <motion.li
              key={href}
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.06, ease: EASE }}
            >
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
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-[#ff7a1a]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.1 }}
            whileTap={reduce ? undefined : { scale: 0.9 }}
            className="hidden sm:block"
          >
            <Link
              href="/track"
              aria-label="Track a parcel"
              className={`block rounded-full p-2 text-[#0f2a4a] transition-colors hover:bg-black/5 ${ring}`}
            >
              <Search aria-hidden="true" className="size-4" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div
              aria-hidden="true"
              className="h-9 w-28 animate-pulse rounded-full bg-black/5"
            />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <motion.button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Account menu"
                whileTap={reduce ? undefined : { scale: 0.96 }}
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
                  className={`size-4 text-[#64748b] transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    role="menu"
                    key="account-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: EASE }}
                    style={{ transformOrigin: "top right" }}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                className="hidden sm:block"
              >
                <Link
                  href="/login"
                  className={`block rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] ${ring}`}
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className={`block rounded-full bg-[#ff7a1a] px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-[#ff7a1a]/25 transition-colors hover:bg-[#e8590c] ${ring}`}
                >
                  Sign Up
                </Link>
              </motion.div>
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                className="block"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-black/5 bg-[#f7f9fc] shadow-lg lg:hidden"
          >
            <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 + i * 0.04,
                    ease: EASE,
                  }}
                >
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
                </motion.li>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
