"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="flex overflow-hidden rounded-lg border border-white/15 bg-white/5 transition-colors focus-within:border-[#ff7a1a]">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/40"
        />
        <motion.button
          type="submit"
          aria-label="Subscribe"
          whileTap={{ scale: 0.9 }}
          className="flex w-11 items-center justify-center bg-[#ff7a1a] text-white transition-colors hover:bg-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </motion.button>
      </div>

      <p className="mt-2 h-4 text-xs text-[#ff7a1a]">
        <AnimatePresence>
          {done && (
            <motion.span
              key="ok"
              className="inline-flex items-center gap-1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                  delay: 0.1,
                }}
                className="inline-flex"
              >
                <Check aria-hidden="true" className="size-3" />
              </motion.span>
              Subscribed. Thank you!
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </form>
  );
}
