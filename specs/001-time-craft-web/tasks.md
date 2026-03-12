# Tasks: Time Craft Website

**Input**: Design documents from `/specs/001-time-craft-web/`  
**Branch**: `001-time-craft-web`  
**Generated**: 2026-03-12  
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ui-contracts.md ✅ | quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no shared dependencies)
- **[Story]**: User story label — US1, US2, US3
- Exact file paths included in all task descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, folder structure, and design system foundation

- [x] T001 Scaffold `src/` directory tree per plan.md (components/, context/, data/, pages/, hooks/, styles/)
- [x] T002 [P] Write `src/styles/index.css` — CSS custom properties for light/dark design tokens, global reset, typography, utility classes
- [x] T003 [P] Write `src/styles/animations.css` — keyframe animations (fadeIn, slideUp, shimmer, pulse, float)
- [x] T004 [P] Write `src/styles/rtl.css` — RTL layout overrides triggered when `html[dir=rtl]` is active
- [x] T005 Update `index.html` — add Google Fonts (Inter, Playfair Display), meta description, lang attribute, viewport
- [x] T006 Update `src/main.jsx` — wrap `<App />` with all Context providers in correct order

**Checkpoint**: Design system and entry point ready — all pages can now be styled consistently

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Mock data, translation map, and all Context providers — MUST be complete before any page/UI work begins

**⚠️ CRITICAL**: No page or component work can begin until this phase is complete

- [x] T007 [P] Create `src/data/categories.js` — 5 category objects with id, name, nameAr, icon, image, description, descriptionAr
- [x] T008 [P] Create `src/data/products.js` — 25 mock watch products across 5 categories with all fields per data-model.md (price, stock, isBestSeller, isNew, rating, images, tags, etc.)
- [x] T009 [P] Create `src/data/testimonials.js` — 6+ user feedback objects with authorName, authorNameAr, rating, comment, commentAr, date
- [x] T010 [P] Create `src/data/translations.js` — complete EN/AR string map for all UI text (nav labels, buttons, page titles, form labels, error messages, empty states)
- [x] T011 Create `src/context/ThemeContext.jsx` — light/dark state, toggleTheme(), localStorage sync, `data-theme` attribute on `<html>`
- [x] T012 Create `src/context/LanguageContext.jsx` — EN/AR state, toggleLanguage(), `t(key)` translation function, `dir` attribute on `<html>`, localStorage sync
- [x] T013 Create `src/context/CartContext.jsx` — CartItem[] state, addItem(), removeItem(), updateQuantity(), clearCart(), cartCount, total, localStorage sync
- [x] T014 Create `src/context/FavoritesContext.jsx` — FavoriteItem[] state, addFavorite(), removeFavorite(), isFavorite(), favoriteCount, localStorage sync
- [x] T015 [P] Create `src/hooks/useCart.js` — convenience hook consuming CartContext
- [x] T016 [P] Create `src/hooks/useFavorites.js` — convenience hook consuming FavoritesContext
- [x] T017 [P] Create `src/hooks/useTheme.js` — convenience hook consuming ThemeContext
- [x] T018 [P] Create `src/hooks/useLanguage.js` — convenience hook consuming LanguageContext
- [x] T019 Update `src/App.jsx` — React Router BrowserRouter, all routes (/, /shop, /category/:id, /product/:id, /cart, /checkout, /favorites, /order-confirmation), layout wrapper with Navbar + Footer + ChatWidget

**Checkpoint**: Foundation ready — all contexts, data, hooks, and routing in place. Individual pages can now be built independently

---

## Phase 3: User Story 1 — Product Browse & Purchase (Priority: P1) 🎯 MVP

**Goal**: Users can browse categories, view product details, add to cart, and complete checkout

**Independent Test**: Navigate to `/shop`, pick a product, add to cart, go to `/checkout`, fill form, submit → see `/order-confirmation`

### Implementation for User Story 1

