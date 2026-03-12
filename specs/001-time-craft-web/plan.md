# Implementation Plan: Time Craft Website

**Branch**: `001-time-craft-web` | **Date**: 2026-03-12 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-time-craft-web/spec.md`

## Summary

Build a premium, fully-responsive e-commerce website for **Time Craft** — a hand-watch retail brand. The site enables online ordering, shopping cart, favorites/wishlist, product categories, animated home screen, social links, user feedback, live chat, and prominent best-seller listings. It will support both English (default, LTR) and Arabic (RTL) languages with a Light/Dark theme toggle. The tech stack is React (Vite), vanilla CSS, and React Router with localStorage for state persistence.

---

## Technical Context

**Language/Version**: JavaScript (ES2022) + JSX via React 18.3  
**Primary Dependencies**: React Router DOM v6, Lucide React (icons)  
**Storage**: localStorage (cart, favorites, language, theme preferences)  
**Testing**: Manual browser testing across breakpoints (mobile/tablet/desktop)  
**Target Platform**: Web — all modern browsers (Chromium, Firefox, Safari)  
**Project Type**: Single-page web application (SPA)  
**Performance Goals**: First Contentful Paint < 2s, smooth 60fps animations on desktop  
**Constraints**: No backend required — mock data in JSON; all state in-memory + localStorage  
**Scale/Scope**: ~8-10 pages/views, ~20-30 mock products across 5 categories

---

## Constitution Check

*GATE: Must pass before Phase 0 research.*

The constitution file is a placeholder template — no project-specific gates are defined yet.

| Gate | Status | Notes |
|------|--------|-------|
| Clear feature specification | ✅ PASS | All FRs are testable, no markers remain |
| Responsive design required | ✅ PASS | Mobile-first CSS approach planned |
| Bilingual (AR/EN) required  | ✅ PASS | i18n via translation map + RTL CSS toggle |
| Light/Dark theme required   | ✅ PASS | CSS custom properties (variables) strategy |
| No backend for MVP          | ✅ PASS | localStorage + mock JSON — explicitly assumed |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-time-craft-web/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts per view)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── logo.png                 # Time Craft brand logo
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx            # Top navigation, language + theme toggles
│   │   ├── Footer.jsx            # Social links, newsletter, copyright
│   │   └── ChatWidget.jsx        # Floating live chat widget
│   ├── home/
│   │   ├── HeroSection.jsx       # Animated hero with CTA
│   │   ├── BestSellers.jsx       # Highlighted top-selling products
│   │   ├── CategoryGrid.jsx      # Quick-access category cards
│   │   ├── UserFeedback.jsx      # Customer testimonials carousel
│   │   └── AnimatedClock.jsx     # Decorative animated watch element
│   ├── product/
│   │   ├── ProductCard.jsx       # Grid card with add-to-cart / favorite
│   │   ├── ProductDetail.jsx     # Full product info + image gallery
│   │   └── OutOfStockBadge.jsx   # "Out of Stock" overlay badge
│   ├── cart/
│   │   ├── CartSidebar.jsx       # Slide-in cart drawer
│   │   ├── CartItem.jsx          # Single line item in cart
│   │   └── CartSummary.jsx       # Totals + checkout CTA
│   ├── favorites/
│   │   └── FavoritesList.jsx     # Wishlist grid view
│   └── ui/
│       ├── ThemeToggle.jsx       # Sun/moon icon switch
│       ├── LanguageToggle.jsx    # EN/AR switcher
│       └── Badge.jsx             # Generic badge/chip component
├── context/
│   ├── CartContext.jsx           # Cart global state + localStorage sync
│   ├── FavoritesContext.jsx      # Wishlist global state + localStorage sync
│   ├── ThemeContext.jsx          # Light/Dark state + class on <html>
│   └── LanguageContext.jsx       # EN/AR + RTL dir attribute on <html>
├── data/
│   ├── products.js               # Mock product catalog (20-30 items)
│   ├── categories.js             # Category definitions
│   └── translations.js           # EN/AR string map
├── pages/
│   ├── HomePage.jsx
│   ├── ShopPage.jsx              # All products with filter/sort
│   ├── CategoryPage.jsx          # Products by category
│   ├── ProductPage.jsx           # Single product detail
│   ├── CartPage.jsx              # Full-page cart view
│   ├── CheckoutPage.jsx          # Order form (mocked submit)
│   ├── FavoritesPage.jsx
│   └── OrderConfirmationPage.jsx
├── hooks/
│   ├── useCart.js
│   ├── useFavorites.js
│   ├── useTheme.js
│   └── useLanguage.js
├── styles/
│   ├── index.css                 # Global reset, CSS variables (light/dark tokens)
│   ├── animations.css            # Keyframe animations for hero, cards
│   └── rtl.css                  # RTL layout overrides for Arabic
├── App.jsx                       # Router, context providers, layout wrapper
└── main.jsx                      # Vite entry point
```

**Structure Decision**: Single SPA project — React with Vite scaffolding already initialized. All state is managed via React Context + localStorage; no backend needed for this MVP.

---

## Complexity Tracking

No constitution violations. No complexity justification required.
