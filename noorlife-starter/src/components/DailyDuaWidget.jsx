import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Copy, Volume2, Check } from "lucide-react";

export function DailyDuaWidget({ duas, onViewAllDuas, showToast }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);

  const currentDua = duas[currentIndex] || duas[0];

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % duas.length);
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + duas.length) % duas.length);
  }

  function handleCopy() {
    const textToCopy = `${currentDua.arabic}\n\n${currentDua.transliteration}\n\n${currentDua.translation} — ${currentDua.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    if (showToast) showToast("Dua copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePlayAudio() {
    if (playing) return;
    setPlaying(true);
    if (showToast) showToast("Playing Dua recitation audio 🔊");

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentDua.arabic);
      utterance.lang = "ar-SA";
      utterance.rate = 0.85;
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlaying(false), 2000);
    }
  }

  return (
    <div className="dua-widget">
      <div className="card-header-row" style={{ marginBottom: "8px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-heading)" }}>
          Daily Dua
        </h3>
        <button className="card-text-link" onClick={onViewAllDuas}>
          See All
        </button>
      </div>

      <div className="dua-arabic-card">
        <div className="dua-arabic-text">{currentDua.arabic}</div>
        <div className="dua-translit">{currentDua.transliteration}</div>
        <div className="dua-translation">{currentDua.translation}</div>
      </div>

      <div className="dua-footer-actions">
        <div className="dua-pagination">
          <button className="icon-action-btn-sm" onClick={handlePrev} aria-label="Previous dua">
            <ChevronLeft size={14} />
          </button>
          <span>
            {currentIndex + 1} / {duas.length}
          </span>
          <button className="icon-action-btn-sm" onClick={handleNext} aria-label="Next dua">
            <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="icon-action-btn-sm"
            onClick={handleCopy}
            title="Copy Dua"
            aria-label="Copy dua"
          >
            {copied ? <Check size={13} color="#2a7c4f" /> : <Copy size={13} />}
          </button>

          <button
            className="icon-action-btn-sm"
            onClick={handlePlayAudio}
            title="Listen to pronunciation"
            aria-label="Listen audio"
            style={{ color: playing ? "var(--primary-green)" : "" }}
          >
            <Volume2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
