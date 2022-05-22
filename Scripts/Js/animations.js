import { inView, outOfView } from "./scroll.js";
const preview = document.querySelector("#preview"), navbar = document.querySelector("nav"), slideUpElements = document.querySelectorAll("[data-aos='slide-up']"), slideRightElements = document.querySelectorAll("[data-aos='slide-right']"), slideLeftElements = document.querySelectorAll("[data-aos='slide-left']");
export const animations = () => {
    // Change navbar color based on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            navbar.classList.add("darken");
        }
        else {
            navbar.classList.remove("darken");
        }
        slideLeftElements.forEach((i) => {
            if (inView(i)) {
                i.classList.add("slide-left");
            }
            else if (outOfView(i)) {
                i.classList.remove("slide-left");
            }
        });
        slideRightElements.forEach((i) => {
            if (inView(i)) {
                i.classList.add("slide-right");
            }
            else if (outOfView(i)) {
                i.classList.remove("slide-right");
            }
        });
        slideUpElements.forEach((i) => {
            if (inView(i)) {
                i.classList.add("slide-up");
            }
            else if (outOfView(i)) {
                i.classList.remove("slide-up");
            }
        });
    });
};
