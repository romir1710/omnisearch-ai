"use client";

/**
 * ThemeContext.js - Accessibility Preferences Provider
 *
 * WHY THIS EXISTS:
 * WCAG 2.2 requires that users can customize their experience based on their
 * needs. This context provides three accessibility modes:
 *
 * - Vision Mode: High contrast colors, larger text, enhanced focus indicators
 * - Cognitive Mode: Dyslexia-friendly font, simplified layouts, larger text
 * - Motor Mode: Larger click targets, enhanced focus indicators
 *
 * The provider applies CSS classes to <body> so that our global stylesheet
 * and Tailwind utilities can respond to the active mode.
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create the context with default values
const ThemeContext = createContext(undefined);

/**
 * Preset configurations for each accessibility mode.
 * Each mode enables the combination of features most helpful for that
 * disability category, based on WCAG 2.2 and cognitive accessibility research.
 */
const MODE_PRESETS = {
  none: {
    highContrast: false,
    largeText: false,
    dyslexiaFont: false,
  },
  vision: {
    highContrast: true,  // WHY: Low-vision users need maximum contrast
    largeText: true,     // WHY: Enlarged text reduces eye strain
    dyslexiaFont: false,
  },
  cognitive: {
    highContrast: false,
    largeText: true,     // WHY: Larger text aids comprehension
    dyslexiaFont: true,  // WHY: Weighted-bottom letters prevent letter-flipping
  },
  motor: {
    highContrast: false,
    largeText: true,     // WHY: Larger targets are easier to hit (Fitts's Law)
    dyslexiaFont: false,
  },
};

export function ThemeProvider({ children }) {
  const [accessibilityMode, setAccessibilityMode] = useState("none");
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  /**
   * Apply a preset mode - updates all individual toggles at once.
   * WHY: Preset modes reduce cognitive load by eliminating the need to
   * configure multiple settings individually.
   */
  const applyMode = useCallback((mode) => {
    const preset = MODE_PRESETS[mode] || MODE_PRESETS.none;
    setAccessibilityMode(mode);
    setHighContrast(preset.highContrast);
    setLargeText(preset.largeText);
    setDyslexiaFont(preset.dyslexiaFont);
  }, []);

  /**
   * Sync state to <body> class names so CSS can respond.
   * WHY: Using class-based theming (rather than inline styles) allows our
   * CSS custom properties and Tailwind utilities to cascade correctly.
   */
  useEffect(() => {
    const body = document.body;

    // Toggle each class based on current state
    body.classList.toggle("high-contrast", highContrast);
    body.classList.toggle("large-text", largeText);
    body.classList.toggle("dyslexia-font", dyslexiaFont);
  }, [highContrast, largeText, dyslexiaFont]);

  const value = {
    accessibilityMode,
    highContrast,
    largeText,
    dyslexiaFont,
    setHighContrast,
    setLargeText,
    setDyslexiaFont,
    applyMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to consume the theme context.
 * WHY: Provides a clean API and throws a helpful error if used outside
 * the provider, preventing silent bugs.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
