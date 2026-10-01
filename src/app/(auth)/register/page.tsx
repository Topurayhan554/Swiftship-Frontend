import RegisterForm from "@/components/form/register-form";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { Package, ShieldCheck, Clock } from "lucide-react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

const socialIcons = [
  { name: "linkedin", Icon: FaLinkedinIn },
  { name: "instagram", Icon: FaInstagram },
  { name: "facebook", Icon: FaFacebookF },
  { name: "twitter", Icon: FaTwitter },
];

const perks = [
  {
    icon: Package,
    title: "Book in seconds",
    desc: "Create a parcel booking with pickup and drop-off in one form.",
  },
  {
    icon: Clock,
    title: "Live status updates",
    desc: "Track every parcel from pickup to delivery, in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    desc: "Role-based access and encrypted payments on every order.",
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="flex w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
          {/*  LEFT PANEL  */}
          <div className="relative hidden lg:flex lg:w-[55%] flex-col overflow-hidden bg-gradient-to-br from-[#0f2a4a] via-[#143a63] to-[#ff7a1a]">
            {/* Dotted texture */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
                backgroundSize: "26px 26px",
              }}
            />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-2.5 p-8 pb-4">
              <Logo />
            </div>

            {/* Heading */}
            <div className="relative z-10 px-9 pt-6">
              <p className="text-[13px] font-medium text-white/80">
                Join SwiftShip
              </p>
              <p className="mt-2 max-w-[340px] text-[26px] font-medium leading-tight text-white">
                Book, track, and manage every delivery from one dashboard.
              </p>
            </div>

            {/* Perks */}
            <div className="relative z-10 flex flex-1 flex-col justify-center gap-5 px-9">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-white/70">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Copyright */}
            <p className="relative z-10 pb-6 text-center text-[11px] text-white/70">
              Copyright © {new Date().getFullYear()} SwiftShip. All rights
              reserved.
            </p>
          </div>

          {/*  RIGHT PANEL  */}
          <div className="flex w-full flex-col bg-[#f7f9fc] lg:w-[45%]">
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-14">
              <div className="w-full max-w-[380px] rounded-2xl bg-white p-9 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <RegisterForm />
              </div>
            </div>

            {/* Bottom social + contact */}
            <div className="pb-8 pt-2">
              <div className="mb-5 flex justify-center gap-5">
                {socialIcons.map(({ name, Icon }) => (
                  <Link
                    key={name}
                    href="#"
                    className="text-[#94a3b8] transition hover:text-[#ff7a1a]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1.5 text-[12px] text-[#94a3b8] sm:flex-row sm:justify-center sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <HiOutlinePhone className="h-3.5 w-3.5" />
                  <span>+880 1700-000000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiOutlineMail className="h-3.5 w-3.5" />
                  <span>support@swiftship.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
