import { getGiphyData } from "./modules/giphy.js";
import { getWeatherData } from "./modules/weather.js";
import {
  displayGiphy,
  displayWeather,
  hideGifLoading,
  hideWeatherLoading,
  showGifLoading,
  showWeatherLoading,
} from "./modules/view.js";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDataDiv = document.getElementById("weatherData");
const gifSectionDiv = document.getElementById("gifSection");
const weatherLoader = document.getElementById("weatherLoader");
const gifLoader = document.getElementById("gifLoader");
const overlayLoader = document.createElement("div");
overlayLoader.id = "overlayLoader";
overlayLoader.innerHTML = `<div class="loader"></div>`;
document.body.appendChild(overlayLoader);
const greeting = document.querySelector("h1");

const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.textContent = "Reset";
searchForm.appendChild(resetBtn);

disableResetButton();

function clearWeatherData() {
  document.getElementById("cityName").textContent = "";
  document.getElementById("country").textContent = "";
  document.getElementById("localTime").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("feelsLike").textContent = "";
  document.getElementById("condition").textContent = "";
  document.getElementById("humidity").textContent = "";
  document.getElementById("wind").textContent = "";
  document.getElementById("rain").textContent = "";
  document.getElementById("cloudiness").textContent = "";
  document.getElementById("weatherIcon").src = "";
}

function showOverlayLoader() {
  overlayLoader.classList.add("active");
}

function hideOverlayLoader() {
  overlayLoader.classList.remove("active");
}

function enableResetButton() {
  resetBtn.classList.add("enabled");
}

function disableResetButton() {
  resetBtn.classList.remove("enabled");
}

searchForm.addEventListener("submit", (e) => e.preventDefault());

searchBtn.addEventListener("click", async () => {
  if (searchInput.value.trim() === "") {
    searchInput.classList.add("shake");
    setTimeout(() => {
      searchInput.classList.remove("shake");
    }, 400);
    return;
  }

  clearWeatherData();

  showOverlayLoader();

  const weatherData = await getWeatherData(
    searchInput.value,
    () => {},
    () => {}
  );

  if (weatherData !== null) {
    displayWeather(weatherData);

    // checks if day or night based on the iconURL from our
    // api where "d" represents daytime and "n" for nighttime
    const isDay = weatherData.iconUrl.includes("d");
    let gifSearch = weatherData.description;
    gifSearch += isDay ? " day" : " night";

    const giphyUrl = await getGiphyData(
      gifSearch,
      () => {},
      () => {}
    );
    displayGiphy(giphyUrl);

    setTimeout(() => {
      hideOverlayLoader();

      weatherDataDiv.classList.add("active");
      gifSectionDiv.classList.add("active");

      enableResetButton();
    }, 700);
  } else {
    hideOverlayLoader();
    alert("Location not found, Please try a different location.");
  }
});

// Reset button click
resetBtn.addEventListener("click", () => {
  if (!resetBtn.classList.contains("enabled")) return;

  searchInput.value = "";

  weatherDataDiv.classList.remove("active");
  gifSectionDiv.classList.remove("active");

  clearWeatherData();

  disableResetButton();
});
