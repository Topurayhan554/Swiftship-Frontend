import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-[#ffe6d1] text-[#e8590c]">
        <Icon aria-hidden="true" className="size-8" strokeWidth={1.6} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-[#0f2a4a]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[#64748b]">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
