# Signal — AI & technology journal

Signal is a responsive editorial website for thoughtful coverage of artificial intelligence and emerging technology. It includes local sample articles, optional NewsAPI headlines, topic browsing, search, bookmarks, theme preferences, newsletter UI, share actions, and contact/about pages.

> **Content notice:** Without an API key, the site displays sample/demo copy. It is explicitly labeled as sample content and is not real-time news. Sample bylines and dates are illustrative. Headlines from NewsAPI are used only when a key is configured and a request succeeds.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## Run locally

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

Vite prints a local address, usually `http://localhost:5173`.

## Optional live headlines

1. Create a key with [NewsAPI](https://newsapi.org/).
2. Set `VITE_NEWS_API_KEY=your_key` in `.env`.
3. Restart the Vite development server.

The app requests English technology top headlines. If the request fails or returns no usable stories, the site keeps its demo stories and displays a visible notice. NewsAPI keys prefixed with `VITE_` are included in browser code; do not use a privileged production key this way. For production, proxy the request through a serverless function or backend and keep the secret server-side. NewsAPI developer plan and CORS restrictions may limit browser-side use.

## Features

- Responsive home, latest, trending, topics/categories, story detail, search, saved stories, about, and contact pages.
- Client-side routing, animated route transitions and scroll-revealed article cards, plus reduced-motion support.
- Search over article title, summary, category, and author; topic filters; paginated story listings.
- Bookmarking and light/dark theme preference persisted in `localStorage`.
- Social sharing with native share support and clipboard fallback where available.
- Newsletter signup UI with validation and local success state. No mailing list is connected.
- Contact form validation and confirmation UI. The form does not transmit or persist submissions; email link provided.
- SEO title updates per route and baseline description/Open Graph metadata.
- News/demo source status labels; optional API failure notice; empty and not-found states.

## Architecture

- React 18, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, Lucide icons.
- `src/data.ts` contains the sample story data and API response mapping.
- `src/App.tsx` contains routing, page components, persistent preferences, and optional NewsAPI integration.
- `src/styles.css` provides the responsive design system and layout styles.

This is a static client application; no database or backend is required for its current features. Browser storage is device-local and is not synchronized between users or devices.
