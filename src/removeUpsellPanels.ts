export let statPanelsToRemove: NodeListOf<Element> | undefined;
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

    // TODO: Break this up into several smaller null checks
    if (premiumAdBanner && statsContainer && statsContainer.children.length > 1 && actionButtons.length > 0 && premiumDesc && premiumDesc.length > 0) {
        let statPanelsToRemove = statsContainer.querySelectorAll('.extra-stats-panel');

        // Remove the first two accordion panels found in the stat panel
        if (statPanelsToRemove.length > 1) {           
            // Remove the ad from "Most Used Words" and prep it for our version
            let mostUsedWordsPanel        = document.createElement('div');
            mostUsedWordsPanel.className  = 'extra-stats-panel';
            mostUsedWordsPanel.id         = 'rce-word-count-panel';
            mostUsedWordsPanel.setAttribute('data-v-fb827e44', ''); // This data attribute might be brittle if Reedsy changes their code
            mostUsedWordsPanel.innerHTML  = `<button type="button" class="expand-button flex-justified" id="rce-word-count-button" data-v-fb827e44>
                Most used words 
                <span class="vui-icon vui-icon-down" data-v-1a2a55eb data-v-fb827e44>
                    <svg data-v-ae557fc1="" viewBox="0 0 16 16"><g data-v-ae557fc1="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path data-v-ae557fc1="" id="icon-fill" d="M8.0000137,9.68417285 L2.7525904,3.59150909 C2.38890834,3.17587246 1.75714573,3.13375495 1.34150909,3.49743701 C0.925872462,3.86111906 0.883754954,4.49288168 1.24743701,4.90851831 L7.24743701,12.4085183 C7.6458483,12.8638455 8.35417911,12.8638455 8.7525904,12.4085183 L14.7525904,4.90851831 C15.1162724,4.49288168 15.0741549,3.86111906 14.6585183,3.49743701 C14.2428817,3.13375495 13.6111191,3.17587246 13.247437,3.59150909 L8.0000137,9.68417285 Z" fill="#2A2A2A" fill-rule="nonzero"></path></g></svg>
                </span>
            </button>`;
            let wordStatWrapper     = document.createElement('div');
            wordStatWrapper.className = 'word-count';
            wordStatWrapper.id        = 'rce-word-count-inner';
            mostUsedWordsPanel.appendChild(wordStatWrapper);
            statPanelsToRemove[0].replaceWith(mostUsedWordsPanel);

            statPanelsToRemove[1].remove(); // Most used phrases
            console.log('[Reedsy Editor Customizations] Removed "Most Used Phrases" panels.');
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