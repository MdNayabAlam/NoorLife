import React, { useState } from "react";
import { Heart, Copy, Volume2, Check, Bookmark, BookOpen } from "lucide-react";
import { dailyDuasData } from "../data/initialData";

export function DailyDeenPage({ showToast }) {
  const [duas, setDuas] = useState(dailyDuasData);
  const [favorites, setFavorites] = useState([1]);
  const [copiedId, setCopiedId] = useState(null);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (showToast) showToast(favorites.includes(id) ? "Removed from bookmarks" : "Saved to bookmarks! 🌟");
  }

  function handleCopy(dua) {
    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}\n[Source: ${dua.source}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    if (showToast) showToast("Dua copied to clipboard! 📋");
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handlePlayAudio(arabicText) {
    if ("speechSynthesis" in window) {
      if (showToast) showToast("Playing audio recitation 🔊");
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = "ar-SA";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Daily Deen & Masnoon Duas</h2>
          <p>Authentic Quranic and Prophetic supplications with verified references and audio.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {duas.map((dua) => {
          const isFav = favorites.includes(dua.id);
          return (
            <div key={dua.id} className="dashboard-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div>
                  <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309" }}>
                    {dua.source}
                  </span>
                  <h3 style={{ fontSize: "17px", color: "var(--text-heading)", marginTop: "4px" }}>
                    {dua.title}
                  </h3>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="icon-action-btn-sm"
                    title={isFav ? "Remove bookmark" : "Bookmark"}
                    onClick={() => toggleFavorite(dua.id)}
                  >
                    <Bookmark size={14} fill={isFav ? "#c6a256" : "none"} color="#c6a256" />
                  </button>

                  <button
                    className="icon-action-btn-sm"
                    title="Copy Dua"
                    onClick={() => handleCopy(dua)}
                  >
                    {copiedId === dua.id ? <Check size={14} color="#2a7c4f" /> : <Copy size={14} />}
                  </button>

                  <button
                    className="icon-action-btn-sm"
                    title="Play Audio"
                    onClick={() => handlePlayAudio(dua.arabic)}
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
              </div>

              {/* Arabic Box */}
              <div
                style={{
                  background: "#fcfbf7",
                  border: "1px solid #f2ede0",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-arabic)",
                    fontSize: "26px",
                    color: "var(--primary-green)",
                    lineHeight: "1.7",
                    direction: "rtl",
                    marginBottom: "8px",
                  }}
                >
                  {dua.arabic}
                </div>
                <div style={{ fontSize: "12.5px", color: "#8c7648", fontWeight: "600", fontStyle: "italic" }}>
                  {dua.transliteration}
                </div>
              </div>

              <div>
                <p style={{ fontSize: "13.5px", color: "var(--text-heading)", lineHeight: "1.5" }}>
                  "{dua.translation}"
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>
                  💡 <strong>Context:</strong> {dua.context}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
