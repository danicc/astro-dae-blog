// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://danicc.github.io/astro-dae-blog/',
  base: '/astro-dae-blog',
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