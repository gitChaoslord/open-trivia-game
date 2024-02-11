import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';
import checker from 'vite-plugin-checker';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    base: "/open-trivia-game/",
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true
    },
    plugins: [
      react(),
      checker({
        typescript: true, eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
        },
      }),
      alias({
        entries: [
          {
            find: "@api",
            replacement: resolve(__dirname, "src/api"),
          },
          {
            find: "@components",
            replacement: resolve(__dirname, "src/components"),
          },
          {
            find: "@constants",
            replacement: resolve(__dirname, "src/constants"),
          },
          {
            find: "@helpers",
            replacement: resolve(__dirname, "src/helpers"),
          },
          {
            find: "@models",
            replacement: resolve(__dirname, "src/models")
          },
          {
            find: "@store",
            replacement: resolve(__dirname, "src/store")
          },
          {
            find: "@views",
            replacement: resolve(__dirname, "src/views")
          }
        ]
      })
    ],
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
  };
});