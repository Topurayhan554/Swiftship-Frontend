"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { EASE } from "@/components/shared/motion";
import { CONTACT_SUBJECTS } from "@/constants/contact";
import { submitContact } from "@/lib/contact";

type Values = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};
const MAX_MESSAGE = 1000;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !/^\+?[0-9\s-]{7,15}$/.test(v.phone.trim()))
    e.phone = "Please enter a valid phone number.";
  if (!v.subject) e.subject = "Please choose a subject.";
  if (v.message.trim().length < 10)
    e.message = "Message must be at least 10 characters.";
  else if (v.message.length > MAX_MESSAGE)
    e.message = `Message must be under ${MAX_MESSAGE} characters.`;
  return e;
}

const inputClass = (error?: string) =>
  `w-full rounded-xl border bg-white px-4 text-sm text-[#0f2a4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-[#e2e8f0] focus:border-[#ff7a1a] focus:ring-[#ff7a1a]/25"
  }`;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[#334155]"
      >
        {label}{" "}
        {optional && (
          <span className="font-normal text-[#94a3b8]">(optional)</span>
        )}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [honeypot, setHoneypot] = useState("");

  const errors = validate(values);
  const show = (k: keyof Values) =>
    touched[k] || submitted ? errors[k] : undefined;

  const set =
    (k: keyof Values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setValues((p) => ({ ...p, [k]: e.target.value }));
  const blur = (k: keyof Values) => () =>
    setTouched((p) => ({ ...p, [k]: true }));

  const aria = (k: keyof Values) => ({
    "aria-invalid": !!show(k),
    "aria-describedby": show(k) ? `${k}-error` : undefined,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const firstInvalid = (Object.keys(errors) as (keyof Values)[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (honeypot) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        subject: values.subject,
        message: values.message.trim(),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex min-h-[420px] flex-col items-center justify-center text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: 0.15,
            }}
            className="flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600"
          >
            <CheckCircle2 aria-hidden="true" className="size-10" />
          </motion.span>
          <h2 className="mt-6 text-2xl font-bold text-[#0f2a4a]">
            Message sent!
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#64748b]">
            Thanks for reaching out. Our team will reply to{" "}
            {values.email.trim() || "you"} within one working day.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-[#0f2a4a] transition-colors hover:border-[#ff7a1a] hover:text-[#e8590c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          <div>
            <h2 className="text-xl font-bold text-[#0f2a4a]">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Fields marked without &quot;optional&quot; are required.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={show("name")}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Rahim Uddin"
                value={values.name}
                onChange={set("name")}
                onBlur={blur("name")}
                className={`${inputClass(show("name"))} h-11`}
                {...aria("name")}
              />
            </Field>
            <Field id="email" label="Email" error={show("email")}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={set("email")}
                onBlur={blur("email")}
                className={`${inputClass(show("email"))} h-11`}
                {...aria("email")}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Phone" optional error={show("phone")}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+8801XXXXXXXXX"
                value={values.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
                className={`${inputClass(show("phone"))} h-11`}
                {...aria("phone")}
              />
            </Field>
            <Field id="subject" label="Subject" error={show("subject")}>
              <select
                id="subject"
                name="subject"
                value={values.subject}
                onChange={set("subject")}
                onBlur={blur("subject")}
                className={`${inputClass(show("subject"))} h-11`}
                {...aria("subject")}
              >
                <option value="">Select a subject</option>
                {CONTACT_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="message" label="Message" error={show("message")}>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="How can we help you?"
              value={values.message}
              onChange={set("message")}
              onBlur={blur("message")}
              className={`${inputClass(show("message"))} resize-none py-3`}
              {...aria("message")}
            />
            <p
              className={`mt-1 text-right text-[11px] ${values.message.length > MAX_MESSAGE ? "text-red-600" : "text-[#94a3b8]"}`}
            >
              {values.message.length}/{MAX_MESSAGE}
            </p>
          </Field>

          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
                We couldn&apos;t send your message. Please try again.
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={status === "sending" ? undefined : { scale: 1.02 }}
            whileTap={status === "sending" ? undefined : { scale: 0.98 }}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0f2a4a] to-[#143a63] text-sm font-semibold text-white shadow-lg shadow-[#0f2a4a]/25 transition-shadow hover:shadow-xl hover:shadow-[#ff7a1a]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a1a] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <Send
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
