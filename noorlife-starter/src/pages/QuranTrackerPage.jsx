import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen, Clock, CheckCircle2, Bookmark, ArrowRight,
  Sparkles, Check, Flame, Calendar, Award, Target, Plus, Search
} from "lucide-react";
import confetti from "canvas-confetti";
import { QURAN_30_PARAS } from "../data/quran30ParasData";
import { defaultQuranProgress } from "../data/quranData";

export function QuranTrackerPage({
  quranProgress,
  onUpdateProgress,
  onOpenGoalModal,
  onNavigateReader,
  showToast
}) {
  const [pagesInput, setPagesInput] = useState("");
  const [paraInput, setParaInput] = useState("Para 1: Alif-Lam-Meem (الم)");
  const [notesInput, setNotesInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [readingLog, setReadingLog] = useState(
    quranProgress?.readingHistory || defaultQuranProgress.readingHistory
  );

  // Sync completed Paras from localStorage
  const [completedParas, setCompletedParas] = useState(() => {
    try {
      const saved = localStorage.getItem("noorlife_completed_paras");
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  useEffect(() => {
    localStorage.setItem("noorlife_completed_paras", JSON.stringify(completedParas));
  }, [completedParas]);

  const currentPage = quranProgress?.currentPage || 21;
  const totalPages = quranProgress?.totalPages || 604;
  const percent = Math.min(100, Math.round((currentPage / totalPages) * 100));
  const pagesLeft = Math.max(0, totalPages - currentPage);
  const dailyTarget = quranProgress?.dailyGoalPages || quranProgress?.dailyGoal || 4;
  const daysToKhatam = Math.ceil(pagesLeft / Math.max(dailyTarget, 1));

  // Estimate target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysToKhatam);
  const formattedTargetDate = targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Toggle completion of a Para directly from tracker
  const handleTogglePara = (paraNum, e) => {
    if (e) e.stopPropagation();
    if (completedParas.includes(paraNum)) {
      setCompletedParas((prev) => prev.filter((n) => n !== paraNum));
      if (showToast) showToast(`Para ${paraNum} marked as pending.`);
    } else {
      setCompletedParas((prev) => [...prev, paraNum]);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      if (showToast) showToast(`MashaAllah! Para ${paraNum} marked as completed! 🎉`);
    }
  };

  const handleLogReading = (e) => {
    e.preventDefault();
    if (!pagesInput || Number(pagesInput) <= 0) return;
    const added = Number(pagesInput);
    const newPage = Math.min(currentPage + added, totalPages);

    const newLogItem = {
      date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      pagesRead: added,
      surah: paraInput,
      notes: notesInput.trim() || "Daily Khatam Tilawat",
    };

    const updatedHistory = [newLogItem, ...(readingLog || [])];
    setReadingLog(updatedHistory);

    if (onUpdateProgress) {
      onUpdateProgress({
        ...quranProgress,
        currentPage: newPage,
        currentSurah: paraInput,
        notes: notesInput.trim(),
        readingHistory: updatedHistory,
      });
    }

    setPagesInput("");
    setNotesInput("");
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    if (showToast) showToast(`Logged ${added} pages in Quran Tilawat! 📖`);
  };

  // Filter 30 Paras
  const filteredParas = useMemo(() => {
    if (!searchQuery.trim()) return QURAN_30_PARAS;
    const q = searchQuery.toLowerCase();
    return QURAN_30_PARAS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.arabic.includes(searchQuery) ||
        p.surahRange.toLowerCase().includes(q) ||
        String(p.number) === q
    );
  }, [searchQuery]);

  return (
    <div className="center-content-area" style={{ maxWidth: "100%", paddingBottom: "60px" }}>
      {/* Top Main Page Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "22px" }}>📊</span>
            <h2 style={{ margin: 0 }}>Quran Khatam Tracker & Tilawat Log</h2>
            <span
              style={{
                background: "var(--accent-cream)",
                color: "var(--primary-green)",
                border: "1px solid var(--border-color)",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "800"
              }}
            >
              30 Paras Khatam Goal
            </span>
          </div>
          <p>
            Track your daily recitation, log pages, calculate Khatam completion date across all 30 Paras of the Holy Quran.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {onNavigateReader && (
            <button
              className="card-action-btn-green"
              onClick={() => onNavigateReader(1)}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <BookOpen size={15} color="var(--primary-green)" />
              <span>Open Quran Reader (30 Paras)</span>
            </button>
          )}

          <button className="card-action-btn-green" onClick={onOpenGoalModal}>
            <Target size={15} />
            <span>Edit Khatam Goal</span>
          </button>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "18px",
        }}
      >
        <div className="dashboard-card" style={{ padding: "16px 20px", borderLeft: "4px solid var(--primary-green)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>CURRENT PROGRESS</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-heading)", marginTop: "2px" }}>
            Page {currentPage} <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>/ {totalPages}</span>
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--primary-green)", fontWeight: "700", marginTop: "2px" }}>
            {percent}% Completed of Holy Quran
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "16px 20px", borderLeft: "4px solid #b45309" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>PAGES REMAINING</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#b45309", marginTop: "2px" }}>
            {pagesLeft} <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>pages</span>
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
            ~{daysToKhatam} days at current pace
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "16px 20px", borderLeft: "4px solid #2a9d8f" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>DAILY TILAWAT GOAL</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#2a9d8f", marginTop: "2px" }}>
            {dailyTarget} <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>pages / day</span>
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
            Est. Khatam: {formattedTargetDate}
          </div>
        </div>

        <div className="dashboard-card" style={{ padding: "16px 20px", borderLeft: "4px solid #c6a256" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>PARAS COMPLETED (पारे मुकम्मल)</div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#c6a256", marginTop: "2px" }}>
            {completedParas.length} <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>/ 30 Paras</span>
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--primary-green)", fontWeight: "700", marginTop: "2px" }}>
            MashaAllah Keep Going! 🌿
          </div>
        </div>
      </div>

      {/* Progress & Quick Log Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "20px", marginBottom: "20px" }}>
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
                30 Paras Khatam Tracker
              </span>
              <h3 style={{ fontSize: "18px", color: "var(--text-heading)", marginTop: "4px" }}>
                {quranProgress?.currentSurah || "Para 1: Alif-Lam-Meem (الم)"}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Page {currentPage} of {totalPages} • {completedParas.length} of 30 Paras Read
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
                <span>{pagesLeft} pages left</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <button className="card-action-btn-green" onClick={onOpenGoalModal} style={{ fontSize: "12px", padding: "6px 14px" }}>
              <span>Edit Khatam Goal</span>
            </button>
            {onNavigateReader && (
              <button
                className="secondary-btn"
                onClick={() => onNavigateReader(1)}
                style={{ fontSize: "12px", padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <span>Open Quran Reader (30 Paras)</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Log Form */}
        <div className="dashboard-card" style={{ padding: "20px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px", color: "var(--text-heading)" }}>
            Log Today's Tilawat Reading
          </h4>
          <form onSubmit={handleLogReading} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "10px" }}>
              <div className="form-group">
                <label className="form-label">Para / Portion (पारा चुनिए)</label>
                <select
                  className="form-select"
                  value={paraInput}
                  onChange={(e) => setParaInput(e.target.value)}
                  style={{ fontWeight: "700" }}
                >
                  {QURAN_30_PARAS.map((p) => (
                    <option key={p.number} value={`Para ${p.number}: ${p.name} (${p.arabic})`}>
                      Para {p.number}: {p.name} ({p.arabic})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Pages Read Today</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="form-input"
                  placeholder="e.g. 4"
                  value={pagesInput}
                  onChange={(e) => setPagesInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tadabbur / Reflection Notes (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Recited with Hinglish pronunciation and Urdu tarjuma."
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
              />
            </div>

            <button type="submit" className="card-action-btn-green" style={{ width: "100%", padding: "10px", fontWeight: "700" }}>
              Log Reading & Update Progress
            </button>
          </form>
        </div>
      </div>

      {/* READING HISTORY TIMELINE */}
      <div className="dashboard-card" style={{ padding: "22px", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-heading)", marginBottom: "14px" }}>
          Recent Tilawat Reading History
        </h3>

        {(!readingLog || readingLog.length === 0) ? (
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            No reading entries yet. Log your first reading above!
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {readingLog.slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      background: "rgba(27, 67, 50, 0.1)",
                      color: "var(--primary-green)",
                      padding: "4px 8px",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {item.date}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-heading)" }}>
                      {item.surah} • <span style={{ color: "var(--primary-green)" }}>+{item.pagesRead} pages</span>
                    </div>
                    {item.notes && (
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {item.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: "11px", color: "var(--primary-green)", fontWeight: "700" }}>
                  ✓ Completed
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALL 30 PARAS DIRECTORY (Replacing old 37 Surahs of Juz 30) */}
      <div className="dashboard-card" style={{ padding: "22px" }}>
        <div className="card-header-row" style={{ flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", margin: 0 }}>
                All 30 Paras of Holy Quran (सारे 30 पारे / ۳۰ پارے)
              </h3>
              <span
                style={{
                  background: "var(--accent-cream)",
                  color: "var(--primary-green)",
                  border: "1px solid var(--border-color)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "800"
                }}
              >
                Full Quran Directory
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "4px 0 0" }}>
              Click on any Para to open it directly in the Indo-Pak Tajweed & Hinglish Reader, or mark it as complete.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "12.5px", color: "var(--primary-green)", fontWeight: "800" }}>
              {completedParas.length} of 30 Paras Read
            </div>

            <div style={{ position: "relative", minWidth: "220px" }}>
              <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: "30px", height: "36px", fontSize: "12px" }}
                placeholder="Search Para name, number or Surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 30 Paras Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "12px" }}>
          {filteredParas.map((para) => {
            const isCompleted = completedParas.includes(para.number);

            return (
              <div
                key={para.number}
                onClick={() => {
                  if (onNavigateReader) {
                    onNavigateReader(para.number);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: isCompleted ? "var(--accent-cream)" : "var(--bg-subtle)",
                  border: isCompleted ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
                className="hover-card"
              >
                <div>
                  {/* Card Top Row: Number & Arabic Name */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "8px",
                          background: isCompleted ? "var(--primary-green)" : "var(--bg-card)",
                          color: isCompleted ? "#ffffff" : "var(--primary-green)",
                          border: isCompleted ? "none" : "1.5px solid var(--border-color)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11.5px",
                          fontWeight: "800",
                        }}
                      >
                        P-{para.number}
                      </div>

                      <div>
                        <div style={{ fontSize: "14.5px", fontWeight: "800", color: "var(--text-heading)" }}>
                          {para.name}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontFamily: "var(--font-arabic)", fontSize: "20px", color: "var(--primary-green)", direction: "rtl" }}>
                      {para.arabic}
                    </div>
                  </div>

                  {/* Surah Coverage */}
                  <div style={{ fontSize: "11.5px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "4px" }}>
                    {para.surahRange}
                  </div>

                  {/* Summary / Description */}
                  <p style={{ fontSize: "11.5px", color: "var(--text-main)", margin: "0 0 10px", lineHeight: "1.4" }}>
                    {para.description}
                  </p>
                </div>

                {/* Card Bottom Row: Metadata & Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px dashed var(--border-color)",
                    paddingTop: "8px",
                    marginTop: "4px",
                  }}
                >
                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)", fontWeight: "600" }}>
                    {para.ayahsCount} Ayahs • {para.rukusCount} Rukus
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      onClick={(e) => handleTogglePara(para.number, e)}
                      style={{
                        background: isCompleted ? "var(--primary-green)" : "var(--bg-card)",
                        color: isCompleted ? "#fff" : "var(--text-muted)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "14px",
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px"
                      }}
                      title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                    >
                      <Check size={11} strokeWidth={3} />
                      <span>{isCompleted ? "Read" : "Mark"}</span>
                    </button>

                    <button
                      className="card-action-btn-green"
                      style={{ padding: "4px 10px", fontSize: "11px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigateReader) onNavigateReader(para.number);
                      }}
                    >
                      <span>Read</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
