/* ==========================
   NAVIGATION TOGGLE
========================== */
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector("#primary-navigation");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  navToggle.querySelector("i").className = isOpen
    ? "ti ti-x"
    : "ti ti-menu-2";
});

document.addEventListener("pointerdown", (event) => {
  if (
    !primaryNav.classList.contains("is-open") ||
    primaryNav.contains(event.target) ||
    navToggle.contains(event.target)
  ) {
    return;
  }

  primaryNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  navToggle.querySelector("i").className = "ti ti-menu-2";
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.add("is-pressed");

    setTimeout(() => {
      primaryNav.classList.remove("is-open");

      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");

      navToggle.querySelector("i").className = "ti ti-menu-2";

      link.classList.remove("is-pressed");
    }, 150);
  });
});

/* ==========================
   PROJECT ACCORDIONS
========================== */

const projectSummaries = document.querySelectorAll(".project-summary");

projectSummaries.forEach((summary) => {
  summary.addEventListener("click", () => {
    const detailsId = summary.getAttribute("aria-controls");
    const details = document.getElementById(detailsId);

    if (!details) {
      return;
    }

    const isExpanded =
      summary.getAttribute("aria-expanded") === "true";

    summary.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    details.hidden = isExpanded;
  });
});

/* ==========================
   PROJECT ACCORDIONS
========================== */

const heroVisualFrame = document.querySelector(".hero-visual-frame");

if (heroVisualFrame) {
  heroVisualFrame.addEventListener("click", () => {
    const image = heroVisualFrame.querySelector(".hero-visual-image");

    image.classList.remove("is-spinning");
    void image.offsetWidth;
    image.classList.add("is-spinning");
  });
}

/* ==========================
   HERO - TAGLINE CODE
========================== */

const heroCodeText = document.querySelector("#hero-code-text");

if (heroCodeText) {
  const text = "Security • Cloud • Platforms";
  let index = 0;

  const typeHeroText = () => {
    if (index < text.length) {
      heroCodeText.textContent += text[index];
      index += 1;

      setTimeout(typeHeroText, 80);
    }
  };

  typeHeroText();
}

/* ==========================
   THEME TOGGLE
========================== */
const themeToggle = document.querySelector(".theme-toggle");

const storedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

document.documentElement.dataset.theme = initialTheme;

const themeAwareLogos = document.querySelectorAll("[data-light-src][data-dark-src]");

const updateThemeLogos = (theme) => {
  themeAwareLogos.forEach((logo) => {
    const source =
      theme === "dark"
        ? logo.dataset.darkSrc
        : logo.dataset.lightSrc;

    if (source) {
      logo.src = source;
    }
  });
};

const updateThemeToggle = (theme) => {
  const isDark = theme === "dark";
  const icon = themeToggle.querySelector("i");

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  icon.className = isDark ? "ti ti-sun" : "ti ti-moon";
};

updateThemeLogos(initialTheme);
updateThemeToggle(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  updateThemeLogos(nextTheme);
  updateThemeToggle(nextTheme);
});