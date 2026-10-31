import React, { useState, useEffect } from "react";
import {
  Bell, Sun, Sunset, Moon, MapPin, Check, Settings, ArrowRight, ChevronDown, Search, Navigation, RefreshCw, Globe,
  Volume2, VolumeX, Play, Square
} from "lucide-react";
import { GLOBAL_CITIES, autoDetectUserLocation, timeToMinutes } from "../utils/prayerCalculator";
import { adhanService } from "../services/adhanService";

export function PrayerTimesWidget({
  currentCity = "New Delhi, India",
  prayerData,
  loading = false,
  onOpenPrayerSettings,
  onOpenAdhanModal,
  onNavigateToPrayerPage,
  onCityChange
}) {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [adhanState, setAdhanState] = useState(adhanService.state);

  useEffect(() => {
    const unsub = adhanService.subscribe((state) => {
      setAdhanState({ ...state });
    });
    return () => unsub();
  }, []);

  // Sync next prayer seconds from prayerData
  const [secondsLeft, setSecondsLeft] = useState(() => prayerData?.nextPrayer?.remainingSeconds || 7200);

  useEffect(() => {
    if (prayerData?.nextPrayer?.remainingSeconds) {
      setSecondsLeft(prayerData.nextPrayer.remainingSeconds);
    }
  }, [prayerData]);

  // Live ticking countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    if (!totalSec || totalSec <= 0) return "00h 00m 00s";
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h}h ${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  // Timings source
  const timings = prayerData?.timings || {
    Fajr: "05:06 AM",
    Sunrise: "06:28 AM",
    Zuhr: "12:08 PM",
    Asr: "03:19 PM",
    Maghrib: "05:48 PM",
    Isha: "07:10 PM",
  };

  const nextPrayerName = prayerData?.nextPrayer?.name || "Zuhr";

  // Check if a prayer has passed based on city's local time
  const isPrayerPassed = (prayerTimeStr) => {
    if (!prayerData?.localTime || !prayerTimeStr) return false;
    const nowMins = timeToMinutes(prayerData.localTime);
    const prayerMins = timeToMinutes(prayerTimeStr);
    return prayerMins <= nowMins;
  };

  const prayers = [
    {
      name: "Fajr",
      time: timings.Fajr,
      icon: Bell,
      iconColor: "#10b981",
      active: nextPrayerName === "Fajr",
      done: isPrayerPassed(timings.Fajr) && nextPrayerName !== "Fajr",
    },
    {
      name: "Zuhr",
      time: timings.Zuhr,
      icon: Sun,
      iconColor: "#f59e0b",
      active: nextPrayerName === "Zuhr",
      done: isPrayerPassed(timings.Zuhr) && nextPrayerName !== "Zuhr",
    },
    {
      name: "Asr",
      time: timings.Asr,
      icon: Sun,
      iconColor: "#f59e0b",
      active: nextPrayerName === "Asr",
      done: isPrayerPassed(timings.Asr) && nextPrayerName !== "Asr",
    },
    {
      name: "Maghrib",
      time: timings.Maghrib,
      icon: Sunset,
      iconColor: "#f97316",
      active: nextPrayerName === "Maghrib",
      done: isPrayerPassed(timings.Maghrib) && nextPrayerName !== "Maghrib",
    },
    {
      name: "Isha",
      time: timings.Isha,
      icon: Moon,
      iconColor: "#8b5cf6",
      active: nextPrayerName === "Isha",
      done: isPrayerPassed(timings.Isha) && nextPrayerName !== "Isha",
    },
  ];

  // Filtered preset cities
  const filteredCities = (GLOBAL_CITIES || []).filter((c) =>
    c.city?.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.country?.toLowerCase().includes(citySearch.toLowerCase()) ||
    (c.state && c.state.toLowerCase().includes(citySearch.toLowerCase()))
  );

  // Handle GPS Auto Detect
  const handleGPSDetect = async () => {
    setIsDetectingGPS(true);
    try {
      const loc = await autoDetectUserLocation();
      if (onCityChange) {
        onCityChange(loc.cityName, "1", { lat: loc.lat, lng: loc.lng });
      }
      setIsCityDropdownOpen(false);
      setCitySearch("");
    } catch (e) {
      alert("Unable to detect GPS location. Please allow location permissions in your browser.");
    } finally {
      setIsDetectingGPS(false);
    }
  };

  // Handle Freeform City Search Apply
  const handleSearchApply = (e) => {
    if (e) e.preventDefault();
    if (!citySearch.trim()) return;
    if (onCityChange) {
      onCityChange(citySearch.trim());
    }
    setIsCityDropdownOpen(false);
    setCitySearch("");
  };

  const displayName = prayerData?.city || currentCity || "New Delhi, India";

  return (
    <div className="prayer-widget prayer-card-exact">
      {/* Header Row */}
      <div className="card-header-row prayer-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <h3 className="prayer-widget-title" style={{ margin: 0 }}>Prayer Times</h3>
          {prayerData?.isLive && (
            <span
              style={{
                fontSize: "9px",
                padding: "1px 6px",
                borderRadius: "10px",
                background: "#dcfce7",
                color: "#166534",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px"
              }}
              title="Live global astronomical calculation synced"
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
              LIVE
            </span>
          )}
        </div>

        {/* Location selector dropdown button */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button
            className="prayer-location-selector-pill"
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            title="Click to change city, state, or detect GPS location worldwide"
            style={{ maxWidth: "160px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
          >
            <MapPin size={11} color="#0d3d2c" />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{displayName.split(",")[0]}</span>
            <ChevronDown size={10} />
          </button>

          <button
            className="action-icon-btn prayer-settings-gear-btn"
            onClick={onOpenPrayerSettings}
            title="Open worldwide location & calculation settings"
            aria-label="Location settings"
          >
            <Settings size={11} />
          </button>
        </div>
      </div>

      {/* Global Location Switcher Popover */}
      {isCityDropdownOpen && (
        <div className="prayer-city-dropdown-popover" style={{ zIndex: 120 }}>
          {/* Quick GPS Auto-Detect Button */}
          <button
            type="button"
            className="prayer-gps-detect-btn"
            onClick={handleGPSDetect}
            disabled={isDetectingGPS}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "9px 12px",
              background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "11.5px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "8px",
              boxShadow: "0 2px 6px rgba(19,57,39,0.2)"
            }}
          >
            {isDetectingGPS ? <RefreshCw size={13} className="spinner" /> : <Navigation size={13} color="var(--accent-gold)" />}
            <span>{isDetectingGPS ? "Detecting GPS Location..." : "Auto-Detect My Location (GPS)"}</span>
          </button>

          {/* Search box for ANY city/state/country */}
          <form onSubmit={handleSearchApply} className="prayer-city-search-box" style={{ marginBottom: "6px" }}>
            <Search size={12} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search ANY city, state, or country..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              autoFocus
            />
            {citySearch.trim() && (
              <button
                type="submit"
                style={{
                  background: "var(--primary-green)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "3px 8px",
                  cursor: "pointer"
                }}
              >
                Go
              </button>
            )}
          </form>

          {/* Popular / Matching Global Locations List */}
          <div className="prayer-cities-list-scroll" style={{ maxHeight: "170px" }}>
            {filteredCities.length > 0 ? (
              filteredCities.map((c) => {
                const isSelected = displayName.toLowerCase().includes(c.city.toLowerCase());
                return (
                  <button
                    key={c.id}
                    className={`prayer-city-dropdown-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      if (onCityChange) {
                        onCityChange(`${c.city}, ${c.state ? c.state + ", " : ""}${c.country}`, c.method);
                      }
                      setIsCityDropdownOpen(false);
                      setCitySearch("");
                    }}
                  >
                    <span className="city-flag-badge">{c.flag || "📍"}</span>
                    <div className="city-name-box">
                      <span className="city-name-text">
                        {c.city}
                        {c.state && <span style={{ fontSize: "10px", opacity: 0.75 }}> ({c.state})</span>}
                        {", " + c.country}
                      </span>
                      <span className="city-tz-text">{c.tzName}</span>
                    </div>
                    {isSelected && <Check size={12} color="#10b981" />}
                  </button>
                );
              })
            ) : (
              <div style={{ padding: "12px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "0 0 6px" }}>
                  Press 'Go' or Enter to search <strong>"{citySearch}"</strong> worldwide
                </p>
                <button
                  type="button"
                  onClick={handleSearchApply}
                  style={{
                    background: "var(--primary-green)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "5px 12px",
                    cursor: "pointer"
                  }}
                >
                  Locate "{citySearch}" 🌍
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5 Prayer Rows */}
      <div className="prayers-list-group">
        {prayers.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className={`prayer-time-row ${p.active ? "prayer-row-active" : ""}`}
            >
              <div className="prayer-name-col">
                <Icon
                  size={14}
                  color={p.iconColor}
                  fill={p.name === "Fajr" ? "#10b981" : p.name === "Isha" ? "#8b5cf6" : "none"}
                  className="prayer-row-icon"
                />
                <span className="prayer-row-name">{p.name}</span>
              </div>

              <div className="prayer-time-val">
                <span className="prayer-row-time">{p.time}</span>
                {p.done && (
                  <div className="prayer-done-badge" title="Passed">
                    <Check size={9} strokeWidth={3.5} />
                  </div>
                )}
                {p.active && (
                  <span className="prayer-remaining-pill">{formatCountdown(secondsLeft)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Authentic Azaan Quick-Control Strip */}
      <div className="prayer-adhan-control-strip">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Bell size={12} color="var(--primary-green)" />
          <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-heading)" }}>
            Azaan: {adhanState.isAutoEnabled ? "Auto 🔔" : "Off 🔕"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (adhanState.isPlaying) {
                adhanService.stopAdhan();
              } else {
                adhanService.playAdhan(nextPrayerName);
              }
            }}
            className={`adhan-pill-badge ${adhanState.isPlaying ? "adhan-pill-active" : "adhan-pill-inactive"}`}
            title={adhanState.isPlaying ? "Stop Azaan" : "Play/Test Azaan Audio"}
          >
            {adhanState.isPlaying ? <Square size={11} fill="#15803d" /> : <Volume2 size={11} />}
            <span>{adhanState.isPlaying ? "Stop Azaan" : "Test Azaan"}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenAdhanModal) onOpenAdhanModal();
            }}
            className="adhan-pill-badge adhan-pill-inactive"
            title="Open Azaan Player & Recitation Words"
          >
            <span>Words</span>
          </button>
        </div>
      </div>

      {/* Bottom Highlight Card: Next Prayer with Arch & Live Local Clock */}
      <div
        className="next-prayer-banner-card next-prayer-banner-exact"
        onClick={onNavigateToPrayerPage}
        title="Click to view full worldwide timetable, Qibla compass & Adhan"
        style={{ cursor: "pointer" }}
      >
        <div className="next-prayer-corner-ribbon">
          {prayerData?.timezone?.split("/")[1]?.replace(/_/g, " ") || "Global"}
        </div>

        <div className="next-prayer-left">
          <div className="next-prayer-mosque-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d3d2c" strokeWidth="2">
              <path d="M12 2c-1.5 1.5-3 3.5-3 6v13h6V8c0-2.5-1.5-4.5-3-6z" fill="#0d3d2c" />
              <path d="M4 21h16" stroke="#0d3d2c" strokeWidth="2" />
              <path d="M4 13h2v8H4z" fill="#0d3d2c" />
              <path d="M18 13h2v8h-2z" fill="#0d3d2c" />
              <circle cx="12" cy="1.5" r="0.8" fill="#c69b38" />
            </svg>
          </div>
          <div className="next-prayer-meta">
            <span className="next-prayer-sub">
              {prayerData?.localTime ? `Clock: ${prayerData.localTime}` : "Next Prayer"}
            </span>
            <strong className="next-prayer-name">{nextPrayerName}</strong>
          </div>
        </div>

        <div className="next-prayer-right">
          <span className="next-prayer-timer">{formatCountdown(secondsLeft)}</span>
          <ArrowRight size={13} strokeWidth={3} className="next-prayer-arrow" />
        </div>
      </div>
    </div>
  );
}
