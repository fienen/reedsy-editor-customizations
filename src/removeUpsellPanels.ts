// Set up a reload timer because it can take a few seconds for the editor to load, and we don't want the script to run infinitely if there's a problem.
let removeUpsellReloads = 0;

export const removeUpsellPanels = () => {
    // Get elements that have ads
    let statsContainer  = document.querySelector('rbe-extra-stats');
    let premiumAdBanner = document.querySelector('rbe-premium-ad-banner-wrapper');
    let actionButtons   = document.querySelectorAll('#action-panel .action-button');

    if (premiumAdBanner && statsContainer && statsContainer.children.length > 1 && actionButtons.length > 0) {
        let statPanelsToRemove = statsContainer.querySelectorAll('.extra-stats-panel');

        // Remove the first two accordion panels found in the stat panel
        if (statPanelsToRemove.length > 1) {
            statPanelsToRemove[1].remove(); // Most used phrases
            statPanelsToRemove[0].remove(); // Most used words
        }

        // Remove the premium ad banner in the bottom of the left sidebar
        premiumAdBanner.remove();

        // Remove "Pinned note" button
        actionButtons[2].remove();
    } else {
        // Increment counter
        removeUpsellReloads++;

        // Stop trying after 10 attempts with appropriate error message
        if(removeUpsellReloads > 10) {
            console.error('[Reedsy Editor Customizations] Failed to find all upsell panels after multiple attempts. Giving up.');
            return;
        } else {
            console.log('[Reedsy Editor Customizations] Upsell ads not detected, retrying in 5 seconds. (Attempt ' + removeUpsellReloads + ' of 10)');
            setTimeout(removeUpsellPanels, 5000);
        }
    }
};