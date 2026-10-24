import React from "react";

export function QuranTrackerWidget({ quranData, onOpenGoalModal }) {
  const percent = Math.round((quranData.currentPage / quranData.totalPages) * 100);

  return (
    <div className="quran-widget">
      <div className="card-header-row" style={{ marginBottom: "6px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-heading)" }}>
          Quran Tracker
        </h3>
        <button className="card-text-link" onClick={onOpenGoalModal}>
          Set Goal
        </button>
      </div>

      <div className="quran-progress-row">
        <img
          src="/images/quran_book.jpg"
          alt="Holy Quran Cover"
          className="quran-book-img"
        />
        <div className="quran-details-col">
          <div className="quran-surah-title">{quranData.currentSurah}</div>
          <div className="quran-page-sub">
            Page {quranData.currentPage}/{quranData.totalPages}
          </div>

          <div className="quran-progress-track">
            <div
              className="quran-progress-bar"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3px" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#2a7c4f" }}>
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
