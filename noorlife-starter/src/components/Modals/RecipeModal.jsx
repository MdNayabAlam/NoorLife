import React from "react";
import { X, Clock, Flame, Check } from "lucide-react";

export function RecipeModal({ isOpen, onClose, meal }) {
  if (!isOpen || !meal) return null;

  const recipe = meal.recipe || {
    ingredients: [
      "1 cup Yellow Dal / Lentils",
      "Steamed Basmati Rice",
      "Fresh Roti / Flatbread",
      "Cucumber, onion, tomato salad",
      "Desi Ghee tadka with cumin & garlic"
    ],
    steps: [
      "Wash and boil dal with turmeric and salt until tender.",
      "Prepare aromatic tadka with hot ghee, cumin seeds, garlic and whole dry red chilies.",
      "Pour tadka over cooked dal and cover to seal fragrance.",
      "Serve hot with freshly puffed rotis, steamed rice, and salad."
    ]
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: "580px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{meal.title}</h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {meal.day} • {meal.mealType}
            </span>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <img
              src="/images/meal_lunch.jpg"
              alt={meal.title}
              style={{ width: "110px", height: "110px", borderRadius: "var(--radius-lg)", objectFit: "cover" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} /> {meal.prepTime || "35 mins"}
                </span>
                <span className="search-badge" style={{ background: "#fee2e2", color: "#b91c1c", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Flame size={12} /> {meal.calories || "490 kcal"}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                {meal.subtitle || "A nutritious, balanced homemade halal meal prepared with love."}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h4 style={{ fontSize: "13.5px", fontWeight: "700", marginBottom: "8px", color: "var(--text-heading)" }}>
              Ingredients Required
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary-green)" }} />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h4 style={{ fontSize: "13.5px", fontWeight: "700", marginBottom: "8px", color: "var(--text-heading)" }}>
              Preparation Steps
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {recipe.steps.map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", fontSize: "12px", lineHeight: "1.4" }}>
                  <span style={{ fontWeight: "800", color: "var(--primary-green)", minWidth: "18px" }}>
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="card-action-btn-green"
            onClick={onClose}
            style={{ padding: "8px 24px" }}
          >
            Close Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
