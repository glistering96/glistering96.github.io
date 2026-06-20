const toTopButton = document.querySelector(".to-top");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateTopButton() {
  toTopButton.classList.toggle("is-visible", window.scrollY > 520);
}

function updateActiveNav() {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 140)
    .at(-1);

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

window.addEventListener("scroll", () => {
  updateTopButton();
  updateActiveNav();
}, { passive: true });

toTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

updateTopButton();
updateActiveNav();
