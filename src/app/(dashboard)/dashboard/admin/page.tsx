import { Hammer } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title="Admin dashboard" />
      <div className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5">
        <EmptyState
          icon={Hammer}
          title="Coming soon"
          text="This part of the dashboard is being built."
        />
      </div>
    </>
  );
}
