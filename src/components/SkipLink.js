"use client";

/**
 * SkipLink Component
 *
 * WHY: WCAG 2.4.1 (Bypass Blocks) requires a mechanism to skip repetitive
 * navigation and jump directly to the main content. This is essential for:
 *
 * - Screen reader users who don't want to listen to the nav on every page
 * - Keyboard users who don't want to Tab through nav links repeatedly
 *
 * The link is visually hidden by default (positioned off-screen) but becomes
 * visible when it receives keyboard focus, so sighted keyboard users can
 * also benefit from it.
 */

export default function SkipLink() {
    return (
        <a
            href="#main-content"
            className="skip-link"
            /* WHY aria-label: Provides a clear, descriptive label for screen readers
               that explains what this link does, beyond just the visible text. */
            aria-label="Skip navigation and go directly to main content"
        >
            Skip to main content
        </a>
    );
}
