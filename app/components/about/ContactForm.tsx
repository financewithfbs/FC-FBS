"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { motion, useInView } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else toast.error("Failed to send message");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "your.email@example.com",
      icon: Mail,
      required: true,
      full: true,
    },
    {
      key: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number",
      icon: Phone,
      required: false,
      full: true,
    },
    {
      key: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us what you're thinking…",
      icon: MessageSquare,
      required: true,
      full: true,
      rows: 5,
    },
  ] as const;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full flex justify-center items-center py-20 sm:py-24 px-4 sm:px-6"
    >
      {/* Ambient background blob behind the card */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-[var(--primary)]/15 blur-3xl opacity-60" />
      </div>

      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 40,
          scale: isInView ? 1 : 0.97,
        }}
        transition={{ duration: 0.8, ease }}
        onSubmit={handleSubmit}
        className="relative w-[92%] max-w-[900px] rounded-[32px] p-[1.5px] overflow-hidden bg-gradient-to-br from-[var(--primary)]/50 via-[var(--primary-light)]/25 to-transparent"
      >
        <div className="relative rounded-[30px] bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-color)]/50 p-8 sm:p-12 overflow-hidden">
          {/* Ambient corner blob inside card */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--primary)]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-[var(--primary-light)]/10 blur-3xl" />

          {/* Top hairline */}
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />

          {/* Header */}
          <div className="relative text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-[var(--primary)]/25 bg-[var(--primary)]/10">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
              </span>
              <Sparkles
                size={13}
                className="text-[var(--primary)]"
                strokeWidth={2.4}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Get in Touch
              </span>
            </div>

            <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Have a{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent">
                question
              </span>
              ? Let&apos;s talk.
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Reach out to ensure clarity, transparency, and smooth
              collaboration — we usually respond within 24 hours.
            </p>
          </div>

          {/* Name row */}
          <div className="flex gap-4 w-full mb-4 flex-wrap about-contact-names-row">
            {(["First", "Last"] as const).map((type) => {
              const key = (type.toLowerCase() + "Name") as
                | "firstName"
                | "lastName";
              const Icon = User;
              return (
                <div key={type} className="relative flex-1 group min-w-[220px]">
                  {/* Icon chip */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-7 h-7 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center transition-all duration-300 group-focus-within:bg-[var(--primary)]/25">
                    <Icon
                      size={13}
                      className="text-[var(--primary)]"
                      strokeWidth={2.4}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder={`Enter your ${type} Name`}
                    required
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 text-[15px] rounded-xl outline-none transition-all duration-300 bg-[var(--input-bg)] border border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/15 text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
              );
            })}
          </div>

          {/* Dynamic fields */}
          {fields.map((field) => {
            const Icon = field.icon;
            if (field.type === "textarea") {
              return (
                <div key={field.key} className="relative group mb-4">
                  <div className="absolute left-3 top-4 z-10 pointer-events-none w-7 h-7 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center transition-all duration-300 group-focus-within:bg-[var(--primary)]/25">
                    <Icon
                      size={13}
                      className="text-[var(--primary)]"
                      strokeWidth={2.4}
                    />
                  </div>
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={field.rows}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3.5 text-[15px] rounded-xl outline-none transition-all duration-300 bg-[var(--input-bg)] border border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/15 text-[var(--text-primary)] placeholder:text-[var(--text-dim)] resize-y"
                  />
                </div>
              );
            }

            return (
              <div key={field.key} className="relative group mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none w-7 h-7 rounded-lg bg-[var(--primary)]/15 border border-[var(--primary)]/25 flex items-center justify-center transition-all duration-300 group-focus-within:bg-[var(--primary)]/25">
                  <Icon
                    size={13}
                    className="text-[var(--primary)]"
                    strokeWidth={2.4}
                  />
                </div>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.key]: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 text-[15px] rounded-xl outline-none transition-all duration-300 bg-[var(--input-bg)] border border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/15 text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
                />
              </div>
            );
          })}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full mt-6 overflow-hidden rounded-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {/* Outer glow */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300" />

            {/* Button body */}
            <div
              className="relative w-full py-3.5 rounded-2xl bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-[length:200%_100%] group-hover:bg-[position:100%_0] text-white font-bold text-[16px] shadow-lg transition-[background-position] duration-700 ease-out flex items-center justify-center gap-2"
              style={{ boxShadow: "var(--neon-glow)" }}
            >
              {/* Inner top highlight */}
              <span className="absolute inset-x-0 top-0 h-px bg-white/40 rounded-t-2xl" />

              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.4}
                    />
                  </>
                )}
              </span>
            </div>
          </motion.button>
        </div>
      </motion.form>
    </section>
  );
}