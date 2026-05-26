import { initTypewriter } from "./typewriter.js";
import { initTilt } from "./tilt.js";
import { initCarousel } from "./carousel.js";
import { initBoba } from "./boba.js";
import { initMobileNav } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTypewriter(".typewriter-text");
  initTilt();
  initCarousel(
    ".carousel-track",
    ".carousel-btn--prev",
    ".carousel-btn--next",
    ".carousel-dots"
  );
  initBoba("#skills");
});
