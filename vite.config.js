import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import path from 'path'

export default defineConfig(() => {
  return {
    base: "/open-trivia-game/",
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000
    },
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
  };
});