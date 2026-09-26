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

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
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
        className="min-h-[100vh] pt-[140px] pb-20 bg-[var(--bg-primary)] relative overflow-hidden z-10"
      >
        {/* ================================================
            LAYER 1 — BASE GRADIENT WASH
            Soft top-to-bottom theme gradient that grounds
            everything else.
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0
            bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
        />

        {/* ================================================
            LAYER 2 — AURORA MESH
            Large, soft, animated color blobs that give the
            hero its dreamy "northern lights" glow.
        ================================================ */}
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-40 -left-40 
            w-[600px] h-[600px] rounded-full 
            bg-[var(--primary)]/30 
            blur-[160px] 
            animate-pulse-slow"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute top-1/4 -right-40 
            w-[520px] h-[520px] rounded-full 
            bg-[#EC4899]/25 
            blur-[150px] 
            animate-float-slow"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -bottom-40 left-1/3 
            w-[480px] h-[480px] rounded-full 
            bg-[#06B6D4]/20 
            blur-[140px] 
            animate-float-delay"
        />

        {/* ================================================
            LAYER 3 — VISIBLE GRID (fixed)
            Uses --border-color so it shows in BOTH themes.
            Bumped opacity and added a mask so it fades out
            toward the edges.
        ================================================ */}
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

        {/* ================================================
            LAYER 4 — SPOTLIGHT
            A bright radial spotlight centered behind the
            heading to draw the eye.
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 
            w-[900px] h-[500px] opacity-60
            bg-[radial-gradient(ellipse_at_center_top,var(--primary),transparent_60%)]"
          style={{ filter: "blur(60px)" }}
        />

        {/* ================================================
            LAYER 5 — DECORATIVE RINGS
            Two concentric rings that slowly rotate on
            scroll for a subtle "orbit" feel.
        ================================================ */}
        <motion.div
          aria-hidden
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[820px] h-[820px] rounded-full 
            border border-[var(--primary)]/15"
        />
        <motion.div
          aria-hidden
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[620px] h-[620px] rounded-full 
            border border-[#EC4899]/10"
        />

        {/* ================================================
            LAYER 6 — FLOATING ACCENT DOTS
            Small colored dots that drift around the hero.
        ================================================ */}
        <motion.div
          aria-hidden
          className="absolute bottom-40 left-1/4 w-12 h-12 bg-[var(--primary)] rounded-full opacity-20 blur-[1px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#EC4899] rounded-full opacity-25 blur-[1px]"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -30, 0],
            rotate: [0, -120, -240],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#06B6D4] rounded-full opacity-25 blur-[1px]"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================
            LAYER 7 — NOISE TEXTURE
            Very faint SVG noise for a premium grain feel.
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ================================================
            TOP EDGE ACCENT LINE
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 h-px 
            bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent"
        />

        {/* ================= CONTENT WRAPPER ================= */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
          {/* ============ HEADING ============ */}
          <motion.div
            className="w-full max-w-3xl"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: easeOut }}
            style={{ y: y1 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[var(--text-secondary)]"
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

            {/* Underline accent */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                isInView
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
              className="mx-auto mt-6 h-1 w-24 rounded-full 
                bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"
            />

            <motion.p
              className="mt-6 text-[var(--text-muted)] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2"
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

          {/* ============ VITT-MANTHAN EVENT CARD ============ */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-6xl -mt-10"
          >
            {/* Card shell with gradient border */}
            <div className="relative rounded-[24px] p-[1.5px] bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 shadow-2xl">
              <div
                className="relative rounded-[22px] bg-[var(--card-bg)] overflow-hidden
                  flex flex-col md:flex-row items-center justify-between 
                  gap-6 md:gap-8 lg:gap-10 
                  p-5 sm:p-7 md:p-8 lg:p-10"
              >
                {/* Soft inner gradient sheen */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 
                    bg-gradient-to-br from-[var(--primary)]/[0.05] via-transparent to-[#06B6D4]/[0.05]"
                />

                {/* Left: content */}
                <div className="relative flex-1 min-w-0 w-full text-center md:text-left space-y-3.5 z-10">
                  <motion.h2
                    initial={{ x: -40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight"
                  >
                    <span
                      className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] 
                        bg-clip-text text-transparent"
                    >
                      VITT-MANTHAN
                    </span>{" "}
                    <span className="text-[var(--text-primary)]">2026</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-[var(--text-secondary)] text-sm sm:text-base md:text-[17px] 
                      leading-relaxed max-w-lg mx-auto md:mx-0 font-medium"
                  >
                    ⚡{" "}
                    <b className="text-[var(--primary)]">
                      The Ultimate Budget Debate Showdown!
                    </b>
                  </motion.p>

                  {/* Stat chips */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-wrap justify-center md:justify-start gap-2"
                  >
                    {[
                      { icon: "📅", label: "09 Mar 2026" },
                      { icon: "🕑", label: "2:00 PM" },
                      { icon: "🏛️", label: "Seminar Hall" },
                      { icon: "🎤", label: "12 Teams" },
                    ].map((chip) => (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 
                          rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider 
                          text-[var(--text-muted)] 
                          bg-[var(--bg-secondary)] border border-[var(--border-color)] whitespace-nowrap"
                      >
                        <span>{chip.icon}</span>
                        {chip.label}
                      </span>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-[var(--text-muted)] text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0"
                  >
                    🏆{" "}
                    <b className="text-[var(--text-primary)]">
                      Witness ideas clash, perspectives evolve, and champions
                      rise!
                    </b>
                  </motion.p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 inline-block"
                  >
                    <a
                      href="https://fc-fbs-voting-system.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center gap-2 
                        px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full 
                        bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] 
                        text-white font-bold text-xs sm:text-sm shadow-lg 
                        hover:shadow-[var(--neon-glow)] 
                        transition-all duration-300 overflow-hidden group/btn"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                        -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      <span className="relative whitespace-nowrap">🗳️ VITT-MANTHAN 26 Voting</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="relative group-hover/btn:translate-x-1 transition-transform flex-shrink-0"
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

                {/* Right: QR Code */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col items-center gap-3 z-10 shrink-0"
                >
                  {/* Glow ring behind QR */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[var(--primary)]/20 blur-2xl rounded-full"
                  />

                  <div className="relative p-3 sm:p-3.5 md:p-4 rounded-3xl 
                    bg-[var(--bg-secondary)] shadow-xl border border-[var(--border-color)] 
                    hover:border-[var(--primary)]/40 
                    hover:shadow-[var(--neon-glow)] transition-all duration-300">
                    {/* Corner accents */}
                    <span className="absolute -top-1 -left-1 w-3.5 h-3.5 
                      border-t-2 border-l-2 border-[var(--primary)] rounded-tl-lg" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 
                      border-t-2 border-r-2 border-[var(--primary)] rounded-tr-lg" />
                    <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 
                      border-b-2 border-l-2 border-[var(--primary)] rounded-bl-lg" />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 
                      border-b-2 border-r-2 border-[var(--primary)] rounded-br-lg" />

                    <Image
                      src="/images/FC-FBS Voting System.png"
                      alt="VITT-MANTHAN 2026 QR"
                      width={200}
                      height={200}
                      className="rounded-2xl relative z-10 w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] h-auto"
                    />
                  </div>

                  <p className="text-[10px] font-bold text-[var(--text-primary)] 
                    tracking-[0.22em] uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                    Scan to Vote
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