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
import AccessDenied from "./access-denied";

export default function RoleGuard({
  roles,
  children,
}: {
  roles: DashboardRole[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;
  const role = normalizeRole(user?.role);
  const isLoggedOut = !isPending && (isError || !user);
  const allowed = !!role && roles.includes(role);

  useEffect(() => {
    if (isLoggedOut) router.replace("/login");
  }, [isLoggedOut, router]);

  if (isPending || isLoggedOut) return <GuardSpinner />;

  if (!allowed) {
    return <AccessDenied href={role ? ROLE_HOME[role] : "/"} />;
  }

  return <>{children}</>;
}
