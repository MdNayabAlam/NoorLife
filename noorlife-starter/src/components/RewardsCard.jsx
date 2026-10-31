import React from "react";
import { Flame, Check } from "lucide-react";

// Gold sunburst medal badge icon from reference design
function SunburstBadgeIcon({ size = 38 }) {
  return (
    <div className="sunburst-medal-wrapper">
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" fill="#f59e0b" fillOpacity="0.15" />
        <path
          d="M18 3L20.8 8.8L27.2 7.5L26 13.9L32 17.5L26.5 21.6L27.5 28L21.1 26.8L18 32.5L14.9 26.8L8.5 28L9.5 21.6L4 17.5L10 13.9L8.8 7.5L15.2 8.8L18 3Z"
          fill="url(#goldGradient)"
        />
        <circle cx="18" cy="17.5" r="7" fill="#d97706" />
        <circle cx="18" cy="17.5" r="5.5" fill="#f59e0b" />
        <path d="M15 17.5L17 19.5L21.5 15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="goldGradient" x1="4" y1="3" x2="32" y2="32.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.3" stopColor="#fbbf24" />
            <stop offset="0.7" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function RewardsCard({ streakDays = 7, onViewRewards }) {
  const weekDays = [
    { day: "Mon", done: true },
    { day: "Tue", done: true },
    { day: "Wed", done: true },
    { day: "Thu", done: true },
    { day: "Fri", done: true },
    { day: "Sat", done: false }, // Sat is empty circle in reference image
    { day: "Sun", done: false }, // Sun is empty circle in reference image
  ];

  return (
    <div className="dashboard-card rewards-widget-card">
      {/* Header Row */}
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <Flame size={16} color="#f97316" />
            <span>Rewards & Streaks</span>
          </h3>
        </div>
        <button className="card-text-link" onClick={onViewRewards}>
          View All
        </button>
      </div>

      <div className="streaks-body">
        {/* Streak Info + Sunburst Gold Medal */}
        <div className="streak-highlight-row">
          <div className="streak-number-group">
            <div className="streak-flame-wrapper">
              <span className="streak-fire-emoji">🔥</span>
            </div>
            <div className="streak-vertical-divider" />
            <div className="streak-text-block">
              <h4>{streakDays} Day Streak</h4>
              <p>Keep going!</p>
            </div>
          </div>

          <SunburstBadgeIcon size={38} />
        </div>

        {/* Days circle row Mon-Sun */}
        <div className="streak-days-circles">
          {weekDays.map((item, idx) => (
            <div key={idx} className="streak-day-col">
              <div className={`streak-day-circle ${item.done ? "completed" : "empty"}`}>
                {item.done ? <Check size={11} strokeWidth={3} /> : null}
              </div>
              <span className="streak-day-name">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
