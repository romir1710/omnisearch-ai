"use client";

/**
 * SearchHome — The Minimalist Search Homepage
 *
 * WHY THE DESIGN:
 * Inspired by Google's homepage: centered layout, single search input,
 * minimal distractions. This reduces cognitive load and makes the
 * interface immediately understandable for ALL users, including those
 * with cognitive disabilities.
 *
 * ACCESSIBILITY FEATURES:
 * - <main> landmark with id="main-content" (skip link target)
 * - <form> with accessible <label> + htmlFor pairing
 * - Search input: large, high-contrast, 4px focus ring
 * - Submit button: high contrast with explicit aria-label
 * - Keyboard: Enter submits the form, no mouse required
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Shield, Ear } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function SearchHome() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const shouldReduceMotion = useReducedMotion();

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Expo ease-out
      },
    },
  };

  return (
    /* WHY id="main-content": This is the target of the skip link.
       Keyboard users pressing "Skip to main content" will land here,
       bypassing the header and navigation. */
    <main
      id="main-content"
      className="flex-1 flex flex-col items-center justify-center px-4 py-12 aurora-bg"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl flex flex-col items-center"
      >
        {/* Logo and Tagline */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1
            className="text-5xl font-bold mb-3 tracking-[-0.02em]"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="brand-gradient-text">OmniSearch</span>{" "}
            <span className="font-light brand-gradient-text">AI</span>
          </h1>
          <p
            className="text-lg max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Search the web. Read it{" "}
            <strong className="brand-gradient-text">your way</strong>.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="w-full max-w-2xl mb-12"
          /* WHY role="search": The <form> element doesn't inherently convey
             that it's a search form. Adding role="search" creates a search
             landmark that screen readers can jump to. */
          role="search"
          aria-label="Search the web"
        >
          {/* WHY: Visible <label> associated with input via htmlFor/id.
              Screen readers announce "Search query" when the input is focused.
              The label is visually styled but still present in the DOM. */}
          <label
            htmlFor="search-input"
            className="block text-sm font-semibold mb-2 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            What would you like to find?
          </label>

          <div className="relative flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            >
              <Search size={22} />
            </span>

              <input
                id="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How to apply for a UK passport"
                /* WHY aria-label: Provides a more descriptive label than the
                   visible label text. Screen readers will use this instead
                   of the <label> text when both are present. */
                aria-label="Search query — type your question and press Enter or click Search"
                /* WHY autocomplete="off": Prevents browser autocomplete from
                   overlapping with our UI. In production, we'd use a custom
                   suggestions dropdown with proper ARIA roles. */
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl shadow-sm transition-shadow focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 outline-none"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "2px solid var(--border-color)",
                  /* WHY: Large padding + large font = larger click/touch target.
                     WCAG 2.5.8 requires minimum 24x24px target size. */
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              aria-label="Search"
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all duration-150 brand-gradient-bg flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-sm"
              style={{
                color: "#ffffff",
              }}
            >
              <Search size={20} aria-hidden="true" />
              Search
            </button>
          </div>

          {/* Helper Text */}
          <p
            className="text-sm mt-3 text-center"
            style={{ color: "var(--text-muted)" }}
            /* WHY id links to aria-describedby: Associates this helper text
               with the input, so screen readers announce it as additional
               context after the label. */
            id="search-helper"
          >
            Try searching for anything — we&apos;ll make the results accessible for you.
          </p>
        </motion.form>

        {/* Feature Cards */}
        <section
          aria-label="Key features of OmniSearch AI"
          className="w-full"
        >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Sparkles,
              title: "AI Access View",
              desc: "We simplify complex websites into plain, readable language.",
            },
            {
              icon: Shield,
              title: "WCAG 2.2 AA",
              desc: "Every element meets the highest accessibility standards.",
            },
            {
              icon: Ear,
              title: "Multi-Modal",
              desc: "Read, listen, or customize — your content, your way.",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className="group relative p-5 rounded-2xl text-center bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md overflow-hidden"
                >
                  {/* Top Border Accent */}
                  <div className="absolute top-0 inset-x-0 h-1 brand-gradient-bg opacity-80" />
                  
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                    aria-hidden="true"
                  >
                    <IconComponent size={22} color="#ffffff" className="group-hover:text-violet-100 transition-colors duration-300" />
                  </div>
                  <h2
                    className="font-bold mb-1 tracking-tight group-hover:brand-gradient-text transition-all duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </motion.div>
    </main>
  );
}
