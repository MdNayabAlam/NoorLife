import React, { useState, useRef, useEffect } from "react";
import {
  Search, Bell, Sun, Moon, ChevronDown, CheckCircle2, MapPin,
  Calendar, BookOpen, Clock, Heart, Sparkles, LogOut, LogIn, User, Settings, Menu,
  Eye, X, Download, ShieldCheck, Camera, Check, Trash2, ArrowUpRight
} from "lucide-react";
import { notificationService } from "../services/notificationService";

function NoorLifeEmblem() {
  return (
    <div className="noorlife-brand-emblem-wrapper">
      <svg
        width="44"
        height="46"
        viewBox="0 0 38 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="noorlife-emblem-svg"
      >
        <defs>
          <linearGradient id="goldArchGrad" x1="0" y1="0" x2="38" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff8cf" />
            <stop offset="25%" stopColor="#e5b84c" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="domeEmeraldGrad" x1="19" y1="8" x2="19" y2="29" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="20%" stopColor="#16a34a" />
            <stop offset="55%" stopColor="#15803d" />
            <stop offset="85%" stopColor="#14532d" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>

          <radialGradient id="domeSpecular" cx="36%" cy="26%" r="48%">
            <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#4ade80" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Crescent & Finial Spire at Peak */}
        <line x1="19" y1="0.5" x2="19" y2="5.5" stroke="url(#goldArchGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="19" cy="2.8" r="1.1" fill="#fff8cf" />
        <path d="M17.5 1.8 a 1.6 1.6 0 1 1 2.3 2.3 a 1.3 1.3 0 1 0 -2.3 -2.3 z" fill="url(#goldArchGrad)" />

        {/* Outer Moorish Golden Arch Frame */}
        <path
          d="M5 36.5 L5 20 C5 11 10.5 5.2 19 5.2 C27.5 5.2 33 11 33 20 L33 36.5"
          stroke="url(#goldArchGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Inner Arch Accent Ring */}
        <path
          d="M7.5 36.5 L7.5 20.5 C7.5 12.8 12 7.6 19 7.6 C26 7.6 30.5 12.8 30.5 20.5 L30.5 36.5"
          stroke="url(#goldArchGrad)"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity="0.85"
        />

        {/* Green Mosque Dome with 3D onion shape */}
        <path
          d="M19 7.5 C15.5 11.2 9.5 16 9.5 24 C9.5 27.5 12.5 28.5 19 28.5 C25.5 28.5 28.5 27.5 28.5 24 C28.5 16 22.5 11.2 19 7.5 Z"
          fill="url(#domeEmeraldGrad)"
        />
        <path
          d="M19 7.5 C15.5 11.2 9.5 16 9.5 24 C9.5 27.5 12.5 28.5 19 28.5 C25.5 28.5 28.5 27.5 28.5 24 C28.5 16 22.5 11.2 19 7.5 Z"
          fill="url(#domeSpecular)"
        />

        {/* Dome Rib Lines for 3D depth */}
        <path d="M19 7.5 L19 28.5" stroke="#bbf7d0" strokeWidth="0.9" opacity="0.65" />
        <path d="M19 7.5 C16 12.5 13.5 18.5 13.5 28.5" stroke="#86efac" strokeWidth="0.75" opacity="0.45" />
        <path d="M19 7.5 C22 12.5 24.5 18.5 24.5 28.5" stroke="#86efac" strokeWidth="0.75" opacity="0.45" />

        {/* Golden Dome Base Cornice */}
        <rect x="8" y="28.5" width="22" height="2.8" rx="1" fill="url(#goldArchGrad)" />

        {/* Colonnade Arches below dome */}
        <rect x="9" y="31.3" width="20" height="5.2" rx="0.5" fill="#062619" />
        <path d="M11 36.5 L11 33.2 C11 32.2 13 32.2 13 33.2 L13 36.5" stroke="url(#goldArchGrad)" strokeWidth="1" fill="none" />
        <path d="M15 36.5 L15 33.2 C15 32.2 17 32.2 17 33.2 L17 36.5" stroke="url(#goldArchGrad)" strokeWidth="1" fill="none" />
        <path d="M21 36.5 L21 33.2 C21 32.2 23 32.2 23 33.2 L23 36.5" stroke="url(#goldArchGrad)" strokeWidth="1" fill="none" />
        <path d="M25 36.5 L25 33.2 C25 32.2 27 32.2 27 33.2 L27 36.5" stroke="url(#goldArchGrad)" strokeWidth="1" fill="none" />

        {/* Base Foundation Bar */}
        <line x1="3" y1="37" x2="35" y2="37" stroke="url(#goldArchGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function Header({
  user,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  tasks = [],
  duas = [],
  currentLocation,
  onOpenNotifications,
  toggleMobileNav,
  unreadCount = 3,
  onOpenAuthModal,
  onLogout,
  onOpenLocationModal,
}) {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDPModal, setShowDPModal] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const userMenuRef = useRef(null);
  const notifMenuRef = useRef(null);

  // Close menus on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowUserDropdown(false);
        setShowNotifications(false);
        setShowDPModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Real-Time Dynamic Notifications State
  const [notifications, setNotifications] = useState(() => notificationService.notifications);

  useEffect(() => {
    const unsub = notificationService.subscribe((list) => {
      setNotifications([...list]);
    });
    return () => unsub();
  }, []);

  const liveUnreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead();
  };

  const handleDismissNotification = (e, id) => {
    e.stopPropagation();
    notificationService.dismissNotification(id);
  };

  const handleNotificationClick = (n) => {
    if (n.linkTab && setActiveTab) {
      setActiveTab(n.linkTab);
    }
    notificationService.dismissNotification(n.id);
    setShowNotifications(false);
  };

  return (
    <header className="top-header">
      {/* Left: Menu & NoorLife Brand */}
      <div className="header-left">
        <button
          className="action-icon-btn mobile-menu-btn"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          <Menu size={20} color="#bad3c5" />
        </button>

        <div className="brand-wrapper" onClick={() => setActiveTab("Dashboard")}>
          <NoorLifeEmblem />
          <div className="brand-text-box">
            <h2 className="brand-title">
              <span className="brand-title-noor">Noor</span>
              <span className="brand-title-life">Life</span>
            </h2>
            <div className="brand-tagline">Ghar • Deen • Ilm • Behtar Zindagi</div>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar with Ctrl K shortcut badge */}
      <div className="header-search-container">
        <div className="header-search-box">
          <Search size={16} className="search-icon-muted" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Search anything... (naat, tasks, duas, namaz, recipes, quizzes...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 250)}
          />
          <kbd className="header-search-kbd">Ctrl K</kbd>
        </div>

        {/* Live Search Suggestions Dropdown */}
        {showSearchDropdown && (
          <div className="search-dropdown-results">
            <div
              style={{
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                borderBottom: "1px solid var(--border-light)",
                background: searchQuery.toLowerCase().includes("naat") ? "rgba(34, 197, 94, 0.1)" : "transparent"
              }}
              onMouseDown={() => {
                setActiveTab("Naat Sharif");
                setShowSearchDropdown(false);
              }}
            >
              <Sparkles size={14} color="#eab308" />
              <span style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--text-heading)" }}>
                Go to Naat Sharif Section (14 Kalaams & Audio Player)
              </span>
            </div>
            <div style={{ padding: "8px 12px", fontSize: "11.5px", color: "var(--text-muted)", textAlign: "center" }}>
              Quick jump to Naats, tasks, meals, namaz or duas...
            </div>
          </div>
        )}
      </div>

      {/* Right: Theme Toggle, Notifications, User Profile */}
      <div className="header-actions">
        {/* Global Worldwide Location Pill */}
        <button
          className="header-location-pill"
          onClick={onOpenLocationModal}
          title="Click to change city, state, or detect GPS worldwide"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "var(--accent-cream)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
            padding: "5px 12px",
            fontSize: "12px",
            fontWeight: "700",
            color: "var(--primary-green)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            maxWidth: "180px",
          }}
        >
          <MapPin size={13} color="var(--primary-green)" />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {currentLocation ? currentLocation.split(",")[0] : "Set Location"}
          </span>
          <ChevronDown size={11} />
        </button>

        {/* Dark/Light Mode Sun/Moon Button */}
        <button
          className="header-theme-toggle-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Theme toggle"
        >
          <Sun size={18} color="#854d0e" />
        </button>

        {/* Notifications Bell */}
        <div style={{ position: "relative" }} ref={notifMenuRef}>
          <button
            className="action-icon-btn header-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} color="#292524" />
            {liveUnreadCount > 0 && <span className="notification-count">{liveUnreadCount}</span>}
          </button>

          {showNotifications && (
            <div
              className="search-dropdown-results notifications-dropdown"
              style={{ width: "320px", maxWidth: "90vw", right: 0, left: "auto", top: "48px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border-color)",
                  fontWeight: "700",
                  fontSize: "13px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--bg-subtle)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-heading)" }}>
                  <Bell size={14} color="var(--primary-green)" />
                  <span>Notifications {notifications.length > 0 ? `(${notifications.length})` : ""}</span>
                </div>
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    style={{
                      fontSize: "11px",
                      color: "var(--primary-green)",
                      background: "transparent",
                      border: "none",
                      fontWeight: "700",
                      cursor: "pointer",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}
                    title="Mark all read and remove all from list"
                  >
                    Mark all read ✓
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--text-muted)" }}>
                  <CheckCircle2 size={32} color="var(--primary-green)" style={{ margin: "0 auto 8px auto", opacity: 0.8 }} />
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-heading)" }}>All caught up!</div>
                  <div style={{ fontSize: "11.5px", marginTop: "4px" }}>
                    Koi pending notification ya alert nahi hai ✨
                  </div>
                </div>
              ) : (
                <div style={{ maxHeight: "360px", overflowY: "auto" }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      style={{
                        padding: "12px 14px",
                        borderBottom: "1px solid var(--border-light)",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "10px",
                        cursor: "pointer",
                        background: n.unread ? "rgba(22, 163, 74, 0.04)" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-cream)")}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = n.unread ? "rgba(22, 163, 74, 0.04)" : "transparent")
                      }
                      title={n.linkTab ? `Click to open ${n.linkTab}` : "Click to view"}
                    >
                      <div style={{ display: "flex", gap: "10px", flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background:
                              n.category === "calendar"
                                ? "rgba(42, 157, 143, 0.15)"
                                : n.category === "prayer"
                                ? "rgba(22, 163, 74, 0.15)"
                                : "rgba(198, 162, 86, 0.15)",
                            color:
                              n.category === "calendar"
                                ? "#2a9d8f"
                                : n.category === "prayer"
                                ? "var(--primary-green)"
                                : "var(--accent-gold)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: "2px"
                          }}
                        >
                          {n.category === "calendar" ? (
                            <Calendar size={14} />
                          ) : n.category === "prayer" ? (
                            <Bell size={14} />
                          ) : (
                            <Sparkles size={14} />
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                            <div style={{ fontWeight: "700", color: "var(--text-heading)", fontSize: "12.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {n.title}
                            </div>
                          </div>
                          <div style={{ color: "var(--text-muted)", fontSize: "11.5px", lineHeight: "1.35", marginTop: "2px", wordBreak: "break-word" }}>
                            {n.desc}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "5px" }}>
                            <span style={{ color: "var(--text-light)", fontSize: "10px", fontWeight: "600" }}>
                              {n.time}
                            </span>
                            {n.linkTab && (
                              <span
                                style={{
                                  fontSize: "9.5px",
                                  color: "var(--primary-green)",
                                  fontWeight: "700",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "2px"
                                }}
                              >
                                View {n.linkTab} <ArrowUpRight size={10} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Individual dismiss / mark read button (User requirement: remove when marked read) */}
                      <button
                        type="button"
                        onClick={(e) => handleDismissNotification(e, n.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-muted)",
                          padding: "4px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          opacity: 0.7,
                          transition: "all 0.15s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#dc2626";
                          e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
                          e.currentTarget.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.opacity = "0.7";
                        }}
                        title="Mark read & remove"
                        aria-label="Remove notification"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Chip or Sign In Button */}
        {user ? (
          <div style={{ position: "relative" }} ref={userMenuRef}>
            <div
              className={`user-profile-chip ${showUserDropdown ? "is-open" : ""}`}
              onClick={() => setShowUserDropdown((prev) => !prev)}
              title="Click to toggle profile menu (On / Off)"
              role="button"
              tabIndex={0}
            >
              {/* DP Avatar: Clicking specifically opens/toggles the DP Showcase Modal */}
              <div
                className="user-avatar-wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDPModal((prev) => !prev);
                }}
                title="Click DP to Show/Off Photo Preview"
              >
                {user?.displayName === "NS" && !user?.avatarImg?.includes("user_nayab") ? (
                  <div className="user-avatar-initials">
                    NS
                  </div>
                ) : (
                  <img
                    src={user?.avatarImg || "/images/user_nayab.png"}
                    alt={user?.displayName || user?.name || "Nayab"}
                    className="user-avatar-photo"
                  />
                )}
                <span className="user-pro-badge-pill">
                  {user?.displayName === "NS" ? "NS Scholar" : "NoorLife Pro"}
                </span>
                <span className="user-avatar-hover-lens" title="Show DP">
                  <Eye size={10} color="#ffffff" />
                </span>
              </div>

              <div className="user-greeting-box">
                <span className="user-greeting">Assalamu Alaikum,</span>
                <div className="user-name-row">
                  <strong className="user-name">{user?.displayName || user?.name || "Nayab"}</strong>
                  <ChevronDown
                    size={12}
                    className={`user-dropdown-chevron ${showUserDropdown ? "rotated" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Profile Dropdown Menu (Toggles On / Off on click, closes on click outside) */}
            {showUserDropdown && (
              <div className="user-dropdown-menu">
                <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-color)" }}>
                  <strong style={{ fontSize: "13px", display: "block" }}>{user?.name || user?.displayName || "Nayab"}</strong>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{user?.email || "alamnayab718@gmail.com"}</span>
                </div>

                {/* Direct Show DP (On/Off) Feature */}
                <button
                  className="user-dropdown-item dp-show-toggle-btn"
                  onClick={() => {
                    setShowDPModal(true);
                    setShowUserDropdown(false);
                  }}
                  title="Show DP in full photo view"
                >
                  <Eye size={15} color="#eab308" />
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
                    <span style={{ fontWeight: "700", color: "var(--text-heading)" }}>Show DP (Full View)</span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Photo preview on / off</span>
                  </div>
                  <span className="dp-status-badge on">ON</span>
                </button>

                <button
                  className="user-dropdown-item"
                  onClick={() => {
                    const isNS = user?.displayName === "NS" || user?.name === "NS";
                    const nextUser = isNS
                      ? { name: "Md Nayab Alam", displayName: "Nayab", email: "alamnayab718@gmail.com", avatarImg: "/images/user_nayab.png", isPro: true }
                      : { name: "NS", displayName: "NS", email: "ns@noorlife.app", role: "Scholar", avatarLetter: "NS", isPro: true };
                    localStorage.removeItem("noorlife_signed_out");
                    localStorage.setItem("noorlife_user", JSON.stringify(nextUser));
                    window.location.reload();
                  }}
                >
                  <User size={14} />
                  <span>Switch to {user?.displayName === "NS" || user?.name === "NS" ? "Nayab" : "NS"}</span>
                </button>

                <button
                  className="user-dropdown-item"
                  onClick={() => {
                    setActiveTab("Settings");
                    setShowUserDropdown(false);
                  }}
                >
                  <Settings size={14} />
                  <span>Account Settings</span>
                </button>

                <button
                  className="user-dropdown-item danger"
                  onClick={() => {
                    if (onLogout) onLogout();
                    setShowUserDropdown(false);
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="header-signin-btn"
            onClick={onOpenAuthModal}
            title="Sign in to your NoorLife account"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>

      {/* DP Showcase Lightbox Modal (Triggered on DP click or via Show DP button) */}
      {showDPModal && (
        <div
          className="dp-showcase-backdrop"
          onClick={() => setShowDPModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="User DP Showcase Modal"
        >
          <div
            className="dp-showcase-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="dp-showcase-topbar">
              <div className="dp-showcase-title-box">
                <Sparkles size={16} color="#eab308" />
                <span>Profile Showcase • DP View</span>
              </div>
              <button
                className="dp-showcase-close-btn"
                onClick={() => setShowDPModal(false)}
                title="Turn OFF (Close DP Preview)"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* DP Body */}
            <div className="dp-showcase-body">
              {/* Large DP Avatar with Shimmer Ring */}
              <div className="dp-showcase-avatar-ring">
                <div className="dp-showcase-avatar-glow" />
                {user?.displayName === "NS" && !user?.avatarImg?.includes("user_nayab") ? (
                  <div className="dp-showcase-initials">NS</div>
                ) : (
                  <img
                    src={user?.avatarImg || "/images/user_nayab.png"}
                    alt={user?.name || "Nayab"}
                    className="dp-showcase-image"
                  />
                )}
                <div className="dp-showcase-active-pill">
                  <span className="dp-pulse-dot" />
                  <span>DP Status: ON</span>
                </div>
              </div>

              {/* User Details */}
              <div className="dp-showcase-user-details">
                <h3 className="dp-showcase-name">
                  {user?.name || (user?.displayName === "NS" ? "NS Scholar" : "Md Nayab Alam")}
                </h3>
                <div className="dp-showcase-badges">
                  <span className="dp-badge-pill pro">
                    <Sparkles size={11} />
                    NoorLife Pro
                  </span>
                  <span className="dp-badge-pill verified">
                    <ShieldCheck size={11} />
                    Verified Profile
                  </span>
                </div>
                <p className="dp-showcase-email">
                  {user?.email || "alamnayab718@gmail.com"}
                </p>
                <p className="dp-showcase-quote">
                  "Bismillahir Rahmanir Raheem — Deen, Ilm aur Ghar ke sath behtar zindagi."
                </p>
              </div>

              {/* Modal Actions */}
              <div className="dp-showcase-actions">
                <button
                  className="dp-btn-turn-off"
                  onClick={() => setShowDPModal(false)}
                  title="Turn OFF preview"
                >
                  <X size={15} />
                  <span>Turn OFF (Close)</span>
                </button>

                <a
                  href={user?.avatarImg || "/images/user_nayab.png"}
                  download="Nayab_Alam_DP.png"
                  className="dp-btn-download"
                  title="Download DP image"
                >
                  <Download size={14} />
                  <span>Save DP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
