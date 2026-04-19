import { useState, useCallback } from "react";
import AmadeusService from "../Services/AmadeusApi/AmadeusService";

/**
 * Custom hook for managing flight search state and API calls
 */
export const useFlightSearch = () => {
  // State for storing flight results
  const [flights, setFlights] = useState([]);

  // State for tracking if API call is in progress
  const [loading, setLoading] = useState(false);

  // State for storing any error messages
  const [error, setError] = useState(null);

  // State for tracking which flight user selected
  const [selectedFlight, setSelectedFlight] = useState(null);

  /**
   * Transform Amadeus API response into a format your app can use
   * @param {Array} amadeusFlights - Raw flight data from Amadeus
   * @returns {Array} - Transformed flight data for your UI
   */
  const transformFlightData = useCallback((amadeusFlights) => {
    if (!amadeusFlights || !Array.isArray(amadeusFlights)) {
      return [];
    }

    return amadeusFlights
      .map((offer, index) => {
        try {
          // Get the first and last segments for departure/arrival info
          const firstSegment = offer.itineraries[0]?.segments[0];
          const lastSegment =
            offer.itineraries[0]?.segments[
              offer.itineraries[0].segments.length - 1
            ];

          if (!firstSegment || !lastSegment) {
            return null;
          }

          // Get baggage information if available
          const travelerPricing = offer.travelerPricings?.[0];
          const baggageInfo =
            travelerPricing?.fareDetailsBySegment?.[0]?.includedCheckedBags;

          // Format duration from "PT3H15M" to "3h 15m"
          const formatDuration = (duration) => {
            if (!duration) return "0h 0m";
            const hours = duration.match(/(\d+)H/)?.[1] || "0";
            const minutes = duration.match(/(\d+)M/)?.[1] || "0";
            return `${hours}h ${minutes}m`;
          };

          // Format stops text
          const stopsCount = offer.itineraries[0]?.segments?.length - 1 || 0;
          const stopsText =
            stopsCount === 0
              ? "Non-stop"
              : stopsCount === 1
                ? "1 Stop"
                : `${stopsCount} Stops`;

          // Extract airline codes for logo
          const airlineCode = firstSegment.carrierCode;

          // Get airline name
          const getAirlineName = (code) => {
            const airlines = {
              PK: "PIA",
              SV: "Saudi Airlines",
              EK: "Emirates",
              QR: "Qatar Airways",
              G9: "Air Arabia",
              EY: "Etihad",
              FZ: "Flydubai",
              KU: "Kuwait Airways",
              WY: "Oman Air",
              GF: "Gulf Air",
            };
            return airlines[code] || code;
          };

          // Format date time
          const formatDateTime = (dateTimeString) => {
            if (!dateTimeString) return { full: "", time: "", date: "" };
            const date = new Date(dateTimeString);
            return {
              full: dateTimeString,
              time: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
              date: date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            };
          };

          return {
            id: offer.id || index,
            airline: {
              name: getAirlineName(airlineCode),
              code: airlineCode,
              logo: `https://images.kiwi.com/airlines/64/${airlineCode}.png`,
              fallbackLogo: `https://daisycon.io/images/airline/?width=64&height=64&iata=${airlineCode}`,
            },
            flightNumber: `${airlineCode} ${firstSegment.number}`,
            departure: {
              time: formatDateTime(firstSegment.departure?.at),
              airport: firstSegment.departure?.iataCode || "N/A",
              terminal: firstSegment.departure?.terminal || "N/A",
            },
            arrival: {
              time: formatDateTime(lastSegment.arrival?.at),
              airport: lastSegment.arrival?.iataCode || "N/A",
              terminal: lastSegment.arrival?.terminal || "N/A",
            },
            duration: formatDuration(offer.itineraries[0]?.duration),
            stops: {
              count: stopsCount,
              text: stopsText,
              airports:
                offer.itineraries[0]?.segments
                  ?.map((s) => s.arrival?.iataCode)
                  .filter(Boolean)
                  .slice(0, -1) || [],
            },
            cabinClass:
              travelerPricing?.fareDetailsBySegment?.[0]?.cabin || "ECONOMY",
            price: {
              amount: parseFloat(offer.price?.total) || 0,
              currency: offer.price?.currency || "USD",
              grandTotal: offer.price?.grandTotal,
            },
            baggage: baggageInfo
              ? `${baggageInfo.quantity || 0} ${baggageInfo.weight || ""} ${baggageInfo.weightUnit || ""}`.trim()
              : "Not included",
            rawOffer: offer,
          };
        } catch (err) {
          console.error("Error transforming flight:", err);
          return null;
        }
      })
      .filter(Boolean); // Remove null items
  }, []);

  /**
   * Main search function - call this when user submits the form
   */
  const searchFlights = useCallback(
    async (searchParams) => {
      // Start loading, clear old errors
      setLoading(true);
      setError(null);

      try {
        // Map your form fields to API parameters
        // In your useFlightSearch.js, the apiParams should match what we send:
        const apiParams = {
          origin:
            searchParams.from.split("(")[1]?.replace(")", "") ||
            searchParams.from,
          destination:
            searchParams.to.split("(")[1]?.replace(")", "") || searchParams.to,
          departureDate: searchParams.depDate,
          adults: searchParams.adults,
          children: searchParams.children,
          infants: searchParams.infants,
          travelClass: searchParams.cabinClass?.toUpperCase() || "ECONOMY",
          returnDate:
            searchParams.tripType === "round" ? searchParams.retDate : null,
        };
        // Add return date for round trips
        if (searchParams.tripType === "round" && searchParams.retDate) {
          apiParams.returnDate = searchParams.retDate;
        }

        // Call the API service
        const results = await AmadeusService.searchFlights(apiParams);

        // Transform the data for your UI
        const transformedFlights = transformFlightData(results);

        setFlights(transformedFlights);

        // Show message if no flights found
        if (transformedFlights.length === 0) {
          setError("No flights found. Try different dates or airports.");
        }
      } catch (err) {
        setError(err.message || "Failed to search flights");
        setFlights([]);
      } finally {
        setLoading(false);
      }
    },
    [transformFlightData],
  );

  /**
   * Select a flight
   */
  const selectFlight = useCallback((flight) => {
    setSelectedFlight(flight);
  }, []);

  /**
   * Clear all results (useful when form changes)
   */
  const clearResults = useCallback(() => {
    setFlights([]);
    setError(null);
    setSelectedFlight(null);
  }, []);

  return {
    flights,
    loading,
    error,
    selectedFlight,
    searchFlights,
    selectFlight,
    clearResults,
  };
};
