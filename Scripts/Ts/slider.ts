const handleNext = (ul: HTMLUListElement) => {
  ul.scrollLeft += ul.offsetWidth;
};

const handlePrev = (ul: HTMLUListElement) => {
  ul.scrollLeft -= ul.offsetWidth;
};

const btnDisplay = (ul: HTMLUListElement, prevHandle: HTMLButtonElement, nextHandle: HTMLButtonElement) => {
  const { scrollWidth, scrollLeft, clientWidth } = ul;

  if (scrollLeft == 0) {
    prevHandle.style.display = "none";
  } else {
    prevHandle.style.display = "block";
  }

  if (Math.round(scrollLeft + clientWidth) == scrollWidth) {
    nextHandle.style.display = "none";
  } else if (Math.round(scrollLeft + clientWidth) != scrollWidth) {
    nextHandle.style.display = "block";
  }
};

// Both functions librarySlider and roverSlider are called only after the API send its response
// The request is made either with the scroll detection of the container or via input actions

export const librarySlider = () => {
  const libraryUl = document.querySelector(".library-data ul") as HTMLUListElement,
    libraryPrev = document.querySelector("#library-prev") as HTMLButtonElement,
    libraryNext = document.querySelector("#library-next") as HTMLButtonElement;

  libraryNext.addEventListener("click", () => handleNext(libraryUl));
  libraryPrev.addEventListener("click", () => handlePrev(libraryUl));
  libraryUl.addEventListener("scroll", () => btnDisplay(libraryUl, libraryPrev, libraryNext));
};

export const roverSlider = () => {
  const roverUl = document.querySelector(".rover-data ul") as HTMLUListElement,
    roverNext = document.querySelector("#rover-next") as HTMLButtonElement,
    roverPrev = document.querySelector("#rover-prev") as HTMLButtonElement;

  roverNext.addEventListener("click", () => handleNext(roverUl));
  roverPrev.addEventListener("click", () => handlePrev(roverUl));
  roverUl.addEventListener("scroll", () => btnDisplay(roverUl, roverPrev, roverNext));
};
