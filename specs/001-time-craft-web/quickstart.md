# Quickstart Guide: Time Craft Website

**Branch**: `001-time-craft-web` | **Date**: 2026-03-12

---

## Prerequisites

- Node.js 18+ installed
- npm 9+

---

## Running the Development Server

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Project Overview

| Directory | Purpose |
|-----------|---------|
| `src/data/` | Mock product catalog, categories, translations |
| `src/context/` | React Context providers (cart, favorites, theme, language) |
| `src/pages/` | Full-page views rendered by React Router |
| `src/components/` | Reusable UI building blocks |
| `src/styles/` | CSS variables (design tokens), animations, RTL overrides |

---

## Key Features

| Feature | Where |
|---------|-------|
| Language toggle (EN/AR) | `Navbar.jsx` → `LanguageContext` |
| Theme toggle (Light/Dark) | `Navbar.jsx` → `ThemeContext` |
| Cart management | `CartContext.jsx` + `CartSidebar.jsx` |
| Favorites / Wishlist | `FavoritesContext.jsx` + `FavoritesPage.jsx` |
| Home animations | `HeroSection.jsx` + `animations.css` |
| Best Sellers | `BestSellers.jsx` (filters products where `isBestSeller: true`) |
| Categories | `CategoryGrid.jsx` → `/category/:id` routes |
| Live Chat widget | `ChatWidget.jsx` (floating bottom-right) |
| User Feedback | `UserFeedback.jsx` — testimonials carousel |
| Out of Stock | `ProductCard.jsx` checks `stock === 0` → badge + disabled button |

---

## Adding a New Product

Edit `src/data/products.js` and add an object with this shape:

```js
{
  id: "unique-id",
  name: "Watch Name",
  nameAr: "اسم الساعة",
  brand: "Brand",
  brandAr: "الماركة",
  description: "Description...",
  descriptionAr: "الوصف...",
  price: 299,
  originalPrice: 399,      // optional, for discount badge
  images: ["/images/watch.jpg"],
  categoryId: "mens-classic",
  stock: 10,
  rating: 4.5,
  reviewCount: 128,
  isBestSeller: false,
  isNew: true,
  tags: ["automatic", "waterproof"],
  createdAt: "2026-03-01"
}
```

---

## Adding a New Translation Key

Edit `src/data/translations.js`:

```js
export const translations = {
  en: {
    myNewKey: "My English Text",
    // ...
  },
  ar: {
    myNewKey: "نصي العربي",
    // ...
  }
}
```

Use in any component:

```jsx
const { t } = useLanguage();
return <span>{t('myNewKey')}</span>;
```

---

## Changing Colors / Design Tokens

Edit the CSS variables in `src/styles/index.css`:

```css
:root {
  --color-primary: #C9A84C;   /* Gold brand color */
  --color-bg: #FFFFFF;
  --color-text: #2A2D35;
  /* ... */
}

[data-theme="dark"] {
  --color-bg: #1A1C22;
  --color-text: #F0F0F0;
  /* ... */
}
```

---

## Build for Production

```bash
npm run build
# Output: dist/ directory
```
