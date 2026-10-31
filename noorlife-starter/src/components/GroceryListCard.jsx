import React from "react";
import { ShoppingBasket, Plus, Check } from "lucide-react";

export function GroceryListCard({ groceries, toggleGrocery, onAddGroceryClick }) {
  // Food emojis matching the reference design
  const itemIcons = {
    "Milk": "🥛",
    "Eggs": "🥚",
    "Onions": "🧅",
    "Tomatoes": "🍅",
    "Rice": "🍚",
    "Cooking Oil": "🛢️",
    "Chicken": "🍗",
    "Spices": "🌶️",
  };

  const col1 = groceries.slice(0, 4);
  const col2 = groceries.slice(4, 8);

  return (
    <div className="dashboard-card grocery-widget-card">
      {/* Header Row */}
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <div className="grocery-header-icon-box">
              <ShoppingBasket size={16} />
            </div>
            <span>Grocery List</span>
          </h3>
        </div>
        <button className="card-action-btn-green" onClick={onAddGroceryClick}>
          <Plus size={13} strokeWidth={2.5} />
          <span>Add Item</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grocery-grid-2col">
        {/* Column 1 */}
        <div className="grocery-subcol">
          {col1.map((item) => (
            <div
              key={item.id}
              className={`grocery-item-row ${item.done ? "done" : ""}`}
              onClick={() => toggleGrocery(item.id)}
            >
              <div className={`grocery-checkbox ${item.done ? "checked" : ""}`}>
                {item.done && <Check size={11} strokeWidth={3} />}
              </div>
              <span className="grocery-item-emoji">{itemIcons[item.name] || "🛒"}</span>
              <span className={`grocery-item-name ${item.done ? "completed" : ""}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="grocery-subcol">
          {col2.map((item) => (
            <div
              key={item.id}
              className={`grocery-item-row ${item.done ? "done" : ""}`}
              onClick={() => toggleGrocery(item.id)}
            >
              <div className={`grocery-checkbox ${item.done ? "checked" : ""}`}>
                {item.done && <Check size={11} strokeWidth={3} />}
              </div>
              <span className="grocery-item-emoji">{itemIcons[item.name] || "🛒"}</span>
              <span className={`grocery-item-name ${item.done ? "completed" : ""}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
