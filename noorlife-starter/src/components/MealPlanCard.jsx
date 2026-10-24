import React, { useState } from "react";
import { Utensils, Eye } from "lucide-react";

export function MealPlanCard({ weeklyMeals, onViewRecipe, onViewAllMeals }) {
  const [activeDay, setActiveDay] = useState("Thu");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentMeal = weeklyMeals[activeDay] || weeklyMeals["Thu"];

  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <Utensils size={16} color="#d97706" />
            <span>Meal Plan (This Week)</span>
          </h3>
        </div>
        <button className="card-text-link" onClick={onViewAllMeals}>
          View All
        </button>
      </div>

      {/* Weekday Tabs */}
      <div className="meal-days-tabs">
        {days.map((d) => (
          <button
            key={d}
            className={`meal-day-tab-btn ${activeDay === d ? "active" : ""}`}
            onClick={() => setActiveDay(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Meal Preview Card */}
      <div className="meal-preview-box">
        <img
          src="/images/meal_lunch.jpg"
          alt="Dal, rice, salad and roti lunch thali"
          className="meal-thumb-img"
        />
        <div className="meal-info-box">
          <h4>{currentMeal.mealType}</h4>
          <p>{currentMeal.subtitle || currentMeal.title}</p>
          <button
            className="meal-recipe-btn"
            onClick={() => onViewRecipe(currentMeal)}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
