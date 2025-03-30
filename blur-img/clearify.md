# Clearify UserScript Documentation

## Overview

Clearify is a **UserScript** that blurs all images on a webpage until toggled off or hovered over. It provides a quick way to obscure images while allowing users to reveal them selectively.

## Features

- Automatically blurs all images on a webpage.
- Hovering over an image temporarily removes the blur effect.
- A toggle button to enable/disable the blur effect.
- A hide button to remove the toggle controls from the screen.
- Mutation observer ensures newly loaded images also get blurred.

## Installation

1. Use a **UserScript manager** such as:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey](https://www.tampermonkey.net/)
2. Create a new script in your UserScript manager.
3. Copy and paste the **Clearify** script into the editor.
4. Save and enable the script.

## Usage

- **Toggle Blur**: Click the **Toggle Blur** button to turn the effect on or off.
- **Hover to Reveal**: Hovering over an image will temporarily remove the blur.
- **Hide Button**: Click the **Hide** button to remove the toggle UI.

## Technical Details

- The script applies a `blur(20px)` CSS filter to all `<img>` elements.
- A transition effect (`filter 0.3s ease`) is added to smooth the blur/unblur animation.
- **MutationObserver** ensures images added dynamically (e.g., infinite scrolling pages) also get blurred.

## Code Structure

### Main Components

1. **Button Creation**: Generates the **Toggle Blur** and **Hide** buttons with styling and event listeners.
2. **Blur Application**: Loops through all images to apply the blur effect and attaches event listeners for hover interactions.
3. **Toggle Functionality**: Enables/disables blur globally.
4. **Mutation Observer**: Monitors new images added to the DOM and blurs them automatically.

## Future Enhancements

- Customizable blur intensity via UI.
- A keyboard shortcut to toggle the blur effect.
- Compatibility testing with various web applications.

## License

This script is **open-source** and available for personal and non-commercial use.

**Contributors:** [codayon](https://github.com/codayon) and ChatGPT

For bug reports and feature requests, visit the [GitHub Repository](https://github.com/codayon/browser-scripts/tree/main/blur-img).
