"use client";

import { useState } from "react";
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
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div className="flex items-center rounded-lg border border-white/15 bg-white/5 p-1">
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

        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-black"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {done && (
        <output className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
          <Check className="h-3.5 w-3.5" />
          Subscribed. Thank you!
        </output>
      )}
    </form>
  );
}
