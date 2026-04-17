import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useHotels from "../../Hooks/useHotel";
import { captureScrollPosition, useScrollLock } from "../../Hooks/useScrollLock";
import { toast } from "sonner";
import { createHotelBooking } from "../../Services/hotelBookingService";

const Hotel = ({ isAuthenticated = false, onRequireRegister }) => {
  const USD_TO_PKR = 280;
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const toPkrLabel = (amount, currency) => {
    const n = Number(amount) || 0;
    const c = String(currency || "").toUpperCase();
    if (!n) return "";
    if (c !== "USD") return "";
    const pkr = Math.round(n * USD_TO_PKR);
    return `PKR ${pkr.toLocaleString()}`;
  };
  const {
    hotels,
    loading,
    error,
    selectedHotel,
    searchHotels,
    getHotelDetails,
    setSelectedHotel,
    clearSearch,
    searchPlaces,
    places,
    loadCountries,
    ratesByHotelId,
    ratesLoading,
    ratesError,
    fetchHotelRates,
  } = useHotels();

  const [searchInput, setSearchInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchStay, setSearchStay] = useState(() => {
    const today = new Date();
    const in1 = new Date(today);
    in1.setDate(in1.getDate() + 1);
    const out2 = new Date(today);
    out2.setDate(out2.getDate() + 2);
    const fmt = (d) => d.toISOString().slice(0, 10);
    return {
      checkIn: fmt(in1),
      checkOut: fmt(out2),
      rooms: 1,
      adults: 2,
      childrenAges: [],
      currency: "USD",
      guestNationality: "SA",
    };
  });
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  const detailsPanelRef = useRef(null);
  const bookModalPanelRef = useRef(null);

  useEffect(() => {
    loadCountries();
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const canQuote = useMemo(() => {
    if (!searchStay.checkIn || !searchStay.checkOut) return false;
    const a = new Date(searchStay.checkIn).getTime();
    const b = new Date(searchStay.checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    return b > a;
  }, [searchStay.checkIn, searchStay.checkOut]);

  useEffect(() => {
    if (!hotels?.length) return;
    if (!canQuote) return;
    const ids = hotels.map((h) => h.id).filter(Boolean);
    if (!ids.length) return;
    fetchHotelRates({
      hotelIds: ids,
      checkIn: searchStay.checkIn,
      checkOut: searchStay.checkOut,
      adults: searchStay.adults,
      children: searchStay.childrenAges || [],
      rooms: searchStay.rooms,
      currency: searchStay.currency || "USD",
      guestNationality: searchStay.guestNationality || "SA",
    });
  }, [
    hotels,
    canQuote,
    fetchHotelRates,
    searchStay.checkIn,
    searchStay.checkOut,
    searchStay.adults,
    searchStay.rooms,
    searchStay.currency,
    searchStay.guestNationality,
  ]);

  useScrollLock(Boolean(showDetails || bookModalOpen));

  /* React wheel handlers are passive — with body scroll-locked, wheel must update scrollTop + preventDefault (same as PackagesCard). */
  useLayoutEffect(() => {
    if (!showDetails || !selectedHotel) return undefined;
    const panel = detailsPanelRef.current;
    if (!panel) return undefined;
    const onWheel = (e) => {
      if (panel.scrollHeight <= panel.clientHeight + 1) return;
      panel.scrollTop += e.deltaY;
      e.preventDefault();
    };
    panel.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () =>
      panel.removeEventListener("wheel", onWheel, { capture: true });
  }, [showDetails, selectedHotel]);

  useLayoutEffect(() => {
    if (!bookModalOpen) return undefined;
    const panel = bookModalPanelRef.current;
    if (!panel) return undefined;
    const onWheel = (e) => {
      if (panel.scrollHeight <= panel.clientHeight + 1) return;
      panel.scrollTop += e.deltaY;
      e.preventDefault();
    };
    panel.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () =>
      panel.removeEventListener("wheel", onWheel, { capture: true });
  }, [bookModalOpen]);

  const canBook = useMemo(() => {
    if (!searchStay.checkIn || !searchStay.checkOut) return false;
    const a = new Date(searchStay.checkIn).getTime();
    const b = new Date(searchStay.checkOut).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return false;
    const today = new Date(todayIso).getTime();
    return a >= today && b > a;
  }, [searchStay.checkIn, searchStay.checkOut]);

  const getCountryCode = (city) => {
    const cityLower = city.toLowerCase().trim();

    const countryMap = {
      makkah: "SA",
      mecca: "SA",
      makka: "SA",
      madinah: "SA",
      medina: "SA",
      medinah: "SA",
      jeddah: "SA",
      jedda: "SA",
    };

    return countryMap[cityLower] || null;
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

      const updatedSearches = [
        searchInput,
        ...recentSearches.filter((s) => s !== searchInput),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      searchHotels(searchInput, countryCode);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (error) setError(null);

    if (value.length >= 2) {
      searchPlaces(value);
    }
  };

  const handleHotelClick = async (hotelId) => {
    captureScrollPosition();
    setShowDetails(true);
    setDetailsLoading(true);
    try {
      await getHotelDetails(hotelId);
    } catch {
      toast.error("Could not load hotel details. Please try again.");
      setShowDetails(false);
      setSelectedHotel(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openBookModal = () => {
    if (!isAuthenticated) {
      onRequireRegister?.();
      return;
    }
    if (!selectedHotel?.id) return;
    if (!canBook) {
      toast.error("Please select valid check-in and check-out dates first.");
      return;
    }
    captureScrollPosition();
    // Close the large details dialog so only booking confirm is visible.
    setShowDetails(false);
    setBookModalOpen(true);
  };

  const submitHotelBooking = async () => {
    if (!selectedHotel?.id) return;
    if (!canBook) {
      toast.error("Please select valid check-in and check-out dates.");
      return;
    }
    setBookingSubmitting(true);
    try {
      const rate = ratesByHotelId?.[selectedHotel.id];
      await createHotelBooking({
        hotel: {
          hotelId: selectedHotel.id,
          name: selectedHotel.name,
          address: selectedHotel.address,
          city: selectedHotel.city,
          country: selectedHotel.country,
          image: selectedHotel.mainPhoto || selectedHotel.images?.[0] || "",
          starRating: selectedHotel.starRating,
          rating: selectedHotel.rating,
          currency: selectedHotel.currency || "USD",
        },
        stay: {
          checkIn: searchStay.checkIn,
          checkOut: searchStay.checkOut,
          rooms: searchStay.rooms,
          adults: searchStay.adults,
          children: Array.isArray(searchStay.childrenAges)
            ? searchStay.childrenAges.length
            : 0,
        },
        ...(rate?.amount && Number(rate.amount) > 0
          ? {
              quoteTotal: {
                amount: Number(rate.amount),
                currency: String(rate.currency || "USD"),
                label: "Search quote",
              },
            }
          : {}),
      });
      toast.success("Hotel booking request sent. Awaiting admin approval.");
      setBookModalOpen(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to create booking");
    } finally {
      setBookingSubmitting(false);
    }
  };

  const popularCities = [
    { name: "Makkah", country: "SA", flag: "🇸🇦" },
    { name: "Madinah", country: "SA", flag: "🇸🇦" },
    { name: "Jeddah", country: "SA", flag: "🇸🇦" },
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
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{ fontSize: "2.5rem", color: "#333", marginBottom: "0.5rem" }}
        >
          Find Your Perfect Stay
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Search hotels in Makkah, Madinah, and Jeddah
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              marginTop: "0.75rem",
              textAlign: "left",
            }}
          >
            <div>
              <label style={{ fontSize: "0.85rem", color: "#666" }}>
                Check-in
              </label>
              <input
                type="date"
                value={searchStay.checkIn}
                min={todayIso}
                onChange={(e) =>
                  setSearchStay((s) => ({ ...s, checkIn: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  marginTop: "0.25rem",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#666" }}>
                Check-out
              </label>
              <input
                type="date"
                value={searchStay.checkOut}
                min={searchStay.checkIn || todayIso}
                onChange={(e) =>
                  setSearchStay((s) => ({ ...s, checkOut: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  marginTop: "0.25rem",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#666" }}>
                Rooms
              </label>
              <input
                type="number"
                min={1}
                value={searchStay.rooms}
                onChange={(e) =>
                  setSearchStay((s) => ({
                    ...s,
                    rooms: Number(e.target.value) || 1,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  marginTop: "0.25rem",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#666" }}>
                Adults
              </label>
              <input
                type="number"
                min={1}
                value={searchStay.adults}
                onChange={(e) =>
                  setSearchStay((s) => ({
                    ...s,
                    adults: Number(e.target.value) || 1,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  marginTop: "0.25rem",
                }}
              />
            </div>
          </div>

          {!canQuote ? (
            <p style={{ marginTop: "0.6rem", color: "#b45309" }}>
              Check-out must be after check-in to show prices.
            </p>
          ) : searchStay.checkIn && searchStay.checkIn < todayIso ? (
            <p style={{ marginTop: "0.6rem", color: "#b45309" }}>
              Check-in date must be today or later.
            </p>
          ) : ratesError ? (
            <p style={{ marginTop: "0.6rem", color: "#b45309" }}>
              Could not load prices for these dates.
            </p>
          ) : null}

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
              (() => {
                const rate = ratesByHotelId?.[hotel.id];
                const rateAmount = Number(rate?.amount) || 0;
                const priceAvailable = rateAmount > 0;
                const isUnavailable = Boolean(
                  canQuote && !ratesLoading && !priceAvailable
                );
                return (
              <div
                key={hotel.id}
                onClick={() => {
                  if (isUnavailable) return;
                  handleHotelClick(hotel.id);
                }}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: isUnavailable ? "not-allowed" : "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid #f0f0f0",
                  opacity: isUnavailable ? 0.55 : 1,
                  filter: isUnavailable ? "grayscale(1)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (isUnavailable) return;
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 15px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  if (isUnavailable) return;
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#555", fontWeight: "bold" }}>
                      {priceAvailable
                        ? (() => {
                            const cur = rate.currency;
                            const amt = rateAmount;
                            const usdLabel = `${cur} ${amt.toLocaleString()}`;
                            const pkrLabel = toPkrLabel(amt, cur);
                            return pkrLabel ? `${usdLabel} (${pkrLabel})` : usdLabel;
                          })()
                        : ratesLoading && canQuote
                          ? "Loading price…"
                          : canQuote
                            ? "Price unavailable"
                            : "Select dates"}
                    </span>
                    <span style={{ color: "#777", fontSize: "0.85rem" }}>
                      {canQuote ? "for your stay" : ""}
                    </span>
                  </div>
                  {isUnavailable ? (
                    <div
                      style={{
                        marginBottom: "0.75rem",
                        color: "#b91c1c",
                        fontWeight: 800,
                        textDecoration: "line-through",
                      }}
                    >
                      Hotel is not available
                    </div>
                  ) : null}
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
                      backgroundColor: isUnavailable ? "#9ca3af" : "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      cursor: isUnavailable ? "not-allowed" : "pointer",
                      marginTop: "0.5rem",
                      opacity: isUnavailable ? 0.8 : 1,
                    }}
                    disabled={isUnavailable}
                  >
                    {isUnavailable ? "Not available" : "View Details"}
                  </button>
                </div>
              </div>
                );
              })()
            ))}
          </div>
        </div>
      )}

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

      {showDetails && (
        <div
          role="presentation"
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
            boxSizing: "border-box",
            overflow: "hidden",
            overscrollBehavior: "contain",
          }}
          onClick={() => {
            setShowDetails(false);
            setSelectedHotel(null);
          }}
        >
          <div
            ref={detailsPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hotel-details-title"
            tabIndex={-1}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "min(90vh, 780px)",
              overflowY: "auto",
              position: "relative",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
              isolation: "isolate",
              outline: "none",
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

            <h2
              id="hotel-details-title"
              style={{ marginBottom: "1rem", paddingRight: "2rem" }}
            >
              {detailsLoading ? "Loading hotel details…" : selectedHotel?.name || "Hotel details"}
            </h2>

            {detailsLoading || !selectedHotel ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2.5rem 1rem",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "999px",
                    border: "4px solid rgba(245,158,11,0.25)",
                    borderTopColor: "#f59e0b",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <style>{`
                  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
                <div style={{ marginLeft: 12, color: "#4b5563", fontSize: 14 }}>
                  Please wait…
                </div>
              </div>
            ) : null}

            {!detailsLoading &&
            selectedHotel?.images &&
            selectedHotel.images.length > 0 ? (
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
            ) : null}

            {!detailsLoading && selectedHotel ? (
              <>
                {(() => {
                  const rate = ratesByHotelId?.[selectedHotel.id];
                  const amt = Number(rate?.amount) || 0;
                  const priceAvailable = amt > 0;
                  const isUnavailable = Boolean(
                    canQuote && !ratesLoading && !priceAvailable
                  );
                  return isUnavailable ? (
                    <div
                      style={{
                        marginBottom: "1rem",
                        color: "#b91c1c",
                        fontWeight: 800,
                        textDecoration: "line-through",
                      }}
                    >
                      Hotel is not available
                    </div>
                  ) : null;
                })()}

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

                {selectedHotel.description ? (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>About this hotel</h3>
                    {String(selectedHotel.description).includes("<") ? (
                      <div
                        style={{ color: "#666", lineHeight: "1.6" }}
                        dangerouslySetInnerHTML={{
                          __html: String(selectedHotel.description)
                            // very small safety net: drop script/style tags
                            .replace(
                              /<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi,
                              ""
                            )
                            .replace(
                              /<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi,
                              ""
                            ),
                        }}
                      />
                    ) : (
                      <p style={{ color: "#666", lineHeight: "1.6" }}>
                        {selectedHotel.description}
                      </p>
                    )}
                  </div>
                ) : null}

                {selectedHotel.amenities && selectedHotel.amenities.length > 0 ? (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>Amenities</h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
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
                ) : null}

                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: (() => {
                      const rate = ratesByHotelId?.[selectedHotel.id];
                      const amt = Number(rate?.amount) || 0;
                      const priceAvailable = amt > 0;
                      const isUnavailable = Boolean(
                        canQuote && !ratesLoading && !priceAvailable
                      );
                      return isUnavailable ? "#9ca3af" : "#28a745";
                    })(),
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    cursor: (() => {
                      const rate = ratesByHotelId?.[selectedHotel.id];
                      const amt = Number(rate?.amount) || 0;
                      const priceAvailable = amt > 0;
                      const isUnavailable = Boolean(
                        canQuote && !ratesLoading && !priceAvailable
                      );
                      return isUnavailable ? "not-allowed" : "pointer";
                    })(),
                    marginTop: "1rem",
                    opacity: (() => {
                      const rate = ratesByHotelId?.[selectedHotel.id];
                      const amt = Number(rate?.amount) || 0;
                      const priceAvailable = amt > 0;
                      const isUnavailable = Boolean(
                        canQuote && !ratesLoading && !priceAvailable
                      );
                      return isUnavailable ? 0.8 : 1;
                    })(),
                  }}
                  disabled={(() => {
                    const rate = ratesByHotelId?.[selectedHotel.id];
                    const amt = Number(rate?.amount) || 0;
                    const priceAvailable = amt > 0;
                    const isUnavailable = Boolean(
                      canQuote && !ratesLoading && !priceAvailable
                    );
                    return isUnavailable;
                  })()}
                  onClick={() => {
                    const rate = ratesByHotelId?.[selectedHotel.id];
                    const amt = Number(rate?.amount) || 0;
                    const priceAvailable = amt > 0;
                    const isUnavailable = Boolean(
                      canQuote && !ratesLoading && !priceAvailable
                    );
                    if (isUnavailable) return;
                    openBookModal();
                  }}
                >
                  Book Now
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}

      {bookModalOpen ? (
        <div
          role="presentation"
          onClick={() => !bookingSubmitting && setBookModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1001,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            boxSizing: "border-box",
            overflow: "hidden",
            overscrollBehavior: "contain",
          }}
        >
          <div
            ref={bookModalPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hotel-book-modal-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "white",
              borderRadius: "14px",
              padding: "1.25rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              maxHeight: "min(90vh, 780px)",
              overflowY: "auto",
              isolation: "isolate",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              outline: "none",
            }}
          >
            <h3
              id="hotel-book-modal-title"
              style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}
            >
              Book this hotel?
            </h3>
            <p style={{ marginTop: "0.75rem", color: "#444", fontSize: "1rem", lineHeight: 1.5 }}>
              Are you sure you want to book{" "}
              <strong>{selectedHotel?.name}</strong>?
            </p>
            <p style={{ marginTop: "0.75rem", color: "#666", fontSize: "0.9rem", lineHeight: 1.5 }}>
              <strong>Your stay:</strong> {searchStay.checkIn || "—"} → {searchStay.checkOut || "—"}
              {" · "}
              {searchStay.rooms} room{searchStay.rooms !== 1 ? "s" : ""}, {searchStay.adults}{" "}
              adult{searchStay.adults !== 1 ? "s" : ""}
              {Array.isArray(searchStay.childrenAges) &&
              searchStay.childrenAges.length > 0
                ? `, ${searchStay.childrenAges.length} child${
                    searchStay.childrenAges.length !== 1 ? "ren" : ""
                  }`
                : ""}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <button
                type="button"
                disabled={bookingSubmitting}
                onClick={() => setBookModalOpen(false)}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  background: "white",
                  fontWeight: 700,
                  cursor: bookingSubmitting ? "not-allowed" : "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={bookingSubmitting || !canBook}
                onClick={submitHotelBooking}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  borderRadius: "10px",
                  border: "none",
                  background: bookingSubmitting || !canBook ? "#9ca3af" : "#16a34a",
                  color: "white",
                  fontWeight: 800,
                  cursor: bookingSubmitting || !canBook ? "not-allowed" : "pointer",
                }}
              >
                {bookingSubmitting ? "Booking…" : "Confirm booking"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

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
