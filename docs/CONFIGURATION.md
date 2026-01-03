# Configuration Documentation

## Overview

This document covers all configuration files and customization options for the heyhido.com website.

---

## Astro Configuration

**File:** `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://heyhido.com',      // Production URL
  integrations: [svelte()],          // Enable Svelte components
  vite: {
    plugins: [tailwindcss()],        // Tailwind CSS via Vite
    resolve: {
      alias: {
        '$lib': path.resolve(__dirname, './src/lib')  // Path alias
      }
    }
  }
});
```

### Key Settings

| Setting | Value | Description |
|---------|-------|-------------|
| `site` | `https://heyhido.com` | Production URL for sitemap, RSS, canonical URLs |
| `integrations` | `[svelte()]` | Enables Svelte 5 components |
| `vite.plugins` | `[tailwindcss()]` | Tailwind CSS v4 integration |
| `vite.resolve.alias` | `$lib` | Path alias for imports |

---

## TypeScript Configuration

**File:** `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### Path Aliases

| Alias | Path | Usage |
|-------|------|-------|
| `$lib` | `./src/lib` | `import { cn } from '$lib/utils'` |
| `$lib/*` | `./src/lib/*` | `import X from '$lib/components/X'` |

---

## Svelte Configuration

**File:** `svelte.config.js`

```javascript
import { vitePreprocess } from '@astrojs/svelte';

export default {
  preprocess: vitePreprocess(),
};
```

This enables Svelte 5 runes syntax (`$state()`, `$props()`, `$derived()`).

---

## Content Configuration

**File:** `src/content.config.ts`

```typescript
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Hido'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
```

### Post Frontmatter Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Post title |
| `date` | `Date` | Yes | - | Publication date (YYYY-MM-DD) |
| `author` | `string` | No | `"Hido"` | Author name |
| `tags` | `string[]` | No | `[]` | Post categories |
| `draft` | `boolean` | No | `false` | Hide from listings |
| `description` | `string` | No | - | SEO description |

### Example Frontmatter

```yaml
---
title: "Building AI Products"
date: 2025-01-01
author: "Hido"
tags: ["ai", "product", "technology"]
draft: false
description: "A guide to building AI-powered products"
---
```

---

## Theme Configuration

**File:** `src/styles/global.css`

### CSS Custom Properties

```css
@theme {
  /* Light mode colors */
  --color-background: #FFFFFF;
  --color-foreground: #171717;
  --color-muted-foreground: #737373;
  --color-border: #E5E5E5;
  --color-secondary: #F5F5F5;
  --color-secondary-foreground: #171717;

  /* Typography */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;

  /* Borders */
  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);
}

.dark {
  /* Dark mode overrides */
  --color-background: #0A0A0A;
  --color-foreground: #FAFAFA;
  --color-muted-foreground: #A3A3A3;
  --color-border: #262626;
  --color-secondary: #262626;
  --color-secondary-foreground: #FAFAFA;
}
```

### Color Palette

| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--color-background` | `#FFFFFF` | `#0A0A0A` | Page background |
| `--color-foreground` | `#171717` | `#FAFAFA` | Primary text |
| `--color-muted-foreground` | `#737373` | `#A3A3A3` | Secondary text |
| `--color-border` | `#E5E5E5` | `#262626` | Borders, dividers |
| `--color-secondary` | `#F5F5F5` | `#262626` | Secondary backgrounds |

---

## Animation Configuration

**File:** `src/styles/global.css`

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### Animation Classes

| Class | Duration | Effect |
|-------|----------|--------|
| `animate-fade-in` | 0.6s | Opacity 0 → 1 |
| `animate-fade-in-up` | 0.6s | Opacity + slide up |
| `animate-delay-100` | 100ms | Staggered delay |
| `animate-delay-200` | 200ms | Staggered delay |
| `animate-delay-300` | 300ms | Staggered delay |

---

## SEO Configuration

**File:** `src/layouts/BaseLayout.astro`

### Meta Tags

```html
<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />
<meta name="author" content="Hidayat Heydarov" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(ogImage, Astro.site)} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(ogImage, Astro.site)} />

<!-- Canonical -->
<link rel="canonical" href={Astro.url} />
```

### Defaults

| Property | Default Value |
|----------|---------------|
| Title | `"Hido"` |
| Description | `"Exploring ideas at the intersection of tech, psychology, and human behavior."` |
| OG Image | `/images/avatar.png` |

---

## Analytics Configuration

**File:** `src/layouts/BaseLayout.astro`

```html
<!-- Google Analytics -->
<script
  type="text/partytown"
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-V7JRDN5H5Y"
></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-V7JRDN5H5Y');
</script>
```

**Analytics ID:** `G-V7JRDN5H5Y`

---

## GitHub Actions Configuration

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Triggers

| Trigger | Description |
|---------|-------------|
| `push: branches: [master]` | Deploy on push to master |
| `workflow_dispatch` | Manual trigger from GitHub UI |

---

## Package Dependencies

**File:** `package.json`

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `astro` | `^5.16.6` | Static site generator |
| `@astrojs/svelte` | `^7.2.4` | Svelte integration |
| `@astrojs/rss` | `^4.0.14` | RSS feed generation |
| `svelte` | `^5.46.1` | UI components |
| `tailwindcss` | `^4.1.18` | CSS framework |
| `@tailwindcss/vite` | `^4.1.18` | Vite integration |

### UI Dependencies

| Package | Purpose |
|---------|---------|
| `bits-ui` | Headless UI primitives |
| `clsx` | Conditional class names |
| `tailwind-merge` | Merge Tailwind classes |
| `tailwind-variants` | Variant API for Tailwind |
| `lenis` | Smooth scroll library |

### Typography

| Package | Purpose |
|---------|---------|
| `@fontsource/geist-sans` | Geist Sans font |

---

## Environment Variables

Currently, the site does not require environment variables. All configuration is handled through config files.

### Future Variables (if needed)

```bash
# .env.example
PUBLIC_SITE_URL=https://heyhido.com
PUBLIC_GA_ID=G-V7JRDN5H5Y
```

---

## Customization Quick Reference

### Change Site Title/Description

Edit `src/layouts/BaseLayout.astro`:
```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Your New Title",
  description = "Your new description"
} = Astro.props;
---
```

### Change Theme Colors

Edit `src/styles/global.css`:
```css
@theme {
  --color-background: #YOUR_COLOR;
  --color-foreground: #YOUR_COLOR;
}
```

### Add New Page

1. Create `src/pages/newpage.astro`
2. Add navigation link in `src/components/layout/Header.svelte`

### Change Token IDs

Edit the respective page file and update `ScrambleTitle` props:
```astro
<ScrambleTitle text="PAGE" tokenId="12345" />
```
