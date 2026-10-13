"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useGetMe } from "@/hooks";
import GuardSpinner from "./guard-spinner";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const user = data?.data;

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <GuardSpinner />;
  return <>{children}</>;
}
