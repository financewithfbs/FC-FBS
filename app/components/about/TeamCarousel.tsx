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
  Flame,
  Crown,
  Rocket,
  History,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────── current team (2026-2028) ─────────────── */
const currentMembers = [
  {
    name: "Abhigyan Mittal",
    role: "",
    image: "/images/teammembers_2026-2028/AbhigyanMittal.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Rishvi Gupta",
    role: "",
    image: "/images/teammembers_2026-2028/RishviGupta.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Pradumna Verma",
    role: "",
    image: "/images/teammembers_2026-2028/PradumnaVerma.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Ayush Malik",
    role: "",
    image: "/images/teammembers_2026-2028/AyushMalik.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Satyam Shukla",
    role: "",
    image: "/images/teammembers_2026-2028/SatyamShukla.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Siddhi Bansal",
    role: "",
    image: "/images/teammembers_2026-2028/SiddhiBansal.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Abhinav Suman",
    role: "",
    image: "/images/teammembers_2026-2028/AbhinavSuman.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Piyush Taparia",
    role: "",
    image: "/images/teammembers_2026-2028/PiyushTaparia.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Alok Kumar Thakur",
    role: "",
    image: "/images/teammembers_2026-2028/AlokKumarThakur.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Prince Chaturvedi",
    role: "",
    image: "/images/teammembers_2026-2028/PrinceChaturvedi.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Tanvi Jain",
    role: "",
    image: "/images/teammembers_2026-2028/TanviJain.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Shruti Sharma",
    role: "",
    image: "/images/teammembers_2026-2028/ShrutiSharma.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Mradul Gupta",
    role: "",
    image: "/images/teammembers_2026-2028/MradulGupta.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Ashish Tiwari",
    role: "",
    image: "/images/teammembers_2026-2028/AshishTiwari.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Yashika Kukreja",
    role: "",
    image: "/images/teammembers_2026-2028/Yashika Kukreja.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Khushi Singh",
    role: "",
    image: "/images/teammembers_2026-2028/Khushi_Singh.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
  {
    name: "Bharat Gupta",
    role: "",
    image: "/images/teammembers_2026-2028/BharatGupta.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
   {
    name: "Anubhav Dash",
    role: "",
    image: "/images/teammembers_2026-2028/AnubhavDash.jpeg",
    linkedin: "#",
    instagram: "#",
    email: "#",
  },
];

/* ─────────────── alumni (2025-2027) ─────────────── */
const alumniMembers = [
  {
    name: "Kriti Jain",
    role: "",
    image: "/images/teammembers_2025-2027/Kriti.jpg",
    linkedin:
      "https://www.linkedin.com/in/kriti-jain-2b99ba2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/kritijain1710?igsh=azgwMnV6cmw3MmEx",
    email: "27kriti.jain@fostiima.org",
  },
  {
    name: "Rajat Jain",
    role: "",
    image: "/images/teammembers_2025-2027/Rajat.jpg",
    linkedin: "https://www.linkedin.com/in/rajat-jain-027978204/",
    instagram: "https://www.instagram.com/rajat_jain_____ ",
    email: "27rajat.jain@fostiima.org",
  },
  {
    name: "Shagun Malhotra",
    role: "",
    image: "/images/teammembers_2025-2027/Shagun.jpg",
    linkedin:
      "https://www.linkedin.com/in/shagun-malhotra-83a4b4268?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/_ishagun09?igsh=ZGQwYTA5MW1xb2s3",
    email: "27shagun.malhotra@fostiima.org",
  },
  {
    name: "Ashish Kumar Mishra",
    role: "",
    image: "/images/teammembers_2025-2027/Ashish.jpg",
    linkedin:
      "https://www.linkedin.com/in/ashish-kumar-mishra-616321206?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/ash.ish__19?igsh=bGFlOTJueW4yY25m",
    email: "27ashish.mishra@fostiima.org",
  },
  {
    name: "Diksha Sharma",
    role: "",
    image: "/images/teammembers_2025-2027/Diksha.jpg",
    linkedin:
      "https://www.linkedin.com/in/diksha-sharma-90a427259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/dikkshhaa?igsh=MTJxZHpleWZoamtmOQ==",
    email: "27diksha.sharma@fostiima.org",
  },
  {
    name: "Sparsh Jain",
    role: "",
    image: "/images/teammembers_2025-2027/Sparsh.jpg",
    linkedin:
      "https://www.linkedin.com/in/sparsh-jain-776b27211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/sparsh_j?igsh=MXVxdWdhM2pkOXN4dQ%3D%3D&utm_source=qr",
    email: "27sparsh.jain@fostiima.org",
  },
  {
    name: "Aman",
    role: "",
    image: "/images/teammembers_2025-2027/Aman.jpg",
    linkedin:
      "https://www.linkedin.com/in/aman-96aaa8373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/amangarg1908?igsh=b29ubjNob3JxcGt6",
    email: "27aman1@fostiima.org",
  },
  {
    name: "Prateek",
    role: "",
    image: "/images/teammembers_2025-2027/Prateek.jpg",
    linkedin:
      "https://www.linkedin.com/in/prateek-3a2268373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/iprateek9?utm_source=qr&igsh=eDhvOW50eWFhcDl1",
    email: "27prateek@fostiima.org",
  },
  {
    name: "Anurag Sharma",
    role: "",
    image: "/images/teammembers_2025-2027/Anurag.jpg",
    linkedin:
      "https://www.linkedin.com/in/anurag-sharma-9b13702ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    instagram:
      "https://www.instagram.com/anurag.sharma02?igsh=MXAxeHpzemoydnc3eQ%3D%3D&utm_source=qr",
    email: "27anurag.sharma@fostiima.org",
  },
  {
    name: "Aryan Sehrawat",
    role: "",
    image: "/images/teammembers_2025-2027/Aryan.jpg",
    linkedin:
      "https://www.linkedin.com/in/aryan-sehrawat-b359a3241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/__aryan.sehrawat__?igsh=MWtmeWU0ZTQ4d3No",
    email: "27aryan.sehrawat@fostiima.org",
  },
  {
    name: "Payal Naik",
    role: "",
    image: "/images/teammembers_2025-2027/Payal.jpg",
    linkedin: "https://www.linkedin.com/in/payal-naik-ba59b9363",
    instagram: "https://www.instagram.com/impayalnaik?igsh=N2RsZXYzeGx4YjBj",
    email: "27payal.naik@fostiima.org",
  },
  {
    name: "Shubh Gupta",
    role: "",
    image: "/images/teammembers_2025-2027/Shubh.jpg",
    linkedin:
      "https://www.linkedin.com/in/shubhgupta410?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram:
      "https://www.instagram.com/_shubh.gupta_?igsh=MWc3ejg1N2sza3l4eA%3D%3D&utm_source=qr",
    email: "27shubh.gupta@fostiima.org",
  },
  {
    name: "Surbhi Arora",
    role: "",
    image: "/images/teammembers_2025-2027/Surbhi.jpg",
    linkedin:
      "https://www.linkedin.com/in/surbhi-arora-69612520b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/surbhiiaroraa?igsh=cGlvaDJ5ZGRqejhz",
    email: "27surbhi.arora@fostiima.org",
  },
  {
    name: "Tanishk Ghadiya",
    role: "",
    image: "/images/teammembers_2025-2027/Tanishk.jpg",
    linkedin:
      "https://www.linkedin.com/in/tanishk-ghadiya-67a746256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
    instagram:
      "https://www.instagram.com/ghadiyasaheb_in?igsh=bmt1NzF4cWp4MXk0",
    email: "27tanishk.ghadiya@fostiima.org",
  },
];

type Member = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  instagram: string;
  email: string;
};

interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
  variant: "current" | "alumni";
}

