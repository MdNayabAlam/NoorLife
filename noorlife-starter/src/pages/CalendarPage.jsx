import React, { useState } from "react";
import { CalendarDays, Plus, Clock, Tag, Trash2 } from "lucide-react";

export function CalendarPage({ events, onAddEvent, onDeleteEvent }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2025-05-20");
  const [time, setTime] = useState("11:00 AM");
  const [category, setCategory] = useState("Family");

  const islamicHolidays = [
    { title: "First of Ramadan 1446", date: "01 March 2025", desc: "Start of holy month of fasting" },
    { title: "Eid-ul-Fitr 1446", date: "30 March 2025", desc: "Islamic celebration of feast" },
    { title: "Day of Arafah 1446", date: "05 June 2025", desc: "Day of Hajj prayer and repentance" },
    { title: "Eid-ul-Adha 1446", date: "06 June 2025", desc: "Festival of Sacrifice" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const formattedDate = new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" });
    onAddEvent({
      id: Date.now(),
      title: title.trim(),
      date: formattedDate,
      fullDate: date,
      time,
      category,
      color: category === "School" ? "#1b4332" : category === "Bills" ? "#e76f51" : "#2a9d8f"
    });
    setTitle("");
    setShowAddForm(false);
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Family Calendar & Events</h2>
          <p>Keep track of family milestones, school dates, bill due dates, and Islamic observances.</p>
        </div>
        <button className="card-action-btn-green" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={15} strokeWidth={2.5} />
          <span>{showAddForm ? "Close Form" : "Add Family Event"}</span>
        </button>
      </div>

      {/* Add Event Inline Drawer */}
      {showAddForm && (
        <div className="dashboard-card" style={{ padding: "20px", background: "var(--bg-subtle)" }}>
          <h3 style={{ fontSize: "15px", marginBottom: "14px", color: "var(--text-heading)" }}>Create New Event</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "12px", alignItems: "flex-end" }}>
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Doctor's appointment, School exam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="text"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Family">Family</option>
                <option value="School">School</option>
                <option value="Bills">Bills</option>
                <option value="Deen">Deen</option>
              </select>
            </div>
            <button type="submit" className="card-action-btn-green" style={{ padding: "10px 20px", height: "42px" }}>
              Save
            </button>
          </form>
        </div>
      )}

      {/* Upcoming Events Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "14px" }}>
            Scheduled Events ({events.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {events.map((ev) => (
              <div
                key={ev.id}
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
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="event-date-chip" style={{ minWidth: "64px", textAlign: "center" }}>
                    {ev.date}
                  </div>
                  <div>
                    <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-heading)" }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                      <Clock size={11} style={{ display: "inline", marginRight: "4px" }} />
                      {ev.time} • <Tag size={10} style={{ display: "inline", marginRight: "2px" }} /> {ev.category}
                    </div>
                  </div>
                </div>

                {onDeleteEvent && (
                  <button
                    className="action-icon-btn"
                    style={{ width: "30px", height: "30px", color: "#dc2626" }}
                    onClick={() => onDeleteEvent(ev.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Observances */}
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "14px" }}>
            Major Islamic Dates
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {islamicHolidays.map((h, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "#fcfbf7",
                  border: "1px solid #f2ede0",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--primary-green)" }}>
                  {h.title}
                </div>
                <div style={{ fontSize: "11.5px", color: "#8c7648", fontWeight: "600", marginTop: "2px" }}>
                  {h.date}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
