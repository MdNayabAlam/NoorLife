import React, { useState } from "react";
import { X, BookOpen } from "lucide-react";
import { QURAN_30_PARAS } from "../../data/quran30ParasData";

export function QuranGoalModal({ isOpen, onClose, currentData, onUpdateGoal }) {
  const [page, setPage] = useState(currentData.currentPage || 21);
  const [dailyGoal, setDailyGoal] = useState(currentData.dailyGoalPages || 4);
  const [surah, setSurah] = useState(currentData.currentSurah || "Para 1: Alif-Lam-Meem (الم)");

  if (!isOpen) return null;

  const totalPages = currentData.totalPages || 604;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateGoal({
      ...currentData,
      currentPage: Number(page),
      dailyGoalPages: Number(dailyGoal),
      currentSurah: surah,
      totalPages: 604
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Set 30 Paras Quran Reading Goal</h3>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Current Reading Para (पारा)</label>
              <select
                className="form-select"
                value={surah}
                onChange={(e) => setSurah(e.target.value)}
                style={{ fontWeight: "700" }}
              >
                {QURAN_30_PARAS.map((p) => (
                  <option key={p.number} value={`Para ${p.number}: ${p.name} (${p.arabic})`}>
                    Para {p.number}: {p.name} ({p.arabic}) — {p.surahRange}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">Current Page (out of 604)</label>
                <input
                  type="number"
                  min="1"
                  max="604"
                  className="form-input"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Daily Target (Pages / Day)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="form-input"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ background: "var(--bg-subtle)", padding: "12px", borderRadius: "var(--radius-md)", fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.5" }}>
              💡 <strong>Khatam Estimation:</strong> At {dailyGoal} pages per day, you will complete the remaining {Math.max(0, totalPages - page)} pages in approximately <strong>{Math.ceil(Math.max(0, totalPages - page) / (Number(dailyGoal) || 1))} days</strong>!
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
              Save Progress Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
