import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { CONTACT_INFO } from "@/constants/contact";
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from "@/constants/home";
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import NewsletterForm from "../home/NewsletterForm";
import BackToTop from "./BackToTop";

const SOCIALS = [
  { icon: FaFacebook, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "X (Twitter)", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

const linkClass =
  "inline-block rounded-sm text-xs text-white/65 transition-all duration-200 hover:translate-x-1 hover:text-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]";

export default function Footer() {
  return (
    <footer className="bg-[#0f2a4a] text-white">
      {/* CTA banner */}
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <Reveal scale={0.97} y={28}>
          <div className="relative isolate flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff7a1a] to-[#e8590c] px-6 py-8 sm:flex-row sm:items-center sm:px-10">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-16 -z-10 size-56 rounded-full bg-white/15 blur-2xl"
            />
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Ready to ship with SwiftShip?
              </h2>
              <p className="mt-1.5 text-sm text-white/85">
                Create a free account and get 30% off your first shipment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#143a63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8590c]"
              >
                Get Started
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/track"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8590c]"
              >
                <PackageSearch aria-hidden="true" className="size-4" />
                Track parcel
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Main columns */}
      <Stagger
        gap={0.12}
        className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]"
      >
        <StaggerItem>
          <div className="inline-flex items-center gap-3">
            <span className="rounded-xl bg-white p-1.5">
              <Logo className="h-9 w-9" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight">
                SwiftShip
              </span>
              <span className="mt-1 text-[10px] text-white/60">
                Delivering Your World
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-[260px] text-xs leading-relaxed text-white/65">
            Fast, safe and reliable delivery services for individuals and
            businesses worldwide.
          </p>
          <ul className="mt-5 flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full text-white/75 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:text-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_QUICK_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </StaggerItem>

        <StaggerItem>
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3.5">
            {CONTACT_INFO.map(({ icon: Icon, title, lines, href }) => (
              <li key={title} className="flex gap-3">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#ff7a1a]"
                />
                <div className="min-w-0 text-xs leading-relaxed text-white/65">
                  <span className="sr-only">{title}: </span>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={line}
                        href={href}
                        className="block break-words transition-colors hover:text-[#ff7a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a]"
                      >
                        {line}
                      </a>
                    ) : (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ),
                  )}
                </div>
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>

      {/* Newsletter strip */}
      <div className="mx-auto max-w-6xl px-4">
        <Reveal
          y={16}
          className="flex flex-col gap-5 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="text-sm font-semibold">
              Subscribe to our newsletter
            </h3>
            <p className="mt-1 text-xs text-white/65">
              Get the latest updates, offers and news.
            </p>
          </div>
          <div className="w-full md:max-w-sm [&_form]:mt-0">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Reveal
          y={12}
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/55 md:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>

          <ul
            aria-label="Accepted payment methods"
            className="flex items-center gap-3"
          >
            <li>
              <FaCcVisa aria-label="Visa" className="size-7 text-white/70" />
            </li>
            <li>
              <FaCcMastercard
                aria-label="Mastercard"
                className="size-7 text-white/70"
              />
            </li>
            <li className="rounded-md border border-white/20 px-2 py-0.5 text-[10px] font-medium text-white/70">
              Cash on delivery
            </li>
          </ul>

          <div className="flex gap-6">
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms &amp; Conditions
            </Link>
          </div>
        </Reveal>
      </div>

      <BackToTop />
    </footer>
  );
}
