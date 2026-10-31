import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  Clock,
  Tag,
  Trash2,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  Sparkles,
  ArrowRight
} from "lucide-react";

export function FamilyCalendarPage({
  events = [],
  onAddEvent,
  onDeleteEvent,
  showToast,
  onNavigateIslamic
}) {
  const getTodayISOString = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Form states for adding custom family event (defaults to today's date)
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getTodayISOString);
  const [time, setTime] = useState("10:00 AM");
  const [category, setCategory] = useState("Family");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parts = date.split("-");
    const localDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const formattedDate = localDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short"
    });

    if (onAddEvent) {
      onAddEvent({
        id: Date.now(),
        title: title.trim(),
        date: formattedDate,
        fullDate: date,
        time: time || "All Day",
        category,
        color:
          category === "School"
            ? "#1b4332"
            : category === "Bills"
            ? "#e76f51"
            : category === "Deen"
            ? "#c6a256"
            : "#2a9d8f",
      });
    }

    setTitle("");
    setDate(getTodayISOString());
    setTime("10:00 AM");
    setShowAddForm(false);
  };

  const filteredEvents = events.filter((ev) => {
    if (activeCategory === "all") return true;
    return (ev.category || "Family").toLowerCase() === activeCategory.toLowerCase();
  });

  const schoolCount = events.filter((e) => e.category === "School").length;
  const billsCount = events.filter((e) => e.category === "Bills").length;
  const familyCount = events.filter((e) => e.category === "Family").length;
  const deenCount = events.filter((e) => e.category === "Deen").length;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "20px" }}>👨‍👩‍👧</span>
            <h2 style={{ margin: 0 }}>Family & Household Calendar</h2>
          </div>
          <p>
            Organize personal schedules, household chores, school meetings, bill payment dates, and synced Islamic occasions.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {onNavigateIslamic && (
            <button
              className="card-action-btn-green"
              onClick={onNavigateIslamic}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <span>🌙 Islamic Calendar</span>
            </button>
          )}

          <button
            className="card-action-btn-green"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>{showAddForm ? "Cancel" : "Add Family Event"}</span>
          </button>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        <div className="dashboard-card" style={{ padding: "14px 18px", borderLeft: "4px solid var(--primary-green)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>TOTAL EVENTS</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-heading)", marginTop: "2px" }}>
            {events.length}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "14px 18px", borderLeft: "4px solid #e76f51" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>BILLS & PAYMENTS</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#e76f51", marginTop: "2px" }}>
            {billsCount}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "14px 18px", borderLeft: "4px solid #2a9d8f" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>FAMILY & SCHOOL</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#2a9d8f", marginTop: "2px" }}>
            {familyCount + schoolCount}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "14px 18px", borderLeft: "4px solid #c6a256" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>DEEN & OCCASIONS</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#c6a256", marginTop: "2px" }}>
            {deenCount}
          </div>
        </div>
      </div>

      {/* ADD EVENT FORM DRAWER */}
      {showAddForm && (
        <div
          className="dashboard-card"
          style={{
            padding: "22px",
            background: "var(--bg-card)",
            border: "1px solid var(--primary-green)",
            borderRadius: "var(--radius-md)",
            marginBottom: "20px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", color: "var(--text-heading)", fontWeight: "700", margin: 0 }}>
              Create New Family Event
            </h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Add bill reminders, family dinners, meetings or personal milestones
            </span>
          </div>

          <form onSubmit={handleSubmit} className="calendar-add-event-form">
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Parent-Teacher Meeting, Electricity Bill Due"
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
                placeholder="e.g. 10:00 AM or All Day"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Family">Family</option>
                <option value="School">School</option>
                <option value="Bills">Bills</option>
                <option value="Deen">Deen</option>
              </select>
            </div>

            <button
              type="submit"
              className="card-action-btn-green"
              style={{ padding: "10px 22px", height: "42px", fontWeight: "700" }}
            >
              Save Event
            </button>
          </form>
        </div>
      )}

      {/* CATEGORY FILTER TABS */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "all", label: `All Events (${events.length})` },
          { id: "Family", label: `Family (${familyCount})` },
          { id: "School", label: `School (${schoolCount})` },
          { id: "Bills", label: `Bills & Payments (${billsCount})` },
          { id: "Deen", label: `Deen (${deenCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            style={{
              padding: "7px 16px",
              borderRadius: "var(--radius-pill)",
              border: "none",
              background: activeCategory === tab.id ? "var(--primary-green)" : "var(--bg-card)",
              color: activeCategory === tab.id ? "#ffffff" : "var(--text-heading)",
              fontWeight: "700",
              fontSize: "12.5px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EVENTS LIST */}
      <div className="dashboard-card" style={{ padding: "22px", marginBottom: "20px" }}>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--text-muted)" }}>
            <CalendarDays size={38} color="var(--border-color)" style={{ marginBottom: "10px" }} />
            <h4 style={{ margin: "0 0 6px", color: "var(--text-heading)" }}>No Events in This Category</h4>
            <p style={{ margin: 0, fontSize: "12.5px" }}>
              Click "Add Family Event" above to add an appointment or bill reminder.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 18px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    className="event-date-chip"
                    style={{
                      minWidth: "70px",
                      textAlign: "center",
                      fontWeight: "800",
                      padding: "6px 8px",
                    }}
                  >
                    {ev.date}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: ev.color || "#1b4332",
                          display: "inline-block",
                        }}
                      />
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                        {ev.title}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 6px",
                          borderRadius: "var(--radius-pill)",
                          background: "var(--bg-card)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        {ev.category || "Family"}
                      </span>
                    </div>

                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "3px", marginLeft: "16px" }}>
                      <Clock size={11} style={{ display: "inline", marginRight: "4px" }} />
                      {ev.time}
                    </div>
                  </div>
                </div>

                {onDeleteEvent && (
                  <button
                    className="action-icon-btn"
                    style={{ width: "32px", height: "32px", color: "#dc2626" }}
                    onClick={() => onDeleteEvent(ev.id)}
                    title="Delete event"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK PROMO: ISLAMIC HIJRI CALENDAR */}
      <div
        className="dashboard-card"
        style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold-light)", fontWeight: "700", fontSize: "12.5px" }}>
            <Sparkles size={16} />
            <span>Looking for Ramadan, Eids & Sunnah Fasting Days?</span>
          </div>
          <p style={{ fontSize: "12px", color: "#cce0d2", marginTop: "4px", margin: 0 }}>
            Browse the Universal Islamic Hijri Calendar with astronomical calculations for any year and sync blessed days into your family reminders.
          </p>
        </div>

        {onNavigateIslamic && (
          <button
            onClick={onNavigateIslamic}
            style={{
              padding: "9px 18px",
              background: "var(--accent-gold)",
              color: "#174232",
              border: "none",
              borderRadius: "var(--radius-pill)",
              fontWeight: "700",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Open Islamic Calendar</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
