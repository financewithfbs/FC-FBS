"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  easeOut,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero3 from "./Hero3";
import {
  CheckCircle,
  Video,
  Headphones,
  Mail,
  User,
  Building2,
  Link as LinkIcon,
  Send,
  ShieldCheck,
} from "lucide-react";

const Hero2: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    pgp: "",
    section: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, name, pgp } = formData;

    if (email && name && pgp) {
      setSuccessMsg(
        "🎉 You're on the list! Finance Committee is coming your way soon. Hang tight!"
      );
      setFormData({ email: "", name: "", pgp: "", section: "" });
    } else {
      setSuccessMsg("❌ Please fill all required fields.");
    }
  };

  const features = [
    {
      label: "Transparent budget planning and tracking",
      icon: <CheckCircle size={18} />,
    },
    {
      label: "Support for campus events and student initiatives",
      icon: <Video size={18} />,
    },
    {
      label: "Responsible allocation of funds for student welfare",
      icon: <Headphones size={18} />,
    },
  ];

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "you@fostiima.org",
      label: "Email",
      icon: <Mail size={18} />,
    },
    {
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full Name",
      icon: <User size={18} />,
    },
    {
      name: "pgp",
      type: "text",
      placeholder: "e.g., PGP 27",
      label: "PGP",
      icon: <Building2 size={18} />,
    },
    {
      name: "section",
      type: "text",
      placeholder: "e.g., A (Optional)",
      label: "Section",
      icon: <LinkIcon size={18} />,
    },
  ];

  return (
    <>
      <div
        ref={sectionRef}
        className="relative flex h-auto flex-col md:flex-row items-center justify-between 
          gap-12 md:gap-16 
          p-6 md:p-12 lg:p-16 
          bg-[var(--bg-primary)] 
          min-h-[500px] 
          overflow-hidden"
      >
        {/* ================================================
            AMBIENT BACKGROUND
        ================================================ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 
            bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
        />

        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-32 -left-32 w-[440px] h-[440px] rounded-full 
            bg-[var(--primary)]/25 blur-[140px] animate-float-slow"
        />
        <motion.div
          aria-hidden
          style={{ y: glowY }}
          className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full 
            bg-[#EC4899]/20 blur-[130px] animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-[600px] h-[400px] rounded-full 
            bg-[#06B6D4]/10 blur-[140px]"
        />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.20] dark:opacity-[0.15]"
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

        {/* Floating accent dots */}
        <motion.div
          aria-hidden
          className="absolute top-20 left-1/3 w-16 h-16 rounded-full 
            bg-[var(--primary)] opacity-15 blur-[1px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-20 right-1/4 w-12 h-12 rounded-full 
            bg-[#EC4899] opacity-20 blur-[1px]"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================
            LEFT: CONTENT
        ================================================ */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 max-w-lg text-left"
          initial={{ opacity: 0, x: -60, rotateY: -15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : -60,
            rotateY: isInView ? 0 : -15,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
          }}
          style={{ y: y1 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full 
              bg-[var(--primary)]/10 border border-[var(--primary)]/20 
              text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
            </span>
            Join the Movement
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] 
              leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 40,
            }}
            transition={{
              duration: 0.8,
              ease: easeOut,
            }}
          >
            Ready to Support{" "}
            <span
              className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
                bg-clip-text text-transparent"
            >
              Student Initiatives?
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={
              isInView
                ? { opacity: 1, scaleX: 1 }
                : { opacity: 0, scaleX: 0 }
            }
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mt-6 h-1 w-20 rounded-full 
              bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]"
          />

          <motion.p
            className="mt-6 text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              ease: easeOut,
              delay: 0.2,
            }}
          >
            Supporting campus events and initiatives with clear, accountable
            financial planning for every student.
          </motion.p>

          <motion.ul
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{
              duration: 0.8,
              ease: easeOut,
              delay: 0.4,
            }}
          >
            {features.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl 
                  bg-[var(--card-bg)]/60 backdrop-blur-sm 
                  border border-[var(--border-color)]/60 
                  hover:border-[var(--primary)]/40 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  x: isInView ? 0 : -20,
                }}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: 0.6 + index * 0.1,
                }}
                whileHover={{ x: 4 }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg 
                    bg-gradient-to-br from-[var(--primary)]/20 to-[#EC4899]/15 
                    border border-[var(--primary)]/20 
                    flex items-center justify-center 
                    text-[var(--primary)]"
                >
                  {item.icon}
                </div>
                <span className="text-sm md:text-base text-[var(--text-secondary)] font-medium">
                  {item.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ================================================
            RIGHT: FORM CARD
        ================================================ */}
        <motion.div
          className="relative z-10 mt-4 md:mt-0 w-full md:w-1/2 max-w-md mx-auto md:mx-0"
          initial={{ opacity: 0, x: 60, rotateY: 15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : 60,
            rotateY: isInView ? 0 : 15,
          }}
          transition={{
            duration: 0.8,
            ease: easeOut,
            delay: 0.3,
          }}
          style={{ y: y2, scale }}
        >
          <div
            className="relative rounded-3xl p-[1.5px] 
              bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
              shadow-2xl"
          >
            <div
              className="relative rounded-[22px] bg-[var(--card-bg)] 
                overflow-hidden p-6 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 
                  bg-gradient-to-br from-[var(--primary)]/[0.05] via-transparent to-[#06B6D4]/[0.05]"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 
                  w-48 h-32 bg-[var(--primary)]/25 blur-3xl"
              />

              <form className="relative space-y-4" onSubmit={handleSubmit}>
                <motion.div
                  className="mb-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: easeOut,
                    delay: 0.4,
                  }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full 
                      bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                      text-[var(--primary)] text-[10px] font-bold tracking-[0.2em] uppercase"
                  >
                    <ShieldCheck size={12} />
                    Early Access
                  </div>

                  <h3
                    className="text-2xl font-black text-[var(--text-primary)] leading-tight"
                  >
                    Join the{" "}
                    <span
                      className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] 
                        bg-clip-text text-transparent"
                    >
                      waitlist
                    </span>
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-2">
                    Join students already shaping campus finance.
                  </p>
                </motion.div>

                {/* ============ INPUTS (FIXED ICON VISIBILITY) ============ */}
                <div className="space-y-3">
                  {inputs.map((input, index) => (
                    <motion.div
                      key={input.name}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : 20,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: easeOut,
                        delay: 0.5 + index * 0.08,
                      }}
                    >
                      {/* Icon chip — high contrast, always visible */}
                      <div
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 
                          w-8 h-8 rounded-lg flex items-center justify-center 
                          bg-[var(--primary)]/15 
                          border border-[var(--primary)]/25 
                          text-[var(--primary)] 
                          group-focus-within:bg-[var(--primary)]/25 
                          group-focus-within:border-[var(--primary)]/50 
                          group-focus-within:scale-105 
                          pointer-events-none 
                          transition-all duration-300"
                      >
                        {input.icon}
                      </div>

                      <input
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={formData[input.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="relative w-full py-3.5 pl-14 pr-4 rounded-xl 
                          bg-[var(--input-bg)] 
                          text-[var(--text-primary)] text-sm 
                          placeholder:text-[var(--text-dim)] 
                          border border-[var(--border-color)] 
                          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] 
                          focus:border-transparent 
                          transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3 pt-2">
                  <motion.button
                    type="submit"
                    className="group relative w-full py-3.5 rounded-xl font-bold text-sm text-white 
                      overflow-hidden 
                      bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                      bg-[length:200%_200%] 
                      shadow-lg hover:shadow-[var(--neon-glow)] 
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] 
                      transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: 0.9,
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full 
                        group-hover:translate-x-full transition-transform duration-1000 ease-out 
                        bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    <span className="absolute inset-x-0 top-0 h-px bg-white/40" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                      Reserve My Spot
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.button>

                  <motion.p
                    className="text-center text-[11px] text-[var(--text-muted)] 
                      flex items-center justify-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: 1.0,
                    }}
                  >
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
                    No commitment · Unsubscribe anytime
                  </motion.p>
                </div>

                {successMsg && (
                  <motion.div
                    className={`text-xs mt-3 px-4 py-3 rounded-xl font-medium 
                      border ${
                        successMsg.startsWith("🎉")
                          ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                          : "text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10"
                      }`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {successMsg}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      <Hero3 />
    </>
  );
};

export default Hero2;