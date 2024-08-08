import React, { useState } from "react";
import { toast } from "react-toastify";
import scrapeData from "../services/scrapeData";

export default function WebScrapingForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
  
    try {
      const response = await scrapeData.scrapeData(url, userId);
  
      if (response.message) {
        toast.success(response.message);
        
      }
      setUrl("");
    } catch (error) {
      console.error("Failed to initiate scraping", error);
      toast.error("Failed to initiate scraping. Please try again.");
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md md:w-1/2">
      <h2 className="text-lg font-semibold mb-2">Web Scraping</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Scraping
        </button>
      </form>
    </div>
  );
}
