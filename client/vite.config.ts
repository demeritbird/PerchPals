/// <reference types='vitest' />
/// <reference types='vite/client' />

import { UserConfig, defineConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  // link: https://sass-lang.com/d/legacy-js-api
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      exclude: ['node_modules/', 'src/setupTests.ts'],
    },
  },
  build: {
    rollupOptions: {
      external: [/src\/.*\.(test|stories)\.(ts|tsx)/, /src.setupTests.ts/],
    },
  },
} as VitestConfigExport);
