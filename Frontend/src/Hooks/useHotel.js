// hooks/useHotels.js
import { useState, useCallback } from "react";
import hotelService from "../Services/HotelApi/HotelService";

const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [places, setPlaces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  // Search hotels by city
  const searchHotels = useCallback(async (city, countryCode) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      console.log(`Searching hotels in ${city} (${countryCode})`);
      const response = await hotelService.getHotelsByCity(city, countryCode);

      if (response.success) {
        setHotels(response.data);
        if (response.data.length === 0) {
          setError(`No hotels found in ${city}`);
        }
      } else {
        setError(response.error || "Failed to fetch hotels");
        setHotels([]);
      }
    } catch (err) {
      setError(err.message);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get hotel details by ID
  const getHotelDetails = useCallback(async (hotelId) => {
    if (!hotelId) return;

    setLoading(true);

    try {
      console.log(`Fetching details for hotel: ${hotelId}`);
      const response = await hotelService.getHotelDetails(hotelId);

      if (response.success) {
        setSelectedHotel(response.data);
        return response.data;
      } else {
        setError(response.error || "Failed to fetch hotel details");
        return null;
      }
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search places for autocomplete
  const searchPlaces = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setPlaces([]);
      return;
    }

    try {
      const response = await hotelService.searchPlaces(query);
      if (response.success) {
        setPlaces(response.data);
      }
    } catch (err) {
      console.error("Error searching places:", err);
    }
  }, []);

  // Load countries
  const loadCountries = useCallback(async () => {
    try {
      const response = await hotelService.getCountries();
      if (response.success) {
        setCountries(response.data);
      }
    } catch (err) {
      console.error("Error loading countries:", err);
    }
  }, []);

  // Load cities by country
  const loadCitiesByCountry = useCallback(async (countryCode) => {
    try {
      const response = await hotelService.getCitiesByCountry(countryCode);
      if (response.success) {
        setCities(response.data);
      }
    } catch (err) {
      console.error("Error loading cities:", err);
    }
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setHotels([]);
    setSelectedHotel(null);
    setError(null);
    setPlaces([]);
  }, []);

  return {
    // State
    hotels,
    loading,
    error,
    selectedHotel,
    places,
    countries,
    cities,

    // Setters
    setSelectedHotel,

    // Actions
    searchHotels,
    getHotelDetails,
    searchPlaces,
    loadCountries,
    loadCitiesByCountry,
    clearSearch,
  };
};

export default useHotels;
