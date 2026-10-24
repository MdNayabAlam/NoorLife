import React from "react";
import {
  Home,
  ShoppingCart,
  Brain,
  BookOpen,
  Clock,
  Sparkles
} from "lucide-react";

export function QuickActions({ onSelectModule }) {
  const actions = [
    {
      id: "Home Tasks",
      title: "Home Tasks",
      desc: "Manage daily work",
      icon: Home,
      colorClass: "bg-mint",
    },
    {
      id: "Grocery & Meals",
      title: "Grocery & Meals",
      desc: "Plan & shop smart",
      icon: ShoppingCart,
      colorClass: "bg-peach",
    },
    {
      id: "GK Quiz",
      title: "GK Quiz",
      desc: "Test your knowledge",
      icon: Brain,
      colorClass: "bg-purple",
    },
    {
      id: "Namaz Guide",
      title: "Namaz Guide",
      desc: "Learn step-by-step",
      icon: BookOpen,
      colorClass: "bg-emerald",
    },
    {
      id: "Prayer Times",
      title: "Prayer Times",
      desc: "Never miss a prayer",
      icon: Clock,
      colorClass: "bg-sage",
    },
    {
      id: "Daily Deen",
      title: "Daily Deen",
      desc: "Duas & Articles",
      icon: Sparkles,
      colorClass: "bg-teal",
    },
  ];

  return (
    <div className="quick-actions-row">
      {actions.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="quick-action-card"
            onClick={() => onSelectModule(item.id)}
          >
            <div className={`quick-action-icon ${item.colorClass}`}>
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="quick-action-text">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
