import { APIs } from "./APIs.js";
import { librarySlider, roverSlider } from "./slider.js";

const searchInput = document.querySelector("#search-input") as HTMLInputElement,
  searchBtn = document.querySelector("#search-btn") as HTMLButtonElement,
  roverInput = document.querySelectorAll<HTMLInputElement>('input[name="rover"]'),
  libraryUl = document.createElement("ul") as HTMLUListElement,
  roverUl = document.createElement(`ul`) as HTMLUListElement,
  loading = "fas fa-cog fa-spin icon-placeholder",
  error = "fa-solid fa-triangle-exclamation icon-placeholder";

interface DataInterface {
  [key: string]: any;
}

export const createIcon = (icon: string, dataLocation: HTMLElement) => {
  console.log(dataLocation);
  dataLocation.innerHTML = `
    <i class='${icon}'></i>
  `;
};

// This function is responsible for making the API requests, and it has three parameters, the API ULR, the container where the API data will take place, and the function to process the API data

// This function is called either with via input actions or the window scroll
export const requestAPI = (
  api: string,
  dataLocation: HTMLElement,
  processData: (data: DataInterface, dataLocation: HTMLElement) => void
) => {
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
export const useLibrary = (data: any, dataLocation: any) => {
  // Resets content inside Library Container
  libraryUl.innerHTML = "";
  dataLocation.innerHTML = "";

  if (data.collection.items == "") {
    createIcon(error, dataLocation);
  } else {
    // Create Previous and Next buttons
    dataLocation.innerHTML = `
    <i id="library-prev" class="fa-solid fa-angle-left arrow"></i>
    <i id="library-next" class="fa-solid fa-angle-right arrow"></i>
    `;

    data.collection.items.map((i: any, index: any) => {
      const li = document.createElement("li") as HTMLLIElement,
        nasa_id = i.data[0].nasa_id;

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
export const useRover = (data: DataInterface, dataLocation: HTMLElement) => {
  // Resets content inside Rover Container
  roverUl.innerHTML = "";
  dataLocation.innerHTML = "";

  data.photos.map((i: DataInterface) => {
    const li = document.createElement("li") as HTMLLIElement;

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
export const useAPOD = (data: DataInterface, dataLocation: HTMLElement) => {
  const description = document.createElement("div") as HTMLDivElement;

  dataLocation.innerHTML = "";

  if (data.media_type === "image") {
    const img = document.createElement("img") as HTMLImageElement;
    img.src = data.url;

    dataLocation.appendChild(img);
  } else if (data.media_type === "video") {
    const iframe = document.createElement("iframe") as HTMLIFrameElement;

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
  const libraryData = document.querySelector(".library-data") as HTMLDivElement;
  const roverData = document.querySelector(".rover-data") as HTMLDivElement;

  searchBtn.addEventListener("click", () => {
    requestAPI(`${APIs.library}${searchInput.value}`, libraryData, useLibrary);
  });
  roverInput.forEach((i: HTMLInputElement) => {
    i.addEventListener("click", () => {
      requestAPI(i.value, roverData, useRover);
    });
  });
};

export default requests;
