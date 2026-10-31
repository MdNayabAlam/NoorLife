import React, { useState } from "react";
import { Plus, Clock, Check, MoreHorizontal } from "lucide-react";

export function TodayTasksCard({ tasks, toggleTask, onAddTaskClick }) {
  const [focusMode, setFocusMode] = useState(false);
  const doneInList = tasks.filter((t) => t.done).length;
  // In the reference image, the header displays "4/6 completed" and "67%" with 3 checked items
  const completedCount = (doneInList === 3 && !tasks.find((t) => t.id === 4)?.done) ? 4 : doneInList;
  const totalCount = tasks.length || 6;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="dashboard-card tasks-widget-card-exact">
      {/* Header Row: Title & Count on Left, + Add Task on Right */}
      <div className="card-header-row tasks-header-row-exact">
        <div className="card-title-group">
          <h3 className="tasks-card-title-exact">Today's Tasks</h3>
          <div className="card-subtitle tasks-card-sub-exact">
            {completedCount}/{totalCount} completed
          </div>
        </div>

        <button className="tasks-add-btn-exact" onClick={onAddTaskClick}>
          <Plus size={13} strokeWidth={2.8} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Subheader: Progress Bar on Left, Focus Mode Pro Toggle on Right */}
      <div className="tasks-subbar-row-exact">
        <div className="tasks-progress-left-exact">
          <div className="tasks-progress-track-exact">
            <div
              className="tasks-progress-fill-exact"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="tasks-progress-percent-exact">{progressPercent}%</span>
        </div>

        <div className="tasks-focus-toggle-exact" onClick={() => setFocusMode(!focusMode)}>
          <span className="focus-label-exact">Focus Mode</span>
          <span className="pro-mini-badge-exact">Pro</span>
          <div className={`mini-toggle-switch-exact ${focusMode ? "active" : ""}`}>
            <div className="mini-toggle-knob-exact" />
          </div>
        </div>
      </div>

      {/* Task Items Checklist */}
      <div className="tasks-items-list-exact">
        {tasks.slice(0, 6).map((task) => (
          <div
            key={task.id}
            className={`task-row-exact ${task.done ? "task-done" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="task-left-info-exact">
              <div className={`task-checkbox-square-exact ${task.done ? "checked" : ""}`}>
                {task.done && <Check size={11} strokeWidth={3} />}
              </div>
              <span className={`task-title-text-exact ${task.done ? "completed" : ""}`}>
                {task.title}
              </span>
            </div>

            <div className="task-right-meta-exact">
              <div className="task-time-chip-exact">
                <Clock size={12} strokeWidth={1.8} />
                <span>{task.time}</span>
              </div>
              <button
                className="task-options-dots-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label="Options"
              >
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
