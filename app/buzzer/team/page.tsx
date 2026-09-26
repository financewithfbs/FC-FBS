"use client";

import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

type BuzzData = { teamName: string; buzzTime: string; timeTaken?: number };
type SSEMessage =
  | { type: "init"; payload: BuzzData[] }
  | { type: "buzz"; payload: BuzzData }
  | { type: "unbuzz"; payload: { teamName: string } }
  | { type: "reset"; payload?: Record<string, unknown> };

export default function TeamBuzzer() {
  const [teamName, setTeamName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize from query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    const name = params.get("name");
    if (room) setSessionId(room);
    if (name) setTeamName(name);
  }, []);

  // SSE listener for reset events
  useEffect(() => {
    if (!sessionId) return;

    const es = new EventSource(`/api/buzzer/stream?sessionId=${sessionId}`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as SSEMessage;

        if (data.type === "reset") {
          setPressed(false); // unbuzz the team
        }
      } catch (err) {
        console.error("SSE parsing error:", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => es.close();
  }, [sessionId]);

  const handleBuzz = async () => {
    if (!sessionId || !teamName)
      return alert("Enter both Team Name and Room Code!");
    setLoading(true);
    try {
      const res = await fetch("/api/buzzer/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, teamName }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setPressed(true);
          alert(data.error || "Already buzzed");
        } else {
          alert(data.error || "Failed to buzz");
        }
      } else {
        setPressed(true);
      }
    } catch (err) {
      console.error("Buzz error", err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleUnbuzz = async () => {
    if (!sessionId || !teamName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/buzzer/response", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, teamName }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to unbuzz");
      } else {
        setPressed(false);
      }
    } catch (err) {
      console.error("Unbuzz error", err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  /* Floating background particles */
  const particles = [
    { x: "12%", y: "22%", size: 4, delay: 0 },
    { x: "22%", y: "72%", size: 3, delay: 0.7 },
    { x: "38%", y: "38%", size: 5, delay: 1.3 },
    { x: "58%", y: "82%", size: 3, delay: 0.4 },
    { x: "72%", y: "28%", size: 4, delay: 1.9 },
    { x: "84%", y: "62%", size: 5, delay: 1.0 },
  ];

  return (
    <div className="flex flex-col min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] relative overflow-hidden">
      {/* ============================================
          AMBIENT BACKGROUND
      ============================================ */}
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
            "radial-gradient(ellipse at 25% 20%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 75% 80%, #EC4899 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #06B6D4 0%, transparent 55%)",
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
          className="absolute top-0 left-[20%] w-[2px] h-[140%] 
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
          className="relative w-full max-w-md rounded-[28px] p-[1.5px] 
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
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full 
                    border text-[10px] font-bold tracking-[0.22em] uppercase
                    shadow-[0_4px_16px_-4px_rgba(140,91,255,0.5)] backdrop-blur-sm
                    ${
                      pressed
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                        : "bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]"
                    }`}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        pressed ? "bg-emerald-400" : "bg-[var(--primary)]"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                        pressed ? "bg-emerald-400" : "bg-[var(--primary)]"
                      }`}
                    />
                  </span>
                  {pressed ? "Buzzed In" : "Ready to Buzz"}
                </div>

                <h1 className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight">
                  <span className="bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
                    🎯 Team
                  </span>{" "}
                  <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                    Buzzer
                  </span>
                </h1>

                <div
                  className="mx-auto mt-4 h-1 w-20 rounded-full 
                    bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                    shadow-[0_0_14px_rgba(236,72,153,0.7)]"
                />
              </div>

              {/* ---------- Team Name ---------- */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                  <span className="text-base">👤</span>
                  Team Name
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none 
                      py-2.5 pr-3 text-sm 
                      text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
              </div>

              {/* ---------- Room Code ---------- */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-[var(--text-secondary)] mb-2 font-semibold text-xs uppercase tracking-wider">
                  <span className="text-base">🎯</span>
                  Room Code
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
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </span>
                  <input
                    placeholder="Enter Room Code"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none 
                      py-2.5 pr-3 text-sm tracking-widest
                      text-[var(--text-primary)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
              </div>

              {/* ---------- Buzzer + Unbuzz ---------- */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <motion.button
                  disabled={pressed || loading}
                  onClick={handleBuzz}
                  whileHover={pressed || loading ? {} : { scale: 1.03, y: -2 }}
                  whileTap={pressed || loading ? {} : { scale: 0.97 }}
                  className={`group relative flex-1 flex items-center justify-center gap-2
                    py-4 rounded-2xl font-bold text-sm text-white
                    transition-all duration-300 overflow-hidden
                    ${
                      pressed || loading
                        ? "cursor-not-allowed opacity-70"
                        : ""
                    }`}
                  style={{
                    background:
                      pressed || loading
                        ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                        : "linear-gradient(135deg, var(--primary) 0%, #EC4899 100%)",
                    boxShadow:
                      pressed || loading
                        ? "0 8px 24px -12px rgba(0,0,0,0.5)"
                        : "0 20px 50px -15px rgba(140,91,255,0.75), 0 0 0 1px rgba(255,255,255,0.08) inset, inset 0 1px 0 rgba(255,255,255,0.25)",
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
                    {pressed ? (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Buzzed!
                      </>
                    ) : loading ? (
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
                        Sending...
                      </>
                    ) : (
                      <>
                        ⚡ Press Buzzer
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.button
                  disabled={!pressed || loading}
                  onClick={handleUnbuzz}
                  whileHover={!pressed || loading ? {} : { scale: 1.03, y: -2 }}
                  whileTap={!pressed || loading ? {} : { scale: 0.97 }}
                  className={`group relative flex-1 flex items-center justify-center gap-2
                    py-4 rounded-2xl font-bold text-sm
                    transition-all duration-300 overflow-hidden
                    ${
                      !pressed || loading
                        ? "cursor-not-allowed opacity-70 bg-[var(--bg-secondary)] text-[var(--text-dim)] border border-[var(--border-color)]"
                        : "text-white"
                    }`}
                  style={
                    !pressed || loading
                      ? {}
                      : {
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #e11d48 100%)",
                          boxShadow:
                            "0 20px 50px -15px rgba(239,68,68,0.65), inset 0 1px 0 rgba(255,255,255,0.2)",
                        }
                  }
                >
                  {pressed && !loading && (
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    🧹 Unbuzz
                  </span>
                </motion.button>
              </div>

              {/* ---------- Connection status ---------- */}
              {sessionId && (
                <div
                  className="mt-6 rounded-2xl p-4 flex items-center gap-3
                    bg-[var(--bg-secondary)] border border-[var(--border-color)]
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                >
                  <span
                    className="flex items-center justify-center shrink-0 w-9 h-9 rounded-xl
                      bg-emerald-500/15 border border-emerald-500/25"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                  </span>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-emerald-500">
                      Connected
                    </p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      Room ·{" "}
                      <span className="font-mono tracking-widest text-[var(--primary)]">
                        {sessionId}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* ---------- Reassurance ---------- */}
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
                Live connection · Instant feedback
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}