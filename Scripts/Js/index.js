import { animations } from "./animations.js";
import requests from "./requests.js";
import { scrollRequests } from "./scroll.js";
const init = () => {
    requests();
    animations();
    window.addEventListener("scroll", scrollRequests);
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
};
window.addEventListener("load", init);
