"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/shared/motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { INTL_RATES } from "@/constants/pricing";

export default function InternationalRates() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          title="International rates"
          description="Starting prices for popular destinations."
        />

        <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-black/5">
          <table className="w-full min-w-[420px] text-left text-sm">
            <caption className="sr-only">
              International shipping rates by country
            </caption>
            <thead className="bg-[#f7f9fc] text-xs uppercase tracking-wider text-[#64748b]">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Country
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  Delivery time
                </th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">
                  From
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {INTL_RATES.map(({ country, from, days }, i) => (
                <motion.tr
                  key={country}
                  className="transition-colors hover:bg-[#ff7a1a]/5"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 font-semibold text-[#0f2a4a]"
                  >
                    {country}
                  </th>
                  <td className="px-5 py-3.5 text-[#64748b]">{days}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#e8590c]">
                    ${from.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
