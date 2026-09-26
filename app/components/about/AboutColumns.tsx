"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Target, Telescope } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    title: "Our Story",
    subtitle: "Why We Started",
    text: `We are a student-led Finance Committee dedicated to enhancing financial literacy and awareness on campus. Our journey began with the vision to help students understand the importance of managing finances effectively and making informed financial decisions.`,
    icon: BookOpen,
    accent: "purple",
  },
  {
    title: "Our Mission",
    subtitle: "What We Aim to Achieve",
    text: `To organize impactful finance-related events, workshops, and discussions that foster financial responsibility, promote investment awareness, and empower students to become confident financial leaders.`,
    icon: Target,
    accent: "violet",
  },
  {
    title: "Our Vision",
    subtitle: "Our Long-Term Goal",
    text: `To build a financially aware and empowered student community where every individual possesses the knowledge, confidence, and integrity to navigate the financial world successfully.`,
    icon: Telescope,
    accent: "indigo",
  },
];

export default function AboutColumns() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, ease }}
        className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-[var(--primary)]/25 bg-[var(--primary)]/10"
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
          What Drives Us
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="text-center text-[28px] sm:text-[40px] md:text-[46px] font-extrabold tracking-tight text-[var(--text-primary)] mb-14 sm:mb-20 max-w-3xl"
      >
        The principles that{" "}
        <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent">
          guide every step
        </span>{" "}
        we take
      </motion.h2>

      <div className="flex flex-row justify-between items-stretch gap-6 lg:gap-10 w-full max-w-[1300px] about-columns-row">
        {columns.map((col, idx) => {
          const Icon = col.icon;
          return (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 40,
                }}
                transition={{
                  duration: 0.7,
                  ease,
                  delay: 0.2 + idx * 0.15,
                }}
                whileHover={{ y: -6 }}
                className="relative flex-1 group"
              >
                {/* Gradient border wrapper */}
                <div className="relative rounded-3xl p-[1px] h-full overflow-hidden bg-gradient-to-br from-[var(--primary)]/30 via-[var(--border-color)] to-transparent transition-all duration-500 group-hover:from-[var(--primary)]/60 group-hover:via-[var(--primary-light)]/30">
                  {/* Inner glass card */}
                  <div className="relative rounded-3xl h-full bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-color)]/50 px-6 sm:px-8 py-8 sm:py-10 overflow-hidden transition-all duration-500">
                    {/* Ambient corner blob */}
                    <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[var(--primary)]/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top hairline */}
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />

                    {/* Icon badge */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="absolute inset-0 rounded-2xl bg-[var(--primary)]/40 blur-lg" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)]/50 via-[var(--primary-light)]/35 to-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center overflow-hidden">
                        <span className="absolute inset-x-2 top-0 h-px bg-white/40" />
                        <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--primary-light)]/40 blur-md" />
                        <Icon
                          className="relative h-6 w-6 text-white"
                          strokeWidth={2.4}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-[24px] sm:text-[28px] md:text-[30px] font-extrabold tracking-tight text-[var(--text-primary)] mb-1.5">
                      {col.title.split(" ")[0]}{" "}
                      <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] bg-clip-text text-transparent">
                        {col.title.split(" ")[1]}
                      </span>
                    </h3>

                    {/* Subtitle */}
                    <div className="text-[var(--text-dim)] text-xs sm:text-sm font-bold uppercase tracking-[0.14em] mb-5">
                      {col.subtitle}
                    </div>

                    {/* Divider */}
                    <div className="h-px w-12 bg-gradient-to-r from-[var(--primary)] to-transparent mb-5" />

                    {/* Body */}
                    <p className="text-[var(--text-muted)] text-[15px] sm:text-[16px] leading-relaxed">
                      {col.text}
                    </p>
                  </div>
                </div>
              </motion.div>

              {idx < columns.length - 1 && (
                <div className="hidden lg:flex self-stretch items-center">
                  <div className="w-px h-[60%] bg-gradient-to-b from-transparent via-[var(--border-color)] to-transparent" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}