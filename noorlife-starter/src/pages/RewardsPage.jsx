import React from "react";
import { Flame, Medal, Award, CheckCircle2, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function RewardsPage({ streakDays = 7, points = 350, showToast }) {
  const badges = [
    { title: "7-Day Consistency Master", desc: "Maintained active daily streak for 7 consecutive days", earned: true, icon: Flame, color: "#f77f00", bg: "#fff4ea" },
    { title: "Namaz Seeker", desc: "Completed 5 daily prayers on time", earned: true, icon: Award, color: "#2a7c4f", bg: "#e8f5ec" },
    { title: "Quran Explorer", desc: "Read 40+ pages of Surah Al-Baqarah", earned: true, icon: Star, color: "#c6a256", bg: "#fcf8eb" },
    { title: "Home Task Champion", desc: "Checked off all planned household chores before Maghrib", earned: true, icon: CheckCircle2, color: "#2563eb", bg: "#eff6ff" },
    { title: "Quiz Prodigy", desc: "Scored 100% on a Hard difficulty GK quiz", earned: false, icon: Medal, color: "#7c3aed", bg: "#f5f3ff" },
    { title: "Khatam Finisher", desc: "Complete the entire Holy Quran reading", earned: false, icon: Sparkles, color: "#059669", bg: "#ecfdf5" },
  ];

  function handleClaimMilestone() {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#c6a256", "#2a7c4f", "#f77f00"]
    });
    if (showToast) showToast("Claimed 100 NoorLife bonus points! 🎉");
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Rewards, Badges & Streaks</h2>
          <p>Earn points for every consistent deed — household tasks, learning, and worship.</p>
        </div>
        <button className="card-action-btn-green" onClick={handleClaimMilestone}>
          <Sparkles size={14} />
          <span>Claim Milestone Bonus</span>
        </button>
      </div>

      {/* Points & Streak Hero Card */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div
          className="dashboard-card"
          style={{
            background: "linear-gradient(135deg, #184232 0%, #0e2a20 100%)",
            color: "white",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "var(--accent-gold-light)", fontWeight: "700" }}>
              CURRENT ACTIVE STREAK
            </div>
            <div style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff", margin: "6px 0" }}>
              {streakDays} Days 🔥
            </div>
            <p style={{ fontSize: "12px", color: "#cce0d2" }}>
              You have completed daily actions 7 days in a row!
            </p>
          </div>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff4ea", display: "flex", alignItems: "center", justifyContent: "center", color: "#f77f00" }}>
            <Flame size={36} />
          </div>
        </div>

        <div
          className="dashboard-card"
          style={{
            background: "linear-gradient(135deg, #876d33 0%, #57441d 100%)",
            color: "white",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "#fef3c7", fontWeight: "700" }}>
              NOORLIFE POINTS
            </div>
            <div style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff", margin: "6px 0" }}>
              {points} Points ⭐
            </div>
            <p style={{ fontSize: "12px", color: "#fae8b4" }}>
              Level 4: Dedicated Seeker of Knowledge
            </p>
          </div>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#b45309" }}>
            <Medal size={36} />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-heading)", marginTop: "10px" }}>
        Your Achievements & Badges
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="dashboard-card"
              style={{
                padding: "20px",
                opacity: b.earned ? 1 : 0.65,
                border: b.earned ? "1px solid var(--border-color)" : "1px dashed var(--border-color)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: b.bg,
                  color: b.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <Icon size={24} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                  {b.title}
                </h4>
                {b.earned && (
                  <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f" }}>
                    Unlocked ✓
                  </span>
                )}
              </div>
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px" }}>
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
