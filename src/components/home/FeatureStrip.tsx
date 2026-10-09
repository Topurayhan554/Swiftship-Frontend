import { FEATURES } from "@/constants/home";

export default function FeatureStrip() {
  return (
    <section aria-label="Why SwiftShip" className="bg-[#f7f9fc]">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/10">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex items-center gap-4 lg:px-6 lg:first:pl-0"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a]">
              <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#0f2a4a]">{title}</h3>
              <p className="mt-0.5 text-xs leading-snug text-[#64748b]">
                {text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
