"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BuzzerPage() {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const isFormValid = roomCode.trim() && name.trim();

  /* ---------- Shared input styles ---------- */
  const fieldWrapper =
    "relative flex items-center w-full rounded-2xl border-2 border-[var(--border-color)] " +
    "bg-[var(--input-bg)] " +
    "focus-within:border-[var(--primary)] " +
    "focus-within:ring-2 focus-within:ring-[var(--primary)]/40 " +
    "focus-within:shadow-[0_0_0_5px_rgba(140,91,255,0.14),0_8px_24px_-12px_rgba(140,91,255,0.5)] " +
    "hover:border-[var(--primary-light)] hover:shadow-[0_8px_24px_-12px_rgba(140,91,255,0.35)] " +
    "transition-all duration-300 " +
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]";

  const inputBase =
    "flex-1 min-w-0 bg-transparent border-0 outline-none " +
    "py-2.5 pr-3 text-sm " +
    "text-[var(--text-primary)] placeholder:text-[var(--text-dim)]";

  /* Floating particles config — small, subtle, scattered */
  const particles = [
    { x: "8%", y: "18%", size: 4, delay: 0 },
    { x: "15%", y: "72%", size: 3, delay: 0.6 },
    { x: "25%", y: "35%", size: 5, delay: 1.2 },
    { x: "42%", y: "82%", size: 3, delay: 0.3 },
    { x: "58%", y: "22%", size: 4, delay: 1.8 },
    { x: "72%", y: "62%", size: 5, delay: 0.9 },
    { x: "85%", y: "28%", size: 3, delay: 1.5 },
    { x: "92%", y: "76%", size: 4, delay: 0.4 },
    { x: "36%", y: "12%", size: 3, delay: 2.1 },
    { x: "66%", y: "88%", size: 4, delay: 1.1 },
  ];

  return (
    <div className="flex flex-col min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] relative overflow-hidden">
      {/* ============================================
          LAYER 1 — BASE GRADIENT WASH
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0
          bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
      />

      {/* ============================================
          LAYER 2 — AURORA ORBS (color blobs)
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 15%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 80% 85%, #EC4899 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #06B6D4 0%, transparent 55%)",
          opacity: 0.11,
        }}
      />

      {/* ============================================
          LAYER 3 — GRID (radial-masked)
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.3] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,91,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 40%, transparent 100%)",
        }}
      />

      {/* ============================================
          LAYER 4 — CENTRAL SPOTLIGHT
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0
          w-[900px] h-[500px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center top, var(--primary), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* ============================================
          LAYER 5 — DIAGONAL LIGHT BEAMS
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.08] dark:opacity-[0.12]"
      >
        <motion.div
          animate={{ x: [-200, 200, -200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[10%] w-[2px] h-[140%] 
            bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent
            rotate-[20deg] origin-top"
        />
        <motion.div
          animate={{ x: [200, -200, 200] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[70%] w-[2px] h-[140%] 
            bg-gradient-to-b from-transparent via-[#EC4899] to-transparent
            rotate-[-15deg] origin-top"
        />
        <motion.div
          animate={{ x: [-150, 150, -150] }}
          transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[45%] w-[1px] h-[140%] 
            bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent
            rotate-[8deg] origin-top"
        />
      </div>

      {/* ============================================
          LAYER 6 — FLOATING GLOWING PARTICLES
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background:
                i % 3 === 0
                  ? "var(--primary)"
                  : i % 3 === 1
                    ? "#EC4899"
                    : "#06B6D4",
              boxShadow:
                i % 3 === 0
                  ? "0 0 12px rgba(140,91,255,0.8)"
                  : i % 3 === 1
                    ? "0 0 12px rgba(236,72,153,0.8)"
                    : "0 0 12px rgba(6,182,212,0.8)",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ============================================
          LAYER 7 — LARGE FLOATING ORBS
      ============================================ */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full 
          bg-[var(--primary)]/25 blur-[130px] z-0"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-32 -right-32 w-[380px] h-[380px] rounded-full 
          bg-[#EC4899]/20 blur-[120px] z-0"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full 
          bg-[#06B6D4]/10 blur-[140px] z-0"
      />

      {/* ============================================
          LAYER 8 — NOISE TEXTURE (premium grain)
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navbar />

      {/* ============================================
          MAIN
      ============================================ */}
      <main
        className="flex-1 flex flex-col md:flex-row items-center justify-center 
          px-4 sm:px-8 md:px-16 lg:px-20 
          pt-28 sm:pt-32 md:pt-32 lg:pt-32
          pb-16 md:pb-20 lg:pb-24
          gap-10 md:gap-12 lg:gap-16
          relative z-10"
      >
        {/* ============================================
            LEFT — Hero copy
        ============================================ */}
        <div className="flex-1 text-center md:text-left max-w-lg space-y-5 sm:space-y-6">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full 
              bg-[var(--primary)]/10 border border-[var(--primary)]/20 
              text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase
              shadow-[0_4px_16px_-4px_rgba(140,91,255,0.5)] backdrop-blur-sm mx-auto md:mx-0"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            Live Buzzer System
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            <span className="block bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
              Simple Multiplayer
            </span>
            <span className="block bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Buzzer System
            </span>
          </h1>

          <div
            className="mx-auto md:mx-0 h-1 w-20 rounded-full 
              bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
              shadow-[0_0_14px_rgba(236,72,153,0.7)]"
          />

          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
            Host a room and invite up to{" "}
            <span className="font-bold text-[var(--primary)]">200 people</span>{" "}
            to join the fun — instant buzzers, live reactions, zero setup.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-2">
            {[
              { icon: "⚡", label: "Real-time" },
              { icon: "👥", label: "Up to 200" },
              { icon: "🎯", label: "Zero setup" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                  text-[11px] font-bold uppercase tracking-wider 
                  text-[var(--text-muted)] 
                  bg-[var(--card-bg)]/70 backdrop-blur-md border border-[var(--border-color)]
                  shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]"
              >
                <span>{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* ============================================
            RIGHT — Join card
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1 w-full max-w-sm"
        >
          {/* Gradient shell */}
          <div
            className="relative rounded-[28px] p-[1.5px] 
              bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
              shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55),0_20px_60px_-30px_rgba(0,0,0,0.6)]"
          >
            <div
              className="relative rounded-[26px] p-6 sm:p-8 overflow-hidden
                bg-[var(--card-bg)]/85 backdrop-blur-xl"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Ambient glow behind heading */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 
                  w-56 h-40 bg-[var(--primary)]/25 blur-[80px]"
              />

              {/* Inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 
                  bg-gradient-to-br from-[var(--primary)]/[0.04] via-transparent to-[#06B6D4]/[0.04]"
              />

              <div className="relative">
                {/* Card header */}
                <div className="text-center mb-7">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full 
                      bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                      text-[var(--primary)] text-[10px] font-bold tracking-[0.2em] uppercase
                      shadow-[0_4px_16px_-4px_rgba(140,91,255,0.45)]"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
                    </span>
                    Player Entry
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
                    Join a{" "}
                    <span className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] bg-clip-text text-transparent">
                      Game
                    </span>
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* Room Code */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                      <span className="text-base">🎯</span>
                      Room Code
                    </label>
                    <div className={fieldWrapper}>
                      <span
                        className="flex items-center justify-center shrink-0 w-11 h-full 
                          text-[var(--text-dim)] pointer-events-none"
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="3" y="14" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                      </span>
                      <input
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="Enter room code"
                        className={inputBase + " tracking-widest"}
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                      <span className="text-base">👤</span>
                      Your Name
                    </label>
                    <div className={fieldWrapper}>
                      <span
                        className="flex items-center justify-center shrink-0 w-11 h-full 
                          text-[var(--text-dim)] pointer-events-none"
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Join button */}
                  <Link
                    href={`/buzzer/team?room=${roomCode}&name=${name}`}
                    className={`group relative w-full flex items-center justify-center gap-2
                      py-3 rounded-2xl font-bold text-sm text-white
                      transition-all duration-300 overflow-hidden
                      ${
                        isFormValid
                          ? "cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5"
                          : "cursor-not-allowed opacity-60"
                      }`}
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary) 0%, #EC4899 100%)",
                      boxShadow:
                        "0 20px 50px -15px rgba(140,91,255,0.75), 0 0 0 1px rgba(255,255,255,0.08) inset, inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Join Room
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-0.5 transition-transform"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)] font-bold">
                      Or
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
                  </div>

                  {/* Host prompt */}
                  <p className="text-center text-[var(--text-muted)] text-sm">
                    Hosting?{" "}
                    <Link
                      href="/buzzer/host"
                      className="font-semibold text-[var(--primary)] hover:text-[#EC4899] underline-offset-4 hover:underline transition-colors"
                    >
                      Create room
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reassurance below the card */}
          <p className="text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 mt-5">
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
            No sign-up required · Instant play
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}