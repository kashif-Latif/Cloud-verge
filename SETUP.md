# CloudVerge — Auralis Redesign · Setup

## Run locally
```bash
npm install          # also generates the Prisma client
npx prisma db push   # creates dev.db (SQLite) for the contact/review APIs
npm run dev          # http://localhost:3000
```

## What changed (v2 redesign)
- **Design**: complete Auralis rebuild — light `#F7F7F5` canvas, Geist type,
  black pill CTAs, aurora gradient orbs, glass panels with mirror sheen +
  a real mirror-floor reflection in the hero. Dark mode included (toggle in header).
- **Real URLs**: `/about`, `/pricing`, `/blog/<slug>`, `/admin` … refresh-safe,
  back-button-safe, shareable. (Store now syncs with the browser history.)
- **Content**: everything editable in one file → `src/lib/content.ts`.
- **Fonts self-hosted** (`geist` package) — builds no longer depend on Google Fonts.
- **Prisma schema restored** (`prisma/schema.prisma`) — it was missing from the
  export; APIs now work after `db push`. DB client is lazy (never loads at build).
- Removed unused `z-ai-web-dev-sdk`.

## Deploy (Vercel)
Push to GitHub → import in Vercel → add env `DATABASE_URL`.
Note: SQLite doesn't persist on Vercel — when you're ready for live
contact-form storage, switch `provider` in `prisma/schema.prisma` to
`postgresql` and point `DATABASE_URL` at Supabase/Neon. Models already fit.

## Admin & Portals
Admin/portal components are kept in `src/components/` but are NOT routed on
the public site anymore. The full portal build-out (admin, web-dev, app-dev,
bidder + real authentication) is the next phase.
