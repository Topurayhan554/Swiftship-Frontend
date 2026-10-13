"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import {
  ROLE_HOME,
  normalizeRole,
  type DashboardRole,
} from "@/constants/dashboard";
import { useGetMe } from "@/hooks";
import GuardSpinner from "./guard-spinner";

export default function RoleGuard({
  roles,
  children,
}: {
  roles: DashboardRole[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const role = normalizeRole(data?.data?.role);
  const allowed = !!role && roles.includes(role);

  useEffect(() => {
    if (isLoading || !role) return;
    if (!allowed) router.replace(ROLE_HOME[role]);
  }, [isLoading, role, allowed, router]);

  if (isLoading || !allowed) return <GuardSpinner />;
  return <>{children}</>;
}
