import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  ShoppingCart,
  HelpCircle,
  BookOpen,
  Clock,
  HeartHandshake,
  CalendarDays,
  Wallet,
  BookMarked,
  Flame,
  Bot,
  Settings,
  X
} from "lucide-react";

export function Sidebar({ activeTab, setActiveTab, taskCount = 0, isMobileOpen = false, closeMobileNav }) {
  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Home Tasks", label: "Home Tasks", icon: CheckSquare, badge: taskCount },
    { id: "Grocery & Meals", label: "Grocery & Meals", icon: ShoppingCart },
    { id: "GK Quiz", label: "GK Quiz", icon: HelpCircle },
    { id: "Namaz Guide", label: "Namaz Guide", icon: BookOpen },
    { id: "Prayer Times", label: "Prayer Times", icon: Clock },
    { id: "Daily Deen", label: "Daily Deen", icon: HeartHandshake },
    { id: "Family Calendar", label: "Family Calendar", icon: CalendarDays },
    { id: "Budget Manager", label: "Budget Manager", icon: Wallet },
    { id: "Quran Tracker", label: "Quran Tracker", icon: BookMarked },
    { id: "Rewards & Streaks", label: "Rewards & Streaks", icon: Flame },
    { id: "AI Assistant", label: "AI Assistant", icon: Bot },
    { id: "Settings", label: "Settings", icon: Settings },
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
            return (
              <li key={item.id}>
                <button
                  className={`sidebar-nav-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (closeMobileNav) closeMobileNav();
                  }}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="nav-badge-count">{item.badge}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom Card: Knowledge + Action = A Better Tomorrow */}
        <div className="sidebar-bottom-card">
          {/* Subtle Mosque Silhouette Graphic */}
          <svg className="sidebar-mosque-graphic" viewBox="0 0 100 100" fill="none">
            <path d="M50 15 C45 25 40 35 40 50 L60 50 C60 35 55 25 50 15 Z" fill="#c6a256" />
            <rect x="25" y="45" width="50" height="55" rx="4" fill="#ffffff" />
            <rect x="10" y="30" width="10" height="70" fill="#ffffff" />
            <rect x="80" y="30" width="10" height="70" fill="#ffffff" />
            <path d="M10 30 L15 15 L20 30 Z" fill="#c6a256" />
            <path d="M80 30 L85 15 L90 30 Z" fill="#c6a256" />
          </svg>
          <div className="sidebar-card-content">
            <h4>Knowledge + Action =<br />A Better Tomorrow</h4>
            <p>NoorLife</p>
          </div>
        </div>
      </aside>
    </>
  );
}
