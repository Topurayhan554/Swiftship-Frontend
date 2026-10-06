"use client";

import { useEffect, useState } from "react";
import RegisterForm from "@/components/form/register-form";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Package, ShieldCheck, Truck } from "lucide-react";
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

const stats = [
  { to: 10, suffix: "k+", label: "Deliveries", decimals: 0 },
  { to: 50, suffix: "+", label: "Cities", decimals: 0 },
  { to: 4.9, suffix: "", label: "Avg. rating", decimals: 1 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({
  to,
  suffix,
  decimals,
}: {
  to: number;
  suffix: string;
  decimals: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 2,
      delay: 0.9,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [to]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

function TrackingStrip({ reduce }: { reduce: boolean }) {
  const loop = {
    duration: 5,
    repeat: Infinity,
    repeatDelay: 1.2,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      className="mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[12px] font-medium text-white/80">Parcel #SS-2041</p>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#ffb27a]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7a1a] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff7a1a]" />
          </span>
          In transit
        </span>
      </div>

      <div className="relative h-1.5 rounded-full bg-white/20">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ffb27a]"
          initial={{ width: reduce ? "65%" : "0%" }}
          animate={{ width: reduce ? "65%" : "100%" }}
          transition={reduce ? { duration: 0 } : loop}
        />
        <motion.div
          className="absolute -top-3 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#ff7a1a] shadow-lg shadow-[#ff7a1a]/40"
          initial={{ left: reduce ? "65%" : "0%" }}
          animate={{ left: reduce ? "65%" : "100%" }}
          transition={reduce ? { duration: 0 } : loop}
        >
          <Truck className="h-3.5 w-3.5 text-white" />
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between text-[11px] text-white/60">
        <span>Picked up</span>
        <span>On the way</span>
        <span>Delivered</span>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0f2a4a]">
      {/* Background image (slow ken-burns) */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduce ? { scale: 1 } : { scale: 1.1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/currier-man.jpg"
          alt="Courier delivering a parcel"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2a4a]/95 via-[#143a63]/85 to-[#ff7a1a]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4a]/70 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: "26px 26px",
        }}
      />

      {/* Floating glow blobs */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ff7a1a]/30 blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#143a63]/60 blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top logo */}
        <motion.div
          className="flex items-center gap-2.5 p-6 sm:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Logo />
        </motion.div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center gap-12 px-4 pb-10 sm:px-6 lg:justify-between lg:px-10">
          {/* LEFT: heading + stats + perks + tracking */}
          <div className="hidden max-w-[480px] flex-col lg:flex">
            <motion.span
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-md"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <Truck className="h-3.5 w-3.5 text-[#ff7a1a]" />
              Join SwiftShip
            </motion.span>

            <motion.h1
              className="mt-4 text-[38px] font-semibold leading-[1.15] text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              Book, track, and manage{" "}
              <span className="bg-gradient-to-r from-[#ff7a1a] to-[#ffb27a] bg-clip-text text-transparent">
                every delivery
              </span>{" "}
              from one dashboard.
            </motion.h1>

            {/* Stats */}
            <motion.div
              className="mt-7 flex gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[24px] font-semibold text-white">
                    <CountUp
                      to={s.to}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </p>
                  <p className="text-[12px] text-white/60">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Perks */}
            <div className="mt-8 flex flex-col gap-3">
              {perks.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.12,
                    ease: EASE,
                  }}
                  whileHover={{ scale: 1.03, x: 6 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff7a1a] shadow-lg shadow-[#ff7a1a]/30">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-white/70">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <TrackingStrip reduce={reduce} />
          </div>

          {/* RIGHT: form card */}
          <div className="relative w-full max-w-[420px]">
            {/* Floating chips (big screens only) */}
            <motion.div
              className="absolute -left-16 top-10 z-20 hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] font-medium text-[#0f2a4a] shadow-xl xl:flex"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -8, 0] }
              }
              transition={{
                opacity: { delay: 1.2, duration: 0.5 },
                scale: { delay: 1.2, duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Parcel delivered
            </motion.div>

            <motion.div
              className="absolute -right-10 bottom-24 z-20 hidden items-center gap-2 rounded-xl bg-[#0f2a4a] px-3 py-2 text-[12px] font-medium text-white shadow-xl ring-1 ring-white/20 xl:flex"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, 8, 0] }
              }
              transition={{
                opacity: { delay: 1.5, duration: 0.5 },
                scale: { delay: 1.5, duration: 0.5 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Truck className="h-4 w-4 text-[#ff7a1a]" />
              Courier on the way
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white/95 p-9 shadow-2xl ring-1 ring-white/30 backdrop-blur-xl"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f2a4a] via-[#ff7a1a] to-[#ffb27a]" />

              {/* Mobile-only heading */}
              <p className="mb-5 text-[13px] text-[#64748b] lg:hidden">
                Book, track, and manage every delivery from one dashboard.
              </p>

              <RegisterForm />
            </motion.div>
          </div>
        </div>

        {/* Bottom social + contact */}
        <motion.div
          className="pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="mb-4 flex justify-center gap-5">
            {socialIcons.map(({ name, Icon }) => (
              <Link
                key={name}
                href="#"
                className="text-white/70 transition hover:-translate-y-0.5 hover:text-[#ff7a1a]"
              >
                <Icon className="h-[18px] w-[18px]" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1.5 text-[12px] text-white/70 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-1.5">
              <HiOutlinePhone className="h-3.5 w-3.5" />
              <span>+880 1700-000000</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineMail className="h-3.5 w-3.5" />
              <span>support@swiftship.com</span>
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-white/60">
            Copyright © {new Date().getFullYear()} SwiftShip. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
