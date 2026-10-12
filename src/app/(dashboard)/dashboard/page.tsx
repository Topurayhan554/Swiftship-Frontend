"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROLE_HOME, normalizeRole } from "@/constants/dashboard";
import { useGetMe } from "@/hooks";

export default function DashboardIndex() {
  const router = useRouter();
  const { data } = useGetMe();
  const role = normalizeRole(data?.data?.role);

  useEffect(() => {
    if (role) router.replace(ROLE_HOME[role]);
  }, [role, router]);

  return null;
}
