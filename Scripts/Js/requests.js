import { APIs } from "./APIs.js";
import { librarySlider, roverSlider } from "./slider.js";
const searchInput = document.querySelector("#search-input"), searchBtn = document.querySelector("#search-btn"), roverInput = document.querySelectorAll('input[name="rover"]'), libraryUl = document.createElement("ul"), roverUl = document.createElement(`ul`), loading = "fas fa-cog fa-spin icon-placeholder", error = "fa-solid fa-triangle-exclamation icon-placeholder";
export const createIcon = (icon, dataLocation) => {
    console.log(dataLocation);
    dataLocation.innerHTML = `
    <i class='${icon}'></i>
  `;
};
// This function is responsible for making the API requests, and it has three parameters, the API ULR, the container where the API data will take place, and the function to process the API data
// This function is called either with via input actions or the window scroll
export const requestAPI = (api, dataLocation, processData) => {
    createIcon(loading, dataLocation);
    setTimeout(() => {
        fetch(api)
            .then((res) => res.json())
            .then((data) => {
            processData(data, dataLocation);
        })
            .catch((err) => {
            createIcon(error, dataLocation);
            console.log("err");
        });
    }, 1500);
};
// Use Nasa Image Library data
export const useLibrary = (data, dataLocation) => {
    // Resets content inside Library Container
    libraryUl.innerHTML = "";
    dataLocation.innerHTML = "";
    if (data.collection.items == "") {
        createIcon(error, dataLocation);
    }
    else {
        // Create Previous and Next buttons
        dataLocation.innerHTML = `
    <i id="library-prev" class="fa-solid fa-angle-left arrow"></i>
    <i id="library-next" class="fa-solid fa-angle-right arrow"></i>
    `;
        data.collection.items.map((i, index) => {
            const li = document.createElement("li"), nasa_id = i.data[0].nasa_id;
            if (i.links && i.data) {
                // Create list of data
                li.innerHTML = `
            <img src='${i.links[0].href}' />
            <div>
            <p>${i.data[0].title}</p>
              <a target='_blank' href='https://images.nasa.gov/details-${nasa_id}'>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
                Learn More
              </a>
            </div>
           `;
                libraryUl.appendChild(li);
                dataLocation.appendChild(libraryUl);
                librarySlider();
            }
        });
    }
};
// Use Mars Rover data
export const useRover = (data, dataLocation) => {
    // Resets content inside Rover Container
    roverUl.innerHTML = "";
    dataLocation.innerHTML = "";
    data.photos.map((i) => {
        const li = document.createElement("li");
        if (i) {
            // Create Previous and Next buttons
            dataLocation.innerHTML = `
      <i id="rover-prev" class="fa-solid fa-angle-left arrow"></i>
      <i id="rover-next" class="fa-solid fa-angle-right arrow"></i>
      `;
            // Create list of data
            li.innerHTML = `
          <img src='${i.img_src}'/>
          <div>
          <span>
            <i class="fa-solid fa-camera"></i>
            <p>${i.camera.full_name}</p>
          </span>
          <span>
            <i class="fa-regular fa-calendar"></i>
            <p>${i.earth_date}</p>
          </span>
          </div>

          `;
            roverUl.appendChild(li);
            dataLocation.appendChild(roverUl);
            roverSlider();
        }
    });
};
// Use Astronomy Picture of the Day Data
export const useAPOD = (data, dataLocation) => {
    const description = document.createElement("div");
    dataLocation.innerHTML = "";
    if (data.media_type === "image") {
        const img = document.createElement("img");
        img.src = data.url;
        dataLocation.appendChild(img);
    }
    else if (data.media_type === "video") {
        const iframe = document.createElement("iframe");
        iframe.src = data.url;
        dataLocation.appendChild(iframe);
    }
    description.innerHTML = `
    <header>
      <h1>${data.title}</h1>
    </header>
    <p>${data.explanation}</p>
    `;
    dataLocation.appendChild(description);
};
const requests = () => {
    // Uses the input value for a specific search
    const libraryData = document.querySelector(".library-data");
    const roverData = document.querySelector(".rover-data");
    searchBtn.addEventListener("click", () => {
        requestAPI(`${APIs.library}${searchInput.value}`, libraryData, useLibrary);
    });
    roverInput.forEach((i) => {
        i.addEventListener("click", () => {
            requestAPI(i.value, roverData, useRover);
        });
    });
};
export default requests;
