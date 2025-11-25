// ==UserScript==
// @name         Reedsy Dark Mode
// @namespace    http://github.com/fienen
// @version      1.0.251125
// @description  Trick Reedsy into giving me dark mode and remove premium upsell prompts
// @author       Michael Fienen <fienen@gmail.com>
// @match        https://editor.reedsy.com/book/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reedsy.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const enforceDarkTheme = () => {
        const html = document.documentElement;

        // Check if the "light-theme" class exists
        if (html.classList.contains('light-theme')) {
            html.classList.remove('light-theme');
            html.classList.add('dark-theme');
            console.log('Reedsy Theme Setter: Replaced .light-theme with .dark-theme.');
        }

        // Safety check: Ensure dark-theme is present if light isn't there but no theme is set
        if (!html.classList.contains('dark-theme')) {
            html.classList.add('dark-theme');
        }
    };


    // 1. Set up an observer to watch for changes to the <html> class list
    // This prevents Reedsy from overwriting your change when you navigate chapters
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                enforceDarkTheme();
            }
        });
    });

    // 2. Run immediately on load
    enforceDarkTheme();

    // Start observing the <html> element
    observer.observe(document.documentElement, { attributes: true });
})();
