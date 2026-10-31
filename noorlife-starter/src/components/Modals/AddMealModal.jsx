import React, { useState } from "react";
import { X, Utensils, Clock, Flame, Plus } from "lucide-react";

export function AddMealModal({ isOpen, onClose, onAddMeal }) {
  const [day, setDay] = useState("Thu");
  const [mealType, setMealType] = useState("Lunch");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("30 mins");
  const [calories, setCalories] = useState(450);
  const [recipe, setRecipe] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onAddMeal({
      day,
      mealType,
      title: title.trim(),
      description: description.trim() || `${title} prepared with fresh halal ingredients.`,
      prepTime,
      calories: Number(calories) || 400,
      recipe: recipe.trim() || "Cook with care and bismillah. Serve hot with love.",
      image: "/images/meal_thali.jpg",
      ingredients: [
        { name: "Main Ingredient", amount: "500g" },
        { name: "Aromatic Spices", amount: "to taste" },
        { name: "Ghee / Olive Oil", amount: "2 tbsp" }
      ]
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Plan a New Meal</h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Add a healthy halal meal to your weekly planner
            </span>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Day of the Week</label>
                <select className="form-select" value={day} onChange={(e) => setDay(e.target.value)}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Meal Type</label>
                <select className="form-select" value={mealType} onChange={(e) => setMealType(e.target.value)}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dish Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Masoor Dal Tadka & Jeera Rice"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Prep Time</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 25 mins"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Calories (approx)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 450"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-input"
                placeholder="Brief summary of dish and sides"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cooking Instructions / Recipe</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Step-by-step preparation notes..."
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="action-icon-btn" style={{ width: "auto", padding: "8px 16px" }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="card-action-btn-green" style={{ padding: "8px 24px" }}>
              Add to Meal Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
