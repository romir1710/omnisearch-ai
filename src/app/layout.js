/**
 * Root Layout — src/app/layout.js
 *
 * WHY: The root layout wraps every page in the application. It provides:
 * 1. <html lang="en"> — WCAG 3.1.1 requires declaring the page language
 *    so screen readers use the correct pronunciation engine
 * 2. Google Fonts (Inter) — loaded with `display: swap` to prevent FOIT
 * 3. ThemeProvider — makes accessibility state available to all components
 * 4. SkipLink — WCAG 2.4.1 bypass mechanism, first element in DOM
 * 5. Header — consistent navigation across all pages
 */

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import SkipLink from "@/components/SkipLink";
import Header from "@/components/Header";

/**
 * WHY Plus Jakarta Sans: It is a modern, highly legible geometric sans font
 * with excellent readability and a premium feel.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap", // WHY: Prevents Flash of Invisible Text for a11y
  variable: "--font-jakarta",
});

/**
 * SEO Metadata
 * WHY: Good meta tags improve discoverability and provide context when
 * the page is shared or indexed. The description communicates the
 * accessibility mission upfront.
 */
export const metadata = {
  title: "OmniSearch AI — Accessible Search for Everyone",
  description:
    "A search engine designed for users with cognitive and visual disabilities. Features AI Access View to simplify and render accessible content from any website.",
};

export default function RootLayout({ children }) {
  return (
    /* WHY lang="en": WCAG 3.1.1 — Language of Page. Screen readers
       use this attribute to select the correct speech synthesis voice.
       Without it, a screen reader might mispronounce English text. */
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col">
        {/* WHY: ThemeProvider wraps everything so any component can
            access and modify accessibility preferences. */}
        <ThemeProvider>
          {/* WHY: SkipLink MUST be the first interactive element in the DOM
              so it's the first thing a keyboard user encounters. */}
          <SkipLink />

          {/* Persistent Header with Accessibility Panel */}
          <Header />

          {/* Page Content — id="main-content" is the skip link target */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
