import React, { useState, useEffect } from "react";
import {
  Clock, MapPin, Check, Sun, Sunset, Moon, Sparkles, Settings
} from "lucide-react";

export function PrayerTimesWidget({ onOpenPrayerSettings }) {
  const [currentCity, setCurrentCity] = useState("New Delhi, India");
  // Real ticking countdown seconds
  const [secondsLeft, setSecondsLeft] = useState(8130); // ~2h 15m 30s

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

  const prayers = [
    { name: "Fajr", time: "04:23 AM", icon: Moon, passed: true },
    { name: "Zuhr", time: "12:12 PM", icon: Sun, active: true, badge: "2h 15m" },
    { name: "Asr", time: "03:38 PM", icon: Sun, passed: false },
    { name: "Maghrib", time: "06:52 PM", icon: Sunset, passed: false },
    { name: "Isha", time: "08:19 PM", icon: Moon, passed: false },
  ];

  return (
    <div className="prayer-widget">
      <div className="card-header-row" style={{ marginBottom: "8px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-heading)" }}>
          Prayer Times
        </h3>
        <button
          className="prayer-location-selector"
          onClick={onOpenPrayerSettings}
          title="Change location and prayer calculation settings"
        >
          <MapPin size={12} color="var(--primary-green)" />
          <span>{currentCity}</span>
          <Settings size={11} />
        </button>
      </div>

      <div className="prayers-list-group">
        {prayers.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className={`prayer-time-row ${p.active ? "active" : ""}`}
            >
              <div className="prayer-name-col">
                <Icon size={14} color={p.active ? "#b08226" : "var(--text-muted)"} />
                <span>{p.name}</span>
              </div>
              <div className="prayer-time-val">
                <span>{p.time}</span>
                {p.passed && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#2a7c4f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}
                {p.badge && <span className="next-prayer-badge">{p.badge}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Highlight Box for Next Prayer with Live Ticking Countdown */}
      <div className="next-prayer-highlight-box">
        <div className="next-prayer-icon">
          {/* Mosque Minaret Icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c-1.5 1.5-3 3.5-3 6v12h6V9c0-2.5-1.5-4.5-3-6z" fill="currentColor" fillOpacity="0.2" />
            <path d="M4 21h16" />
            <path d="M4 14h2v7H4z" />
            <path d="M18 14h2v7h-2z" />
          </svg>
        </div>
        <div className="next-prayer-details">
          <h5>Next Prayer: Zuhr</h5>
          <div className="prayer-countdown-clock">
            {formatCountdown(secondsLeft)}
          </div>
        </div>
      </div>
    </div>
  );
}
