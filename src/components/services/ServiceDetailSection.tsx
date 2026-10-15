import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import {
  Float,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { ServiceDetail } from "@/constants/services";

const BOOK_HREF = "/dashboard/customer/book";

export default function ServiceDetailSection({
  service,
  reverse,
}: {
  service: ServiceDetail;
  reverse?: boolean;
}) {
  const {
    id,
    icon: Icon,
    title,
    tagline,
    description,
    features,
    time,
    from,
    image,
  } = service;

  return (
    <section id={id} className="scroll-mt-24 overflow-hidden py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
        {/* Image */}
        <Reveal
          x={reverse ? 50 : -50}
          y={0}
          className={reverse ? "md:order-2" : ""}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-[#ffe8d6] to-[#ffd3b0] shadow-[0_16px_40px_rgba(15,42,74,0.12)] ring-1 ring-black/5">
            <Image
              src={image}
              alt={`${title} illustration`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <Float className="absolute bottom-4 left-4" y={6} duration={4}>
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-[#0f2a4a] shadow-lg backdrop-blur">
                <Clock aria-hidden="true" className="size-4 text-[#ff7a1a]" />
                {time}
              </span>
            </Float>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal x={reverse ? -50 : 50} y={0} delay={0.1}>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-[#ffe6d1] text-[#e8590c]">
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0f2a4a] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#ff7a1a]">{tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#475569]">
            {description}
          </p>

          <Stagger as="ul" gap={0.08} delay={0.2} className="mt-5 space-y-2.5">
            {features.map((f) => (
              <StaggerItem
                as="li"
                key={f}
                className="flex items-start gap-3 text-sm text-[#334155]"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a]/15 text-[#e8590c]">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={3}
                  />
                </span>
                {f}
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`${BOOK_HREF}?type=${encodeURIComponent(id)}`}
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff7a1a] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#ff7a1a]/25 transition-all hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
            >
              Book this service
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <p className="text-sm text-[#64748b]">
              Starting from{" "}
              <span className="text-lg font-bold text-[#0f2a4a]">{from}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
