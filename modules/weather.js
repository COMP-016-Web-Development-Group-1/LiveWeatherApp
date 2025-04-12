/**
 * Fetches weather data for a given city and formats it into a prettier format.
 *
 * @param {string} city - The name of the city to fetch weather data for.
 * @param {function} start_cb - Optional callback function to execute at the start (before the request).
 * @param {function} end_cb - Optional callback function to execute after the request completes (or fails).
 * @returns {Promise<Object|null>} Object containing the formatted weather data or `null` if there is an error or no data is found.
 */
async function getWeatherData(city, start_cb, end_cb) {
    const OPEN_WEATHER_MAP_API_KEY = "f1035e3fb9f4d11c50209888a708e981";
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`;

    try {
        if (typeof start_cb === "function") start_cb();

        const response = await fetch(endpoint);
        if (!response.ok)
            throw new Error("Failed to fetch OpenWeatherMap data");
        const data = await response.json();
        return prettierConvertData(data);
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (typeof end_cb === "function") end_cb();
    }
}

/**
 * Converts the raw weather data into a more user-friendly format.
 *
 * @param {Object} data - The raw weather data returned from the OpenWeatherMap API.
 * @returns {Object} A formatted object containing the city name, country, local time, temperature, etc.
 */
function prettierConvertData(data) {
    const {
        name: cityName,
        sys: { country },
        main: { temp, feels_like, humidity },
        weather,
        wind: { speed: wind_mps },
        rain,
        clouds,
        dt,
        timezone,
    } = data;

    // Calculate the city's local time correctly
    // Create a date object using the UTC timestamp and add the timezone offset
    const cityTime = new Date((dt + timezone) * 1000);

    const formatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    };

    const localTimeFormatted = cityTime.toLocaleString(
        undefined,
        formatOptions
    );

    const condition = weather[0]?.main ?? "Unknown";
    const description = weather[0]?.description ?? "No description";
    const icon = weather[0]?.icon ?? "";
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return {
        cityName,
        country,
        localTime: localTimeFormatted,
        temperature: `${temp.toFixed(1)}°C`,
        feelsLike: `${feels_like.toFixed(1)}°C`,
        condition,
        description,
        iconUrl,
        humidity: `${humidity}%`,
        wind: `${wind_mps.toFixed(1)} m/s`,
        rain: `${rain?.["1h"]?.toFixed(1) ?? 0} mm`,
        cloudiness: `${clouds?.all ?? 0}%`,
    };
}

export { getWeatherData };
