import { initThemeButton, enforceThemePreference } from './themeToggle';
import { removeUpsellPanels } from './removeUpsellPanels';

(function() {
    'use strict';

    // Set up an observer to watch for changes to the <html> class list in case Reedsy tries to override our theme preference
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // This prevents Reedsy from overwriting your change when you navigate chapters
            if (mutation.attributeName === "class") enforceThemePreference();
        });
    });

    // Start observing the <html> element
    observer.observe(document.documentElement, { attributes: true });

    // Wait before trying to initialize to give the editor time to load
    setTimeout(initThemeButton, 5000);
    setTimeout(removeUpsellPanels, 5000);
})();
