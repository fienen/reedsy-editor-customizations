// Set up a reload timer because it can take a few seconds for the editor to load, and we don't want the script to run infinitely if there's a problem.
let themeButtonReloads = 0;

/**
 * Initializes the theme toggle button by replacing the default Reedsy theme button
 * with a custom implementation that persists theme preferences.
 * 
 * This function attempts to locate the theme button in the DOM and replaces it with
 * a cloned version that includes custom click handling. If the button is not found,
 * it will retry up to 10 times with a 2.5 second delay between attempts.
 * 
 * @remarks
 * The function uses Tampermonkey's GM_setValue to persist the user's theme preference
 * across page loads. It also clones the button node to remove existing event listeners
 * before attaching the custom handler.
 * 
 * @throws Will log an error to console if the theme button or its parent cannot be found
 * after 10 retry attempts, or if the parent node is unexpectedly null.
 * 
 * @example
 * ```typescript
 * // Initialize the theme button when the page loads
 * initThemeButton();
 * ```
 */
export const initThemeButton = () => {
    // Find the theme button wrapper and unbind existing events
    let defaultBtnWrapper = document.querySelector('[title="Switch theme"]');

    // If we didn't find the button, wait and try again
    if(defaultBtnWrapper) {
        // Get the button's parent to replace, because that's what Reedsy binds the event to
        defaultBtnWrapper = defaultBtnWrapper.parentNode as Element | null;

        // If we still don't have it, something went wrong, so exit
        if(!defaultBtnWrapper) {
            console.error('[Reedsy Editor Customizations] Failed to find theme button parent. Try reloading the editor.');
            return;
        }

        // Grab our document root
        const html = document.documentElement;
        const newBtnWrapper = defaultBtnWrapper.cloneNode(true);

        // Create our own click handler for our new element that will replace the default behavior
        newBtnWrapper.addEventListener('click', function () {
            // Save preference for future page loads
            html.classList.contains('dark-theme') ? GM_setValue('preferredTheme', 'light') : GM_setValue('preferredTheme', 'dark');
            enforceThemePreference();
        });

        // Replace the old button with the new one
        defaultBtnWrapper.replaceWith(newBtnWrapper);
    } else {
        // Increment counter
        themeButtonReloads++;

        // Stop trying after 10 attempts with appropriate error message
        if(themeButtonReloads > 10) {
            console.error('[Reedsy Editor Customizations] Failed to find theme button after multiple attempts. Giving up.');
            return;
        } else {
            console.log('[Reedsy Editor Customizations] Theme setting not ready, retrying in 5 seconds. (Attempt ' + themeButtonReloads + ' of 10)');
            setTimeout(initThemeButton, 2500);
        }
    }
};

/**
 * Applies the user's saved theme preference to the document.
 * 
 * This function retrieves the theme preference from Tampermonkey storage and applies
 * it to the document root element by toggling the appropriate CSS classes.
 * If no preference is found, no action is taken.
 * 
 * @remarks
 * The function uses GM_getValue to retrieve the stored preference and manipulates
 * the 'dark-theme' and 'light-theme' classes on the document's root element.
 * It only applies changes if the current theme differs from the preferred theme.
 * 
 * @example
 * ```typescript
 * // Enforce theme preference on page load
 * enforceThemePreference();
 * 
 * // Enforce theme preference after user changes theme
 * document.querySelector('#theme-btn').addEventListener('click', enforceThemePreference);
 * ```
 */
export const enforceThemePreference = () => {
    // Try to get saved preference from Tampermonkey storage
    const preferredTheme = GM_getValue('preferredTheme');

    // Grab our document root
    const html = document.documentElement;

    if(preferredTheme) {
        console.log('[Reedsy Editor Customizations] Theme preference detected: ' + preferredTheme);

        // Apply the preferred theme if it's not already correct
        if(preferredTheme === 'dark' && !html.classList.contains('dark-theme')) {
            html.classList.remove('light-theme');
            html.classList.add('dark-theme');
        } else if(preferredTheme === 'light' && !html.classList.contains('light-theme')) {
            html.classList.remove('dark-theme');
            html.classList.add('light-theme');
        }
    }
};