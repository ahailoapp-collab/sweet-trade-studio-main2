# Rabah Sparkle Detergents

Marketing site for **Rabah Sparkle Detergents** — premium cleaning products proudly made in Zimbabwe. Built with Vite + React + TypeScript + Tailwind CSS.

## Local development

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:8080.

## Build

```sh
npm run build      # production build into ./dist
npm run preview    # preview the built site
npm run test       # run unit + a11y tests
```

## Deployment

The site is configured for **Cloudflare Pages** out of the box. See [`CLOUDFLARE_DEPLOY.md`](./CLOUDFLARE_DEPLOY.md) for setup steps.

`public/_headers` and `public/_redirects` handle security headers, asset caching, and SPA routing automatically.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS v3 + shadcn/ui
- React Router
- Vitest + @testing-library/react + jest-axe
