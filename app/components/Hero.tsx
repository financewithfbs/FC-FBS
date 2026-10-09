"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useInView,
  useScroll,
  useTransform,
  easeOut,
} from "framer-motion";
import Hero1 from "./Hero1";

const Hero: React.FC = () => {
  const textSegments = [
    { text: "Empowering", color: "text-[var(--text-secondary)]" },
    { text: "Financial", color: "text-[var(--primary)]" },
    { text: "Literacy", color: "text-[var(--primary)]" },
    { text: "at FOSTIIMA", color: "text-[var(--text-secondary)]" },
  ];

  const controls = useAnimationControls();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60, rotateY: -15 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  };

  useEffect(() => {
    const animateLoop = async () => {
      try {
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await controls.start("hidden");
        animateLoop();
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    const timer = setTimeout(() => {
      animateLoop();
    }, 100);

    return () => {
      clearTimeout(timer);
      controls.stop();
    };
  }, [controls]);

  return (
    <>
      <section
        ref={ref}
        // CHANGED: Reduced top padding further (was 120/130/140) and bottom padding for a shorter section.
        // Still clears the fixed navbar comfortably on all screens.
        className="relative z-10 w-full pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-6 sm:pb-10 bg-[var(--bg-primary)] overflow-hidden"
      >
        {/* LAYER 1 — BASE GRADIENT WASH */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0
            bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
        />

        {/* LAYER 2 — AURORA MESH */}
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-40 -left-40 
            w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] rounded-full 
            bg-[var(--primary)]/30 
            blur-[160px] 
            animate-pulse-slow"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute top-1/4 -right-40 
            w-[50vw] max-w-[520px] h-[50vw] max-h-[520px] rounded-full 
            bg-[#EC4899]/25 
            blur-[150px] 
            animate-float-slow"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -bottom-40 left-1/3 
            w-[45vw] max-w-[480px] h-[45vw] max-h-[480px] rounded-full 
            bg-[#06B6D4]/20 
            blur-[140px] 
            animate-float-delay"
        />

        {/* LAYER 3 — VISIBLE GRID */}
        <motion.div
          aria-hidden
          style={{
            y: gridY,
            backgroundImage:
              "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 45%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 45%, transparent 100%)",
          }}
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        />

        {/* LAYER 4 — SPOTLIGHT */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 
            w-[90vw] max-w-[900px] h-[300px] sm:h-[500px] opacity-60
            bg-[radial-gradient(ellipse_at_center_top,var(--primary),transparent_60%)]"
          style={{ filter: "blur(60px)" }}
        />

        {/* LAYER 5 — DECORATIVE RINGS - Hidden on mobile */}
        <motion.div
          aria-hidden
          style={{ rotate: ringRotate }}
          className="hidden sm:block pointer-events-none absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[500px] sm:w-[820px] h-[500px] sm:h-[820px] rounded-full 
            border border-[var(--primary)]/15"
        />
        <motion.div
          aria-hidden
          style={{ rotate: ringRotate }}
          className="hidden sm:block pointer-events-none absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[380px] sm:w-[620px] h-[380px] sm:h-[620px] rounded-full 
            border border-[#EC4899]/10"
        />

        {/* LAYER 6 — FLOATING ACCENT DOTS - Hidden on mobile */}
        <motion.div
          aria-hidden
          className="hidden sm:block absolute bottom-40 left-1/4 w-12 h-12 bg-[var(--primary)] rounded-full opacity-20 blur-[1px]"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="hidden sm:block absolute top-1/3 right-1/4 w-8 h-8 bg-[#EC4899] rounded-full opacity-25 blur-[1px]"
          animate={{ scale: [1, 1.4, 1], y: [0, -30, 0], rotate: [0, -120, -240] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="hidden sm:block absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#06B6D4] rounded-full opacity-25 blur-[1px]"
          animate={{ scale: [1, 1.5, 1], x: [0, -25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* LAYER 7 — NOISE TEXTURE */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* TOP EDGE ACCENT LINE */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-px 
            bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent"
        />

        {/* ================= CONTENT WRAPPER ================= */}
        {/* CHANGED: reduced gap between heading block and card from gap-3 sm:gap-4 → gap-2 sm:gap-3 */}
        <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-2 sm:gap-3">
          
          {/* ============ HEADING ============ */}
          <motion.div
            className="w-full max-w-3xl"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-[var(--text-secondary)] break-words"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              aria-label="Hero heading"
            >
              {textSegments.map((segment, segmentIndex) => (
                <span key={segmentIndex} className={segment.color}>
                  {segment.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={`${segmentIndex}-${charIndex}`}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  {segmentIndex === 0 || segmentIndex === 1 ? <br /> : null}
                  {segmentIndex === 2 ? " " : null}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isInView
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
              // CHANGED: mt-3 sm:mt-4 → mt-2 sm:mt-3
              className="mx-auto mt-2 sm:mt-3 h-1 w-20 sm:w-24 rounded-full 
                bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"
            />

            <motion.p
              // CHANGED: mt-3 sm:mt-4 → mt-2 sm:mt-3
              className="mt-2 sm:mt-3 text-[var(--text-muted)] text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            >
              From budgets to workshops — we ensure every rupee empowers our{" "}
              <span className="text-[var(--text-primary)] font-semibold">
                FOSTIIMA Finance community
              </span>
              .
            </motion.p>
          </motion.div>

          {/* ============ FUN WITH FINANCE 2026 EVENT CARD ============ */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[1100px]"
          >
            {/* Card shell with animated gradient border */}
            <div
              className="relative rounded-2xl sm:rounded-[28px] p-[1.5px] w-full
                bg-[linear-gradient(120deg,var(--primary),#EC4899,#06B6D4,var(--primary))]
                bg-[length:300%_300%] animate-gradient
                shadow-[0_25px_80px_-20px_rgba(140,91,255,0.6)]"
            >
              <div
                className="relative rounded-[14px] sm:rounded-[26px] bg-[var(--card-bg)]
                  flex flex-col lg:flex-row lg:items-center lg:justify-between 
                  gap-4 sm:gap-6 lg:gap-8 
                  p-4 sm:p-6 md:p-8 lg:p-9 w-full overflow-hidden"
              >
                {/* Inner sheen */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[14px] sm:rounded-[26px]
                    bg-gradient-to-br from-[var(--primary)]/[0.06] via-transparent to-[#06B6D4]/[0.06]"
                />

                {/* Ambient blobs inside card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 rounded-full 
                    bg-[var(--primary)]/15 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 w-56 sm:w-72 h-56 sm:h-72 rounded-full 
                    bg-[#EC4899]/12 blur-3xl"
                />

                {/* Floating decorative sparkles inside */}
                <motion.span
                  aria-hidden
                  className="hidden sm:block absolute top-6 right-1/3 w-1.5 h-1.5 rounded-full bg-[var(--primary)]"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ boxShadow: "0 0 12px rgba(140,91,255,0.9)" }}
                />
                <motion.span
                  aria-hidden
                  className="hidden sm:block absolute bottom-8 left-1/4 w-1 h-1 rounded-full bg-[#EC4899]"
                  animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  style={{ boxShadow: "0 0 10px rgba(236,72,153,0.9)" }}
                />

                {/* ============ Left: content ============ */}
                <div className="relative flex-1 min-w-0 w-full text-center lg:text-left space-y-2.5 sm:space-y-3.5 z-10">
                  {/* Eyebrow pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full 
                      border border-[var(--primary)]/25 bg-[var(--primary)]/10
                      text-[8px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.24em] text-[var(--primary)]
                      shadow-[0_4px_16px_-8px_rgba(140,91,255,0.6)] whitespace-nowrap"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--primary)] animate-pulse shrink-0" />
                    <span className="truncate">Finance Committee Presents</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-black leading-[1.1] sm:leading-[1.05] tracking-tight break-words"
                  >
                    <span
                      className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                        bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(140,91,255,0.3)]"
                    >
                      FUN WITH
                    </span>{" "}
                    <span
                      className="bg-gradient-to-r from-[#EC4899] via-[var(--primary-light)] to-[var(--primary)] 
                        bg-clip-text text-transparent"
                    >
                      FINANCE 2026
                    </span>
                  </motion.h2>

                  {/* Tagline */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-[var(--text-secondary)] text-[11px] sm:text-sm md:text-base 
                      leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"
                  >
                    <b className="text-[var(--primary)]">Two-Day Event</b> · Think. Speak. Present. Win!
                  </motion.p>

                  {/* ================= Day 1 + Day 2 mini cards ================= */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-2 gap-1.5 sm:gap-3 max-w-lg mx-auto lg:mx-0 pt-1"
                  >
                    {/* Day 1 */}
                    <div
                      className="group relative rounded-lg sm:rounded-xl p-2 sm:p-3 text-left
                        bg-[var(--bg-secondary)] border border-[var(--border-color)]
                        overflow-hidden transition-all duration-300 hover:-translate-y-0.5
                        hover:border-[var(--primary)]/40
                        shadow-[0_8px_24px_-14px_rgba(140,91,255,0.6)]"
                    >
                      <div
                        aria-hidden
                        className="absolute -top-8 -right-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full 
                          bg-[var(--primary)]/15 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5">
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] md:text-[10px] font-black text-white
                            bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]
                            shadow-[0_6px_16px_-6px_rgba(140,91,255,0.9)] shrink-0"
                        >
                          D1
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[6px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[var(--text-muted)] truncate">
                            Day One
                          </span>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-[var(--primary)]">
                            13th Oct
                          </span>
                        </div>
                      </div>
                      <p className="relative text-[10px] sm:text-[11px] md:text-xs font-black text-[var(--text-primary)] leading-tight">
                        Qualifying Round
                      </p>
                      <p className="relative text-[8px] sm:text-[9px] md:text-[10px] text-[var(--text-muted)] mt-0.5 leading-snug">
                        A quick test to shortlist the best minds.
                      </p>
                    </div>

                    {/* Day 2 */}
                    <div
                      className="group relative rounded-lg sm:rounded-xl p-2 sm:p-3 text-left
                        bg-[var(--bg-secondary)] border border-[var(--border-color)]
                        overflow-hidden transition-all duration-300 hover:-translate-y-0.5
                        hover:border-[#EC4899]/40
                        shadow-[0_8px_24px_-14px_rgba(236,72,153,0.6)]"
                    >
                      <div
                        aria-hidden
                        className="absolute -top-8 -right-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full 
                          bg-[#EC4899]/15 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5">
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] md:text-[10px] font-black text-white
                            bg-gradient-to-br from-[#EC4899] to-[#8C5BFF]
                            shadow-[0_6px_16px_-6px_rgba(236,72,153,0.9)] shrink-0"
                        >
                          D2
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[6px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.18em] text-[var(--text-muted)] truncate">
                            Day Two
                          </span>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-[#EC4899]">
                            14th Oct
                          </span>
                        </div>
                      </div>
                      <p className="relative text-[10px] sm:text-[11px] md:text-xs font-black text-[var(--text-primary)] leading-tight">
                        Main Rounds
                      </p>
                      <ul className="relative text-[8px] sm:text-[9px] md:text-[10px] text-[var(--text-muted)] mt-0.5 sm:mt-1 space-y-0.5 leading-snug">
                        <li>① Extempore</li>
                        <li>② Dumb Charades</li>
                        <li>③ Presentation</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Prize pool section */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 pt-1 max-w-lg mx-auto lg:mx-0"
                  >
                    {/* Prize Pool label */}
                    <div
                      className="relative inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full 
                        bg-gradient-to-br from-[#F59E0B] to-[#D97706]
                        text-white text-[8px] sm:text-[9px] md:text-[11px] font-black uppercase tracking-wider
                        shadow-[0_10px_24px_-8px_rgba(245,158,11,0.75)]
                        whitespace-nowrap self-center"
                    >
                      <span className="text-xs sm:text-sm md:text-base leading-none">🏆</span>
                      Prize Pool
                    </div>

                    {/* Prize chips */}
                    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center">
                      {[
                        { rank: "1st", amount: "₹3,000", emoji: "🥇", glow: "rgba(245,158,11,0.6)" },
                        { rank: "2nd", amount: "₹2,000", emoji: "🥈", glow: "rgba(148,163,184,0.6)" },
                        { rank: "3rd", amount: "₹1,000", emoji: "🥉", glow: "rgba(180,83,9,0.6)" },
                      ].map((p) => (
                        <span
                          key={p.rank}
                          className="inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 md:px-2.5 md:py-1.5 
                            rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-bold 
                            text-[var(--text-secondary)]
                            bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                            whitespace-nowrap transition-transform hover:scale-105"
                          style={{ boxShadow: `0 6px 18px -10px ${p.glow}` }}
                        >
                          <span>{p.emoji}</span>
                          <b className="text-[var(--primary)]">{p.rank}</b>
                          <span className="text-[var(--text-primary)] font-black">
                            {p.amount}
                          </span>
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Register CTA */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="pt-1.5 sm:pt-2 inline-block"
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdjn6XWWOQvcdSEXmppvy54Z3Neh1ujvGqiaJt6hr8UrpcQmQ/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 
                        px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full 
                        bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                        bg-[length:200%_200%]
                        text-white font-bold text-[9px] sm:text-[10px] md:text-sm 
                        shadow-[0_15px_40px_-12px_rgba(140,91,255,0.75)]
                        hover:shadow-[0_20px_50px_-12px_rgba(236,72,153,0.9)]
                        transition-all duration-300 overflow-hidden group/btn"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                        -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                      <span className="relative whitespace-nowrap">Register Now</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="relative group-hover/btn:translate-x-1 transition-transform flex-shrink-0 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                      >
                        <path
                          d="M5 12h14M13 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </motion.div>
                </div>

                {/* ============ Right: QR Code ============ */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col items-center gap-2 sm:gap-3 z-10 shrink-0 lg:mr-1 mt-2 lg:mt-0"
                >
                  {/* Outer rotating glow ring */}
                  <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 sm:-inset-2 rounded-full opacity-60"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent, rgba(140,91,255,0.5), transparent, rgba(236,72,153,0.5), transparent)",
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Glow ring behind QR */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[var(--primary)]/25 blur-2xl rounded-full"
                  />

                  <div
                    className="relative p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl 
                      bg-[var(--bg-secondary)] shadow-2xl border border-[var(--border-color)] 
                      hover:border-[var(--primary)]/50 
                      hover:shadow-[var(--neon-glow)] transition-all duration-300"
                  >
                    {/* Corner accents */}
                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 sm:w-4 sm:h-4 
                      border-t-2 border-l-2 border-[var(--primary)] rounded-tl-md sm:rounded-tl-lg" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-4 sm:h-4 
                      border-t-2 border-r-2 border-[#EC4899] rounded-tr-md sm:rounded-tr-lg" />
                    <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 sm:w-4 sm:h-4 
                      border-b-2 border-l-2 border-[#06B6D4] rounded-bl-md sm:rounded-bl-lg" />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-4 sm:h-4 
                      border-b-2 border-r-2 border-[var(--primary)] rounded-br-md sm:rounded-br-lg" />

                    <Image
                      src="/images/FunWithFinance-QR.png"
                      alt="Fun With Finance 2026 QR"
                      width={200}
                      height={200}
                      className="rounded-xl sm:rounded-2xl relative z-10 w-[80px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-auto"
                    />
                  </div>

                  <p className="text-[8px] sm:text-[10px] font-bold text-[var(--text-primary)] 
                    tracking-[0.15em] sm:tracking-[0.22em] uppercase flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--primary)] animate-pulse shrink-0" />
                    Scan to Register
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Hero1 />
    </>
  );
};

export default Hero;