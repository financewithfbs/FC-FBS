"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient gradient layer */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,var(--bg-secondary)_0%,transparent_60%)]" />

      {/* Top hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

      {/* Floating decorative orbs */}
      <motion.div
        className="absolute top-16 right-[12%] w-24 h-24 rounded-full bg-[var(--primary)]/10 blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-[10%] w-20 h-20 rounded-full bg-[var(--primary)]/8 blur-2xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-full max-w-[1100px] mx-auto px-6 text-center">
        {/* Discover Our Journey badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-[var(--primary)]/25 bg-[var(--primary)]/10"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
          </span>
          <Sparkles
            size={14}
            className="text-[var(--primary)]"
            strokeWidth={2.4}
          />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Discover Our Journey
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-[38px] sm:text-[52px] md:text-[64px] font-extrabold leading-[1.05] tracking-tight text-[var(--text-primary)]"
        >
          We&apos;re Empowering the Future of{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent">
              Financial Literacy
            </span>
            {/* Underline accent */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease, delay: 0.9 }}
              className="absolute left-0 right-0 -bottom-2 h-1 md:h-1.5 origin-left rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-transparent"
            />
          </span>{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent">
              & Leadership
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease, delay: 1.0 }}
              className="absolute left-0 right-0 -bottom-2 h-1 md:h-1.5 origin-left rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-transparent"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="mt-8 max-w-3xl mx-auto text-base sm:text-lg md:text-[19px] leading-relaxed text-[var(--text-muted)]"
        >
          As a Finance Committee, we organize insightful workshops, interactive
          sessions, and events that focus on{" "}
          <span className="font-semibold text-[var(--text-secondary)]">
            financial education
          </span>
          ,{" "}
          <span className="font-semibold text-[var(--text-secondary)]">
            investment awareness
          </span>
          , and{" "}
          <span className="font-semibold text-[var(--text-secondary)]">
            economic understanding
          </span>
          .
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="mt-4 max-w-3xl mx-auto text-base sm:text-lg md:text-[19px] leading-relaxed text-[var(--text-muted)]"
        >
          Our goal is to equip students with essential financial skills and
          promote responsible money management across the campus.
        </motion.p>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.7, ease, delay: 0.65 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {[
            { value: "20+", label: "Committee Members" },
            { value: "3+", label: "Events Hosted" },
            { value: "500+", label: "Students Engaged" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{ duration: 0.5, ease, delay: 0.75 + i * 0.08 }}
              className="relative rounded-2xl p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/40 to-[var(--primary-light)]/20 opacity-60" />
              <div className="relative rounded-2xl bg-[var(--card-bg)]/85 backdrop-blur-xl border border-[var(--border-color)] px-5 py-3">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-[var(--text-muted)] mt-0.5">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute left-0 right-0 bottom-8 z-0 pointer-events-none">
        <svg
          width="100%"
          height="32"
          viewBox="0 0 1200 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="20"
            y1="16"
            x2="1180"
            y2="16"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.2"
          />
          <circle cx="20" cy="16" r="3" fill="var(--primary)" opacity="0.4" />
          <circle cx="1180" cy="16" r="3" fill="var(--primary)" opacity="0.4" />
        </svg>
      </div>
    </section>
  );
}
