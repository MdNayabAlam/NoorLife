import React, { useState } from "react";
import { Sun, ArrowRight } from "lucide-react";

export function MealPlanCard({ weeklyMeals = {}, onViewRecipe, onViewAllMeals }) {
  const [activeDay, setActiveDay] = useState("Thu");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const currentMeal = weeklyMeals[activeDay] || weeklyMeals["Thu"] || {
    title: "Yellow Dal Tadka, Steamed Rice & Salad",
    mealType: "Lunch",
    day: "Thu",
    image: "/images/meal_thu.jpg",
  };

  const mealImage = currentMeal.image || `/images/meal_${activeDay.toLowerCase()}.jpg`;

  return (
    <div className="dashboard-card meal-widget-card">
      {/* Header Row */}
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <div className="meal-header-icon-box">
              <Sun size={16} />
            </div>
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

      {/* Meal Preview Box */}
      <div className="meal-preview-box">
        <img
          src={mealImage}
          alt={currentMeal.title || "Meal"}
          className="meal-thumb-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/meal_thu.jpg";
          }}
        />
        <div className="meal-info-box">
          <h4>{currentMeal.day ? `${currentMeal.day} • ` : ""}{currentMeal.mealType || "Lunch"}</h4>
          <p>{currentMeal.translations?.[localStorage.getItem("noorlife_recipe_lang") || "en"]?.title || currentMeal.title || "Dal, Rice, Salad, Roti"}</p>
          <button
            className="meal-recipe-btn"
            onClick={() => onViewRecipe && onViewRecipe(currentMeal)}
          >
            <span>
              {localStorage.getItem("noorlife_recipe_lang") === "hi"
                ? "रेसिपी देखें"
                : localStorage.getItem("noorlife_recipe_lang") === "ur"
                ? "ترکیب دیکھیں"
                : "View Recipe"}
            </span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
