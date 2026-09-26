"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutImage from "../components/about/AboutImage";
import AboutColumns from "../components/about/AboutColumns";
import TeamCarousel from "../components/about/TeamCarousel";
import ContactForm from "../components/about/ContactForm";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] relative overflow-hidden">
      {/* ───────── Ambient background ───────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,var(--bg-primary)_0%,var(--bg-secondary)_45%,var(--bg-primary)_100%)]" />

        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full blur-3xl bg-[var(--primary)]/15 animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl bg-[var(--primary)]/10 animate-float-slower" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* ───────── Content ───────── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <AboutHero />
          <AboutImage />
          <AboutColumns />
          <TeamCarousel />
          <ContactForm />
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        .team-carousel .slick-list {
          overflow: hidden !important;
        }
        .team-carousel .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .team-carousel .slick-slide {
          display: flex !important;
          justify-content: center !important;
          float: none !important;
        }

        @media (max-width: 900px) {
          .team-carousel {
            max-width: 98vw !important;
          }
          .about-columns-row {
            flex-direction: column !important;
          }
          .about-contact-names-row {
            flex-direction: column !important;
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-18px) translateX(10px);
          }
        }
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }

        @keyframes floatSlower {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(14px) translateX(-12px);
          }
        }
        .animate-float-slower {
          animation: floatSlower 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}