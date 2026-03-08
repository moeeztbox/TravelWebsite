// services/hotelService.js
import axios from "axios";

class HotelService {
  constructor() {
    // Use your working sandbox key
    this.apiKey =
      import.meta.env.VITE_LITEAPI_PUBLIC_KEY ||
      "sand_11115ffd-8124-433b-bbbf-5a96fb508e5c";
    this.baseURL = "https://api.liteapi.travel/v3.0";

    console.log(
      "HotelService initialized with API key:",
      this.apiKey.substring(0, 10) + "...",
    );

    // Create axios instance with default config
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use((request) => {
      console.log(
        `🚀 API Request: ${request.method.toUpperCase()} ${request.url}`,
      );
      return request;
    });

    // Add response interceptor for debugging
    this.api.interceptors.response.use(
      (response) => {
        console.log(
          `✅ API Response: ${response.status} from ${response.config.url}`,
        );
        return response;
      },
      (error) => {
        console.error(
          `❌ API Error:`,
          error.response?.status,
          error.response?.data || error.message,
        );
        return Promise.reject(error);
      },
    );
  }

  /**
   * Search for places (cities, airports, landmarks)
   */
  async searchPlaces(query, type = "city") {
    try {
      const response = await this.api.get("/data/places", {
        params: {
          textQuery: query,
          type: type,
          language: "en",
          limit: 10,
        },
      });

      return {
        success: true,
        data: response.data.data || [],
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error searching places:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Get hotels by city name
   */
  async getHotelsByCity(cityName, countryCode) {
    try {
      console.log(`🔍 Fetching hotels in ${cityName}, ${countryCode}`);

      const response = await this.api.get("/data/hotels", {
        params: {
          countryCode: countryCode,
          cityName: cityName,
          limit: 20,
          language: "en",
        },
      });

      // Transform the data to match component structure
      const hotels =
        response.data.data?.map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          address: hotel.address,
          starRating: hotel.stars || 0,
          rating: hotel.rating || 0,
          price: null, // You'll need to fetch rates separately
          currency: "USD",
          image:
            hotel.main_photo ||
            "https://via.placeholder.com/300x200?text=Hotel",
          description: hotel.hotelDescription || "",
          amenities: hotel.hotelFacilities || [],
          city: hotel.city,
          country: hotel.country,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          phone: hotel.phone,
          email: hotel.email,
          website: hotel.website,
        })) || [];

      return {
        success: true,
        data: hotels,
        count: hotels.length,
        source: "liteapi",
      };
    } catch (error) {
      console.error(
        "Error fetching hotels:",
        error.response?.data || error.message,
      );
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Get detailed hotel information by hotel ID
   */
  async getHotelDetails(hotelId) {
    try {
      console.log(`🔍 Fetching details for hotel: ${hotelId}`);

      const response = await this.api.get("/data/hotel", {
        params: {
          hotelId: hotelId,
          language: "en",
        },
      });

      const hotel = response.data.data;

      // Transform to component structure
      return {
        success: true,
        data: {
          id: hotel.id,
          name: hotel.name,
          description: hotel.hotelDescription || "No description available",
          address: hotel.address || "Address not available",
          starRating: hotel.starRating || 0,
          rating: hotel.rating || 0,
          currency: hotel.currency || "USD",
          images: hotel.hotelImages?.map((img) => img.url) || [],
          amenities: hotel.hotelFacilities || [],
          checkIn: hotel.checkinCheckoutTimes?.checkin,
          checkOut: hotel.checkinCheckoutTimes?.checkout,
          latitude: hotel.location?.latitude,
          longitude: hotel.location?.longitude,
          city: hotel.city,
          country: hotel.country,
          zip: hotel.zip,
          phone: hotel.phone,
          email: hotel.email,
          website: hotel.website,
          mainPhoto: hotel.main_photo,
        },
        source: "liteapi",
      };
    } catch (error) {
      console.error(
        "Error fetching hotel details:",
        error.response?.data || error.message,
      );
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Get hotel reviews
   */
  async getHotelReviews(hotelId, limit = 50) {
    try {
      const response = await this.api.get("/data/reviews", {
        params: {
          hotelId: hotelId,
          limit: limit,
          getSentiment: true,
        },
      });

      return {
        success: true,
        data: response.data.data || [],
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Get countries list
   */
  async getCountries() {
    try {
      const response = await this.api.get("/data/countries");

      return {
        success: true,
        data: response.data.data || [],
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error fetching countries:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Get cities by country
   */
  async getCitiesByCountry(countryCode) {
    try {
      const response = await this.api.get("/data/cities", {
        params: {
          countryCode: countryCode,
        },
      });

      return {
        success: true,
        data: response.data.data || [],
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Get hotel rates/availability
   */
  async getHotelRates(params) {
    try {
      const {
        hotelIds,
        checkIn,
        checkOut,
        adults = 2,
        children = [],
        rooms = 1,
        currency = "USD",
        guestNationality = "SA", // Default to Saudi Arabia
      } = params;

      const response = await this.api.post("/hotels/rates", {
        hotelIds: Array.isArray(hotelIds) ? hotelIds : [hotelIds],
        checkin: checkIn,
        checkout: checkOut,
        currency: currency,
        guestNationality: guestNationality,
        occupancies: [
          {
            rooms: rooms,
            adults: adults,
            children: children.map((age) => ({ age })),
          },
        ],
      });

      return {
        success: true,
        data: response.data.data || [],
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error fetching rates:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Pre-book a room (lock rates and check availability)
   */
  async prebookRoom(offerId) {
    try {
      const response = await this.api.post("/rates/prebook", {
        offerId: offerId,
      });

      return {
        success: true,
        data: response.data.data,
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error pre-booking:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Confirm booking
   */
  async confirmBooking(prebookId, holderInfo, guests) {
    try {
      const response = await this.api.post("/rates/book", {
        prebookId: prebookId,
        holder: holderInfo,
        guests: guests,
        payment: {
          method: "ACC_CREDIT_CARD",
        },
      });

      return {
        success: true,
        data: response.data.data,
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error confirming booking:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Get booking details
   */
  async getBooking(bookingId) {
    try {
      const response = await this.api.get(`/bookings/${bookingId}`);

      return {
        success: true,
        data: response.data.data,
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error fetching booking:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId) {
    try {
      const response = await this.api.post(`/bookings/${bookingId}/cancel`);

      return {
        success: true,
        data: response.data.data,
        source: "liteapi",
      };
    } catch (error) {
      console.error("Error canceling booking:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}

// Create and export a singleton instance
const hotelService = new HotelService();
export default hotelService;
