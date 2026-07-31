const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
const arrowButtons = document.querySelectorAll(".slider-arrow");

let currentTestimonial = 0;

function updateNavbarState() {
  if (!navbar) {
    return;
  }

  const shouldElevate = window.scrollY > 24;
  navbar.classList.toggle("scrolled", shouldElevate);
}

function setActiveNavLink() {
  const sections = document.querySelectorAll("[data-section], #beranda");
  const scrollTarget = window.scrollY + 160;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (!id) {
      return;
    }

    if (scrollTarget >= top && scrollTarget < top + height) {
      navLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", matches);
      });
    }
  });
}

function showTestimonial(index) {
  testimonialCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === index);
  });
}

function goToTestimonial(direction) {
  if (!testimonialCards.length) {
    return;
  }

  currentTestimonial =
    (currentTestimonial + direction + testimonialCards.length) % testimonialCards.length;
  showTestimonial(currentTestimonial);
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navMenu || !navToggle) {
      return;
    }

    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

arrowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    goToTestimonial(direction);
  });
});

if (testimonialCards.length) {
  showTestimonial(currentTestimonial);

  window.setInterval(() => {
    goToTestimonial(1);
  }, 6000);
}

window.addEventListener("scroll", () => {
  updateNavbarState();
  setActiveNavLink();
});

window.addEventListener("load", () => {
  updateNavbarState();
  setActiveNavLink();
});

window.addEventListener("resize", () => {
  if (!navMenu || !navToggle) {
    return;
  }

  if (window.innerWidth > 860) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
