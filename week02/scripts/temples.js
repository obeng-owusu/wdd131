// =========================
// HAMBURGER MENU
// =========================

const hamburgerBtn = document.querySelector("#hamburgerBtn");
const navMenu = document.querySelector("#navMenu");

hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    hamburgerBtn.setAttribute("aria-expanded", isOpen);

    hamburgerBtn.textContent = isOpen ? "✖" : "☰";
});

// =========================
// FOOTER DATES
// =========================

const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();

lastModified.textContent = document.lastModified;