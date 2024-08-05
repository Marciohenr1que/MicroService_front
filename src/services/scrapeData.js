import axios from "axios";

const API_URL = "http://localhost:3001";

const scrapeData = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/scrape`, { url });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to initiate scraping"
    );
  }
};

const getwebScraping = async () => {
  try {
    const response = await axios.get(`${API_URL}/scraped_data`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch scraped");
  }
};

export default {
  scrapeData,
  getwebScraping,
};
