# Reedsy Editor Customizations

A browser userscript/extension that customizes the [Reedsy Editor](https://reedsy.com/) experience by enabling light/dark theme toggling and removing distracting upsell panels.

## Features

### Theme Switching

Removes the modal and allows the dark/light theme toggle button to function as intended. Remembers your previous setting and applies it on future visits or reloads.

### Removes Upsell Advertising

  - "Most used words" panel (the default one)
  - "Most used phrases" panel
  - Premium ad banner in the left sidebar
  - Pinned note feature button
  - "Unlock history" banner at the bottom of the feature

Do you know of an ad we missed? [Report an issue!](https://github.com/fienen/reedsy-editor-customizations/issues/new)

### Most Used Words

![Example of the custom Most Used Words panel, showing words, counts, and a graph visualization](https://i.imgur.com/ruO3xP9.png "Custom Most Used Words panel")

The built in "Most used words" panel in the sidebar only opens to an upsell ad. We remove that panel and replace it with our own version. It shows the top ten words from the active chapter, excluding a list of frequently occuring stop words that you're unlikely to target for change: 'the', 'and', 'a', 'an', 'in', 'on', 'of', 'to', 'is', 'it'. In the future, this will be a user customizable option.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v24 or higher recommended, likely to work with recent older versions)
- npm (comes with Node.js)
- Tampermonkey, Greasemonkey, or other userscript plugin for browsers

### Setup

**NOTE:** Currently you must build the file to include it in your browser extension. The main branch will soon include a fully compiled verbose and minified versions of script's latest release in the main branch for easier implementation.

1. Clone the repository:
   ```bash
   git clone https://github.com/fienen/reedsy-editor-customizations.git
   cd reedsy-editor-customizations
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Copy contents of `dist/reedsy-editor-customizations.user.js` into your userscript tool.

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compiler and Vite build)
- `npm run preview` - Preview the production build locally

### Tech Stack

- TypeScript
- Vite (Build tool)
- Rollup (Bundler)

## Usage

After building/copying, the script can be used with browser extension managers like:
- [Tampermonkey](https://www.tampermonkey.net/)
- [Greasemonkey](https://www.greasespot.net/)
- [Violentmonkey](https://violentmonkey.github.io/)

Load the built script file into your preferred userscript manager and navigate to the Reedsy Editor.

## How It Works

The script:
1. Detects if there is a previous theme preference and sets it at initialization
2. Uses a MutationObserver to maintain the theme preference (in case navigation or other Reedsy behavior tries to reset it)
3. Removes purely premium feature buttons, promotional panels, and ad banners after the page loads
4. Runs a script 5 seconds after a pause in typing to calculate most used words

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Special thanks:

 - saikumarvasa100-hash
