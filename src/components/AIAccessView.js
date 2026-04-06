"use client";

/**
 * AIAccessView Component - The Hackathon "Wow" Factor
 *
 * WHY: This is the core value proposition of OmniSearch AI. Many websites
 * are inaccessible - poor contrast, missing alt text, confusing navigation.
 * Instead of forcing users to struggle with those sites, we simulate an LLM
 * extracting and simplifying the content into a perfectly accessible overlay.
 *
 * ACCESSIBILITY FEATURES:
 * 1. Focus Trap - keyboard focus stays within the modal (WCAG 2.4.3)
 * 2. role="dialog" + aria-modal="true" - announces as modal to screen readers
 * 3. aria-labelledby - associates the modal with its heading
 * 4. Escape key closes - standard keyboard pattern (WCAG 2.1.1)
 * 5. Return focus to trigger - when closed, focus returns to the button
 *    that opened the modal (WCAG 2.4.3 Focus Order)
 * 6. Built-in TTS - uses Web Speech API for audio output
 * 7. Dyslexia font toggle - scoped to this view for targeted accommodation
 * 8. Dynamic text sizing - goes beyond the global setting for this content
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Volume2, VolumeX, Type, ZoomIn, ZoomOut, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function AIAccessView({ result, onClose, triggerRef }) {
    const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);
    const [textSizeLevel, setTextSizeLevel] = useState(0); // 0 = base, 1 = large, 2 = x-large
    const [isSpeaking, setIsSpeaking] = useState(false);
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    const textSizes = ["1.125rem", "1.375rem", "1.75rem"]; // 18px, 22px, 28px
    const textSizeLabels = ["Normal (18px)", "Large (22px)", "Extra Large (28px)"];

    /**
     * Focus trap + Escape key handler
     * WHY: WCAG 2.4.3 requires that focus does not leave a modal dialog
     * until the user explicitly closes it. Without a focus trap, Tab key
     * would move focus to elements behind the overlay - confusing for both
     * screen reader and keyboard users.
     */
    useEffect(() => {
        // Focus the close button when modal opens
        closeButtonRef.current?.focus();

        const handleKeyDown = (e) => {
            // Close on Escape
            if (e.key === "Escape") {
                handleClose();
                return;
            }

            // Focus trap - keep Tab cycling within the modal
            if (e.key === "Tab") {
                const focusableElements = modalRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );

                if (!focusableElements || focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift+Tab - wrap to last element
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab - wrap to first element
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        // Prevent body scroll while modal is open
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Close handler - returns focus to the trigger element.
     * WHY: WCAG 2.4.3 requires that when a dialog closes, focus returns
     * to the element that opened it. This prevents users from getting
     * "lost" on the page after closing a modal.
     */
    const handleClose = useCallback(() => {
        // Stop any ongoing speech
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);

        onClose();

        // Return focus to the trigger button
        setTimeout(() => {
            triggerRef?.current?.focus();
        }, 50);
    }, [onClose, triggerRef]);

    /**
     * Text-to-Speech using the Web Speech API
     * WHY: Many users with visual or cognitive disabilities prefer to
     * listen to content rather than read it. The Web Speech API is
     * available in all modern browsers and requires no external service.
     */
    const toggleSpeech = useCallback(() => {
        if (!window.speechSynthesis) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const content = result.aiContent;
        const fullText = `
      ${content.heading}. 
      ${content.summary} 
      Steps: ${content.steps.join(". ")}. 
      Important notes: ${content.importantNotes.join(". ")}
    `;

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 0.9; // WHY: Slightly slower rate improves comprehension
        utterance.pitch = 1;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    }, [isSpeaking, result.aiContent]);

    const increaseTextSize = () => {
        setTextSizeLevel((prev) => Math.min(prev + 1, textSizes.length - 1));
    };

    const decreaseTextSize = () => {
        setTextSizeLevel((prev) => Math.max(prev - 1, 0));
    };

    return (
        /* WHY role="dialog" + aria-modal="true": Tells assistive technology
           that this is a modal dialog. Screen readers will announce "dialog"
           and restrict navigation to within this element. */
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-access-view-heading"
            className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md"
        >
            {/* ----------------------------------------------------------------
          Toolbar - Controls for TTS, font, and text size
          WHY: Placed at the top so users discover these controls immediately.
          Each button has clear aria-labels and icons for recognition.
          ---------------------------------------------------------------- */}
            <div
                className="w-full px-4 py-3 flex items-center justify-between flex-wrap gap-2"
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderBottom: "2px solid var(--border-color)",
                }}
                role="toolbar"
                aria-label="AI Access View controls"
            >
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Play / Stop Audio */}
                    <button
                        onClick={toggleSpeech}
                        aria-label={isSpeaking ? "Stop reading aloud" : "Read content aloud using text-to-speech"}
                        aria-pressed={isSpeaking}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                        style={{
                            backgroundColor: isSpeaking ? "#991b1b" : "var(--accent-primary)",
                            color: "#ffffff",
                        }}
                    >
                        {isSpeaking ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                        {isSpeaking ? "Stop Audio" : "Play Audio (TTS)"}
                    </button>

                    {/* Dyslexia Font Toggle */}
                    <button
                        onClick={() => setIsDyslexiaFont(!isDyslexiaFont)}
                        aria-label={isDyslexiaFont ? "Switch to standard font" : "Switch to dyslexia-friendly font"}
                        aria-pressed={isDyslexiaFont}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                        style={{
                            backgroundColor: isDyslexiaFont ? "var(--accent-primary)" : "var(--bg-card)",
                            color: isDyslexiaFont ? "#ffffff" : "var(--text-primary)",
                            border: `2px solid var(--border-color)`,
                        }}
                    >
                        <BookOpen size={18} aria-hidden="true" />
                        Dyslexia Font
                    </button>

                    {/* Text Size Controls */}
                    <div className="flex items-center gap-1" role="group" aria-label="Text size controls">
                        <button
                            onClick={decreaseTextSize}
                            disabled={textSizeLevel === 0}
                            aria-label="Decrease text size"
                            className="p-2.5 rounded-lg transition-colors disabled:opacity-40"
                            style={{
                                backgroundColor: "var(--bg-card)",
                                color: "var(--text-primary)",
                                border: `2px solid var(--border-color)`,
                            }}
                        >
                            <ZoomOut size={18} aria-hidden="true" />
                        </button>
                        <span
                            className="px-3 py-2 text-sm font-medium min-w-[120px] text-center"
                            style={{ color: "var(--text-secondary)" }}
                            aria-live="polite"
                        /* WHY aria-live="polite": Announces the current text size
                           to screen readers when it changes, without interrupting
                           whatever the user is currently hearing. */
                        >
                            {textSizeLabels[textSizeLevel]}
                        </span>
                        <button
                            onClick={increaseTextSize}
                            disabled={textSizeLevel === textSizes.length - 1}
                            aria-label="Increase text size"
                            className="p-2.5 rounded-lg transition-colors disabled:opacity-40"
                            style={{
                                backgroundColor: "var(--bg-card)",
                                color: "var(--text-primary)",
                                border: `2px solid var(--border-color)`,
                            }}
                        >
                            <ZoomIn size={18} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    ref={closeButtonRef}
                    onClick={handleClose}
                    aria-label="Close AI Access View and return to search results"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 group bg-white/50 backdrop-blur hover:bg-white"
                    style={{
                        color: "var(--text-primary)",
                        border: `2px solid var(--border-color)`,
                    }}
                >
                    <X size={18} aria-hidden="true" className="group-hover:rotate-90 transition-transform duration-200" />
                    Close
                </button>
            </div>

            {/* ----------------------------------------------------------------
          Content Area - Simplified, accessible version of the website
          WHY: This is the "AI Access View" content. It's rendered in
          semantic HTML with clear hierarchy (h2 for heading, ol for
          ordered steps, ul for notes). The content is written at B1
          reading level for cognitive accessibility.
          ---------------------------------------------------------------- */}
            <div
                className="flex-1 overflow-y-auto px-4 py-8"
                style={{
                    fontFamily: isDyslexiaFont ? "var(--font-dyslexia)" : "var(--font-primary)",
                    fontSize: textSizes[textSizeLevel],
                }}
            >
                <article
                    className="max-w-3xl mx-auto"
                    aria-labelledby="ai-access-view-heading"
                >
                    {/* Source Attribution */}
                    <div className="mb-6">
                        <span
                            className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                            style={{
                                backgroundColor: "var(--accent-primary)",
                                color: "#ffffff",
                            }}
                        >
                            AI Simplified View
                        </span>
                        <p
                            className="mt-2 text-sm"
                            style={{ color: "var(--text-muted)" }}
                        >
                            Original source:{" "}
                            <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit original website: ${result.url}`}
                                className="underline"
                                style={{ color: "var(--accent-primary)" }}
                            >
                                {result.url}
                            </a>
                        </p>
                    </div>

                    {/* Main Heading */}
                    <h2
                        id="ai-access-view-heading"
                        className="text-3xl font-bold mb-4 leading-tight"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {result.aiContent.heading}
                    </h2>

                    {/* Summary */}
                    <p
                        className="text-lg mb-8 leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {result.aiContent.summary}
                    </p>

                    {/* Step-by-Step Instructions */}
                    <section aria-labelledby="steps-heading">
                        <h3
                            id="steps-heading"
                            className="text-xl font-bold mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Steps to Follow
                        </h3>
                        {/* WHY <ol>: These are sequential steps - an ordered list
                communicates that the order matters. Screen readers will
                announce "1 of 7", "2 of 7", etc. */}
                        <ol className="space-y-3 mb-8 list-none">
                            {result.aiContent.steps.map((step, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg"
                                    style={{ backgroundColor: "var(--bg-secondary)" }}
                                >
                                    <span
                                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm"
                                        style={{
                                            backgroundColor: "var(--accent-primary)",
                                            color: "#ffffff",
                                        }}
                                        aria-hidden="true"
                                    >
                                        {index + 1}
                                    </span>
                                    <span
                                        className="pt-1 leading-relaxed"
                                        style={{ color: "var(--text-primary)" }}
                                    >
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Important Notes */}
                    <section aria-labelledby="notes-heading">
                        <h3
                            id="notes-heading"
                            className="text-xl font-bold mb-4"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Important Things to Know
                        </h3>
                        {/* WHY <ul>: These notes are unordered - they don't need to
                be read in sequence. Screen readers announce "bullet". */}
                        <ul className="space-y-2 mb-8">
                            {result.aiContent.importantNotes.map((note, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg"
                                    style={{
                                        backgroundColor: "#fef3c7",
                                        border: "2px solid #f59e0b",
                                    }}
                                >
                                    <span className="text-lg" aria-hidden="true">
                                        ⚠️
                                    </span>
                                    <span
                                        className="leading-relaxed"
                                        style={{ color: "#1a1a1a" }}
                                    >
                                        {note}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>
            </div>
        </motion.div>
    );
}
