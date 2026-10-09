"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavButton: React.FC<{
  children: React.ReactNode;
  href: string;
  className?: string;
}> = ({ children, href, className = "" }) => (
  <Link
    href={href}
    className={`text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer text-sm lg:text-base font-semibold transition ${className}`}
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("fcUserName");
    const storedEmail = localStorage.getItem("fcUserEmail");
    setUserName(storedName);
    setUserEmail(storedEmail);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  function handleLogout() {
    localStorage.removeItem("fcUserName");
    localStorage.removeItem("fcUserEmail");
    window.location.reload();
  }

  function getInitials(name: string | null): string {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const isLoggedIn = !!userName;
  const userInitials = getInitials(userName);

  // Shared Login/Profile Avatar Component to avoid duplication
  const UserAvatar = ({ size = "w-9 h-9 lg:w-10 lg:h-10" }: { size?: string }) => (
    <div className={`${size} rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-base lg:text-lg font-bold shadow cursor-pointer border-2 lg:border-4 border-white hover:scale-105 transition-all`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 lg:w-6 lg:h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368"
        />
      </svg>
    </div>
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[1002] 
  backdrop-blur-xl
  bg-gradient-to-r from-[#f5f0ff] via-white to-[#fdf0f7]
  dark:from-[var(--navbar-bg)] dark:via-[var(--navbar-bg)] dark:to-[var(--navbar-bg)]
  shadow-md border-b border-[var(--navbar-border)] flex items-center transition-all duration-300 py-1.5 sm:py-2"
      >
        {/* Soft glow accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-10 w-64 h-32 rounded-full 
            bg-[var(--primary)]/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-10 w-64 h-32 rounded-full 
            bg-[#EC4899]/10 blur-3xl"
        />

        {/* Bottom accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px 
            bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent"
        />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center w-full">
          {/* Logo and Text - Wrap in Link with href="/" */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <Image
              src="/images/Transparent logo.png"
              alt="Finance Committee logo"
              width={100}
              height={100}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain drop-shadow-[0_2px_6px_rgba(140,91,255,0.4)] transition-transform hover:scale-105"
              priority
            />
            <div>
              <span className="block text-[var(--primary)] text-base sm:text-xl md:text-2xl font-semibold cursor-pointer hover:text-[var(--primary-light)] transition leading-tight">
                Finance Committee
              </span>
              <span className="block text-[var(--text-muted)] text-[10px] sm:text-sm md:text-base font-medium leading-tight">
                FOSTIIMA Chapter
              </span>
            </div>
          </Link>

          {/* ✅ Desktop Nav - Changed breakpoint from md to lg to prevent cramping on tablets */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-[var(--text-secondary)] font-medium">
            <NavButton
              href="/aboutus"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              About Us
            </NavButton>
            <NavButton
              href="/blog"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              Blog
            </NavButton>

            {/* ✅ New Buzzer Link */}
            {/* <NavButton
              href="/buzzer"
              className="text-[#8C5BFF] transition-colors"
            >
              Buzzer
            </NavButton> */}

            <NavButton
              href="/event"
              className="text-[var(--primary)] transition-colors"
            >
              Event
            </NavButton>
            {/* <a
              href="https://fc-fbs-voting-system.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[var(--primary)] after:rounded-full hover:text-[var(--primary-light)] hover:after:bg-[var(--primary-light)] transition-all"
            >
              VITT-MANTHAN
            </a> */}

            {/* ✅ FinQuest Registration link */}
            {/* <NavButton
              href="/finquest/register"
              className="text-[#8C5BFF] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#8C5BFF] after:rounded-full hover:text-[#6356D7] hover:after:bg-[#6356D7] transition-all"
            >
              FinQuest Registration
            </NavButton> */}

            {/* <NavButton
              href="/stockify/register"
              className="text-[#8C5BFF] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#8C5BFF] after:rounded-full hover:text-[#6356D7] hover:after:bg-[#6356D7] transition-all"
            >
              StockiFy Registration
            </NavButton> */}

            <NavButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjn6XWWOQvcdSEXmppvy54Z3Neh1ujvGqiaJt6hr8UrpcQmQ/viewform"
              className="text-[#8C5BFF] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#8C5BFF] after:rounded-full hover:text-[#6356D7] hover:after:bg-[#6356D7] transition-all"
            >
              Fun With Finance Registration
            </NavButton>

            {/* Theme Toggle Button */}
            <div className="ml-2">
              <ThemeToggle />
            </div>

            <div className="ml-2 flex items-center">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-base lg:text-lg font-bold shadow cursor-pointer border-2 lg:border-4 border-white hover:scale-105 transition-all"
                    onClick={() => setShowDropdown((v) => !v)}
                    title={userName || undefined}
                  >
                    {userInitials}
                  </button>
                  {showDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg p-4 z-50 border animate-fade-in"
                      style={{
                        background: "var(--card-bg)",
                        borderColor: "var(--border-color)",
                        boxShadow: "var(--card-shadow)",
                      }}
                    >
                      <div className="mb-2 text-base font-bold text-[var(--primary)]">
                        {userName}
                      </div>
                      <div className="mb-1 text-[var(--text-muted)] text-xs font-semibold">
                        {userEmail}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="mt-3 w-full px-3 py-2 text-white rounded font-semibold transition-all text-sm hover:opacity-90"
                        style={{
                          background: "var(--button-primary)",
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/signin">
                  <UserAvatar />
                </Link>
              )}
            </div>
          </div>

          {/* ✅ Mobile/Tablet Header Controls (Avatar + Hamburger) */}
          <div className="flex lg:hidden items-center gap-3 sm:gap-4">
            {/* Show Avatar/Login on mobile header */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold shadow cursor-pointer border-2 border-white hover:scale-105 transition-all"
                  onClick={() => setShowDropdown((v) => !v)}
                  title={userName || undefined}
                >
                  {userInitials}
                </button>
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg p-4 z-50 border animate-fade-in"
                    style={{
                      background: "var(--card-bg)",
                      borderColor: "var(--border-color)",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div className="mb-2 text-base font-bold text-[var(--primary)]">
                      {userName}
                    </div>
                    <div className="mb-1 text-[var(--text-muted)] text-xs font-semibold">
                      {userEmail}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full px-3 py-2 text-white rounded font-semibold transition-all text-sm hover:opacity-90"
                      style={{
                        background: "var(--button-primary)",
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="shrink-0">
                <UserAvatar size="w-9 h-9" />
              </Link>
            )}

            {/* Hamburger Button */}
            <button
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-transparent transition relative z-[1003]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-7 sm:h-7"
              >
                <rect
                  y="5"
                  width="24"
                  height="2.5"
                  rx="1.25"
                  fill="var(--text-secondary)"
                />
                <rect
                  y="11"
                  width="24"
                  height="2.5"
                  rx="1.25"
                  fill="var(--text-secondary)"
                />
                <rect
                  y="17"
                  width="24"
                  height="2.5"
                  rx="1.25"
                  fill="var(--text-secondary)"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 w-full rounded-b-lg shadow-lg py-3 px-0 flex flex-col items-center gap-1 font-medium z-[1004] border-b border-x max-h-[85vh] overflow-y-auto"
            style={{
              marginTop: "0px",
              background: "var(--card-bg)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <Link href="/aboutus" onClick={() => setMenuOpen(false)} className="w-full">
              <button className="w-full text-center py-3 transition-colors hover:text-[var(--primary)] text-sm sm:text-base">
                About Us
              </button>
            </Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="w-full">
              <button className="w-full text-center py-3 transition-colors hover:text-[var(--primary)] text-sm sm:text-base">
                Blog
              </button>
            </Link>
            <Link href="/event" onClick={() => setMenuOpen(false)} className="w-full">
              <button className="w-full text-center py-3 transition-colors hover:text-[var(--primary)] text-sm sm:text-base">
                Event
              </button>
            </Link>
            {/* <a
              href="https://fc-fbs-voting-system.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center py-3 transition-colors text-[var(--primary)] font-semibold hover:text-[var(--primary-light)] text-sm sm:text-base"
            >
              VITT-MANTHAN
            </a> */}

            <NavButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjn6XWWOQvcdSEXmppvy54Z3Neh1ujvGqiaJt6hr8UrpcQmQ/viewform"
              className="text-[#8C5BFF] font-semibold relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-[#8C5BFF] after:rounded-full hover:text-[#6356D7] hover:after:bg-[#6356D7] transition-all"
            >
              Fun With Finance Registration
            </NavButton>

            {/* ✅ Mobile Buzzer link */}
            {/* <Link href="/buzzer" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-center py-3 hover:bg-[#f6f3ff] transition">
                Buzzer
              </button>
            </Link> */}
            {/* <Link href="/finquest/register" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-center py-3 hover:bg-[#f6f3ff] transition text-[#8C5BFF] font-semibold">
                FinQuest Registration
              </button>
            </Link> */}
            {/* <Link href="/stockify/register" onClick={() => setMenuOpen(false)}>
              <button className="w-full text-center py-3 hover:bg-[#f6f3ff] transition text-[#8C5BFF] font-semibold">
                StockiFy Registration
              </button>
            </Link> */}

            {/* Mobile Theme Toggle */}
            <div className="w-full flex justify-center py-2">
              <ThemeToggle />
            </div>
            
            {/* Note: Login/Profile avatar is now always visible in the header on mobile, so we don't need it duplicated here. */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;