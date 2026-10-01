import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  asLink?: boolean;
  className?: string;
};

export default function Logo({ asLink = true, className }: LogoProps) {
  const image = (
    <div className={cn("relative h-15 w-15", className)}>
      <Image
        src="/swiftship-logo.png"
        alt="SwiftShip"
        fill
        className="object-contain object-left"
        priority
        sizes="60px"
      />
    </div>
  );

  if (!asLink) return image;

  return (
    <Link href="/" aria-label="SwiftShip home">
      {image}
    </Link>
  );
}
