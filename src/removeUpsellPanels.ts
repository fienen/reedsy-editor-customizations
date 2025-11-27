// Set up a reload timer because it can take a few seconds for the editor to load, and we don't want the script to run infinitely if there's a problem.
let removeUpsellReloads = 0;

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