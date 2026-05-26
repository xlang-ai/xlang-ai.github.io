# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static website for the XLANG Lab (xlang.ai) — an NLP/AI research group at the University of Hong Kong focused on language model agents and executable language grounding.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (static export to `out/`)
- `npm run export` — build + export
- `npx prisma generate && npx prisma migrate dev` — set up Prisma (only needed for auth features, not content)

## Deployment

Pushing to `main` auto-syncs to the `github-page` branch via GitHub Actions, which then triggers a static deploy to GitHub Pages. No manual deploy step needed.

## Architecture

**Next.js 13 with Pages Router** using static export (`output: 'export'` in next.config.js). All pages use `getStaticProps` — there is no SSR or ISR.

**Data layer**: Content is stored in flat files under `data/`, not in a database:
- Team members: CSV files in `data/team/` (parsed with PapaParse)
- Research papers, talks, projects, news: JSON files in `data/research/`, `data/projects/`, `data/news/`
- Blog posts: Markdown with gray-matter frontmatter in `data/blog_posts/`

Data loading functions are in `utils/data.ts` (CSV/JSON) and `utils/post.ts` (blog markdown). These run at build time only.

**Prisma/PostgreSQL** exists solely for NextAuth user management (Google sign-in, waitlist). It is not used for any site content. Requires `POSTGRES_PRISMA_URL` and related env vars in `.env`.

**Components** live inside the top-level `components/` directory. Layout (Header + Footer) is applied in `pages/_app.js`.

**Styling**: Tailwind CSS with custom brand colors defined in `tailwind.config.js`. Font: Montserrat. Uses `page-x-width` as a shared container class.

**Path alias**: `@/*` maps to the project root.

## Content Updates

To add/edit team members, papers, projects, or news, edit the corresponding files in `data/`. Team CSVs have columns: `name,titles,image,link`. Member photos go in `public/members/`, research images in `public/research/`.

To add a blog post, create a new `.md` file in `data/blog_posts/` with gray-matter frontmatter. Blog images go in `public/blog/`.
