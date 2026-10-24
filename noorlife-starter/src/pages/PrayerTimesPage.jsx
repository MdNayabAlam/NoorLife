import React, { useState, useEffect } from "react";
import { Clock, MapPin, Compass, Sun, Moon, Sunset, Check } from "lucide-react";

export function PrayerTimesPage() {
  const [selectedCity, setSelectedCity] = useState("New Delhi, India");
  const [calculationMethod, setCalculationMethod] = useState("Karachi");
  const [secondsLeft, setSecondsLeft] = useState(8130);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h}h ${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const cities = [
    "New Delhi, India",
    "Mumbai, India",
    "Bengaluru, India",
    "Hyderabad, India",
    "Kolkata, India",
    "Dubai, UAE",
    "London, UK",
    "Makkah, Saudi Arabia"
  ];

  const fullSchedule = [
    { name: "Fajr (Dawn)", time: "04:23 AM", adhan: "04:20 AM", iqamah: "04:45 AM", icon: Moon, passed: true },
    { name: "Sunrise (Shuruq)", time: "05:46 AM", adhan: "-", iqamah: "-", icon: Sun, passed: true },
    { name: "Zuhr (Noon)", time: "12:12 PM", adhan: "12:12 PM", iqamah: "12:30 PM", icon: Sun, active: true },
    { name: "Asr (Afternoon)", time: "03:38 PM", adhan: "03:38 PM", iqamah: "04:00 PM", icon: Sun, passed: false },
    { name: "Maghrib (Sunset)", time: "06:52 PM", adhan: "06:52 PM", iqamah: "07:00 PM", icon: Sunset, passed: false },
    { name: "Isha (Night)", time: "08:19 PM", adhan: "08:19 PM", iqamah: "08:45 PM", icon: Moon, passed: false },
  ];

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Daily Prayer Times & Qibla</h2>
          <p>Verified prayer schedule for {selectedCity} with live adhan countdown.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <MapPin size={16} color="var(--primary-green)" />
          <select
            className="form-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Next Prayer Countdown Card */}
      <div
        className="dashboard-card"
        style={{
          background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
          color: "white",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", color: "var(--accent-gold-light)", fontWeight: "700" }}>
            CURRENT PRAYER WINDOW
          </span>
          <h3 style={{ fontSize: "28px", color: "#ffffff", marginTop: "4px" }}>
            Zuhr Prayer Time
          </h3>
          <p style={{ fontSize: "13px", color: "#cce0d2" }}>
            Next Salah in <strong>{formatCountdown(secondsLeft)}</strong>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#cce0d2" }}>Qibla Direction</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>268° WNW</div>
          </div>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-gold)",
            }}
          >
            <Compass size={28} />
          </div>
        </div>
      </div>

      {/* Full Timetable Table */}
      <div className="dashboard-card" style={{ padding: "20px" }}>
        <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "14px", color: "var(--text-heading)" }}>
          Today's Prayer Schedule
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {fullSchedule.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  borderRadius: "var(--radius-md)",
                  background: p.active ? "#fff8eb" : "var(--bg-subtle)",
                  border: `1px solid ${p.active ? "#f2dfba" : "var(--border-color)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Icon size={18} color={p.active ? "#b08226" : "var(--text-muted)"} />
                  <div>
                    <strong style={{ fontSize: "13.5px", color: "var(--text-heading)" }}>{p.name}</strong>
                    <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                      Adhan: {p.adhan} • Iqamah: {p.iqamah}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-heading)" }}>
                    {p.time}
                  </span>
                  {p.passed && (
                    <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f" }}>
                      Passed ✓
                    </span>
                  )}
                  {p.active && (
                    <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309" }}>
                      Active Salah
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
