import React, { useState } from "react";
import { ShoppingBasket, Utensils, Plus, Check, Trash2, Clock, Flame } from "lucide-react";

export function GroceryMealsPage({
  groceries,
  toggleGrocery,
  deleteGrocery,
  onAddGroceryClick,
  weeklyMeals,
  onViewRecipe,
}) {
  const [activeTab, setActiveTab] = useState("grocery");
  const [selectedDay, setSelectedDay] = useState("Thu");

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
        </div>
      </div>

      {activeTab === "grocery" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Grocery Summary Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
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
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Weekly Meal Planner View */
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Day Selector */}
          <div className="meal-days-tabs" style={{ background: "var(--bg-card)", padding: "8px", borderRadius: "var(--radius-lg)" }}>
            {days.map((d) => (
              <button
                key={d}
                className={`meal-day-tab-btn ${selectedDay === d ? "active" : ""}`}
                style={{ padding: "10px 6px" }}
                onClick={() => setSelectedDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Selected Day Details */}
          {weeklyMeals[selectedDay] && (
            <div className="dashboard-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <img
                  src="/images/meal_lunch.jpg"
                  alt={weeklyMeals[selectedDay].title}
                  style={{ width: "220px", height: "220px", borderRadius: "var(--radius-xl)", objectFit: "cover" }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f" }}>
                      {weeklyMeals[selectedDay].day}
                    </span>
                    <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309" }}>
                      {weeklyMeals[selectedDay].mealType}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "20px", color: "var(--text-heading)", marginBottom: "6px" }}>
                    {weeklyMeals[selectedDay].title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                    {weeklyMeals[selectedDay].subtitle}
                  </p>

                  <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <Clock size={14} color="#d97706" />
                      <span>Prep: {weeklyMeals[selectedDay].prepTime}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                      <Flame size={14} color="#e63946" />
                      <span>Calories: {weeklyMeals[selectedDay].calories}</span>
                    </div>
                  </div>

                  <button
                    className="card-action-btn-green"
                    style={{ padding: "10px 24px" }}
                    onClick={() => onViewRecipe(weeklyMeals[selectedDay])}
                  >
                    View Ingredients & Recipe
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
