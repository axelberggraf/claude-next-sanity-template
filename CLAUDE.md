# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server at localhost:3000
pnpm build      # production build
pnpm lint       # run ESLint
pnpm start      # start production server (after build)
```

## Environment

Copy `.env.local.example` to `.env.local` and fill in values before running:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from sanity.io/manage
- `NEXT_PUBLIC_SANITY_DATASET` — defaults to `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` — YYYY-MM-DD date string
- `SANITY_API_READ_TOKEN` — only needed for draft previews or authenticated queries

## Architecture

**App Router** (`app/`) — Next.js 16 with the App Router. All pages and layouts live here.

**Sanity Studio** is embedded at `/studio` via `app/studio/[[...tool]]/page.tsx` using `NextStudio` from `next-sanity`. It reads config from `sanity.config.ts` at the root.

**Sanity layer** (`sanity/`):
- `lib/client.ts` — shared `createClient` instance (`useCdn: true` by default; set to `false` for draft previews)
- `lib/image.ts` — `urlFor(source)` helper wrapping `@sanity/image-url`
- `lib/queries.ts` — all GROQ queries defined with `defineQuery` for TypeScript inference
- `schemas/index.ts` — barrel export of all schema types (imported by `sanity.config.ts`)
- `schemaTypes/` — individual Sanity document/object type definitions

**Styling** (`styles/`): Global SCSS only — no CSS Modules, no Tailwind. Import order: `_variables.scss` → `_mixins.scss` → `globals.scss`. `globals.scss` is imported once in `app/layout.tsx`. Components use plain `className="my-class"` strings pointing to global classes.

**Images**: Sanity CDN images are served via `cdn.sanity.io` (allowed in `next.config.ts`). Use `urlFor(image).width(800).url()` to build URLs.

## Node.js

This project requires Node.js ≥ 20.9.0. If running Node 18, use `nvm install 20 && nvm use 20`.
