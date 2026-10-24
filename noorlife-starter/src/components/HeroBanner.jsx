import React from "react";
import { Calendar, Quote } from "lucide-react";

export function HeroBanner({ userName = "Ayesha" }) {
  // Format current/display date matching reference
  const dayName = "Thursday";
  const gregorianDate = "15 May 2025";
  const hijriDate = "17 Dhul-Qadah 1446";

  return (
    <section className="hero-banner">
      <div className="hero-left-section">
        <div className="hero-greeting">
          Assalamu Alaikum, {userName}! 🌸
        </div>
        <h1 className="hero-title">
          Aaj ka din behtar banayein
        </h1>
        <p className="hero-subtitle">
          Ghar ke kaam, ilm aur ibadat ko ek jagah manage karein.
        </p>

        <div className="hero-quote-card">
          <Quote size={13} className="hero-quote-icon" />
          <span>“Indeed, with hardship comes ease.” — Surah Ash-Sharh (94:6)</span>
        </div>
      </div>

      <div className="hero-right-section">
        <img
          src="/images/hero_mosque.jpg"
          alt="Grand Mosque with minarets and palm trees"
          className="hero-bg-mosque-image"
        />

        <div className="hero-date-badge">
          <div className="hero-date-day">
            <Calendar size={13} />
            <span>{dayName}</span>
          </div>
          <div className="hero-date-gregorian">{gregorianDate}</div>
          <div className="hero-date-hijri">{hijriDate}</div>
        </div>
      </div>
    </section>
  );
}
