// ==UserScript==
// @name         Clearify
// @namespace    https://yournamehere.com
// @version      1.0
// @description  Blurs all images until clicked, without bleeding effect
// @exclude      https://github.com/codayon
// @author       ChatGPT and Reshad Ahammed Ayon
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const blurEffect = "blur(20px)";
  const transitionEffect = "filter 0.3s ease-in-out";

  // Apply blur effect to images
  function blurImages() {
    document.querySelectorAll("img").forEach((img) => {
      if (!img.classList.contains("blurred")) {
        // Prevent adding styles if already applied
        img.style.filter = blurEffect;
        img.style.transition = transitionEffect;
        img.style.cursor = "pointer";
        img.style.outline = "none";
        img.style.border = "none";
        img.classList.add("blurred"); // Mark as blurred

        // Fix blur bleeding effect
        img.style.clipPath = "inset(0 0 0 0)";

        // Remove blur on click
        img.addEventListener("click", function () {
          img.style.filter = "none";
        });
      }
    });

    // Blur elements with background images
    document.querySelectorAll("*").forEach((element) => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      if (
        backgroundImage &&
        backgroundImage !== "none" &&
        !element.classList.contains("blurred")
      ) {
        element.style.filter = blurEffect;
        element.style.transition = transitionEffect;
        element.style.cursor = "pointer";
        element.classList.add("blurred"); // Mark as blurred

        // Remove blur on click
        element.addEventListener("click", function () {
          element.style.filter = "none";
        });
      }
    });
  }

  // Run on page load
  window.addEventListener("load", blurImages);

  // Observe dynamically loaded content
  const observer = new MutationObserver(() => {
    setTimeout(blurImages, 100); // Delay to batch DOM changes for better performance
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
