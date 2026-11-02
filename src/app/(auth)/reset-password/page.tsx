"use client";

import { Suspense } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, KeyRound } from "lucide-react";
import ResetPasswordForm from "@/components/form/reset-password-form";

const glass =
  "bg-white/45 ring-1 ring-white/80 backdrop-blur-[6px] shadow-lg shadow-[#0f2a4a]/10";

const EASE = [0.22, 1, 0.36, 1] as const;

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return <ResetPasswordForm email={email} />;
}

export default function ResetPasswordPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduce ? { scale: 1 } : { scale: 1.06 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image
          src="/delivery-bg2.jpg"
          alt="Delivery illustration with courier, truck and scooter"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between p-5 sm:p-8">
          <motion.div
            className={`rounded-full px-5 py-2 ${glass}`}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Logo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <Link
              href="/login"
              className={`group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-[#0f2a4a] transition hover:bg-white/80 ${glass}`}
            >
              Sign in
              <ArrowUpRight className="size-4 text-[#ff7a1a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 pb-8 lg:justify-end lg:px-16 xl:px-24">
          <motion.div
            className="relative w-full max-w-[400px] pt-8"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 16,
              delay: 0.25,
            }}
          >
            <motion.div
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 14,
                delay: 0.7,
              }}
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a1a] to-[#ff9a4d] shadow-xl shadow-[#ff7a1a]/40 ring-4 ring-white/80">
                <KeyRound className="size-7 text-white" />
              </div>
            </motion.div>

            <div className="rounded-3xl bg-white/55 px-8 pb-8 pt-12 shadow-2xl shadow-[#0f2a4a]/15 ring-1 ring-white/90 backdrop-blur-[8px] sm:px-9">
              <motion.div
                className="mb-7 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
              >
                <h1 className="text-[26px] font-semibold tracking-tight text-[#0f2a4a]">
                  Reset password
                </h1>
                <p className="mt-1 text-[13.5px] text-[#334155]">
                  Enter the code from your email and choose a new password
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
              >
                <Suspense fallback={null}>
                  <ResetPasswordContent />
                </Suspense>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <footer className="pb-5 text-center text-[11px] font-medium text-[#334155]">
          Copyright © {new Date().getFullYear()} SwiftShip. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
