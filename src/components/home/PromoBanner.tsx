import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-[#f7f9fc] pb-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative isolate overflow-hidden rounded-2xl bg-[#0f2a4a]">
          <Image
            src="/images/promo-boxes.jpg"
            alt=""
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="-z-10 object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f2a4a] via-[#0f2a4a]/85 to-transparent" />

          <div className="px-8 py-12 sm:px-12 sm:py-14">
            <p className="text-sm font-semibold text-[#ff7a1a]">
              Special Offer
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Get 30% Off
              <span className="block text-2xl font-bold sm:text-3xl">
                on Your First Shipment
              </span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              Sign up today and enjoy a special discount on your first delivery.
            </p>
            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2a4a]"
            >
              Create Account
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
