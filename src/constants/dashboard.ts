import {
  LayoutDashboard,
  Package,
  PackagePlus,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "ADMIN" | "CUSTOMER" | "COURIER";

export function normalizeRole(raw?: string | null): DashboardRole | undefined {
  const r = raw?.toUpperCase();
  if (r === "ADMIN" || r === "SUPER_ADMIN") return "ADMIN";
  if (r === "COURIER") return "COURIER";
  if (r === "CUSTOMER" || r === "USER") return "CUSTOMER";
  return undefined;
}

export const ROLE_HOME: Record<DashboardRole, string> = {
  ADMIN: "/dashboard/admin",
  CUSTOMER: "/dashboard/customer",
  COURIER: "/dashboard/courier",
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const ROLE_NAV: Record<DashboardRole, NavItem[]> = {
  CUSTOMER: [
    {
      href: "/dashboard/customer",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    { href: "/dashboard/customer/parcels", label: "My parcels", icon: Package },
    {
      href: "/dashboard/customer/book",
      label: "Book a parcel",
      icon: PackagePlus,
    },
  ],
  COURIER: [
    {
      href: "/dashboard/courier",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
  ],
  ADMIN: [
    {
      href: "/dashboard/admin",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
  ],
};
