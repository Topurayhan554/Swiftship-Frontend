import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/motion";

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
    <Reveal className="flex items-end justify-between gap-4" y={20}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0f2a4a] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-[#64748b]">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 rounded-md text-sm font-medium text-[#0f2a4a] transition-colors hover:text-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
        >
          {actionLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 text-[#ff7a1a] transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </Reveal>
  );
}
