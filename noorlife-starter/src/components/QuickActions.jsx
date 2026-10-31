import React from "react";
import {
  Icon3DHomeTasks,
  Icon3DGroceryMeals,
  Icon3DGKQuiz,
  Icon3DNamazGuide,
  Icon3DDailyDeen,
  Icon3DNaatSharif
} from "./Sidebar3DIcons";

export function QuickActions({ onSelectModule }) {
  const actions = [
    {
      id: "Home Tasks",
      title: "Home Tasks",
      desc: "Manage daily work",
      icon: Icon3DHomeTasks,
      themeClass: "quick-action-tasks active-pill",
    },
    {
      id: "Grocery & Meals",
      title: "Grocery & Meals",
      desc: "Plan & shop smart",
      icon: Icon3DGroceryMeals,
      themeClass: "quick-action-grocery",
    },
    {
      id: "GK Quiz",
      title: "GK Quiz",
      desc: "Test your knowledge",
      icon: Icon3DGKQuiz,
      themeClass: "quick-action-quiz",
    },
    {
      id: "Namaz Guide",
      title: "Namaz Guide",
      desc: "Step-by-step learning",
      icon: Icon3DNamazGuide,
      themeClass: "quick-action-namaz",
    },
    {
      id: "Daily Deen",
      title: "Daily Deen",
      desc: "Duas, Articles & More",
      icon: Icon3DDailyDeen,
      themeClass: "quick-action-deen",
    },
    {
      id: "Naat Sharif",
      title: "Naat Sharif",
      desc: "14 Kalaam & Audio",
      icon: Icon3DNaatSharif,
      themeClass: "quick-action-naat",
    },
  ];

  return (
    <div className="quick-actions-row">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <div
            key={act.id}
            className={`quick-action-card ${act.themeClass}`}
            onClick={() => onSelectModule(act.id)}
          >
            <div className="quick-action-icon">
              <Icon size={18} strokeWidth={2} />
            </div>
            <div className="quick-action-text">
              <h4>{act.title}</h4>
              <p>{act.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
