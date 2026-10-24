import React, { useState } from "react";
import { Flame, Medal, Check, Award } from "lucide-react";
import confetti from "canvas-confetti";

export function RewardsCard({ streakDays = 7, onViewRewards }) {
  const [claimed, setClaimed] = useState(false);
  const weekDays = [
    { day: "Mon", done: true },
    { day: "Tue", done: true },
    { day: "Wed", done: true },
    { day: "Thu", done: true },
    { day: "Fri", done: true },
    { day: "Sat", done: false },
    { day: "Sun", done: false },
  ];

  function handleClaimBonus() {
    if (claimed) return;
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c6a256", "#174232", "#ffffff"]
    });
    setClaimed(true);
  }

  return (
    <div className="dashboard-card">
      <div className="card-header-row" style={{ marginBottom: "6px" }}>
        <div className="card-title-group">
          <h3>
            <Flame size={18} color="#f77f00" />
            <span>Rewards & Streaks</span>
          </h3>
        </div>
        <Medal size={20} color="#c6a256" style={{ cursor: "pointer" }} onClick={onViewRewards} />
      </div>

      <div className="streaks-body">
        <div className="streak-highlight-row">
          <div className="streak-number-group">
            <div className="streak-flame-icon">
              <Flame size={24} color="#f77f00" />
            </div>
            <div>
              <h4>{streakDays} Day Streak</h4>
              <p>Keep going! You're on fire.</p>
            </div>
          </div>

          <button
            style={{
              padding: "5px 12px",
              borderRadius: "var(--radius-full)",
              background: claimed ? "var(--bg-subtle)" : "linear-gradient(135deg, #c6a256, #9e7f3a)",
              color: claimed ? "var(--text-muted)" : "#ffffff",
              fontSize: "11px",
              fontWeight: "700",
              boxShadow: claimed ? "none" : "0 2px 8px rgba(198, 162, 86, 0.4)",
            }}
            onClick={handleClaimBonus}
          >
            {claimed ? "Claimed +50 pts" : "Claim +50 pts"}
          </button>
        </div>

        {/* Days circle row Mon-Sun */}
        <div className="streak-days-circles">
          {weekDays.map((item, idx) => (
            <div key={idx} className="streak-day-col">
              <div className={`streak-day-circle ${item.done ? "completed" : ""}`}>
                {item.done ? <Check size={13} strokeWidth={3} /> : null}
              </div>
              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
