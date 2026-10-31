import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  BookOpen, Search, Volume2, VolumeX, Play, Pause, CheckCircle2, Bookmark,
  Copy, ChevronLeft, ChevronRight, Type, Eye, ArrowRight,
  RotateCcw, Sparkles, Check, Clock, Headphones, List, Grid,
  FastForward, Rewind, Info, ExternalLink, SlidersHorizontal, Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  QURAN_30_PARAS,
  QURAN_RECITERS,
  TAJWEED_LEGEND,
  getParaAudioUrl
} from "../data/quran30ParasData";
import {
  fetchParaAyahs,
  groupAyahsByPage,
  renderTajweedHtml
} from "../services/quranService";

export function QuranReaderPage({ targetPara, onNavigateTracker, showToast }) {
  // Active Para & View States
  const [selectedParaNumber, setSelectedParaNumber] = useState(() => {
    if (targetPara && targetPara >= 1 && targetPara <= 30) return Number(targetPara);
    try {
      const saved = localStorage.getItem("noorlife_active_para");
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    if (targetPara && targetPara >= 1 && targetPara <= 30) {
      setSelectedParaNumber(Number(targetPara));
    }
  }, [targetPara]);

  useEffect(() => {
    localStorage.setItem("noorlife_active_para", selectedParaNumber);
  }, [selectedParaNumber]);

  const [activeView, setActiveView] = useState("mushaf"); // "mushaf" | "study" | "directory"
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState("large"); // "medium" | "large" | "xlarge"

  // Ayah Display Toggles (Specially for Hinglish & Urdu/Hindi)
  const [showArabic, setShowArabic] = useState(true);
  const [showHinglish, setShowHinglish] = useState(true);
  const [showUrduHinglish, setShowUrduHinglish] = useState(true);
  const [showHindiScript, setShowHindiScript] = useState(true);
  const [showTajweedColor, setShowTajweedColor] = useState(true);
  const [showPageHinglishHelper, setShowPageHinglishHelper] = useState(true);

  // Data Loading State
  const [ayahs, setAyahs] = useState([]);
  const [isLoadingAyahs, setIsLoadingAyahs] = useState(false);

  // Audio Playback States (Listen Tilawat)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedReciterId, setSelectedReciterId] = useState("alafasy");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef(null);

  // Bookmarks & Completed Paras Persistence
  const [completedParas, setCompletedParas] = useState(() => {
    try {
      const saved = localStorage.getItem("noorlife_completed_paras");
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [bookmarkedVerses, setBookmarkedVerses] = useState(() => {
    try {
      const saved = localStorage.getItem("noorlife_bookmarked_verses");
      return saved ? JSON.parse(saved) : ["1:1", "2:255"];
    } catch {
      return ["1:1", "2:255"];
    }
  });

  // Current Para Metadata
  const currentPara = useMemo(() => {
    return QURAN_30_PARAS.find((p) => p.number === selectedParaNumber) || QURAN_30_PARAS[0];
  }, [selectedParaNumber]);

  // Load Ayahs whenever selectedParaNumber changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingAyahs(true);

    fetchParaAyahs(selectedParaNumber)
      .then((data) => {
        if (!isCancelled) {
          setAyahs(data);
          setIsLoadingAyahs(false);
          // Set initial page from the first ayah of this para
          if (data && data.length > 0) {
            setActivePage(data[0].page || 1);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch ayahs:", err);
        if (!isCancelled) {
          setIsLoadingAyahs(false);
          if (showToast) showToast("Online text loading failed. Para audio tilawat is ready to play!");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedParaNumber, showToast]);

  // Persist completed Paras & bookmarks
  useEffect(() => {
    localStorage.setItem("noorlife_completed_paras", JSON.stringify(completedParas));
  }, [completedParas]);

  useEffect(() => {
    localStorage.setItem("noorlife_bookmarked_verses", JSON.stringify(bookmarkedVerses));
  }, [bookmarkedVerses]);

  // Group ayahs by page for Mushaf View
  const pageMap = useMemo(() => {
    return groupAyahsByPage(ayahs);
  }, [ayahs]);

  const pageNumbers = useMemo(() => {
    return Object.keys(pageMap).map(Number).sort((a, b) => a - b);
  }, [pageMap]);

  // Current Page Ayahs
  const currentPageAyahs = useMemo(() => {
    return pageMap[activePage] || (ayahs.length > 0 ? ayahs.slice(0, 10) : []);
  }, [pageMap, activePage, ayahs]);

  // Audio URL for current Para
  const paraAudioUrl = useMemo(() => {
    return getParaAudioUrl(selectedParaNumber, selectedReciterId);
  }, [selectedParaNumber, selectedReciterId]);

  // Reset audio on Para change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [selectedParaNumber]);

  // Audio Handlers
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play error:", err);
          if (showToast) showToast("Connecting to Tilawat server... please wait a moment.");
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    const target = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration || 9999));
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatAudioTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Bookmark Toggle
  const toggleBookmark = (verseKey) => {
    if (bookmarkedVerses.includes(verseKey)) {
      setBookmarkedVerses((prev) => prev.filter((k) => k !== verseKey));
      if (showToast) showToast("Bookmark removed.");
    } else {
      setBookmarkedVerses((prev) => [...prev, verseKey]);
      if (showToast) showToast("Ayah saved to bookmarks! 📌");
    }
  };

  // Copy Ayah
  const handleCopyAyah = (verse) => {
    const text = `Surah ${verse.surahEnglish || currentPara.name} (${verse.surahNumber}:${verse.numberInSurah})\n${verse.arabic}\nTalaffuz (Hinglish): ${verse.transliteration}\nTarjuma: ${verse.urdu || verse.hindi}\n— NoorLife Quran 30 Paras`;
    navigator.clipboard.writeText(text);
    if (showToast) showToast(`Ayah ${verse.numberInSurah} copied to clipboard! ✨`);
  };

  // Mark Para as Read
  const handleMarkParaCompleted = () => {
    if (!completedParas.includes(currentPara.number)) {
      setCompletedParas((prev) => [...prev, currentPara.number]);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
      if (showToast) showToast(`MashaAllah! Para ${currentPara.number} (${currentPara.name}) marked as complete! 🎉`);
    } else {
      setCompletedParas((prev) => prev.filter((n) => n !== currentPara.number));
      if (showToast) showToast(`Para ${currentPara.number} unmarked.`);
    }
  };

  // Navigate Para
  const changePara = (direction) => {
    if (direction === "next" && selectedParaNumber < 30) {
      setSelectedParaNumber((prev) => prev + 1);
    } else if (direction === "prev" && selectedParaNumber > 1) {
      setSelectedParaNumber((prev) => prev - 1);
    }
  };

  // Navigate Page in Mushaf View
  const changeMushafPage = (direction) => {
    const currentIndex = pageNumbers.indexOf(activePage);
    if (direction === "next" && currentIndex < pageNumbers.length - 1) {
      setActivePage(pageNumbers[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setActivePage(pageNumbers[currentIndex - 1]);
    }
  };

  // Filter Paras for Directory View
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

  // Font Size Settings
  const arabicFontSize = fontSize === "xlarge" ? "34px" : fontSize === "large" ? "28px" : "22px";
  const hinglishFontSize = fontSize === "xlarge" ? "16.5px" : fontSize === "large" ? "14.5px" : "13px";

  // Check if current page is the first page of a Surah (to display ornate Surah box)
  const isFirstSurahAyahOnPage = currentPageAyahs.length > 0 && currentPageAyahs[0].numberInSurah === 1;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%", paddingBottom: "100px" }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={paraAudioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          if (showToast) showToast(`Tilawat of Para ${currentPara.number} complete! MashaAllah 🌿`);
        }}
        preload="metadata"
      />

      {/* Top Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "22px" }}>📖</span>
            <h2 style={{ margin: 0 }}>Holy Quran • 30 Paras (सिपारा / پاره)</h2>
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
              All 30 Paras • Indo-Pak Tajweed & Hinglish
            </span>
          </div>
          <p>
            Har ek Para Arabic (Urbi) script, Roman Hinglish talaffuz (pronunciation) aur aasan tarjuma ke sath. Koi bhi asaani se padh aur sun sakta hai.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {onNavigateTracker && (
            <button
              className="card-action-btn-green"
              onClick={onNavigateTracker}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <Clock size={15} color="var(--primary-green)" />
              <span>Khatam Tracker</span>
            </button>
          )}

          <button
            onClick={togglePlayAudio}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: isPlaying ? "#e76f51" : "var(--primary-green)",
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              fontSize: "12px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
            }}
          >
            {isPlaying ? <Pause size={14} fill="#ffffff" /> : <Play size={14} fill="#ffffff" />}
            <span>{isPlaying ? "Pause Tilawat" : `Listen Para ${currentPara.number} Tilawat`}</span>
          </button>
        </div>
      </div>

      {/* 30 Paras Horizontal Quick Selector Bar */}
      <div
        className="dashboard-card"
        style={{
          padding: "12px 16px",
          background: "var(--bg-card)",
          marginBottom: "14px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--text-heading)" }}>
              Select Para (सिपारा):
            </span>
            <select
              className="form-select"
              value={selectedParaNumber}
              onChange={(e) => setSelectedParaNumber(Number(e.target.value))}
              style={{
                minWidth: "260px",
                fontWeight: "700",
                color: "var(--primary-green)",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-pill)"
              }}
            >
              {QURAN_30_PARAS.map((p) => (
                <option key={p.number} value={p.number}>
                  Para {p.number}: {p.name} ({p.arabic}) — {p.ayahsCount} Ayahs
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div style={{ display: "flex", background: "var(--bg-subtle)", padding: "3px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-color)" }}>
            <button
              onClick={() => setActiveView("mushaf")}
              style={{
                border: "none",
                padding: "5px 12px",
                borderRadius: "var(--radius-pill)",
                fontSize: "11.5px",
                fontWeight: activeView === "mushaf" ? "800" : "600",
                background: activeView === "mushaf" ? "var(--primary-green)" : "transparent",
                color: activeView === "mushaf" ? "#ffffff" : "var(--text-heading)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <BookOpen size={13} />
              <span>Mushaf Page (15-Lines)</span>
            </button>
            <button
              onClick={() => setActiveView("study")}
              style={{
                border: "none",
                padding: "5px 12px",
                borderRadius: "var(--radius-pill)",
                fontSize: "11.5px",
                fontWeight: activeView === "study" ? "800" : "600",
                background: activeView === "study" ? "var(--primary-green)" : "transparent",
                color: activeView === "study" ? "#ffffff" : "var(--text-heading)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <List size={13} />
              <span>Ayah-by-Ayah Study</span>
            </button>
            <button
              onClick={() => setActiveView("directory")}
              style={{
                border: "none",
                padding: "5px 12px",
                borderRadius: "var(--radius-pill)",
                fontSize: "11.5px",
                fontWeight: activeView === "directory" ? "800" : "600",
                background: activeView === "directory" ? "var(--primary-green)" : "transparent",
                color: activeView === "directory" ? "#ffffff" : "var(--text-heading)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <Grid size={13} />
              <span>All 30 Paras Directory</span>
            </button>
          </div>
        </div>

        {/* 30 Paras Number Tabs Strip */}
        <div
          style={{
            display: "flex",
            gap: "5px",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "thin"
          }}
        >
          {QURAN_30_PARAS.map((p) => {
            const isSelected = p.number === selectedParaNumber;
            const isDone = completedParas.includes(p.number);
            return (
              <button
                key={p.number}
                onClick={() => {
                  setSelectedParaNumber(p.number);
                  if (activeView === "directory") setActiveView("mushaf");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "5px 10px",
                  borderRadius: "10px",
                  border: isSelected ? "2px solid var(--primary-green)" : "1px solid var(--border-color)",
                  background: isSelected ? "var(--primary-green)" : "var(--bg-subtle)",
                  color: isSelected ? "#ffffff" : "var(--text-heading)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "62px",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "800" }}>P-{p.number}</span>
                  {isDone && <Check size={10} color={isSelected ? "#ffd700" : "#10b981"} strokeWidth={3} />}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-arabic)",
                    fontSize: "13px",
                    lineHeight: "1.2",
                    direction: "rtl"
                  }}
                >
                  {p.arabic}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: MUSHAF 15-LINE PAGE VIEW (As in the PDF) */}
      {activeView === "mushaf" && (
        <div>
          {/* Mushaf Page Controls & Top Toolbar */}
          <div
            className="dashboard-card"
            style={{
              padding: "12px 18px",
              background: "var(--bg-subtle)",
              marginBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            {/* Page navigation buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => changeMushafPage("prev")}
                disabled={pageNumbers.indexOf(activePage) <= 0}
                className="secondary-btn"
                style={{ padding: "6px 12px", fontSize: "11.5px" }}
              >
                <ChevronLeft size={14} />
                <span>Previous Page</span>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-heading)" }}>
                  Page:
                </span>
                <select
                  value={activePage}
                  onChange={(e) => setActivePage(Number(e.target.value))}
                  className="form-select"
                  style={{ minWidth: "90px", padding: "4px 8px", fontSize: "11.5px", fontWeight: "800" }}
                >
                  {pageNumbers.map((p, idx) => (
                    <option key={p} value={p}>
                      Page {idx + 1} ({p})
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>
                  of {pageNumbers.length || 21}
                </span>
              </div>

              <button
                onClick={() => changeMushafPage("next")}
                disabled={pageNumbers.indexOf(activePage) >= pageNumbers.length - 1}
                className="card-action-btn-green"
                style={{ padding: "6px 12px", fontSize: "11.5px" }}
              >
                <span>Next Page</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Display Toggles */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <button
                onClick={() => setShowTajweedColor(!showTajweedColor)}
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "5px 10px",
                  borderRadius: "var(--radius-pill)",
                  border: `1px solid ${showTajweedColor ? "var(--primary-green)" : "var(--border-color)"}`,
                  background: showTajweedColor ? "var(--accent-cream)" : "var(--bg-card)",
                  color: showTajweedColor ? "var(--primary-green)" : "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                Tajweed Colors
              </button>

              <button
                onClick={() => setShowPageHinglishHelper(!showPageHinglishHelper)}
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "5px 10px",
                  borderRadius: "var(--radius-pill)",
                  border: `1px solid ${showPageHinglishHelper ? "var(--primary-green)" : "var(--border-color)"}`,
                  background: showPageHinglishHelper ? "var(--accent-cream)" : "var(--bg-card)",
                  color: showPageHinglishHelper ? "var(--primary-green)" : "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                Hinglish Pronunciation & Meaning
              </button>
            </div>
          </div>

          {/* Mushaf 15-Line Ornate Frame (Matching Her Quran Academy / Indo-Pak Mushaf PDF) */}
          <div className="mushaf-outer-frame">
            <div className="mushaf-inner-frame">
              {/* Header inside frame */}
              <div className="mushaf-top-bar">
                <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#b8860b" }}>
                  NOORLIFE TAJWEED QURAN
                </div>

                <div className="mushaf-top-title">
                  <span style={{ fontFamily: "var(--font-arabic)", fontSize: "18px", marginLeft: "6px" }}>
                    {currentPara.arabic}
                  </span>{" "}
                  • PARA {currentPara.number} · {currentPara.name.toUpperCase()}
                </div>

                <div style={{ fontSize: "11.5px", fontWeight: "700", color: "#1b4332" }}>
                  {currentPageAyahs[0]?.surahEnglish || currentPara.startSurah}
                </div>
              </div>

              {/* Ornate Surah Box (shown if page starts with Surah or Ayah 1) */}
              {isFirstSurahAyahOnPage && (
                <div className="mushaf-surah-box">
                  <div className="mushaf-surah-meta-pill">
                    {currentPageAyahs[0]?.revelationType || "Makki"} • Surah #{currentPageAyahs[0]?.surahNumber}
                  </div>
                  <div className="mushaf-surah-name-ar">
                    {currentPageAyahs[0]?.surahName || "سُورَةُ الفَاتِحَةِ"}
                  </div>
                  <div className="mushaf-surah-meta-pill">
                    Ayat {currentPageAyahs[0]?.numberInSurah} • Ruku {currentPageAyahs[0]?.ruku || 1}
                  </div>
                </div>
              )}

              {/* Bismillah Banner (shown on Surah start) */}
              {isFirstSurahAyahOnPage && currentPageAyahs[0]?.surahNumber !== 9 && (
                <div className="mushaf-bismillah-banner">
                  <div className="mushaf-bismillah-ar">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </div>
                  <div className="mushaf-bismillah-trans">
                    Bismillaahir-Rahmaanir-Raheem (Shuru Allah ke naam se jo nihayat meharbaan, reham farmane wala hai)
                  </div>
                </div>
              )}

              {/* Loading State or Mushaf Text Flow */}
              {isLoadingAyahs ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <Sparkles size={24} color="var(--primary-green)" className="animate-spin" />
                  <p style={{ marginTop: "10px", fontWeight: "700" }}>Loading authentic Tajweed Mushaf text...</p>
                </div>
              ) : (
                <div className="mushaf-page-text-flow">
                  {currentPageAyahs.map((ayah) => {
                    const rawHtml = showTajweedColor
                      ? renderTajweedHtml(ayah.tajweed)
                      : ayah.arabic;

                    return (
                      <span key={ayah.number}>
                        <span dangerouslySetInnerHTML={{ __html: rawHtml }} />
                        <span className="mushaf-ayah-glyph">
                          {ayah.numberInSurah}
                        </span>{" "}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Footer Tajweed Legend matching the PDF page 23 */}
              <div className="mushaf-footer-legend">
                <div className="legend-tag-row">
                  {TAJWEED_LEGEND.map((t) => (
                    <span
                      key={t.key}
                      className="legend-item"
                      style={{ color: t.color, background: t.bg }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: t.color,
                          display: "inline-block"
                        }}
                      />
                      <span>{t.label}</span>
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: "11px", fontWeight: "800", color: "#b8860b" }}>
                  Page {activePage} • Para {currentPara.number}
                </div>
              </div>
            </div>

            {/* Optional Hinglish Helper Drawer (for people who cannot read Arabic) */}
            {showPageHinglishHelper && (
              <div className="mushaf-hinglish-box">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "14px" }}>🗣️</span>
                    <strong style={{ fontSize: "12px", color: "var(--primary-green)" }}>
                      Hinglish Padhne Ke Liye (रोमन उच्चारण व आसान तर्जुमा):
                    </strong>
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Page {activePage} ki aayatein
                  </span>
                </div>

                {currentPageAyahs.map((ayah) => (
                  <div key={ayah.number} className="mushaf-hinglish-ayah-item">
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                      <span
                        style={{
                          background: "var(--primary-green)",
                          color: "#fff",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10.5px",
                          fontWeight: "800"
                        }}
                      >
                        {ayah.numberInSurah}
                      </span>
                      <strong style={{ fontSize: "12px", color: "var(--primary-green)" }}>
                        {ayah.surahEnglish} (Ayah {ayah.numberInSurah}):
                      </strong>
                    </div>

                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-heading)", marginBottom: "3px" }}>
                      Talaffuz (Pronunciation): <span style={{ color: "#0d5c38" }}>{ayah.transliteration}</span>
                    </div>

                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      Tarjuma: {ayah.urdu || ayah.hindi}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Page Navigation Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
              maxWidth: "860px",
              marginRight: "auto",
              marginLeft: "auto"
            }}
          >
            <button
              onClick={() => changeMushafPage("prev")}
              disabled={pageNumbers.indexOf(activePage) <= 0}
              className="secondary-btn"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ChevronLeft size={16} />
              <span>Previous Page</span>
            </button>

            <button
              onClick={handleMarkParaCompleted}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: completedParas.includes(currentPara.number)
                  ? "var(--accent-cream)"
                  : "var(--bg-card)",
                color: completedParas.includes(currentPara.number)
                  ? "var(--primary-green)"
                  : "var(--text-heading)",
                border: "1px solid var(--border-color)",
                padding: "8px 16px",
                borderRadius: "var(--radius-pill)",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              <CheckCircle2
                size={15}
                color={completedParas.includes(currentPara.number) ? "var(--primary-green)" : "var(--text-muted)"}
              />
              <span>
                {completedParas.includes(currentPara.number) ? "Para Completed" : "Mark Para Complete"}
              </span>
            </button>

            <button
              onClick={() => changeMushafPage("next")}
              disabled={pageNumbers.indexOf(activePage) >= pageNumbers.length - 1}
              className="card-action-btn-green"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>Next Page</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: AYAH-BY-AYAH STUDY VIEW (With Full Hinglish Pronunciation & Meaning) */}
      {activeView === "study" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Controls Bar */}
          <div className="dashboard-card" style={{ padding: "14px 18px", background: "var(--bg-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              {/* Font Size Adjuster */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "11.5px", fontWeight: "700", color: "var(--text-muted)" }}>Font:</span>
                <button
                  onClick={() => setFontSize("medium")}
                  style={{
                    border: "none",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "11px",
                    fontWeight: fontSize === "medium" ? "800" : "500",
                    background: fontSize === "medium" ? "var(--primary-green)" : "var(--bg-card)",
                    color: fontSize === "medium" ? "#fff" : "var(--text-heading)",
                    cursor: "pointer"
                  }}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  style={{
                    border: "none",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "12px",
                    fontWeight: fontSize === "large" ? "800" : "500",
                    background: fontSize === "large" ? "var(--primary-green)" : "var(--bg-card)",
                    color: fontSize === "large" ? "#fff" : "var(--text-heading)",
                    cursor: "pointer"
                  }}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("xlarge")}
                  style={{
                    border: "none",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "13px",
                    fontWeight: fontSize === "xlarge" ? "800" : "500",
                    background: fontSize === "xlarge" ? "var(--primary-green)" : "var(--bg-card)",
                    color: fontSize === "xlarge" ? "#fff" : "var(--text-heading)",
                    cursor: "pointer"
                  }}
                >
                  A+
                </button>
              </div>

              {/* Toggles */}
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => setShowArabic(!showArabic)}
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${showArabic ? "var(--primary-green)" : "var(--border-color)"}`,
                    background: showArabic ? "var(--accent-cream)" : "var(--bg-card)",
                    color: showArabic ? "var(--primary-green)" : "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  Urbi (Arabic)
                </button>

                <button
                  onClick={() => setShowHinglish(!showHinglish)}
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${showHinglish ? "var(--primary-green)" : "var(--border-color)"}`,
                    background: showHinglish ? "var(--accent-cream)" : "var(--bg-card)",
                    color: showHinglish ? "var(--primary-green)" : "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  Hinglish (Pronunciation)
                </button>

                <button
                  onClick={() => setShowUrduHinglish(!showUrduHinglish)}
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${showUrduHinglish ? "var(--primary-green)" : "var(--border-color)"}`,
                    background: showUrduHinglish ? "var(--accent-cream)" : "var(--bg-card)",
                    color: showUrduHinglish ? "var(--primary-green)" : "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  Tarjuma (Meaning)
                </button>

                <button
                  onClick={() => setShowHindiScript(!showHindiScript)}
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${showHindiScript ? "var(--primary-green)" : "var(--border-color)"}`,
                    background: showHindiScript ? "var(--accent-cream)" : "var(--bg-card)",
                    color: showHindiScript ? "var(--primary-green)" : "var(--text-muted)",
                    cursor: "pointer"
                  }}
                >
                  Hindi (हिंदी लिपि)
                </button>
              </div>
            </div>
          </div>

          {/* Ayahs Cards */}
          {isLoadingAyahs ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              <Sparkles size={24} color="var(--primary-green)" className="animate-spin" />
              <p style={{ marginTop: "10px", fontWeight: "700" }}>Loading Ayahs with Hinglish translation...</p>
            </div>
          ) : (
            ayahs.map((verse) => {
              const verseKey = `${verse.surahNumber}:${verse.numberInSurah}`;
              const isBookmarked = bookmarkedVerses.includes(verseKey);

              return (
                <div
                  key={verse.number}
                  className="dashboard-card"
                  style={{
                    padding: "18px 22px",
                    borderLeft: isBookmarked ? "4px solid #b8860b" : "4px solid transparent",
                    transition: "all 0.15s ease"
                  }}
                >
                  {/* Top Meta Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "var(--bg-subtle)",
                          border: "1.5px solid var(--primary-green)",
                          color: "var(--primary-green)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11.5px",
                          fontWeight: "800"
                        }}
                      >
                        {verse.numberInSurah}
                      </div>
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-heading)" }}>
                          {verse.surahEnglish} ({verse.surahNumber}:{verse.numberInSurah})
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "8px" }}>
                          Ruku {verse.ruku || 1} • Page {verse.page}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <button
                        onClick={() => toggleBookmark(verseKey)}
                        className="action-icon-btn"
                        style={{ width: "32px", height: "32px", color: isBookmarked ? "#b8860b" : "var(--text-muted)" }}
                        title={isBookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                      >
                        <Bookmark size={15} fill={isBookmarked ? "#b8860b" : "none"} />
                      </button>
                      <button
                        onClick={() => handleCopyAyah(verse)}
                        className="action-icon-btn"
                        style={{ width: "32px", height: "32px", color: "var(--text-muted)" }}
                        title="Copy Ayah to Clipboard"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>

                  {/* 1. Arabic Text */}
                  {showArabic && (
                    <div
                      style={{
                        fontFamily: "var(--font-arabic)",
                        fontSize: arabicFontSize,
                        lineHeight: "2",
                        textAlign: "right",
                        direction: "rtl",
                        color: "var(--text-heading)",
                        marginBottom: "12px",
                        paddingRight: "6px"
                      }}
                    >
                      {verse.arabic}
                      <span className="mushaf-ayah-glyph">
                        {verse.numberInSurah}
                      </span>
                    </div>
                  )}

                  {/* 2. Roman Hinglish Pronunciation */}
                  {showHinglish && (
                    <div
                      style={{
                        fontSize: hinglishFontSize,
                        fontWeight: "600",
                        color: "var(--primary-green)",
                        marginBottom: "8px",
                        lineHeight: "1.5",
                        letterSpacing: "0.2px"
                      }}
                    >
                      <strong style={{ fontSize: "11px", textTransform: "uppercase", display: "block", color: "var(--text-muted)", marginBottom: "2px" }}>
                        Pronunciation (Talaffuz):
                      </strong>
                      {verse.transliteration}
                    </div>
                  )}

                  {/* 3. Easy Hinglish / Urdu Tarjuma */}
                  {showUrduHinglish && (
                    <div
                      style={{
                        fontSize: hinglishFontSize,
                        color: "var(--text-heading)",
                        lineHeight: "1.5",
                        background: "var(--bg-subtle)",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        borderLeft: "3px solid var(--primary-green)",
                        marginBottom: showHindiScript ? "8px" : "0"
                      }}
                    >
                      <strong style={{ fontSize: "11px", textTransform: "uppercase", display: "block", color: "var(--primary-green)", marginBottom: "2px" }}>
                        Tarjuma (आसान उर्दू / हिन्दी भावार्थ):
                      </strong>
                      {verse.urdu || verse.hindi}
                    </div>
                  )}

                  {/* 4. Hindi Script */}
                  {showHindiScript && verse.hindi && (
                    <div
                      style={{
                        fontSize: hinglishFontSize,
                        color: "var(--text-heading)",
                        lineHeight: "1.5",
                        background: "var(--accent-cream)",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        borderLeft: "3px solid #b8860b"
                      }}
                    >
                      <strong style={{ fontSize: "11px", textTransform: "uppercase", display: "block", color: "#b8860b", marginBottom: "2px" }}>
                        हिन्दी तर्जुमा (देवनागरी):
                      </strong>
                      {verse.hindi}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 3: 30 PARAS DIRECTORY (All 30 Paras Card Gallery) */}
      {activeView === "directory" && (
        <div>
          {/* Search Bar for 30 Paras */}
          <div
            style={{
              position: "relative",
              maxWidth: "480px",
              marginBottom: "16px"
            }}
          >
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "36px", height: "42px", fontSize: "13px" }}
              placeholder="Search by Para number, name, or Surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Paras Grid */}
          <div className="paras-grid">
            {filteredParas.map((para) => {
              const isSelected = para.number === selectedParaNumber;
              const isDone = completedParas.includes(para.number);

              return (
                <div
                  key={para.number}
                  className={`para-card-item ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    setSelectedParaNumber(para.number);
                    setActiveView("mushaf");
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span
                        style={{
                          background: isSelected ? "var(--primary-green)" : "var(--bg-subtle)",
                          color: isSelected ? "#fff" : "var(--text-muted)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "800"
                        }}
                      >
                        PARA #{para.number}
                      </span>

                      {isDone && (
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontSize: "11px", fontWeight: "700" }}>
                          <Check size={12} strokeWidth={3} />
                          <span>Complete</span>
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h4 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-heading)", margin: "0 0 4px" }}>
                        {para.name}
                      </h4>
                      <span
                        style={{
                          fontFamily: "var(--font-arabic)",
                          fontSize: "22px",
                          color: "var(--primary-green)",
                          direction: "rtl"
                        }}
                      >
                        {para.arabic}
                      </span>
                    </div>

                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginBottom: "8px" }}>
                      {para.surahRange}
                    </div>

                    <p style={{ fontSize: "12px", color: "var(--text-main)", margin: "0 0 12px", lineHeight: "1.4" }}>
                      {para.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--border-color)",
                      paddingTop: "10px"
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                      {para.ayahsCount} Ayahs • {para.rukusCount} Rukus
                    </span>

                    <button
                      className="card-action-btn-green"
                      style={{ padding: "5px 12px", fontSize: "11.5px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedParaNumber(para.number);
                        setActiveView("mushaf");
                      }}
                    >
                      <span>Read Para</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PERSISTENT FLOATING TILAWAT AUDIO PLAYER (Listen Tilawat so users can listen while working) */}
      <div className="tilawat-audio-dock">
        {/* Top Dock Info & Reciter */}
        <div className="tilawat-dock-top">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 215, 0, 0.2)",
                border: "1px solid #ffd700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Headphones size={18} color="#ffd700" />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <strong style={{ fontSize: "13px", color: "#ffd700" }}>
                  Para {currentPara.number}: {currentPara.name} ({currentPara.arabic})
                </strong>
                <span style={{ fontSize: "11px", opacity: 0.8 }}>• Continuous Tilawat</span>
              </div>
              <div style={{ fontSize: "11px", opacity: 0.85 }}>
                {currentPara.surahRange}
              </div>
            </div>
          </div>

          {/* Controls: Prev / Play / Next / Skip 15s */}
          <div className="tilawat-dock-controls">
            <button
              onClick={() => changePara("prev")}
              disabled={selectedParaNumber <= 1}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: selectedParaNumber <= 1 ? 0.4 : 1 }}
              title="Previous Para"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => handleSkip(-15)}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
              title="Rewind 15 seconds"
            >
              <Rewind size={17} />
            </button>

            <button
              onClick={togglePlayAudio}
              className="tilawat-play-btn"
              title={isPlaying ? "Pause Tilawat" : "Play Tilawat"}
            >
              {isPlaying ? <Pause size={18} fill="#0d3826" /> : <Play size={18} fill="#0d3826" style={{ marginLeft: "2px" }} />}
            </button>

            <button
              onClick={() => handleSkip(15)}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
              title="Forward 15 seconds"
            >
              <FastForward size={17} />
            </button>

            <button
              onClick={() => changePara("next")}
              disabled={selectedParaNumber >= 30}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", opacity: selectedParaNumber >= 30 ? 0.4 : 1 }}
              title="Next Para"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Reciter & Speed Selectors */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {/* Speed Buttons */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "2px" }}>
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  style={{
                    border: "none",
                    background: playbackSpeed === spd ? "#ffd700" : "transparent",
                    color: playbackSpeed === spd ? "#0d3826" : "#ffffff",
                    fontSize: "10.5px",
                    fontWeight: "800",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", fontFamily: "monospace", minWidth: "40px" }}>
            {formatAudioTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 100}
            step="1"
            value={currentTime}
            onChange={handleSeek}
            className="tilawat-seek-bar"
          />

          <span style={{ fontSize: "11px", fontFamily: "monospace", minWidth: "40px", textAlign: "right" }}>
            {formatAudioTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
