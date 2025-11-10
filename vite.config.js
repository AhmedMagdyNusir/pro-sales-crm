import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pro-sales-crm/',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': __dirname + '/src/assets',
      '@components': __dirname + '/src/components',
      '@hooks': __dirname + '/src/hooks',
      '@utils': __dirname + '/src/utils',
    },
  },
});
