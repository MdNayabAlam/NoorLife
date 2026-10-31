import React from "react";
import { X, ArrowRight } from "lucide-react";
import {
  Icon3DDashboard,
  Icon3DHomeTasks,
  Icon3DGroceryMeals,
  Icon3DSunnahDishes,
  Icon3DGKQuiz,
  Icon3DNamazGuide,
  Icon3DNamazNiyyah,
  Icon3DPrayerTimes,
  Icon3DDailyDeen,
  Icon3DNaatSharif,
  Icon3DQuranReader,
  Icon3DQuranTracker,
  Icon3DIslamicCalendar,
  Icon3DFamilyCalendar,
  Icon3DBudgetManager,
  Icon3DRewardsStreaks,
  Icon3DAIAssistant,
  Icon3DSettings
} from "./Sidebar3DIcons";

export function Sidebar({ activeTab, setActiveTab, taskCount = 0, isMobileOpen = false, closeMobileNav }) {
  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: Icon3DDashboard },
    { id: "Home Tasks", label: "Home Tasks", icon: Icon3DHomeTasks },
    { id: "Grocery & Meals", label: "Grocery & Meals", icon: Icon3DGroceryMeals },
    { id: "Sunnah Dishes", label: "Sunnah Dishes", icon: Icon3DSunnahDishes },
    { id: "GK Quiz", label: "GK Quiz", icon: Icon3DGKQuiz },
    { id: "Namaz Guide", label: "Namaz Guide", icon: Icon3DNamazGuide },
    { id: "Namaz Ki Niyyat", label: "Namaz Ki Niyyat", icon: Icon3DNamazNiyyah },
    { id: "Prayer Times", label: "Prayer Times", icon: Icon3DPrayerTimes },
    { id: "Daily Deen", label: "Daily Deen", icon: Icon3DDailyDeen },
    { id: "Naat Sharif", label: "Naat Sharif", icon: Icon3DNaatSharif },
    { id: "Quran Reader", label: "Quran Reader", icon: Icon3DQuranReader },
    { id: "Quran Tracker", label: "Quran Tracker", icon: Icon3DQuranTracker },
    { id: "Islamic Calendar", label: "Islamic Calendar", icon: Icon3DIslamicCalendar },
    { id: "Family Calendar", label: "Family Calendar", icon: Icon3DFamilyCalendar },
    { id: "Budget Manager", label: "Budget Manager", icon: Icon3DBudgetManager },
    { id: "Rewards & Streaks", label: "Rewards & Streaks", icon: Icon3DRewardsStreaks },
    { id: "AI Assistant", label: "AI Assistant", icon: Icon3DAIAssistant },
    { id: "Settings", label: "Settings", icon: Icon3DSettings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div className="sidebar-backdrop-mobile" onClick={closeMobileNav} />
      )}
      <aside className={`app-sidebar ${isMobileOpen ? "open" : ""}`}>
        {isMobileOpen && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
            <button className="action-icon-btn" onClick={closeMobileNav} aria-label="Close sidebar">
              <X size={18} />
            </button>
          </div>
        )}

        <ul className="sidebar-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isSettings = item.id === "Settings";
            return (
              <React.Fragment key={item.id}>
                {isSettings && <li className="sidebar-nav-divider" role="separator" />}
                <li>
                  <button
                    className={`sidebar-nav-btn ${isActive ? "active" : ""} ${isSettings ? "settings-btn" : ""}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (closeMobileNav) closeMobileNav();
                    }}
                  >
                    <Icon size={20} className="sidebar-3d-icon" />
                    <span className="sidebar-btn-label">{item.label}</span>
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        {/* Bottom Card: Knowledge + Action = A Better Tomorrow with Oasis Courtyard */}
        <div className="sidebar-oasis-card">
          {/* Archway Courtyard Artwork */}
          <div className="sidebar-oasis-img-wrap">
            <img
              src="/images/sidebar_arch_bg.jpg"
              alt="NoorLife Mosque Oasis"
              className="sidebar-oasis-bg-img"
            />
            <div className="sidebar-oasis-top-fade" />
          </div>

          {/* Wavy Emerald Banner Overlay */}
          <div className="sidebar-oasis-banner">
            <svg
              className="sidebar-oasis-wave-bg"
              viewBox="0 0 200 110"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="oasisEmerald" x1="100" y1="0" x2="100" y2="110" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0d4230" />
                  <stop offset="45%" stopColor="#082d20" />
                  <stop offset="100%" stopColor="#041d14" />
                </linearGradient>
                <linearGradient id="oasisGoldStroke" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#cf9e38" />
                  <stop offset="35%" stopColor="#fff3be" />
                  <stop offset="70%" stopColor="#e5b84c" />
                  <stop offset="100%" stopColor="#b3821e" />
                </linearGradient>
              </defs>
              <path
                d="M -2,32 C 30,22 65,34 105,34 C 145,34 165,8 185,8 C 195,8 202,12 202,20 L 202,112 L -2,112 Z"
                fill="url(#oasisEmerald)"
                stroke="url(#oasisGoldStroke)"
                strokeWidth="1.8"
              />
            </svg>

            <div className="sidebar-oasis-content">
              <div className="sidebar-oasis-phrase1">Knowledge + Action =</div>
              <div className="sidebar-oasis-phrase2">A Better Tomorrow</div>
              <div className="sidebar-oasis-footer">
                <span className="sidebar-oasis-brand">NoorLife</span>
                <button
                  className="sidebar-oasis-btn"
                  aria-label="NoorLife action"
                  onClick={() => setActiveTab("Dashboard")}
                >
                  <ArrowRight size={15} color="#153022" strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </div>

          {/* Foreground Botanical Leaves Overlay */}
          <img
            src="/images/hero_leaves.png"
            alt=""
            className="sidebar-oasis-leaves"
          />
        </div>
      </aside>
    </>
  );
}
