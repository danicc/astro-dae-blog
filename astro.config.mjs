// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const isProduction = process.env.NODE_ENV === 'production';
const siteUrl = isProduction ? 'https://danicc.github.io/astro-dae-blog/' : 'http://localhost:4321';
const basePath = isProduction ? '/astro-dae-blog' : '/';

export default defineConfig({
  site: siteUrl,
  base: basePath,
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: {
      'es': 'en'
    },
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      fallbackType: 'redirect'
    }
  },
  integrations: [react()]
});