# Architecture Documentation

## System Overview

heyhido.com is a modern static blog/portfolio built with Astro and Svelte 5, deployed on GitHub Pages.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 5.x | Static site generation, routing |
| UI Components | Svelte 5 | Interactive client-side components |
| Styling | Tailwind CSS 4.x | Utility-first CSS |
| Content | Markdown | Blog posts with frontmatter |
| Deployment | GitHub Actions | CI/CD to GitHub Pages |
| Hosting | GitHub Pages | Static hosting with custom domain |

## Architecture Diagram

```mermaid
graph TB
    subgraph "Build Time"
        MD[Markdown Posts] --> CC[Content Collections]
        CC --> Astro[Astro Build]
        Svelte[Svelte Components] --> Astro
        CSS[Tailwind CSS] --> Astro
        Astro --> Static[Static HTML/JS/CSS]
    end

    subgraph "GitHub"
        Push[git push] --> Actions[GitHub Actions]
        Actions --> Build[npm run build]
        Build --> Deploy[Deploy to Pages]
    end

    subgraph "Runtime"
        Browser[Browser] --> CDN[GitHub Pages CDN]
        CDN --> HTML[Static Files]
        HTML --> Hydration[Svelte Hydration]
    end

    Static --> Push
    Deploy --> CDN
```

## Component Architecture

```mermaid
graph TD
    subgraph "Layout Layer"
        BL[BaseLayout.astro]
        BL --> Header[Header.svelte]
        BL --> Main[Page Content]
        BL --> Footer[Footer.svelte]
    end

    subgraph "Page Layer"
        Main --> Index[index.astro]
        Main --> About[about.astro]
        Main --> Posts[posts/index.astro]
        Main --> PostSlug[posts/slug.astro]
        Main --> Tags[tags/index.astro]
        Main --> TagSlug[tags/tag.astro]
        Main --> Now[now.astro]
    end

    subgraph "Component Layer"
        Index --> PostRow[PostRow.svelte]
        About --> ScrambleTitle[ScrambleTitle.svelte]
        About --> Marquee[Marquee.svelte]
        Posts --> PostRow
        Posts --> ScrambleTitle
        Tags --> ScrambleTitle
    end
```

## Data Flow

```mermaid
sequenceDiagram
    participant MD as Markdown Files
    participant CC as Content Config
    participant Page as Astro Page
    participant Component as Svelte Component
    participant Browser as Browser

    MD->>CC: Define schema (zod)
    CC->>Page: getCollection('posts')
    Page->>Page: Filter & sort posts
    Page->>Component: Pass props (title, date, slug)
    Component->>Browser: Render HTML
    Browser->>Component: Hydrate (client:load)
    Component->>Browser: Interactive UI
```

## Directory Structure

```
/
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   └── PostRow.svelte      # Blog post list item
│   │   ├── layout/
│   │   │   ├── Header.svelte       # Navigation + theme toggle
│   │   │   └── Footer.svelte       # Social links + copyright
│   │   └── ui/
│   │       ├── Marquee.svelte      # Scrolling text banner
│   │       └── ScrambleTitle.svelte # Animated page titles
│   ├── content/
│   │   └── posts/                  # Markdown blog posts
│   ├── layouts/
│   │   └── BaseLayout.astro        # Main HTML wrapper
│   ├── lib/
│   │   └── utils/
│   │       └── index.ts            # Utility functions (cn)
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   ├── about.astro             # About page
│   │   ├── now.astro               # /now page
│   │   ├── 404.astro               # Error page
│   │   ├── rss.xml.ts              # RSS feed
│   │   ├── posts/
│   │   │   ├── index.astro         # All posts
│   │   │   └── [...slug].astro     # Individual post
│   │   └── tags/
│   │       ├── index.astro         # All tags
│   │       └── [tag].astro         # Posts by tag
│   └── styles/
│       └── global.css              # Theme + animations
├── public/
│   ├── favicon.svg
│   └── images/
├── astro.config.mjs                # Astro configuration
├── svelte.config.js                # Svelte configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## Routing

| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `index.astro` | Static | Homepage with hero + recent posts |
| `/about` | `about.astro` | Static | Bio, image, marquee |
| `/now` | `now.astro` | Static | Current activities |
| `/posts` | `posts/index.astro` | Static | All posts grouped by year |
| `/posts/[slug]` | `posts/[...slug].astro` | Dynamic | Individual blog post |
| `/tags` | `tags/index.astro` | Static | All tags with counts |
| `/tags/[tag]` | `tags/[tag].astro` | Dynamic | Posts filtered by tag |
| `/rss.xml` | `rss.xml.ts` | Generated | RSS feed |
| `/404` | `404.astro` | Static | Not found page |

## Content Schema

```typescript
// src/content.config.ts
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
```

## Build Process

```mermaid
flowchart LR
    A[Source Files] --> B[Astro Build]
    B --> C[Process Markdown]
    B --> D[Compile Svelte]
    B --> E[Bundle CSS]
    C --> F[Generate HTML]
    D --> F
    E --> F
    F --> G[Output: /dist]
    G --> H[Deploy to GitHub Pages]
```

## Performance Considerations

1. **Static Generation**: All pages pre-rendered at build time
2. **Partial Hydration**: Only interactive components use `client:load`
3. **CSS Optimization**: Tailwind purges unused styles
4. **Font Loading**: Geist Sans loaded from local package
5. **Image Optimization**: Static images in `/public`
6. **Smooth Scrolling**: Lenis library for smooth scroll experience

## Security

- No server-side code (fully static)
- No database connections
- No user authentication
- Content served over HTTPS via GitHub Pages
- Custom domain with SSL certificate
