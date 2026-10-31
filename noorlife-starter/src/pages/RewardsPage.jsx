import React, { useState, useEffect } from "react";
import { Flame, Medal, Award, CheckCircle2, Star, Sparkles, ShieldCheck, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { fetchRewardsAPI, claimRewardMilestoneAPI } from "../services/api";

export function RewardsPage({ showToast }) {
  const [streakDays, setStreakDays] = useState(7);
  const [points, setPoints] = useState(350);
  const [badges, setBadges] = useState([]);
  const [isMilestoneClaimed, setIsMilestoneClaimed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRewardsAPI()
      .then((data) => {
        if (data) {
          if (data.currentStreak !== undefined) setStreakDays(data.currentStreak);
          if (data.points !== undefined) setPoints(data.points);
          if (data.badges) setBadges(data.badges);
          if (data.claimedMilestones && data.claimedMilestones.includes("7_day_milestone")) {
            setIsMilestoneClaimed(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  const defaultBadges = [
    { title: "7-Day Consistency Master", desc: "Maintained active daily streak for 7 consecutive days", earned: true, icon: Flame, color: "#f77f00", bg: "#fff4ea" },
    { title: "Namaz Seeker", desc: "Completed 5 daily prayers on time", earned: true, icon: Award, color: "#2a7c4f", bg: "#e8f5ec" },
    { title: "Quran Explorer", desc: "Read 40+ pages of Surah Al-Baqarah", earned: true, icon: Star, color: "#c6a256", bg: "#fcf8eb" },
    { title: "Home Task Champion", desc: "Checked off all planned household chores before Maghrib", earned: true, icon: CheckCircle2, color: "#2563eb", bg: "#eff6ff" },
    { title: "Quiz Prodigy", desc: "Scored 100% on a Hard difficulty GK quiz", earned: false, icon: Medal, color: "#7c3aed", bg: "#f5f3ff" },
    { title: "Khatam Finisher", desc: "Complete the entire Holy Quran reading", earned: false, icon: Sparkles, color: "#059669", bg: "#ecfdf5" },
  ];

  async function handleClaimMilestone() {
    if (isMilestoneClaimed) {
      if (showToast) showToast("Milestone bonus already claimed! Next reward unlocks at 14 days.");
      return;
    }

    setLoading(true);
    try {
      const res = await claimRewardMilestoneAPI("7_day_milestone");
      setIsMilestoneClaimed(true);
      if (res.data?.points) setPoints(res.data.points);
      else setPoints((prev) => prev + 50);

      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#c6a256", "#2a7c4f", "#f77f00"],
      });
      if (showToast) showToast(res.message || "Claimed +50 NoorLife bonus points! 🎉");
    } catch (err) {
      if (showToast) showToast(err.message || "Bonus already claimed or duplicate prevented.");
      setIsMilestoneClaimed(true);
    } finally {
      setLoading(false);
    }
  }

  // Next level milestone: Level 5 at 500 points
  const nextTarget = 500;
  const levelProgress = Math.min(Math.round((points / nextTarget) * 100), 100);

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Rewards, Badges & Streaks</h2>
          <p>Earn points for every consistent deed — household tasks, learning, and worship.</p>
        </div>
        <button
          className="card-action-btn-green"
          onClick={handleClaimMilestone}
          disabled={isMilestoneClaimed || loading}
          style={{
            opacity: isMilestoneClaimed ? 0.6 : 1,
            cursor: isMilestoneClaimed ? "default" : "pointer",
          }}
        >
          <Sparkles size={14} />
          <span>{isMilestoneClaimed ? "Milestone Claimed ✓" : "Claim Milestone Bonus (+50 pts)"}</span>
        </button>
      </div>

      {/* Points & Streak Hero Card */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
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
              MashAllah! You have completed daily deeds 7 days in a row.
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

      {/* Next Milestone Progress Card */}
      <div className="dashboard-card" style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Trophy size={16} color="#c6a256" />
            <span>Next Level Milestone: Level 5 "Master of Barakah"</span>
          </h4>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-green)" }}>
            {points} / {nextTarget} pts ({levelProgress}%)
          </span>
        </div>
        <div style={{ height: "8px", background: "var(--border-color)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${levelProgress}%`, background: "var(--accent-gold)", transition: "width 0.4s ease" }} />
        </div>
        <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "8px" }}>
          Earn {nextTarget - points} more points by ticking chores, completing the daily quiz, or logging Quran reading.
        </p>
      </div>

      {/* Badges Grid */}
      <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-heading)", marginTop: "6px" }}>
        Your Achievements & Badges
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {defaultBadges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="dashboard-card"
              style={{
                padding: "20px",
                opacity: badge.earned ? 1 : 0.65,
                background: badge.earned ? "var(--bg-card)" : "var(--bg-subtle)",
              }}
            >
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: badge.bg,
                    color: badge.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                      {badge.title}
                    </h4>
                    {badge.earned && <CheckCircle2 size={14} color="#2a7c4f" />}
                  </div>
                  <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.4" }}>
                    {badge.desc}
                  </p>
                  <span
                    className="search-badge"
                    style={{
                      background: badge.earned ? "#e8f5ec" : "#f3f4f6",
                      color: badge.earned ? "#2a7c4f" : "#9ca3af",
                      marginTop: "10px",
                    }}
                  >
                    {badge.earned ? "Unlocked ✓" : "Locked"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
