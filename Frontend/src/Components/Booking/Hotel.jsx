// pages/Hotel/Hotel.jsx
import React, { useState, useEffect } from "react";
import useHotels from "../../Hooks/useHotel";

const Hotel = () => {
  const {
    hotels,
    loading,
    error,
    selectedHotel,
    isMockData,
    searchHotels,
    getHotelDetails,
    setSelectedHotel,
    clearSearch,
    searchPlaces,
    places,
    loadCountries,
  } = useHotels();

  const [searchInput, setSearchInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load countries on mount
  useEffect(() => {
    loadCountries();
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Country code mapping for popular cities
  const getCountryCode = (city) => {
    const cityLower = city.toLowerCase().trim();

    const countryMap = {
      // Saudi Arabia 🇸🇦
      makkah: "SA",
      mecca: "SA",
      makka: "SA",
      madinah: "SA",
      medina: "SA",
      medinah: "SA",
      jeddah: "SA",
      jedda: "SA",
      riyadh: "SA",
      dammam: "SA",
      khobar: "SA",
      "al khobar": "SA",
      taif: "SA",
      tabuk: "SA",
      abha: "SA",

      // UAE 🇦🇪
      dubai: "AE",
      "abu dhabi": "AE",
      sharjah: "AE",
      ajman: "AE",

      // Qatar 🇶🇦
      doha: "QA",

      // Kuwait 🇰🇼
      kuwait: "KW",
      "kuwait city": "KW",

      // Bahrain 🇧🇭
      manama: "BH",

      // Oman 🇴🇲
      muscat: "OM",
      salalah: "OM",

      // Egypt 🇪🇬
      cairo: "EG",
      giza: "EG",
      sharm: "EG",
      "sharm el sheikh": "EG",
      hurghada: "EG",
      luxor: "EG",

      // Turkey 🇹🇷
      istanbul: "TR",
      ankara: "TR",
      antalya: "TR",
      izmir: "TR",
      bodrum: "TR",

      // Europe
      london: "GB",
      paris: "FR",
      rome: "IT",
      milan: "IT",
      venice: "IT",
      barcelona: "ES",
      madrid: "ES",
      berlin: "DE",
      munich: "DE",
      frankfurt: "DE",
      amsterdam: "NL",
      brussels: "BE",
      vienna: "AT",
      prague: "CZ",
      budapest: "HU",
      warsaw: "PL",
      dublin: "IE",
      lisbon: "PT",
      athens: "GR",

      // USA
      "new york": "US",
      nyc: "US",
      "los angeles": "US",
      la: "US",
      chicago: "US",
      miami: "US",
      "san francisco": "US",
      "las vegas": "US",
      boston: "US",
      orlando: "US",
      seattle: "US",
      washington: "US",

      // Asia
      tokyo: "JP",
      osaka: "JP",
      kyoto: "JP",
      bangkok: "TH",
      phuket: "TH",
      pattaya: "TH",
      singapore: "SG",
      "kuala lumpur": "MY",
      penang: "MY",
      jakarta: "ID",
      bali: "ID",
      "hong kong": "HK",
      seoul: "KR",
      busan: "KR",
      beijing: "CN",
      shanghai: "CN",
      guangzhou: "CN",
      shenzhen: "CN",
      mumbai: "IN",
      delhi: "IN",
      bangalore: "IN",
      goa: "IN",

      // Australia
      sydney: "AU",
      melbourne: "AU",
      brisbane: "AU",
      perth: "AU",
      "gold coast": "AU",
    };

    return countryMap[cityLower] || null; // Return null if city not found
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const countryCode = getCountryCode(searchInput);

      if (!countryCode) {
        setError(
          `Unknown city "${searchInput}". Please select from suggestions.`,
        );
        return;
      }

      console.log(
        `🔍 Searching ${searchInput} with country code: ${countryCode}`,
      );

      // Save to recent searches
      const updatedSearches = [
        searchInput,
        ...recentSearches.filter((s) => s !== searchInput),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      // Pass both city and country code to hook
      searchHotels(searchInput, countryCode);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear error when user types
    if (error) setError(null);

    // Search places for autocomplete
    if (value.length >= 2) {
      searchPlaces(value);
    }
  };

  const handleHotelClick = (hotelId) => {
    getHotelDetails(hotelId);
    setShowDetails(true);
  };

  // Popular cities with flags
  const popularCities = [
    { name: "Makkah", country: "SA", flag: "🇸🇦" },
    { name: "Madinah", country: "SA", flag: "🇸🇦" },
    { name: "Jeddah", country: "SA", flag: "🇸🇦" },
    { name: "Dubai", country: "AE", flag: "🇦🇪" },
    { name: "Istanbul", country: "TR", flag: "🇹🇷" },
    { name: "London", country: "GB", flag: "🇬🇧" },
    { name: "Paris", country: "FR", flag: "🇫🇷" },
    { name: "New York", country: "US", flag: "🇺🇸" },
    { name: "Tokyo", country: "JP", flag: "🇯🇵" },
    { name: "Singapore", country: "SG", flag: "🇸🇬" },
  ];

  return (
    <div
      className="hotel-search-container"
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Search Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "2.5rem", color: "#333", marginBottom: "0.5rem" }}
        >
          Find Your Perfect Stay
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Search hotels in Makkah, Madinah, Jeddah and thousands of destinations
          worldwide
        </p>

        <form
          onSubmit={handleSearch}
          style={{ maxWidth: "600px", margin: "0 auto", position: "relative" }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Enter city name (e.g., Makkah, Madinah, Jeddah...)"
              value={searchInput}
              onChange={handleInputChange}
              style={{
                flex: 1,
                padding: "1rem",
                border: error ? "2px solid #dc3545" : "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                outline: "none",
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {places.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 1000,
                marginTop: "4px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              {places.map((place, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSearchInput(place.displayName);
                    setPlaces([]);
                    const countryCode = getCountryCode(place.displayName);
                    if (countryCode) {
                      searchHotels(place.displayName, countryCode);
                    }
                  }}
                  style={{
                    padding: "1rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f8f9fa")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <div style={{ fontWeight: "bold" }}>{place.displayName}</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    {place.formattedAddress}
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <span style={{ color: "#666", marginRight: "0.5rem" }}>
              Recent:
            </span>
            {recentSearches.map((city, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchInput(city);
                  const countryCode = getCountryCode(city);
                  if (countryCode) {
                    searchHotels(city, countryCode);
                  }
                }}
                style={{
                  padding: "0.3rem 1rem",
                  margin: "0 0.3rem",
                  backgroundColor: "#e9ecef",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {/* Popular Cities with Flags */}
        <div style={{ marginTop: "2rem" }}>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            Popular destinations:
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {popularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  setSearchInput(city.name);
                  searchHotels(city.name, city.country);
                }}
                style={{
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#007bff";
                  e.target.style.color = "white";
                  e.target.style.borderColor = "#007bff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.color = "black";
                  e.target.style.borderColor = "#dee2e6";
                }}
              >
                <span>{city.flag}</span>
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error/Warning Message */}
      {error && (
        <div
          style={{
            backgroundColor: isMockData ? "#fff3cd" : "#f8d7da",
            color: isMockData ? "#856404" : "#721c24",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            textAlign: "center",
            border: isMockData ? "1px solid #ffeeba" : "1px solid #f5c6cb",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #007bff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p>Searching for hotels...</p>
        </div>
      )}

      {/* Hotel Results */}
      {!loading && hotels.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2 style={{ margin: 0 }}>
              Hotels in {searchInput}
              {hotels[0]?.country && (
                <span
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "1rem",
                    color: "#666",
                  }}
                >
                  ({hotels[0].country})
                </span>
              )}
            </h2>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span
                style={{
                  backgroundColor: "#e7f3ff",
                  color: "#007bff",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                }}
              >
                {hotels.length} properties found
              </span>
              <button
                onClick={clearSearch}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "transparent",
                  border: "1px solid #dc3545",
                  color: "#dc3545",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Clear Search
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => handleHotelClick(hotel.id)}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid #f0f0f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Hotel+Image";
                  }}
                />
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                    {hotel.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    📍 {hotel.address}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>{"⭐".repeat(hotel.starRating || 3)}</div>
                    {hotel.rating > 0 && (
                      <span
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {hotel.rating} ★
                      </span>
                    )}
                  </div>
                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.3rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                      }}
                    >
                      {hotel.amenities.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: "#f0f0f0",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            color: "#666",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <span
                          style={{
                            backgroundColor: "#e7f3ff",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            color: "#007bff",
                          }}
                        >
                          +{hotel.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <button
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && searchInput && hotels.length === 0 && !error && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
          <h3 style={{ color: "#333" }}>No hotels found in {searchInput}</h3>
          <p>Try searching for a different city or check the spelling</p>
          <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
            Popular cities: Makkah 🇸🇦, Madinah 🇸🇦, Jeddah 🇸🇦, Dubai 🇦🇪, Istanbul
            🇹🇷
          </p>
        </div>
      )}

      {/* Hotel Details Modal */}
      {showDetails && selectedHotel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
          onClick={() => {
            setShowDetails(false);
            setSelectedHotel(null);
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowDetails(false);
                setSelectedHotel(null);
              }}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
              }}
            >
              ×
            </button>

            <h2 style={{ marginBottom: "1rem", paddingRight: "2rem" }}>
              {selectedHotel.name}
            </h2>

            {selectedHotel.images && selectedHotel.images.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {selectedHotel.images.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selectedHotel.name} ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x120?text=Image";
                    }}
                  />
                ))}
              </div>
            )}

            <p style={{ color: "#666", marginBottom: "1rem" }}>
              📍 {selectedHotel.address}
            </p>

            <div
              style={{
                display: "flex",
                gap: "2rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                  Star Rating
                </div>
                <div>{"⭐".repeat(selectedHotel.starRating || 3)}</div>
              </div>
              {selectedHotel.rating > 0 && (
                <div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                    Guest Rating
                  </div>
                  <div
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "0.3rem 1rem",
                      borderRadius: "20px",
                      display: "inline-block",
                    }}
                  >
                    {selectedHotel.rating}/5
                  </div>
                </div>
              )}
            </div>

            {selectedHotel.description && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>About this hotel</h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  {selectedHotel.description}
                </p>
              </div>
            )}

            {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>Amenities</h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {selectedHotel.amenities.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "0.4rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Add animation style */}
      <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
    </div>
  );
};

export default Hotel;
