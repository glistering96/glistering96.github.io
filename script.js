const toTopButton = document.querySelector(".to-top");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const zoomableImages = Array.from(document.querySelectorAll(".embedded-figure img"));

const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "이미지 확대 보기");
lightbox.innerHTML = `
  <div class="image-lightbox__bar">
    <button class="image-lightbox__close" type="button" aria-label="닫기">×</button>
  </div>
  <figure class="image-lightbox__figure">
    <img class="image-lightbox__image" alt="" />
    <figcaption class="image-lightbox__caption"></figcaption>
  </figure>
`;

document.body.append(lightbox);

const lightboxImage = lightbox.querySelector(".image-lightbox__image");
const lightboxCaption = lightbox.querySelector(".image-lightbox__caption");
const lightboxClose = lightbox.querySelector(".image-lightbox__close");

function updateTopButton() {
  if (!toTopButton) return;
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

function openLightbox(image) {
  const figure = image.closest("figure");
  const caption = figure?.querySelector("figcaption")?.textContent.trim() || image.alt;

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || caption || "확대 이미지";
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  document.body.classList.add("has-lightbox");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.classList.remove("has-lightbox");
  lightboxImage.removeAttribute("src");
}

window.addEventListener("scroll", () => {
  updateTopButton();
  updateActiveNav();
}, { passive: true });

if (toTopButton) {
  toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

zoomableImages.forEach((image) => {
  const figure = image.closest("figure");
  figure?.classList.add("is-zoomable");
  figure?.setAttribute("tabindex", "0");
  figure?.setAttribute("role", "button");
  figure?.setAttribute("aria-label", `${image.alt || "이미지"} 확대 보기`);

  image.addEventListener("click", () => openLightbox(image));
  figure?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxImage) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

updateTopButton();
updateActiveNav();
