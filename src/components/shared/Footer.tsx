import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from "@/constants/home";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import NewsletterForm from "../home/NewsletterForm";

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
          <p className="mt-4 max-w-[240px] text-xs leading-relaxed text-white/65">
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
          <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
          <p className="mt-1.5 text-xs text-white/65">
            Get the latest updates, offers and news.
          </p>
          <NewsletterForm />
        </StaggerItem>
      </Stagger>

      <div className="border-t border-white/10">
        <Reveal
          y={12}
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/55 sm:flex-row"
        >
          <p>
            &copy; {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
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
    </footer>
  );
}
