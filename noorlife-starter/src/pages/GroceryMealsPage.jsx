import React, { useState } from "react";
import { ShoppingBasket, Utensils, Plus, Check, Trash2, Clock, Flame, CalendarPlus, Languages } from "lucide-react";
import { AddMealModal } from "../components/Modals/AddMealModal";
import { SunnahDishesPage } from "./SunnahDishesPage";

export function GroceryMealsPage({
  groceries,
  toggleGrocery,
  deleteGrocery,
  onAddGroceryClick,
  weeklyMeals,
  onViewRecipe,
  onAddCustomMeal,
  initialTab = "grocery",
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDay, setSelectedDay] = useState("Thu");
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [mealLang, setMealLang] = useState(() => {
    return localStorage.getItem("noorlife_recipe_lang") || "en";
  });

  const handleMealLangChange = (lang) => {
    setMealLang(lang);
    localStorage.setItem("noorlife_recipe_lang", lang);
  };

  const totalEstimated = groceries
    .filter((g) => !g.done)
    .reduce((acc, curr) => acc + (curr.estimatedPrice || 0), 0);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Grocery & Weekly Meals</h2>
          <p>Plan your family's nutritious halal meals and manage shopping lists effortlessly.</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className={`difficulty-pill-btn ${activeTab === "grocery" ? "active" : ""}`}
            style={{
              background: activeTab === "grocery" ? "var(--primary-green)" : "var(--bg-subtle)",
              color: activeTab === "grocery" ? "white" : "var(--text-muted)",
              padding: "8px 16px",
            }}
            onClick={() => setActiveTab("grocery")}
          >
            Grocery List
          </button>
          <button
            className={`difficulty-pill-btn ${activeTab === "meals" ? "active" : ""}`}
            style={{
              background: activeTab === "meals" ? "var(--primary-green)" : "var(--bg-subtle)",
              color: activeTab === "meals" ? "white" : "var(--text-muted)",
              padding: "8px 16px",
            }}
            onClick={() => setActiveTab("meals")}
          >
            Weekly Meal Planner
          </button>
          <button
            className={`difficulty-pill-btn ${activeTab === "sunnah" ? "active" : ""}`}
            style={{
              background: activeTab === "sunnah" ? "var(--primary-green)" : "var(--bg-subtle)",
              color: activeTab === "sunnah" ? "white" : "var(--text-muted)",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => setActiveTab("sunnah")}
          >
            <span>🌿</span>
            <span>Sunnah Dishes</span>
          </button>
        </div>
      </div>

      {activeTab === "grocery" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Grocery Summary Row */}
          <div className="stats-grid-3col">
            <div className="dashboard-card" style={{ padding: "16px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Total Items</span>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-heading)", marginTop: "4px" }}>
                {groceries.length}
              </div>
            </div>
            <div className="dashboard-card" style={{ padding: "16px" }}>
              <span style={{ fontSize: "11px", color: "#2a7c4f", fontWeight: "600" }}>Items Purchased</span>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#2a7c4f", marginTop: "4px" }}>
                {groceries.filter((g) => g.done).length}
              </div>
            </div>
            <div className="dashboard-card" style={{ padding: "16px" }}>
              <span style={{ fontSize: "11px", color: "#d97706", fontWeight: "600" }}>Pending Estimated Cart</span>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#d97706", marginTop: "4px" }}>
                ₹{totalEstimated}
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header-row">
              <h3>Shopping Checklist</h3>
              <button className="card-action-btn-green" onClick={onAddGroceryClick}>
                <Plus size={14} strokeWidth={2.5} />
                <span>Add Item</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "10px" }}>
              {groceries.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    background: item.done ? "var(--bg-subtle)" : "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flex: 1 }}
                    onClick={() => toggleGrocery(item.id)}
                  >
                    <div className={`task-checkbox-custom ${item.done ? "checked" : ""}`}>
                      {item.done && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "700",
                          textDecoration: item.done ? "line-through" : "none",
                          color: item.done ? "var(--text-muted)" : "var(--text-heading)",
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                        {item.quantity} • {item.category} • ₹{item.estimatedPrice}
                      </div>
                    </div>
                  </div>

                  <button
                    className="action-icon-btn"
                    style={{ width: "28px", height: "28px", color: "#dc2626" }}
                    onClick={() => deleteGrocery(item.id)}
                    title="Delete item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "meals" ? (
        /* Weekly Meal Planner View */
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Actions & Day Selector */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div className="meal-days-tabs" style={{ background: "var(--bg-card)", padding: "6px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
              {days.map((d) => (
                <button
                  key={d}
                  className={`meal-day-tab-btn ${selectedDay === d ? "active" : ""}`}
                  style={{ padding: "8px 14px" }}
                  onClick={() => setSelectedDay(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {/* Language Switcher for Meal Planner */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "var(--bg-card)",
                  padding: "4px 8px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)"
                }}
              >
                <Languages size={14} color="var(--primary-green)" style={{ marginRight: "2px" }} />
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", marginRight: "2px" }}>Zabaan:</span>
                <button
                  type="button"
                  className={`difficulty-pill-btn ${mealLang === "en" ? "active" : ""}`}
                  style={{
                    padding: "4px 9px",
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    background: mealLang === "en" ? "var(--primary-green)" : "transparent",
                    color: mealLang === "en" ? "#ffffff" : "var(--text-muted)"
                  }}
                  onClick={() => handleMealLangChange("en")}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`difficulty-pill-btn ${mealLang === "hi" ? "active" : ""}`}
                  style={{
                    padding: "4px 9px",
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    background: mealLang === "hi" ? "var(--primary-green)" : "transparent",
                    color: mealLang === "hi" ? "#ffffff" : "var(--text-muted)"
                  }}
                  onClick={() => handleMealLangChange("hi")}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  className={`difficulty-pill-btn ${mealLang === "ur" ? "active" : ""}`}
                  style={{
                    padding: "4px 9px",
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    background: mealLang === "ur" ? "var(--primary-green)" : "transparent",
                    color: mealLang === "ur" ? "#ffffff" : "var(--text-muted)"
                  }}
                  onClick={() => handleMealLangChange("ur")}
                >
                  اردو
                </button>
              </div>

              <button
                className="card-action-btn-green"
                style={{ padding: "8px 16px" }}
                onClick={() => setIsAddMealOpen(true)}
              >
                <Plus size={14} strokeWidth={2.5} />
                <span>Add Custom Meal</span>
              </button>
            </div>
          </div>

          {/* Selected Day Details */}
          {weeklyMeals[selectedDay] ? (
            (() => {
              const currentMealData = weeklyMeals[selectedDay];
              const tData = currentMealData?.translations?.[mealLang];
              const mealTitle = tData?.title || (mealLang === "hi" ? currentMealData?.title_hi : (mealLang === "ur" ? currentMealData?.title_ur : null)) || currentMealData?.title;
              const mealSubtitle = tData?.subtitle || (mealLang === "hi" ? currentMealData?.subtitle_hi : (mealLang === "ur" ? currentMealData?.subtitle_ur : null)) || currentMealData?.subtitle || currentMealData?.description;
              const viewRecipeBtnText = mealLang === "hi"
                ? "सामग्री व रेसिपी देखें (View Recipe)"
                : mealLang === "ur"
                ? "اجزاء اور ترکیب دیکھیں (View Recipe)"
                : "View Ingredients & Recipe";

              return (
                <div className="dashboard-card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <img
                      src={currentMealData.image || `/images/meal_${selectedDay.toLowerCase()}.jpg`}
                      alt={mealTitle || "Meal"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/meal_thu.jpg";
                      }}
                      style={{ width: "220px", height: "220px", borderRadius: "var(--radius-xl)", objectFit: "cover", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}
                    />

                    <div style={{ flex: 1, minWidth: "260px" }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f", fontWeight: "700" }}>
                          {currentMealData.day}
                        </span>
                        <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309", fontWeight: "700" }}>
                          {currentMealData.mealType || "Lunch"}
                        </span>
                        <span className="search-badge" style={{ background: "#e0f2fe", color: "#0369a1", fontWeight: "700" }}>
                          🌍 {mealLang === "hi" ? "हिन्दी" : mealLang === "ur" ? "اردو" : "English"}
                        </span>
                      </div>

                      <h3 style={{ fontSize: "21px", color: "var(--text-heading)", marginBottom: "6px", fontWeight: "800" }}>
                        {mealTitle}
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: "1.5" }}>
                        {mealSubtitle}
                      </p>

                      <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                          <Clock size={14} color="#d97706" />
                          <span>Prep: {currentMealData.prepTime}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                          <Flame size={14} color="#e63946" />
                          <span>Calories: {currentMealData.calories} kcal</span>
                        </div>
                      </div>

                      <button
                        className="card-action-btn-green"
                        style={{ padding: "10px 24px", fontSize: "13px", fontWeight: "700" }}
                        onClick={() => onViewRecipe(currentMealData)}
                      >
                        {viewRecipeBtnText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="dashboard-card" style={{ textAlign: "center", padding: "40px 20px" }}>
              <h4>No meal planned for {selectedDay} yet!</h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Click "Add Custom Meal" to schedule your family's recipe.</p>
            </div>
          )}
        </div>
      ) : (
        <SunnahDishesPage
          onAddGroceryItem={onAddGroceryClick}
          onNavigateMeals={() => setActiveTab("meals")}
        />
      )}

      {/* Add Custom Meal Modal */}
      <AddMealModal
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
        onAddMeal={(meal) => {
          if (onAddCustomMeal) onAddCustomMeal(meal);
          setIsAddMealOpen(false);
        }}
      />
    </div>
  );
}
