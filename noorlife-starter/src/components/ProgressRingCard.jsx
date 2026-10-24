import React from "react";

function CircularProgress({ percentage, color = "#2a7c4f", size = 76, strokeWidth = 7 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="ring-svg-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          stroke="var(--border-color)"
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
      <div className="ring-percent-text">{percentage}%</div>
    </div>
  );
}

export function ProgressRingCard({ taskProgress, quizScore = 80, namazProgress, quranProgress = 16 }) {
  const rings = [
    {
      title: "Home Tasks",
      sub: `${taskProgress.completed}/${taskProgress.total} completed`,
      percent: taskProgress.percent,
      color: "#2a7c4f",
    },
    {
      title: "GK Quiz",
      sub: "8/10 correct",
      percent: quizScore,
      color: "#2563eb",
    },
    {
      title: "Namaz Learning",
      sub: `${namazProgress.completed}/${namazProgress.total} completed`,
      percent: namazProgress.percent,
      color: "#d97706",
    },
    {
      title: "Quran Reading",
      sub: "45/286 pages",
      percent: quranProgress,
      color: "#059669",
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="card-header-row" style={{ marginBottom: "6px" }}>
        <div className="card-title-group">
          <h3>Your Progress</h3>
        </div>
      </div>

      <div className="progress-rings-row">
        {rings.map((ring, idx) => (
          <div key={idx} className="progress-ring-card">
            <CircularProgress
              percentage={ring.percent}
              color={ring.color}
              size={76}
              strokeWidth={7}
            />
            <div className="ring-label-title">{ring.title}</div>
            <div className="ring-label-sub">{ring.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
