const sections = document.querySelectorAll("section");
const typingText = document.getElementById("typing-text");
const toggleButton = document.getElementById("theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkEls = document.querySelectorAll(".nav-links li a");
const backToTopBtn = document.getElementById("back-to-top");
const body = document.body;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

const words = [
  "learning new things.",
  "working on projects.",
  "improving my coding skills.",
  "browsing LinkedIn.",
  "spending time with loved ones.",
  "collaborating with peers.",
  "going on a run.",
  "drinking tea."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

window.addEventListener("DOMContentLoaded", typeEffect);

const themes = ["dark-mode", "light-mode"];
let currentTheme = localStorage.getItem("theme") || "dark-mode";

if (!themes.includes(currentTheme)) {
  currentTheme = "dark-mode";
}

body.classList.add(currentTheme);
setIcon(currentTheme);

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    body.classList.remove(currentTheme);
    const index = themes.indexOf(currentTheme);
    currentTheme = themes[(index + 1) % themes.length];
    body.classList.add(currentTheme);
    localStorage.setItem("theme", currentTheme);
    setIcon(currentTheme);
  });
}

function setIcon(theme) {
  if (!toggleButton) return;

  if (theme === "dark-mode") {
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinkEls.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function updateBackToTop() {
  if (!backToTopBtn) return;

  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

function updateActiveNavLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  updateBackToTop();
  updateActiveNavLink();
});

updateBackToTop();
updateActiveNavLink();
