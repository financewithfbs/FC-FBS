"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence, easeOut } from "framer-motion";

function getFilePreviewUrl(fileUrl?: string) {
  if (!fileUrl) return "#";
  if (fileUrl.startsWith("http") || fileUrl.includes("cloudinary.com")) return fileUrl;
  if (fileUrl.startsWith("/uploads")) return fileUrl;
  return `/uploads/${fileUrl}`;
}

type Blog = {
  id: string;
  title: string;
  img: string;
  summary: string;
  category: string[];
  fileUrl?: string;
};

function BlogCard({
  img,
  title,
  summary,
  category,
  onEdit,
  onDelete,
  onOpen,
  canEdit,
  index,
}: {
  img: string;
  title: string;
  summary: string;
  category: string[];
  fileUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onOpen?: () => void;
  canEdit?: boolean;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: easeOut, delay: (index % 3) * 0.08 }}
      className="group relative h-full"
    >
      <div
        className="relative h-full rounded-[26px] p-[1.5px] 
          bg-gradient-to-br from-[var(--primary)]/25 via-transparent to-[#06B6D4]/20 
          hover:from-[var(--primary)]/70 hover:via-[#EC4899]/40 hover:to-[#06B6D4]/50 
          transition-all duration-500
          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]
          hover:shadow-[0_30px_70px_-20px_rgba(140,91,255,0.55)]"
      >
        <div
          onClick={onOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpen?.();
          }}
          className="relative rounded-[24px] bg-[var(--card-bg)] h-full 
            flex flex-col overflow-hidden cursor-pointer
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
            transition-transform duration-500 group-hover:-translate-y-1.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 
              w-64 h-40 rounded-full bg-[var(--primary)]/25 blur-3xl 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
            <Image
              src={img}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 
                px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md 
                border border-white/20 text-white text-[10px] font-bold tracking-wider
                shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              5 MIN
            </div>

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
              {category.slice(0, 2).map((cat, i) => (
                <span
                  key={i}
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] 
                    bg-white/15 backdrop-blur-md text-white border border-white/25
                    shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-[20px] font-black text-[var(--text-primary)] leading-tight tracking-tight mb-2.5 line-clamp-2">
              {title}
            </h3>
            <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#EC4899] mb-3 group-hover:w-16 transition-all duration-500
              shadow-[0_0_12px_rgba(140,91,255,0.5)]" />
            <p
              className="text-[var(--text-muted)] text-[14.5px] leading-relaxed line-clamp-4 mb-5 flex-1"
              dangerouslySetInnerHTML={{
                __html: summary.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" '),
              }}
            />

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border-color)]/60 mt-auto">
              <span
                className="group/link inline-flex items-center gap-1.5 text-[var(--primary)] font-bold text-[13px]"
              >
                <span className="relative">
                  Read Article
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--primary)] group-hover/link:w-full transition-all duration-300" />
                </span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover/link:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {canEdit && (
                <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={onEdit}
                    aria-label="Edit"
                    className="w-8 h-8 rounded-lg flex items-center justify-center 
                      bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/25 
                      hover:bg-[var(--primary)]/20 transition-colors
                      shadow-[0_4px_10px_-4px_rgba(140,91,255,0.5)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={onDelete}
                    aria-label="Delete"
                    className="w-8 h-8 rounded-lg flex items-center justify-center 
                      bg-rose-500/10 text-rose-500 border border-rose-500/25 
                      hover:bg-rose-500/20 transition-colors
                      shadow-[0_4px_10px_-4px_rgba(244,63,94,0.5)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================
   BLOG DETAIL MODAL
============================================ */
function BlogModal({
  blog,
  onClose,
  onEdit,
  onDelete,
  canEdit,
}: {
  blog: Blog | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!blog) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [blog, onClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !blog) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (el.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [blog]);

  useEffect(() => {
    setProgress(0);
    setCopied(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [blog?.id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* silent */
    }
  };

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[2000] flex items-start justify-center 
            bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <div
            ref={scrollRef}
            className="w-full h-full overflow-y-auto
              px-4 sm:px-6 pt-20 sm:pt-24 pb-16
              flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.article
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="relative w-full max-w-3xl h-fit rounded-[28px] p-[1.5px] 
                bg-gradient-to-br from-[var(--primary)]/70 via-[#EC4899]/50 to-[#06B6D4]/70 
                shadow-[0_50px_140px_-30px_rgba(0,0,0,0.9),0_0_80px_-20px_rgba(140,91,255,0.5)]"
            >
              <div className="relative rounded-[26px] bg-[var(--card-bg)] overflow-hidden
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                      transition-[width] duration-150 ease-out
                      shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                  {canEdit && (
                    <>
                      <button
                        onClick={onEdit}
                        aria-label="Edit"
                        className="w-9 h-9 rounded-full flex items-center justify-center 
                          bg-black/50 hover:bg-[var(--primary)] backdrop-blur-md 
                          border border-white/25 text-white 
                          shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]
                          transition-all hover:scale-110"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={onDelete}
                        aria-label="Delete"
                        className="w-9 h-9 rounded-full flex items-center justify-center 
                          bg-black/50 hover:bg-rose-500 backdrop-blur-md 
                          border border-white/25 text-white 
                          shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]
                          transition-all hover:scale-110"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="w-9 h-9 rounded-full flex items-center justify-center 
                      bg-black/50 hover:bg-black/80 backdrop-blur-md 
                      border border-white/25 text-white 
                      shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]
                      transition-all hover:scale-110"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 
                    bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[#EC4899]/20 mix-blend-overlay" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[70%]">
                    {blog.category.map((cat, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                        className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] 
                          bg-white/15 backdrop-blur-md text-white border border-white/25
                          shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]"
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="flex items-center gap-2 mb-3 text-white/75 text-[10px] font-bold tracking-[0.22em] uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Finance Committee · Blog
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.55 }}
                      className="text-2xl sm:text-4xl lg:text-[2.75rem] 
                        font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl 
                        max-w-2xl"
                    >
                      {blog.title}
                    </motion.h2>
                  </div>
                </div>

                <div className="p-6 sm:p-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="flex flex-wrap items-center gap-3 pb-6 mb-6 
                      border-b border-[var(--border-color)]/60"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                      bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                      text-[var(--text-muted)] text-xs font-semibold
                      shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]">
                      <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 5v2.5l1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      5 min read
                    </span>

                    <span className="hidden sm:block w-px h-5 bg-[var(--border-color)]" />

                    <span className="inline-flex items-center gap-2 text-[var(--text-muted)] text-xs font-semibold">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#EC4899] 
                        flex items-center justify-center text-white text-[10px] font-bold
                        shadow-[0_4px_12px_-2px_rgba(140,91,255,0.6)]">
                        FC
                      </span>
                      Finance Committee
                    </span>

                    <span className="flex-1" />

                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                        bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                        text-[var(--text-muted)] hover:text-[var(--primary)] 
                        hover:border-[var(--primary)]/40 
                        text-xs font-semibold transition-all
                        shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]"
                    >
                      {copied ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                          </svg>
                          Share
                        </>
                      )}
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.55 }}
                    className="blog-modal-content relative
                      text-[var(--text-secondary)] 
                      text-[15.5px] sm:text-[17px] 
                      leading-[1.8] sm:leading-[1.85]"
                    dangerouslySetInnerHTML={{
                      __html: blog.summary.replace(
                        /<a /g,
                        '<a target="_blank" rel="noopener noreferrer" ',
                      ),
                    }}
                  />

                  {blog.fileUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="mt-10 pt-8 border-t border-[var(--border-color)]/60"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 
                        p-5 rounded-2xl 
                        bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[#06B6D4]/5 
                        border border-[var(--border-color)]
                        shadow-[0_10px_30px_-12px_rgba(140,91,255,0.35)]">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl 
                          bg-gradient-to-br from-[var(--primary)] to-[#EC4899] 
                          flex items-center justify-center 
                          shadow-[0_8px_24px_-6px_rgba(236,72,153,0.6)]">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--primary)] mb-1">
                            Attached Resource
                          </p>
                          <p className="text-sm text-[var(--text-primary)] font-semibold truncate">
                            {blog.fileUrl.split("/").pop()}
                          </p>
                        </div>

                        <a
                          href={getFilePreviewUrl(blog.fileUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative inline-flex items-center gap-2 
                            text-white rounded-full px-6 py-2.5 
                            bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                            bg-[length:200%_200%] 
                            font-bold text-xs 
                            shadow-[0_10px_30px_-8px_rgba(236,72,153,0.7)]
                            hover:shadow-[0_16px_40px_-8px_rgba(140,91,255,0.9)]
                            transition-all duration-300 overflow-hidden flex-shrink-0"
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full 
                            transition-transform duration-1000 ease-out 
                            bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                          <span className="relative">Open File</span>
                        </a>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4
                      border-t border-[var(--border-color)]/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full 
                        bg-gradient-to-br from-[var(--primary)] to-[#EC4899] 
                        flex items-center justify-center text-white text-xs font-black
                        shadow-[0_6px_18px_-4px_rgba(236,72,153,0.6)]">
                        FC
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                          Written by Finance Committee
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          FOSTIIMA Chapter
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full 
                        bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                        text-[var(--text-muted)] hover:text-[var(--primary)] 
                        hover:border-[var(--primary)]/40 
                        text-xs font-semibold transition-all
                        shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                      Close
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BlogPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    img: "",
    summary: "",
    category: ["Finance"],
    fileUrl: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const blogListRef = React.useRef<HTMLDivElement>(null);
  const [multiDropdownOpen, setMultiDropdownOpen] = useState(false);
  const multiDropdownRef = useRef<HTMLDivElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileFile, setFileFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat: string) => {
    if (newBlog.category.includes(cat)) {
      setNewBlog({
        ...newBlog,
        category: newBlog.category.filter((c) => c !== cat),
      });
    } else {
      setNewBlog({ ...newBlog, category: [...newBlog.category, cat] });
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setNewBlog({
      ...newBlog,
      category: newBlog.category.filter((c) => c !== cat),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBlog.title || !newBlog.summary || (!imageFile && !isEditing)) {
      toast.error("Please fill all required fields and select an image.");
      return;
    }

    try {
      if (isEditing && editingBlogId) {
        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("summary", newBlog.summary);
        formData.append("category", newBlog.category.join(","));
        if (imageFile) formData.append("image", imageFile);
        else formData.append("image", newBlog.img);
        if (fileFile) formData.append("file", fileFile);
        else formData.append("fileUrl", newBlog.fileUrl || "");

        const res = await fetch(`/api/blog/${editingBlogId}`, {
          method: "PUT",
          body: formData,
        });
        const data = await res.json();

        if (res.ok) {
          const updatedBlogs = blogs.map((b) =>
            b.id === editingBlogId ? data : b
          );
          setBlogs(updatedBlogs);
          toast.success("Blog updated!");
        } else {
          toast.error(data.error || "Update failed.");
        }
      } else {
        const formData = new FormData();
        formData.append("title", newBlog.title);
        formData.append("summary", newBlog.summary);
        formData.append("category", newBlog.category.join(","));
        if (imageFile) formData.append("image", imageFile);
        if (fileFile) formData.append("file", fileFile);

        const res = await fetch("/api/create-blog", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (res.ok) {
          setBlogs([data, ...blogs]);
          toast.success("Blog created successfully!");
        } else {
          toast.error(data.error || "Creation failed.");
        }
      }

      setNewBlog({
        title: "",
        summary: "",
        category: ["Finance"],
        img: "",
        fileUrl: "",
      });
      setImagePreview("");
      setImageFile(null);
      setFileFile(null);
      setIsEditing(false);
      setEditingBlogId(null);
      setShowCreate(false);
    } catch (err) {
      console.error("Blog submit error:", err);
      toast.error("Something went wrong.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setNewBlog({ ...newBlog, img: url });
      setImageFile(file);
    }
  };

  const filteredBlogs = selectedCategories.includes("All")
    ? blogs
    : blogs.filter((blog) =>
        blog.category.some((cat) => selectedCategories.includes(cat))
      );
  const blogsToDisplay = showAll ? blogs : filteredBlogs;

  const handleLoadMore = () => setShowAll(true);

  const handleDiscoverNow = () => {
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        multiDropdownRef.current &&
        !multiDropdownRef.current.contains(event.target as Node)
      ) {
        setMultiDropdownOpen(false);
      }
    }
    if (multiDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [multiDropdownOpen]);

  const handleMultiSelect = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newSelected = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories.filter((c) => c !== "All"), cat];
      if (newSelected.length === 0) newSelected = ["All"];
      setSelectedCategories(newSelected);
    }
    setShowAll(false);
  };

  const categories = [
    "Finance",
    "Website",
    "Case Study",
    "Marketing",
    "Product",
    "Tech",
    "Other",
  ];

  const allowedEmails = useMemo(
    () => [
      "ashishmishra19122000@gmail.com",
      "19122000ashishmishra@gmail.com",
      "27ashish.mishra@fostiima.org",
      "27shagun.malhotra@fostiima.org",
      "fincomm@fostiima.org",
    ],
    []
  );
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("fcUserEmail");
    setCanEdit(allowedEmails.includes(email || ""));
  }, [allowedEmails]);

  const handleEditBlog = (blog: Blog) => {
    setIsEditing(true);
    setEditingBlogId(blog.id);
    setShowCreate(true);
    setNewBlog({
      title: blog.title,
      img: blog.img,
      summary: blog.summary,
      category: blog.category,
      fileUrl: blog.fileUrl || "",
    });
    setOpenBlog(null);
    setTimeout(() => {
      blogListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        toast.success("Blog deleted!");
        setOpenBlog(null);
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch {
      toast.error("Failed to delete blog.");
    }
  };

  const faqs = [
    {
      q: "How can I participate in finance workshops?",
      a: "Watch for event announcements on our Events page, or follow us on Instagram. Most workshops are open to all FOSTIIMA students on a first-come basis.",
    },
    {
      q: "What types of events does the committee organize?",
      a: "We run finance quizzes (FinQuest), stock market simulations (StockiFy), budget debates (VITT-MANTHAN), workshops, guest lectures, and networking sessions.",
    },
    {
      q: "Do I need prior finance knowledge to join?",
      a: "Not at all. Our events are designed for beginners and enthusiasts alike — many sessions start from the fundamentals.",
    },
    {
      q: "How do I propose a new student event?",
      a: "Reach out to us at fincomm@fostiima.org with a short brief, and the committee will get back to you about feasibility and budget.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col relative">
      <style>{`
         .blog-modal-content a {
    color: var(--primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
    font-weight: 600;
    transition: color 0.2s;
  }
  .blog-modal-content a:hover {
    color: var(--primary-light);
  }
  .blog-modal-content p {
    margin-bottom: 1.15rem;
  }
  .blog-modal-content p:last-child {
    margin-bottom: 0;
  }
  .blog-modal-content h1,
  .blog-modal-content h2,
  .blog-modal-content h3 {
    color: var(--text-primary);
    font-weight: 800;
    margin: 1.5rem 0 0.75rem;
    line-height: 1.3;
  }
  .blog-modal-content ul,
  .blog-modal-content ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  .blog-modal-content ul { list-style: disc; }
  .blog-modal-content ol { list-style: decimal; }
  .blog-modal-content li {
    margin-bottom: 0.5rem;
  }
  .blog-modal-content blockquote {
    border-left: 3px solid var(--primary);
    padding-left: 1rem;
    margin: 1.25rem 0;
    font-style: italic;
    color: var(--text-muted);
  }
  .blog-modal-content img {
    border-radius: 1rem;
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
  }
  .blog-modal-content strong { color: var(--text-primary); font-weight: 700; }

  /* ============================================
     HIGH-CONTRAST BACKGROUND GRID
  ============================================ */
  .blog-bg-grid {
    background-image:
      linear-gradient(rgba(140, 91, 255, 0.10) 1px, transparent 1px),
      linear-gradient(90deg, rgba(140, 91, 255, 0.10) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  html.dark .blog-bg-grid,
  [data-theme="dark"] .blog-bg-grid,
  .dark .blog-bg-grid {
    background-image:
      linear-gradient(rgba(180, 140, 255, 0.18) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180, 140, 255, 0.18) 1px, transparent 1px);
  }
      `}</style>

      <Navbar />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, var(--primary) 0%, transparent 40%), radial-gradient(ellipse at 90% 30%, #EC4899 0%, transparent 40%), radial-gradient(ellipse at 50% 100%, #06B6D4 0%, transparent 45%)",
          opacity: 0.07,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 blog-bg-grid"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 55%, transparent 100%)",
        }}
      />

      <div className="flex-grow flex flex-col relative z-10">
        {/* ================= HERO ================= */}
        <section className="relative w-full flex flex-col items-center pt-28 pb-16 px-4 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 
              bg-gradient-to-b from-[var(--bg-primary)]/0 via-[var(--bg-secondary)]/40 to-[var(--bg-primary)]/0"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-[var(--primary)]/25 blur-[140px]"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#EC4899]/20 blur-[130px]"
          />

          <div className="relative text-center mb-14 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[1.05] tracking-tight mb-5">
              Explore our{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                Finance Insights
              </span>
            </h1>

            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] mb-6
              shadow-[0_0_20px_rgba(236,72,153,0.7)]" />

            <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest news, workshops, and events organized
              by the Finance Committee.
            </p>
          </div>

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            className="relative w-full max-w-[1120px] mx-auto"
          >
            <div
              className="relative rounded-[32px] p-[1.5px] 
                bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
                shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55),0_20px_60px_-30px_rgba(0,0,0,0.6)]"
            >
              <div className="relative rounded-[30px] bg-[var(--card-bg)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.05] via-transparent to-[#06B6D4]/[0.05]"
                />
                <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[320px] lg:min-h-[500px] overflow-hidden">
                  <Image
                    src="/images/blog.jpg"
                    alt="Featured blog"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
                  <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold tracking-[0.2em] uppercase
                    shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Featured
                  </div>
                </div>

                <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full 
                    bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 
                    text-[10px] font-bold tracking-[0.2em] uppercase w-fit mb-5
                    shadow-[0_4px_16px_-4px_rgba(140,91,255,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                    Finance Committee
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] leading-[1.15] tracking-tight mb-4">
                    How to Make the Most of Finance Workshops
                  </h2>

                  <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8 max-w-lg">
                    Tips and insights from our Finance Committee events to help
                    students understand budgeting, investing, and personal
                    finance effectively.
                  </p>

                  <div className="mb-8">
                    <button
                      onClick={handleDiscoverNow}
                      className="group relative inline-flex items-center gap-2.5 text-white rounded-full px-7 py-3 
                        bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-[length:200%_200%] 
                        font-bold text-sm 
                        shadow-[0_12px_32px_-8px_rgba(236,72,153,0.7)]
                        hover:shadow-[0_20px_50px_-10px_rgba(140,91,255,0.9)]
                        transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 ease-out 
                        bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <span className="relative">Discover Now</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--border-color)]/60">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[var(--primary)]/40 blur-md" />
                        <Image
                          src="/images/joyamathur.jpg"
                          alt="Joya Mathur"
                          width={44}
                          height={44}
                          className="relative rounded-full object-cover border-2 border-[var(--card-bg)]
                            shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)]"
                        />
                      </div>
                      <div className="text-[var(--text-primary)]">
                        <div className="font-bold text-sm">Joya Mathur</div>
                        <div className="text-[var(--text-muted)] text-xs">23 September 2025</div>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                      bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                      text-[var(--text-muted)] text-xs font-semibold
                      shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]">
                      <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 5v2.5l1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= BLOG LIST ================= */}
        <section ref={blogListRef} className="relative w-full py-20 px-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-bold">
                  The Archive
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight mt-2">
                  All{" "}
                  <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                    Blog Posts
                  </span>
                </h2>
                <p className="text-[var(--text-muted)] text-sm md:text-base mt-3">
                  {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"} · Curated by the Finance Committee
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative min-w-[210px]" ref={multiDropdownRef}>
                  <button
                    type="button"
                    className="group w-full px-5 py-3 rounded-2xl font-bold text-sm 
                      flex justify-between items-center gap-3 
                      bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] 
                      hover:border-[var(--primary)]/50 hover:shadow-sm transition-all
                      shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
                    onClick={() => setMultiDropdownOpen((v) => !v)}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M10 18h4" />
                      </svg>
                      <span className="truncate">
                        {selectedCategories[0] === "All" ? "All Categories" : selectedCategories.join(", ")}
                      </span>
                    </span>
                    <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${multiDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {multiDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 
                          rounded-2xl p-2 flex flex-col gap-0.5 
                          bg-[var(--card-bg)] border border-[var(--border-color)] 
                          backdrop-blur-xl
                          shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)]"
                      >
                        <button
                          onClick={() => handleMultiSelect("All")}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                          <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors ${
                            selectedCategories[0] === "All" ? "bg-[var(--primary)] border-[var(--primary)]" : "border-[var(--border-color)]"
                          }`}>
                            {selectedCategories[0] === "All" && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[var(--primary)] font-bold text-sm">All</span>
                        </button>

                        {categories.map((cat) => {
                          const active = selectedCategories.includes(cat);
                          return (
                            <button
                              key={cat}
                              onClick={() => handleMultiSelect(cat)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                              <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-colors ${
                                active ? "bg-[var(--primary)] border-[var(--primary)]" : "border-[var(--border-color)]"
                              }`}>
                                {active && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-[var(--text-primary)] font-medium text-sm">{cat}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {canEdit && (
                  <button
                    onClick={() => setShowCreate((v) => !v)}
                    className="group relative inline-flex items-center justify-center gap-2 
                      px-6 py-3 rounded-2xl font-bold text-sm text-white 
                      bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] 
                      bg-[length:200%_200%] 
                      shadow-[0_12px_32px_-8px_rgba(236,72,153,0.7)]
                      hover:shadow-[0_20px_50px_-10px_rgba(140,91,255,0.9)]
                      transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="relative">
                      {isEditing && showCreate ? "Editing..." : "Create New"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {canEdit && showCreate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  className="overflow-hidden mb-14"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="relative rounded-3xl p-[1.5px] 
                      bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
                      shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55)] 
                      max-w-2xl mx-auto"
                  >
                    <div className="relative rounded-[22px] bg-[var(--card-bg)] p-6 sm:p-10 flex flex-col gap-5
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-[var(--primary)]/[0.04] via-transparent to-[#06B6D4]/[0.04]" />

                      <button
                        type="button"
                        onClick={() => {
                          setShowCreate(false);
                          setIsEditing(false);
                          setEditingBlogId(null);
                        }}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full 
                          bg-[var(--bg-secondary)] border border-[var(--border-color)] 
                          text-[var(--primary)] font-bold text-xl flex items-center justify-center 
                          hover:bg-[var(--primary)]/10 transition-colors
                          shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]"
                        aria-label="Close"
                      >
                        ×
                      </button>

                      <div className="text-center mb-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full 
                          bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                          text-[var(--primary)] text-[10px] font-bold tracking-[0.2em] uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                          {isEditing ? "Editing Post" : "New Post"}
                        </div>
                        <h3 className="text-2xl font-black text-[var(--text-primary)]">
                          {isEditing ? "Update" : "Create New"}{" "}
                          <span className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] bg-clip-text text-transparent">Blog</span>
                        </h3>
                      </div>

                      <input
                        name="title"
                        value={newBlog.title}
                        onChange={handleInput}
                        placeholder="Blog Title"
                        required
                        className="w-full px-5 py-3 text-base rounded-xl bg-[var(--input-bg)] text-[var(--text-primary)] 
                          placeholder:text-[var(--text-dim)] border border-[var(--border-color)] 
                          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all
                          shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                      />

                      <input id="blog-image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <label htmlFor="blog-image-upload" className="w-full flex items-center justify-center gap-2.5 
                        px-5 py-3 rounded-xl font-bold text-sm cursor-pointer 
                        bg-[var(--input-bg)] text-[var(--primary)] 
                        border border-dashed border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-colors
                        shadow-[0_4px_12px_-4px_rgba(140,91,255,0.35)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        {imagePreview ? "Change Image" : "Upload Cover Image"}
                      </label>

                      {imagePreview && (
                        <div className="w-full h-48 rounded-xl flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden
                          shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
                          <Image src={imagePreview} alt="Preview" width={240} height={240} className="w-full h-full object-contain" />
                        </div>
                      )}

                      <div
                        ref={categoryRef}
                        className="relative w-full rounded-xl min-h-[48px] px-5 py-3 cursor-pointer 
                          flex flex-wrap items-center gap-2 bg-[var(--input-bg)] border border-[var(--border-color)]
                          shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                        onClick={() => setShowCategoryDropdown((v) => !v)}
                      >
                        {newBlog.category.length === 0 && (
                          <span className="text-[var(--text-dim)] text-sm">Select categories...</span>
                        )}
                        {newBlog.category.map((cat) => (
                          <span key={cat} className="inline-flex items-center gap-1 rounded-full px-3 py-1 
                            text-xs font-bold uppercase tracking-wider 
                            bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20
                            shadow-[0_2px_8px_-2px_rgba(140,91,255,0.4)]">
                            {cat}
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCategory(cat);
                              }}
                              className="ml-0.5 cursor-pointer font-bold text-sm leading-none hover:text-[var(--primary-light)]"
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        <span className="flex-1" />
                        <svg className={`w-4 h-4 text-[var(--text-dim)] transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>

                        <AnimatePresence>
                          {showCategoryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 
                                rounded-xl p-2 flex flex-col gap-0.5 bg-[var(--card-bg)] border border-[var(--border-color)]
                                shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]"
                            >
                              {categories.map((cat) => {
                                const active = newBlog.category.includes(cat);
                                return (
                                  <button
                                    type="button"
                                    key={cat}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCategorySelect(cat);
                                    }}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm font-medium 
                                      text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                                  >
                                    {cat}
                                    {active && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[var(--primary)]">
                                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <input
                        id="blog-file-upload"
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileUrl = URL.createObjectURL(file);
                            setNewBlog({ ...newBlog, fileUrl });
                            setFileFile(file);
                          }
                        }}
                        className="hidden"
                      />
                      <label htmlFor="blog-file-upload" className="w-full flex items-center justify-center gap-2.5 
                        px-5 py-3 rounded-xl font-bold text-sm cursor-pointer 
                        bg-[var(--input-bg)] text-[var(--primary)] 
                        border border-dashed border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 transition-colors
                        shadow-[0_4px_12px_-4px_rgba(140,91,255,0.35)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {newBlog.fileUrl ? "Change File" : "Attach File (PDF/DOC)"}
                      </label>

                      {newBlog.fileUrl && (
                        <div className="w-full rounded-xl px-4 py-3 text-sm flex justify-between items-center 
                          bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)]
                          shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                          <span className="truncate pr-3">{newBlog.fileUrl.split("/").pop()}</span>
                          <a href={newBlog.fileUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--primary)] underline flex-shrink-0">
                            View
                          </a>
                        </div>
                      )}

                      <textarea
                        name="summary"
                        value={newBlog.summary}
                        onChange={handleInput}
                        placeholder="Blog Content — You can include links like <a href='https://fc-fbs.vercel.app/'>Finance Committee</a>. HTML tags are supported."
                        required
                        rows={8}
                        className="w-full px-5 py-3 text-base rounded-xl bg-[var(--input-bg)] text-[var(--text-primary)] 
                          placeholder:text-[var(--text-dim)] border border-[var(--border-color)] 
                          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-y
                          shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                      />

                      <button
                        type="submit"
                        className="group relative w-full py-3.5 rounded-xl font-bold text-sm text-white 
                          bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-[length:200%_200%] 
                          shadow-[0_16px_40px_-12px_rgba(236,72,153,0.7)]
                          hover:shadow-[0_24px_60px_-12px_rgba(140,91,255,0.95)]
                          transition-all duration-300 overflow-hidden"
                      >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="relative">{isEditing ? "Update Blog" : "Publish Blog"}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="grid gap-8"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
            >
              {blogsToDisplay.map((blog, idx) => (
                <BlogCard
                  key={blog.id ?? idx}
                  index={idx}
                  img={blog.img}
                  title={blog.title}
                  summary={blog.summary}
                  category={blog.category}
                  fileUrl={blog.fileUrl}
                  onOpen={() => setOpenBlog(blog)}
                  onEdit={blog.id ? () => handleEditBlog(blog) : undefined}
                  onDelete={blog.id ? () => handleDeleteBlog(blog.id) : undefined}
                  canEdit={canEdit}
                />
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-20 rounded-3xl border border-dashed border-[var(--border-color)]
                shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-3xl
                  shadow-[0_8px_24px_-6px_rgba(140,91,255,0.5)]">
                  📚
                </div>
                <p className="text-lg font-bold text-[var(--text-primary)]">No blog posts yet</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Check back soon for fresh insights from the Finance Committee.
                </p>
              </div>
            )}

            {!showAll && blogs.length > filteredBlogs.length && (
              <div className="w-full flex justify-center mt-14">
                <button
                  onClick={handleLoadMore}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm 
                    bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] 
                    hover:border-[var(--primary)]/50 
                    shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]
                    hover:shadow-[0_24px_60px_-16px_rgba(140,91,255,0.7)]
                    transition-all duration-300"
                >
                  Load More Posts
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="relative w-full py-16 px-4">
          <div className="max-w-[1100px] mx-auto">
            <div className="relative rounded-[32px] p-[1.5px] 
              bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
              shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55),0_20px_60px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative rounded-[30px] bg-[var(--card-bg)] px-6 sm:px-10 lg:px-14 py-12 sm:py-16 flex flex-col items-center overflow-hidden
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-64 bg-[var(--primary)]/25 blur-[100px]" />

                <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] text-center leading-tight tracking-tight mb-4">
                  Stay Updated{" "}
                  <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                    With Our Newsletter
                  </span>
                </h2>

                <p className="relative text-[var(--text-muted)] text-base md:text-lg text-center max-w-2xl mb-10 leading-relaxed">
                  Subscribe to our newsletter for the latest updates and insights.
                </p>

                <form
                  className="relative w-full max-w-xl flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = (
                      e.currentTarget.elements.namedItem("newsletterEmail") as HTMLInputElement
                    )?.value;
                    if (email) {
                      window.location.href = `/?waitlist=${encodeURIComponent(email)}#waitlist-form-section`;
                    }
                  }}
                >
                  <input
                    name="newsletterEmail"
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    className="flex-1 px-5 py-3.5 rounded-2xl text-sm bg-[var(--input-bg)] text-[var(--text-primary)] 
                      placeholder:text-[var(--text-dim)] border border-[var(--border-color)] 
                      focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all
                      shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white 
                      bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-[length:200%_200%] 
                      shadow-[0_16px_40px_-12px_rgba(236,72,153,0.7)]
                      hover:shadow-[0_24px_60px_-12px_rgba(140,91,255,0.95)]
                      transition-all duration-300 overflow-hidden flex-shrink-0"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative">Join Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>

                <p className="relative text-xs text-[var(--text-muted)] mt-5 text-center">
                  By joining you agree to our{" "}
                  <span className="text-[var(--primary)] underline cursor-pointer font-semibold">
                    Terms and Conditions
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="relative w-full py-20 px-4">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary)] font-bold">Help Center</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight mt-2 mb-6">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-[var(--primary)] to-[#EC4899] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-md mb-10">
                Find answers to common questions about the Finance Committee&apos;s events, workshops, and student initiatives.
              </p>

              <div className="rounded-2xl p-6 bg-[var(--card-bg)] border border-[var(--border-color)]
                shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[var(--primary)] mb-3">
                  Committee Contact
                </div>
                <div className="space-y-3 text-sm text-[var(--text-primary)]">
                  <div className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--primary)] mt-0.5 flex-shrink-0">
                      <path d="M12 21s-8-6.5-8-12a8 8 0 1 1 16 0c0 5.5-8 12-8 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    <span className="text-[var(--text-muted)]">
                      Plot No. HAF-1, Pocket 2, Dwarka Sector 9, Dwarka, New Delhi, Delhi, 110077
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--primary)] flex-shrink-0">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    <a href="mailto:fincomm@fostiima.org" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                      fincomm@fostiima.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 
                      bg-[var(--card-bg)] border 
                      ${isOpen 
                        ? "border-[var(--primary)]/40 shadow-[0_20px_50px_-16px_rgba(140,91,255,0.6)]" 
                        : "border-[var(--border-color)] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.5)]"}`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[var(--bg-secondary)]/40 transition-colors"
                    >
                      <span className="font-bold text-base md:text-lg text-[var(--text-primary)]">{faq.q}</span>
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                          ? "bg-[var(--primary)] text-white rotate-45 shadow-[0_8px_20px_-4px_rgba(140,91,255,0.7)]" 
                          : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                      }`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <BlogModal
        blog={openBlog}
        onClose={() => setOpenBlog(null)}
        canEdit={canEdit}
        onEdit={openBlog ? () => handleEditBlog(openBlog) : undefined}
        onDelete={openBlog ? () => handleDeleteBlog(openBlog.id) : undefined}
      />
    </div>
  );
}