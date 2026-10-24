import React from "react";
import { ShoppingBasket, Plus, Check } from "lucide-react";

export function GroceryListCard({ groceries, toggleGrocery, onAddGroceryClick }) {
  const col1 = groceries.slice(0, 4);
  const col2 = groceries.slice(4, 8);

  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>
            <ShoppingBasket size={16} color="#e76f51" />
            <span>Grocery List</span>
          </h3>
        </div>
        <button className="card-action-btn-green" onClick={onAddGroceryClick}>
          <Plus size={13} strokeWidth={2.5} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grocery-grid-2col">
        {/* Column 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {col1.map((item) => (
            <div
              key={item.id}
              className="grocery-item-row"
              onClick={() => toggleGrocery(item.id)}
            >
              <div className={`task-checkbox-custom ${item.done ? "checked" : ""}`}>
                {item.done && <Check size={11} strokeWidth={3} />}
              </div>
              <span className={`task-title-text ${item.done ? "completed" : ""}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {col2.map((item) => (
            <div
              key={item.id}
              className="grocery-item-row"
              onClick={() => toggleGrocery(item.id)}
            >
              <div className={`task-checkbox-custom ${item.done ? "checked" : ""}`}>
                {item.done && <Check size={11} strokeWidth={3} />}
              </div>
              <span className={`task-title-text ${item.done ? "completed" : ""}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
