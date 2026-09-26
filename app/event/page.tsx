"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  MouseEvent,
  WheelEvent,
} from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type EventCard = {
  id: number;
  title: string;
  category: string;
  images: string[];
  cardGifs: string[];
  description: string;
  date?: string;
  participants?: string;
};

type SelectedEvent = EventCard & {
  current: number;
};

type DragPosition = {
  x: number;
  y: number;
};

export default function EventPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null,
  );
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<DragPosition>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<DragPosition | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  const [cardImageIndex, setCardImageIndex] = useState<Record<number, number>>(
    {},
  );

  const textSegments = [
    { text: "Recently", color: "text-[var(--text-secondary)]" },
    { text: "at", color: "text-[var(--text-secondary)]" },
    { text: "Finance Committee", color: "text-[var(--primary)]" },
  ];

  const sliderImages: string[] = [
    "/images/event_StockiFy26/grandFinale/58.jpg",
    "/images/event_StockiFy26/grandFinale/57.jpg",
    "/images/event_StockiFy26/grandFinale/65.jpg",
    "/images/event_StockiFy26/grandFinale/61.jpg",
    "/images/event_StockiFy26/grandFinale/56.jpg",
    "/images/event_StockiFy26/grandFinale/62.jpg",
    "/images/event_FinQuest25/0.jpg",
    "/images/event_FinQuest25/1.jpg",
    "/images/event_FinQuest25/2.jpg",
    "/images/event_FinQuest25/3.jpg",
    "/images/event_FinQuest25/final/9.jpg",
    "/images/event_FinQuest25/semifinal/6.jpg",
  ];

  const eventCards = useMemo<EventCard[]>(
    () => [
      {
        id: 1,
        title: "FinQuest 2025 SemiFinal",
        category: "FinQuest",
        cardGifs: ["/images/event_FinQuest25/semifinal/0.gif"],
        images: [
          "/images/event_FinQuest25/semifinal/0.gif",
          "/images/event_FinQuest25/semifinal/1.jpg",
          "/images/event_FinQuest25/semifinal/2.jpg",
          "/images/event_FinQuest25/semifinal/3.jpg",
          "/images/event_FinQuest25/semifinal/4.jpg",
          "/images/event_FinQuest25/semifinal/5.jpg",
          "/images/event_FinQuest25/semifinal/6.jpg",
        ],
        description:
          "FinQuest is a high-intensity finance quiz that challenges participants on markets, economics, accounting, and real-world financial scenarios.",
        date: "04 Nov 2025",
        participants: "210 participants",
      },
      {
        id: 2,
        title: "FinQuest 2025 Final",
        category: "FinQuest",
        cardGifs: ["/images/event_FinQuest25/final/0.gif"],
        images: [
          "/images/event_FinQuest25/final/0.gif",
          "/images/event_FinQuest25/final/1.jpg",
          "/images/event_FinQuest25/final/2.jpg",
          "/images/event_FinQuest25/final/3.jpg",
          "/images/event_FinQuest25/final/4.jpg",
          "/images/event_FinQuest25/final/5.jpg",
          "/images/event_FinQuest25/final/6.jpg",
          "/images/event_FinQuest25/final/7.jpg",
          "/images/event_FinQuest25/final/8.jpg",
          "/images/event_FinQuest25/final/9.jpg",
          "/images/event_FinQuest25/final/10.jpg",
          "/images/event_FinQuest25/final/11.jpg",
          "/images/event_FinQuest25/final/12.jpg",
          "/images/event_FinQuest25/final/13.jpg",
          "/images/event_FinQuest25/final/14.jpg",
          "/images/event_FinQuest25/final/15.jpg",
          "/images/event_FinQuest25/final/16.jpg",
          "/images/event_FinQuest25/final/17.jpg",
          "/images/event_FinQuest25/final/18.jpg",
          "/images/event_FinQuest25/final/19.jpg",
          "/images/event_FinQuest25/final/20.jpg",
          "/images/event_FinQuest25/final/21.jpg",
        ],
        description:
          "FinQuest is a high-intensity finance quiz that challenges participants on markets, economics, accounting, and real-world financial scenarios.",
        date: "06 Nov 2025",
        participants: "18 participants",
      },
      {
        id: 3,
        title: "StockiFy 2026 Prelims",
        category: "StockiFy",
        cardGifs: ["/images/event_StockiFy26/prelims/01.gif"],
        images: [
          "/images/event_StockiFy26/prelims/01.gif",
          "/images/event_StockiFy26/prelims/1.jpg",
          "/images/event_StockiFy26/prelims/2.jpg",
          "/images/event_StockiFy26/prelims/3.jpg",
          "/images/event_StockiFy26/prelims/02.gif",
          "/images/event_StockiFy26/prelims/4.jpg",
          "/images/event_StockiFy26/prelims/5.jpg",
          "/images/event_StockiFy26/prelims/6.jpg",
          "/images/event_StockiFy26/prelims/03.gif",
          "/images/event_StockiFy26/prelims/7.jpg",
          "/images/event_StockiFy26/prelims/8.jpg",
          "/images/event_StockiFy26/prelims/9.jpg",
          "/images/event_StockiFy26/prelims/04.gif",
          "/images/event_StockiFy26/prelims/10.jpg",
          "/images/event_StockiFy26/prelims/11.jpg",
          "/images/event_StockiFy26/prelims/12.jpg",
        ],
        description:
          "StockiFy is a high-intensity stock market simulation event that challenges participants to apply financial knowledge, analytical thinking, and strategic decision-making in real-time market scenarios involving buying, selling, and holding financial instruments.",
        date: "19 Jan 2026",
        participants: "123 participants",
      },
      {
        id: 4,
        title: "StockiFy 2026 Grand Finale",
        category: "StockiFy",
        cardGifs: ["/images/event_StockiFy26/grandFinale/04.gif"],
        images: [
          "/images/event_StockiFy26/grandFinale/01.gif",
          "/images/event_StockiFy26/grandFinale/1.jpg",
          "/images/event_StockiFy26/grandFinale/2.jpg",
          "/images/event_StockiFy26/grandFinale/3.jpg",
          "/images/event_StockiFy26/grandFinale/4.jpg",
          "/images/event_StockiFy26/grandFinale/5.jpg",
          "/images/event_StockiFy26/grandFinale/6.jpg",
          "/images/event_StockiFy26/grandFinale/7.jpg",
          "/images/event_StockiFy26/grandFinale/8.jpg",
          "/images/event_StockiFy26/grandFinale/9.jpg",
          "/images/event_StockiFy26/grandFinale/10.jpg",
          "/images/event_StockiFy26/grandFinale/11.jpg",
          "/images/event_StockiFy26/grandFinale/12.jpg",
          "/images/event_StockiFy26/grandFinale/13.jpg",
          "/images/event_StockiFy26/grandFinale/14.jpg",
          "/images/event_StockiFy26/grandFinale/15.jpg",
          "/images/event_StockiFy26/grandFinale/16.jpg",
          "/images/event_StockiFy26/grandFinale/17.jpg",
          "/images/event_StockiFy26/grandFinale/02.gif",
          "/images/event_StockiFy26/grandFinale/18.jpg",
          "/images/event_StockiFy26/grandFinale/19.jpg",
          "/images/event_StockiFy26/grandFinale/20.jpg",
          "/images/event_StockiFy26/grandFinale/21.jpg",
          "/images/event_StockiFy26/grandFinale/22.jpg",
          "/images/event_StockiFy26/grandFinale/23.jpg",
          "/images/event_StockiFy26/grandFinale/24.jpg",
          "/images/event_StockiFy26/grandFinale/25.jpg",
          "/images/event_StockiFy26/grandFinale/26.jpg",
          "/images/event_StockiFy26/grandFinale/27.jpg",
          "/images/event_StockiFy26/grandFinale/28.jpg",
          "/images/event_StockiFy26/grandFinale/29.jpg",
          "/images/event_StockiFy26/grandFinale/30.jpg",
          "/images/event_StockiFy26/grandFinale/31.jpg",
          "/images/event_StockiFy26/grandFinale/32.jpg",
          "/images/event_StockiFy26/grandFinale/33.jpg",
          "/images/event_StockiFy26/grandFinale/34.jpg",
          "/images/event_StockiFy26/grandFinale/03.gif",
          "/images/event_StockiFy26/grandFinale/35.jpg",
          "/images/event_StockiFy26/grandFinale/36.jpg",
          "/images/event_StockiFy26/grandFinale/37.jpg",
          "/images/event_StockiFy26/grandFinale/38.jpg",
          "/images/event_StockiFy26/grandFinale/39.jpg",
          "/images/event_StockiFy26/grandFinale/40.jpg",
          "/images/event_StockiFy26/grandFinale/41.jpg",
          "/images/event_StockiFy26/grandFinale/42.jpg",
          "/images/event_StockiFy26/grandFinale/43.jpg",
          "/images/event_StockiFy26/grandFinale/44.jpg",
          "/images/event_StockiFy26/grandFinale/45.jpg",
          "/images/event_StockiFy26/grandFinale/46.jpg",
          "/images/event_StockiFy26/grandFinale/47.jpg",
          "/images/event_StockiFy26/grandFinale/48.jpg",
          "/images/event_StockiFy26/grandFinale/49.jpg",
          "/images/event_StockiFy26/grandFinale/50.jpg",
          "/images/event_StockiFy26/grandFinale/51.jpg",
          "/images/event_StockiFy26/grandFinale/04.gif",
          "/images/event_StockiFy26/grandFinale/53.jpg",
          "/images/event_StockiFy26/grandFinale/54.jpg",
          "/images/event_StockiFy26/grandFinale/55.jpg",
          "/images/event_StockiFy26/grandFinale/56.jpg",
          "/images/event_StockiFy26/grandFinale/57.jpg",
          "/images/event_StockiFy26/grandFinale/58.jpg",
          "/images/event_StockiFy26/grandFinale/59.jpg",
          "/images/event_StockiFy26/grandFinale/60.jpg",
          "/images/event_StockiFy26/grandFinale/61.jpg",
          "/images/event_StockiFy26/grandFinale/62.jpg",
          "/images/event_StockiFy26/grandFinale/63.jpg",
          "/images/event_StockiFy26/grandFinale/64.jpg",
          "/images/event_StockiFy26/grandFinale/65.jpg",
          "/images/event_StockiFy26/grandFinale/66.jpg",
        ],
        description:
          "StockiFy is a high-intensity stock market simulation event that challenges participants to apply financial knowledge, analytical thinking, and strategic decision-making in real-time market scenarios involving buying, selling, and holding financial instruments.",
        date: "21 Jan 2026",
        participants: "45 participants",
      },
      {
        id: 5,
        title: "VITT-MANTHAN 2026",
        category: "VITT-MANTHAN",
        cardGifs: ["/images/event_VITTManthan26/VM1.gif"],
        images: [
          "/images/event_VITTManthan26/VM1.gif",
          "/images/event_VITTManthan26/01.jpeg",
          "/images/event_VITTManthan26/02.jpeg",
          "/images/event_VITTManthan26/03.jpeg",
          "/images/event_VITTManthan26/04.jpeg",
          "/images/event_VITTManthan26/05.jpeg",
          "/images/event_VITTManthan26/06.jpeg",
          "/images/event_VITTManthan26/VM3.gif",
          "/images/event_VITTManthan26/07.JPG",
          "/images/event_VITTManthan26/08.JPG",
          "/images/event_VITTManthan26/09.JPG",
          "/images/event_VITTManthan26/10.JPG",
          "/images/event_VITTManthan26/11.JPG",
          "/images/event_VITTManthan26/12.JPG",
          "/images/event_VITTManthan26/13.JPG",
          "/images/event_VITTManthan26/14.JPG",
          "/images/event_VITTManthan26/15.JPG",
          "/images/event_VITTManthan26/16.JPG",
          "/images/event_VITTManthan26/17.JPG",
          "/images/event_VITTManthan26/18.JPG",
          "/images/event_VITTManthan26/19.JPG",
          "/images/event_VITTManthan26/20.JPG",
          "/images/event_VITTManthan26/21.JPG",
          "/images/event_VITTManthan26/22.JPG",
          "/images/event_VITTManthan26/23.JPG",
          "/images/event_VITTManthan26/24.JPG",
        ],
        description: "Manthan of minds, Mastery of money.",
        date: "09 March 2026",
        participants: "36 participants",
      },
    ],
    [],
  );

  // ------------ AUTO SLIDER ------------
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, sliderImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardImageIndex((prev) => {
        const updated = { ...prev };

        eventCards.forEach((card) => {
          const current = prev[card.id] ?? 0;
          updated[card.id] = (current + 1) % card.cardGifs.length;
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [eventCards]);

  function nextSlide() {
    setActiveIndex((prev) => (prev + 1) % sliderImages.length);
  }

  function prevSlide() {
    setActiveIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  }

  // ------------ MODAL ZOOM HANDLERS ------------
  function modalNextImage() {
    setSelectedEvent((prev) =>
      prev
        ? { ...prev, current: (prev.current + 1) % prev.images.length }
        : prev,
    );
    resetZoom();
  }

  function modalPrevImage() {
    setSelectedEvent((prev) =>
      prev
        ? {
            ...prev,
            current:
              prev.current === 0 ? prev.images.length - 1 : prev.current - 1,
          }
        : prev,
    );
    resetZoom();
  }

  function resetZoom() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    const newZoom = zoom + e.deltaY * -0.0015;
    setZoom(Math.min(Math.max(newZoom, 1), 4));
  }

  function startDrag(e: MouseEvent<HTMLDivElement>) {
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function endDrag() {
    setDragStart(null);
  }

  function duringDrag(e: MouseEvent<HTMLDivElement>) {
    if (!dragStart) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }

  // Recent = most recent by date (VITT-MANTHAN has the latest date)
  const recentEvent = eventCards[eventCards.length - 1];
  const otherEvents = eventCards.slice(0, -1);

  const categories = [
    "All",
    ...Array.from(new Set(eventCards.map((e) => e.category))),
  ];

  // ✅ FIX: filter from the FULL eventCards list, not otherEvents,
  // so the featured event still appears under its own category tab.
  const filteredEvents =
    filter === "All"
      ? otherEvents
      : eventCards.filter((e) => e.category === filter);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)]">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative w-full pt-32 pb-24 min-h-[720px] lg:min-h-[800px] overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/event_StockiFy26/event-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-top scale-105"
          priority
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3d]/85 via-[#2d1b69]/75 to-[#0f0524]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,rgba(140,91,255,0.35),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_85%_60%,rgba(236,72,153,0.25),transparent_70%)]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        {/* Floating accent orbs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--primary)]/30 blur-[130px] animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-[#EC4899]/20 blur-[140px] animate-float" />

        {/* Content */}
        <div
          className="relative max-w-7xl mx-auto px-6 lg:px-10
            grid grid-cols-1 md:grid-cols-[1fr_1.15fr]
            items-center gap-12 lg:gap-16"
        >
          {/* LEFT TEXT PANEL */}
          <div className="relative z-10">
            {/* Solid glass card with gradient border */}
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="relative rounded-[22px] bg-[#0f0524]/85 backdrop-blur-2xl px-8 py-10 lg:px-10 lg:py-12 overflow-hidden">
                {/* Inner top highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Main heading */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                    Events
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="mt-4 text-lg md:text-xl text-white/70 leading-relaxed max-w-sm">
                  Our beautiful memories,{" "}
                  <span className="text-white/95 font-semibold">
                    captured forever
                  </span>
                  .
                </p>

                {/* Divider */}
                <div className="my-8 h-px bg-gradient-to-r from-[var(--primary)]/60 via-[#EC4899]/40 to-transparent" />

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-4xl lg:text-5xl font-black bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                      3+
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-bold mt-1.5">
                      Events
                    </span>
                  </div>

                  <div className="w-px h-12 bg-white/15" />
                </div>
              </div>
            </div>

            {/* Floating caption below panel */}
            <p className="mt-5 ml-2 text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">
              Finance Committee · FOSTIIMA Chapter
            </p>
          </div>

          {/* RIGHT SLIDER */}
          <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-br from-[var(--primary)]/30 via-[#EC4899]/20 to-[#06B6D4]/30 blur-2xl opacity-70 pointer-events-none" />

            <div
              className="relative h-[340px] md:h-[460px] lg:h-[520px]
                overflow-hidden rounded-[28px]
                shadow-[0_40px_120px_rgba(0,0,0,0.65)]
                border border-white/15
                bg-black/40"
            >
              {sliderImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-0 scale-105 z-10"
                  }`}
                >
                  <Image
                    src={src}
                    alt="event"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}

              {/* Top gradient + reel pill */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-30 pointer-events-none" />
              <div className="absolute top-5 left-5 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(sliderImages.length).padStart(2, "0")}
                </span>
              </div>

              {/* Controls */}
              <button
                onClick={prevSlide}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40
                  w-11 h-11 flex items-center justify-center
                  rounded-full bg-white/15 hover:bg-white/30
                  backdrop-blur-xl border border-white/25 text-white
                  transition-all hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40
                  w-11 h-11 flex items-center justify-center
                  rounded-full bg-white/15 hover:bg-white/30
                  backdrop-blur-xl border border-white/25 text-white
                  transition-all hover:scale-110"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Bottom gradient + dots */}
              <div className="absolute bottom-0 inset-x-0 pt-16 pb-5 bg-gradient-to-t from-black/80 to-transparent z-30">
                <div className="flex justify-center gap-2 px-6">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "bg-white w-8"
                          : "bg-white/40 hover:bg-white/70 w-4"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EVENT CARDS SECTION ================= */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-14 mt-24">
        {/* TOP ROW: heading + filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-bold">
              The Archive
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mt-2">
              {textSegments.map((segment, index) => (
                <span key={index} className={segment.color}>
                  {segment.text}&nbsp;
                </span>
              ))}
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  filter === cat
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md"
                    : "bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MOST RECENT EVENT — cinematic split layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Decorative corner accent */}
          <div className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[var(--primary)]/40 rounded-tl-3xl pointer-events-none" />
          <div className="hidden lg:block absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[var(--primary)]/40 rounded-br-3xl pointer-events-none" />

          {/* LEFT TEXT */}
          <div className="relative pr-2 lg:pr-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Latest Event
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4">
              {recentEvent.title}
            </h3>
            <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-6">
              {recentEvent.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {recentEvent.date && (
                <span className="px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm font-semibold text-[var(--text-muted)]">
                  📅 {recentEvent.date}
                </span>
              )}
              {recentEvent.participants && (
                <span className="px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm font-semibold text-[var(--text-muted)]">
                  👥 {recentEvent.participants}
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedEvent({ ...recentEvent, current: 0 })}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--primary)] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              View Gallery
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div
            onClick={() => setSelectedEvent({ ...recentEvent, current: 0 })}
            className="group relative rounded-3xl overflow-hidden cursor-pointer
              w-full h-[340px] md:h-[420px] lg:h-[460px]
              shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              border border-[var(--border-color)]"
          >
            <Image
              src={recentEvent.cardGifs[cardImageIndex[recentEvent.id] ?? 0]}
              alt={recentEvent.title}
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Category chip */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-bold tracking-[0.15em] uppercase text-white">
              {recentEvent.category}
            </div>

            <div
              className="absolute bottom-4 left-4 right-4 z-10
                bg-black/35 backdrop-blur-md rounded-xl p-4 border border-white/10"
            >
              <p className="text-white font-bold text-lg">
                {recentEvent.title}
              </p>
              <p className="text-white/80 text-sm mt-1">
                {recentEvent.date} · {recentEvent.participants}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW – OTHER EVENTS */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent({ ...ev, current: 0 })}
              className="relative group rounded-2xl overflow-hidden cursor-pointer
                shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                border border-[var(--border-color)] hover:border-[var(--primary)]/40"
            >
              <div className="relative h-[300px] w-full">
                <Image
                  src={ev.cardGifs[cardImageIndex[ev.id] ?? 0]}
                  alt={ev.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Hover accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[var(--primary)]/40 via-transparent to-transparent" />

                {/* Category chip */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                  {ev.category}
                </div>

                <div
                  className="absolute bottom-4 left-4 right-4 z-10
                    bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10
                    group-hover:bg-black/55 group-hover:border-white/25 transition-all"
                >
                  <h3 className="text-xl font-bold text-white">{ev.title}</h3>
                  <p className="text-white/85 text-sm mt-1">{ev.date}</p>
                  <p className="text-white/85 text-sm">{ev.participants}</p>
                </div>
              </div>

              <span className="absolute top-4 right-4 text-5xl font-extrabold text-white/15 group-hover:text-white/30 transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-dashed border-[var(--border-color)] mt-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">
              No events found
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Try selecting a different category
            </p>
          </div>
        )}
      </section>

      {/* ------------ MODAL ------------ */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[999] pt-24 px-4 overflow-y-auto pb-10"
          onClick={() => {
            setSelectedEvent(null);
            resetZoom();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-2xl p-5 w-[95%] md:w-[70%] lg:w-[55%] shadow-2xl animate-[fadeScale_0.35s_ease] min-h-[150px] overflow-hidden"
            style={{
              background: "var(--card-bg)",
              border: `1px solid var(--border-color)`,
            }}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]" />

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white text-xl transition-all"
              onClick={() => {
                setSelectedEvent(null);
                resetZoom();
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Image Wrapper */}
            <div
              className="relative w-full h-[350px] md:h-[420px] rounded-xl overflow-hidden mb-4 cursor-grab active:cursor-grabbing"
              style={{ background: "var(--bg-secondary)" }}
              onWheel={handleWheel}
              onMouseDown={startDrag}
              onMouseUp={endDrag}
              onMouseMove={duringDrag}
              onMouseLeave={endDrag}
            >
              <Image
                src={selectedEvent.images[selectedEvent.current]}
                alt={selectedEvent.title}
                fill
                className="object-contain select-none"
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${
                    offset.y / zoom
                  }px)`,
                  transition: dragStart ? "none" : "transform 0.2s ease",
                }}
                draggable={false}
              />

              {/* Counter */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-bold tracking-wider">
                {String(selectedEvent.current + 1).padStart(2, "0")} /{" "}
                {String(selectedEvent.images.length).padStart(2, "0")}
              </div>

              {/* Zoom pill */}
              {zoom > 1 && (
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[var(--primary)]/90 backdrop-blur-md text-white text-xs font-bold">
                  {zoom.toFixed(1)}×
                </div>
              )}

              {/* Arrows */}
              <button
                onClick={modalPrevImage}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2
                  text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md transition hover:scale-105"
                style={{
                  background: "var(--card-bg)",
                  border: `1px solid var(--border-color)`,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={modalNextImage}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-700 hover:text-black shadow-md rounded-full p-3 backdrop-blur-md transition hover:scale-105"
                style={{
                  background: "var(--card-bg)",
                  border: `1px solid var(--border-color)`,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Hint */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold tracking-wider">
                Scroll to zoom · Drag to pan
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/25">
                {selectedEvent.category}
              </span>
              {selectedEvent.date && (
                <span className="text-xs text-[var(--text-muted)] font-semibold">
                  📅 {selectedEvent.date}
                </span>
              )}
              {selectedEvent.participants && (
                <span className="text-xs text-[var(--text-muted)] font-semibold">
                  👥 {selectedEvent.participants}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-1">
              {selectedEvent.title}
            </h2>

            <p className="mt-2 text-[var(--text-muted)] text-base leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          <style>{`
            @keyframes fadeScale {
              0% { opacity: 0; transform: scale(0.85); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}