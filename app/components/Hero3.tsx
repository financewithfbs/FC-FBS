"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import Footer from "./Footer";
import { useSearchParams } from "next/navigation";
import { Mail, User, MessageSquare, Send, Sparkles, ShieldCheck } from "lucide-react";

const Hero3: React.FC = () => {
  const searchParams = useSearchParams();
  const waitlistEmail = searchParams.get("waitlist");
  const [formData, setFormData] = useState({
    email: waitlistEmail || "",
    name: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (waitlistEmail) {
      const el = document.getElementById("waitlist-form-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [waitlistEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({ email: "", name: "", message: "" });
    } else {
      alert("Failed to send. Please try again.");
    }

    setLoading(false);
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "you@fostiima.org",
      label: "Email",
      icon: <Mail size={18} />,
    },
    {
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full Name",
      icon: <User size={18} />,
    },
    {
      name: "message",
      type: "text",
      placeholder: "Tell us what excites you...",
      label: "Message",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <>
      <div
        id="waitlist-form-section"
        className="relative w-full py-24 px-4 flex justify-center items-center overflow-hidden bg-[var(--bg-primary)]"
      >
        {/* ================================================
            AMBIENT BACKGROUND
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 
            bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
        />

        {/* Aurora orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full 
            bg-[var(--primary)]/25 blur-[150px] animate-float-slow"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full 
            bg-[#EC4899]/20 blur-[140px] animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full 
            bg-[#06B6D4]/15 blur-[130px]"
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.2] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 45%, transparent 100%)",
          }}
        />

        {/* Floating accent dots */}
        <motion.div
          aria-hidden
          className="absolute top-1/4 right-1/4 w-14 h-14 rounded-full 
            bg-[var(--primary)] opacity-15 blur-[1px]"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full 
            bg-[#EC4899] opacity-20 blur-[1px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================
            CONTENT WRAPPER
        ================================================ */}
        <motion.div
          className="relative z-10 w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full 
              bg-[var(--primary)]/10 border border-[var(--primary)]/20 
              text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
            </span>
            Get Involved
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tight mb-5">
            Join Our{" "}
            <span
              className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                bg-clip-text text-transparent"
            >
              Finance Events
            </span>
          </h2>

          {/* Underline accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mx-auto mt-5 mb-6 h-1 w-24 rounded-full 
              bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"
          />

          {/* Subheading */}
          <p className="text-[var(--text-muted)] text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Be part of the FOSTIIMA Finance Committee workshops, seminars, and
            interactive events. Collaborate with peers, gain hands-on
            experience, and help organize impactful finance-focused activities
            on campus.
          </p>

          {/* ================================================
              FORM CARD
          ================================================ */}
          <motion.div
            className="relative rounded-3xl p-[1.5px] 
              bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
              shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
          >
            <div
              className="relative rounded-[22px] bg-[var(--card-bg)] 
                overflow-hidden p-6 sm:p-8 text-left"
            >
              {/* Inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 
                  bg-gradient-to-br from-[var(--primary)]/[0.05] via-transparent to-[#06B6D4]/[0.05]"
              />

              {/* Glow behind heading */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 
                  w-48 h-32 bg-[var(--primary)]/25 blur-3xl"
              />

              <form className="relative space-y-4" onSubmit={handleSubmit}>
                {/* Card header */}
                <div className="mb-6 text-center">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full 
                      bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                      text-[var(--primary)] text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    <ShieldCheck size={12} />
                    Secure Form
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] leading-tight">
                    Drop us a{" "}
                    <span
                      className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
                        bg-clip-text text-transparent"
                    >
                      message
                    </span>
                  </h3>
                </div>

                {/* ============ INPUTS (FIXED ICON VISIBILITY) ============ */}
                <div className="space-y-3">
                  {inputs.map((input, index) => (
                    <motion.div
                      key={input.name}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        ease: easeOut,
                        delay: 0.5 + index * 0.08,
                      }}
                    >
                      {/* Icon chip — high contrast, always visible */}
                      <div
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 
                          w-8 h-8 rounded-lg flex items-center justify-center 
                          bg-[var(--primary)]/15 
                          border border-[var(--primary)]/25 
                          text-[var(--primary)] 
                          group-focus-within:bg-[var(--primary)]/25 
                          group-focus-within:border-[var(--primary)]/50 
                          group-focus-within:scale-105 
                          pointer-events-none 
                          transition-all duration-300"
                      >
                        {input.icon}
                      </div>

                      <input
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={formData[input.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="relative w-full py-3.5 pl-14 pr-4 rounded-xl 
                          bg-[var(--input-bg)] 
                          text-[var(--text-primary)] text-sm 
                          placeholder:text-[var(--text-dim)] 
                          border border-[var(--border-color)] 
                          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] 
                          focus:border-transparent 
                          transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 rounded-xl font-bold text-sm text-white 
                    overflow-hidden 
                    bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                    bg-[length:200%_200%] 
                    shadow-lg hover:shadow-[var(--neon-glow)] 
                    disabled:opacity-70 disabled:cursor-not-allowed 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] 
                    transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.8 }}
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="absolute inset-0 -translate-x-full 
                      group-hover:translate-x-full transition-transform duration-1000 ease-out 
                      bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  {/* Top highlight */}
                  <span className="absolute inset-x-0 top-0 h-px bg-white/40" />

                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Join the Waitlist
                        <Send
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Reassurance */}
                <p className="text-center text-[11px] text-[var(--text-muted)] 
                  flex items-center justify-center gap-1.5 pt-1">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  We respect your inbox · No spam
                </p>

                {/* Success message */}
                {success && (
                  <motion.div
                    className="text-xs mt-3 px-4 py-3 rounded-xl font-medium 
                      text-emerald-600 dark:text-emerald-400 
                      border border-emerald-500/30 bg-emerald-500/10 
                      flex items-center gap-2"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Thank you! Your interest has been recorded.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Hero3;