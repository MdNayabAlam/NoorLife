import React from "react";
import { LayoutDashboard, CheckSquare, BookOpen, BookMarked, Bot } from "lucide-react";

export function MobileBottomNav({ activeTab, setActiveTab }) {
  const bottomItems = [
    { id: "Dashboard", label: "Home", icon: LayoutDashboard },
    { id: "Home Tasks", label: "Tasks", icon: CheckSquare },
    { id: "Namaz Guide", label: "Namaz", icon: BookOpen },
    { id: "Quran Tracker", label: "Quran", icon: BookMarked },
    { id: "AI Assistant", label: "AI Helper", icon: Bot },
  ];

  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile Bottom Navigation">
      {bottomItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-bar-item ${isActive ? "active" : ""}`}
            onClick={() => {
              setActiveTab(item.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="bottom-bar-icon-wrap">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
