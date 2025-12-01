import { initThemeButton, enforceThemePreference } from './themeToggle';
import { removeUpsellPanels } from './removeUpsellPanels';
import { initMostUsedWords } from './frequentWords';

export let chapterEditor = document.getElementById('chapter-editor');
let initReloads          = 0;

/**
 * Returns a function that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 * @param {Function} func - The function to run
 * @param {number} delay - The delay in milliseconds
 */
export function debounce<T extends any[]>(func: (...args: T) => void, delay: number | undefined) {
  let timeoutId: number | undefined;

  return (...args: T) => {
    // 1. Clear the existing timer (if any)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 2. Set a new timer
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Initializes editor customizations for the Reedsy editor.
 * 
 * This function attempts to locate the chapter editor element and set up various customizations including:
 * - Theme preference enforcement through a MutationObserver that watches for class changes on the HTML element
 * - Theme toggle button initialization
 * - Removal of upsell panels
 * 
 * If the editor is not immediately available, the function will retry up to 10 times with a 4-second delay
 * between attempts. After 10 failed attempts, an error is logged and the function stops retrying.
 * 
 * @remarks
 * The MutationObserver ensures that theme preferences persist even when Reedsy attempts to override them
 * during chapter navigation.
 * 
 * @example
 * ```typescript
 * // Call on page load or when needed
 * initEditorCustomizations();
 * ```
 */
export function initEditorCustomizations() {
    if (!chapterEditor) {
        // Increment counter
        initReloads++;

        // Stop trying after 10 attempts with appropriate error message
        if(initReloads > 10) {
            console.error('[Reedsy Editor Customizations] Failed to detect editor after multiple attempts. Giving up. Try reloading the page.');
            return;
        } else {
            console.log('[Reedsy Editor Customizations] Editor not ready, retrying in 4 seconds. (Attempt ' + initReloads + ' of 10)');
            
            // Try getting the editor again before next attempt
            chapterEditor = document.getElementById('chapter-editor');
            setTimeout(initEditorCustomizations, 4000);
        }
    } else {
        // Set up an observer to watch for changes to the <html> class list in case Reedsy tries to override our theme preference
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // This prevents Reedsy from overwriting your change when you navigate chapters
                if (mutation.attributeName === "class") enforceThemePreference();
            });
        });

        // Start observing
        observer.observe(document.documentElement, { attributes: true });

        // Run feature initializations
        enforceThemePreference();
        initThemeButton();
        removeUpsellPanels();
        initMostUsedWords();
    }
}