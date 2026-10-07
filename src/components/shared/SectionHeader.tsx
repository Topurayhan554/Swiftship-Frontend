import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export default function SectionHeader({
  title,
  description,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1a1c20] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-[#6b6f76]">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 rounded-md text-sm font-medium text-[#1a1c20] transition-colors hover:text-[#ee7b22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee7b22]"
        >
          {actionLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-[#ee7b22] transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
