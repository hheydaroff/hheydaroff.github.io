# heyhido.com

[![Deploy to GitHub Pages](https://github.com/hheydaroff/hheydaroff.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hheydaroff/hheydaroff.github.io/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fheyhido.com)](https://heyhido.com)

Personal blog exploring ideas at the intersection of AI, data, and human behavior.

**Live Site:** [heyhido.com](https://heyhido.com)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 5.x](https://astro.build) - Static site generation |
| Components | [Svelte 5](https://svelte.dev) - Interactive islands |
| Styling | [Tailwind CSS 4.x](https://tailwindcss.com) |
| Fonts | [Geist Sans](https://vercel.com/font) |
| Deployment | GitHub Actions → GitHub Pages |
| Domain | Custom domain with HTTPS |

## Features

- Dark/light theme toggle with system preference detection
- Token scramble animation on page titles
- Infinite scroll marquee banner
- Blog posts with tags, reading time, and RSS feed
- Responsive design
- SEO optimized (Open Graph, Twitter Cards)

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   └── PostRow.svelte       # Post list item with hover effects
│   │   ├── layout/
│   │   │   ├── Header.svelte        # Navigation + theme toggle
│   │   │   └── Footer.svelte        # Social links
│   │   └── ui/
│   │       ├── Marquee.svelte       # Scrolling text banner
│   │       └── ScrambleTitle.svelte # Animated page titles
│   ├── content/
│   │   └── posts/                   # Markdown blog posts (100+)
│   ├── layouts/
│   │   └── BaseLayout.astro         # Main HTML wrapper
│   ├── lib/utils/                   # Utility functions
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── about.astro              # About page
│   │   ├── now.astro                # /now page
│   │   ├── posts/                   # Blog posts
│   │   ├── tags/                    # Tag pages
│   │   └── rss.xml.ts               # RSS feed
│   └── styles/
│       └── global.css               # Theme + animations
├── public/                          # Static assets
├── docs/                            # Documentation
└── playwright-tests/                # E2E tests
```

## Development

### Prerequisites

- Node.js 20+
- npm

### Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding a New Post

Create a new markdown file in `src/content/posts/`:

```markdown
---
title: "Your Post Title"
date: 2025-01-01
author: "Hido"
tags: ["ai", "productivity"]
draft: false
---

Your content here...
```

## Deployment

The site automatically deploys to GitHub Pages when pushing to `master`:

1. Push triggers GitHub Actions workflow
2. Astro builds static files to `/dist`
3. Files deployed to GitHub Pages
4. Custom domain `heyhido.com` serves the content

### Manual Deployment

```bash
# Build
npm run build

# The dist/ folder contains the static site
```

## Configuration

### Site Settings

**`astro.config.mjs`:**
```javascript
export default defineConfig({
  site: 'https://heyhido.com',
  integrations: [svelte()],
  // ...
});
```

### Theme Colors

**`src/styles/global.css`:**
- Light mode: Default CSS variables
- Dark mode: `.dark` class overrides

### Content Schema

**`src/content.config.ts`:**
```typescript
schema: z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string().default('Hido'),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  description: z.string().optional(),
})
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Components](docs/COMPONENTS.md) - Component API reference
- [Configuration](docs/CONFIGURATION.md) - Setup and customization

## Testing

```bash
# Run Playwright tests
node playwright-tests/manual-test.cjs

# View test report
cat playwright-tests/MANUAL-TEST-REPORT.md
```

## License

Content is copyright Hidayat Heydarov. Code is MIT licensed.
