# Style Guide

Design reference for heyhido.com. Follow these conventions when creating new pages or components.

---

## Design Philosophy

**Minimalist, typography-driven, monochrome.** Content first — no decorative imagery on listing pages. Interactions are subtle and purposeful (blur, reveal, scramble). Every element earns its place.

---

## Color Palette

Strictly monochrome with semantic naming. No brand/accent colors.

### Light Mode (default)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#FFFFFF` | Page background |
| `foreground` | `#171717` | Primary text, headings |
| `muted` / `muted-foreground` | `#737373` | Secondary text, labels, metadata |
| `border` | `#E5E5E5` | Dividers, input borders |
| `secondary` | `#F5F5F5` | Tag backgrounds, code blocks, hover fills |
| `primary` | `#171717` | Active nav pill bg, CTA fills |
| `primary-foreground` | `#FAFAFA` | Text on primary bg |
| `destructive` | `#EF4444` | Error states (unused currently) |

### Dark Mode (`.dark` class)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0A0A0A` | Page background |
| `foreground` | `#FAFAFA` | Primary text |
| `muted` / `muted-foreground` | `#A3A3A3` | Secondary text |
| `border` | `#262626` | Dividers |
| `secondary` | `#262626` | Tag backgrounds, fills |
| `primary` | `#FAFAFA` | Active nav pill bg |
| `primary-foreground` | `#171717` | Text on primary bg |

### Usage Rules

- Always use semantic tokens (`text-foreground`, `bg-secondary`) — never raw hex values.
- Dark mode is applied via `.dark` on `<html>`. CSS variables swap automatically.
- For subtle layering use opacity: `bg-foreground/5`, `bg-secondary/40`.

---

## Typography

### Font Stack

| Type | Font | Weights | Variable |
|------|------|---------|----------|
| Sans | **Geist** (via `@fontsource/geist-sans`) | 400, 500, 700 | `--font-sans` |
| Mono | System monospace stack | — | `--font-mono` |

Fallbacks: `ui-sans-serif, system-ui, sans-serif`

### Type Scale

| Element | Classes | Example |
|---------|---------|---------|
| **Page title (ScrambleTitle)** | `text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight font-mono` | POSTS, ABOUT, NOW |
| **Hero headline** | `text-3xl sm:text-4xl md:text-5xl leading-tight` | "I'm Hido, exploring ideas…" |
| **Post title (list row)** | `text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight` | POST TITLE |
| **Section label** | `text-sm font-semibold uppercase tracking-widest text-muted-foreground` | Recent Posts, 2024 |
| **Tiny label** | `text-[10px] font-semibold uppercase tracking-widest text-muted-foreground` | PROJECT, STACK, IMPACT |
| **Body text** | `text-lg leading-relaxed` (about) or `.prose` (blog) | Paragraph copy |
| **Metadata** | `text-sm text-muted-foreground` | Date, reading time, counts |
| **Tag pill** | `text-xs px-3 py-1 bg-secondary rounded-full` | tag name |

### Conventions

- **Page titles**: Always `UPPERCASE`. Use `ScrambleTitle` component with a unique `tokenId`.
- **List item titles**: `font-bold uppercase tracking-tight`.
- **Section headers**: `text-sm font-semibold uppercase tracking-widest text-muted-foreground`.
- **Body copy**: Never bold for emphasis in prose — use `font-semibold` sparingly.
- Blog prose uses the `.prose` component layer (see global.css).

---

## Layout

### Container

```
container mx-auto px-4 max-w-{size}
```

| Context | Max Width | Usage |
|---------|-----------|-------|
| Blog content, about text | `max-w-3xl` (48rem) | Single-column reading |
| Post lists, portfolio rows | `max-w-5xl` (64rem) | Multi-column listings |
| Full-width | `max-w-6xl` (72rem) | About page grid |

### Page Spacing

- Page section padding: `py-16 sm:py-20` (standard) or `py-20 sm:py-28` (hero)
- Space between title and content: `mb-12` to `mb-16`
- Post list items: `py-2 sm:py-3` per row, `space-y-1` between

