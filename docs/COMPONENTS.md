# Component Documentation

## Overview

The site uses a combination of Astro components (`.astro`) for static content and Svelte 5 components (`.svelte`) for interactive elements.

---

## Layout Components

### BaseLayout.astro

**Location:** `src/layouts/BaseLayout.astro`

**Purpose:** Main HTML wrapper providing consistent page structure, meta tags, and global styles.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Hido"` | Page title for `<title>` tag |
| `description` | `string` | `"Exploring ideas..."` | Meta description for SEO |
| `ogImage` | `string` | `"/images/avatar.png"` | Open Graph image URL |

**Features:**
- SEO meta tags (Open Graph, Twitter Cards)
- Google Analytics integration
- Theme detection (prevents flash on load)
- Smooth scroll via Lenis library
- Header and Footer inclusion

**Usage:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About" description="Learn more about me">
  <h1>About Page</h1>
</BaseLayout>
```

---

### Header.svelte

**Location:** `src/components/layout/Header.svelte`

**Purpose:** Fixed navigation header with theme toggle functionality.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPath` | `string?` | `undefined` | Current page path for active link highlighting |

**Features:**
- Fixed positioning with glass-morphism effect
- Navigation links: Home, Posts, Tags, About, Now
- Dark/light theme toggle with localStorage persistence
- Active link highlighting
- Responsive design

**Internal State:**
- `isDark: boolean` - Current theme state

**Methods:**
- `toggleTheme()` - Switches between dark and light mode
- `isActive(href)` - Checks if a nav link matches current path

**Usage:**
```astro
<Header client:load currentPath={Astro.url.pathname} />
```

---

### Footer.svelte

**Location:** `src/components/layout/Footer.svelte`

**Purpose:** Site footer with social links and copyright.

**Props:** None

**Features:**
- Social media links (LinkedIn, GitHub, Twitter/X, RSS)
- Dynamic copyright year
- Hover animations on links
- SVG icons

**Usage:**
```astro
<Footer />
```

---

## UI Components

### ScrambleTitle.svelte

**Location:** `src/components/ui/ScrambleTitle.svelte`

**Purpose:** Interactive page title with scramble/glitch animation on hover, revealing a "token ID".

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | Required | Display text (shown normally and on mouse leave) |
| `tokenId` | `string` | Required | Token ID revealed on hover |
| `class` | `string?` | `'mb-4'` | Additional CSS classes |

**Animation Details:**
- Duration: 600ms
- Characters: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*`
- Iterations: 8 per character
- Uses `requestAnimationFrame` for smooth animation

**Token IDs Used:**
| Page | Text | Token ID |
|------|------|----------|
| Posts | POSTS | 20204 |
| Tags | TAGS | 16309 |
| About | ABOUT | 10714 |
| Now | NOW | 7184 |

**Usage:**
```astro
<ScrambleTitle
  client:load
  text="POSTS"
  tokenId="20204"
  class="mb-8"
/>
```

---

### Marquee.svelte

**Location:** `src/components/ui/Marquee.svelte`

**Purpose:** Infinite scrolling text banner with multiple rows.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `string[]` | See below | Array of text strings for each row |

**Default Rows:**
```javascript
[
  "ARCHITECTING THE FUTURE OF INTELLIGENCE",
  "TRANSFORMING DATA INTO STRATEGIC ADVANTAGES",
  "LET'S BUILD THE FUTURE TOGETHER"
]
```

**Features:**
- Seamless infinite loop animation
- Alternating scroll direction (odd rows reverse)
- Variable speed per row (120s + index * 20s)
- Inverted colors (dark bg, light text)
- Border separators between rows
- Accessibility: duplicate content marked `aria-hidden`

**Animation:**
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

**Usage:**
```astro
<Marquee client:load />

<!-- Custom rows -->
<Marquee
  client:load
  rows={["CUSTOM TEXT ONE", "CUSTOM TEXT TWO"]}
/>
```

---

## Blog Components

### PostRow.svelte

**Location:** `src/components/blog/PostRow.svelte`

**Purpose:** Single blog post row with hover effects for the posts list.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Post title |
| `date` | `Date` | Required | Publication date |
| `slug` | `string` | Required | URL slug for linking |

**Features:**
- Hover effect: title blurs, date reveals
- Links to `/posts/{slug}/`
- Date formatted as "YYYY Mon"
- Responsive text sizing (xl → 3xl)
- 300ms transition duration

**Internal State:**
- `isHovered: boolean` - Tracks hover state

**Usage:**
```astro
{posts.map((post) => (
  <PostRow
    client:load
    title={post.data.title}
    date={post.data.date}
    slug={post.id}
  />
))}
```

---

### PostCard.astro

**Location:** `src/components/blog/PostCard.astro`

**Purpose:** Alternative card-style post display (not currently used in main pages).

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Post title |
| `date` | `Date` | Publication date |
| `slug` | `string` | URL slug |
| `tags` | `string[]` | Post tags |

---

## Utility Functions

### cn() - Class Name Merger

**Location:** `src/lib/utils/index.ts`

**Purpose:** Intelligently merge Tailwind CSS classes, resolving conflicts.

**Signature:**
```typescript
function cn(...inputs: ClassValue[]): string
```

**Usage:**
```typescript
import { cn } from '$lib/utils';

// Resolves conflicts: "px-4" wins over "px-2"
cn("px-2 py-1", "px-4");  // → "py-1 px-4"

// Conditional classes
cn("base-class", isActive && "active-class");
```

---

## Component Hydration

Svelte components require explicit hydration directives in Astro:

| Directive | When to Use |
|-----------|-------------|
| `client:load` | Component needs JS immediately (Header, interactive components) |
| `client:idle` | Component can wait until browser is idle |
| `client:visible` | Component hydrates when visible in viewport |
| None | Static component, no client-side JS |

**Example:**
```astro
<!-- Immediate hydration -->
<Header client:load currentPath={Astro.url.pathname} />

<!-- No hydration needed -->
<Footer />
```

---

## Styling Conventions

### Theme Variables

Components use CSS custom properties defined in `global.css`:

```css
/* Light mode */
--background: 0 0% 100%;
--foreground: 0 0% 9%;
--muted-foreground: 0 0% 45%;
--border: 0 0% 90%;

/* Dark mode (.dark) */
--background: 0 0% 4%;
--foreground: 0 0% 98%;
--muted-foreground: 0 0% 64%;
--border: 0 0% 15%;
```

### Animation Classes

```css
.animate-fade-in        /* 0.6s opacity fade */
.animate-fade-in-up     /* 0.6s fade + slide up */
.animate-delay-100      /* 100ms delay */
.animate-delay-200      /* 200ms delay */
.animate-delay-300      /* 300ms delay */
```
