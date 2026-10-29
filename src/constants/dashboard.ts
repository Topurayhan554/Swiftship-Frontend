import {
  CreditCard,
  History,
  LayoutDashboard,
  Package,
  PackagePlus,
  ScrollText,
  Star,
  Truck,
  User,
  Users,
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
    {
      href: "/dashboard/courier/deliveries",
      label: "Active deliveries",
      icon: Truck,
    },
    {
      href: "/dashboard/courier/history",
      label: "History",
      icon: History,
    },
    {
      href: "/dashboard/courier/profile",
      label: "Profile",
      icon: User,
    },
  ],
  ADMIN: [
    {
      href: "/dashboard/admin",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/dashboard/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      href: "/dashboard/admin/couriers",
      label: "Couriers",
      icon: Truck,
    },
    {
      href: "/dashboard/admin/parcels",
      label: "Parcels",
      icon: Package,
    },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: CreditCard,
    },
    {
      href: "/dashboard/admin/reviews",
      label: "Reviews",
      icon: Star,
    },
    {
      href: "/dashboard/admin/audit-logs",
      label: "Audit logs",
      icon: ScrollText,
    },
  ],
};