/* ══════════════════════════════════════════════════
   CUSTOM ARROW — two distinct visual styles
   ══════════════════════════════════════════════════ */
const CustomArrow: React.FC<ArrowProps> = ({ onClick, direction, variant }) => {
  const isCurrent = variant === "current";

  return (
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
      {/* Outer glow — different color per section */}
      <div
        className={`absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${
          isCurrent ? "bg-[#EC4899]/45" : "bg-[#06B6D4]/45"
        }`}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: isCurrent
            ? "0 12px 32px -6px rgba(236, 72, 153, 0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
            : "0 12px 32px -6px rgba(6, 182, 212, 0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      />

      <div
        className={`relative w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden ${
          isCurrent
            ? "bg-gradient-to-br from-[#EC4899]/15 to-[#8C5BFF]/15 border-[#EC4899]/40"
            : "bg-gradient-to-br from-[#06B6D4]/15 to-[#14B8A6]/15 border-[#06B6D4]/40"
        }`}
      >
        <span className="absolute inset-x-3 top-0 h-px bg-white/50" />
        <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <span
          className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent to-transparent ${
            isCurrent ? "via-[#EC4899]/30" : "via-[#06B6D4]/30"
          }`}
        />

        <span className="relative flex items-center justify-center">
          {direction === "prev" ? (
            <ChevronLeft
              size={22}
              className={`transition-transform group-hover:-translate-x-0.5 ${
                isCurrent ? "text-[#EC4899]" : "text-[#06B6D4]"
              }`}
              strokeWidth={2.6}
            />
          ) : (
            <ChevronRight
              size={22}
              className={`transition-transform group-hover:translate-x-0.5 ${
                isCurrent ? "text-[#EC4899]" : "text-[#06B6D4]"
              }`}
              strokeWidth={2.6}
            />
          )}
        </span>
      </div>
    </motion.button>
  );
};

/* ══════════════════════════════════════════════════
   CURRENT MEMBER CARD
   Style: Bold, vibrant, pink→purple gradient
   ══════════════════════════════════════════════════ */
const CurrentMemberCard: React.FC<{
  member: Member;
  isCenter: boolean;
  isMobile: boolean;
}> = ({ member, isCenter, isMobile }) => (
  <div
    className={`relative rounded-3xl mx-auto transition-all duration-500 ease-out ${
      !isMobile && isCenter ? "scale-105 z-20" : ""
    } ${!isMobile && !isCenter ? "scale-90 opacity-70 z-10" : ""}`}
    style={{
      maxWidth: isMobile ? "280px" : "310px",
      width: "90%",
    }}
  >
    {/* Multi-layer pink/purple glow for center */}
    {!isMobile && isCenter && (
      <>
        <div className="absolute -inset-6 rounded-[40px] bg-[#EC4899]/25 blur-3xl opacity-90 pointer-events-none" />
        <div className="absolute -inset-2 rounded-[32px] bg-[var(--primary)]/35 blur-xl opacity-80 pointer-events-none" />
      </>
    )}

    {!isMobile && !isCenter && (
      <div className="absolute -inset-1 rounded-[28px] bg-[#EC4899]/12 blur-lg opacity-60 pointer-events-none" />
    )}

    {/* Gradient border (center) — pink → purple */}
    {!isMobile && isCenter && (
      <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-br from-[#EC4899] via-[#8C5BFF] to-[#EC4899]/40 z-0" />
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
            ? "0 25px 60px -20px rgba(236, 72, 153, 0.6), 0 12px 32px -12px rgba(140, 91, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            : "0 12px 32px -16px rgba(236, 72, 153, 0.28), 0 4px 12px -6px rgba(140, 91, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${
          !isMobile && isCenter
            ? "bg-[#EC4899]/40 opacity-100"
            : "bg-[#EC4899]/15 opacity-50"
        }`}
      />

      {!isMobile && isCenter && (
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#8C5BFF]/30 blur-3xl" />
      )}

      <div
        className={`absolute inset-x-8 top-0 h-px transition-colors duration-500 ${
          !isMobile && isCenter
            ? "bg-gradient-to-r from-transparent via-[#EC4899]/80 to-transparent"
            : "bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 ${
          !isMobile && isCenter
            ? "bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(236,72,153,0.08)_100%)]"
            : "bg-[radial-gradient(120%_80%_at_50%_0%,transparent_50%,rgba(236,72,153,0.04)_100%)]"
        }`}
      />

      {/* Image */}
      <div className="relative flex items-center justify-center overflow-hidden pt-5">
        <div className="relative w-[200px] sm:w-[240px] h-[200px] sm:h-[240px]">
          {!isMobile && isCenter && (
            <div className="absolute inset-0 rounded-full bg-[#EC4899]/20 blur-3xl scale-110" />
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
                    ? "drop-shadow(0 12px 24px rgba(236, 72, 153, 0.35))"
                    : "none",
            }}
          />
        </div>

        {/* "New" flame badge on center */}
        {!isMobile && isCenter && (
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gradient-to-br from-[#EC4899] to-[#F97316] flex items-center justify-center"
            style={{
              boxShadow:
                "0 8px 20px -4px rgba(236, 72, 153, 0.8), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            <Flame size={16} className="text-white" strokeWidth={2.6} />
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="relative px-4 py-5 text-center">
        <h3
          className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
            !isMobile && isCenter ? "text-[#EC4899]" : "text-[var(--text-primary)]"
          }`}
          style={{
            textShadow:
              !isMobile && isCenter
                ? "0 2px 12px rgba(236, 72, 153, 0.3)"
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

        <div
          className={`mx-auto mt-3 mb-4 h-px w-10 transition-colors duration-500 ${
            !isMobile && isCenter
              ? "bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"
              : "bg-[var(--border-color)]"
          }`}
        />

        {/* Social row */}
        <div className="flex justify-center items-center gap-3">
          {member.linkedin && member.linkedin !== "#" && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-xl bg-[#0A66C2]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(10,102,194,0.3)]">
                <FaLinkedin size={isMobile ? 16 : 18} className="text-[#0A66C2]" />
              </div>
            </a>
          )}
          {member.instagram && member.instagram !== "#" && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-xl bg-[#E1306C]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(225,48,108,0.3)]">
                <FaInstagram size={isMobile ? 16 : 18} className="text-[#E1306C]" />
              </div>
            </a>
          )}
          {member.email && member.email !== "#" && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-xl bg-[#EA4335]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(234,67,53,0.3)]">
                <FaEnvelope size={isMobile ? 15 : 17} className="text-[#EA4335]" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   ALUMNI MEMBER CARD
   Style: Classic, elegant, gold→teal gradient,
          portrait-framed photo, ribbon badge
   ══════════════════════════════════════════════════ */
const AlumniMemberCard: React.FC<{
  member: Member;
  isCenter: boolean;
  isMobile: boolean;
}> = ({ member, isCenter, isMobile }) => (
  <div
    className={`relative rounded-[28px] mx-auto transition-all duration-500 ease-out ${
      !isMobile && isCenter ? "scale-105 z-20" : ""
    } ${!isMobile && !isCenter ? "scale-90 opacity-70 z-10" : ""}`}
    style={{
      maxWidth: isMobile ? "280px" : "310px",
      width: "90%",
    }}
  >
    {/* Soft teal/gold glow for center */}
    {!isMobile && isCenter && (
      <>
        <div className="absolute -inset-6 rounded-[40px] bg-[#06B6D4]/20 blur-3xl opacity-90 pointer-events-none" />
        <div className="absolute -inset-2 rounded-[32px] bg-[#F59E0B]/20 blur-xl opacity-70 pointer-events-none" />
      </>
    )}

    {!isMobile && !isCenter && (
      <div className="absolute -inset-1 rounded-[28px] bg-[#06B6D4]/10 blur-lg opacity-60 pointer-events-none" />
    )}

    {/* Gradient border (center) — teal → gold */}
    {!isMobile && isCenter && (
      <div className="absolute -inset-[1.5px] rounded-[28px] bg-gradient-to-br from-[#06B6D4] via-[#F59E0B] to-[#06B6D4]/40 z-0" />
    )}

    {/* Card body — warm parchment aesthetic */}
    <div
      className={`relative rounded-[26px] overflow-hidden z-10 transition-all duration-500 ${
        !isMobile && isCenter
          ? "bg-[var(--card-bg)]"
          : "bg-[var(--card-bg)]/85 backdrop-blur-md border border-[var(--border-color)]"
      }`}
      style={{
        minHeight: isMobile ? "360px" : "400px",
        boxShadow:
          !isMobile && isCenter
            ? "0 25px 60px -20px rgba(6, 182, 212, 0.55), 0 12px 32px -12px rgba(245, 158, 11, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            : "0 12px 32px -16px rgba(6, 182, 212, 0.28), 0 4px 12px -6px rgba(245, 158, 11, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Warm ambient blobs */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${
          !isMobile && isCenter
            ? "bg-[#F59E0B]/25 opacity-100"
            : "bg-[#F59E0B]/12 opacity-50"
        }`}
      />

      {!isMobile && isCenter && (
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#06B6D4]/25 blur-3xl" />
      )}

      <div
        className={`absolute inset-x-8 top-0 h-px transition-colors duration-500 ${
          !isMobile && isCenter
            ? "bg-gradient-to-r from-transparent via-[#06B6D4]/70 to-transparent"
            : "bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"
        }`}
      />

      {/* Portrait-framed image with ornate arch top */}
      <div className="relative flex items-end justify-center overflow-hidden pt-8 pb-2">
        {/* Decorative arch behind portrait */}
        {!isMobile && isCenter && (
          <div
            className="absolute top-6 w-[220px] h-[220px] rounded-full border border-[#06B6D4]/30"
            style={{
              boxShadow: "inset 0 0 40px rgba(6, 182, 212, 0.15)",
            }}
          />
        )}

        <div className="relative w-[190px] sm:w-[230px] h-[190px] sm:h-[230px]">
          {!isMobile && isCenter && (
            <div className="absolute inset-0 rounded-full bg-[#F59E0B]/15 blur-3xl scale-110" />
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
                    ? "drop-shadow(0 12px 24px rgba(245, 158, 11, 0.3))"
                    : "none",
            }}
          />
        </div>

        {/* Alumni ribbon badge (top-right) */}
        {!isMobile && isCenter && (
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full 
              bg-gradient-to-br from-[#06B6D4] to-[#0891B2] 
              flex items-center gap-1"
            style={{
              boxShadow:
                "0 8px 20px -4px rgba(6, 182, 212, 0.7), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <Crown size={11} className="text-white" strokeWidth={2.6} />
            <span className="text-[9px] font-black tracking-wider text-white uppercase">
              Alumni
            </span>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="relative px-4 py-5 text-center">
        <h3
          className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
            !isMobile && isCenter ? "text-[#06B6D4]" : "text-[var(--text-primary)]"
          }`}
          style={{
            textShadow:
              !isMobile && isCenter ? "0 2px 12px rgba(6, 182, 212, 0.3)" : "none",
          }}
        >
          {member.name}
        </h3>

        {/* Year tag under name — alumni specific */}
        <div className="flex justify-center mt-1.5">
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
              !isMobile && isCenter
                ? "text-[#F59E0B]"
                : "text-[var(--text-dim)]"
            }`}
          >
            Batch of 2025–2027
          </span>
        </div>

        <div
          className={`mx-auto mt-3 mb-4 h-px w-10 transition-colors duration-500 ${
            !isMobile && isCenter
              ? "bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"
              : "bg-[var(--border-color)]"
          }`}
        />

        {/* Social row */}
        <div className="flex justify-center items-center gap-3">
          {member.linkedin && member.linkedin !== "#" && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-full bg-[#0A66C2]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(10,102,194,0.3)]">
                <FaLinkedin size={isMobile ? 16 : 17} className="text-[#0A66C2]" />
              </div>
            </a>
          )}
          {member.instagram && member.instagram !== "#" && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-full bg-[#E1306C]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(225,48,108,0.3)]">
                <FaInstagram size={isMobile ? 16 : 17} className="text-[#E1306C]" />
              </div>
            </a>
          )}
          {member.email && member.email !== "#" && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="group/social relative"
            >
              <div className="absolute inset-0 rounded-full bg-[#EA4335]/40 blur-md opacity-0 group-hover/social:opacity-100 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover/social:scale-110 bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] shadow-[0_4px_12px_-4px_rgba(234,67,53,0.3)]">
                <FaEnvelope size={isMobile ? 15 : 16} className="text-[#EA4335]" />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   TEAM SECTION — switches card + heading design
   ══════════════════════════════════════════════════ */
const TeamSection: React.FC<{
  members: Member[];
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  headlineLead: string;
  headlineAccent: string;
  subtext: string;
  sectionKey: string;
  variant: "current" | "alumni";
}> = ({
  members,
  badgeIcon,
  badgeLabel,
  headlineLead,
  headlineAccent,
  subtext,
  sectionKey,
  variant,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const isCurrent = variant === "current";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBeforeChange = useCallback(
    (_: number, next: number) => {
      const total = members.length;
      const normalized = ((next % total) + total) % total;
      setCurrentSlide(next);
      setActiveMember(normalized);
    },
    [members.length]
  );

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
    const total = members.length;
    const centerIndex = ((currentSlide % total) + total) % total;
    return index === centerIndex;
  };

  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();
  const goToSlide = (idx: number) => sliderRef.current?.slickGoTo(idx);

  /* Accent color per variant */
  const accent = isCurrent ? "#EC4899" : "#06B6D4";

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 overflow-hidden"
    >
      {/* Section-specific ambient tint */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: isCurrent
            ? "radial-gradient(60% 50% at 50% 30%, rgba(236,72,153,0.08) 0%, transparent 70%)"
            : "radial-gradient(60% 50% at 50% 30%, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
        transition={{ duration: 0.7, ease }}
        className="text-center mb-12 px-4"
      >
        {/* Badge — varies per section */}
        <div
          className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full backdrop-blur-sm border"
          style={{
            borderColor: `${accent}40`,
            background: `${accent}15`,
            boxShadow: `0 4px 20px -8px ${accent}66`,
          }}
        >
          <span className="relative flex w-1.5 h-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: accent }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: accent }}
            />
          </span>
          {badgeIcon}
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {badgeLabel}
          </span>
        </div>

        <h2 className="text-[30px] sm:text-[40px] md:text-[48px] font-extrabold tracking-tight text-[var(--text-primary)]">
          {headlineLead}{" "}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isCurrent
                  ? "linear-gradient(90deg, #EC4899, #8C5BFF, #EC4899)"
                  : "linear-gradient(90deg, #06B6D4, #F59E0B, #06B6D4)",
              }}
            >
              {headlineAccent}
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="absolute left-0 right-0 -bottom-2 h-1 md:h-1.5 origin-left rounded-full"
              style={{
                background: isCurrent
                  ? "linear-gradient(90deg, #EC4899, #8C5BFF, transparent)"
                  : "linear-gradient(90deg, #06B6D4, #F59E0B, transparent)",
              }}
            />
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
          {subtext}
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto team-carousel relative px-2">
        {!isMobile && (
          <>
            <CustomArrow
              direction="prev"
              onClick={goToPrev}
              variant={variant}
            />
            <CustomArrow
              direction="next"
              onClick={goToNext}
              variant={variant}
            />
          </>
        )}

        <div className={isMobile ? "px-2" : "px-6"}>
          <Slider ref={sliderRef} {...settings}>
            {members.map((member, idx) => (
              <div key={`${sectionKey}-${idx}`} className="px-2 py-6">
                {isCurrent ? (
                  <CurrentMemberCard
                    member={member}
                    isCenter={isCenterSlide(idx)}
                    isMobile={isMobile}
                  />
                ) : (
                  <AlumniMemberCard
                    member={member}
                    isCenter={isCenterSlide(idx)}
                    isMobile={isMobile}
                  />
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Dots + counter — accent-tinted per section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center max-w-md">
          {members.map((_, idx) => {
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
                      ? "w-8"
                      : "w-2 bg-[var(--text-dim)]/50 group-hover:bg-[var(--text-dim)]/80 group-hover:w-3"
                  }`}
                  style={{
                    background: isActive
                      ? isCurrent
                        ? "linear-gradient(90deg, #EC4899, #8C5BFF)"
                        : "linear-gradient(90deg, #06B6D4, #F59E0B)"
                      : undefined,
                    boxShadow: isActive ? `0 0 12px ${accent}cc` : "none",
                  }}
                />
              </button>
            );
          })}
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--card-bg)]/70 backdrop-blur-md border border-[var(--border-color)] text-[11px] font-bold tabular-nums"
          style={{
            boxShadow: `0 4px 16px -6px ${accent}40, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          <span style={{ color: accent }}>
            {String(activeMember + 1).padStart(2, "0")}
          </span>
          <span className="text-[var(--text-dim)]">/</span>
          <span className="text-[var(--text-muted)]">
            {String(members.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

/* ══════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════ */
export default function TeamCarousel() {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--bg-gradient-from)] via-[var(--bg-gradient-via)] to-[var(--bg-gradient-to)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_50%_55%,var(--primary)/14_0%,transparent_70%)]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[var(--primary)]/25 to-transparent" />

      <motion.div
        className="absolute top-32 left-[6%] w-32 h-32 rounded-full bg-[#EC4899]/12 blur-3xl pointer-events-none"
        animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[6%] w-40 h-40 rounded-full bg-[#06B6D4]/12 blur-3xl pointer-events-none"
        animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ═══════════════════════════════
          SECTION 1 — CURRENT TEAM
      ═══════════════════════════════ */}
      <TeamSection
        members={currentMembers}
        badgeIcon={
          <Rocket size={14} className="text-[#EC4899]" strokeWidth={2.4} />
        }
        badgeLabel="Current Batch · 2026–2028"
        headlineLead="Meet our"
        headlineAccent="Current Team"
        subtext="The newly inducted members of the Finance Committee — carrying the vision forward with fresh energy, new ideas, and the same unwavering commitment to financial literacy."
        sectionKey="current"
        variant="current"
      />

      {/* ═══════════════════════════════
          DIVIDER — The Legacy Continues
      ═══════════════════════════════ */}
      <div className="relative max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#EC4899]/40 to-transparent" />
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-[var(--card-bg)]/70 backdrop-blur-md border border-[var(--primary)]/20"
            style={{
              boxShadow:
                "0 8px 24px -10px rgba(147,3,197,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <History
              size={12}
              className="text-[#06B6D4]"
              strokeWidth={2.6}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #EC4899, #8C5BFF, #06B6D4, #F59E0B)",
              }}
            >
              The Legacy Continues
            </span>
            <History
              size={12}
              className="text-[#F59E0B]"
              strokeWidth={2.6}
            />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/40 to-transparent" />
        </div>
      </div>

      {/* ═══════════════════════════════
          SECTION 2 — ALUMNI TEAM
      ═══════════════════════════════ */}
      <TeamSection
        members={alumniMembers}
        badgeIcon={
          <GraduationCap
            size={14}
            className="text-[#06B6D4]"
            strokeWidth={2.4}
          />
        }
        badgeLabel="Alumni · Batch 2025–2027"
        headlineLead="Meet our beautiful"
        headlineAccent="Alumni Team"
        subtext="The alumni members of the Finance Committee who laid the foundation and shaped its journey — a legacy of financial literacy, leadership, and lasting impact."
        sectionKey="alumni"
        variant="alumni"
      />

      <MobileSwipeHint />

      {/* Plain <style> tag — safe for App Router (no styled-jsx) */}
      <style>{`
        .team-carousel .slick-prev,
        .team-carousel .slick-next,
        .team-carousel .slick-arrow {
          display: none !important;
        }
        .team-carousel .slick-slide {
          transition: all 0.5s ease-in-out;
        }
        .team-carousel .slick-center {
          opacity: 1;
        }
        .team-carousel .slick-slide:not(.slick-center) {
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}

function MobileSwipeHint() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center pb-16 px-4"
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
  );
}