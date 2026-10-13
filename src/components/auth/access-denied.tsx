import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied({ href = "/" }: { href?: string }) {
  return (
    <div
      role="alert"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#f7f9fc] px-4 text-center"
    >
      <div className="rounded-full bg-red-100 p-4">
        <ShieldAlert aria-hidden="true" className="size-10 text-red-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-[#0f2a4a]">
          You do not have access to this page
        </h1>
        <p className="text-sm text-[#64748b]">
          This area is for a different account type.
        </p>
      </div>
      <Link
        href={href}
        className="rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
      >
        Go to my dashboard
      </Link>
    </div>
  );
}
