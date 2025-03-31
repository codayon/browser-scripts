// ==UserScript==
// @name         clearify
// @namespace    https://github.com/codayon/browser-scripts/tree/main/blur-img
// @description  Blurs all images until toggled to unblur or hovered over.
// @copyright    2025, codayon (https://github.com/codayon)
// @license      MIT
// @version      2.1
// @match        *://*/*
// @grant        none
// @exclude      https://openuserjs.org/*
// @exclude      https://greasyfork.org/*
// @homepageURL  https://github.com/codayon/browser-scripts/tree/main/blur-img
// @supportURL   https://github.com/codayon/browser-scripts/issues
// @updateURL    https://openuserjs.org/meta/codayon/clearify.meta.js
// ==/UserScript==

// ==OpenUserJS==
// @author codayon
// ==/OpenUserJS==

(function () {
  "use strict";

  // Define the blur effect and enable it by default
  const blurEffect = "blur(10px)";
  let blurEnabled = true;

  // Function to create a styled button
  function createButton(
    text,
    bgColor,
    borderColor,
    borderRadius,
    clickHandler
  ) {
    const btn = document.createElement("button");
    Object.assign(btn.style, {
      padding: "8px 12px",
      backgroundColor: bgColor,
      color: "#FFF",
      border: `2px solid ${borderColor}`,
      borderRadius,
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    });
    btn.textContent = text;
    btn.onmouseenter = () => (btn.style.backgroundColor = darkenColor(bgColor));
    btn.onmouseleave = () => (btn.style.backgroundColor = bgColor);
    btn.onclick = clickHandler;
    return btn;
  }

  // Function to darken a given color for hover effect
  function darkenColor(hex) {
    let num = parseInt(hex.slice(1), 16) - 0x202020;
    return `#${Math.max(0, num).toString(16).padStart(6, "0")}`;
  }

  // Function to create the toggle button UI
  function createToggleButton() {
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      bottom: "25px",
      left: "25px",
      zIndex: "9999",
      display: "flex",
    });
    container.append(
      createButton("Hide", "#E74C3C", "#C0392B", "10px 0 0 10px", () =>
        container.remove()
      ),
      createButton("Toggle Blur", "#333", "#555", "0 10px 10px 0", toggleBlur)
    );
    document.body.appendChild(container);
  }

  // Function to apply the blur effect to images
  function applyBlur() {
    document.querySelectorAll("img, ytd-thumbnail img").forEach((img) => {
      img.style.filter = blurEnabled ? blurEffect : "none";
      img.style.transition = "filter 0.3s ease";
      img.style.clipPath = "inset(0)"; // Prevents blur bleeding outside
      img.onmouseenter = () => (img.style.filter = "none");
      img.onmouseleave = () =>
        (img.style.filter = blurEnabled ? blurEffect : "none");
    });
  }

  // Function to toggle the blur effect
  function toggleBlur() {
    blurEnabled = !blurEnabled;
    applyBlur();
  }

  // Observe changes in the DOM and reapply the blur effect if needed
  new MutationObserver(applyBlur).observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initialize the script once the page has fully loaded
  window.addEventListener("load", () => {
    createToggleButton();
    applyBlur();
  });
})();
