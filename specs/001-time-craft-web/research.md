# Research: Time Craft Website

**Branch**: `001-time-craft-web` | **Date**: 2026-03-12  
**Phase**: 0 — Outline & Research

---

## Decision Log

### 1. Internationalization Strategy (i18n)

- **Decision**: Use a simple in-app translation map (`translations.js`) via React Context, no external i18n library.
- **Rationale**: The app only supports two languages (EN/AR). A full i18n library (like `react-i18next`) adds unnecessary bundle weight for just two locales. A flat key/value map per language is easy to maintain and ship fast.
- **Alternatives Considered**: `react-i18next` (overkill for 2 languages), `Intl` browser API (handles formatting, not static strings).
- **RTL Handling**: Toggle `dir="rtl"` on `<html>` element and load `rtl.css` overrides when Arabic is active. Flexbox direction and text alignment flip automatically.

---

### 2. Theme System (Light/Dark)

- **Decision**: CSS custom properties (variables) on `:root` toggled by a `data-theme="dark"` attribute on the `<html>` element.
- **Rationale**: This is the modern, zero-JS-overhead approach. A single attribute swap triggers the entire visual re-theme via CSS cascade — no component re-renders required beyond the toggle itself.
- **Alternatives Considered**: Tailwind dark mode (not in stack), styled-components themes (overkill), class-based toggling (less semantic than `data-theme`).
- **Persistence**: `localStorage.setItem('theme', ...)` called on toggle; read on app boot.

---

### 3. State Management

- **Decision**: React Context API with `useReducer` for Cart and Favorites; simple `useState` for Theme and Language.
- **Rationale**: The app does not require server-side state synchronization. Context API is built into React, avoids installing Redux/Zustand, and is appropriate for the scale (< 30 products, 2 languages, 2 themes).
- **Alternatives Considered**: Zustand (lighter than Redux, but an extra dependency not needed here), Redux Toolkit (heavy overkill for this scope).
- **Persistence**: All context state syncs to `localStorage` on change and hydrates on mount.

---

### 4. Routing

- **Decision**: React Router DOM v6 with `BrowserRouter`.
- **Rationale**: Already installed. Provides declarative page-level navigation for ~8 distinct views. React Router v6 has clean nested route support.
- **Alternatives Considered**: Hash-based routing (less clean URLs), manual state-based page switching (unscalable).

---

### 5. Animations

- **Decision**: Pure CSS keyframe animations for hero section (fade-in, slide-up, shimmer), combined with CSS transitions for card hover effects. JS used only for scroll-triggered animation via `IntersectionObserver`.
- **Rationale**: CSS animations are GPU-accelerated and do not block the main thread. No animation library needed. `IntersectionObserver` is native and performant.
- **Alternatives Considered**: Framer Motion (heavy bundle), GSAP (license/size), `react-spring` (complex API for this use case).

---

### 6. Cart & Checkout

- **Decision**: Cart is client-side only; checkout form submits to a mock handler that shows an Order Confirmation page.
- **Rationale**: As per spec Assumptions — payment gateways are mocked. The UI flow (cart → checkout form → confirmation) is complete and testable without a real payment backend.
- **Alternatives Considered**: Stripe.js integration (out of scope for MVP), Fake-it-till-you-make-it REST API (unnecessary complexity).

---

### 7. Chat Widget

- **Decision**: Implement a floating chat widget UI (open/close panel, message display) that simulates responses with a simple auto-reply bot pattern.
- **Rationale**: No external chat SaaS credentials are available. A self-contained, realistic-looking chat UI satisfies the spec requirement while keeping the project self-contained.
- **Alternatives Considered**: Tawk.to embed (requires external account), Crisp Chat (requires account), Intercom (paid/SaaS).

---

### 8. Product Data

- **Decision**: Static mock data in `src/data/products.js` — an array of 25 product objects covering 5 categories.
- **Rationale**: No backend is available. Mock data with realistic watch details (name, brand, price, description, category, stock, rating, isBestSeller flag) is sufficient to demonstrate all e-commerce flows.
- **Categories defined**: Men's Classic, Women's Elegant, Sport & Adventure, Luxury & Prestige, Smart Watches.

---

### 9. Logo & Branding

- **Decision**: Use the provided Time Craft logo image asset in the Navbar and Footer. Color palette extracted from the logo: **Gold** (`#C9A84C`), **Dark Charcoal** (`#2A2D35`), accent neutral grays.
- **Rationale**: The brand identity is defined by the provided logo. The color tokens derive from it for visual consistency.

---

## All Unknowns Resolved

| Unknown | Resolution |
|---------|-----------|
| i18n approach | Translation map + RTL CSS toggle |
| Theme switching | CSS data-theme attribute on html |
| State management | React Context + localStorage |
| Chat feature | Self-contained mock widget |
| Payment | Mocked confirmation page |
| Animations | CSS keyframes + IntersectionObserver |
