"use client";

/**
 * AccessibilityPanel Component
 *
 * WHY: WCAG 2.2 principle of "Robust" requires that content is accessible
 * to a wide range of user agents. This panel lets users self-select their
 * disability category so we can apply the most helpful accommodations.
 *
 * The panel uses:
 * - `aria-expanded` to announce open/closed state to screen readers
 * - `aria-controls` to associate the button with the panel it toggles
 * - `role="radiogroup"` for the mode selection (mutually exclusive options)
 * - `aria-pressed` on individual toggles for on/off state
 * - Escape key to close (WCAG 2.1.1 keyboard accessibility)
 */

import { useState, useRef, useEffect } from "react";
import { Settings, Eye, Brain, Hand, X, Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AccessibilityPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const triggerRef = useRef(null);

    const {
        accessibilityMode,
        highContrast,
        largeText,
        dyslexiaFont,
        setHighContrast,
        setLargeText,
        setDyslexiaFont,
        applyMode,
    } = useTheme();

    /**
     * WHY: Close on Escape key - WCAG 2.1.1 requires all functionality
     * to be operable through a keyboard. Escape to dismiss is a standard
     * pattern users expect for popups/panels.
     */
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                triggerRef.current?.focus(); // Return focus to trigger button
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    /**
     * WHY: Close when clicking outside - standard UX pattern that also
     * helps motor-impaired users who may accidentally click outside.
     */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isOpen &&
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                !triggerRef.current?.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const modes = [
        {
            id: "vision",
            label: "Vision Mode",
            description: "High contrast & large text for low-vision users",
            icon: Eye,
        },
        {
            id: "cognitive",
            label: "Cognitive Mode",
            description: "Dyslexia font & simplified layout for cognitive disabilities",
            icon: Brain,
        },
        {
            id: "motor",
            label: "Motor Mode",
            description: "Larger targets & enhanced focus for motor disabilities",
            icon: Hand,
        },
    ];

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                id="accessibility-toggle"
                onClick={() => setIsOpen(!isOpen)}
                /* WHY aria-expanded: Tells screen readers whether the panel is
                   currently open or closed. This is critical for understanding
                   the current state of collapsible UI elements. */
                aria-expanded={isOpen}
                /* WHY aria-controls: Associates this button with the panel it
                   controls, so screen readers can announce the relationship. */
                aria-controls="accessibility-panel"
                aria-label="Accessibility preferences"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition-colors"
                style={{
                    backgroundColor: isOpen ? "var(--accent-primary)" : "transparent",
                    color: isOpen ? "#ffffff" : "var(--text-primary)",
                    border: `2px solid var(--accent-primary)`,
                }}
            >
                <Settings size={20} aria-hidden="true" />
                <span>Accessibility</span>
            </button>

            {/* Panel Dropdown */}
            {isOpen && (
                <div
                    ref={panelRef}
                    id="accessibility-panel"
                    /* WHY role="dialog": Announces this as a dialog to screen readers,
                       indicating it contains a self-contained interaction. */
                    role="dialog"
                    aria-label="Accessibility preferences panel"
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl p-5 shadow-2xl z-50"
                    style={{
                        backgroundColor: "var(--bg-card)",
                        border: `2px solid var(--border-color)`,
                    }}
                >
                    {/* Panel Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            className="text-lg font-bold"
                            style={{ color: "var(--text-primary)" }}
                            id="a11y-panel-heading"
                        >
                            Accessibility Modes
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close accessibility panel"
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-muted)" }}
                        >
                            <X size={18} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Mode Selection */}
                    <div
                        /* WHY role="radiogroup": These mode buttons are mutually exclusive
                           (only one can be active), which is semantically a radio group. */
                        role="radiogroup"
                        aria-labelledby="a11y-panel-heading"
                        className="space-y-2 mb-5"
                    >
                        {modes.map((mode) => {
                            const isActive = accessibilityMode === mode.id;
                            const IconComponent = mode.icon;

                            return (
                                <button
                                    key={mode.id}
                                    /* WHY role="radio" + aria-checked: Each button behaves as
                                       a radio option - screen readers announce "checked" or
                                       "not checked" for each option. */
                                    role="radio"
                                    aria-checked={isActive}
                                    aria-label={`${mode.label}: ${mode.description}`}
                                    onClick={() => applyMode(isActive ? "none" : mode.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 active:scale-95 ${isActive ? 'brand-gradient-bg' : ''}`}
                                    style={{
                                        backgroundColor: isActive
                                            ? undefined
                                            : "var(--bg-secondary)",
                                        color: isActive ? "#ffffff" : "var(--text-primary)",
                                        border: isActive
                                            ? undefined
                                            : "2px solid transparent",
                                    }}
                                >
                                    <IconComponent size={20} aria-hidden="true" />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm">{mode.label}</div>
                                        <div
                                            className="text-xs mt-0.5"
                                            style={{
                                                color: isActive ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
                                            }}
                                        >
                                            {mode.description}
                                        </div>
                                    </div>
                                    {isActive && <Check size={18} aria-hidden="true" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <hr
                        className="mb-4"
                        style={{ borderColor: "var(--border-color)" }}
                        aria-hidden="true"
                    />

                    {/* Individual Toggles */}
                    <h3
                        className="text-sm font-semibold mb-3"
                        style={{ color: "var(--text-secondary)" }}
                        id="individual-toggles-heading"
                    >
                        Individual Settings
                    </h3>
                    <div
                        className="space-y-2"
                        aria-labelledby="individual-toggles-heading"
                    >
                        {[
                            {
                                id: "toggle-contrast",
                                label: "High Contrast",
                                checked: highContrast,
                                onChange: setHighContrast,
                            },
                            {
                                id: "toggle-large-text",
                                label: "Large Text",
                                checked: largeText,
                                onChange: setLargeText,
                            },
                            {
                                id: "toggle-dyslexia",
                                label: "Dyslexia Font",
                                checked: dyslexiaFont,
                                onChange: setDyslexiaFont,
                            },
                        ].map((toggle) => (
                            <label
                                key={toggle.id}
                                /* WHY htmlFor: Associates the label with its checkbox,
                                   so clicking the label text toggles the checkbox.
                                   This increases the click target size (WCAG 2.5.8). */
                                htmlFor={toggle.id}
                                className="flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200 active:scale-[0.98] hover:bg-gray-200 dark:hover:bg-gray-800"
                                style={{ backgroundColor: "var(--bg-secondary)" }}
                            >
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {toggle.label}
                                </span>
                                <input
                                    type="checkbox"
                                    id={toggle.id}
                                    checked={toggle.checked}
                                    onChange={(e) => toggle.onChange(e.target.checked)}
                                    /* WHY explicit aria-label: Even though the <label> provides
                                       a visual label, an explicit aria-label ensures screen
                                       readers announce the full purpose of the control. */
                                    aria-label={`Toggle ${toggle.label}`}
                                    className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
                                />
                            </label>
                        ))}
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={() => applyMode("none")}
                        aria-label="Reset all accessibility settings to defaults"
                        className="w-full mt-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text-muted)",
                            border: `1px solid var(--border-color)`,
                        }}
                    >
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
}
