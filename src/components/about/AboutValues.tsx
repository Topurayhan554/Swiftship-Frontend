import SectionHeader from "@/components/shared/SectionHeader";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { ABOUT_VALUES } from "@/constants/about";

export default function AboutValues() {
  return (
    <section className="bg-[#f7f9fc] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="What we stand for"
          description="The values behind every delivery."
        />

        <Stagger
          as="ul"
          gap={0.12}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ABOUT_VALUES.map(({ icon: Icon, title, text }) => (
            <StaggerItem as="li" key={title} lift={8}>
              <div className="group h-full rounded-2xl bg-white p-6 shadow-[0_6px_24px_rgba(15,42,74,0.06)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(255,122,26,0.2)]">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff7a1a] group-hover:text-white">
                  <Icon
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.7}
                  />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[#0f2a4a]">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748b]">
                  {text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
