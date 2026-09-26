"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────── alumni team data ─────────────── */

const teamMembers = [
  {
    name: "Kriti Jain",
    role: "",
    image: "/images/teammembers/Kriti.jpg",
    linkedin:
      "https://www.linkedin.com/in/kriti-jain-2b99ba2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/kritijain1710?igsh=azgwMnV6cmw3MmEx",
    email: "27kriti.jain@fostiima.org",
  },
  {
    name: "Rajat Jain",
    role: "",
    image: "/images/teammembers/Rajat.jpg",
    linkedin: "https://www.linkedin.com/in/rajat-jain-027978204/",
    instagram: "https://www.instagram.com/rajat_jain_____ ",
    email: "27rajat.jain@fostiima.org",
  },
  {
    name: "Shagun Malhotra",
    role: "",
    image: "/images/teammembers/Shagun.jpg",
    linkedin:
      "https://www.linkedin.com/in/shagun-malhotra-83a4b4268?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/_ishagun09?igsh=ZGQwYTA5MW1xb2s3",
    email: "27shagun.malhotra@fostiima.org",
  },
  {
    name: "Ashish Kumar Mishra",
    role: "",
    image: "/images/teammembers/Ashish.jpg",
    linkedin:
      "https://www.linkedin.com/in/ashish-kumar-mishra-616321206?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/ash.ish__19?igsh=bGFlOTJueW4yY25m",
    email: "27ashish.mishra@fostiima.org",
  },
  {
    name: "Diksha Sharma",
    role: "",
    image: "/images/teammembers/Diksha.jpg",
    linkedin:
      "https://www.linkedin.com/in/diksha-sharma-90a427259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/dikkshhaa?igsh=MTJxZHpleWZoamtmOQ==",
    email: "27diksha.sharma@fostiima.org",
  },
  {
    name: "Sparsh Jain",
    role: "",
    image: "/images/teammembers/Sparsh.jpg",
    linkedin:
      "https://www.linkedin.com/in/sparsh-jain-776b27211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/sparsh_j?igsh=MXVxdWdhM2pkOXN4dQ%3D%3D&utm_source=qr",
    email: "27sparsh.jain@fostiima.org",
  },
  {
    name: "Aman",
    role: "",
    image: "/images/teammembers/Aman.jpg",
    linkedin:
      "https://www.linkedin.com/in/aman-96aaa8373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/amangarg1908?igsh=b29ubjNob3JxcGt6",
    email: "27aman1@fostiima.org",
  },
  {
    name: "Prateek",
    role: "",
    image: "/images/teammembers/Prateek.jpg",
    linkedin:
      "https://www.linkedin.com/in/prateek-3a2268373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/iprateek9?utm_source=qr&igsh=eDhvOW50eWFhcDl1",
    email: "27prateek@fostiima.org",
  },
  {
    name: "Anurag Sharma",
    role: "",
    image: "/images/teammembers/Anurag.jpg",
    linkedin:
      "https://www.linkedin.com/in/anurag-sharma-9b13702ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/anurag.sharma02?igsh=MXAxeHpzemoydnc3eQ%3D%3D&utm_source=qr",
    email: "27anurag.sharma@fostiima.org",
  },
  {
    name: "Aryan Sehrawat",
    role: "",
    image: "/images/teammembers/Aryan.jpg",
    linkedin:
      "https://www.linkedin.com/in/aryan-sehrawat-b359a3241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/__aryan.sehrawat__?igsh=MWtmeWU0ZTQ4d3No",
    email: "27aryan.sehrawat@fostiima.org",
  },
  {
    name: "Payal Naik",
    role: "",
    image: "/images/teammembers/Payal.jpg",
    linkedin: "https://www.linkedin.com/in/payal-naik-ba59b9363",
    instagram: "https://www.instagram.com/impayalnaik?igsh=N2RsZXYzeGx4YjBj",
    email: "27payal.naik@fostiima.org",
  },
  {
    name: "Shubh Gupta",
    role: "",
    image: "/images/teammembers/Shubh.jpg",
    linkedin:
      "https://www.linkedin.com/in/shubhgupta410?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/_shubh.gupta_?igsh=MWc3ejg1N2sza3l4eA%3D%3D&utm_source=qr",
    email: "27shubh.gupta@fostiima.org",
  },
  {
    name: "Surbhi Arora",
    role: "",
    image: "/images/teammembers/Surbhi.jpg",
    linkedin:
      "https://www.linkedin.com/in/surbhi-arora-69612520b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/surbhiiaroraa?igsh=cGlvaDJ5ZGRqejhz",
    email: "27surbhi.arora@fostiima.org",
  },
  {
    name: "Tanishk Ghadiya",
    role: "",
    image: "/images/teammembers/Tanishk.jpg",
    linkedin:
      "https://www.linkedin.com/in/tanishk-ghadiya-67a746256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    instagram:
      "https://www.instagram.com/ghadiyasaheb_in?igsh=bmt1NzF4cWp4MXk0",
    email: "27tanishk.ghadiya@fostiima.org",
  },
];

interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
}

const CustomArrow: React.FC<ArrowProps> = ({ onClick, direction }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    className="absolute top-1/2 -translate-y-1/2 z-30 cursor-pointer focus:outline-none group hidden md:flex"
    style={{
      left: direction === "prev" ? "-8px" : "auto",
      right: direction === "next" ? "-8px" : "auto",
    }}
    aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
  >
    {/* Ambient outer glow */}
    <div className="absolute inset-0 rounded-full bg-[var(--primary)]/45 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Soft drop shadow beneath */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        boxShadow:
          "0 12px 32px -6px rgba(147, 3, 197, 0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
    />

    {/* Button body */}
    <div className="relative w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--primary)]/30 flex items-center justify-center overflow-hidden">
      {/* Top inner highlight */}
      <span className="absolute inset-x-3 top-0 h-px bg-white/50" />

      {/* Subtle inner gradient for depth */}
      <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Shine sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[var(--primary)]/25 to-transparent" />

      {/* Icon */}
      <span className="relative flex items-center justify-center">
        {direction === "prev" ? (
          <ChevronLeft
            size={22}
            className="text-[var(--primary)] transition-transform group-hover:-translate-x-0.5"
            strokeWidth={2.6}
          />
        ) : (
          <ChevronRight
            size={22}
            className="text-[var(--primary)] transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.6}
          />
        )}
      </span>
    </div>
  </motion.button>
);

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBeforeChange = useCallback((_: number, next: number) => {
    const total = teamMembers.length;
    const normalized = ((next % total) + total) % total;
    setCurrentSlide(next);
    setActiveMember(normalized);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2600,
    pauseOnHover: true,
    centerMode: !isMobile,
    centerPadding: "0px",
    arrows: false,
    swipeToSlide: false,
    focusOnSelect: false,
    waitForAnimate: false,
    useCSS: true,
    useTransform: true,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
          dots: false,
          arrows: false,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
          dots: false,
          arrows: false,
          infinite: true,
        },
      },
    ],
  };

  const isCenterSlide = (index: number) => {
    if (isMobile) return true;
    const total = teamMembers.length;
    const centerIndex = ((currentSlide % total) + total) % total;
    return index === centerIndex;
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();
  const goToSlide = (idx: number) => sliderRef.current?.slickGoTo(idx);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 overflow-hidden"
    >
      {/* ─────── Ambient background layers ─────── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)]" />

      {/* Radial stage highlight (creates the "spotlight") */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_50%_55%,var(--primary)/14_0%,transparent_70%)]" />

      {/* Top hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/25 to-transparent" />

      {/* Decorative side orbs */}
      <motion.div
        className="absolute top-32 left-[6%] w-32 h-32 rounded-full bg-[var(--primary)]/12 blur-3xl pointer-events-none"
        animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[6%] w-40 h-40 rounded-full bg-[var(--primary-light)]/12 blur-3xl pointer-events-none"
        animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
        transition={{ duration: 0.7, ease }}
        className="text-center mb-14 px-4"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-[var(--primary)]/25 bg-[var(--primary)]/10 shadow-[0_4px_20px_-8px_rgba(147,3,197,0.4)]">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
          </span>
          <GraduationCap
            size={14}
            className="text-[var(--primary)]"
            strokeWidth={2.4}
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Alumni Network
          </span>
        </div>

        <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-extrabold tracking-tight text-[var(--text-primary)]">
          Meet our beautiful{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] bg-clip-text text-transparent">
              Alumni Team
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="absolute left-0 right-0 -bottom-2 h-1 md:h-1.5 origin-left rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-transparent"
            />
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          The alumni members of the Finance Committee who laid the foundation
          and shaped its journey — a legacy of financial literacy, leadership,
          and impact.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto team-carousel relative px-2">
        {!isMobile && (
          <>
            <CustomArrow direction="prev" onClick={goToPrev} />
            <CustomArrow direction="next" onClick={goToNext} />
          </>
        )}

        <div className={isMobile ? "px-2" : "px-6"}>
          <Slider ref={sliderRef} {...settings}>
            {teamMembers.map((member, idx) => {
              const isCenter = isCenterSlide(idx);
              return (
                <div key={idx} className="px-2 py-6">
                  <div
                    className={`relative rounded-3xl mx-auto transition-all duration-500 ease-out ${
                      !isMobile && isCenter ? "scale-105 z-20" : ""
                    } ${!isMobile && !isCenter ? "scale-90 opacity-70 z-10" : ""}`}
                    style={{
                      maxWidth: isMobile ? "280px" : "310px",
                      width: "90%",
                    }}
                  >
                    {/* ─────── Layered shadow system for center slide ─────── */}
                    {!isMobile && isCenter && (
                      <>
                        {/* Wide ambient glow far behind */}
                        <div className="absolute -inset-6 rounded-[40px] bg-[var(--primary)]/20 blur-3xl opacity-80 pointer-events-none" />

                        {/* Mid-layer purple glow */}
                        <div className="absolute -inset-2 rounded-[32px] bg-[var(--primary)]/30 blur-xl opacity-70 pointer-events-none" />
                      </>
                    )}

                    {/* ─────── Side card soft shadow ─────── */}
                    {!isMobile && !isCenter && (
                      <div className="absolute -inset-1 rounded-[28px] bg-[var(--primary)]/10 blur-lg opacity-60 pointer-events-none" />
                    )}

                    {/* ─────── Gradient border (center) ─────── */}
                    {!isMobile && isCenter && (
                      <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary-light)]/80 to-[var(--primary)]/40 z-0" />
                    )}

                    {/* Card body */}
                    <div
                      className={`relative rounded-3xl overflow-hidden z-10 transition-all duration-500 ${
                        !isMobile && isCenter
                          ? "bg-[var(--card-bg)]"
                          : "bg-[var(--card-bg)]/85 backdrop-blur-md border border-[var(--border-color)]"
                      }`}
                      style={{
                        minHeight: isMobile ? "360px" : "400px",
                        boxShadow:
                          !isMobile && isCenter
                            ? "0 25px 60px -20px rgba(147, 3, 197, 0.55), 0 12px 32px -12px rgba(147, 3, 197, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                            : "0 12px 32px -16px rgba(99, 86, 215, 0.28), 0 4px 12px -6px rgba(99, 86, 215, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {/* Ambient corner blob */}
                      <div
                        className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${
                          !isMobile && isCenter
                            ? "bg-[var(--primary)]/35 opacity-100"
                            : "bg-[var(--primary)]/15 opacity-50"
                        }`}
                      />

                      {/* Bottom-left ambient blob (center only) */}
                      {!isMobile && isCenter && (
                        <div className="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[var(--primary-light)]/25 blur-3xl" />
                      )}

                      {/* Top hairline — brighter on center */}
                      <div
                        className={`absolute inset-x-8 top-0 h-px transition-colors duration-500 ${
                          !isMobile && isCenter
                            ? "bg-gradient-to-r from-transparent via-[var(--primary)]/70 to-transparent"
                            : "bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"
                        }`}
                      />

                      {/* Inner side gradient for card depth (subtle) */}
                      <div
                        className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                          !isMobile && isCenter
                            ? "bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(147,3,197,0.05)_100%)]"
                            : "bg-[radial-gradient(120%_80%_at_50%_0%,transparent_50%,rgba(99,86,215,0.03)_100%)]"
                        }`}
                      />

                      {/* Image */}
                      <div className="relative flex items-center justify-center overflow-hidden pt-5">
                        <div className="relative w-[200px] sm:w-[240px] h-[200px] sm:h-[240px]">
                          {/* Glow behind center image */}
                          {!isMobile && isCenter && (
                            <div className="absolute inset-0 rounded-full bg-[var(--primary)]/15 blur-3xl scale-110" />
                          )}
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className={`object-contain relative transition-all duration-700 ${
                              !isMobile && isCenter ? "scale-105" : "scale-95"
                            }`}
                            style={{
                              filter:
                                !isMobile && !isCenter
                                  ? "grayscale(100%)"
                                  : !isMobile && isCenter
                                    ? "drop-shadow(0 12px 24px rgba(147, 3, 197, 0.25))"
                                    : "none",
                            }}
                          />
                        </div>

                        {/* Sparkle accent (center slide only) */}
                        {!isMobile && isCenter && (
                          <motion.div
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              delay: 0.2,
                            }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center"
                            style={{
                              boxShadow:
                                "0 8px 20px -4px rgba(147, 3, 197, 0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
                            }}
                          >
                            <Sparkles
                              size={14}
                              className="text-white"
                              strokeWidth={2.6}
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="relative px-4 py-5 text-center">
                        <h3
                          className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                            !isMobile && isCenter
                              ? "text-[var(--primary)]"
                              : "text-[var(--text-primary)]"
                          }`}
                          style={{
                            textShadow:
                              !isMobile && isCenter
                                ? "0 2px 12px rgba(147, 3, 197, 0.25)"
                                : "none",
                          }}
                        >
                          {member.name}
                        </h3>
                        {member.role && (
                          <p className="text-[var(--text-dim)] text-xs sm:text-sm mt-0.5">
                            {member.role}
                          </p>
                        )}

                        {/* Divider — gradient accent */}
                        <div
                          className={`mx-auto mt-3 mb-4 h-px w-10 transition-colors duration-500 ${
                            !isMobile && isCenter
                              ? "bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
                              : "bg-[var(--border-color)]"
                          }`}
                        />

                        {/* Social row */}
                        <div className="flex justify-center items-center gap-3">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="group/social relative"
                          >
                            <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
                            <div
                              className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 group-hover/social:border-[#0A66C2]/40 ${
                                !isMobile && isCenter
                                  ? "bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(10,102,194,0.3)]"
                                  : "bg-[var(--bg-secondary)]/60 border border-[var(--border-color)]"
                              }`}
                            >
                              <FaLinkedin
                                size={isMobile ? 16 : 18}
                                className="text-[#0A66C2]"
                              />
                            </div>
                          </a>
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="group/social relative"
                          >
                            <div className="absolute inset-0 rounded-xl bg-[#E1306C]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
                            <div
                              className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 group-hover/social:border-[#E1306C]/40 ${
                                !isMobile && isCenter
                                  ? "bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(225,48,108,0.3)]"
                                  : "bg-[var(--bg-secondary)]/60 border border-[var(--border-color)]"
                              }`}
                            >
                              <FaInstagram
                                size={isMobile ? 16 : 18}
                                className="text-[#E1306C]"
                              />
                            </div>
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="group/social relative"
                          >
                            <div className="absolute inset-0 rounded-xl bg-[#EA4335]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
                            <div
                              className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 group-hover/social:border-[#EA4335]/40 ${
                                !isMobile && isCenter
                                  ? "bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(234,67,53,0.3)]"
                                  : "bg-[var(--bg-secondary)]/60 border border-[var(--border-color)]"
                              }`}
                            >
                              <FaEnvelope
                                size={isMobile ? 15 : 17}
                                className="text-[#EA4335]"
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      {/* Custom dot navigation + counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
      >
        {/* Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center max-w-md">
          {teamMembers.map((_, idx) => {
            const isActive = activeMember === idx;
            return (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative focus:outline-none group"
              >
                <motion.span
                  layout
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
                      : "w-2 bg-[var(--text-dim)]/50 group-hover:bg-[var(--text-dim)]/80 group-hover:w-3"
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 0 12px rgba(147, 3, 197, 0.8), 0 2px 6px rgba(147, 3, 197, 0.4)"
                      : "none",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Counter pill */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--card-bg)]/70 backdrop-blur-md border border-[var(--border-color)] text-[11px] font-bold tabular-nums"
          style={{
            boxShadow:
              "0 4px 16px -6px rgba(99, 86, 215, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <span className="text-[var(--primary)]">
            {String(activeMember + 1).padStart(2, "0")}
          </span>
          <span className="text-[var(--text-dim)]">/</span>
          <span className="text-[var(--text-muted)]">
            {String(teamMembers.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* Mobile swipe hint */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8 px-4"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card-bg)]/70 backdrop-blur-md border border-[var(--border-color)]"
              style={{
                boxShadow: "0 4px 16px -6px rgba(99, 86, 215, 0.25)",
              }}
            >
              <Sparkles
                size={14}
                className="text-[var(--primary)] animate-pulse"
                strokeWidth={2.4}
              />
              <span className="text-[var(--text-muted)] text-xs font-medium">
                Swipe to meet everyone
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .team-carousel :global(.slick-prev),
        .team-carousel :global(.slick-next),
        .team-carousel :global(.slick-arrow) {
          display: none !important;
        }

        .team-carousel :global(.slick-slide) {
          transition: all 0.5s ease-in-out;
        }

        .team-carousel :global(.slick-center) {
          opacity: 1;
        }

        .team-carousel :global(.slick-slide:not(.slick-center)) {
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
