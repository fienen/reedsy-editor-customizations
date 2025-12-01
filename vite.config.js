import { defineConfig } from 'vite';
import { resolve } from 'path';

const banner = `// ==UserScript==
  // @name         Reedsy Editor Customizations
  // @namespace    http://github.com/fienen/
  // @version      0.5.251130-alpha
  // @description  Remove upsell banners and features, and enable/add replacement features
  // @author       Michael Fienen <fienen@gmail.com>
  // @source       http://github.com/fienen/reedsy-customize-editor/
  // @match        https://editor.reedsy.com/book/*
  // @include      https://editor.reedsy.com/book/*
  // @icon         https://www.google.com/s2/favicons?sz=64&domain=reedsy.com
  // @grant        GM_setValue
  // @grant        GM_getValue
  // @grant        GM_addStyle
  // @tag          productivity
  // @supportURL   https://github.com/fienen/reedsy-editor-customizations/issues/
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