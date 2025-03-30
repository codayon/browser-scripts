// ==UserScript==
// @name         Clearify
// @description  Blurs all images until toggled to unblur or hovered over.
// @namespace    https://github.com/codayon/browser-scripts/tree/main/blur-img
// @match        *://*/*
// @grant        none
// @version      2.1
// ==/UserScript==

(function () {
  "use strict";

  const blurEffect = "blur(10px)";
  let blurEnabled = true;

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

  function darkenColor(hex) {
    let num = parseInt(hex.slice(1), 16) - 0x202020;
    return `#${Math.max(0, num).toString(16).padStart(6, "0")}`;
  }

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

  function toggleBlur() {
    blurEnabled = !blurEnabled;
    applyBlur();
  }

  new MutationObserver(applyBlur).observe(document.body, {
    childList: true,
    subtree: true,
  });
  window.addEventListener("load", () => {
    createToggleButton();
    applyBlur();
  });
})();
