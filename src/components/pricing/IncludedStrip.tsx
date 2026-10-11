import { Headphones, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/shared/motion";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Insurance included",
    text: "Every parcel is protected",
  },
  { icon: MapPin, title: "Live tracking", text: "Follow every step" },
  {
    icon: Wallet,
    title: "No hidden fees",
    text: "What you see is what you pay",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    text: "We're always here to help",
  },
];

export default function IncludedStrip() {
  return (
    <section
      aria-label="Included with every shipment"
      className="bg-[#f7f9fc] py-14"
    >
      <Stagger
        as="ul"
        gap={0.1}
        className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <StaggerItem
            as="li"
            key={title}
            lift={4}
            className="group flex items-center gap-4"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ffe6d1] text-[#0f2a4a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff7a1a] group-hover:text-white">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#0f2a4a]">{title}</h3>
              <p className="mt-0.5 text-xs text-[#64748b]">{text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
