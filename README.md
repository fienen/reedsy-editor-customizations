# Reedsy Editor Customizations

A browser userscript/extension that customizes the [Reedsy Editor](https://reedsy.com/) experience by enforcing dark theme and removing distracting upsell panels.

## Features

- **Dark Theme Enforcement**: Automatically switches the Reedsy Editor from light theme to dark theme and maintains it across chapter navigation
- **Remove Upsell Panels**: Hides promotional elements including:
  - "Most used words" panel
  - "Most used phrases" panel
  - Premium ad banner in the sidebar

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Setup

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

After building, the script can be used with browser extension managers like:
- [Tampermonkey](https://www.tampermonkey.net/)
- [Greasemonkey](https://www.greasespot.net/)
- [Violentmonkey](https://violentmonkey.github.io/)

Load the built script file into your preferred userscript manager and navigate to the Reedsy Editor.

## How It Works

The script:
1. Detects if the light theme is active and switches to dark theme
2. Uses a MutationObserver to maintain the dark theme when navigating between chapters
3. Removes promotional panels and ad banners after the page loads

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
