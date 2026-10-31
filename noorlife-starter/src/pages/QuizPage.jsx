import React, { useState, useEffect } from "react";
import { HelpCircle, Trophy, BookOpen, Sparkles, Brain, Award, Play, History, CheckCircle, Clock } from "lucide-react";
import { fetchQuizAttemptsAPI } from "../services/api";

export function QuizPage({ onStartQuiz, userScore = 80 }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);

  useEffect(() => {
    fetchQuizAttemptsAPI()
      .then((data) => {
        if (data) setAttempts(data);
      })
      .catch(() => {})
      .finally(() => setLoadingAttempts(false));
  }, [userScore]);

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
            Ready for today's Knowledge Challenge?
          </h3>
          <p style={{ fontSize: "13px", color: "#cce0d2", marginBottom: "18px" }}>
            Answer questions across mixed categories to earn daily streaks and climb the NoorLife Seeker level!
          </p>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="dashboard-card"
              style={{ padding: "20px", cursor: "pointer", transition: "transform 0.2s ease" }}
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

      {/* Quiz Attempts & History Section */}
      <div className="dashboard-card" style={{ marginTop: "10px" }}>
        <div className="card-header-row">
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <History size={16} color="var(--primary-green)" />
            <span>Recent Quiz Attempts & History</span>
          </h3>
          <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
            Persisted through NoorLife Database
          </span>
        </div>

        {attempts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 10px", color: "var(--text-muted)", fontSize: "12.5px" }}>
            No past attempts recorded yet. Play today's daily quiz to start your history!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {attempts.slice(0, 5).map((att, i) => (
              <div
                key={att.id || att._id || i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-heading)" }}>
                    {att.category || "Mixed Daily Challenge"}
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px", fontSize: "11px", color: "var(--text-muted)" }}>
                    <span style={{ textTransform: "capitalize" }}>Level: {att.difficulty || "easy"}</span>
                    <span>•</span>
                    <span>{att.completedAt ? new Date(att.completedAt).toLocaleDateString() : "Today"}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    className="search-badge"
                    style={{
                      background: (att.percentage || 0) >= 80 ? "#e8f5ec" : "#fef3c7",
                      color: (att.percentage || 0) >= 80 ? "#2a7c4f" : "#b45309",
                      fontSize: "12px",
                      padding: "4px 10px",
                    }}
                  >
                    Score: {att.score}/{att.totalQuestions} ({att.percentage || Math.round((att.score / att.totalQuestions) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
