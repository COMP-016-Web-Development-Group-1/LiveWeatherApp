/**
 * Fetches a Giphy image URL for the given search term.
 * @param {string} search - Search term for the Giphy API.
 * @param {function} start_cb - Optional callback function to execute at the start (before the request).
 * @param {function} end_cb - Optional callback function to execute after the request completes (or fails).
 * @returns {Promise<string|null>} URL of the GIF or `null` on failure.
 */
async function getGiphyData(search, start_cb, end_cb) {
    const GIPHY_API_KEY = "hV5tRiJrT5cxSjliq4ginTRaknGbyvvH";
    const endpoint = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${encodeURIComponent(
        search
    )}`;

    try {
        if (typeof start_cb === "function") start_cb();

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch Giphy data");
        const data = await response.json();

        if (data.data && data.data.images && data.data.images.original) {
            return data.data.images.original.url;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (typeof end_cb === "function") end_cb();
    }
}

export { getGiphyData };