### Grid System

- Use CSS Grid via Tailwind: `grid grid-cols-1 sm:grid-cols-12 gap-6`
- About page: 2-column on `lg:` (content left, image right)
- Portfolio rows: 4 / 5 / 3 column split on `sm:`

---

## Components

### ScrambleTitle

Animated page heading that scrambles to a token ID on hover.

```astro
<ScrambleTitle client:load text="PAGE" tokenId="12345" class="mb-4" />
```

- Used on: Posts, Tags, About, Now, Portfolio
- Always `client:load` for interactivity
- Font: `font-mono` (overrides sans for the glitch aesthetic)

### PostRow (Svelte)

Blog post list item with hover-reveal date.

- Title blurs on hover (`blur-[2px] opacity-70`)
- Date slides in from left (`opacity-0 -translate-x-4` → `opacity-100 translate-x-0`)
- Transition: `duration-300`

### PortfolioRow (Svelte)

Portfolio project item with hover + expandable detail card.

- Same blur-on-hover pattern as PostRow for title
- Description slides in on hover (same pattern)
- Click expands structured detail panel with: Problem, How it Works (numbered flow pills), Impact (highlighted card), Tech Stack (mono badges)
- Expand transition: `max-h-0 → max-h-[600px]`, `duration-500`

### Marquee (Svelte)

Full-width scrolling text banner. Inverted colors (`bg-foreground text-background`).

- Three rows with alternating scroll directions
- `font-bold uppercase tracking-widest`
- Used on: About page (bottom)

### Navigation (Header.svelte)

Floating pill navigation, centered.

```
fixed top-4 left-1/2 -translate-x-1/2 z-50
```

- Glass effect: `bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md`
- Links: `rounded-full` pills, active state is `bg-foreground text-background`
- Dark mode toggle with sun/moon icons
- Separator: `w-px h-6 bg-border`

### Footer

- Social icons (LinkedIn, GitHub, X, RSS) — stroke-only SVGs, 20×20
- Copyright line
- `border-t border-border`, `py-12`

---

## Interaction Patterns

### Hover: Blur + Reveal

The signature interaction. Used on PostRow and PortfolioRow.

```
// Title blurs
{isHovered ? 'blur-[2px] opacity-70' : ''}

// Hidden element reveals
{isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
```

- Transition: `duration-300`, all properties
- Purpose: Directs attention to metadata without cluttering the default view

### Hover: Image Reveal

Used on homepage avatar and about page photo.

- Default: grayscale blurred image
- Hover: color clear image fades in with scale (`scale-95 → scale-100`)
- Both images stacked via `absolute inset-0`
- Transition: `duration-500 ease-out`

### Expand/Collapse

Used on PortfolioRow detail panel.

```
{isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
```

- `overflow-hidden` on container
- Transition: `duration-500 ease-out`

---

## Animations

Defined in `global.css` under `@layer utilities`.

| Class | Effect | Duration |
|-------|--------|----------|
| `animate-fade-in` | Opacity 0→1 | 0.6s ease-out |
| `animate-fade-in-up` | Opacity 0→1 + translateY 20px→0 | 0.6s ease-out |
| `animate-delay-100` | 100ms delay | — |
| `animate-delay-200` | 200ms delay | — |
| `animate-delay-300` | 300ms delay | — |

### Stagger Pattern

Page elements stagger in sequence:

```astro
<h1 class="animate-fade-in-up">Title</h1>
<p class="animate-fade-in-up animate-delay-100">Subtitle</p>
<div class="animate-fade-in-up animate-delay-200">Content</div>
```

### Smooth Scroll

Lenis library initialized in `BaseLayout.astro`:
- Duration: 1.2s
- Easing: exponential decay
- Orientation: vertical

---

## Page Template

Standard page structure:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ScrambleTitle from '../components/ui/ScrambleTitle.svelte';
---

<BaseLayout title="Page Title" description="Meta description.">
  <section class="py-16 sm:py-20">
    <div class="container mx-auto px-4 max-w-3xl">
      <ScrambleTitle client:load text="TITLE" tokenId="XXXXX" class="mb-4" />
      <p class="text-muted-foreground text-lg animate-fade-in-up animate-delay-100">
        Subtitle or description.
      </p>
    </div>

    <!-- Page content -->
  </section>
