// ======================================================
// KINEMALAB - MAIN JS
// ======================================================

// =========================
// MOBILE NAVIGATION
// =========================

function toggleMenu() {

    const navMenu = document.querySelector(".nav-menu");

    if (!navMenu) {
        return;
    }

    navMenu.classList.toggle("active");
}


// =========================
// CLOSE MENU AFTER CLICK
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const navMenu = document.querySelector(".nav-menu");

    if (!navMenu) {
        return;
    }

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

});