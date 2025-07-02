// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
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