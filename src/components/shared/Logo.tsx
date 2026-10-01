import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="relative h-15 w-15">
        <Image
          src="/swiftship-logo.png"
          alt="SwiftShip"
          fill
          className="object-contain object-left"
          priority
          sizes="100"
        />
      </div>
    </Link>
  );
}
