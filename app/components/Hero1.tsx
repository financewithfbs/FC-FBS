// components/Hero1.tsx
"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Hero2 from "./Hero2";

interface TiltCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  linkText?: string;
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  title,
  description,
  image,
  linkText = "Learn more",
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const maxTilt = 18;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[var(--primary)]/40 via-transparent to-[#06B6D4]/30 
        hover:from-[var(--primary)]/70 hover:to-[#06B6D4]/50 transition-colors duration-500"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 60,
        scale: isInView ? 1 : 0.9,
        rotateX: isInView ? 0 : -15,
      }}
      transition={{
        duration: 0.8,
        ease: easeOut,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="relative rounded-[14px] bg-[var(--card-bg)] p-7 text-center w-full overflow-hidden group h-full"
        style={{ rotateX, rotateY }}
      >
        {/* Ambient hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, var(--primary) 0%, transparent 70%)",
            opacity: 0.08,
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--primary)]/30 rounded-tr-lg group-hover:border-[var(--primary)]/60 transition-colors" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--primary)]/30 rounded-bl-lg group-hover:border-[var(--primary)]/60 transition-colors" />

        {/* Icon tile */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {/* Soft glow behind icon */}
          <div
            className="absolute inset-0 rounded-2xl bg-[var(--primary)]/15 blur-xl group-hover:bg-[var(--primary)]/25 transition-colors"
            aria-hidden
          />

          <motion.div
            className="relative w-full h-full rounded-2xl 
              bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--card-bg)] 
              border border-[var(--border-color)] 
              flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-9 h-9">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="36px"
                priority={index < 3}
              />
            </div>
          </motion.div>

          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-[var(--primary)]/30 pointer-events-none"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
            {title}
          </h3>

          {/* Gradient underline on hover */}
          <div
            className="mx-auto mt-2 h-0.5 w-0 group-hover:w-12 rounded-full 
              bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
              transition-all duration-500"
          />

          <p className="mt-3 text-[var(--text-muted)] text-sm leading-relaxed">
            {description}
          </p>

          <motion.a
            href="#"
            className="mt-4 inline-flex items-center gap-1.5 text-[var(--primary)] text-sm font-bold 
              group/link"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">
              {linkText}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--primary)] group-hover/link:w-full transition-all duration-300" />
            </span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero1: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);

  const cards = [
    {
      title: "Finance Workshops",
      description:
        "We organize interactive finance workshops to help students understand budgeting, investing, and financial planning.",
      icon: "📊",
      image: "/icons/budget.png",
    },
    {
      title: "Seminars & Talks",
      description:
        "Expert-led seminars and guest lectures provide insights into financial markets, personal finance, and career opportunities.",
      icon: "📜",
      image: "/icons/record.png",
    },
    {
      title: "Campus Events",
      description:
        "We plan and fund student-led events focused on finance, competitions, and experiential learning activities.",
      icon: "🎉",
      image: "/icons/event.png",
    },
    {
      title: "Finance Challenges",
      description:
        "Interactive competitions and quizzes on finance concepts to encourage student participation and learning.",
      icon: "⚖️",
      image: "/icons/resources.png",
    },
    {
      title: "Networking Sessions",
      description:
        "Events that connect students with finance professionals, alumni, and mentors for guidance and growth.",
      icon: "🤝",
      image: "/icons/welfare.png",
    },
    {
      title: "Skill Development Workshops",
      description:
        "Hands-on workshops designed to enhance financial literacy and practical skills for career and personal growth.",
      icon: "🚀",
      image: "/icons/growth.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* ============ AMBIENT BACKGROUND ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 
          bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 45%, transparent 100%)",
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-32 w-[480px] h-[480px] rounded-full 
          bg-[var(--primary)]/20 blur-[140px] animate-float-slow"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 -right-32 w-[440px] h-[440px] rounded-full 
          bg-[#EC4899]/15 blur-[130px] animate-float"
      />

      {/* Floating accent dots */}
      <motion.div
        aria-hidden
        className="absolute bottom-20 right-1/3 w-20 h-20 rounded-full opacity-20 bg-[var(--primary)]"
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -30, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-40 left-10 w-14 h-14 rounded-full opacity-15 bg-[#06B6D4]"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, 20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16">
        {/* ============ SECTION HEADER ============ */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 40,
          }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{ y }}
        >
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full 
              bg-[var(--primary)]/10 border border-[var(--primary)]/20 
              text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
            </span>
            What We Do
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-secondary)] leading-[1.15] tracking-tight">
            Finance Committee – FOSTIIMA Chapter{" "}
            <span
              className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
                bg-clip-text text-transparent"
            >
              Organizing Student Finance Events
            </span>
          </h1>

          {/* Gradient underline accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              isInView
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mx-auto mt-6 h-1 w-24 rounded-full 
              bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"
          />

          <p className="mt-6 text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From workshops to seminars, we organize events that enhance
            financial knowledge, practical skills, and student engagement
            across FOSTIIMA.
          </p>
        </motion.div>

        {/* ============ CARDS GRID — ROW 1 ============ */}
        <motion.div
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(0, 3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              image={card.image}
              index={index}
            />
          ))}
        </motion.div>

        {/* ============ CARDS GRID — ROW 2 ============ */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ scale }}
        >
          {cards.slice(3).map((card, index) => (
            <TiltCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              image={card.image}
              index={index + 3}
            />
          ))}
        </motion.div>

        {/* ============ DISCOVER OUR EVENTS ============ */}
        <motion.div
          className="relative mt-20 rounded-2xl p-[1.5px] 
            bg-gradient-to-br from-[var(--primary)]/50 via-[#EC4899]/30 to-[#06B6D4]/50 shadow-2xl"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            scale: isInView ? 1 : 0.95,
          }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.6 }}
        >
          <div
            className="relative rounded-[14px] bg-[var(--card-bg)] overflow-hidden 
              flex flex-col md:flex-row items-center justify-between gap-8 
              p-8 md:p-10"
          >
            {/* Inner sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 
                bg-gradient-to-br from-[var(--primary)]/[0.04] via-transparent to-[#06B6D4]/[0.04]"
            />

            {/* LEFT: Content */}
            <div className="relative max-w-md z-10">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full 
                  bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                  text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                Explore
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
                Discover Our{" "}
                <span
                  className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
                    bg-clip-text text-transparent"
                >
                  Events
                </span>
              </h2>

              <p className="mt-4 text-[var(--text-muted)] text-base leading-relaxed">
                Explore how the Finance Committee brings finance-focused
                events, workshops, and competitions to life for FOSTIIMA
                students.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Interactive finance workshops",
                  "Seminars and guest lectures",
                  "Competitions, quizzes, and networking sessions",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 text-[var(--text-muted)] text-sm"
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full 
                        bg-[var(--primary)]/15 border border-[var(--primary)]/30 
                        flex items-center justify-center"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="var(--primary)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="mt-7 cursor-pointer text-white px-7 py-3 rounded-full font-bold text-sm 
                  transition-all duration-300 relative overflow-hidden group/btn 
                  bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] 
                  shadow-lg hover:shadow-[var(--neon-glow)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-full 
                    transition-transform duration-700 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover/btn:translate-x-1 transition-transform"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.button>
            </div>

            {/* RIGHT: Video */}
            <div className="relative w-full md:w-1/2 z-10">
              {/* Glow ring behind video */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[var(--primary)]/20 blur-3xl rounded-full"
              />

              <div
                className="relative h-[280px] md:h-[320px] rounded-2xl 
                  bg-[var(--card-bg-secondary)] 
                  border border-[var(--border-color)] 
                  overflow-hidden shadow-2xl"
              >
                <video
                  src="/icons/actionvideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Corner accents */}
                <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
                <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
                <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
                <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-12" />
      <Hero2 />
    </section>
  );
};

export default Hero1;