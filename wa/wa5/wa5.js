const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');


navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") == "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);

    navMenu.classList.toggle("show")
    navToggle.classList.toggle("active")
    })
