const handleNext = (ul) => {
    ul.scrollLeft += ul.offsetWidth;
};
const handlePrev = (ul) => {
    ul.scrollLeft -= ul.offsetWidth;
};
const btnDisplay = (ul, prevHandle, nextHandle) => {
    const { scrollWidth, scrollLeft, clientWidth } = ul;
    if (scrollLeft == 0) {
        prevHandle.style.display = "none";
    }
    else {
        prevHandle.style.display = "block";
    }
    if (Math.round(scrollLeft + clientWidth) == scrollWidth) {
        nextHandle.style.display = "none";
    }
    else if (Math.round(scrollLeft + clientWidth) != scrollWidth) {
        nextHandle.style.display = "block";
    }
};
// Both functions librarySlider and roverSlider are called only after the API send its response
// The request is made either with the scroll detection of the container or via input actions
export const librarySlider = () => {
    const libraryUl = document.querySelector(".library-data ul"), libraryPrev = document.querySelector("#library-prev"), libraryNext = document.querySelector("#library-next");
    libraryNext.addEventListener("click", () => handleNext(libraryUl));
    libraryPrev.addEventListener("click", () => handlePrev(libraryUl));
    libraryUl.addEventListener("scroll", () => btnDisplay(libraryUl, libraryPrev, libraryNext));
};
export const roverSlider = () => {
    const roverUl = document.querySelector(".rover-data ul"), roverNext = document.querySelector("#rover-next"), roverPrev = document.querySelector("#rover-prev");
    roverNext.addEventListener("click", () => handleNext(roverUl));
    roverPrev.addEventListener("click", () => handlePrev(roverUl));
    roverUl.addEventListener("scroll", () => btnDisplay(roverUl, roverPrev, roverNext));
};
