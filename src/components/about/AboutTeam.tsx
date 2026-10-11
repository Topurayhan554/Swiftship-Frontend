import SectionHeader from "@/components/shared/SectionHeader";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { TEAM } from "@/constants/about";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function AboutTeam() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Meet the team"
          description="The people who keep your parcels moving."
        />

        <Stagger
          as="ul"
          gap={0.12}
          className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {TEAM.map(({ name, role }, i) => (
            <StaggerItem as="li" key={`${name}-${i}`} lift={8}>
              <div className="group rounded-2xl bg-[#f7f9fc] p-6 text-center ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(15,42,74,0.1)]">
                <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a1a] to-[#e8590c] text-2xl font-bold text-white shadow-lg shadow-[#ff7a1a]/30 transition-transform duration-300 group-hover:scale-110">
                  {initials(name)}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[#0f2a4a]">
                  {name}
                </h3>
                <p className="mt-0.5 text-xs text-[#64748b]">{role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
