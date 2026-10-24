import React, { useState } from "react";
import { Lightbulb } from "lucide-react";

export function GKQuizCard({ onStartQuiz }) {
  const [difficulty, setDifficulty] = useState("Easy");

  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <Lightbulb size={16} color="#eab308" />
            <span>Today's GK Quiz</span>
          </h3>
          <div className="card-subtitle">10 Questions • Mixed Category</div>
        </div>
      </div>

      <div className="quiz-card-body">
        <div style={{ flex: 1 }}>
          <div className="quiz-difficulty-toggle">
            {["Easy", "Medium", "Hard"].map((lvl) => (
              <button
                key={lvl}
                className={`difficulty-pill-btn ${difficulty === lvl ? "active" : ""}`}
                onClick={() => setDifficulty(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>

          <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px", lineHeight: "1.4" }}>
            Test your Islamic history, Quran, science and general knowledge in just 3 minutes!
          </p>

          <button
            className="btn-primary-block"
            onClick={() => onStartQuiz(difficulty.toLowerCase())}
          >
            Start Quiz
          </button>
        </div>

        <img
          src="/images/quiz_brain.jpg"
          alt="Brain sitting on books with lightbulb"
          className="quiz-illustration-img"
        />
      </div>
    </div>
  );
}
