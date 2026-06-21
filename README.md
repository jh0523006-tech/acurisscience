# Acuris Science V3

Research-grade peptide supplier website — built from scratch with Next.js 15.

## Quick Start

```bash
cd C:\Users\21575\Projects\acuris-science-v3
cp .env.example .env.local
npm install
npm run build
npm run dev
```

## Routes

| Page | Route |
|------|-------|
| Home | `/` |
| Products | `/peptides` |
| Product Detail | `/peptides/[slug]` |
| Services | `/services` |
| About | `/about` |
| Contact | `/contact` |
| Search | `/search` |

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Resend (inquiry emails)
- lucide-react (icons)
- Local lab photography in `/public/images`

## Verification

```bash
npm install
npm run lint   # 0 errors
npm run build  # Build Success
```

## Project Structure

```
acuris-science-v3/
├── app/
│   ├── about/page.tsx
│   ├── api/inquiry/route.ts
│   ├── contact/page.tsx
│   ├── peptides/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── search/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── services/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── icons.tsx
│   ├── InquiryForm.tsx
│   ├── LabImage.tsx
│   ├── layout.tsx
│   ├── SearchBar.tsx
│   ├── sections.tsx
│   └── ui.tsx
├── data/products.ts
├── lib/
│   ├── constants.ts
│   ├── search.ts
│   └── seo.ts
├── public/images/        # 8 lab photos (Pexels)
├── screenshots/          # Page screenshots
├── .env.example
└── package.json
```
