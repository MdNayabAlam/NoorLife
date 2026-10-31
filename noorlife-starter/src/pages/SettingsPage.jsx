import React, { useState, useEffect } from "react";
import { User, Bell, MapPin, Moon, Shield, Save, Check, Lock, LogOut, Trash2, AlertTriangle, Eye, EyeOff, Volume2, Play, Square } from "lucide-react";
import { updateProfileAPI, changePasswordAPI, deleteAccountAPI } from "../services/api";
import { adhanService, ADHAN_VOICES } from "../services/adhanService";

export function SettingsPage({ user, onUpdateUser, theme, setTheme, onLogout, showToast }) {
  const [userName, setUserName] = useState(user?.name || "Md Nayab Alam");
  const [email, setEmail] = useState(user?.email || "alamnayab718@gmail.com");
  const [city, setCity] = useState("New Delhi, India");
  const [method, setMethod] = useState("Karachi (Hanafi)");
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => adhanService.state.isAutoEnabled);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const [adhanState, setAdhanState] = useState(adhanService.state);
  const [hijriOffset, setHijriOffset] = useState(() => {
    return localStorage.getItem("noorlife_hijri_offset") || "-1";
  });

  const handleHijriOffsetChange = (newVal) => {
    setHijriOffset(newVal);
    localStorage.setItem("noorlife_hijri_offset", newVal);
    if (showToast) showToast("Urdu/Hijri date alignment updated! 🌙");
  };

  useEffect(() => {
    const unsub = adhanService.subscribe((state) => {
      setAdhanState({ ...state });
      setNotificationsEnabled(state.isAutoEnabled);
    });
    return () => unsub();
  }, []);

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete account modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaved(true);

    const parts = userName.trim().split(" ");
    const displayName = parts.length > 2 ? parts[1] : parts[0] || "Nayab";
    const updated = {
      name: userName.trim(),
      displayName,
      email: email.trim(),
      avatarLetter: userName.trim().charAt(0).toUpperCase() || "N",
    };

    if (onUpdateUser) onUpdateUser(updated);

    try {
      await updateProfileAPI({
        name: userName.trim(),
        email: email.trim(),
        location: { city, calculationMethod: method },
        preferences: { theme, notifications: notificationsEnabled },
      });
      if (showToast) showToast("Settings updated successfully! ✅");
    } catch (err) {
      if (showToast) showToast("Settings saved locally! 🌿");
    }

    setTimeout(() => setSaved(false), 2500);
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPasswordMsg("");

    if (newPassword !== confirmPassword) {
      setPasswordMsg("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg("New password must be at least 6 characters.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await changePasswordAPI({ currentPassword, newPassword });
      if (showToast) showToast(res.message || "Password changed successfully! 🔐");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMsg(err.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type DELETE in capital letters to confirm.");
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteAccountAPI("DELETE");
      if (showToast) showToast("Account deleted successfully.");
      setShowDeleteModal(false);
      if (onLogout) onLogout();
    } catch (err) {
      alert("Error deleting account: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Settings & Preferences</h2>
          <p>Manage your account profile, prayer calculation methods, theme, and notification settings.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Profile Card */}
        <form onSubmit={handleSaveProfile} className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={18} color="var(--primary-green)" />
            <span>Profile Information</span>
          </h3>

          <div className="form-row-2col">
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

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <button
              type="submit"
              className="card-action-btn-green"
              style={{ padding: "10px 24px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              <span>{saved ? "Profile Saved!" : "Save Profile Details"}</span>
            </button>
          </div>
        </form>

        {/* Change Password Card */}
        <form onSubmit={handleChangePassword} className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Lock size={18} color="var(--primary-green)" />
            <span>Security & Password Change</span>
          </h3>

          {passwordMsg && (
            <div style={{ color: "#dc2626", fontSize: "12px", marginBottom: "12px" }}>
              {passwordMsg}
            </div>
          )}

          <div className="form-row-3col">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="At least 6 chars"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
            <button
              type="submit"
              disabled={passwordLoading}
              className="card-action-btn-green"
              style={{ padding: "10px 22px", fontSize: "13px" }}
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>

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

            <div className="form-group" style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
              <label className="form-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span>Urdu / Regional Hilal Moon Sighting Alignment</span>
                <span style={{ fontSize: "11px", color: "var(--primary-green)", fontWeight: "600" }}>
                  🌅 Day changes automatically at Maghrib
                </span>
              </label>
              <select
                className="form-select"
                value={hijriOffset}
                onChange={(e) => handleHijriOffsetChange(e.target.value)}
              >
                <option value="-1">South Asia / India Hilal Moon Sighting (-1 Day vs Umm Al-Qura) (Active)</option>
                <option value="0">Saudi Umm Al-Qura (Global Astronomical Calculation)</option>
                <option value="1">+1 Day Offset</option>
                <option value="-2">-2 Days Offset</option>
              </select>
              <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "6px", lineHeight: "1.5" }}>
                🌙 <strong>Islamic Day Transition:</strong> Shariah ke mutabiq naya Islamic din shaam Maghrib (sunset) se shuru hota hai. Aaj din ke waqt <strong>19 Jumada al-Awwal</strong> rahegi aur Maghrib hote hi khud-ba-khud <strong>20</strong> ho jayegi.
              </p>
            </div>
          </div>
        </div>

        {/* Appearance, Privacy & Notifications */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "16px", color: "var(--text-heading)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Moon size={18} color="var(--primary-green)" />
            <span>Appearance & Privacy Controls</span>
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
                <strong style={{ fontSize: "13px", color: "var(--text-heading)" }}>Azaan & Prayer Time Audio Alerts</strong>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Automatically trigger authentic Azaan recitation audio when prayer times arrive.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => {
                  const val = e.target.checked;
                  setNotificationsEnabled(val);
                  adhanService.setAutoEnabled(val);
                  if (showToast) showToast(val ? "Azaan Auto-Play Enabled 🔔" : "Azaan Auto-Play Muted 🔕");
                }}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary-green)", cursor: "pointer" }}
              />
            </div>

            {/* Azaan Voice Selection & Instant Test in Settings */}
            <div style={{ padding: "12px 14px", background: "var(--bg-subtle)", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-heading)" }}>Muezzin Recitation Voice</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Choose preferred Azaan sound for prayers</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <select
                  className="form-select"
                  style={{ width: "auto", minWidth: "180px", padding: "5px 10px", fontSize: "12px" }}
                  value={adhanState.currentVoice}
                  onChange={(e) => adhanService.setVoice(e.target.value)}
                >
                  {ADHAN_VOICES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.badge})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    if (adhanState.isPlaying) {
                      adhanService.stopAdhan();
                    } else {
                      adhanService.playAdhan("Zuhr");
                    }
                  }}
                  className="card-action-btn-green"
                  style={{
                    padding: "6px 12px",
                    fontSize: "11.5px",
                    background: adhanState.isPlaying ? "#ef4444" : "var(--primary-green)",
                    gap: "4px"
                  }}
                  title={adhanState.isPlaying ? "Stop Audio" : "Test Azaan Audio"}
                >
                  {adhanState.isPlaying ? <Square size={12} fill="white" /> : <Play size={12} fill="white" />}
                  <span>{adhanState.isPlaying ? "Stop" : "Test"}</span>
                </button>
              </div>
            </div>

            <div style={{ height: "1px", background: "var(--border-color)" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: "13px", color: "var(--text-heading)" }}>Privacy & Cloud Backup</strong>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Securely synchronize reading logs and task checklists to your private account.</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary-green)", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone: Logout and Delete Account */}
        <div className="dashboard-card" style={{ padding: "24px", border: "1px solid #fecaca", background: "#fff5f5" }}>
          <h3 style={{ fontSize: "16px", color: "#b91c1c", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertTriangle size={18} color="#dc2626" />
            <span>Account Actions & Danger Zone</span>
          </h3>
          <p style={{ fontSize: "12px", color: "#7f1d1d", marginBottom: "16px" }}>
            Sign out of your active session or permanently delete your account and all associated household records.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="action-icon-btn"
              style={{
                width: "auto",
                padding: "10px 20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid #fca5a5",
                background: "#ffffff",
                color: "#dc2626",
                fontWeight: "700",
                fontSize: "13px",
                display: "flex",
                gap: "8px",
              }}
              onClick={() => {
                if (onLogout) onLogout();
                if (showToast) showToast("Signed out of NoorLife.");
              }}
            >
              <LogOut size={16} />
              <span>Sign Out of NoorLife</span>
            </button>

            <button
              type="button"
              className="action-icon-btn"
              style={{
                width: "auto",
                padding: "10px 20px",
                borderRadius: "var(--radius-md)",
                background: "#dc2626",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "13px",
                display: "flex",
                gap: "8px",
              }}
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} />
              <span>Delete Account...</span>
            </button>
          </div>
        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-dialog" style={{ maxWidth: "440px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ color: "#dc2626", display: "flex", alignItems: "center", gap: "6px" }}>
                <AlertTriangle size={18} />
                <span>Confirm Account Deletion</span>
              </h3>
            </div>
            <div className="modal-body" style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--text-main)" }}>
              <p>
                This action is <strong>irreversible</strong>. All your saved tasks, meal plans, quiz records, budget entries, and reading logs will be permanently deleted.
              </p>
              <div style={{ margin: "14px 0 6px" }}>
                <label className="form-label">Type <strong>DELETE</strong> below to confirm:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="DELETE"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="action-icon-btn"
                style={{ width: "auto", padding: "8px 16px" }}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText !== "DELETE" || deleteLoading}
                className="card-action-btn-green"
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  opacity: deleteConfirmText === "DELETE" ? 1 : 0.5,
                  cursor: deleteConfirmText === "DELETE" ? "pointer" : "not-allowed",
                }}
                onClick={handleDeleteAccount}
              >
                {deleteLoading ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
