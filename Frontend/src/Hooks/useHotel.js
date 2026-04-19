
import { useState, useCallback } from "react";
import hotelService from "../Services/HotelApi/HotelService";

function asNumber(v) {
  const n = typeof v === "string" ? Number(v) : Number(v);
  return Number.isFinite(n) ? n : null;
}

function extractCheapestOffer(entry) {
  // LiteAPI response shapes can differ; handle a few common patterns safely.
  if (!entry) return null;

  const currency =
    entry.currency ||
    entry?.price?.currency ||
    entry?.rates?.[0]?.currency ||
    entry?.offers?.[0]?.currency ||
    entry?.roomTypes?.[0]?.offerRetailRate?.currency ||
    entry?.roomTypes?.[0]?.suggestedSellingPrice?.currency ||
    entry?.roomTypes?.[0]?.offerInitialPrice?.currency ||
    "USD";

  const candidates = [];

  const pushAmount = (amt) => {
    const n = asNumber(amt);
    if (n !== null && n > 0) candidates.push(n);
  };

  // Common: entry.rates = [{ total, amount, price, ... }]
  if (Array.isArray(entry.rates)) {
    for (const r of entry.rates) {
      pushAmount(r?.total);
      pushAmount(r?.amount);
      pushAmount(r?.price);
      pushAmount(r?.net);
      pushAmount(r?.gross);
      pushAmount(r?.sellingRate);
      pushAmount(r?.totalAmount);
      pushAmount(r?.totalPrice);
    }
  }

  // Common: entry.offers = [{ price: { total }, total, ... }]
  if (Array.isArray(entry.offers)) {
    for (const o of entry.offers) {
      pushAmount(o?.total);
      pushAmount(o?.amount);
      pushAmount(o?.price?.total);
      pushAmount(o?.price?.amount);
      pushAmount(o?.price?.net);
      pushAmount(o?.price?.gross);
    }
  }

  // LiteAPI: entry.roomTypes = [{ offerRetailRate: { amount, currency }, ... }]
  if (Array.isArray(entry.roomTypes)) {
    for (const rt of entry.roomTypes) {
      pushAmount(rt?.offerRetailRate?.amount);
      pushAmount(rt?.suggestedSellingPrice?.amount);
      pushAmount(rt?.offerInitialPrice?.amount);
      // sometimes plain numbers
      pushAmount(rt?.offerRetailRate);
      pushAmount(rt?.suggestedSellingPrice);
      pushAmount(rt?.offerInitialPrice);
    }
  }

  // Sometimes a single price is present
  pushAmount(entry?.total);
  pushAmount(entry?.amount);
  pushAmount(entry?.price?.total);
  pushAmount(entry?.price?.amount);

  if (!candidates.length) return null;
  const min = Math.min(...candidates);
  return { amount: min, currency: String(currency || "USD").toUpperCase() };
}

const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [places, setPlaces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [ratesByHotelId, setRatesByHotelId] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState(null);

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

  const fetchHotelRates = useCallback(async (params) => {
    try {
      setRatesLoading(true);
      setRatesError(null);
      const response = await hotelService.getHotelRates(params);
      if (!response.success) {
        setRatesByHotelId({});
        setRatesError(response.error || "Failed to fetch rates");
        return;
      }

      const data = response.data || [];
      const next = {};

      // Possible shapes:
      // - [{ hotelId, rates: [...] }]
      // - [{ id, rates: [...] }]
      // - { hotelId: { ... } } (rare)
      if (Array.isArray(data)) {
        for (const entry of data) {
          const id = String(entry?.hotelId || entry?.id || entry?.hotel?.id || "").trim();
          if (!id) continue;
          const best = extractCheapestOffer(entry);
          if (best) next[id] = best;
        }
      } else if (data && typeof data === "object") {
        for (const [id, entry] of Object.entries(data)) {
          const best = extractCheapestOffer(entry);
          if (best) next[String(id)] = best;
        }
      }

      setRatesByHotelId(next);
    } catch (err) {
      setRatesByHotelId({});
      setRatesError(err.message || "Failed to fetch rates");
    } finally {
      setRatesLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setHotels([]);
    setSelectedHotel(null);
    setError(null);
    setPlaces([]);
    setRatesByHotelId({});
    setRatesError(null);
  }, []);

  return {
    hotels,
    loading,
    error,
    selectedHotel,
    places,
    countries,
    cities,
    ratesByHotelId,
    ratesLoading,
    ratesError,

    setSelectedHotel,

    searchHotels,
    getHotelDetails,
    searchPlaces,
    loadCountries,
    loadCitiesByCountry,
    fetchHotelRates,
    clearSearch,
  };
};

export default useHotels;
