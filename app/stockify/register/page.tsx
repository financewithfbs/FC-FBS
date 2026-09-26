"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function StockiFyRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    teamName: "",
    member1Name: "",
    member1Email: "",
    member1Section: "",
    member1Phone: "",
    member1Year: "",
    member1PGP: "",
    member2Name: "",
    member2Email: "",
    member2Section: "",
    member2Phone: "",
    member2Year: "",
    member2PGP: "",
    member3Name: "",
    member3Email: "",
    member3Section: "",
    member3Phone: "",
    member3Year: "",
    member3PGP: "",
  });

  // Mouse tracking for hero spotlight
  const heroRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/stockify/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("🎉 Team registered successfully!");
      setForm({
        ...form,
        teamName: "",
        member1Name: "",
        member1Email: "",
        member1Section: "",
        member1Phone: "",
        member1Year: "",
        member1PGP: "",
        member2Name: "",
        member2Email: "",
        member2Section: "",
        member2Phone: "",
        member2Year: "",
        member2PGP: "",
        member3Name: "",
        member3Email: "",
        member3Section: "",
        member3Phone: "",
        member3Year: "",
        member3PGP: "",
      });
    } else if (res.status === 409) {
      alert(
        "⚠️ A team with this name already exists. Please choose another name."
      );
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  // 🕒 STEP 1: Define registration window
  const registrationStart = new Date("2026-01-16T12:00:00+05:30");
  const registrationEnd = new Date("2026-01-18T19:30:00+05:30");
  const now = new Date();

  const registrationNotStarted = now < registrationStart;
  const registrationClosed = now > registrationEnd;

  const memberAccents = [
    {
      from: "#8C5BFF",
      to: "#5B8DEF",
      ring: "rgba(140,91,255,0.30)",
      tag: "Leader",
      emoji: "👑",
      glow: "140,91,255",
    },
    {
      from: "#EC4899",
      to: "#8C5BFF",
      ring: "rgba(236,72,153,0.28)",
      tag: "Strategist",
      emoji: "🧠",
      glow: "236,72,153",
    },
    {
      from: "#06B6D4",
      to: "#6356D7",
      ring: "rgba(6,182,212,0.28)",
      tag: "Analyst",
      emoji: "📊",
      glow: "6,182,212",
    },
  ];

  const tickerItems = [
    "NIFTY +1.24%",
    "SENSEX +0.87%",
    "BANKNIFTY +2.11%",
    "RELIANCE +0.45%",
    "TCS +1.02%",
    "INFY +0.68%",
    "HDFCBANK +1.35%",
    "ITC -0.22%",
    "WIPRO +0.91%",
    "ADANIENT +2.44%",
  ];

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-44 min-h-[70vh]"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3d] via-[#2d1b69] to-[#0f0524]"></div>

        {/* Mouse-tracked spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(140,91,255,0.25), transparent 40%)`,
          }}
        ></div>

        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-[#8C5BFF] opacity-30 blur-[120px] animate-float-slow"></div>
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#EC4899] opacity-20 blur-[130px] animate-float"></div>
          <div className="absolute bottom-[-20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#06B6D4] opacity-20 blur-[120px] animate-float-delay"></div>
        </div>

        {/* Grid pattern with radial mask */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        ></div>

        {/* Floating market symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {[
            { t: "₹", x: "6%", y: "18%", d: "0s", s: "2rem" },
            { t: "📈", x: "88%", y: "22%", d: "1.2s", s: "1.8rem" },
            { t: "💹", x: "10%", y: "72%", d: "0.6s", s: "1.6rem" },
            { t: "$", x: "92%", y: "68%", d: "1.8s", s: "2rem" },
            { t: "📊", x: "78%", y: "12%", d: "2.4s", s: "1.4rem" },
            { t: "⚡", x: "20%", y: "12%", d: "0.9s", s: "1.4rem" },
            { t: "🏆", x: "4%", y: "50%", d: "1.5s", s: "1.5rem" },
            { t: "💰", x: "95%", y: "48%", d: "2.1s", s: "1.6rem" },
            { t: "🪙", x: "48%", y: "8%", d: "1.1s", s: "1.3rem" },
            { t: "💎", x: "55%", y: "88%", d: "2.3s", s: "1.4rem" },
          ].map((el, i) => (
            <span
              key={i}
              className="absolute opacity-25 animate-float"
              style={{
                left: el.x,
                top: el.y,
                animationDelay: el.d,
                fontSize: el.s,
              }}
            >
              {el.t}
            </span>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-8 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-sm font-medium tracking-wide shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              StockiFy 2026 · Team Registration
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05]">
            <span className="block bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(140,91,255,0.5)]">
              StockiFy
            </span>
            <span className="block bg-gradient-to-r from-[#8C5BFF] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent pb-2">
              Registration
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the ultimate stock market simulation challenge and{" "}
            <span className="text-white font-semibold">
              prove your financial mastery
            </span>{" "}
            against the brightest minds.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { icon: "📈", label: "Live Trading" },
              { icon: "🏆", label: "Exciting Prizes" },
              { icon: "🧠", label: "Strategy" },
              { icon: "⚡", label: "Fast-paced" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="group px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.06] border border-white/15 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#8C5BFF]/50 transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-2"
              >
                <span>{chip.icon}</span>
                <span className="text-white/90">{chip.label}</span>
              </span>
            ))}
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-14">
            {[
              { value: "3", label: "Per Team", icon: "👥" },
              { value: "2", label: "Rounds", icon: "🏁" },
              { value: "1", label: "Champion", icon: "🏆" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl py-4 px-3 bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-2xl">{s.icon}</div>
                <div className="text-3xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mt-1">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/50 mt-1 font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs uppercase tracking-widest">
              Scroll for details
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-white animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Bottom fade into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-primary)]"></div>
      </section>

      {/* ================= TICKER TAPE ================= */}
      <div className="relative overflow-hidden border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-3">
        <div className="flex gap-8 whitespace-nowrap animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => {
            const isUp = item.includes("+");
            return (
              <span
                key={i}
                className="flex items-center gap-2 text-sm font-semibold tracking-wide"
              >
                <span className="text-[var(--text-muted)]">{item}</span>
                <span
                  className={isUp ? "text-emerald-500" : "text-rose-500"}
                >
                  {isUp ? "▲" : "▼"}
                </span>
                <span className="text-[var(--border-color)]">•</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-bold">
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mt-2">
            How It{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Form Your Squad",
              desc: "Assemble a team of 3 from the same batch. Mixed batches are not allowed.",
              icon: "👥",
              accent: "140,91,255",
            },
            {
              step: "02",
              title: "Register Your Team",
              desc: "Fill out the form below before the deadline. Team name must be unique.",
              icon: "📝",
              accent: "236,72,153",
            },
            {
              step: "03",
              title: "Trade & Conquer",
              desc: "Compete across multiple rounds, strategize smart, and rise to the top.",
              icon: "🚀",
              accent: "6,182,212",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="relative p-6 rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "var(--card-bg)",
                border: `1px solid var(--border-color)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, rgba(${s.accent},0.18), transparent 70%)`,
                }}
              ></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, rgba(${s.accent},1), rgba(${s.accent},0.6))`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className="text-5xl font-black opacity-15"
                    style={{ color: `rgba(${s.accent},1)` }}
                  >
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RULES ================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "var(--card-bg)",
            border: `1px solid var(--border-color)`,
          }}
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#8C5BFF]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-bold mb-2">
                Before You Begin
              </span>
              <h2 className="text-4xl font-black text-[var(--text-primary)] flex items-center gap-3">
                <span>📜</span>
                <span className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] bg-clip-text text-transparent">
                  Rules & Regulations
                </span>
              </h2>
              <div className="w-24 h-1 mt-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#EC4899]"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Participants are required to form a team of 3 members from their respective batch i.e., 1st and 2nd year students cannot be in the same team.",
                "All 3 members must be present for each round, otherwise the team will be disqualified.",
                "No team can change their team members after registration.",
                "If a single participant has registered from 2 or more teams, then every team he/she is part of will get disqualified.",
                "The decisions made by the Finance Committee will be final and binding.",
              ].map((rule, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    i === 4 ? "md:col-span-2" : ""
                  }`}
                  style={{
                    background: "var(--bg-secondary)",
                    border: `1px solid var(--border-color)`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg group-hover:scale-110 transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary), #EC4899)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="pt-1.5 text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM / STATES ================= */}
      <main className="max-w-6xl mx-auto px-6 pb-16">
        {registrationNotStarted ? (
          // 🟨 Registration Not Yet Started
          <div
            className="relative text-center py-24 px-8 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: `1px solid var(--border-color)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 40%), radial-gradient(circle at 80% 70%, #EC4899 0%, transparent 40%)",
              }}
            ></div>

            <div className="relative z-10">
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-[var(--primary)] rounded-full blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[#EC4899] rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white text-5xl">🕓</span>
                </div>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] bg-clip-text text-transparent">
                  Opening Soon
                </span>
              </h2>

              <p className="text-[var(--text-muted)] text-lg mb-2">
                StockiFy 2026 registration opens on
              </p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                16 January 2026 · 12:00 NOON
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  { label: "Days", value: "—" },
                  { label: "Hours", value: "—" },
                  { label: "Minutes", value: "—" },
                  { label: "Seconds", value: "—" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="w-24 py-4 rounded-2xl text-center backdrop-blur-md"
                    style={{
                      background: "var(--bg-secondary)",
                      border: `1px solid var(--border-color)`,
                    }}
                  >
                    <div className="text-2xl font-black text-[var(--primary)]">
                      {c.value}
                    </div>
                    <div className="text-xs text-[var(--text-dim)] mt-1 uppercase tracking-wider">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[var(--text-dim)] mt-8 italic">
                Mark your calendars ⏳
              </p>
            </div>
          </div>
        ) : registrationClosed ? (
          // 🟥 Registration Closed
          <div
            className="relative text-center py-24 px-8 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: `1px solid var(--border-color)`,
            }}
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--primary)]/30 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#EC4899]/30 rounded-full blur-3xl opacity-60 animate-pulse-slow delay-2000"></div>

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[#EC4899] rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                <span className="text-white text-4xl">⏰</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent drop-shadow-lg leading-[1.15] pb-[0.15em]">
                Registration Closed
              </h2>

              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-2 max-w-2xl">
                Thank you for your enthusiasm and overwhelming response to{" "}
                <a
                  href="https://fc-fbs.vercel.app/stockify/register"
                  target="_blank"
                  className="text-[var(--primary)] font-semibold hover:underline"
                >
                  StockiFy 2026
                </a>
                !
              </p>

              <p className="text-[var(--text-muted)] text-lg mb-6">
                Registrations officially closed on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  18th January 2026, 07:30 PM
                </span>
                .
              </p>

              <p className="text-[var(--text-dim)] mt-3 italic max-w-2xl">
                Stay tuned for the{" "}
                <span className="text-[var(--primary)] font-medium">
                  Prelims Round
                </span>{" "}
                updates on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  19th January 2026 🏁
                </span>{" "}
                and the{" "}
                <span className="text-[var(--primary)] font-medium">
                  Final Round
                </span>{" "}
                updates on{" "}
                <span className="font-semibold text-[var(--primary)]">
                  21st January 2026 🎯
                </span>
                .
              </p>

              <div className="mt-6 w-32 h-1 bg-gradient-to-r from-[var(--primary)] to-[#EC4899] rounded-full animate-pulse"></div>

              <p className="mt-5 text-sm text-[var(--text-dim)]">
                Follow us on{" "}
                <a
                  href="https://www.instagram.com/finance_with_fbs?igsh=N2w5bGtkYXJmZDBr"
                  target="_blank"
                  className="text-[var(--primary)] hover:underline"
                >
                  Instagram
                </a>{" "}
                for live event updates 📢
              </p>
            </div>
          </div>
        ) : (
          // ================= ACTIVE FORM =================
          <form
            onSubmit={handleSubmit}
            className="relative rounded-3xl shadow-2xl animate-fadeInUp overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"></div>

            {/* Decorative background */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative p-8 md:p-12">
              {/* Form header */}
              <div className="text-center mb-12">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--primary)",
                    border: `1px solid var(--border-color)`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Registration Open
                </div>

                <h2 className="text-4xl md:text-5xl font-black mb-3">
                  <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-muted)] bg-clip-text text-transparent">
                    Register Your Team
                  </span>
                </h2>
                <p className="text-[var(--text-muted)] max-w-lg mx-auto">
                  Fill in the details below to lock in your spot for StockiFy
                  2026
                </p>
              </div>

              {/* ---- Team Name ---- */}
              <div className="mb-12">
                <label className="flex items-center gap-2 mb-3 font-bold text-[var(--text-primary)] text-lg">
                  <span className="text-2xl">🏆</span>
                  Team Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="teamName"
                    value={form.teamName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl p-5 pl-14 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all text-lg font-semibold"
                    style={{
                      border: `2px solid var(--border-color)`,
                      background: "var(--input-bg)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="e.g., The Wolf of Dalal Street"
                  />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                    ⚡
                  </span>
                </div>
                <p className="text-xs text-[var(--text-dim)] mt-2 ml-1">
                  Choose a unique name — duplicates will be rejected.
                </p>
              </div>

              {/* ---- Section divider ---- */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)] font-bold">
                  Team Members
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"></div>
              </div>

              {/* ---- Members Grid ---- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => {
                  const accent = memberAccents[num - 1];
                  return (
                    <div
                      key={num}
                      className="relative rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                      style={{
                        background: "var(--bg-secondary)",
                        border: `1px solid var(--border-color)`,
                      }}
                    >
                      {/* Gradient top bar */}
                      <div
                        className="absolute top-0 left-6 right-6 h-1 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                        }}
                      ></div>

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${accent.ring}, transparent 70%)`,
                        }}
                      ></div>

                      <div className="relative pt-3">
                        {/* Member header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg text-white"
                            style={{
                              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                            }}
                          >
                            {accent.emoji}
                          </div>
                          <div>
                            <h3
                              className="font-black text-lg leading-tight"
                              style={{ color: accent.from }}
                            >
                              Member {num}
                            </h3>
                            <span className="text-[10px] text-[var(--text-dim)] font-bold uppercase tracking-[0.15em]">
                              {accent.tag}
                            </span>
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-3">
                          <Field
                            label="Full Name"
                            name={`member${num}Name`}
                            value={
                              form[
                                `member${num}Name` as keyof typeof form
                              ] as string
                            }
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                          />
                          <Field
                            label="FOSTIIMA Email"
                            name={`member${num}Email`}
                            type="email"
                            value={
                              form[
                                `member${num}Email` as keyof typeof form
                              ] as string
                            }
                            onChange={handleChange}
                            placeholder="name@fostiima.org"
                            required
                          />
                          <Field
                            label="Section"
                            name={`member${num}Section`}
                            value={
                              form[
                                `member${num}Section` as keyof typeof form
                              ] as string
                            }
                            onChange={handleChange}
                            placeholder="e.g., A"
                          />
                          <Field
                            label="Phone"
                            name={`member${num}Phone`}
                            value={
                              form[
                                `member${num}Phone` as keyof typeof form
                              ] as string
                            }
                            onChange={handleChange}
                            placeholder="10-digit number"
                          />

                          {/* Year */}
                          <div>
                            <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                              Year
                            </label>
                            <select
                              name={`member${num}Year`}
                              value={
                                form[
                                  `member${num}Year` as keyof typeof form
                                ] as string
                              }
                              onChange={handleChange}
                              className="w-full rounded-xl p-3 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all text-sm"
                              style={{
                                border: `1px solid var(--border-color)`,
                                background: "var(--input-bg)",
                                color: "var(--text-primary)",
                              }}
                            >
                              <option value="">Select Year</option>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                            </select>
                          </div>

                          <Field
                            label="PGP"
                            name={`member${num}PGP`}
                            value={
                              form[
                                `member${num}PGP` as keyof typeof form
                              ] as string
                            }
                            onChange={handleChange}
                            placeholder="e.g., PGP 27"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---- Submit ---- */}
              <div className="flex flex-col items-center mt-14 gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative group text-white px-14 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #8C5BFF, #EC4899, #06B6D4)",
                    backgroundSize: "200% 200%",
                    boxShadow: "0 10px 40px -10px rgba(140,91,255,0.6)",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  {loading ? (
                    <>
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                      Registering...
                    </>
                  ) : (
                    <>
                      Register Team
                      <span className="text-xl">🚀</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-[var(--text-dim)] text-center max-w-md">
                  By registering, you agree to abide by the rules and
                  regulations of StockiFy 2026.
                </p>
              </div>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}

/* ---------- Reusable Field Component ---------- */
function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
        {label}
        {required && <span className="text-[#EC4899] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl p-3 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none transition-all text-sm"
        style={{
          border: `1px solid var(--border-color)`,
          background: "var(--input-bg)",
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}