import React, { useState } from "react";
import { X } from "lucide-react";

export function AddGroceryModal({ isOpen, onClose, onAddGrocery }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1 kg");
  const [category, setCategory] = useState("Pantry");
  const [price, setPrice] = useState("100");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAddGrocery({
      id: Date.now(),
      name: name.trim(),
      quantity,
      category,
      estimatedPrice: Number(price) || 50,
      done: false,
    });
    setName("");
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Grocery Item</h3>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Olive Oil, Basmati Rice, Almonds..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Quantity / Unit</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 500g, 2 Litres, 1 Pack"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Dairy">Dairy</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Meat">Meat</option>
                  <option value="Spices">Spices</option>
                  <option value="Household">Household</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Price (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 150"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="action-icon-btn"
              style={{ width: "auto", padding: "8px 16px", borderRadius: "var(--radius-md)" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="card-action-btn-green"
              style={{ padding: "8px 20px" }}
            >
              Add to List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
