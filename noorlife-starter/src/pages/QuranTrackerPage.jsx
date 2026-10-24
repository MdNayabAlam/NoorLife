import React, { useState } from "react";
import { BookMarked, Search, Plus, CheckCircle2, Clock } from "lucide-react";
import { surahsList, defaultQuranProgress } from "../data/quranData";

export function QuranTrackerPage({ quranProgress, onUpdateProgress, onOpenGoalModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [readingLog, setReadingLog] = useState(defaultQuranProgress.readingHistory);
  const [pagesInput, setPagesInput] = useState("");
  const [surahInput, setSurahInput] = useState("Surah Al-Baqarah");

  const filteredSurahs = surahsList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.arabic.includes(searchTerm) ||
      s.englishTranslation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const percent = Math.round((quranProgress.currentPage / quranProgress.totalPages) * 100);

  function handleLogReading(e) {
    e.preventDefault();
    if (!pagesInput || Number(pagesInput) <= 0) return;
    const added = Number(pagesInput);
    const newPage = Math.min(quranProgress.currentPage + added, quranProgress.totalPages);

    const newLogItem = {
      date: "Today",
      pagesRead: added,
      surah: surahInput,
    };

    setReadingLog([newLogItem, ...readingLog]);
    onUpdateProgress({
      ...quranProgress,
      currentPage: newPage,
    });
    setPagesInput("");
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Holy Quran Reading Tracker</h2>
          <p>Track your daily Tilawat, set Khatam completion goals, and reflect on the verses.</p>
        </div>
        <button className="card-action-btn-green" onClick={onOpenGoalModal}>
          <span>Set Khatam Goal</span>
        </button>
      </div>

      {/* Progress & Quick Log Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "20px" }}>
        {/* Current Reading Status Card */}
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <img
              src="/images/quran_book.jpg"
              alt="Quran Book"
              style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
            />
            <div style={{ flex: 1 }}>
              <span className="search-badge" style={{ background: "#e8f5ec", color: "#2a7c4f" }}>
                Current Progress
              </span>
              <h3 style={{ fontSize: "18px", color: "var(--text-heading)", marginTop: "4px" }}>
                {quranProgress.currentSurah}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Page {quranProgress.currentPage} of {quranProgress.totalPages}
              </p>

              <div style={{ height: "8px", background: "#edf2ec", borderRadius: "999px", overflow: "hidden", margin: "10px 0 4px" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${percent}%`,
                    background: "var(--primary-green)",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)" }}>
                <span>{percent}% Completed</span>
                <span>{quranProgress.totalPages - quranProgress.currentPage} pages left</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Log Form */}
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px", color: "var(--text-heading)" }}>
            Log Today's Tilawat Reading
          </h4>
          <form onSubmit={handleLogReading} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="form-group">
                <label className="form-label">Surah / Portion</label>
                <input
                  type="text"
                  className="form-input"
                  value={surahInput}
                  onChange={(e) => setSurahInput(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pages Read Today</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="form-input"
                  placeholder="e.g. 5"
                  value={pagesInput}
                  onChange={(e) => setPagesInput(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="card-action-btn-green" style={{ width: "100%", padding: "10px" }}>
              Update Quran Progress
            </button>
          </form>
        </div>
      </div>

      {/* Surahs Directory */}
      <div className="dashboard-card" style={{ padding: "20px" }}>
        <div className="card-header-row" style={{ flexWrap: "wrap", gap: "10px" }}>
          <h3>Surahs of the Holy Quran</h3>
          <div className="header-search-box" style={{ maxWidth: "260px" }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Search Surah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header-search-input"
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {filteredSurahs.map((surah) => (
            <div
              key={surah.number}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "#e8f5ec",
                    color: "var(--primary-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                  }}
                >
                  {surah.number}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-heading)" }}>
                    {surah.name}
                  </div>
                  <div style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                    {surah.verses} Verses • {surah.revelation}
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: "var(--font-arabic)", fontSize: "17px", color: "var(--primary-green)" }}>
                {surah.arabic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
