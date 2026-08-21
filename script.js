const sections = document.querySelectorAll("section");
const typingText = document.getElementById("typing-text");
const toggleButton = document.getElementById("theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkEls = document.querySelectorAll(".nav-links li a");
const backToTopBtn = document.getElementById("back-to-top");
const body = document.body;
let pendingNavSection = "";
let pendingNavTimeout;

function setActiveNavLink(sectionId) {
  navLinkEls.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

const techRows = {
  primary: [
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "C++", icon: "devicon-cplusplus-plain colored" },
    { name: "C", icon: "devicon-c-plain colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
    { name: "Swift", icon: "devicon-swift-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "HTML", icon: "devicon-html5-plain colored" },
    { name: "CSS", icon: "devicon-css3-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", image: "images/tech/nextjs.svg" },
    { name: "React Native", icon: "devicon-react-original colored" },
    { name: "Flask", icon: "devicon-flask-original" },
    { name: "PyTorch", icon: "devicon-pytorch-original colored" }
  ],
  secondary: [
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "Supabase", icon: "devicon-supabase-plain colored" },
    { name: "AWS", image: "images/tech/aws.svg" },
    { name: "Amazon S3", image: "images/tech/amazon-s3.svg" },
    { name: "Amazon CloudFront", image: "images/tech/amazon-cloudfront.svg" },
    { name: "Cloudflare", icon: "devicon-cloudflare-plain colored" },
    { name: "Vercel", icon: "devicon-vercel-original" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "Unix", icon: "devicon-unix-original" },
    { name: "Figma", icon: "devicon-figma-plain colored" },
    { name: "Expo", icon: "devicon-expo-original" },
    { name: "Prisma", icon: "devicon-prisma-original" },
    { name: "NextAuth", image: "images/tech/nextauth.svg" },
    { name: "NumPy", icon: "devicon-numpy-plain colored" },
    { name: "pandas", icon: "devicon-pandas-plain colored" },
    { name: "Qt", icon: "devicon-qt-original colored" }
  ]
};

function createTechSequence(technologies, isDuplicate = false) {
  const list = document.createElement("ul");
  list.className = "tech-sequence";

  if (isDuplicate) {
    list.setAttribute("aria-hidden", "true");
  }

  technologies.forEach(technology => {
    const item = document.createElement("li");
    item.className = "tech-item";
    item.title = technology.name;

    if (!isDuplicate) {
      item.tabIndex = 0;
      item.setAttribute("aria-label", technology.name);
    }

    const card = document.createElement("span");
    card.className = "tech-tile";
    card.setAttribute("aria-hidden", "true");

    const icon = document.createElement(technology.image ? "img" : technology.icon ? "i" : "span");
    icon.className = technology.image
      ? "tech-icon-image"
      : technology.icon
        ? `tech-icon ${technology.icon}`
        : "tech-icon tech-icon-fallback";
    icon.setAttribute("aria-hidden", "true");

    if (technology.image) {
      icon.src = technology.image;
      icon.alt = "";
      icon.decoding = "async";
    }

    if (technology.fallback) {
      icon.textContent = technology.fallback;
    }

    const name = document.createElement("span");
    name.className = "tech-name";
    name.textContent = technology.name;
    name.setAttribute("aria-hidden", "true");

    card.append(icon);
    item.append(card, name);
    list.append(item);
  });

  return list;
}

document.querySelectorAll("[data-tech-row]").forEach(track => {
  const technologies = techRows[track.dataset.techRow];
  if (!technologies) return;

  track.append(
    createTechSequence(technologies),
    createTechSequence(technologies, true)
  );
});

const words = [
  "learning new things.",
  "working on projects.",
  "collaborating with peers.",
  "spending time with loved ones.",
  "going on a run.",
  "drinking tea."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingText.textContent = words[0];
    return;
  }

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
    setTimeout(typeEffect, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 42 : 78);
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
  const setMenuState = isOpen => {
    navLinks.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");
    menuToggle.innerHTML = isOpen
      ? '<i class="fas fa-xmark"></i>'
      : '<i class="fas fa-bars"></i>';
  };

  menuToggle.addEventListener("click", event => {
    event.stopPropagation();
    setMenuState(!navLinks.classList.contains("active"));
  });

  navLinkEls.forEach(link => {
    link.addEventListener("click", () => {
      pendingNavSection = link.hash.slice(1);
      clearTimeout(pendingNavTimeout);
      setMenuState(false);
      setActiveNavLink(pendingNavSection);

      pendingNavTimeout = setTimeout(() => {
        if (window.location.hash === link.hash) {
          setActiveNavLink(pendingNavSection);
        }
        pendingNavSection = "";
      }, 1500);
    });
  });

  document.addEventListener("click", event => {
    if (window.innerWidth <= 768 &&
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      setMenuState(false);
    }
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
  const navbar = document.querySelector(".navbar");
  const activationLine = (navbar?.getBoundingClientRect().bottom || 64) + 72;

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= activationLine) {
      current = section.getAttribute("id");
    }
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    current = sections[sections.length - 1]?.getAttribute("id") || current;
  }

  setActiveNavLink(pendingNavSection || current);
}

window.addEventListener("scroll", () => {
  updateBackToTop();
  updateActiveNavLink();
});

updateBackToTop();
updateActiveNavLink();
