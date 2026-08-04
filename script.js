const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
const arrowButtons = document.querySelectorAll(".testimonial-shell .slider-arrow");
const galleryOpenButtons = document.querySelectorAll("[data-gallery-open]");
const galleryModal = document.querySelector("[data-gallery-modal]");
const gallerySlides = Array.from(document.querySelectorAll(".gallery-modal-slide"));
const galleryThumbButtons = Array.from(document.querySelectorAll("[data-gallery-thumb]"));
const galleryPrevButton = document.querySelector("[data-gallery-prev]");
const galleryNextButton = document.querySelector("[data-gallery-next]");
const galleryCloseButtons = document.querySelectorAll("[data-gallery-close]");
const galleryCounter = document.querySelector("[data-gallery-counter]");

let currentTestimonial = 0;
let currentGallerySlide = 0;

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

function setGallerySlide(index) {
  if (!gallerySlides.length) {
    return;
  }

  currentGallerySlide = (index + gallerySlides.length) % gallerySlides.length;

  gallerySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentGallerySlide);
  });

  galleryThumbButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === currentGallerySlide;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });

  if (galleryCounter) {
    galleryCounter.textContent = `${currentGallerySlide + 1} / ${gallerySlides.length}`;
  }
}

function openGalleryModal(startIndex = 0) {
  if (!galleryModal) {
    return;
  }

  setGallerySlide(startIndex);
  galleryModal.hidden = false;
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGalleryModal() {
  if (!galleryModal) {
    return;
  }

  galleryModal.hidden = true;
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function goToGallerySlide(direction) {
  if (!gallerySlides.length) {
    return;
  }

  setGallerySlide(currentGallerySlide + direction);
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

galleryOpenButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const startIndex = Number(button.dataset.galleryStart || 0);
    openGalleryModal(startIndex);
  });
});

galleryThumbButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    setGallerySlide(index);
  });
});

if (galleryPrevButton) {
  galleryPrevButton.addEventListener("click", () => {
    goToGallerySlide(-1);
  });
}

if (galleryNextButton) {
  galleryNextButton.addEventListener("click", () => {
    goToGallerySlide(1);
  });
}

galleryCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeGalleryModal();
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

window.addEventListener("keydown", (event) => {
  if (!galleryModal || galleryModal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeGalleryModal();
  }

  if (event.key === "ArrowLeft") {
    goToGallerySlide(-1);
  }

  if (event.key === "ArrowRight") {
    goToGallerySlide(1);
  }
});

// Gallery Gambar Modal Sendiri
const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const btnClose = document.querySelector(".close");

let currentIndex = 0;

images.forEach((img, index) => {

  img.addEventListener("click", () => {

    currentIndex = index;
    showImage();

    lightbox.classList.add("show");
  });

});

function showImage() {

  popupVideo.pause();
  popupVideo.currentTime = 0;
  popupVideo.style.display = "none";

  lightboxImg.style.display = "block";
  lightboxImg.src = images[currentIndex].src;

}

btnClose.addEventListener("click", () => {

  lightbox.classList.remove("show");

  popupVideo.pause();
  popupVideo.currentTime = 0;
  popupVideoSource.src = "";
  popupVideo.load();

});

lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {

    lightbox.classList.remove("show");

    popupVideo.pause();
    popupVideo.currentTime = 0;
    popupVideoSource.src = "";
    popupVideo.load();

  }

});

btnNext.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage();
});

btnPrev.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage();
});

document.addEventListener("keydown", (e) => {

  if (!lightbox.classList.contains("show")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }

  if (e.key === "ArrowRight") {
    btnNext.click();
  }

  if (e.key === "ArrowLeft") {
    btnPrev.click();
  }

});

// Gallery Video Modal Sendiri

const galleryVideos = document.querySelectorAll(".gallery-video");

const popupVideo = document.getElementById("popupVideo");
const popupVideoSource = document.getElementById("popupVideoSource");

galleryVideos.forEach(video => {

  video.addEventListener("click", () => {

    // Sembunyikan gambar
    lightboxImg.style.display = "none";

    // Tampilkan video
    popupVideo.style.display = "block";

    // Ambil source video
    popupVideoSource.src = video.querySelector("source").src;

    popupVideo.load();
    popupVideo.play();

    // Tampilkan popup yang sama
    lightbox.classList.add("show");

  });

});