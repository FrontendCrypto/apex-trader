// Import necessary modules and plugins
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Configuration for Vite
export default defineConfig({
  plugins: [
    // Use the Vue plugin
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Set the alias for the source directory
    },
  },
});
