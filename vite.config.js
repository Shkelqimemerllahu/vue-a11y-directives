import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueA11yDirectives',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'vue-a11y-directives.esm.js';
        if (format === 'cjs') return 'vue-a11y-directives.cjs.js';
        return 'vue-a11y-directives.min.js';
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    }
  }
});
