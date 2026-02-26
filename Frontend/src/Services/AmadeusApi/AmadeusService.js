class AmadeusService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.clientId = import.meta.env.VITE_AMADEUS_API_KEY;
    this.clientSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
    this.baseUrl = "https://test.api.amadeus.com"; // Use 'test' for development
  }

  /**
   * Get OAuth2 access token from Amadeus
   */
  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      console.log("Getting new access token...");

      const response = await fetch(`${this.baseUrl}/v1/security/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get access token: ${error}`);
      }

      const data = await response.json();

      // Store token and expiry (expires in 30 minutes, but we'll set to 25 minutes to be safe)
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000; // Subtract 5 minutes

      console.log("✅ Access token obtained successfully");
      return this.accessToken;
    } catch (error) {
      console.error("❌ Error getting access token:", error);
      throw error;
    }
  }

  /**
   * Search for flights based on user input
   * @param {Object} searchParams - The search parameters from the form
   * @returns {Promise<Array>} - Array of flight offers
   */
  async searchFlights(searchParams) {
    try {
      // Get access token first
      const token = await this.getAccessToken();

      console.log("Searching flights with params:", searchParams);

      // Validate required parameters
      if (
        !searchParams.origin ||
        !searchParams.destination ||
        !searchParams.departureDate
      ) {
        throw new Error("Missing required flight search parameters");
      }

      // Build query parameters
      const queryParams = new URLSearchParams({
        originLocationCode: searchParams.origin.toUpperCase(),
        destinationLocationCode: searchParams.destination.toUpperCase(),
        departureDate: searchParams.departureDate,
        adults: parseInt(searchParams.adults) || 1,
        ...(searchParams.children > 0 && {
          children: parseInt(searchParams.children),
        }),
        ...(searchParams.infants > 0 && {
          infants: parseInt(searchParams.infants),
        }),
        travelClass: searchParams.travelClass || "ECONOMY",
        max: 50,
        currencyCode: "USD",
      });

      // Add return date if it's a round trip
      if (searchParams.returnDate) {
        queryParams.append("returnDate", searchParams.returnDate);
      }

      // Make the API call to Amadeus Flight Offers Search
      const response = await fetch(
        `${this.baseUrl}/v2/shopping/flight-offers?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);

        // Handle specific error codes
        if (response.status === 401) {
          // Token might be expired, clear it and retry once
          this.accessToken = null;
          return this.searchFlights(searchParams);
        }

        throw new Error(this.handleApiError(errorData, response.status));
      }

      const data = await response.json();
      console.log("✅ Flight search successful:", data);

      return data.data || [];
    } catch (error) {
      console.error("Flight search error:", error);
      throw this.handleError(error);
    }
  }

  /**
   * Get hardcoded airports for Pakistan and Saudi Arabia when API fails
   * @param {string} keyword - What user is typing
   * @returns {Array} - Array of matching airports
   */
  getHardcodedAirports(keyword) {
    const keywordLower = keyword.toLowerCase();

    // Pakistan Airports
    const pakistanAirports = [
      {
        name: "Lahore",
        iataCode: "LHE",
        airportName: "Allama Iqbal International Airport",
        country: "Pakistan",
        keywords: ["lahore", "lhe", "lah"],
      },
      {
        name: "Karachi",
        iataCode: "KHI",
        airportName: "Jinnah International Airport",
        country: "Pakistan",
        keywords: ["karachi", "khi", "kar"],
      },
      {
        name: "Islamabad",
        iataCode: "ISB",
        airportName: "Islamabad International Airport",
        country: "Pakistan",
        keywords: ["islamabad", "isb", "isla"],
      },
      {
        name: "Multan",
        iataCode: "MUX",
        airportName: "Multan International Airport",
        country: "Pakistan",
        keywords: ["multan", "mux", "mul"],
      },
      {
        name: "Faisalabad",
        iataCode: "LYP",
        airportName: "Faisalabad International Airport",
        country: "Pakistan",
        keywords: ["faisalabad", "lyp", "fai"],
      },
      {
        name: "Peshawar",
        iataCode: "PEW",
        airportName: "Bacha Khan International Airport",
        country: "Pakistan",
        keywords: ["peshawar", "pew", "pes"],
      },
      {
        name: "Quetta",
        iataCode: "UET",
        airportName: "Quetta International Airport",
        country: "Pakistan",
        keywords: ["quetta", "uet", "que"],
      },
      {
        name: "Sialkot",
        iataCode: "SKT",
        airportName: "Sialkot International Airport",
        country: "Pakistan",
        keywords: ["sialkot", "skt", "sia"],
      },
    ];

    // Saudi Arabia Airports
    const saudiAirports = [
      {
        name: "Jeddah",
        iataCode: "JED",
        airportName: "King Abdulaziz International Airport",
        country: "Saudi Arabia",
        keywords: ["jeddah", "jed", "jed"],
      },
      {
        name: "Riyadh",
        iataCode: "RUH",
        airportName: "King Khalid International Airport",
        country: "Saudi Arabia",
        keywords: ["riyadh", "ruh", "riy"],
      },
      {
        name: "Dammam",
        iataCode: "DMM",
        airportName: "King Fahd International Airport",
        country: "Saudi Arabia",
        keywords: ["dammam", "dmm", "dam"],
      },
      {
        name: "Medinah",
        iataCode: "MED",
        airportName: "Prince Mohammad Bin Abdulaziz International Airport",
        country: "Saudi Arabia",
        keywords: ["medinah", "med", "madinah", "medina"],
      },
      {
        name: "Taif",
        iataCode: "TIF",
        airportName: "Taif International Airport",
        country: "Saudi Arabia",
        keywords: ["taif", "tif", "tai"],
      },
      {
        name: "Tabuk",
        iataCode: "TUU",
        airportName: "Tabuk Regional Airport",
        country: "Saudi Arabia",
        keywords: ["tabuk", "tuu", "tab"],
      },
      {
        name: "Abha",
        iataCode: "AHB",
        airportName: "Abha International Airport",
        country: "Saudi Arabia",
        keywords: ["abha", "ahb", "abh"],
      },
      {
        name: "Gassim",
        iataCode: "ELQ",
        airportName: "Gassim Regional Airport",
        country: "Saudi Arabia",
        keywords: ["gassim", "elq", "gas"],
      },
    ];

    // Combine all airports
    const allAirports = [...pakistanAirports, ...saudiAirports];

    // Filter by keyword
    const matches = allAirports.filter(
      (airport) =>
        airport.keywords.some((k) => keywordLower.includes(k)) ||
        airport.name.toLowerCase().includes(keywordLower) ||
        airport.iataCode.toLowerCase().includes(keywordLower),
    );

    // Convert to the format your app expects
    return matches.map((airport) => ({
      label: `${airport.name} (${airport.iataCode}) - ${airport.airportName}`,
      value: airport.iataCode,
      type: "AIRPORT",
      cityName: airport.name,
      airportName: airport.airportName,
      country: airport.country,
    }));
  }

  /**
   * Get holy cities if they match the keyword
   * @param {string} keyword - What user is typing
   * @returns {Array} - Array of holy city suggestions
   */
  getHolyCities(keyword) {
    const keywordLower = keyword.toLowerCase();
    const cities = [];

    // Makkah variations
    if (
      ["makkah", "mak", "makk", "mecca"].some((match) =>
        keywordLower.includes(match),
      )
    ) {
      cities.push({
        label: "Makkah (MAK) - Holy City",
        value: "MAK",
        type: "CITY",
        cityName: "Makkah",
        country: "Saudi Arabia",
      });
    }

    // Medinah variations
    if (
      ["medinah", "med", "madinah", "medina"].some((match) =>
        keywordLower.includes(match),
      )
    ) {
      cities.push({
        label: "Medinah (MED) - Holy City",
        value: "MED",
        type: "CITY",
        cityName: "Medinah",
        country: "Saudi Arabia",
      });
    }

    return cities;
  }

  /**
   * Search for cities and airports by keyword
   * @param {string} keyword - What user is typing (e.g., "lah", "jed")
   * @returns {Promise<Array>} - List of matching locations with their IATA codes
   */
  async searchLocations(keyword) {
    try {
      if (keyword.length < 2) return [];

      console.log("🔍 Searching for keyword:", keyword);

      // First, try to get hardcoded matches (this will always work)
      const hardcodedMatches = this.getHardcodedAirports(keyword);
      console.log("Hardcoded matches:", hardcodedMatches);

      // Get holy cities
      const holyCities = this.getHolyCities(keyword);
      console.log("Holy cities:", holyCities);

      // Combine results
      let allResults = [...hardcodedMatches, ...holyCities];

      // Try to get API results as well (optional, for more airports)
      try {
        const token = await this.getAccessToken();

        const url =
          `https://test.api.amadeus.com/v1/reference-data/locations?` +
          new URLSearchParams({
            subType: "AIRPORT",
            keyword: keyword,
            "page[limit]": 20,
          });

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            const apiResults = this.transformLocationResults(data.data);
            allResults = [...allResults, ...apiResults];
          }
        }
      } catch (apiError) {
        console.log("API location search failed, using hardcoded data only");
      }

      // Remove duplicates based on IATA code
      const seen = new Set();
      const uniqueResults = allResults.filter((result) => {
        if (seen.has(result.value)) return false;
        seen.add(result.value);
        return true;
      });

      console.log("Final unique results:", uniqueResults);
      return uniqueResults.slice(0, 10);
    } catch (error) {
      console.error("❌ Location search error:", error);
      // Fallback to hardcoded matches even on error
      return this.getHardcodedAirports(keyword).slice(0, 10);
    }
  }

  /**
   * Transform API results into your format
   * @param {Array} locations - Raw locations from Amadeus API
   * @returns {Array} - Formatted locations
   */
  transformLocationResults(locations) {
    return locations.map((location) => ({
      label: this.formatLocationLabel(location),
      value: location.iataCode || location.name,
      type: location.subType,
      cityName: location.name,
      airportName: location.detailedName,
      country: location.address?.countryName,
    }));
  }

  /**
   * Format location for display in dropdown
   * @param {Object} location - Location object from Amadeus
   * @returns {string} - Formatted label
   */
  formatLocationLabel(location) {
    if (location.subType === "AIRPORT") {
      return `${location.name} (${location.iataCode}) - ${location.detailedName}`;
    } else {
      return location.iataCode
        ? `${location.name} (${location.iataCode})`
        : location.name;
    }
  }

  /**
   * Handle API errors and return user-friendly messages
   */
  handleApiError(errorData, status) {
    if (errorData.errors && errorData.errors.length > 0) {
      const error = errorData.errors[0];
      return `${error.title}: ${error.detail}`;
    }

    switch (status) {
      case 400:
        return "Invalid request parameters. Please check your search criteria.";
      case 401:
        return "Authentication failed. Please check your API credentials.";
      case 404:
        return "No flights found for your search criteria.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "Amadeus server error. Please try again later.";
      default:
        return `Error ${status}: Failed to search flights`;
    }
  }

  /**
   * Handle errors gracefully
   */
  handleError(error) {
    console.error("Full error object:", error);
    return new Error(
      error.message || "Failed to search flights. Please try again.",
    );
  }
}

// Export a single instance of the service
export default new AmadeusService();
