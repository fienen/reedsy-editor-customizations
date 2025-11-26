import { defineConfig } from 'vite';
import { resolve } from 'path';

// Helper to extract the comment block from main.ts
const banner = `// ==UserScript==
// @name         Reedsy Dark Mode
// @namespace    http://github.com/fienen
// @version      1.0.251125
// @description  Trick Reedsy into giving me dark mode
// @author       Michael Fienen <fienen@gmail.com>
// @match        https://editor.reedsy.com/book/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reedsy.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==`;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'ReedsyCustomizeEditor',
      // Force the specific filename we want
      fileName: () => 'reedsy-customize-editor.user.js',
      // IIFE is the standard format for UserScripts (prevents global variable leaks)
      formats: ['iife'],
    },
    minify: 'terser',
    terserOptions: {
      format: {
        comments: 'some',
        preamble: banner
      },
    },
  },
});