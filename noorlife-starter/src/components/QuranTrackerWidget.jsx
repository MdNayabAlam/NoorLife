import React from "react";

export function QuranTrackerWidget({ quranData, onOpenGoalModal, onNavigateToQuran }) {
  const percent = Math.round((quranData.currentPage / quranData.totalPages) * 100);

  return (
    <div className="quran-widget">
      <div className="card-header-row" style={{ marginBottom: "6px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-heading)" }}>
          Quran & Juz 30
        </h3>
        <button className="card-text-link" onClick={onOpenGoalModal}>
          Set Goal
        </button>
      </div>

      <div className="quran-progress-row" style={{ cursor: onNavigateToQuran ? "pointer" : "default" }} onClick={onNavigateToQuran}>
        <img
          src="/images/quran_book.jpg"
          alt="Holy Quran Cover"
          className="quran-book-img"
        />
        <div className="quran-details-col">
          <div className="quran-surah-title">{quranData.currentSurah || "Juz 30 (Para 30)"}</div>
          <div className="quran-page-sub">
            Page {quranData.currentPage}/{quranData.totalPages}
          </div>

          <div className="quran-progress-track">
            <div
              className="quran-progress-bar"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3px" }}>
            <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>Tilawat Progress</span>
            <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#2a7c4f" }}>
              {percent}%
            </span>
          </div>
        </div>
      </div>

      {onNavigateToQuran && (
        <button
          onClick={onNavigateToQuran}
          className="card-action-btn-green"
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "7px 12px",
            fontSize: "11px",
            borderRadius: "var(--radius-pill)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)",
          }}
        >
          <span>Read 30th Para (Juz 'Amma)</span>
          <span style={{ fontSize: "12px" }}>📖</span>
        </button>
      )}
    </div>
  );
}
