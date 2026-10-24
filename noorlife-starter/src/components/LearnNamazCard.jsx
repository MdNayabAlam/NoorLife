import React from "react";
import { BookOpen, Check, Circle } from "lucide-react";

export function LearnNamazCard({ steps, toggleStep, onContinueLearning }) {
  const completed = steps.filter((s) => s.done).length;
  const total = steps.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <BookOpen size={16} color="var(--primary-green)" />
            <span>Learn Namaz</span>
          </h3>
          <div className="card-subtitle">Step-by-step with images</div>
        </div>
        <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary-green)" }}>
          {completed}/{total} completed
        </span>
      </div>

      {/* Progress track */}
      <div style={{ height: "5px", background: "#edf2ec", borderRadius: "999px", overflow: "hidden", marginBottom: "12px" }}>
        <div
          style={{
            height: "100%",
            width: `${percent}%`,
            background: "#2a7c4f",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div className="namaz-card-body">
        <div className="namaz-steps-mini">
          {steps.slice(0, 5).map((step) => (
            <div
              key={step.id}
              className="namaz-step-row"
              onClick={() => toggleStep(step.id)}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: step.done ? "none" : "1.5px solid #a3b5a7",
                  background: step.done ? "#2a7c4f" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "10px",
                  flexShrink: 0
                }}
              >
                {step.done ? <Check size={11} strokeWidth={3} /> : null}
              </div>
              <span
                style={{
                  textDecoration: step.done ? "none" : "none",
                  color: step.done ? "var(--text-heading)" : "var(--text-muted)",
                }}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <img
          src="/images/namaz_worshipper.jpg"
          alt="Muslim worshipper in prayer standing on prayer rug"
          className="namaz-illust-img"
        />
      </div>

      <button
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-color)",
          background: "var(--bg-subtle)",
          fontSize: "11.5px",
          fontWeight: "700",
          color: "var(--primary-green)",
          marginTop: "auto"
        }}
        onClick={onContinueLearning}
      >
        Continue Learning
      </button>
    </div>
  );
}
