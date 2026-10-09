import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { SERVICES } from "@/constants/home";

export default function ServicesSection() {
  return (
    <section className="bg-[#f7f9fc] py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Our Services"
          description="Flexible delivery solutions for your every need."
          actionLabel="View All Services"
          actionHref="/services"
        />

        <Stagger
          as="ul"
          gap={0.12}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map(({ title, text, image, href }) => (
            <StaggerItem as="li" key={title} lift={8}>
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(255,122,26,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
              >
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#ffe8d6] to-[#ffd3b0]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold text-[#0f2a4a]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#64748b]">
                    {text}
                  </p>
                  <span className="mt-auto flex justify-end pt-4">
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#ff7a1a] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
