const weatherLoader = document.getElementById("weatherLoader");
const gifLoader = document.getElementById("gifLoader");

function displayWeather(data) {
    const cityName = document.getElementById("cityName");
    const country = document.getElementById("country");
    const localTime = document.getElementById("localTime");
    const temperature = document.getElementById("temperature");
    const feelsLike = document.getElementById("feelsLike");
    const condition = document.getElementById("condition");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const rain = document.getElementById("rain");
    const cloudiness = document.getElementById("cloudiness");
    const weatherIcon = document.getElementById("weatherIcon");

    cityName.textContent = data.cityName;
    country.textContent = data.country;
    localTime.textContent = data.localTime;
    temperature.textContent = data.temperature;
    feelsLike.textContent = data.feelsLike;
    condition.textContent = data.condition;
    humidity.textContent = data.humidity;
    wind.textContent = data.wind;
    rain.textContent = data.rain;
    cloudiness.textContent = data.cloudiness;
    weatherIcon.src = data.iconUrl;
}

function displayGiphy(url) {
    const weatherGif = document.getElementById("weatherGif");
    weatherGif.src = url ? url : "";
}

function showWeatherLoading() {
    weatherLoader.style.display = "flex"; // depends on the display
}

function hideWeatherLoading() {
    weatherLoader.style.display = "none";
}

function showGifLoading() {
    gifLoader.style.display = "flex"; // depends again
}

function hideGifLoading() {
    gifLoader.style.display = "none";
}

export {
    displayWeather,
    displayGiphy,
    showWeatherLoading,
    hideWeatherLoading,
    showGifLoading,
    hideGifLoading,
};
