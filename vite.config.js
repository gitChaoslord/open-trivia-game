import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true
    },
    plugins: [react()],
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
  };
});