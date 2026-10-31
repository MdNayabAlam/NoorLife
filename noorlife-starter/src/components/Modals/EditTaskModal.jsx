import React, { useState, useEffect } from "react";
import { X, Check, Clock, Tag, AlertCircle } from "lucide-react";

export function EditTaskModal({ isOpen, onClose, task, onSaveTask }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("Home");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setTime(task.time || "12:00 PM");
      setCategory(task.category || "Home");
      setPriority(task.priority || "Medium");
    }
  }, [task]);

  if (!isOpen || !task) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveTask(task.id, {
      title: title.trim(),
      time,
      category,
      priority,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: "480px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Edit Task Details</h3>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              Update title, schedule time, and priority
            </span>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Scheduled Time</label>
                <div style={{ position: "relative" }}>
                  <Clock size={15} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "12px" }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: "32px" }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 03:00 PM"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <label className="form-label">Priority Level</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {["Low", "Medium", "High"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    style={{
                      padding: "8px",
                      borderRadius: "var(--radius-sm)",
                      border: priority === p ? "2px solid var(--primary-green)" : "1px solid var(--border-color)",
                      background: priority === p ? "var(--bg-subtle)" : "var(--bg-card)",
                      fontWeight: priority === p ? "700" : "500",
                      color: "var(--text-heading)",
                      fontSize: "12px",
                      cursor: "pointer",
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
            <button type="button" className="action-icon-btn" style={{ width: "auto", padding: "8px 16px" }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="card-action-btn-green" style={{ padding: "8px 22px" }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
