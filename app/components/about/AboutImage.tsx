"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutImage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="w-full flex justify-center items-center py-8 sm:py-12 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 40,
          scale: isInView ? 1 : 0.97,
        }}
        transition={{ duration: 0.9, ease }}
        className="relative w-[92%] max-w-[1300px]"
      >
        {/* Outer gradient border */}
        <div className="relative rounded-[28px] p-[1.5px] overflow-hidden bg-gradient-to-br from-[var(--primary)]/50 via-[var(--primary-light)]/30 to-transparent">
          {/* Image container */}
          <div className="relative rounded-[26px] overflow-hidden bg-[var(--card-bg)]">
            <Image
              src="/images/event_StockiFy26/grandFinale/58.jpg"
              alt="Finance Committee team group photo"
              width={1300}
              height={650}
              className="w-full h-auto block object-cover"
              priority
            />

            {/* Subtle gradient overlay at the bottom for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            {/* Top-left badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -20,
              }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="absolute top-4 sm:top-6 left-4 sm:left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <Users size={13} className="text-white/90" strokeWidth={2.4} />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/90">
                Our Team
              </span>
            </motion.div>

            {/* Bottom-right caption pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{ duration: 0.6, ease, delay: 0.65 }}
              className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md bg-black/45 border border-white/20"
            >
              <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center shadow-lg">
                <Sparkles size={13} className="text-white" strokeWidth={2.6} />
              </div>
              <div className="leading-tight text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  Together We Grow
                </p>
                <p className="text-[11px] font-semibold text-white">
                  FOSTIIMA Chapter
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ambient glow under the card */}
        <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] bg-[var(--primary)]/15 blur-3xl opacity-60" />
      </motion.div>
    </section>
  );
}