</BaseLayout>
```

### Checklist for New Pages

1. Use `BaseLayout` with `title` and `description` props
2. Add `ScrambleTitle` with unique `tokenId`
3. Stagger content with `animate-fade-in-up` + delay classes
4. Use appropriate `max-w-` for content type
5. Add route to `navLinks` array in `Header.svelte` if it's a top-level page
6. Section labels: `text-sm font-semibold uppercase tracking-widest text-muted-foreground`

---

## Links & Buttons

### Text Links

```
text-muted-foreground hover:text-foreground transition-colors duration-200
```

With underline (prose): `underline decoration-muted/50 underline-offset-4 hover:decoration-foreground`

### Back Navigation

```astro
<a href="/target" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
  <!-- Left arrow SVG -->
  Back to label
</a>
```

### CTA Button (outlined)

```
inline-flex items-center px-6 py-3 border border-foreground rounded-full font-medium
hover:bg-foreground hover:text-background transition-all duration-200
```

### CTA Button (filled)

```
inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium
hover:bg-foreground/90 transition-colors duration-200
```

---

## Icons

- Source: Lucide icon set (inline SVGs)
- Size: `18×18` (buttons) or `20×20` (footer social)
- Style: `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- Color: inherits from parent via `currentColor` — use `text-muted-foreground` / `text-foreground`

---

## Prose (Blog Content)

Blog posts render through the `.prose` class (defined in `global.css @layer components`).

| Element | Style |
|---------|-------|
| `h1` | `text-4xl mb-6 font-semibold tracking-tight` |
| `h2` | `text-2xl mt-12 mb-4 font-semibold tracking-tight` |
| `h3` | `text-xl mt-8 mb-3 font-semibold tracking-tight` |
| `p` | `leading-7 mb-6 text-foreground/90` |
| `a` | Underline with `decoration-muted/50`, offset 4, hover darkens |
| `blockquote` | `border-l-2 border-border pl-6 italic text-muted-foreground` |
| `code` (inline) | `bg-secondary px-1.5 py-0.5 rounded text-sm font-mono` |
| `pre` | `bg-secondary p-4 rounded-lg overflow-x-auto` |
| `ul` / `ol` | `ml-6`, disc/decimal markers |
| `img` | `rounded-lg my-8` |
| `table` | `w-full border-collapse`, cells have `border border-border px-4 py-2` |
| `hr` | `border-border my-8` |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-full` | 9999px | Nav pills, tag pills, avatar, CTAs |
| `rounded-lg` | `--radius-lg` = 0.5rem | Images, code blocks, cards |
| `rounded-md` | `--radius-md` | Small cards |

Default shape language is **pill** (`rounded-full`) for interactive elements, **rounded-lg** for content blocks.

---

## Spacing Reference

| Pattern | Value | Where |
|---------|-------|-------|
| Page top/bottom | `py-16 sm:py-20` | Every page section |
| Hero top/bottom | `py-20 sm:py-28` | Homepage hero |
| Title to content | `mb-12` to `mb-16` | After ScrambleTitle block |
| List item vertical | `py-2 sm:py-3` (PostRow), `py-6 sm:py-8` (PortfolioRow) | List rows |
| Footer | `py-12` | Footer |
| Container horizontal | `px-4` | Always |

---

## Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| Use semantic color tokens | Use raw hex values |
| Keep interactions subtle (blur, slide, fade) | Add bouncy, spring, or flashy animations |
| Use uppercase for titles and labels | Mix casing styles on the same page |
| Stagger entrance animations | Animate everything at once |
| Keep monochrome — no accent colors | Introduce colored highlights or gradients |
| Use `rounded-full` for interactive elements | Use sharp corners on buttons or pills |
| Prefer text over imagery in listings | Add thumbnails or decorative images to list views |
| Use stroke-only Lucide SVGs for icons | Use filled icons or icon fonts |
