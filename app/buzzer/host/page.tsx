"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QRCode from "qrcode";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type BuzzData = { teamName: string; buzzTime: string; timeTaken?: number };
type SSEMessage =
  | { type: "init"; payload: BuzzData[] }
  | { type: "buzz"; payload: BuzzData }
  | { type: "unbuzz"; payload: { teamName: string } }
  | { type: "reset"; payload?: Record<string, unknown> };

export default function HostBuzzer() {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [buzzes, setBuzzes] = useState<BuzzData[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [joinLink, setJoinLink] = useState<string | null>(null);

  // ✅ Effect 1: Setup EventSource for buzzer updates
  useEffect(() => {
    if (!roomCode) return;

    const es = new EventSource(`/api/buzzer/stream?sessionId=${roomCode}`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as SSEMessage;

        switch (data.type) {
          case "init":
            setBuzzes(
              data.payload.map((p) => ({
                teamName: p.teamName,
                buzzTime: p.buzzTime,
                timeTaken: p.timeTaken,
              }))
            );
            break;

          case "buzz":
            setBuzzes((prev) => {
              if (prev.some((b) => b.teamName === data.payload.teamName))
                return prev;
              const next = [...prev, data.payload];
              next.sort(
                (a, b) =>
                  new Date(a.buzzTime).getTime() -
                  new Date(b.buzzTime).getTime()
              );
              return next;
            });
            break;

          case "unbuzz":
            setBuzzes((prev) =>
              prev.filter((b) => b.teamName !== data.payload.teamName)
            );
            break;

          case "reset":
            setBuzzes([]);
            break;
        }
      } catch (err) {
        console.error("Failed to parse SSE message", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => es.close();
  }, [roomCode]);

  // ✅ Effect 2: Generate QR Code (separately)
  useEffect(() => {
    if (!roomCode) return;

    const link = `https://fc-fbs.vercel.app/buzzer/team?room=${roomCode}`;
    setJoinLink(link);

    QRCode.toDataURL(link)
      .then(setQrUrl)
      .catch((err) => console.error("QR generation failed:", err));
  }, [roomCode]);

  const handleCreateRoom = async () => {
    const res = await fetch("/api/buzzer/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: roomName || "Untitled Round" }),
    });
    const data = await res.json();
    setRoomCode(data.id);
  };

  const handleResetRound = async () => {
    if (!roomCode) return;
    setIsResetting(true);
    try {
      await fetch("/api/buzzer/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: roomCode }),
      });
    } catch (err) {
      console.error("Failed to reset round", err);
    } finally {
      setIsResetting(false);
    }
  };

  /* Floating background particles */
  const particles = [
    { x: "10%", y: "20%", size: 4, delay: 0 },
    { x: "20%", y: "70%", size: 3, delay: 0.7 },
    { x: "35%", y: "40%", size: 5, delay: 1.3 },
    { x: "55%", y: "85%", size: 3, delay: 0.4 },
    { x: "70%", y: "25%", size: 4, delay: 1.9 },
    { x: "82%", y: "60%", size: 5, delay: 1.0 },
    { x: "90%", y: "15%", size: 3, delay: 1.6 },
    { x: "45%", y: "12%", size: 4, delay: 2.2 },
  ];

  return (
    <div className="flex flex-col min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] relative overflow-hidden">
      {/* ============================================
          AMBIENT BACKGROUND (layered)
      ============================================ */}
      {/* Base gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0
          bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
      />

      {/* Aurora orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 15%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 80% 85%, #EC4899 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #06B6D4 0%, transparent 55%)",
          opacity: 0.1,
        }}
      />

      {/* Grid */}
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

      {/* Central spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0
          w-[900px] h-[500px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center top, var(--primary), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Diagonal beams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.08] dark:opacity-[0.12]"
      >
        <motion.div
          animate={{ x: [-200, 200, -200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[15%] w-[2px] h-[140%] 
            bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent
            rotate-[20deg] origin-top"
        />
        <motion.div
          animate={{ x: [200, -200, 200] }}
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[75%] w-[2px] h-[140%] 
            bg-gradient-to-b from-transparent via-[#EC4899] to-transparent
            rotate-[-15deg] origin-top"
        />
      </div>

      {/* Floating particles */}
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

      {/* Large floating orbs */}
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

      {/* Noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navbar />

      <main className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8 pt-28 md:pt-32 pb-16 relative z-10">
        {/* ============================================
            MAIN CARD
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-lg rounded-[28px] p-[1.5px] 
            bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
            shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55),0_20px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <div
            className="relative rounded-[26px] p-6 sm:p-10 overflow-hidden
              bg-[var(--card-bg)]/90 backdrop-blur-xl"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Ambient glow behind heading */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 
                w-64 h-40 bg-[var(--primary)]/25 blur-[80px]"
            />

            {/* Inner sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 
                bg-gradient-to-br from-[var(--primary)]/[0.04] via-transparent to-[#06B6D4]/[0.04]"
            />

            <div className="relative">
              {/* Heading */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full 
                    bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                    text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase
                    shadow-[0_4px_16px_-4px_rgba(140,91,255,0.5)] backdrop-blur-sm"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  {roomCode ? "Session Live" : "Host Console"}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
                    🎮 Host a
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                    Buzzer Game
                  </span>
                </h1>

                <div
                  className="mx-auto mt-4 h-1 w-20 rounded-full 
                    bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                    shadow-[0_0_14px_rgba(236,72,153,0.7)]"
                />
              </div>

              {/* ============================================
                  STATE 1 — NO ROOM YET
              ============================================ */}
              {!roomCode ? (
                <div className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                      <span className="text-base">🏷️</span>
                      Room Name
                    </label>
                    <div
                      className="relative flex items-center w-full rounded-2xl border-2 border-[var(--border-color)] 
                        bg-[var(--input-bg)] 
                        focus-within:border-[var(--primary)] 
                        focus-within:ring-2 focus-within:ring-[var(--primary)]/40
                        focus-within:shadow-[0_0_0_5px_rgba(140,91,255,0.14),0_8px_24px_-12px_rgba(140,91,255,0.5)]
                        hover:border-[var(--primary-light)]
                        transition-all duration-300
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    >
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
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Enter room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="flex-1 min-w-0 bg-transparent border-0 outline-none 
                          py-3 pr-3 text-sm 
                          text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={handleCreateRoom}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex items-center justify-center gap-2
                      py-3.5 rounded-2xl font-bold text-sm text-white
                      transition-all duration-300 overflow-hidden"
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
                      🚀 Create Room
                    </span>
                  </motion.button>

                  <p className="text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 pt-1">
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
                    Instant setup · No login required
                  </p>
                </div>
              ) : (
                /* ============================================
                    STATE 2 — ROOM CREATED
                ============================================ */
                <div className="space-y-6">
                  {/* Success banner */}
                  <div
                    className="rounded-2xl p-4 flex items-center gap-3
                      bg-emerald-500/10 border border-emerald-500/25
                      shadow-[0_8px_24px_-12px_rgba(16,185,129,0.5)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                        bg-gradient-to-br from-emerald-500 to-emerald-600
                        shadow-[0_8px_24px_-6px_rgba(16,185,129,0.7)]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        Room Created Successfully!
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Share the code below with participants
                      </p>
                    </div>
                  </div>

                  {/* Room code */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                      <span className="text-base">🎯</span>
                      Room Code
                    </label>
                    <div
                      className="rounded-2xl py-5 px-4 text-center relative overflow-hidden group
                        bg-[var(--bg-secondary)] border-2 border-[var(--primary)]/25
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_12px_30px_-12px_rgba(140,91,255,0.5)]"
                    >
                      {/* Ambient glow */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 
                          bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[#EC4899]/5"
                      />
                      <div className="relative">
                        <span className="text-3xl md:text-4xl font-mono font-black tracking-[0.15em]
                          bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                          bg-clip-text text-transparent
                          break-all">
                          {roomCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  {qrUrl && joinLink && (
                    <div className="flex flex-col items-center gap-3">
                      <motion.a
                        href={joinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group"
                      >
                        {/* Glow ring */}
                        <div
                          aria-hidden
                          className="absolute -inset-2 rounded-[28px] 
                            bg-gradient-to-br from-[var(--primary)]/30 via-[#EC4899]/20 to-[#06B6D4]/30 
                            blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="relative p-3 rounded-3xl bg-[var(--card-bg)] 
                          border border-[var(--border-color)]
                          shadow-[0_20px_50px_-15px_rgba(140,91,255,0.5)]">
                          <Image
                            src={qrUrl}
                            alt="Room QR Code"
                            width={180}
                            height={180}
                            className="rounded-2xl"
                          />

                          {/* Gradient hover overlay */}
                          <div className="absolute inset-3 rounded-2xl 
                            bg-gradient-to-br from-[var(--primary)]/15 to-[#EC4899]/15 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Center logo */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative">
                              <div
                                aria-hidden
                                className="absolute inset-0 rounded-full 
                                  bg-[var(--primary)]/40 blur-lg"
                              />
                              <Image
                                src="/images/Transparent logo.png"
                                alt="Logo"
                                width={55}
                                height={55}
                                className="relative rounded-full 
                                  bg-white/90 backdrop-blur-sm p-1 
                                  border border-[var(--border-color)]
                                  shadow-[0_8px_24px_-6px_rgba(140,91,255,0.6)]
                                  animate-pulse"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.a>

                      <p className="text-sm text-[var(--text-muted)] font-medium flex items-center gap-1.5">
                        <span className="text-base">📱</span>
                        Scan or Tap to Join
                      </p>
                    </div>
                  )}

                  {/* Join link */}
                  <div className="rounded-2xl p-4 
                    bg-[var(--bg-secondary)] border border-[var(--border-color)]
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[var(--primary)] mb-2 flex items-center gap-2">
                      <span>🔗</span>
                      Direct Link
                    </p>
                    <a
                      href={joinLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[var(--text-primary)]
                        hover:text-[var(--primary)] transition-colors
                        underline underline-offset-4 decoration-dotted
                        break-all"
                    >
                      {joinLink}
                    </a>
                  </div>

                  {/* Reset button */}
                  <motion.button
                    onClick={handleResetRound}
                    disabled={isResetting}
                    whileHover={isResetting ? {} : { scale: 1.02, y: -1 }}
                    whileTap={isResetting ? {} : { scale: 0.98 }}
                    className={`group relative w-full flex items-center justify-center gap-2
                      py-3.5 rounded-2xl font-bold text-sm text-white
                      transition-all duration-300 overflow-hidden
                      ${isResetting ? "cursor-not-allowed opacity-70" : ""}`}
                    style={{
                      background: isResetting
                        ? "linear-gradient(135deg, #6b7280, #4b5563)"
                        : "linear-gradient(135deg, #ef4444 0%, #e11d48 100%)",
                      boxShadow: isResetting
                        ? "0 8px 24px -12px rgba(0,0,0,0.5)"
                        : "0 20px 50px -15px rgba(239,68,68,0.65), inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {isResetting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="white"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="white"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Resetting...
                        </>
                      ) : (
                        <>
                          🧹 Reset Round
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* ============================================
                      BUZZ ACTIVITY
                  ============================================ */}
                  <div className="pt-6 border-t border-[var(--border-color)]/60">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⚡</span>
                        <h3 className="text-lg font-black text-[var(--text-primary)] tracking-tight">
                          Buzz Activity
                        </h3>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full 
                          bg-[var(--primary)]/10 border border-[var(--primary)]/20
                          text-[var(--primary)] text-[10px] font-bold tracking-wider"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                        {buzzes.length} {buzzes.length === 1 ? "buzz" : "buzzes"}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      <AnimatePresence mode="popLayout">
                        {buzzes.map((b, i) => (
                          <motion.li
                            key={b.teamName + b.buzzTime}
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 24,
                            }}
                            className={`px-5 py-3 rounded-2xl flex justify-between items-center gap-3
                              transition-all duration-300
                              ${
                                i === 0
                                  ? "border-2 border-emerald-500/40 shadow-[0_16px_40px_-12px_rgba(16,185,129,0.6)]"
                                  : "border border-[var(--border-color)] shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_28px_-10px_rgba(140,91,255,0.4)]"
                              }`}
                            style={{
                              background:
                                i === 0
                                  ? "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)"
                                  : "var(--bg-secondary)",
                              color: i === 0 ? "white" : "var(--text-primary)",
                            }}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black
                                  ${
                                    i === 0
                                      ? "bg-white/25 text-white shadow-inner"
                                      : "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                                  }`}
                              >
                                {i === 0 ? "🏆" : i + 1}
                              </span>
                              <span className="font-bold text-base truncate">
                                {b.teamName}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-semibold flex items-center gap-2 shrink-0
                                ${i === 0 ? "opacity-90" : "opacity-75"}`}
                            >
                              <span className="hidden sm:inline">
                                {new Date(b.buzzTime).toLocaleTimeString()}
                              </span>
                              {b.timeTaken !== undefined && (
                                <span
                                  className={`font-mono px-2 py-0.5 rounded-md text-[11px]
                                    ${
                                      i === 0
                                        ? "bg-white/20"
                                        : "bg-[var(--primary)]/10 text-[var(--primary)]"
                                    }`}
                                >
                                  {b.timeTaken.toFixed(2)}s
                                </span>
                              )}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    {buzzes.length === 0 && (
                      <div className="text-center py-10 rounded-2xl 
                        border border-dashed border-[var(--border-color)]">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl 
                          bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                          flex items-center justify-center text-2xl">
                          📡
                        </div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">
                          Waiting for buzzes...
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Teams will appear here as soon as they buzz in
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}