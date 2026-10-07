import Link from "next/link";
import { Send } from "lucide-react";

type Props = {
  tagline?: boolean;
  invert?: boolean;
  className?: string;
};

// Swap the icon with your own <Logo /> if you already have a brand asset.
export default function BrandMark({
  tagline = false,
  invert = false,
  className = "",
}: Props) {
  return (
    <Link
      href="/"
      aria-label="SwiftLink home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Send
        aria-hidden="true"
        className="size-7 -rotate-12 fill-[#ee7b22] text-[#ee7b22]"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-xl font-bold tracking-tight ${invert ? "text-white" : "text-[#1a1c20]"}`}
        >
          SwiftLink
        </span>
        {tagline && (
          <span
            className={`mt-1 text-[10px] ${invert ? "text-white/60" : "text-[#6b6f76]"}`}
          >
            Delivering Your World
          </span>
        )}
      </span>
    </Link>
  );
}
