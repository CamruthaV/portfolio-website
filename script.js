// Navigation Toggle Functionality
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

// const projectSummaries = document.querySelectorAll(".project-summary");

// projectSummaries.forEach((summary) => {
//   summary.addEventListener("click", () => {
//     const detailsId = summary.getAttribute("aria-controls");
//     const details = document.getElementById(detailsId);

//     const isExpanded = summary.getAttribute("aria-expanded") === "true";

//     summary.setAttribute("aria-expanded", String(!isExpanded));
//     details.hidden = isExpanded;
//   });
// });