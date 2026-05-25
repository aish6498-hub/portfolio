export function initTilt(wrapperSelector) {
  const wrapper = document.querySelector(".hero-portrait-wrapper");
  const container = document.querySelector(".hero-portrait-container");
  const icons = document.querySelectorAll(".orbit-icon");
  if (!wrapper || !container) return;

  const TILT_ANGLE = 15;
  const TRANSITION_DURATION = 1400;
  let transitionTimer = null;
  let isMobileTapped = false;

  // ===== DESKTOP — mouse events =====
  container.addEventListener("mouseenter", () => {
    container.classList.add("is-hovered");
    wrapper.style.transform = `perspective(600px) rotateY(${TILT_ANGLE}deg)`;

    transitionTimer = setTimeout(() => {
      icons.forEach((icon) => {
        icon.style.pointerEvents = "auto";
      });
    }, TRANSITION_DURATION);
  });

  container.addEventListener("mouseleave", () => {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }
    icons.forEach((icon) => {
      icon.style.pointerEvents = "none";
    });
    container.classList.remove("is-hovered");
    wrapper.style.transform = "perspective(600px) rotateY(0deg)";
  });

  // ===== MOBILE — tap toggle =====
  wrapper.addEventListener("touchend", (e) => {
    // only handle direct taps on portrait, not on icons
    if (e.target.closest(".orbit-icon")) return;
    e.preventDefault();

    if (isMobileTapped) {
      // second tap — icons go back in
      isMobileTapped = false;
      container.classList.remove("is-hovered");
      wrapper.style.transform = "perspective(600px) rotateY(0deg)";
      icons.forEach((icon) => {
        icon.style.pointerEvents = "none";
      });
    } else {
      // first tap — icons pop out
      isMobileTapped = true;
      container.classList.add("is-hovered");
      wrapper.style.transform = `perspective(600px) rotateY(${TILT_ANGLE}deg)`;

      setTimeout(() => {
        icons.forEach((icon) => {
          icon.style.pointerEvents = "auto";
        });
      }, TRANSITION_DURATION);
    }
  });

  // close if user taps anywhere else on the page
  document.addEventListener("touchend", (e) => {
    if (!isMobileTapped) return;
    const tappedInsideContainer = container.contains(e.target);
    if (!tappedInsideContainer) {
      isMobileTapped = false;
      container.classList.remove("is-hovered");
      wrapper.style.transform = "perspective(600px) rotateY(0deg)";
      icons.forEach((icon) => {
        icon.style.pointerEvents = "none";
      });
    }
  });
}
