import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  session: false,
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  },
});
