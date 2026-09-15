// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { remarkAdmonition } from './src/lib/remark-admonitions.mjs';
import { remarkBaseLinks } from './src/lib/remark-base-links.mjs';

/**
 * DEPLOYMENT TARGET — GitHub Pages PROJECT site:
 *   https://andrynzyh.github.io/project-62/        (repo: andrynzyh/project-62)
 *
 * `site` = origin, `base` = repo sub-path. Keep the two in sync when moving:
 *   - custom domain / Vercel root  →  site: 'https://your-domain.tld', base: '/'
 * All internal links flow through src/lib/paths.ts (withBase) and Markdown
 * paths are rewritten by remarkBaseLinks below, so nothing else must change.
 */
const SITE = 'https://andrynzyh.github.io';
const BASE = '/project-62';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  integrations: [sitemap()],

  // Hide the floating Astro Dev Toolbar in `npm run dev`
  // (it never appears in production builds anyway).
  devToolbar: {
    enabled: false,
  },

  markdown: {
    remarkPlugins: [
      remarkDirective,
      remarkAdmonition,
      // "/misc/img.webp" in Markdown → "/project-62/misc/img.webp" in the build
      remarkBaseLinks({ base: BASE }),
    ],
  },
});
