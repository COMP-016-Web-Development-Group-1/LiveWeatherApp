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
const greeting = document.querySelector("h1");

// Create Reset Button
const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.textContent = "Reset";
resetBtn.style.display = "none"; // Hide initially
searchForm.appendChild(resetBtn);

// Prevent form default submit
searchForm.addEventListener("submit", (e) => e.preventDefault());

// Search button click
searchBtn.addEventListener("click", async () => {
  if (searchInput.value === "") return;

  const weatherData = await getWeatherData(
    searchInput.value,
    showWeatherLoading,
    hideWeatherLoading
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
      showGifLoading,
      hideGifLoading
    );
    displayGiphy(giphyUrl);

    // Reveal sections
    weatherDataDiv.classList.add("active");
    gifSectionDiv.classList.add("active");

    // Fade out greeting
    if (greeting) greeting.classList.add("hidden");

    // Show reset button
    resetBtn.style.display = "inline-block";
  } else {
    alert("Location not found, Please try a different location.");
  }
});

// Reset button click
resetBtn.addEventListener("click", () => {
  searchInput.value = "";

  // Hide sections
  weatherDataDiv.classList.remove("active");
  gifSectionDiv.classList.remove("active");

  // Clear weather and gif content
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
  document.getElementById("weatherGif").src = "";

  // Show greeting back
  if (greeting) greeting.classList.remove("hidden");

  // Hide reset button
  resetBtn.style.display = "none";
});
