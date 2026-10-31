import React, { useState } from "react";
import { Plus, Check, Trash2, Clock, CheckCircle2, ListFilter, AlertCircle, Edit3, Calendar } from "lucide-react";
import { EditTaskModal } from "../components/Modals/EditTaskModal";

export function TasksPage({ tasks, toggleTask, deleteTask, onAddTaskClick, onEditTask }) {
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const categories = ["all", "Kitchen", "Chores", "Home", "Family", "Deen", "Shopping"];

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed" && !t.done) return false;
    if (filter === "pending" && t.done) return false;
    if (filter === "today") {
      // Show tasks scheduled for today (or morning/afternoon/evening slots)
      if (t.done) return false;
    }
    if (filter === "upcoming") {
      // Low/Medium priority or future tasks
      if (t.done) return false;
    }
    if (filter === "high" && t.priority !== "High") return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const pending = total - completed;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Home Tasks Manager</h2>
          <p>Organize daily household chores, family routines, and personal to-dos.</p>
        </div>
        <button className="card-action-btn-green" onClick={onAddTaskClick}>
          <Plus size={15} strokeWidth={2.5} />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Stats Summary Row with Progress Ring */}
      <div className="stats-grid-4col">
        <div className="dashboard-card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>Total Tasks</span>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-heading)", marginTop: "4px" }}>
            {total}
          </div>
        </div>
        <div className="dashboard-card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "11px", color: "#2a7c4f", fontWeight: "600" }}>Completed</span>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#2a7c4f", marginTop: "4px" }}>
            {completed}
          </div>
        </div>
        <div className="dashboard-card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "11px", color: "#d97706", fontWeight: "600" }}>Pending Tasks</span>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#d97706", marginTop: "4px" }}>
            {pending}
          </div>
        </div>
        <div className="dashboard-card" style={{ padding: "16px" }}>
          <span style={{ fontSize: "11px", color: "var(--primary-green)", fontWeight: "600" }}>Daily Completion</span>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--primary-green)", marginTop: "4px" }}>
            {progressPercent}%
          </div>
          <div style={{ height: "4px", background: "var(--border-color)", borderRadius: "999px", overflow: "hidden", marginTop: "6px" }}>
            <div style={{ height: "100%", width: `${progressPercent}%`, background: "var(--primary-green)" }} />
          </div>
        </div>
      </div>

      {/* Filters Bar: Today, Upcoming, Completed, High Priority */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Tasks" },
            { id: "today", label: "Today" },
            { id: "upcoming", label: "Upcoming" },
            { id: "completed", label: "Completed" },
            { id: "high", label: "High Priority" },
          ].map((btn) => (
            <button
              key={btn.id}
              className={`difficulty-pill-btn ${filter === btn.id ? "active" : ""}`}
              style={{
                background: filter === btn.id ? "var(--primary-green)" : "var(--bg-card)",
                color: filter === btn.id ? "white" : "var(--text-muted)",
                border: "1px solid var(--border-color)",
                padding: "6px 14px",
              }}
              onClick={() => setFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ListFilter size={15} color="var(--text-muted)" />
          <select
            className="form-select"
            style={{ padding: "6px 12px", fontSize: "12px" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="dashboard-card">
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
            <CheckCircle2 size={36} color="var(--primary-green)" style={{ margin: "0 auto 10px" }} />
            <h4>No tasks found in this view!</h4>
            <p style={{ fontSize: "12px", marginTop: "4px" }}>All caught up or try switching filters.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  background: task.done ? "var(--bg-subtle)" : "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`task-checkbox-custom ${task.done ? "checked" : ""}`}>
                    {task.done && <Check size={12} strokeWidth={3} />}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "700",
                        textDecoration: task.done ? "line-through" : "none",
                        color: task.done ? "var(--text-muted)" : "var(--text-heading)",
                      }}
                    >
                      {task.title}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px", fontSize: "10.5px" }}>
                      <span className="search-badge" style={{ background: "#edf3ec", color: "var(--primary-green)" }}>
                        {task.category || "General"}
                      </span>
                      {task.priority && (
                        <span
                          className="search-badge"
                          style={{
                            background: task.priority === "High" ? "#fee2e2" : "#fef3c7",
                            color: task.priority === "High" ? "#dc2626" : "#d97706",
                          }}
                        >
                          {task.priority} Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="task-time-chip">
                    <Clock size={11} />
                    <span>{task.time}</span>
                  </div>
                  <button
                    className="action-icon-btn"
                    style={{ width: "32px", height: "32px", color: "var(--primary-green)" }}
                    title="Edit task"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTask(task);
                    }}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    className="action-icon-btn"
                    style={{ width: "32px", height: "32px", color: "#dc2626" }}
                    title="Delete task"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          task={editingTask}
          onSaveTask={(id, updates) => {
            if (onEditTask) onEditTask(id, updates);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
