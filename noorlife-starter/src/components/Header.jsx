import React, { useState } from "react";
import {
  Search, Bell, Sun, Moon, ChevronDown, CheckCircle2,
  Calendar, BookOpen, Clock, Heart, Sparkles, LogOut, User, Settings, Menu
} from "lucide-react";

export function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  tasks,
  duas,
  onOpenNotifications,
  toggleMobileNav,
  unreadCount = 3
}) {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Prayer Alert", desc: "Zuhr prayer begins in 2h 15m. Plan your schedule.", time: "10 mins ago", unread: true },
    { id: 2, title: "Streak Kept!", desc: "MashAllah! 7-day consistency streak maintained.", time: "1 hour ago", unread: true },
    { id: 3, title: "Family Reminder", desc: "Parent-Teacher meeting scheduled for 10:00 AM.", time: "Today", unread: true },
  ];

  // Quick filtered results for search
  const filteredTasks = searchQuery.trim()
    ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];
  const filteredDuas = searchQuery.trim()
    ? duas.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.translation.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="action-icon-btn mobile-menu-btn"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
          style={{ display: "none" }}
        >
          <Menu size={20} />
        </button>

        <div className="brand-wrapper" onClick={() => setActiveTab("Dashboard")}>
          <div className="brand-icon-box">
            {/* Elegant Mosque Dome SVG Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c-1.5 1.5-3 3.5-3 6v12h6V9c0-2.5-1.5-4.5-3-6z" fill="currentColor" fillOpacity="0.15" />
              <path d="M4 21h16" />
              <path d="M4 14h2v7H4z" />
              <path d="M18 14h2v7h-2z" />
              <path d="M5 14c0-2 1-3 2-3h1" />
              <path d="M19 14c0-2-1-3-2-3h-1" />
              <path d="M12 2v2" />
              <circle cx="12" cy="2" r="0.5" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-text-box">
            <h2>NoorLife</h2>
            <div className="brand-tagline">Ghar • Deen • Ilm • Behtar Zindagi</div>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="header-search-container">
        <div className="header-search-box">
          <Search size={16} />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search anything... (tasks, duas, namaz, quiz, recipes...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 250)}
          />
        </div>

        {/* Live Search Suggestions Dropdown */}
        {showSearchDropdown && (
          <div className="search-dropdown-results">
            {filteredTasks.length === 0 && filteredDuas.length === 0 ? (
              <div style={{ padding: "12px", textAlign: "center", color: "var(--text-muted)", fontSize: "12px" }}>
                No direct matches found. Try searching for "lunch", "cleaning", "knowledge", or "namaz".
              </div>
            ) : (
              <>
                {filteredTasks.map(t => (
                  <button
                    key={t.id}
                    className="search-result-item"
                    onClick={() => {
                      setActiveTab("Home Tasks");
                      setShowSearchDropdown(false);
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--primary-green)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{t.title}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{t.time} • {t.category}</div>
                    </div>
                    <span className="search-badge" style={{ background: "#eaf3ec", color: "var(--primary-green)" }}>Task</span>
                  </button>
                ))}
                {filteredDuas.map(d => (
                  <button
                    key={d.id}
                    className="search-result-item"
                    onClick={() => {
                      setActiveTab("Daily Deen");
                      setShowSearchDropdown(false);
                    }}
                  >
                    <Heart size={16} color="#c6a256" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: "700" }}>{d.title}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{d.source}</div>
                    </div>
                    <span className="search-badge" style={{ background: "#fef7ea", color: "#b08226" }}>Dua</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Dark/Light Mode Toggle */}
        <button
          className="action-icon-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Theme toggle"
        >
          {theme === "dark" ? <Sun size={18} color="#eab308" /> : <Moon size={18} />}
        </button>

        {/* Notifications Bell */}
        <div style={{ position: "relative" }}>
          <button
            className="action-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div
              className="search-dropdown-results"
              style={{ width: "300px", right: 0, left: "auto", top: "48px" }}
            >
              <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)", fontWeight: "700", fontSize: "13px", display: "flex", justifyContent: "space-between" }}>
                <span>Notifications</span>
                <span style={{ fontSize: "11px", color: "var(--primary-green)", cursor: "pointer" }}>Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-light)", fontSize: "12px" }}>
                  <div style={{ fontWeight: "700", color: "var(--text-heading)", marginBottom: "2px" }}>{n.title}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "11px", lineHeight: "1.3" }}>{n.desc}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "9.5px", marginTop: "4px" }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div style={{ position: "relative" }}>
          <div
            className="user-profile-chip"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="user-avatar">
              <span>A</span>
            </div>
            <div className="user-greeting-box">
              <span className="user-greeting">Assalamu Alaikum,</span>
              <strong className="user-name">Ayesha</strong>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {showUserDropdown && (
            <div
              className="search-dropdown-results"
              style={{ width: "220px", right: 0, left: "auto", top: "48px" }}
            >
              <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: "700", fontSize: "13px" }}>Ayesha Khan</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>ayesha.home@noorlife.app</div>
              </div>
              <button
                className="search-result-item"
                onClick={() => { setActiveTab("Settings"); setShowUserDropdown(false); }}
              >
                <User size={15} />
                <span>My Profile</span>
              </button>
              <button
                className="search-result-item"
                onClick={() => { setActiveTab("Settings"); setShowUserDropdown(false); }}
              >
                <Settings size={15} />
                <span>Preferences</span>
              </button>
              <div style={{ height: "1px", background: "var(--border-color)", margin: "4px 0" }} />
              <button
                className="search-result-item"
                style={{ color: "#e63946" }}
                onClick={() => {
                  setShowUserDropdown(false);
                  alert("Logged out of NoorLife. Signing in as guest demo user.");
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
