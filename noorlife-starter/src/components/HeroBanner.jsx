import React, { useState, useEffect } from "react";
import { Calendar, Quote, ArrowRight } from "lucide-react";
import { getGregorianDate, getHijriDate } from "../utils/islamicDate";

export function HeroBanner({ userName = "Nayab", theme = "light", hijriDateProp }) {
  const isDark = theme === "dark";

  // Dynamic 2026 Date vs Mockup Preview (Default Live 2026 to stay accurate with current Islamic date)
  const [dateMode, setDateMode] = useState(() => {
    return localStorage.getItem("noorlife_date_mode") || "live";
  });

  // User name state (uses userName prop with toggle)
  const [currentName, setCurrentName] = useState(() => {
    return localStorage.getItem("noorlife_hero_name") || userName || "Nayab";
  });

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const gregLive = getGregorianDate(now);
  const hijriLive = getHijriDate(now);

  const isLive = dateMode === "live";
  const displayWeekday = isLive ? gregLive.weekday : "Saturday";
  const displayGregorian = isLive ? gregLive.formatted : "31 October 2026";
  const displayHijri = hijriDateProp || hijriLive.formatted;

  const toggleDateMode = () => {
    const next = isLive ? "mockup" : "live";
    setDateMode(next);
    localStorage.setItem("noorlife_date_mode", next);
  };

  const toggleName = () => {
    const next = currentName === "NS" ? "Nayab" : "NS";
    setCurrentName(next);
    localStorage.setItem("noorlife_hero_name", next);
  };

  return (
    <section className={`hero-banner hero-banner-exact ${isDark ? "hero-banner-dark" : "hero-banner-light"}`}>
      {/* Background Mosque Panorama (Day vs Night) */}
      <img
        src={isDark ? "/images/hero_mosque_night.jpg" : "/images/hero_mosque.jpg"}
        alt={isDark ? "Grand Mosque illuminated at night with full moon" : "Grand Mosque in golden sunlight"}
        className="hero-bg-mosque-image"
      />

      {/* Decorative Islamic Moorish Arch Framing Outline */}
      <div className="hero-arch-frame-exact" />

      {/* Left Dark Emerald Panel with Sculpted Islamic Arched Wave */}
      <div className="hero-left-section-exact">
        {/* Background SVG Wave with Rich Emerald Gradient & Golden Trim */}
        <svg
          className="hero-wave-bg-svg"
          viewBox="0 0 540 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroGreenGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#072b1e" />
              <stop offset="55%" stopColor="#0d3f2c" />
              <stop offset="100%" stopColor="#051c14" />
            </linearGradient>
            <linearGradient id="heroGreenGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#041710" />
              <stop offset="55%" stopColor="#08251a" />
              <stop offset="100%" stopColor="#03120c" />
            </linearGradient>
            <linearGradient id="heroGoldTrimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5e1a4" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#f0d588" />
            </linearGradient>
            <filter id="heroGoldGlow" x="-5%" y="-5%" width="120%" height="120%">
              <feDropShadow dx="3" dy="0" stdDeviation="5" floodColor="rgba(0,0,0,0.4)" />
            </filter>
          </defs>
          {/* Sculpted Islamic Wave Path with Arch Contours */}
          <path
            d="M 0,0 
               L 440,0 
               C 490,15 520,50 495,100 
               C 475,135 450,150 470,185 
               C 490,215 460,238 410,240 
               L 0,240 Z"
            fill={isDark ? "url(#heroGreenGradDark)" : "url(#heroGreenGradLight)"}
            stroke="url(#heroGoldTrimGrad)"
            strokeWidth="2.5"
            filter="url(#heroGoldGlow)"
          />
        </svg>

        {/* Tropical Leaves peeking out at bottom-left */}
        <img
          src="/images/hero_leaves.png"
          alt="Lush green botanical leaves"
          className="hero-botanical-leaves-img"
          aria-hidden="true"
        />

        {/* Content Box */}
        <div className="hero-content-inner">
          <div
            className="hero-greeting-exact"
            onClick={toggleName}
            title="Click to toggle name (NS / Nayab)"
            style={{ cursor: "pointer" }}
          >
            Assalamu Alaikum, {currentName}! 🌸
          </div>

          <h1 className="hero-title-exact">
            Aaj ka din behtar banayein
          </h1>

          <p className="hero-subtitle-exact">
            Ghar ke kaam, ilm aur ibadat ko ek jagah manage karein.
          </p>

          <div className="hero-quote-box-exact">
            <div className="hero-quote-circle-icon">
              <Quote size={11} fill="#d4af37" color="#d4af37" />
            </div>
            <div className="hero-quote-content">
              <span className="hero-quote-phrase">“Indeed, with hardship comes ease.”</span>
              <span className="hero-quote-surah">— Surah-Ash-Sharh (94-6)</span>
            </div>
          </div>

          <button
            className="hero-cta-btn-exact"
            onClick={() => window.scrollTo({ top: 380, behavior: "smooth" })}
          >
            <span>Start Today</span>
            <ArrowRight size={14} strokeWidth={2.8} />
          </button>
        </div>
      </div>

      {/* Right Floating Date & Calligraphy Section */}
      <div className="hero-right-overlay-exact">
        {/* Date Card & Floating Hijri Line */}
        <div className="hero-date-group-exact">
          <div
            className="hero-date-card-white"
            onClick={toggleDateMode}
            title={isLive ? "Click to switch to Mockup Date" : "Click to switch to Live 2026 Date"}
          >
            <div className="hero-date-icon-box">
              <Calendar size={18} color="#b45309" strokeWidth={2.2} />
            </div>
            <div className="hero-date-text-box">
              <span className="hero-date-day-text">{displayWeekday}</span>
              <span className="hero-date-greg-text">{displayGregorian}</span>
            </div>
          </div>

          <div
            className="hero-date-hijri-floating"
            title={`Urdu/Islamic Date: ${displayHijri} • Maghrib (Sunset) ke hisaab se automatic update hoti hai 🌙`}
          >
            {displayHijri}
          </div>
        </div>

        {/* Watermark Script Typography on Bottom-Right */}
        <div className="hero-script-watermark-exact">
          <span>Deen</span>
          <span>Discipline</span>
          <span>A Better You</span>
          <strong>NoorLife</strong>
        </div>
      </div>
    </section>
  );
}
