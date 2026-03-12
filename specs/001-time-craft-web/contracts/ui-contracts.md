# UI Contracts: Time Craft Website

**Branch**: `001-time-craft-web` | **Date**: 2026-03-12  
**Phase**: 1 — Design & Contracts

Each section describes the public contract for a distinct UI view — its required props/inputs, visible outputs, and user-triggered actions.

---

## 1. HomePage

**Route**: `/`

### Sections
| Section | Content |
|---------|---------|
| Navbar | Logo, nav links, cart badge, favorites badge, language toggle, theme toggle |
| HeroSection | Animated headline, subtext, CTA button → `/shop` |
| BestSellers | Horizontal scroll row of top `isBestSeller` products |
| CategoryGrid | 5 category cards linking to `/category/:id` |
| UserFeedback | Testimonials carousel (3+ reviews) |
| Footer | Social icons, newsletter input, copyright |
| ChatWidget | Floating bottom-right chat button |

### Outputs
- Clicking a best-seller card → navigates to `/product/:id`
- Clicking a category card → navigates to `/category/:id`
- CTA button → navigates to `/shop`

---

## 2. ShopPage

**Route**: `/shop`

### Inputs
| Filter | Type | Notes |
|--------|------|-------|
| Category filter | Multiselect chips | Filters by `categoryId` |
| Sort | Dropdown | Options: Price ↑, Price ↓, Rating, Newest |
| Search | Text input | Fuzzy match on `name` / `nameAr` |

### Outputs
- Product grid (cards) — 4 cols desktop, 2 cols tablet, 1 col mobile
- "Out of Stock" badge on unavailable products (buy disabled)
- "Best Seller" badge on flagged products

### Actions
| Action | Result |
|--------|--------|
| Click product card | Navigate to `/product/:id` |
| Click "Add to Cart" | Cart count increments; item added to CartContext |
| Click heart icon | Item added/removed from FavoritesContext |

---

## 3. CategoryPage

**Route**: `/category/:categoryId`

### Inputs
- `categoryId` URL param → filters product list

### Outputs
- Category hero header (name + image)
- Filtered product grid (same card component as ShopPage)

---

## 4. ProductPage

**Route**: `/product/:productId`

### Inputs
- `productId` URL param → loads product from mock data

### Outputs
| Element | Content |
|---------|---------|
| Image gallery | Main image + thumbnails |
| Product name | Localized (EN/AR) |
| Price | Formatted with currency symbol |
| Rating | Star display + review count |
| Description | Localized |
| Stock status | "In Stock" or "Out of Stock" badge |
| Tags | Rendered as chips |

### Actions
| Action | Result |
|--------|--------|
| "Add to Cart" | Adds to CartContext (disabled if out-of-stock) |
| Heart icon | Adds/removes from FavoritesContext |
| Thumbnail click | Swaps main image |

---

## 5. CartPage / CartSidebar

**Route**: `/cart` (also accessible as slide-in drawer)

### Inputs
- CartContext state

### Outputs
| Element | Content |
|---------|---------|
| Item list | Product image, name, qty control, line price |
| Subtotal | Sum of all line prices |
| Empty state | Illustration + "Start Shopping" link |

### Actions
| Action | Result |
|--------|--------|
| Qty +/- | Updates CartContext, capped at stock |
| Remove icon | Removes item from CartContext |
| "Checkout" button | Navigates to `/checkout` |

---

## 6. CheckoutPage

**Route**: `/checkout`

### Form Fields
| Field | Type | Validation |
|-------|------|-----------|
| Full Name | text | Required |
| Email | email | Required, valid format |
| Phone | tel | Required |
| Shipping Address | textarea | Required |

### Actions
| Action | Result |
|--------|--------|
| Submit (valid) | Clears cart; navigates to `/order-confirmation` |
| Submit (invalid) | Shows inline field errors |

---

## 7. FavoritesPage

**Route**: `/favorites`

### Inputs
- FavoritesContext state

### Outputs
- Product grid of saved items
- Empty state: "No favorites yet" with link to `/shop`

### Actions
| Action | Result |
|--------|--------|
| "Add to Cart" on card | Moves item to CartContext |
| Heart icon (toggle) | Removes from FavoritesContext |

---

## 8. OrderConfirmationPage

**Route**: `/order-confirmation`

### Outputs
- Order ID
- Summary of ordered items
- "Continue Shopping" → `/`

---

## 9. Navbar Contract

### Inputs (from context)
- `cartCount` — number
- `favoriteCount` — number
- `theme` — `"light"` | `"dark"`
- `language` — `"en"` | `"ar"`

### Actions
| Element | Action |
|---------|--------|
| Logo | Navigate to `/` |
| Cart icon | Open CartSidebar or navigate to `/cart` |
| Favorites icon | Navigate to `/favorites` |
| Language toggle | Switch language in LanguageContext |
| Theme toggle | Switch theme in ThemeContext |

---

## 10. ChatWidget Contract

### States
| State | UI |
|-------|----|
| Closed | Floating chat bubble button (bottom-right) |
| Open | Chat panel: message list + input field |

### Auto-reply simulation
- After user sends a message → 1-2s delay → bot response from a predefined answer list

---

## Global Contracts

### ThemeContext
```
{
  theme: "light" | "dark",
  toggleTheme: () => void
}
```
Effect: Sets `document.documentElement.setAttribute("data-theme", theme)`

### LanguageContext
```
{
  language: "en" | "ar",
  toggleLanguage: () => void,
  t: (key: string) => string   // translation function
}
```
Effect: Sets `document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr")`

### CartContext
```
{
  items: CartItem[],
  cartCount: number,
  addItem: (productId: string) => void,
  removeItem: (productId: string) => void,
  updateQuantity: (productId: string, qty: number) => void,
  clearCart: () => void,
  total: number
}
```

### FavoritesContext
```
{
  favorites: FavoriteItem[],
  favoriteCount: number,
  addFavorite: (productId: string) => void,
  removeFavorite: (productId: string) => void,
  isFavorite: (productId: string) => boolean
}
```
