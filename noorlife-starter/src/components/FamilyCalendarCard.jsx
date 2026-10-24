import React from "react";
import { CalendarDays } from "lucide-react";

export function FamilyCalendarCard({ events, onViewAllCalendar }) {
  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <CalendarDays size={16} color="var(--primary-green)" />
            <span>Family Calendar</span>
          </h3>
        </div>
        <button className="card-text-link" onClick={onViewAllCalendar}>
          See All
        </button>
      </div>

      <div className="calendar-events-mini">
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="calendar-event-row">
            <div className="event-date-chip">{event.date}</div>
            <div className="event-desc-box">
              <div className="event-title-line">
                <span
                  className="event-color-dot"
                  style={{ background: event.color || "var(--primary-green)" }}
                />
                <span>{event.title}</span>
              </div>
              <div className="event-time-line">{event.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
