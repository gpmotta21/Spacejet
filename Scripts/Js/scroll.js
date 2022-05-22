import { APIs } from "./APIs.js";
import { requestAPI, useAPOD, useLibrary, useRover } from "./requests.js";
var requestedLibrary = false, requestedRoover = false, requestedAPOD = false;
const libraryData = document.querySelector(".library-data"), roverData = document.querySelector(`.rover-data`), apodData = document.querySelector(".APOD-data");
export const inView = (el) => {
    return el.getBoundingClientRect().top < window.innerHeight;
};
export const outOfView = (el) => {
    const top = el.getBoundingClientRect().top;
    return top > (window.innerHeight || document.documentElement.clientHeight);
};
// Function dedicated to the API requests based on scroll
export const scrollRequests = () => {
    const libraryContainer = document.querySelector("#nasa"), apodContainer = document.querySelector("#APOD"), rooverContainer = document.querySelector("#rover");
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
