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
      {/* ═══════════════ Ambient background layers ═══════════════ */}

      {/* Radial wash */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_0%,var(--bg-secondary)_0%,transparent_60%)]" />

      {/* Aurora color blobs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 left-[10%] w-[420px] h-[420px] rounded-full 
          bg-[var(--primary)]/15 blur-[120px] -z-10"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[5%] w-[380px] h-[380px] rounded-full 
          bg-[#EC4899]/12 blur-[110px] -z-10"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full 
          bg-[#06B6D4]/10 blur-[130px] -z-10"
      />

      {/* Fine grid pattern (radial-masked) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,91,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 45%, transparent 100%)",
        }}
      />

      {/* Top hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

      {/* Floating decorative orbs */}
      <motion.div
        className="absolute top-16 right-[12%] w-24 h-24 rounded-full bg-[var(--primary)]/15 blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-[10%] w-20 h-20 rounded-full bg-[var(--primary)]/12 blur-2xl"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small glowing particles */}
      <motion.span
        className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
        animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 12px rgba(140,91,255,0.9)" }}
      />
      <motion.span
        className="absolute top-[68%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#EC4899]"
        animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        style={{ boxShadow: "0 0 12px rgba(236,72,153,0.9)" }}
      />
      <motion.span
        className="absolute bottom-[18%] left-[45%] w-1 h-1 rounded-full bg-[#06B6D4]"
        animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{ boxShadow: "0 0 10px rgba(6,182,212,0.9)" }}
      />

      {/* ═══════════════ Content ═══════════════ */}
      <div className="relative w-full max-w-[1100px] mx-auto px-6 text-center">
        {/* Discover Our Journey badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full backdrop-blur-xl 
            border border-[var(--primary)]/25 bg-[var(--primary)]/10
            shadow-[0_8px_30px_-10px_rgba(140,91,255,0.5)]"
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

        {/* Main headline — underlines removed, replaced with a soft ambient glow */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="relative text-[38px] sm:text-[52px] md:text-[64px] font-extrabold 
            leading-[1.08] tracking-tight text-[var(--text-primary)]"
        >
          {/* Soft purple glow behind the entire headline */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 mx-auto w-[80%] h-full 
              bg-[var(--primary)]/25 blur-[80px] rounded-full"
          />

          We&apos;re Empowering the Future of{" "}
          <span
            className="inline-block bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
              bg-clip-text text-transparent"
          >
            Financial Literacy
          </span>{" "}
          <span
            className="inline-block bg-gradient-to-r from-[#EC4899] via-[var(--primary-light)] to-[var(--primary)] 
              bg-clip-text text-transparent"
          >
            &amp; Leadership
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
            { value: "20+", label: "Committee Members", accent: "#8C5BFF" },
            { value: "3+", label: "Events Hosted", accent: "#EC4899" },
            { value: "500+", label: "Students Engaged", accent: "#06B6D4" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.5, ease, delay: 0.75 + i * 0.08 }}
              className="relative rounded-2xl p-[1.5px] overflow-hidden group cursor-default"
              style={{
                boxShadow: `0 12px 32px -14px ${stat.accent}88`,
              }}
            >
              {/* Gradient border shell */}
              <div
                className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${stat.accent}66, transparent 60%)`,
                }}
              />

              {/* Inner card */}
              <div className="relative rounded-[14px] bg-[var(--card-bg)]/90 backdrop-blur-xl 
                border border-[var(--border-color)] px-5 py-3">
                {/* Soft glow inside on hover */}
                <div
                  aria-hidden
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-12 
                    rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: stat.accent,
                    filter: "blur(24px)",
                  }}
                />

                <div
                  className="relative text-xl sm:text-2xl font-bold tabular-nums"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="relative text-[10px] uppercase tracking-widest font-semibold text-[var(--text-muted)] mt-0.5">
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