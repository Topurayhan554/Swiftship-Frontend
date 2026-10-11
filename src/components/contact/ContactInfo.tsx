import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { CONTACT_INFO } from "@/constants/contact";

export default function ContactInfo() {
  return (
    <div className="space-y-5">
      <Stagger as="ul" gap={0.1} className="space-y-4">
        {CONTACT_INFO.map(({ icon: Icon, title, lines, href }) => {
          const body = (
            <>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff7a1a] group-hover:text-white">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#0f2a4a]">
                  {title}
                </h3>
                {lines.map((l) => (
                  <p
                    key={l}
                    className="mt-0.5 break-words text-sm text-[#64748b]"
                  >
                    {l}
                  </p>
                ))}
              </div>
            </>
          );
          const cls =
            "group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(255,122,26,0.18)]";

          return (
            <StaggerItem as="li" key={title} lift={4}>
              {href ? (
                <a
                  href={href}
                  className={`${cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]`}
                >
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.2}>
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f2a4a] to-[#143a63] p-6 text-white">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 -z-10 size-36 rounded-full bg-[#ff7a1a]/25 blur-3xl"
          />
          <PackageSearch aria-hidden="true" className="size-7 text-[#ff7a1a]" />
          <h3 className="mt-3 text-base font-bold">Looking for your parcel?</h3>
          <p className="mt-1 text-sm text-white/70">
            Track it instantly with your tracking ID, no need to contact us.
          </p>
          <Link
            href="/track"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Track parcel
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