- [x] T020 [P] [US1] Create `src/components/ui/Badge.jsx` — reusable badge chip (Best Seller, New, Out of Stock, Sale, discount %)
- [x] T021 [P] [US1] Create `src/components/product/OutOfStockBadge.jsx` — overlay badge for out-of-stock products
- [x] T022 [P] [US1] Create `src/components/product/ProductCard.jsx` — product grid card with image, name (localized), price, rating, "Add to Cart" button (disabled if out-of-stock), heart toggle, badges
- [x] T023 [US1] Create `src/pages/ShopPage.jsx` — all products grid with category filter chips, sort dropdown (Price ↑↓, Rating, Newest), search input filtering by name/nameAr (depends on T022)
- [x] T024 [US1] Create `src/pages/CategoryPage.jsx` — category hero header + filtered product grid using categoryId URL param (depends on T022)
- [x] T025 [P] [US1] Create `src/components/product/ProductDetail.jsx` — image gallery with thumbnail switching, localized name/description, price with discount display, star rating, stock status, tags, Add to Cart button
- [x] T026 [US1] Create `src/pages/ProductPage.jsx` — page wrapper loading product by id param and rendering ProductDetail (depends on T025)
- [x] T027 [P] [US1] Create `src/components/cart/CartItem.jsx` — single cart row: product image, name, qty +/- controls, line price, remove icon
- [x] T028 [P] [US1] Create `src/components/cart/CartSummary.jsx` — subtotal, item count, "Proceed to Checkout" button
- [x] T029 [US1] Create `src/components/cart/CartSidebar.jsx` — slide-in drawer with CartItem list + CartSummary + empty state (depends on T027, T028)
- [x] T030 [US1] Create `src/pages/CartPage.jsx` — full-page cart view rendering CartItem list + CartSummary (depends on T027, T028)
- [x] T031 [US1] Create `src/pages/CheckoutPage.jsx` — form with Full Name, Email, Phone, Shipping Address fields; inline validation; on valid submit clear cart and navigate to /order-confirmation (depends on T013)
- [x] T032 [US1] Create `src/pages/OrderConfirmationPage.jsx` — displays generated order ID, item summary, "Continue Shopping" link to /

**Checkpoint**: Full P1 flow complete — browse → product detail → cart → checkout → confirmation all independently functional

---

## Phase 4: User Story 2 — Language & Theme Toggle (Priority: P2)

**Goal**: Users switch between EN↔AR (with full RTL layout) and Light↔Dark theme at any point

**Independent Test**: Click language toggle → all text changes to Arabic and layout flips RTL. Click theme toggle → dark color scheme applied instantly without reload.

### Implementation for User Story 2

- [x] T033 [P] [US2] Create `src/components/ui/ThemeToggle.jsx` — sun/moon animated icon button calling toggleTheme() from ThemeContext
- [x] T034 [P] [US2] Create `src/components/ui/LanguageToggle.jsx` — EN/AR pill switcher calling toggleLanguage() from LanguageContext
- [x] T035 [US2] Create `src/components/layout/Navbar.jsx` — logo (Time Craft brand), navigation links (localized), cart badge counter, favorites badge counter, ThemeToggle, LanguageToggle, mobile hamburger menu (depends on T033, T034)
- [x] T036 [US2] Verify `src/styles/rtl.css` fully covers all layout direction changes — test Navbar, product cards, forms, cart sidebar in RTL mode; fix any gaps
- [x] T037 [US2] Verify `src/styles/index.css` light/dark tokens cover all components — check contrast ratios in both modes; update any missing `[data-theme="dark"]` overrides

**Checkpoint**: Language and theme toggles fully functional across all P1 pages

---

## Phase 5: User Story 3 — Wishlist, Feedback, Best Sellers & Chat (Priority: P3)

**Goal**: Users can save favorites, view best sellers on home page, submit feedback, and use the chat widget

**Independent Test**: Favorite a product → appears in `/favorites`. Open chat widget → send message → receive bot reply. Home page shows best sellers section and testimonials carousel.

### Implementation for User Story 3

- [x] T038 [P] [US3] Create `src/components/home/AnimatedClock.jsx` — decorative SVG watch/clock with CSS animation (rotating hands)
- [x] T039 [P] [US3] Create `src/components/home/HeroSection.jsx` — full-width animated hero: headline (localized), subtext, CTA "Shop Now" button, AnimatedClock, fade-in + slide-up entrance animations using IntersectionObserver
- [x] T040 [P] [US3] Create `src/components/home/BestSellers.jsx` — horizontal scrollable row of products where isBestSeller === true, using ProductCard
- [x] T041 [P] [US3] Create `src/components/home/CategoryGrid.jsx` — 5 category cards in responsive grid, each linking to /category/:id, with image, icon, and localized name
- [x] T042 [P] [US3] Create `src/components/home/UserFeedback.jsx` — testimonials carousel with auto-play, localized names/comments, star rating display, prev/next controls
- [x] T043 [US3] Create `src/pages/HomePage.jsx` — assembles HeroSection, BestSellers, CategoryGrid, UserFeedback sections with scroll animation triggers (depends on T038–T042)
- [x] T044 [US3] Create `src/pages/FavoritesPage.jsx` — grid of favorited products using ProductCard with remove-from-favorites action; empty state with link to /shop (depends on T014, T022)
- [x] T045 [P] [US3] Create `src/components/layout/ChatWidget.jsx` — floating bottom-right chat bubble; open/close panel with message list, user input field, auto-reply bot with 1-2s delay simulated responses
- [x] T046 [P] [US3] Create `src/components/layout/Footer.jsx` — social media icons (Instagram, Facebook, Twitter, YouTube, WhatsApp), newsletter email input, quick nav links, copyright, brand tagline (localized)

