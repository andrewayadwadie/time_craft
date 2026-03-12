# Data Model: Time Craft Website

**Branch**: `001-time-craft-web` | **Date**: 2026-03-12  
**Phase**: 1 — Design & Contracts

---

## Entities

### Product

Represents a single watch item in the catalog.

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `id` | string (UUID) | ✅ | Unique across all products |
| `name` | string | ✅ | Max 100 chars |
| `nameAr` | string | ✅ | Arabic translation of name |
| `brand` | string | ✅ | Brand name (e.g., "Tissot", "Seiko") |
| `brandAr` | string | ✅ | Arabic translation of brand |
| `description` | string | ✅ | Max 500 chars, English |
| `descriptionAr` | string | ✅ | Max 500 chars, Arabic |
| `price` | number | ✅ | > 0, in USD |
| `originalPrice` | number | ❌ | > price (for discount display) |
| `images` | string[] | ✅ | Min 1 image URL/path |
| `categoryId` | string | ✅ | References a Category.id |
| `stock` | number | ✅ | >= 0 integer |
| `rating` | number | ✅ | 0.0 – 5.0 |
| `reviewCount` | number | ✅ | >= 0 |
| `isBestSeller` | boolean | ✅ | Default: false |
| `isNew` | boolean | ✅ | Default: false |
| `tags` | string[] | ❌ | e.g., ["waterproof", "automatic"] |
| `createdAt` | string (ISO date) | ✅ | For sorting "newest first" |

**Derived**:
- `isOutOfStock`: computed as `stock === 0`
- `discountPercent`: computed as `Math.round((1 - price/originalPrice) * 100)` (if originalPrice present)

---

### Category

A logical grouping for filtering products.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string (slug) | ✅ | e.g., `"mens-classic"` |
| `name` | string | ✅ | English display name |
| `nameAr` | string | ✅ | Arabic display name |
| `icon` | string | ❌ | Emoji or icon name |
| `image` | string | ❌ | Hero image for category page |
| `description` | string | ❌ | Short tagline |
| `descriptionAr` | string | ❌ | Arabic tagline |

**Defined Categories**:
| ID | Name (EN) | Name (AR) |
|----|-----------|-----------|
| `mens-classic` | Men's Classic | ساعات رجالية كلاسيكية |
| `womens-elegant` | Women's Elegant | ساعات نسائية أنيقة |
| `sport-adventure` | Sport & Adventure | رياضية ومغامرة |
| `luxury-prestige` | Luxury & Prestige | فاخرة وراقية |
| `smart-watches` | Smart Watches | ساعات ذكية |

---

### CartItem

A product added to the shopping cart with a quantity.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | string | ✅ | References Product.id |
| `quantity` | number | ✅ | >= 1, integer |

**Cart State**:
| State | Trigger |
|-------|---------|
| Empty | No items; checkout button disabled |
| Active | 1+ items; display count badge on cart icon |
| Max reached | quantity per item capped at `stock` value |

---

### FavoriteItem

A product saved to the user's wishlist.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | string | ✅ | References Product.id |
| `savedAt` | string (ISO date) | ✅ | Timestamp of when saved |

---

### Order (mocked)

Represents a completed checkout submission. Not persisted to a real backend.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `orderId` | string (UUID) | ✅ | Generated client-side on submit |
| `items` | CartItem[] | ✅ | Snapshot of cart at checkout |
| `totalAmount` | number | ✅ | Sum of item prices |
| `customerName` | string | ✅ | From checkout form |
| `customerEmail` | string | ✅ | Validated email format |
| `customerPhone` | string | ✅ | Phone number field |
| `shippingAddress` | string | ✅ | Full address text |
| `status` | enum | ✅ | Always `"confirmed"` in mock |
| `createdAt` | string (ISO date) | ✅ | Client-side timestamp |

---

### UserFeedback

A single customer testimonial/review displayed on the home page.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | ✅ | |
| `authorName` | string | ✅ | Customer name |
| `authorNameAr` | string | ✅ | Arabic name |
| `rating` | number | ✅ | 1–5 stars |
| `comment` | string | ✅ | Review text (English) |
| `commentAr` | string | ✅ | Review text (Arabic) |
| `avatarUrl` | string | ❌ | Profile photo |
| `date` | string (ISO date) | ✅ | Review date |

---

### UIPreferences (localStorage)

Persisted user interface settings.

| Key | Type | Default | Notes |
|-----|------|---------|-------|
| `tc_theme` | `"light"` \| `"dark"` | `"light"` | Theme preference |
| `tc_lang` | `"en"` \| `"ar"` | `"en"` | Language preference |
| `tc_cart` | CartItem[] | `[]` | Serialized cart |
| `tc_favorites` | FavoriteItem[] | `[]` | Serialized favorites list |

---

## State Transitions

### Cart Item Quantity
```
[Not in cart] --addToCart--> [In cart, qty=1]
[In cart] --increment--> [In cart, qty+1] (max: stock)
[In cart] --decrement--> [In cart, qty-1] if qty>1, else [Not in cart]
[In cart] --removeItem--> [Not in cart]
```

### Checkout Flow
```
[CartPage] --click Checkout--> [CheckoutPage(form)]
[CheckoutPage] --submit valid form--> [OrderConfirmationPage]
[CheckoutPage] --submit invalid form--> [CheckoutPage(errors shown)]
[OrderConfirmationPage] --continue shopping--> [HomePage]
```

### Favorites
```
[Product] --clickFavorite--> [FavoritesList contains product]
[Product(favorited)] --clickFavorite(toggle)--> [FavoritesList removes product]
```
