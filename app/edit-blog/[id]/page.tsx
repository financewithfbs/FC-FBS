"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: [] as string[],
    img: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();

        console.log("Fetched blog data:", data);

        setForm({
          title: data.title || "",
          summary: data.summary || "",
          category: data.category || [],
          img: data.img || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        toast.error("Failed to load blog data");
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.title || !form.summary) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Blog updated successfully!");
        router.push("/blog");
      } else {
        const error = await res.json();
        toast.error(error.error || "Update failed");
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(",").map((cat) => cat.trim());
    setForm({ ...form, category: categories });
  };

  /* ---------- Shared input styling ---------- */
  const inputBase =
    "w-full rounded-2xl p-3.5 text-sm transition-all duration-300 " +
    "border-2 border-[var(--border-color)] " +
    "bg-[var(--input-bg)] text-[var(--text-primary)] " +
    "placeholder:text-[var(--text-dim)] " +
    "focus:outline-none focus:border-[var(--primary)] " +
    "focus:ring-2 focus:ring-[var(--primary)]/40 " +
    "focus:shadow-[0_0_0_5px_rgba(140,91,255,0.14),0_8px_24px_-12px_rgba(140,91,255,0.5)] " +
    "hover:border-[var(--primary-light)] " +
    "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]";

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
        <Navbar />

        {/* Ambient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 20%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 85% 80%, #EC4899 0%, transparent 45%)",
            opacity: 0.08,
          }}
        />

        <div className="flex items-center justify-center min-h-[60vh] relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[var(--primary)] rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="relative inline-block animate-spin rounded-full h-14 w-14 border-4 border-solid border-[var(--primary)] border-r-transparent shadow-[0_0_30px_rgba(140,91,255,0.5)]" />
            </div>
            <p className="mt-5 text-[var(--text-muted)] font-semibold tracking-wide">
              Loading blog data...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col relative overflow-hidden">
      {/* ============================================
          AMBIENT BACKGROUND
      ============================================ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 15% 15%, var(--primary) 0%, transparent 45%), radial-gradient(ellipse at 85% 85%, #EC4899 0%, transparent 45%)",
          opacity: 0.09,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.3] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,91,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,91,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full 
          bg-[var(--primary)]/25 blur-[130px] z-0"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 25, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 -right-24 w-[340px] h-[340px] rounded-full 
          bg-[#EC4899]/20 blur-[120px] z-0"
      />

      <Navbar />

      <div className="flex-grow flex items-center justify-center py-16 px-4 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Gradient shell wrapper */}
          <div
            className="rounded-[28px] p-[1.5px] 
              bg-gradient-to-br from-[var(--primary)]/60 via-[#EC4899]/40 to-[#06B6D4]/60 
              shadow-[0_40px_100px_-30px_rgba(140,91,255,0.55),0_20px_60px_-30px_rgba(0,0,0,0.6)]"
          >
            <div
              className="relative rounded-[26px] bg-[var(--card-bg)] p-8 md:p-10 overflow-hidden"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 
                  bg-gradient-to-br from-[var(--primary)]/[0.04] via-transparent to-[#06B6D4]/[0.04]"
              />

              {/* Ambient glow behind heading */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 
                  w-64 h-40 bg-[var(--primary)]/25 blur-[80px]"
              />

              <div className="relative">
                {/* ---------- Heading ---------- */}
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 leading-tight tracking-tight">
                    Edit{" "}
                    <span className="bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                      Blog Post
                    </span>
                  </h1>

                  <div
                    className="mx-auto mb-4 h-1 w-20 rounded-full 
                      bg-gradient-to-r from-[var(--primary)] via-[#EC4899] to-[#06B6D4]
                      shadow-[0_0_14px_rgba(236,72,153,0.7)]"
                  />

                  <p className="text-[var(--text-muted)] text-sm">
                    Update your blog post information below
                  </p>
                </div>

                {/* ---------- Form ---------- */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold mb-2 text-sm">
                      <span className="text-base">🏆</span>
                      Title
                      <span className="text-[#EC4899]">*</span>
                    </label>
                    <input
                      className={inputBase}
                      placeholder="Enter blog title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold mb-2 text-sm">
                      <span className="text-base">📝</span>
                      Summary
                      <span className="text-[#EC4899]">*</span>
                    </label>
                    <textarea
                      className={inputBase + " resize-y"}
                      placeholder="Enter blog summary"
                      value={form.summary}
                      onChange={(e) => setForm({ ...form, summary: e.target.value })}
                      rows={5}
                      required
                    />
                    <p className="text-xs text-[var(--text-dim)] mt-2 flex items-center gap-1.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[var(--primary)] flex-shrink-0"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      You can include HTML links like: {"<a href='https://example.com'>Link</a>"}
                    </p>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold mb-2 text-sm">
                      <span className="text-base">🖼️</span>
                      Image URL
                    </label>
                    <input
                      className={inputBase}
                      placeholder="Enter image URL"
                      value={form.img}
                      onChange={(e) => setForm({ ...form, img: e.target.value })}
                    />

                    {form.img && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-[var(--border-color)] relative h-48
                        shadow-[0_16px_40px_-16px_rgba(140,91,255,0.5)]">
                        <Image
                          src={form.img}
                          alt="Preview"
                          fill
                          unoptimized
                          className="object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold mb-2 text-sm">
                      <span className="text-base">🏷️</span>
                      Categories
                    </label>
                    <input
                      className={inputBase}
                      placeholder="Finance, Website, Case Study (comma separated)"
                      value={form.category.join(", ")}
                      onChange={handleCategoryChange}
                    />

                    {form.category.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.category
                          .filter((c) => c.trim() !== "")
                          .map((cat, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.05 }}
                              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                bg-[var(--primary)]/10 text-[var(--primary)] 
                                border border-[var(--primary)]/20
                                shadow-[0_2px_8px_-2px_rgba(140,91,255,0.4)]"
                            >
                              {cat}
                            </motion.span>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)] font-bold">
                      Confirm
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <motion.button
                      type="button"
                      onClick={() => router.back()}
                      className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all duration-300
                        bg-[var(--bg-secondary)] text-[var(--text-primary)]
                        border border-[var(--border-color)]
                        hover:border-[var(--primary)]/40
                        shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]
                        hover:shadow-[0_12px_30px_-12px_rgba(140,91,255,0.5)]"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 rounded-2xl font-bold text-sm text-white transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary) 0%, #EC4899 100%)",
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
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="white"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="white"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          <>
                            Update Blog
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="group-hover:translate-x-0.5 transition-transform"
                            >
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}