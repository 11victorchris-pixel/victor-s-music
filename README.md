# 🎵 Victor's Music

**One Music Store. Different Vibes. Endless Sound.**

A complete, fully responsive e-commerce website for a musical instrument and
music equipment store — built as a dependency-free static site (HTML + CSS +
vanilla JavaScript). No frameworks, no build step, no server required.

## Run it

The simplest way: **open `index.html` in any modern browser**.

For the best experience (and to avoid any browser file-access limits), serve
the folder with any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`. The cart, wishlist, checkout and search
persist in your browser's `localStorage`.

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, flash sale + countdown, Shop by Music Vibe, Shop by Instrument, new arrivals, best sellers, reviews, newsletter |
| `shop.html` | Full catalogue — `?type=`, `?vibe=`, `?q=`, `?sale=1`, `?brand=` deep links; filters, sorting, load-more |
| `product.html` | Product details — gallery, specs, reviews, related products, "bought together" bundle |
| `sales.html` | Sales hub — Hot Deals / Flash Sales / Big Discounts + per-category deal rows + countdown |
| `new-arrivals.html` / `best-sellers.html` | Dedicated tagged collections |
| `cart.html` / `wishlist.html` | Full cart + wishlist pages |
| `checkout.html` | Demo checkout flow (clearly marked — no real payment) |
| `about.html` / `contact.html` / `policy.html` | Store story, contact form, policies |

## Music Vibe themes

The site's default look is **Navy Blue + White**. Entering a vibe category
(`shop.html?vibe=…` or the vibe cards on the homepage) smoothly switches the
whole page to that vibe's palette while keeping the Victor's Music branding:

- 👑 **Premium** — black + gold
- 🤘 **Rock & Roll** — black + red
- 🔥 **Savage** — dark + neon green
- 🎨 **Creative** — purple + pink + blue
- 🎚️ **Professional** — deep blue + white + grey
- ⚡ **Energetic** — orange + black + white

## Catalogue & data

- `js/data.js` — 100+ sample products (guitars, drums, keyboards & pianos,
  microphones, speakers, headphones, studio gear, accessories), image pools,
  vibes, instrument categories, testimonials.
- `js/core.js` — cart/wishlist state, currency & star helpers, toasts, SVG
  icons, generated product-cover fallbacks.
- `js/layout.js` — shared header/footer, mobile menu, cart drawer, live search.
- `js/cards.js` — product cards, quick view, scrollers, countdown, reveal fx.
- `js/pages-*.js` — one module per page group.
- `css/style.css` + `css/components.css` — design system + themes + components.
- `css/responsive.css` — mobile-first hardening layer (touch targets, small-
  phone layout, nav collapse, safe areas, landscape) loaded last on every page.

## Notes

- Prices are in **Nigerian Naira (₦)**.
- **Checkout is a demo**: a "Demo checkout" notice is shown and no real
  payment is ever processed or claimed.
- Product photographs are hot-linked from **Wikimedia Commons** (free
  licenses). If an image ever fails to load, a branded placeholder cover is
  generated automatically. Hero/banner AI imagery uses the reference URLs from
  the project brief.
- All store brand names on the site are fictional.

© 2026 Victor's Music. All Rights Reserved.
