# Cloudflare Pages Deployment

This project is ready to deploy to **Cloudflare Pages**.

## One-time setup

1. Push the repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version** (env var `NODE_VERSION`): `20`
4. Save & deploy.

## What's already wired up

- `public/_redirects` — SPA fallback so deep links (`/products`, `/about`) work on refresh.
- `public/_headers` — security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy) and long-lived immutable caching for hashed assets / images / videos.
- `vite.config.ts` — manual chunk splitting (react, query, icons) for smaller initial JS.
- Fonts preconnected in `index.html`; `font-display: swap` already set.
- Images served as `.webp`, lazy-loaded, with explicit `width`/`height` to avoid CLS.
- Hero videos are connection-aware (skipped on Save-Data / 2G, deferred on mobile).

## Custom domain

Add it from the Pages project → **Custom domains** tab.
