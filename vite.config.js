import { defineConfig } from 'vite';
import { resolve } from 'path';

const banner = `// ==UserScript==
// @name         Reedsy Editor Customizations
// @namespace    http://github.com/fienen
// @version      0.3.251126
// @description  Trick Reedsy into giving me dark mode
// @author       Michael Fienen <fienen@gmail.com>
// @match        https://editor.reedsy.com/book/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reedsy.com
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==`;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'ReedsyEditorCustomizations',
      fileName: () => 'reedsy-editor-customizations.user.js',
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