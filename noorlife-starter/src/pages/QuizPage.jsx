import React, { useState } from "react";
import { HelpCircle, Trophy, BookOpen, Sparkles, Brain, Award, Play } from "lucide-react";

export function QuizPage({ onStartQuiz, userScore = 80 }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const categories = [
    { title: "Islamic History & Seerah", count: "40+ Questions", color: "#e8f5ec", textColor: "#2a7c4f", icon: BookOpen },
    { title: "General Science & Nature", count: "35+ Questions", color: "#eff6ff", textColor: "#2563eb", icon: Brain },
    { title: "World Geography & India", count: "30+ Questions", color: "#fef3c7", textColor: "#b45309", icon: Sparkles },
    { title: "Quran & Hadith Sciences", count: "50+ Questions", color: "#f5f3ff", textColor: "#7c3aed", icon: Award },
  ];

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Daily GK & Islamic Quiz</h2>
          <p>Sharpen your knowledge with authentic Islamic history, science, and general awareness questions.</p>
        </div>
        <button
          className="card-action-btn-green"
          onClick={() => onStartQuiz(selectedDifficulty)}
        >
          <Play size={14} fill="currentColor" />
          <span>Play Daily Quiz</span>
        </button>
      </div>

      {/* Quiz Banner Card */}
      <div
        className="dashboard-card"
        style={{
          background: "linear-gradient(135deg, #1e4534 0%, #133326 100%)",
          color: "white",
          padding: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Trophy size={18} color="#c6a256" />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#dfcf9f" }}>
              YOUR CURRENT ACCURACY: {userScore}%
            </span>
          </div>
          <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "8px" }}>
            Ready for today's 10-Question Challenge?
          </h3>
          <p style={{ fontSize: "13px", color: "#cce0d2", marginBottom: "18px" }}>
            Answer questions across mixed categories to earn daily streaks and climb the NoorLife Seeker level!
          </p>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#dfcf9f" }}>Select Difficulty:</span>
            {["easy", "medium", "hard"].map((lvl) => (
              <button
                key={lvl}
                className="difficulty-pill-btn"
                style={{
                  background: selectedDifficulty === lvl ? "#c6a256" : "rgba(255, 255, 255, 0.15)",
                  color: selectedDifficulty === lvl ? "#133326" : "#ffffff",
                  textTransform: "capitalize",
                  padding: "6px 14px",
                }}
                onClick={() => setSelectedDifficulty(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <img
          src="/images/quiz_brain.jpg"
          alt="Brain sitting on books with lightbulb"
          style={{ width: "160px", height: "160px", objectFit: "contain", borderRadius: "var(--radius-lg)" }}
        />
      </div>

      {/* Categories Grid */}
      <h3 style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-heading)", marginTop: "10px" }}>
        Explore Question Categories
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="dashboard-card"
              style={{ padding: "20px", cursor: "pointer" }}
              onClick={() => onStartQuiz(selectedDifficulty)}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  background: cat.color,
                  color: cat.textColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <Icon size={22} />
              </div>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                {cat.title}
              </h4>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                {cat.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
