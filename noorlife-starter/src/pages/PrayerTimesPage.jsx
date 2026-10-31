import React, { useState, useEffect } from "react";
import {
  Clock, MapPin, Compass, Sun, Moon, Sunset, Check, Search, Volume2, Sparkles, RefreshCw, Globe, Navigation,
  VolumeX, Play, Square, Bell, ShieldCheck
} from "lucide-react";
import { autoDetectUserLocation } from "../utils/prayerCalculator";
import { adhanService, ADHAN_VOICES } from "../services/adhanService";

export function PrayerTimesPage({
  currentCity = "New Delhi, India",
  onCityChange,
  prayerData,
  loading = false,
  onOpenAdhanModal
}) {
  const [searchInput, setSearchInput] = useState("");
  const [method, setMethod] = useState("1");
  const [secondsLeft, setSecondsLeft] = useState(prayerData?.nextPrayer?.remainingSeconds || 7200);
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [adhanState, setAdhanState] = useState(adhanService.state);
  const [notifPermission, setNotifPermission] = useState(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );

  useEffect(() => {
    const unsub = adhanService.subscribe((state) => {
      setAdhanState({ ...state });
    });
    return () => unsub();
  }, []);

  const handleRequestNotif = async () => {
    const granted = await adhanService.requestNotificationPermission();
    setNotifPermission(granted ? "granted" : "denied");
  };

  const popularCities = [
    { name: "Makkah, Saudi Arabia", flag: "🇸🇦", cat: "sacred" },
    { name: "Madinah, Saudi Arabia", flag: "🇸🇦", cat: "sacred" },
    { name: "Jerusalem, Palestine", flag: "🇵🇸", cat: "sacred" },
    { name: "Patna, Bihar, India", flag: "🇮🇳", cat: "india" },
    { name: "New Delhi, India", flag: "🇮🇳", cat: "india" },
    { name: "Lucknow, Uttar Pradesh, India", flag: "🇮🇳", cat: "india" },
    { name: "Mumbai, Maharashtra, India", flag: "🇮🇳", cat: "india" },
    { name: "Hyderabad, Telangana, India", flag: "🇮🇳", cat: "india" },
    { name: "Srinagar, Kashmir, India", flag: "🇮🇳", cat: "india" },
    { name: "Dubai, UAE", flag: "🇦🇪", cat: "gulf" },
    { name: "Riyadh, Saudi Arabia", flag: "🇸🇦", cat: "gulf" },
    { name: "Cairo, Egypt", flag: "🇪🇬", cat: "gulf" },
    { name: "Istanbul, Turkey", flag: "🇹🇷", cat: "gulf" },
    { name: "London, UK", flag: "🇬🇧", cat: "world" },
    { name: "New York, USA", flag: "🇺🇸", cat: "world" },
    { name: "Houston, Texas, USA", flag: "🇺🇸", cat: "world" },
    { name: "Toronto, Canada", flag: "🇨🇦", cat: "world" },
    { name: "Tokyo, Japan", flag: "🇯🇵", cat: "world" },
    { name: "Sydney, Australia", flag: "🇦🇺", cat: "world" },
  ];

  const filteredPresetCities = activeCategory === "all"
    ? popularCities
    : popularCities.filter(c => c.cat === activeCategory);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    if (onCityChange) onCityChange(searchInput.trim(), method);
    setSearchInput("");
  };

  const handlePresetSelect = (city) => {
    if (onCityChange) onCityChange(city, method);
  };

  const handleMethodChange = (e) => {
    const newMethod = e.target.value;
    setMethod(newMethod);
    if (onCityChange) onCityChange(currentCity, newMethod);
  };

  const handleGPSDetect = async () => {
    setIsDetectingGPS(true);
    try {
      const loc = await autoDetectUserLocation();
      if (onCityChange) {
        onCityChange(loc.cityName, method, { lat: loc.lat, lng: loc.lng });
      }
    } catch (e) {
      alert("Unable to detect GPS position. Please check browser location permissions.");
    } finally {
      setIsDetectingGPS(false);
    }
  };

  const timings = prayerData?.timings || {
    Fajr: "05:04 AM",
    Sunrise: "06:21 AM",
    Zuhr: "12:05 PM",
    Asr: "03:23 PM",
    Maghrib: "05:48 PM",
    Isha: "07:18 PM",
    Midnight: "12:05 AM"
  };

  const nextPrayerName = prayerData?.nextPrayer?.name || "Zuhr";

  const fullSchedule = [
    { name: "Fajr (Dawn)", time: timings.Fajr, adhan: timings.Fajr, iqamah: "15 min after", icon: Moon, isKeySalah: true },
    { name: "Sunrise (Shuruq)", time: timings.Sunrise, adhan: "-", iqamah: "-", icon: Sun, isKeySalah: false },
    { name: "Zuhr (Noon)", time: timings.Zuhr, adhan: timings.Zuhr, iqamah: "20 min after", icon: Sun, isKeySalah: true },
    { name: "Asr (Afternoon)", time: timings.Asr, adhan: timings.Asr, iqamah: "20 min after", icon: Sun, isKeySalah: true },
    { name: "Maghrib (Sunset)", time: timings.Maghrib, adhan: timings.Maghrib, iqamah: "10 min after", icon: Sunset, isKeySalah: true },
    { name: "Isha (Night)", time: timings.Isha, adhan: timings.Isha, iqamah: "20 min after", icon: Moon, isKeySalah: true },
    { name: "Midnight (Tahajjud time)", time: timings.Midnight || "12:00 AM", adhan: "-", iqamah: "-", icon: Moon, isKeySalah: false },
  ];

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <h2>Worldwide Prayer Times, Adhan & Qibla</h2>
          <p>Verified astronomical prayer timetable for ANY state, country, or city in the world with live local time.</p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="secondary-btn"
            onClick={handleGPSDetect}
            disabled={isDetectingGPS || loading}
            style={{
              gap: "8px",
              padding: "9px 16px",
              fontWeight: "700",
              border: "1.5px solid var(--primary-green)",
              color: "var(--primary-green)"
            }}
          >
            {isDetectingGPS ? <RefreshCw size={15} className="spinner" /> : <Navigation size={15} />}
            <span>{isDetectingGPS ? "Detecting GPS..." : "Auto-Detect My GPS"}</span>
          </button>

          <button
            className="card-action-btn-green"
            onClick={onOpenAdhanModal}
            style={{ gap: "8px", background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)" }}
          >
            <Volume2 size={16} color="var(--accent-gold)" />
            <span>Listen to Adhan</span>
          </button>
        </div>
      </div>

      {/* Global City Search Form & Popular City Chips */}
      <div className="dashboard-card" style={{ padding: "18px 22px", background: "var(--bg-subtle)" }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "40px" }}
              placeholder="Search ANY state, city or country worldwide (e.g. Bihar, Texas, Tokyo, Dubai, London...)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: "auto", minWidth: "220px" }}
            value={method}
            onChange={handleMethodChange}
          >
            <option value="1">Karachi (Hanafi)</option>
            <option value="4">Umm Al-Qura (Makkah)</option>
            <option value="3">Muslim World League (MWL - Shafi'i)</option>
            <option value="2">ISNA (North America)</option>
            <option value="5">Egyptian General Authority</option>
            <option value="8">Gulf Region (UAE / Dubai)</option>
            <option value="13">Diyanet (Turkey)</option>
          </select>

          <button type="submit" className="card-action-btn-green" style={{ padding: "10px 22px" }} disabled={loading}>
            {loading ? <RefreshCw size={15} className="spinner" /> : <Globe size={15} />}
            <span>{loading ? "Locating..." : "Search Location"}</span>
          </button>
        </form>

        {/* Category Pills & Preset Chips */}
        <div style={{ marginTop: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--text-muted)", marginRight: "4px" }}>Regions:</span>
            {[
              { id: "all", label: "All Quick Presets" },
              { id: "sacred", label: "Sacred Sites 🕋" },
              { id: "india", label: "Indian States 🇮🇳" },
              { id: "gulf", label: "Middle East 🇸🇦" },
              { id: "world", label: "Global / West 🌍" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontSize: "11px",
                  padding: "3px 9px",
                  borderRadius: "var(--radius-pill)",
                  border: activeCategory === cat.id ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                  background: activeCategory === cat.id ? "var(--accent-cream)" : "var(--bg-card)",
                  color: activeCategory === cat.id ? "var(--primary-green)" : "var(--text-muted)",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                  cursor: "pointer"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            {filteredPresetCities.map((item) => {
              const isSelected = currentCity.toLowerCase().includes(item.name.split(",")[0].toLowerCase());
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handlePresetSelect(item.name)}
                  style={{
                    fontSize: "11px",
                    padding: "4px 11px",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${isSelected ? "var(--primary-green)" : "var(--border-color)"}`,
                    background: isSelected ? "var(--accent-cream)" : "var(--bg-card)",
                    color: isSelected ? "var(--primary-green)" : "var(--text-heading)",
                    fontWeight: isSelected ? "700" : "500",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{item.flag}</span>
                  <span>{item.name.split(",")[0]}</span>
                  {isSelected && <Check size={11} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Next Prayer Countdown Card */}
      <div
        className="dashboard-card"
        style={{
          background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
          color: "white",
          padding: "26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11.5px", color: "var(--accent-gold-light)", fontWeight: "700", letterSpacing: "0.5px" }}>
              CURRENT LOCATION & LOCAL TIME
            </span>
            <span style={{ background: "rgba(255,255,255,0.15)", padding: "2px 10px", borderRadius: "var(--radius-pill)", fontSize: "11px", color: "#ffffff", fontWeight: "700" }}>
              📍 {prayerData?.city || currentCity}
            </span>
            {prayerData?.timezone && (
              <span style={{ background: "rgba(198,162,86,0.3)", border: "1px solid var(--accent-gold)", padding: "2px 8px", borderRadius: "var(--radius-pill)", fontSize: "10.5px", color: "#ffffff" }}>
                🌐 {prayerData.timezone}
              </span>
            )}
          </div>

          <h3 style={{ fontSize: "30px", color: "#ffffff", fontWeight: "800", marginTop: "4px" }}>
            {nextPrayerName} Salah in {formatCountdown(secondsLeft)}
          </h3>

          <div style={{ display: "flex", gap: "16px", marginTop: "8px", flexWrap: "wrap", fontSize: "13px", color: "#cce0d2" }}>
            <div>
              Live City Clock: <strong style={{ color: "white", fontSize: "14px" }}>{prayerData?.localTime || "Live Time Synced"}</strong>
            </div>
            <div>•</div>
            <div>
              Hijri Date: <strong style={{ color: "var(--accent-gold-light)" }}>{prayerData?.hijriDate || "15 Jumādá al-ūlá 1448 AH"}</strong>
            </div>
            {prayerData?.coordinates && (
              <>
                <div>•</div>
                <div style={{ fontSize: "11.5px" }}>
                  Coords: {prayerData.coordinates.lat.toFixed(2)}°, {prayerData.coordinates.lng.toFixed(2)}°
                </div>
              </>
            )}
          </div>
        </div>

        {/* Qibla Direction Compass Widget */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.1)", padding: "14px 20px", borderRadius: "var(--radius-md)" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#cce0d2" }}>Qibla Direction</div>
            <div style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff" }}>
              {prayerData?.qiblaDirection || "268° WNW"}
            </div>
            <div style={{ fontSize: "10px", color: "var(--accent-gold-light)" }}>Direct to Kaaba, Makkah</div>
          </div>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(198, 162, 86, 0.25)",
              border: "2px solid var(--accent-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-gold)",
            }}
          >
            <Compass size={30} />
          </div>
        </div>
      </div>

      {/* Authentic Azaan Audio & Automatic Prayer Alert Center */}
      <div className="dashboard-card" style={{ padding: "22px", background: "var(--bg-card)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Bell size={18} color="var(--primary-green)" />
              <span>Azaan Audio & Live Call to Prayer Settings</span>
            </h4>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Authentic high-definition recordings from Masjid al-Haram Makkah, Madinah, and Sheikh Mishary Rashid Alafasy.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {/* Auto-Azaan Toggle Button */}
            <button
              type="button"
              onClick={() => adhanService.setAutoEnabled(!adhanState.isAutoEnabled)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "var(--radius-pill)",
                border: `1.5px solid ${adhanState.isAutoEnabled ? "#16a34a" : "var(--border-color)"}`,
                background: adhanState.isAutoEnabled ? "#dcfce7" : "var(--bg-subtle)",
                color: adhanState.isAutoEnabled ? "#166534" : "var(--text-muted)",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              title="Toggle automatic Azaan call when prayer time arrives"
            >
              <Bell size={14} />
              <span>Auto-Azaan: {adhanState.isAutoEnabled ? "ACTIVE (Runs at Prayer Time) 🔔" : "MUTED / OFF 🔕"}</span>
            </button>

            {/* Browser Notifications Permission Pill */}
            {notifPermission !== "granted" && (
              <button
                type="button"
                onClick={handleRequestNotif}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-pill)",
                  background: "#fef3c7",
                  border: "1px solid #f59e0b",
                  color: "#92400e",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: "pointer"
                }}
                title="Enable desktop notifications so you never miss an Azaan even in background tabs"
              >
                <span>Allow Desktop Alerts 🔔</span>
              </button>
            )}
          </div>
        </div>

        {/* Voice Selector Grid & Live Audio Tester */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "14px" }}>
          {ADHAN_VOICES.map((voice) => {
            const isSelected = adhanState.currentVoice === voice.id;
            const isThisVoicePlaying = adhanState.isPlaying && adhanState.currentVoice === voice.id;
            return (
              <div
                key={voice.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${isSelected ? "var(--primary-green)" : "var(--border-color)"}`,
                  background: isSelected ? "var(--accent-cream)" : "var(--bg-subtle)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 12px rgba(19, 57, 39, 0.08)" : "none"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: isSelected ? "var(--primary-green)" : "var(--text-muted)" }}>
                      {voice.badge}
                    </span>
                    {isSelected && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "10px", fontWeight: "700", color: "var(--primary-green)", background: "#dcfce7", padding: "1px 6px", borderRadius: "10px" }}>
                        <Check size={10} strokeWidth={3} /> ACTIVE VOICE
                      </span>
                    )}
                  </div>
                  <h5 style={{ margin: "6px 0 2px 0", fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                    {voice.name}
                  </h5>
                  <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.3" }}>
                    {voice.muezzin}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                  <button
                    type="button"
                    onClick={() => adhanService.setVoice(voice.id)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      background: isSelected ? "var(--primary-green)" : "var(--bg-card)",
                      color: isSelected ? "white" : "var(--text-heading)",
                      fontWeight: "700",
                      fontSize: "11.5px",
                      cursor: "pointer",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                    }}
                  >
                    {isSelected ? "Selected" : "Use Voice"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (isThisVoicePlaying) {
                        adhanService.stopAdhan();
                      } else {
                        adhanService.playAdhan(nextPrayerName, voice.id);
                      }
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--border-color)",
                      background: isThisVoicePlaying ? "#ef4444" : "var(--bg-card)",
                      color: isThisVoicePlaying ? "white" : "var(--text-heading)",
                      fontWeight: "700",
                      fontSize: "11.5px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    title={isThisVoicePlaying ? "Stop Audio" : "Listen & Test Voice"}
                  >
                    {isThisVoicePlaying ? <Square size={11} fill="white" /> : <Play size={11} />}
                    <span>{isThisVoicePlaying ? "Stop" : "Test"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume & Details Bar */}
        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px dashed var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-heading)" }}>Azaan Volume:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={adhanState.volume}
              onChange={(e) => adhanService.setVolume(parseFloat(e.target.value))}
              style={{ width: "130px", accentColor: "var(--primary-green)", cursor: "pointer" }}
            />
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", minWidth: "35px" }}>
              {Math.round(adhanState.volume * 100)}%
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={onOpenAdhanModal}
              className="card-action-btn-green"
              style={{ padding: "7px 16px", fontSize: "12px", gap: "6px" }}
            >
              <Volume2 size={14} />
              <span>Full Azaan Recitation Screen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Timetable Table */}
      <div className="dashboard-card" style={{ padding: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-heading)" }}>
              Today's Complete Prayer Schedule
            </h4>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Calculation Authority: {prayerData?.method || "Universal Astronomical Solar Method"} ({prayerData?.provider || "AlAdhan Global Live API"})
            </p>
          </div>

          <button
            onClick={onOpenAdhanModal}
            className="card-action-btn-green"
            style={{ padding: "8px 16px", fontSize: "12px", borderRadius: "var(--radius-pill)" }}
          >
            <Volume2 size={14} />
            <span>Play Adhan</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {fullSchedule.map((p) => {
            const Icon = p.icon;
            const isNext = p.name.startsWith(nextPrayerName);
            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 18px",
                  borderRadius: "var(--radius-md)",
                  background: isNext ? "var(--accent-cream)" : "var(--bg-subtle)",
                  border: `1px solid ${isNext ? "var(--accent-gold)" : "var(--border-color)"}`,
                  boxShadow: isNext ? "0 2px 8px rgba(198,162,86,0.15)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isNext ? "var(--accent-gold)" : "var(--bg-card)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isNext ? "#174232" : "var(--text-muted)",
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <strong style={{ fontSize: "14px", color: "var(--text-heading)" }}>{p.name}</strong>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px" }}>
                      Adhan: {p.adhan} • Iqamah: {p.iqamah}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "800", color: isNext ? "var(--primary-green)" : "var(--text-heading)" }}>
                    {p.time}
                  </span>
                  {isNext && (
                    <span className="search-badge" style={{ background: "var(--accent-gold)", color: "#174232", fontWeight: "700" }}>
                      Upcoming Salah ⚡
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
