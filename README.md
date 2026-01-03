# heyhido.com

Personal blog built with Astro, Svelte, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro](https://astro.build) (static-first, islands architecture) |
| Components | [Svelte 5](https://svelte.dev) (interactive islands) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn-svelte](https://shadcn-svelte.com) |
| Reverse Proxy | [Caddy](https://caddyserver.com) (automatic HTTPS) |
| Containerization | Docker |

## Project Structure

```
├── src/
│   ├── content/posts/     # Markdown blog posts
│   ├── components/
│   │   ├── layout/        # Header, Footer (Svelte)
│   │   └── blog/          # PostCard (Astro)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── utils/         # Utility functions (cn helper)
│   ├── pages/
│   │   ├── index.astro    # Homepage
│   │   ├── about.astro
│   │   ├── now.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.ts     # RSS feed
│   │   ├── posts/
│   │   │   ├── index.astro        # Posts archive
│   │   │   └── [...slug].astro    # Individual posts
│   │   └── tags/
│   │       ├── index.astro        # Tag cloud
│   │       └── [tag].astro        # Posts by tag
│   └── styles/
│       └── global.css     # Tailwind + theme variables
├── public/
│   ├── images/
│   └── favicon.svg
├── scripts/
│   └── migrate-posts.js   # Hugo to Astro migration script
├── Dockerfile
├── docker-compose.yml              # Local Docker setup
├── docker-compose.production.yml   # Production deployment
├── Caddyfile                       # Local Caddy config
└── Caddyfile.production            # Production Caddy config
```

## Development

### Prerequisites

- Node.js 20+
- npm

### Local Development

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
tags: ["tag1", "tag2"]
draft: false
---

Your content here...
```

### Dark Mode

Dark mode is handled via:
1. System preference detection on first load
2. Manual toggle (persisted to localStorage)
3. CSS variables in `global.css` with `.dark` class

## Deployment

### Docker (Local)

```bash
# Build and run locally
docker compose up --build

# Access at http://localhost
```

### Production (Hetzner VPS)

1. **Provision a VPS** (Ubuntu/Debian recommended)

2. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com | sh
   ```

3. **Clone and deploy:**
   ```bash
   git clone <your-repo>
   cd astro-site
   docker compose -f docker-compose.production.yml up -d
   ```

4. **Configure DNS:**
   - Point `heyhido.com` A record to your VPS IP
   - Point `www.heyhido.com` A record to your VPS IP (redirects to non-www)

5. **HTTPS:** Caddy automatically provisions Let's Encrypt certificates

### Updating the Site

```bash
# On your VPS
cd astro-site
git pull
docker compose -f docker-compose.production.yml up -d --build
```

## Configuration

### Site Settings

Edit `astro.config.mjs`:
- `site`: Your production URL

Edit `src/layouts/BaseLayout.astro`:
- Google Analytics ID
- Default meta tags

### Theme Colors

Edit `src/styles/global.css`:
- Light mode: Variables in `@theme { }` block
- Dark mode: Variables in `.dark { }` block

## Content Migration

The original site was migrated from Hugo. The migration script is preserved at `scripts/migrate-posts.js` for reference.

**What it does:**
- Converts TOML frontmatter (`+++`) to YAML (`---`)
- Handles multi-line tag arrays
- Fixes image paths
- Copies images to public directory

## Future: Adding FastAPI Backend

When you need server-side features (dashboards, AI integrations, etc.):

1. Create `backend/` directory with FastAPI app
2. Update `docker-compose.production.yml`:
   ```yaml
   services:
     web:
       # ... existing config
     
     backend:
       build: ./backend
       restart: unless-stopped
   ```

3. Update `Caddyfile.production`:
   ```
   heyhido.com {
       handle /api/* {
           reverse_proxy backend:8000
       }
       handle {
           root * /srv
           file_server
           try_files {path} {path}/ {path}/index.html /index.html
       }
   }
   ```

## License

Content is copyright Hidayat Heydarov. Code is MIT licensed.
