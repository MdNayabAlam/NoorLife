import React, { useState } from "react";
import { User, Bell, MapPin, Moon, Shield, Save, Check } from "lucide-react";

export function SettingsPage({ user, onUpdateUser, theme, setTheme, showToast }) {
  const [userName, setUserName] = useState(user?.name || "Md Nayab Alam");
  const [email, setEmail] = useState(user?.email || "alamnayab718@gmail.com");
  const [city, setCity] = useState("New Delhi, India");
  const [method, setMethod] = useState("Karachi (Hanafi)");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    if (onUpdateUser) {
      const parts = userName.trim().split(" ");
      const displayName = parts.length > 2 ? parts[1] : parts[0] || "Nayab";
      onUpdateUser({
        name: userName.trim(),
        displayName: displayName,
        email: email.trim(),
        avatarLetter: "N"
      });
    }
    if (showToast) showToast("Settings updated successfully! ✅");
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Settings & Preferences</h2>
          <p>Manage your account profile, prayer calculation methods, theme, and notification settings.</p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Profile Card */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={18} color="var(--primary-green)" />
            <span>Profile Information</span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Prayer & Location Calculation Card */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={18} color="var(--primary-green)" />
            <span>Location & Prayer Calculation Method</span>
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Default City / Coordinates</label>
              <input
                type="text"
                className="form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Calculation Authority / Juristic Method</label>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="Karachi (Hanafi)">University of Islamic Sciences, Karachi (Hanafi)</option>
                <option value="ISNA (North America)">Islamic Society of North America (ISNA)</option>
                <option value="Muslim World League">Muslim World League (MWL - Shafi'i)</option>
                <option value="Umm Al-Qura">Umm Al-Qura University, Makkah</option>
                <option value="Egyptian Authority">Egyptian General Authority of Survey</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance & Notifications */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Moon size={18} color="var(--primary-green)" />
            <span>Appearance & Notifications</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: "13px", color: "var(--text-heading)" }}>Theme Mode</strong>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Toggle between light warm palette and eye-soothing dark mode.</p>
              </div>
              <button
                type="button"
                className="card-action-btn-green"
                style={{ background: theme === "dark" ? "#c6a256" : "var(--primary-green)" }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </div>

            <div style={{ height: "1px", background: "var(--border-color)" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: "13px", color: "var(--text-heading)" }}>Prayer & Task Notifications</strong>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Receive audio adhan call and calendar task alerts.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary-green)", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            type="submit"
            className="card-action-btn-green"
            style={{ padding: "12px 28px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}
          >
            {saved ? <Check size={16} /> : <Save size={16} />}
            <span>{saved ? "Saved!" : "Save All Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
