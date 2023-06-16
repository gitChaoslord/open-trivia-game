import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import checker from 'vite-plugin-checker';

export default defineConfig(() => {
  return {
    base: "/opentdb-trivia-game/",
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true
    },
    plugins: [react(), checker({
      typescript: true, eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
    })],
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
  };
});