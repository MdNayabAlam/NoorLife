import React from "react";
import { Plus, Clock, Check } from "lucide-react";

export function TodayTasksCard({ tasks, toggleTask, onAddTaskClick }) {
  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="dashboard-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <h3>Today's Tasks</h3>
          <div className="card-subtitle">
            {completedCount}/{totalCount} completed
          </div>
        </div>
        <button className="card-action-btn-green" onClick={onAddTaskClick}>
          <Plus size={13} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "5px", background: "#edf2ec", borderRadius: "999px", overflow: "hidden", marginBottom: "12px" }}>
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "#2a7c4f",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Task Items Checklist */}
      <div className="task-items-container">
        {tasks.slice(0, 6).map((task) => (
          <div
            key={task.id}
            className="task-item-row"
            onClick={() => toggleTask(task.id)}
          >
            <div className="task-checkbox-label">
              <div className={`task-checkbox-custom ${task.done ? "checked" : ""}`}>
                {task.done && <Check size={12} strokeWidth={3} />}
              </div>
              <span className={`task-title-text ${task.done ? "completed" : ""}`}>
                {task.title}
              </span>
            </div>
            <div className="task-time-chip">
              <Clock size={11} />
              <span>{task.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
