import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  // Deine spätere Domain. Wird für absolute Links und die Sitemap verwendet.
  site: 'https://www.niklaslibary.de',
  trailingSlash: 'always',
  redirects: {
    '/': '/de/',
  },
  vite: {
    plugins: [yaml()],
  },
});
