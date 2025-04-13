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

searchForm.addEventListener("submit", (e) => e.preventDefault());
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
    } else {
        alert("Location not found, Please try a different location.");
    }
});
