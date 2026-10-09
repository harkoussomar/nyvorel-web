# Nyvorel Web

Official website and documentation application for **Nyvorel Shell**.

**Live site:** https://nyvorel-web.vercel.app

## Local development

```sh
pnpm install
pnpm dev
```

## Production validation

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Structure

- `src/app/page.tsx` — Nyvorel landing page
- `src/app/docs/` — documentation routes
- `src/app/sitemap.ts` — production sitemap
- `src/app/robots.ts` — crawler policy
- `src/app/globals.css` — landing design system
- `src/app/docs/docs.css` — documentation design system
- `src/components/` — reusable interactive pieces
- `src/lib/project.ts` — Nyvorel project/release metadata
- `src/lib/docs-navigation.ts` — documentation information architecture
- `public/brand/` — Nyvorel visual identity
- `public/showcase/` — real Nyvorel screenshots

## Deployment

The `main` branch is connected to Vercel and automatically deploys to Production.

Production domain: https://nyvorel-web.vercel.app

The website links to the immutable Nyvorel v0.1.0 release and documents the
development-branch minimal-Arch setup separately. Publish the matching Nyvorel
source before deploying updated installation guidance.
