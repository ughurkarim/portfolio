const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
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
  "going on a run."
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
