import React, { useState } from "react";
import { X, Check } from "lucide-react";

export function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [category, setCategory] = useState("Kitchen");
  const [priority, setPriority] = useState("Medium");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      id: Date.now(),
      title: title.trim(),
      time,
      category,
      priority,
      done: false,
    });
    setTitle("");
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Home Task</h3>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Task Name / Details</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Iron clothes, Clean pantry..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 11:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Kitchen">Kitchen</option>
                  <option value="Chores">Chores</option>
                  <option value="Home">Home</option>
                  <option value="Family">Family</option>
                  <option value="Deen">Deen</option>
                  <option value="Shopping">Shopping</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="difficulty-pill-btn"
                    style={{
                      background: priority === p ? "var(--primary-green)" : "var(--bg-subtle)",
                      color: priority === p ? "white" : "var(--text-muted)",
                      border: "1px solid var(--border-color)",
                      padding: "8px",
                    }}
                    onClick={() => setPriority(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
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
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