**Checkpoint**: All 3 user stories complete — full site functional end-to-end

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Animations polish, responsive refinements, accessibility, and production readiness

- [ ] T047 Polish home screen animations — ensure HeroSection entrance, card hover lifts, BestSellers shimmer, and CategoryGrid reveal all run at 60fps; optimize with `will-change` and `transform` where needed in `src/styles/animations.css`
- [ ] T048 [P] Add scroll-triggered reveal animations using `IntersectionObserver` to BestSellers, CategoryGrid, and UserFeedback sections in `src/components/home/`
- [ ] T049 [P] Verify all pages are fully responsive — test at 320px, 768px, 1024px, 1440px viewports; fix any layout overflow or clipping issues in `src/styles/index.css` and component files
- [x] T050 [P] Add 404 / Not Found page `src/pages/NotFoundPage.jsx` and catch-all route in `src/App.jsx`
- [ ] T051 [P] Add loading states and error boundaries — skeleton placeholders for product images, fallback UI in `src/components/ui/` 
- [x] T052 [P] Accessibility pass — add `aria-label` to icon buttons (cart, favorites, theme, language toggles), ensure keyboard navigation works for Navbar and ChatWidget
- [ ] T053 Copy Time Craft logo image to `src/assets/logo.png` and reference it in `Navbar.jsx` and `Footer.jsx`
- [ ] T054 [P] Update `index.html` — SEO meta tags (title, description, og:title, og:description), favicon reference
- [ ] T055 Final `npm run build` and verify `dist/` output builds without errors

**Checkpoint**: Production-ready website — all stories functional, animations polished, responsive across all breakpoints

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all page work**
- **Phase 3 (US1 — Browse & Purchase)**: Depends on Phase 2 — core e-commerce MVP
- **Phase 4 (US2 — Language & Theme)**: Depends on Phase 2; can parallel with Phase 3 (different files)
- **Phase 5 (US3 — Wishlist & Engagement)**: Depends on Phase 2; T044 depends on Phase 3 (ProductCard)
- **Phase 6 (Polish)**: Depends on Phases 3, 4, 5 complete

### User Story Dependencies

- **US1 (P1)**: Independent after Phase 2 — pure e-commerce core
- **US2 (P2)**: Independent after Phase 2 — language/theme system (Navbar depends on US2 toggles)
- **US3 (P3)**: Mostly independent after Phase 2; `FavoritesPage` reuses `ProductCard` from US1

### Parallel Opportunities

All `[P]`-marked tasks within the same phase can be executed concurrently against different files.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (T020–T032)
4. **STOP and VALIDATE**: Full shop → cart → checkout flow works
5. Demo or ship MVP

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1) → Shoppable website (**MVP!**)
3. Phase 4 (US2) → Bilingual + themed website
4. Phase 5 (US3) → Full feature set (wishlist, home animations, chat)
5. Phase 6 → Production polish

### Task Count Summary

| Phase | Tasks | Story |
|-------|-------|-------|
| Phase 1 — Setup | T001–T006 | 6 tasks |
| Phase 2 — Foundational | T007–T019 | 13 tasks |
| Phase 3 — US1 Browse & Purchase | T020–T032 | 13 tasks |
| Phase 4 — US2 Language & Theme | T033–T037 | 5 tasks |
| Phase 5 — US3 Wishlist & Engagement | T038–T046 | 9 tasks |
| Phase 6 — Polish | T047–T055 | 9 tasks |
| **Total** | | **55 tasks** |

---

## Notes

- `[P]` = different files, no shared write dependencies — safe to parallelize
- `[Story]` label maps each task to its user story for traceability
- Each user story phase is independently testable as an increment
- Commit at each phase checkpoint before moving to the next
- No test tasks generated (not requested in spec)
