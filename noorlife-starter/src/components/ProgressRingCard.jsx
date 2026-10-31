import React from "react";
import { Home, Brain, BookOpen } from "lucide-react";

function CircularProgress({ percentage, color = "#10b981", size = 44, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="ring-svg-wrapper-tile" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="ring-track-circle-tile"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>
      <div className="ring-percent-text-tile">{percentage}%</div>
    </div>
  );
}

// Mosque arch icon for Namaz Learning
function MosqueIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c-1.5 1.5-3 3.5-3 6v12h6V9c0-2.5-1.5-4.5-3-6z" />
      <path d="M4 21h16" />
      <path d="M4 14h2v7H4z" />
      <path d="M18 14h2v7h-2z" />
      <path d="M12 2v1" />
    </svg>
  );
}

export function ProgressRingCard({
  taskProgress = { completed: 4, total: 6, percent: 66 },
  quizScore = 80,
  namazProgress = { completed: 2, total: 8, percent: 25 },
  quranProgress = 16,
}) {
  const items = [
    {
      title: "Home Tasks",
      sub: "4/6 completed",
      percent: 66,
      ringColor: "#0d5c3a",
      iconColor: "#0d5c3a",
      icon: Home,
      tileClass: "progress-tile-tasks",
    },
    {
      title: "GK Quiz",
      sub: "8/10 correct",
      percent: 80,
      ringColor: "#2563eb",
      iconColor: "#7c3aed",
      icon: Brain,
      tileClass: "progress-tile-quiz",
    },
    {
      title: "Namaz Learning",
      sub: "2/8 completed",
      percent: 25,
      ringColor: "#ea580c",
      iconColor: "#0d5c3a",
      icon: MosqueIcon,
      tileClass: "progress-tile-namaz",
    },
    {
      title: "Quran Reading",
      sub: "45/286 pages",
      percent: 16,
      ringColor: "#7c3aed",
      iconColor: "#7c3aed",
      icon: BookOpen,
      tileClass: "progress-tile-quran",
    },
  ];

  return (
    <div className="dashboard-card progress-widget-card">
      {/* Header Row */}
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>Your Progress</h3>
        </div>
        <button className="card-text-link">View Details</button>
      </div>

      {/* 4 Colored Tiles Horizontal Row */}
      <div className="progress-tiles-grid">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`progress-tile-item ${item.tileClass}`}>
              <CircularProgress
                percentage={item.percent}
                color={item.ringColor}
                size={44}
                strokeWidth={4}
              />
              <div className="progress-tile-info">
                <span className="progress-tile-title">{item.title}</span>
                <span className="progress-tile-sub">{item.sub}</span>
                <div className="progress-tile-icon" style={{ color: item.iconColor }}>
                  <Icon size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
