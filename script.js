(function () {
  const navLinks = Array.from(document.querySelectorAll('.header-nav a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const toTopButton = document.getElementById('toTop');

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function smoothMove(targetId) {
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: 'smooth',
    });
  }

  function updateActiveSection() {
    const currentOffset = window.scrollY + 96;
    let currentId = sections.length ? sections[0].id : null;

    for (const section of sections) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (currentOffset >= sectionTop) {
        currentId = section.id;
      }
    }

    if (currentId) {
      setActiveLink(currentId);
    }
  }

  function updateToTopButton() {
    if (!toTopButton) {
      return;
    }

    if (window.scrollY > 280) {
      toTopButton.classList.add('visible');
    } else {
      toTopButton.classList.remove('visible');
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      smoothMove(link.getAttribute('href'));
    });
  });

  if (toTopButton) {
    toTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    updateActiveSection();
    updateToTopButton();
  }, { passive: true });

  document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection();
    updateToTopButton();
  });
})();
