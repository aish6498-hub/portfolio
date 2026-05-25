export function initMobileNav() {
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".nav-mobile-menu");
  if (!burger || !mobileMenu) return;

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    mobileMenu.setAttribute("aria-hidden", !isOpen);
  });

  // close menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });

  // close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
      burger.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  });
}
