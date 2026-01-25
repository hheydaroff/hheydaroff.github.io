// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://heyhido.com',
  integrations: [
    svelte(),
    sitemap({
      serialize(item) {
        // Add lastmod for blog posts based on URL pattern
        // Posts have dates in their slugs: /posts/YYYY-MM-DD-...
        const postMatch = item.url.match(/\/posts\/(\d{4}-\d{2}-\d{2})/);
        if (postMatch) {
          const dateStr = postMatch[1];
          item.lastmod = new Date(dateStr).toISOString();
        } else {
          // For non-post pages, use current build time
          item.lastmod = new Date().toISOString();
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '$lib': path.resolve(__dirname, './src/lib')
      }
    }
  }
});
