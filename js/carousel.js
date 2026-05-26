export function initCarousel(
  trackSelector,
  prevSelector,
  nextSelector,
  dotsSelector
) {
  const track = document.querySelector(trackSelector);
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);
  const dotsContainer = document.querySelector(dotsSelector);
  if (!track) return;

  const cards = Array.from(track.children);
  let current = 0;

  const cardWidth = () => {
    const gap = parseFloat(window.getComputedStyle(track).gap) || 16;
    return cards[0].getBoundingClientRect().width + gap;
  };

  // build dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Go to project ${i + 1}`);
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function goTo(index) {
    current = Math.max(0, Math.min(index, cards.length - 1));

    // mobile — native scroll
    if (window.innerWidth <= 640) {
      cards[current].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    } else {
      // desktop — transform scroll
      track.style.transform = `translateX(-${current * cardWidth()}px)`;
    }

    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));

    // null checks — buttons are hidden on mobile
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === cards.length - 1;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

  goTo(0);

  // add this inside initCarousel, after goTo is defined
  const viewport = track.parentElement;

  viewport.addEventListener("scroll", () => {
    if (window.innerWidth > 640) return;

    // find which card is most centered in the viewport
    const viewportCenter = viewport.scrollLeft + viewport.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== current) {
      current = closestIndex;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    }
  });
}

export function initCardGifs() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const img = card.querySelector(".project-card__image");
    if (!img || !img.dataset.gif) return;

    const staticSrc = img.src;
    const gifSrc = img.dataset.gif;

    const preload = new Image();
    preload.src = gifSrc;

    card.addEventListener("mouseenter", () => {
      img.src = gifSrc;
    });
    card.addEventListener("mouseleave", () => {
      img.src = staticSrc;
    });
  });
}
