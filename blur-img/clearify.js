// ==UserScript==
// @name         Clearify
// @namespace    https://github.com/codayon/browser-scripts/tree/main/blur-img
// @version      2.0
// @description  Blurs all images until toggled to unblur or hover to unblur.
// @exclude      https://github.com/codayon
// @author       codayon, ChatGPT
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const blurEffect = "blur(20px)";
  let blurEnabled = true,
    buttonsVisible = true;

  function createButton(
    text,
    bgColor,
    borderColor,
    borderRadius,
    clickHandler
  ) {
    const button = document.createElement("button");
    Object.assign(button.style, {
      padding: "8px 12px",
      backgroundColor: bgColor,
      color: "#FFFFFF",
      border: `2px solid ${borderColor}`,
      borderRadius,
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    });
    button.textContent = text;
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = darkenColor(bgColor);
      button.style.borderColor = darkenColor(borderColor);
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = bgColor;
      button.style.borderColor = borderColor;
    });
    button.addEventListener("click", clickHandler);
    return button;
  }

  function darkenColor(hex) {
    let num = parseInt(hex.slice(1), 16);
    const amt = 0x202020;
    num = Math.max(0, num - amt);
    return `#${num.toString(16).padStart(6, "0")}`;
  }

  function createToggleButton() {
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      zIndex: "9999",
      display: "flex",
    });

    const toggleButton = createButton(
      "Toggle Blur",
      "#333333",
      "#555555",
      "10px 0 0 10px",
      toggleBlur
    );
    const hideButton = createButton(
      "Hide",
      "#E74C3C",
      "#C0392B",
      "0 10px 10px 0",
      () => {
        container.style.display = "none";
        buttonsVisible = false;
      }
    );

    container.append(toggleButton, hideButton);
    document.body.appendChild(container);
  }

  function applyBlur() {
    document.querySelectorAll("img").forEach((img) => {
      img.style.filter = blurEffect;
      img.style.transition = "filter 0.3s ease";
      img.addEventListener("mouseenter", unblurOnHover);
      img.addEventListener("mouseleave", reblurOnLeave);
    });
  }

  function toggleBlur() {
    blurEnabled = !blurEnabled;
    document.querySelectorAll("img").forEach((img) => {
      img.style.filter = blurEnabled ? blurEffect : "none";
    });
  }

  function unblurOnHover(event) {
    event.target.style.filter = "none";
  }

  function reblurOnLeave(event) {
    if (blurEnabled) event.target.style.filter = blurEffect;
  }

  window.addEventListener("load", () => {
    createToggleButton();
    applyBlur();
  });

  const observer = new MutationObserver(() => {
    applyBlur();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  applyBlur(); // Apply blur immediately
})();
