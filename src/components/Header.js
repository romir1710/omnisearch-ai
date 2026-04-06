"use client";

/**
 * Header Component
 *
 * WHY: The header provides consistent navigation across all pages.
 * It uses semantic <header> and <nav> elements so screen readers can
 * identify the navigation landmark (WCAG 1.3.1 — Info and Relationships).
 *
 * The logo links back to the homepage, and the Accessibility Panel
 * is always visible in the top right for easy access.
 */

import Link from "next/link";
import { Search } from "lucide-react";
import AccessibilityPanel from "./AccessibilityPanel";

export default function Header() {
    return (
        <header
            /* WHY role="banner": Explicitly marks this as the page banner landmark.
               While <header> has an implicit banner role when not nested, being
               explicit ensures consistent behavior across all screen readers. */
            role="banner"
            className="w-full px-6 py-3"
            style={{
                backgroundColor: "var(--bg-primary)",
                borderBottom: "1px solid var(--border-color)",
            }}
        >
            <nav
                /* WHY aria-label on <nav>: When a page has multiple <nav> elements
                   (e.g., breadcrumbs, footer nav), each needs a unique label so
                   screen readers can distinguish them. */
                aria-label="Primary navigation"
                className="max-w-7xl mx-auto flex items-center justify-between"
            >
                {/* Logo / Home Link */}
                <Link
                    href="/"
                    aria-label="OmniSearch AI — Return to homepage"
                    className="flex items-center gap-2 text-xl font-bold no-underline transition-colors"
                    style={{ color: "var(--text-primary)" }}
                >
                    <span
                        className="flex items-center justify-center w-9 h-9 rounded-lg brand-gradient-bg shadow-sm"
                        aria-hidden="true"
                    >
                        <Search size={18} color="#ffffff" />
                    </span>
                    <span className="tracking-tight">
                        <span className="brand-gradient-text">OmniSearch</span>{" "}
                        <span className="font-light brand-gradient-text">AI</span>
                    </span>
                </Link>

                {/* Accessibility Preferences Toggle */}
                <AccessibilityPanel />
            </nav>
        </header>
    );
}
