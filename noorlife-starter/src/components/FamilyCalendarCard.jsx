import React, { useState } from "react";
import { CalendarDays, Moon } from "lucide-react";

export function FamilyCalendarCard({ events, onViewAllCalendar, onViewAllIslamicCalendar }) {
  const [activeTab, setActiveTab] = useState("family"); // "family" | "islamic"

  const familyEvents = [
    { id: 1, date: "15 May", title: "Parent-Teacher Meeting", time: "10:00 AM - 11:00 AM", color: "#e63946" },
    { id: 2, date: "16 May", title: "Electricity Bill Due", time: "All Day", color: "#e63946" },
    { id: 3, date: "18 May", title: "Sister's Birthday", time: "All Day", color: "#e63946" },
  ];

  const islamicEvents = [
    { id: 1, date: "27 Raj", title: "Isra & Mi'raj (Ascension)", time: "Sacred Night of Tahajjud", color: "#2a9d8f" },
    { id: 2, date: "15 Sha", title: "Shab-e-Barat (Forgiveness)", time: "Night of Divine Pardon", color: "#40916c" },
    { id: 3, date: "1 Ram", title: "Ramadan Fasting Starts", time: "Holy Month of Blessings", color: "#1b4332" },
  ];

  const currentDisplay = activeTab === "family"
    ? (events && events.length > 0 ? events.slice(0, 4) : familyEvents)
    : islamicEvents;

  return (
    <div className="dashboard-card calendar-widget-card">
      {/* Header Row with Toggle Switcher */}
      <div className="card-header-row" style={{ alignItems: "center" }}>
        <div className="card-title-group">
          <div
            style={{
              display: "inline-flex",
              background: "rgba(0,0,0,0.05)",
              borderRadius: "var(--radius-pill)",
              padding: "2px",
              border: "1px solid var(--border-color)",
              gap: "2px",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("family")}
              style={{
                background: activeTab === "family" ? "var(--primary-green)" : "transparent",
                color: activeTab === "family" ? "#ffffff" : "var(--text-heading)",
                border: "none",
                borderRadius: "var(--radius-pill)",
                padding: "3px 9px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.15s ease",
              }}
            >
              <CalendarDays size={11} />
              <span>Family</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("islamic")}
              style={{
                background: activeTab === "islamic" ? "var(--primary-green)" : "transparent",
                color: activeTab === "islamic" ? "#ffffff" : "var(--text-heading)",
                border: "none",
                borderRadius: "var(--radius-pill)",
                padding: "3px 9px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: "11px" }}>🌙</span>
              <span>Islamic</span>
            </button>
          </div>
        </div>

        <button
          className="card-text-link"
          onClick={activeTab === "family" ? onViewAllCalendar : (onViewAllIslamicCalendar || onViewAllCalendar)}
        >
          See All
        </button>
      </div>

      {/* Events List */}
      <div className="calendar-events-mini">
        {currentDisplay.map((event) => (
          <div key={event.id} className="calendar-event-row">
            <div
              className="event-date-chip"
              style={{
                background: activeTab === "islamic" ? "rgba(27, 67, 50, 0.1)" : undefined,
                color: activeTab === "islamic" ? "var(--primary-green)" : undefined,
                fontWeight: "800",
              }}
            >
              {event.date}
            </div>
            <div className="event-desc-box">
              <div className="event-title-line">
                <span
                  className="event-red-dot"
                  style={{ background: event.color || (activeTab === "islamic" ? "#2a9d8f" : "#e63946") }}
                />
                <span className="event-title-text">{event.title}</span>
              </div>
              <div className="event-time-line">{event.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

