import React, { useState } from "react";
import { Lightbulb, Flame, ArrowRight } from "lucide-react";

export function GKQuizCard({ onStartQuiz }) {
  const [difficulty, setDifficulty] = useState("Easy");

  return (
    <div className="dashboard-card quiz-widget-card-exact">
      {/* Decorative Botanical Leaves in Bottom Corners */}
      <img
        src="/images/hero_leaves.png"
        alt="Botanical corner leaf"
        className="quiz-card-corner-leaf-left"
        aria-hidden="true"
      />
      <img
        src="/images/hero_leaves.png"
        alt="Botanical corner leaf"
        className="quiz-card-corner-leaf-right"
        aria-hidden="true"
      />

      {/* Header Row */}
      <div className="card-header-row quiz-header-row-exact">
        <div className="card-title-group">
          <div className="quiz-title-with-icon">
            <div className="quiz-header-icon-box-exact">
              <Lightbulb size={16} color="#d97706" strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="quiz-card-title-exact">Today's GK Quiz</h3>
              <div className="quiz-card-subtitle-exact">20 Questions • Mixed Category</div>
            </div>
          </div>
        </div>

        <div className="quiz-streak-pill-exact">
          <Flame size={12} color="#f97316" fill="#f97316" />
          <span>Streak: 7</span>
        </div>
      </div>

      <div className="quiz-card-body-exact">
        {/* Difficulty Selector: Easy (Green) | Medium (Cream) | Hard (Cream) */}
        <div className="quiz-difficulty-toggle-exact">
          {["Easy", "Medium", "Hard"].map((lvl) => (
            <button
              key={lvl}
              className={`quiz-difficulty-pill ${difficulty === lvl ? "active" : ""}`}
              onClick={() => setDifficulty(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* 3D Glowing Brain with Knowledge Tree on Stack of Books */}
        <div className="quiz-center-illustration-exact">
          <img
            src="/images/quiz_brain.jpg"
            alt="3D vibrant purple brain with glowing knowledge tree on stacked books"
            className="quiz-brain-img-exact"
          />
        </div>

        {/* Start Quiz Action Button */}
        <button
          className="quiz-start-cta-btn-exact"
          onClick={() => onStartQuiz(difficulty.toLowerCase())}
        >
          <span>Start Quiz</span>
          <ArrowRight size={15} strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}
