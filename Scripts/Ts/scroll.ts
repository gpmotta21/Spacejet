import { APIs } from "./APIs.js";
import { requestAPI, useAPOD, useLibrary, useRover } from "./requests.js";

var requestedLibrary: boolean = false,
  requestedRoover: boolean = false,
  requestedAPOD: boolean = false;

const libraryData = document.querySelector(".library-data") as HTMLDivElement,
  roverData = document.querySelector(`.rover-data`) as HTMLDivElement,
  apodData = document.querySelector(".APOD-data") as HTMLDivElement;

export const inView = (el: HTMLElement) => {
  return el.getBoundingClientRect().top < window.innerHeight;
};

export const outOfView = (el: HTMLElement) => {
  const top = el.getBoundingClientRect().top;

  return top > (window.innerHeight || document.documentElement.clientHeight);
};

// Function dedicated to the API requests based on scroll
export const scrollRequests = () => {
  const libraryContainer = document.querySelector("#nasa") as HTMLElement,
    apodContainer = document.querySelector("#APOD") as HTMLElement,
    rooverContainer = document.querySelector("#rover") as HTMLElement;

  if (inView(libraryContainer) && !requestedLibrary) {
    requestedLibrary = true;
    requestAPI(`${APIs.library}saturn`, libraryData, useLibrary);
  }

  if (inView(rooverContainer) && !requestedRoover) {
    requestedRoover = true;
    requestAPI(APIs.rover, roverData, useRover);
  }

  if (inView(apodContainer) && !requestedAPOD) {
    requestedAPOD = true;
    requestAPI(APIs.apod, apodData, useAPOD);
  }
};
