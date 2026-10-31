import React, { useState } from "react";
import { X, MapPin, Search, Globe, Compass, Check, ArrowRight, Navigation, RefreshCw, Sparkles } from "lucide-react";
import { autoDetectUserLocation } from "../../utils/prayerCalculator";

export function LocationModal({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
  onNavigateToPrayerPage,
  loading = false,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("1");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);

  if (!isOpen) return null;

  const categorizedCities = {
    sacred: [
      { name: "Makkah, Saudi Arabia", flag: "🇸🇦", sub: "Kaaba / Holy Sanctuary" },
      { name: "Madinah, Saudi Arabia", flag: "🇸🇦", sub: "Prophet's Mosque" },
      { name: "Jerusalem, Palestine", flag: "🇵🇸", sub: "Al-Aqsa Sanctuary" },
    ],
    india: [
      { name: "Patna, Bihar, India", flag: "🇮🇳", sub: "Bihar" },
      { name: "New Delhi, India", flag: "🇮🇳", sub: "National Capital" },
      { name: "Lucknow, Uttar Pradesh, India", flag: "🇮🇳", sub: "Uttar Pradesh" },
      { name: "Mumbai, Maharashtra, India", flag: "🇮🇳", sub: "Maharashtra" },
      { name: "Hyderabad, Telangana, India", flag: "🇮🇳", sub: "Telangana" },
      { name: "Kolkata, West Bengal, India", flag: "🇮🇳", sub: "West Bengal" },
      { name: "Srinagar, Kashmir, India", flag: "🇮🇳", sub: "Jammu & Kashmir" },
      { name: "Bengaluru, Karnataka, India", flag: "🇮🇳", sub: "Karnataka" },
      { name: "Ahmedabad, Gujarat, India", flag: "🇮🇳", sub: "Gujarat" },
    ],
    middleEast: [
      { name: "Dubai, UAE", flag: "🇦🇪", sub: "United Arab Emirates" },
      { name: "Riyadh, Saudi Arabia", flag: "🇸🇦", sub: "Saudi Capital" },
      { name: "Jeddah, Saudi Arabia", flag: "🇸🇦", sub: "Red Sea Port" },
      { name: "Doha, Qatar", flag: "🇶🇦", sub: "Qatar" },
      { name: "Cairo, Egypt", flag: "🇪🇬", sub: "Egypt" },
      { name: "Istanbul, Turkey", flag: "🇹🇷", sub: "Turkey" },
    ],
    world: [
      { name: "London, UK", flag: "🇬🇧", sub: "United Kingdom" },
      { name: "New York, USA", flag: "🇺🇸", sub: "United States" },
      { name: "Houston, Texas, USA", flag: "🇺🇸", sub: "Texas" },
      { name: "Toronto, Canada", flag: "🇨🇦", sub: "Canada" },
      { name: "Paris, France", flag: "🇫🇷", sub: "France" },
      { name: "Tokyo, Japan", flag: "🇯🇵", sub: "Japan" },
      { name: "Sydney, Australia", flag: "🇦🇺", sub: "Australia" },
      { name: "Dhaka, Bangladesh", flag: "🇧🇩", sub: "Bangladesh" },
      { name: "Karachi, Pakistan", flag: "🇵🇰", sub: "Pakistan" },
    ],
  };

  const allCitiesList = [
    ...categorizedCities.sacred,
    ...categorizedCities.india,
    ...categorizedCities.middleEast,
    ...categorizedCities.world,
  ];

  const displayedList =
    activeCategory === "all"
      ? allCitiesList
      : categorizedCities[activeCategory] || allCitiesList;

  const handleApply = (cityName, coords = null) => {
    const target = cityName || searchInput.trim();
    if (!target) return;
    onSelectCity(target, selectedMethod, coords);
    setSearchInput("");
    onClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    handleApply(searchInput.trim());
  };

  const handleGPSDetect = async () => {
    setIsDetectingGPS(true);
    try {
      const loc = await autoDetectUserLocation();
      handleApply(loc.cityName, { lat: loc.lat, lng: loc.lng });
    } catch (e) {
      alert("Unable to detect GPS position. Please ensure location services are enabled.");
    } finally {
      setIsDetectingGPS(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "560px", padding: "26px", borderRadius: "18px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "var(--accent-cream)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary-green)",
              }}
            >
              <Globe size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", margin: 0 }}>
                Worldwide Location & Global Time
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                Select ANY city, state, or country worldwide with verified astronomical prayer calculation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="action-icon-btn"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Current Active Location Pill */}
        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={15} color="var(--primary-green)" />
            <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Current Active:</span>
            <strong style={{ fontSize: "13px", color: "var(--primary-green)" }}>
              {currentCity}
            </strong>
          </div>
          <span
            style={{
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "var(--radius-pill)",
              background: "#d8f3dc",
              color: "#1b4332",
              fontWeight: "700",
            }}
          >
            LIVE SYNCED
          </span>
        </div>

        {/* 1-Click GPS Auto-Detect Button */}
        <button
          type="button"
          onClick={handleGPSDetect}
          disabled={isDetectingGPS || loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "11px 16px",
            background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            marginBottom: "14px",
            boxShadow: "0 3px 10px rgba(19,57,39,0.25)",
            transition: "all 0.2s ease"
          }}
        >
          {isDetectingGPS ? <RefreshCw size={15} className="spinner" /> : <Navigation size={15} color="var(--accent-gold)" />}
          <span>{isDetectingGPS ? "Detecting Your Current GPS Location..." : "Auto-Detect My Current Location (GPS / Live)"}</span>
        </button>

        {/* Search Input Form */}
        <form onSubmit={handleFormSubmit} style={{ marginBottom: "14px" }}>
          <div style={{ position: "relative", display: "flex", gap: "8px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                placeholder="Search ANY city, state or country (e.g. Bihar, Texas, Tokyo, Dubai...)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="card-action-btn-green"
              style={{ padding: "0 20px", flexShrink: 0 }}
              disabled={!searchInput.trim() || loading}
            >
              {loading ? "Locating..." : "Apply"}
            </button>
          </div>
        </form>

        {/* Category Tabs for Quick Select */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Popular" },
            { id: "sacred", label: "Sacred Sites 🕋" },
            { id: "india", label: "Indian States 🇮🇳" },
            { id: "middleEast", label: "Middle East 🇸🇦" },
            { id: "world", label: "Global / West 🌍" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                border: activeCategory === cat.id ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                background: activeCategory === cat.id ? "var(--accent-cream)" : "var(--bg-card)",
                color: activeCategory === cat.id ? "var(--primary-green)" : "var(--text-heading)",
                fontWeight: activeCategory === cat.id ? "700" : "500",
                cursor: "pointer",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cities Grid */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "6px",
              maxHeight: "140px",
              overflowY: "auto",
              paddingRight: "4px"
            }}
          >
            {displayedList.map((item) => {
              const cityNameOnly = item.name.split(",")[0];
              const isSelected = currentCity.toLowerCase().includes(cityNameOnly.toLowerCase());
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleApply(item.name)}
                  style={{
                    fontSize: "11.5px",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    border: isSelected ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                    background: isSelected ? "var(--accent-cream)" : "var(--bg-card)",
                    color: isSelected ? "var(--primary-green)" : "var(--text-heading)",
                    fontWeight: isSelected ? "700" : "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                    <span>{item.flag}</span>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cityNameOnly}
                    </span>
                  </div>
                  {isSelected && <Check size={11} strokeWidth={3} color="var(--primary-green)" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculation Method Selection */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
            CALCULATION METHOD / FIQH
          </label>
          <select
            className="form-select"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="1">University of Islamic Sciences, Karachi (Hanafi)</option>
            <option value="4">Umm Al-Qura University, Makkah</option>
            <option value="3">Muslim World League (MWL - Shafi'i, Maliki, Hanbali)</option>
            <option value="2">Islamic Society of North America (ISNA)</option>
            <option value="5">Egyptian General Authority of Survey</option>
            <option value="8">Gulf Region (Dubai & UAE)</option>
            <option value="13">Diyanet İşleri Başkanlığı (Turkey)</option>
          </select>
        </div>

        {/* Footer with Link to full prayer page */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onNavigateToPrayerPage) onNavigateToPrayerPage();
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary-green)",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: 0,
            }}
          >
            <Compass size={14} />
            <span>Open Full Worldwide Timetable & Qibla</span>
            <ArrowRight size={13} />
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={onClose}
            style={{ padding: "6px 14px", fontSize: "12px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
