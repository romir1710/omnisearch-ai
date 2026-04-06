# 🔍 OmniSearch AI

> **An accessible, AI-powered search engine prototype** — built with a focus on WCAG 2.2 AA compliance, inclusive design, and modern web aesthetics.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)
![Accessibility](https://img.shields.io/badge/WCAG-2.2_AA-purple)

---

## ✨ Overview

OmniSearch AI is a search engine prototype that puts **accessibility first**. Every element — from the search bar to the results page — is designed to be usable by everyone, including users with visual, motor, cognitive, and auditory disabilities.

The standout feature is **AI Access View**: a tool that transforms complex web pages into clean, readable formats with adjustable text, dyslexia-friendly fonts, and simplified layouts.

---

## 🎯 Key Features

### 🔎 Smart Search
- Clean, minimal search homepage inspired by modern design
- Dynamic search results with rich metadata (titles, descriptions, URLs)
- Responsive layout across all device sizes

### ♿ AI Access View
- **Simplified Reading Mode** — strips away clutter for a distraction-free experience
- **Dyslexia-Friendly Font** — toggle OpenDyslexic for improved readability
- **Adjustable Text Size** — scale text up or down to your preference
- **High-Contrast Controls** — clear, large interactive elements

### 🛡️ Accessibility Panel
- **Theme Switcher** — light, dark, and high-contrast modes
- **Skip Navigation Links** — keyboard users can jump straight to content
- **Screen Reader Optimised** — semantic HTML, ARIA labels, and live regions throughout
- **Reduced Motion** — respects `prefers-reduced-motion` system settings
- **Focus Management** — visible focus rings and logical tab order

### 🎨 Modern Design
- Aurora-inspired animated background
- Glassmorphism card effects with subtle hover animations
- Google Fonts (Inter) for premium typography
- Smooth page transitions with Framer Motion

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, SSR, and file-based routing |
| **React 19** | Component architecture and state management |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations and page transitions |
| **Lucide React** | Consistent, accessible icon system |
| **CSS Custom Properties** | Theming (light, dark, high-contrast) |

---

## 📁 Project Structure

```
omnisearch-ai/
├── public/               # Static assets (SVGs, favicon)
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles, theme tokens, aurora background
│   │   ├── layout.js     # Root layout with ThemeProvider and Header
│   │   ├── page.js       # Search homepage
│   │   └── results/
│   │       └── page.js   # Search results page with AI Access View
│   ├── components/
│   │   ├── AccessibilityPanel.js  # Floating a11y controls
│   │   ├── AIAccessView.js        # Simplified reading mode
│   │   ├── Header.js              # Navigation header
│   │   └── SkipLink.js            # Skip-to-content link
│   ├── context/
│   │   └── ThemeContext.js        # Theme state (light/dark/high-contrast)
│   └── data/
│       └── mockResults.js         # Sample search result data
├── package.json
├── next.config.mjs
├── eslint.config.mjs
├── postcss.config.mjs
└── jsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/romir1710/omnisearch-ai.git
cd omnisearch-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ♿ Accessibility Standards

This project targets **WCAG 2.2 Level AA** compliance:

- ✅ Semantic HTML5 elements (`<main>`, `<nav>`, `<section>`, `<form role="search">`)
- ✅ Keyboard-navigable with visible focus indicators
- ✅ ARIA landmarks, labels, and live regions
- ✅ Colour contrast ratios ≥ 4.5:1 (AA)
- ✅ Minimum touch target size of 24×24px (WCAG 2.5.8)
- ✅ `prefers-reduced-motion` support
- ✅ Skip navigation link for keyboard users
- ✅ Multiple theme modes including high contrast

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ and accessibility in mind
</p>
