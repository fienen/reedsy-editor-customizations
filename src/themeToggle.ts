export const darkLightToggle = () => {
    // Find the theme button wrapper and unbind existing events
    const defaultBtnWrapper = document.querySelector('[title="Switch theme"]').parentNode;

    if(defaultBtnWrapper && Object.prototype.toString.call(defaultBtnWrapper).includes('HTMLElement')) {
        // Grab our document root
        const html = document.documentElement;
        const newBtnWrapper = defaultBtnWrapper.cloneNode(true);
        newBtnWrapper.addEventListener('click', function () {
            html.classList.toggle('light-theme');
            html.classList.toggle('dark-theme');
        });
        defaultBtnWrapper.replaceWith(newBtnWrapper);
    }
};

export const enforceThemePreference = () => {
    /* OLD VERSION FOR REF ONLY
    // Grab our document root
    const html = document.documentElement;

    // Check if the "light-theme" class exists, and if so, remove and replace it
    if (html.classList.contains('light-theme')) {
        html.classList.remove('light-theme');
        html.classList.add('dark-theme');
        console.log('Reedsy Theme Setter: Switched to Dark Theme.');
    }

    // Safety check: Ensure dark-theme is present if light isn't there but no theme is set
    if (!html.classList.contains('light-theme') && !html.classList.contains('dark-theme')) html.classList.add('dark-theme');
    */
};