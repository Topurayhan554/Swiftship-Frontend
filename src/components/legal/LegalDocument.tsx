"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, FileText } from "lucide-react";
import { Float, Reveal } from "@/components/shared/motion";
import type { LegalSection } from "@/constants/legal";

type Props = {
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  highlight,
  intro,
  updated,
  sections,
}: Props) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const tocLink = (id: string, label: string, n: number, mobile = false) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={goTo(id)}
      aria-current={active === id ? "true" : undefined}
      className={`relative block rounded-lg py-2 pl-4 pr-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] ${
        active === id
          ? "font-semibold text-[#0f2a4a]"
          : "text-[#64748b] hover:text-[#0f2a4a]"
      }`}
    >
      {!mobile && active === id && (
        <motion.span
          layoutId="toc-bar"
          className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-0.5 rounded-full bg-[#ff7a1a]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="mr-2 text-[#94a3b8]">{n}.</span>
      {label}
    </a>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#ffe8d6] via-[#fff4ea] to-[#f7f9fc]">
        <div
          aria-hidden="true"
          className="absolute -left-24 top-0 -z-10 size-72 rounded-full bg-[#ff7a1a]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-0 -z-10 size-80 rounded-full bg-[#ffb27a]/25 blur-3xl"
        />

        <Float
          className="absolute right-[12%] top-14 hidden md:block"
          y={14}
          rotate={6}
          duration={5}
        >
          <span className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-xl shadow-[#0f2a4a]/10 ring-1 ring-black/5">
            <FileText aria-hidden="true" className="size-8 text-[#ff7a1a]" />
          </span>
        </Float>

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pt-20">
          <Reveal y={16}>
            <p className="text-[11px] font-medium tracking-[0.2em] text-[#64748b]">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f2a4a] sm:text-5xl">
              {title}{" "}
              <span className="bg-gradient-to-r from-[#ff7a1a] to-[#e8590c] bg-clip-text text-transparent">
                {highlight}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#475569]">
              {intro}
            </p>
            <p className="mt-3 text-xs font-medium text-[#64748b]">
              Last updated: {updated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#f7f9fc] py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <aside>
            {/* Mobile: collapsible */}
            <details className="group rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#0f2a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]">
                On this page
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 text-[#ff7a1a] transition-transform group-open:rotate-180"
                />
              </summary>
              <nav
                aria-label="On this page"
                className="mt-3 border-t border-black/5 pt-2"
              >
                {sections.map((s, i) => tocLink(s.id, s.title, i + 1, true))}
              </nav>
            </details>

            {/* Desktop: sticky */}
            <nav
              aria-label="On this page"
              className="sticky top-24 hidden border-l border-black/10 lg:block"
            >
              <p className="mb-2 pl-4 text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                On this page
              </p>
              {sections.map((s, i) => tocLink(s.id, s.title, i + 1))}
            </nav>
          </aside>

          {/* Content */}
          <article className="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(15,42,74,0.08)] ring-1 ring-black/5 sm:p-10">
            <div className="space-y-10">
              {sections.map((s, i) => (
                <Reveal key={s.id} y={20}>
                  <section id={s.id} className="scroll-mt-24">
                    <h2 className="text-xl font-bold tracking-tight text-[#0f2a4a]">
                      <span className="mr-2 text-[#ff7a1a]">{i + 1}.</span>
                      {s.title}
                    </h2>
                    {s.body?.map((p) => (
                      <p
                        key={p}
                        className="mt-3 text-[15px] leading-relaxed text-[#475569]"
                      >
                        {p}
                      </p>
                    ))}
                    {s.list && (
                      <ul className="mt-3 space-y-2">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[15px] leading-relaxed text-[#475569]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#ff7a1a]"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.after?.map((p) => (
                      <p
                        key={p}
                        className="mt-3 text-[15px] leading-relaxed text-[#475569]"
                      >
                        {p}
                      </p>
                    ))}
                  </section>
                </Reveal>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
