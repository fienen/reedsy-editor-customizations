let removeUpsellReloads = 0;

/**
 * Removes premium upsell panels and advertisements from the Reedsy editor interface.
 * 
 * This function attempts to locate and remove various premium feature promotions including:
 * - Premium statistics panels (most used words/phrases)
 * - Premium ad banners in the sidebar
 * - Premium feature buttons (pinned notes)
 * - Premium feature description boxes
 * 
 * The function implements a retry mechanism that will attempt to find and remove elements
 * up to 10 times with a 2.5 second delay between attempts. This accounts for the editor's
 * asynchronous loading behavior.
 * 
 * @remarks
 * This function modifies the DOM by removing elements and uses a module-level counter
 * (`removeUpsellReloads`) to track retry attempts.
 * 
 * @example
 * ```typescript
 * // Call once to initiate the removal process
 * removeUpsellPanels();
 * ```
 * 
 * @returns void - Does not return a value, but logs success/failure messages to console
 */
// Set up a reload timer because it can take a few seconds for the editor to load, and we don't want the script to run infinitely if there's a problem.
export const removeUpsellPanels = () => {
    // Get elements that have ads
    let statsContainer  = document.querySelector('rbe-extra-stats');
    let premiumAdBanner = document.querySelectorAll('rbe-premium-ad-banner-wrapper');
    let actionButtons   = document.querySelectorAll('#action-panel .action-button');
    let premiumDesc     = document.querySelectorAll('rbe-premium-description');

    if (premiumAdBanner && statsContainer && statsContainer.children.length > 1 && actionButtons.length > 0 && premiumDesc && premiumDesc.length > 0) {
        let statPanelsToRemove = statsContainer.querySelectorAll('.extra-stats-panel');

        // Remove the first two accordion panels found in the stat panel
        if (statPanelsToRemove.length > 1) {
            statPanelsToRemove[1].remove(); // Most used phrases
            statPanelsToRemove[0].remove(); // Most used words
            console.log('[Reedsy Editor Customizations] Removed premium stats panels.');
        }

        // Remove the premium ad banner in the bottom of the left sidebar
        premiumAdBanner.forEach(banner => banner.remove());
        console.log('[Reedsy Editor Customizations] Removed premium ad banners.');

        // Remove "Pinned note" button
        actionButtons[2].remove();
        console.log('[Reedsy Editor Customizations] Removed premium feature buttons.');

        // Remove premium description boxes ("Unlock Timeline")
        premiumDesc.forEach(desc => desc.remove());
        console.log('[Reedsy Editor Customizations] Removed premium feature description boxes.');
    } else {
        // Increment counter
        removeUpsellReloads++;

        // Stop trying after 10 attempts with appropriate error message
        if(removeUpsellReloads > 10) {
            console.error('[Reedsy Editor Customizations] Failed to find all upsell panels after multiple attempts. Giving up.');
            return;
        } else {
            console.log('[Reedsy Editor Customizations] Upsell ads not detected, retrying in 5 seconds. (Attempt ' + removeUpsellReloads + ' of 10)');
            setTimeout(removeUpsellPanels, 2500);
        }
    }
};