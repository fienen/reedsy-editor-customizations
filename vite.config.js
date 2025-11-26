import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'), 
            fileName: (format) => 'reedsy-customize-editor.user.js',
            formats: ['iife'],
            name: 'ReedsyCustomizeEditor',
            namespace: 'ReedsyCustomizeEditor',
        },
        minify: 'terser',
        terserOptions: {
          format: {
            comments: 'some',
          },
        }
    },
});