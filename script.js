const navbar = document.querySelector('.navbar');
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
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
const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
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

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const themes = ["dark-mode", "light-mode", "fun-mode"];

let currentTheme = localStorage.getItem("theme") || "dark-mode";
body.classList.add(currentTheme);
setIcon(currentTheme);

toggleButton.addEventListener("click", () => {
  body.classList.remove(currentTheme);
  const index = themes.indexOf(currentTheme);
  currentTheme = themes[(index + 1) % themes.length];
  body.classList.add(currentTheme);
  localStorage.setItem("theme", currentTheme);
  setIcon(currentTheme);
});

function setIcon(theme) {
  if (theme === "dark-mode") {
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  } else if (theme === "light-mode") {
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    toggleButton.innerHTML = '<i class="fas fa-laugh-beam"></i>';
  }
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const backToTopBtn = document.getElementById("back-to-top");

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navLinkEls = document.querySelectorAll('.nav-links li a');
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});