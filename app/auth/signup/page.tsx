"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animatePanel, setAnimatePanel] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setAnimatePanel(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      name: nameRef.current?.value?.trim() || "",
      email: emailRef.current?.value?.trim() || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
    };
    try {
      signUpSchema.parse(formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Sign up failed.");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("fcUserName", formData.name);
      localStorage.setItem("fcUserEmail", formData.email);
      if (res.status === 201 || res.status === 200) {
        toast.success("Account created successfully!");
        router.push("/auth/signin");
      }
    } catch (err: unknown) {
      const message =
        err instanceof z.ZodError ? err.issues[0].message : "Sign-up failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  /* Small helper to avoid repeating the wrapper classes on every input */
  const fieldWrapper =
    "relative flex items-center w-full rounded-2xl border-2 border-[var(--border-color)] " +
    "bg-[var(--input-bg)] " +
    "focus-within:border-[var(--primary)] " +
    "focus-within:ring-2 focus-within:ring-[var(--primary)]/40 " +
    "focus-within:shadow-[0_0_0_5px_rgba(140,91,255,0.14),0_8px_24px_-12px_rgba(140,91,255,0.5)] " +
    "hover:border-[var(--primary-light)] hover:shadow-[0_8px_24px_-12px_rgba(140,91,255,0.35)] " +
    "transition-all duration-300 " +
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]";

  const inputBase =
    "flex-1 min-w-0 bg-transparent border-0 outline-none " +
    "py-2.5 sm:py-3 pr-3 text-sm " +
    "text-[var(--text-primary)] placeholder:text-[var(--text-dim)]";

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen font-sans bg-[var(--bg-secondary)] relative overflow-hidden">
      <Toaster position="top-center" />

      {/* ============================================
          AMBIENT BACKGROUND
      ============================================ */}
      {/* Radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 85% 15%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 15% 85%, #EC4899 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #06B6D4 0%, transparent 55%)",
          opacity: 0.1,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,91,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 70% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Subtle noise texture for premium feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating orbs on the RIGHT panel background */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full 
          bg-[var(--primary)]/25 blur-[120px] z-0"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 25, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full 
          bg-[#EC4899]/20 blur-[110px] z-0"
      />

      {/* ============================================
          MOBILE TOP TAB BAR
      ============================================ */}
      <div
        className="md:hidden absolute top-0 left-0 w-full h-20 z-[1000] flex justify-center items-center
          bg-gradient-to-b from-[var(--primary-dark)] to-[var(--footer-bg)]
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
        style={{
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <div className="flex bg-[var(--card-bg)]/80 backdrop-blur-sm rounded-full p-1.5 shadow-inner">
          <button
            onClick={() => router.push("/auth/signin")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signin"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md"
                : "text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
              pathname === "/auth/signup"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md"
                : "text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* ============================================
          LEFT PANEL — illustration + branding (desktop)
      ============================================ */}
      <div className="hidden md:flex md:w-1/2 relative justify-center items-center overflow-hidden rounded-r-[75px] bg-[var(--card-bg-secondary)]">
        <div
          className={`absolute inset-0 bg-[var(--footer-bg)] rounded-r-[75px] z-0 transition-all duration-700 ease-out ${
            animatePanel ? "mr-[20px]" : "mr-[100%]"
          }`}
          style={{
            boxShadow:
              "inset 0 0 140px rgba(140,91,255,0.18), inset 0 0 40px rgba(236,72,153,0.08), 20px 0 60px -20px rgba(0,0,0,0.5)",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-32 w-[400px] h-[400px] rounded-full 
            bg-[var(--primary)]/30 blur-[120px] z-[1]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-32 w-[380px] h-[380px] rounded-full 
            bg-[#EC4899]/25 blur-[120px] z-[1]"
        />

        <div className="relative z-10 px-6 sm:px-8">
          <div
            className="relative"
            style={{
              filter:
                "drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(140,91,255,0.35))",
            }}
          >
            <Image
              src="/icons/sign-up-Vector.svg"
              alt="Signup Illustration"
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Branding */}
        <div className="absolute top-4 sm:top-6 left-6 sm:left-10 flex items-center gap-2 sm:gap-3 z-10">
          <div
            className="relative rounded-2xl p-1"
            style={{
              boxShadow:
                "0 8px 24px -8px rgba(140,91,255,0.6), 0 0 30px -8px rgba(236,72,153,0.4)",
            }}
          >
            <Image
              src="/images/Transparent logo.png"
              alt="Logo"
              width={65}
              height={65}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-extrabold tracking-wider text-[var(--primary-light)]">
              Finance Committee
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--text-muted)]">
              FOSTIIMA Chapter
            </span>
          </div>
        </div>

        {/* Floating dots */}
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white/25 rounded-full animate-pulse hover:scale-150 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-1000 hover:scale-150 transition-transform duration-300 shadow-[0_0_24px_rgba(255,255,255,0.45)]"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-500 hover:scale-150 transition-transform duration-300 shadow-[0_0_16px_rgba(255,255,255,0.6)]"></div>
        <div className="absolute top-1/5 left-1/5 w-2.5 h-2.5 bg-white/25 rounded-full animate-pulse delay-200 hover:scale-150 transition-transform duration-300 shadow-[0_0_18px_rgba(255,255,255,0.55)]"></div>
        <div className="absolute bottom-1/5 right-1/3 w-3.5 h-3.5 bg-white/20 rounded-full animate-pulse delay-1200 hover:scale-150 transition-transform duration-300 shadow-[0_0_22px_rgba(255,255,255,0.5)]"></div>
      </div>

      {/* ============================================
          RIGHT PANEL — form
      ============================================ */}
      <div
        className={`w-full md:w-1/2 flex justify-center items-center px-4 sm:px-10 lg:px-20 py-10 
          transition-all duration-700 ease-out pt-24 md:pt-10 relative z-10 ${
            animatePanel ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
      >
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-5 sm:space-y-6"
          autoComplete="on"
        >
          {/* ---------- Heading block ---------- */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full 
                bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                text-[var(--primary)] text-[10px] font-bold tracking-[0.22em] uppercase
                shadow-[0_4px_16px_-4px_rgba(140,91,255,0.5)] backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
              </span>
              Join the movement
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 leading-tight tracking-tight">
              Create your{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Account
              </span>
            </h1>

            <div
              className="mb-3 h-1 w-20 rounded-full 
                bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                shadow-[0_0_14px_rgba(236,72,153,0.7)]"
            />

            <p className="text-sm text-[var(--text-muted)] font-semibold">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/signin")}
                className="text-[var(--primary)] hover:underline font-semibold"
              >
                Sign In here.
              </button>
            </p>
          </div>

          {/* ---------- FULL NAME ---------- */}
          <div className={fieldWrapper}>
            <span
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-dim)] pointer-events-none"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Full Name"
              ref={nameRef}
              required
              className={inputBase}
            />
          </div>

          {/* ---------- EMAIL ---------- */}
          <div className={fieldWrapper}>
            <span
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-dim)] pointer-events-none"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your Email"
              ref={emailRef}
              required
              className={inputBase}
            />
          </div>

          {/* ---------- PASSWORD ---------- */}
          <div className={fieldWrapper}>
            <span
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-dim)] pointer-events-none"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 1 1 8 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="new-password"
              autoComplete="new-password"
              placeholder="Enter Password"
              ref={passwordRef}
              required
              className={inputBase}
            />
            <button
              type="button"
              onClick={togglePassword}
              aria-label="Toggle password visibility"
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-muted)] hover:text-[var(--primary)]
                transition-colors rounded-r-2xl
                hover:bg-[var(--primary)]/10"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* ---------- CONFIRM PASSWORD ---------- */}
          <div className={fieldWrapper}>
            <span
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-dim)] pointer-events-none"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                <circle cx="12" cy="16" r="1.2" fill="currentColor" />
              </svg>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              autoComplete="new-password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              required
              className={inputBase}
            />
            <button
              type="button"
              onClick={toggleConfirm}
              aria-label="Toggle confirm password visibility"
              className="flex items-center justify-center shrink-0 w-11 h-full 
                text-[var(--text-muted)] hover:text-[var(--primary)]
                transition-colors rounded-r-2xl
                hover:bg-[var(--primary)]/10"
            >
              {showConfirmPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* ---------- Remember Me + Terms ---------- */}
          <div className="flex items-center justify-between text-sm gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <span className="relative w-4 h-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span
                  className="w-4 h-4 rounded border-2 border-[var(--border-color)] 
                    flex items-center justify-center
                    peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]
                    group-hover:border-[var(--primary)]
                    shadow-[0_2px_8px_-2px_rgba(140,91,255,0.35)]
                    transition-colors"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </span>
              <span className="font-semibold text-[var(--text-secondary)]">
                Remember Me
              </span>
            </label>

            <button
              type="button"
              onClick={() => alert("Terms and conditions flow goes here.")}
              className="font-semibold text-[var(--primary)] hover:underline transition-colors text-xs"
            >
              Accept Terms?
            </button>
          </div>

          {/* ---------- Submit ---------- */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-bold rounded-2xl text-sm transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, #EC4899 100%)",
              color: "white",
              boxShadow:
                "0 20px 50px -15px rgba(140,91,255,0.75), 0 0 0 1px rgba(255,255,255,0.08) inset, inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </span>
          </motion.button>

          {/* ---------- Reassurance ---------- */}
          <p className="text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 pt-1">
            <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Secure sign-up · Your data is encrypted
          </p>

          {/* ---------- Divider with "or" ---------- */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)] font-bold">
              FOSTIIMA Chapter
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;