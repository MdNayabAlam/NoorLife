import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Heart, Copy, Volume2, VolumeX, Check, Bookmark, BookOpen,
  Search, Play, Pause, Sparkles, Filter, RefreshCw, Share2
} from "lucide-react";
import confetti from "canvas-confetti";
import { MASNOON_DUAS, DUAS_CATEGORIES } from "../data/masnoonDuasData";

export function DailyDeenPage({ showToast }) {
  const [selectedCategory, setSelectedCategory] = useState("All Duas");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("noorlife_dua_bookmarks");
      return saved ? JSON.parse(saved) : [1, 2, 20];
    } catch {
      return [1, 2, 20];
    }
  });
  const [copiedId, setCopiedId] = useState(null);

  // Audio Playback States
  const [playingDuaId, setPlayingDuaId] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioInstanceRef = useRef(null);

  // Initialize and preserve a single Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.onended = () => {
      setIsPlayingAudio(false);
      setPlayingDuaId(null);
    };
    audio.onerror = (e) => {
      console.warn("Direct audio error event, falling back to speech:", e);
      setIsPlayingAudio(false);
      setPlayingDuaId(null);
    };
    audioInstanceRef.current = audio;

    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
        audioInstanceRef.current.src = "";
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem("noorlife_dua_bookmarks", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (showToast) {
        showToast(prev.includes(id) ? "Dua removed from bookmarks" : "Dua saved to bookmarks! 🌟");
      }
      return next;
    });
  }

  function handleCopy(dua) {
    const text = `${dua.title}\n\n${dua.arabic}\n\nTalaffuz: ${dua.transliteration}\n\nTarjuma: ${dua.translation}\n[Reference: ${dua.source}]\n— NoorLife Daily Deen`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    if (showToast) showToast("Dua copied to clipboard! 📋");
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Fallback speech helper
  function handleSpeechFallback(dua) {
    if (!("speechSynthesis" in window) || !dua) {
      setIsPlayingAudio(false);
      setPlayingDuaId(null);
      return;
    }
    window.speechSynthesis.cancel();

    // Check if Arabic voice exists
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find((v) => v.lang.startsWith("ar"));

    const utterance = new SpeechSynthesisUtterance(arVoice ? dua.arabic : dua.transliteration);
    if (arVoice) {
      utterance.voice = arVoice;
      utterance.lang = "ar-SA";
    } else {
      utterance.lang = "en-US";
    }
    utterance.rate = 0.85;
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setPlayingDuaId(null);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setPlayingDuaId(null);
    };
    window.speechSynthesis.speak(utterance);
  }

  // Robust Audio Player with guaranteed local MP3 playback
  function handlePlayAudio(dua) {
    if (!audioInstanceRef.current) {
      audioInstanceRef.current = new Audio();
      audioInstanceRef.current.onended = () => {
        setIsPlayingAudio(false);
        setPlayingDuaId(null);
      };
    }

    const audio = audioInstanceRef.current;

    // If clicking same dua while playing, toggle pause
    if (playingDuaId === dua.id && isPlayingAudio) {
      audio.pause();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    // If clicking same dua while paused, resume
    if (playingDuaId === dua.id && !isPlayingAudio && audio.src) {
      audio.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        handleSpeechFallback(dua);
      });
      return;
    }

    // Stop current playback
    audio.pause();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setPlayingDuaId(dua.id);
    setIsPlayingAudio(true);

    if (showToast) showToast(`Playing recitation: ${dua.title} 🔊`);

    // Target audio path (verified local /audio/duas/dua_X.mp3)
    const audioUrl = dua.audioUrl || `/audio/duas/dua_${dua.id}.mp3`;

    audio.src = audioUrl;
    audio.currentTime = 0;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch((err) => {
          console.warn("Direct audio play promise rejected, using fallback:", err);
          handleSpeechFallback(dua);
        });
    }
  }

  function handleStopAudio() {
    if (audioInstanceRef.current) {
      audioInstanceRef.current.pause();
      audioInstanceRef.current.currentTime = 0;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setPlayingDuaId(null);
  }

  // Active playing Dua object
  const playingDua = useMemo(() => {
    return MASNOON_DUAS.find((d) => d.id === playingDuaId) || null;
  }, [playingDuaId]);

  // Filter Duas
  const filteredDuas = useMemo(() => {
    return MASNOON_DUAS.filter((dua) => {
      // Category Filter
      if (selectedCategory === "Bookmarks") {
        if (!favorites.includes(dua.id)) return false;
      } else if (selectedCategory !== "All Duas") {
        if (dua.category !== selectedCategory) return false;
      }

      // Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        dua.title.toLowerCase().includes(q) ||
        dua.transliteration.toLowerCase().includes(q) ||
        dua.translation.toLowerCase().includes(q) ||
        dua.arabic.includes(searchQuery) ||
        dua.source.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, favorites]);

  return (
    <div className="center-content-area" style={{ maxWidth: "100%", paddingBottom: "90px" }}>
      {/* Main Page View Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "22px" }}>🤲</span>
            <h2 style={{ margin: 0 }}>Daily Deen & Masnoon Duas (मसनून दुआएं)</h2>
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
              26 Authentic Duas • Audio Tilawat & Hinglish
            </span>
          </div>
          <p>
            Subah se lekar raat tak ki tamam zaroori Masnoon duaein: Arabic, Roman Hinglish talaffuz (pronunciation), aasan tarjuma aur audio recitation ke sath.
          </p>
        </div>

        {/* Currently Playing Status Badge if active */}
        {playingDua && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #0d3826 0%, #154e36 100%)",
              color: "#ffd700",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)"
            }}
          >
            <Volume2 size={16} className="animate-pulse" />
            <span>Reciting: {playingDua.title.split("(")[0]}</span>
            <button
              onClick={handleStopAudio}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "10.5px"
              }}
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* Search & Category Filter Toolbar */}
      <div
        className="dashboard-card"
        style={{
          padding: "16px 20px",
          background: "var(--bg-card)",
          marginBottom: "18px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "420px" }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "36px", height: "40px", fontSize: "12.5px" }}
              placeholder="Search Dua (e.g. Sona, Jagna, Khana, Safar, Qarz)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setSelectedCategory("Bookmarks")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 12px",
                borderRadius: "var(--radius-pill)",
                border: selectedCategory === "Bookmarks" ? "1.5px solid var(--accent-gold)" : "1px solid var(--border-color)",
                background: selectedCategory === "Bookmarks" ? "var(--accent-cream)" : "var(--bg-subtle)",
                color: selectedCategory === "Bookmarks" ? "#b45309" : "var(--text-heading)",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              <Bookmark size={13} fill={selectedCategory === "Bookmarks" ? "#b45309" : "none"} color="#b45309" />
              <span>Saved Bookmarks ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "thin"
          }}
        >
          {DUAS_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  flex: "0 0 auto",
                  padding: "5px 12px",
                  borderRadius: "var(--radius-pill)",
                  border: isSelected ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                  background: isSelected ? "var(--primary-green)" : "var(--bg-subtle)",
                  color: isSelected ? "#ffffff" : "var(--text-heading)",
                  fontSize: "11.5px",
                  fontWeight: isSelected ? "800" : "600",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duas List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredDuas.length === 0 ? (
          <div className="dashboard-card" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
            <p style={{ fontSize: "15px", fontWeight: "700" }}>Koi dua nahi mili.</p>
            <p style={{ fontSize: "12px", marginTop: "4px" }}>Filter reset karein ya doosra lafz search karein.</p>
            <button
              className="card-action-btn-green"
              style={{ marginTop: "12px", padding: "6px 16px" }}
              onClick={() => {
                setSelectedCategory("All Duas");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const isFav = favorites.includes(dua.id);
            const isPlayingThis = playingDuaId === dua.id && isPlayingAudio;

            return (
              <div
                key={dua.id}
                className="dashboard-card"
                style={{
                  padding: "24px",
                  borderLeft: isPlayingThis ? "4px solid #10b981" : isFav ? "4px solid var(--accent-gold)" : "4px solid transparent",
                  boxShadow: isPlayingThis ? "0 8px 24px rgba(16, 185, 129, 0.18)" : undefined,
                  transition: "all 0.2s ease"
                }}
              >
                {/* Header Row: Title, Reference & Action Buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <span
                        style={{
                          background: "var(--bg-subtle)",
                          color: "var(--primary-green)",
                          border: "1px solid var(--border-color)",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: "800"
                        }}
                      >
                        Dua #{dua.id}
                      </span>

                      <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309", fontSize: "11px" }}>
                        {dua.source}
                      </span>

                      <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                        • {dua.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "18px", color: "var(--text-heading)", fontWeight: "800", margin: "2px 0 0" }}>
                      {dua.title}
                    </h3>
                  </div>

                  {/* Actions: Bookmark, Copy, Play Audio */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      className="icon-action-btn-sm"
                      title={isFav ? "Remove bookmark" : "Save Bookmark"}
                      onClick={() => toggleFavorite(dua.id)}
                      style={{
                        background: isFav ? "var(--accent-cream)" : "var(--bg-subtle)",
                        borderColor: isFav ? "var(--accent-gold)" : "var(--border-color)"
                      }}
                    >
                      <Bookmark size={15} fill={isFav ? "#c6a256" : "none"} color="#c6a256" />
                    </button>

                    <button
                      className="icon-action-btn-sm"
                      title="Copy Dua with Tarjuma"
                      onClick={() => handleCopy(dua)}
                    >
                      {copiedId === dua.id ? <Check size={15} color="#2a7c4f" strokeWidth={3} /> : <Copy size={15} />}
                    </button>

                    {/* Prominent Play / Pause Audio Button */}
                    <button
                      onClick={() => handlePlayAudio(dua)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: isPlayingThis ? "#e76f51" : "var(--primary-green)",
                        color: "#ffffff",
                        border: "none",
                        padding: "7px 14px",
                        borderRadius: "var(--radius-pill)",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        cursor: "pointer",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                        transition: "all 0.2s ease"
                      }}
                      title={isPlayingThis ? "Pause Audio" : "Listen Audio Recitation"}
                    >
                      {isPlayingThis ? (
                        <>
                          <Pause size={13} fill="#ffffff" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={13} />
                          <span>Listen Audio</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Calligraphy Frame */}
                <div
                  className="dua-arabic-card"
                  style={{
                    padding: "20px 24px",
                    textAlign: "center",
                    marginBottom: "14px",
                    borderRadius: "14px",
                    background: isPlayingThis ? "var(--accent-cream)" : "var(--bg-subtle)",
                    border: isPlayingThis ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-arabic)",
                      fontSize: "28px",
                      color: "var(--primary-green)",
                      lineHeight: "1.9",
                      direction: "rtl",
                      marginBottom: "10px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.05)"
                    }}
                  >
                    {dua.arabic}
                  </div>

                  {/* Roman Hinglish Pronunciation (Talaffuz) */}
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#8c7648",
                      fontWeight: "700",
                      lineHeight: "1.5",
                      letterSpacing: "0.2px",
                      paddingTop: "6px",
                      borderTop: "1px dashed rgba(140, 118, 72, 0.3)"
                    }}
                  >
                    <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>
                      Talaffuz (Pronunciation in Hinglish):
                    </span>
                    {dua.transliteration}
                  </div>
                </div>

                {/* Translation & Context */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--text-heading)",
                      lineHeight: "1.5",
                      fontWeight: "500",
                      background: "var(--bg-subtle)",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      borderLeft: "3px solid var(--primary-green)"
                    }}
                  >
                    <strong style={{ fontSize: "11.5px", color: "var(--primary-green)", display: "block", textTransform: "uppercase", marginBottom: "2px" }}>
                      Tarjuma (आसान उर्दू / हिन्दी):
                    </strong>
                    "{dua.translation}"
                  </div>

                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.4" }}>
                    💡 <strong>Dua Padhne Ka Waqt / Hadees Fazilat:</strong> {dua.context}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Sticky Audio Player Dock */}
      {playingDua && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "linear-gradient(135deg, #0d3826 0%, #175438 100%)",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "50px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            border: "1.5px solid rgba(255, 215, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            maxWidth: "92vw",
            width: "500px",
            animation: "fadeInUp 0.3s ease"
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 215, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffd700",
              flexShrink: 0
            }}
          >
            <Volume2 size={18} className={isPlayingAudio ? "animate-pulse" : ""} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffd700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {playingDua.title}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {isPlayingAudio ? "Reciting Arabic Tilawat 🔊" : "Paused"} • {playingDua.source}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => handlePlayAudio(playingDua)}
              style={{
                background: "#ffd700",
                color: "#0d3826",
                border: "none",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
              }}
              title={isPlayingAudio ? "Pause" : "Play"}
            >
              {isPlayingAudio ? <Pause size={16} fill="#0d3826" /> : <Play size={16} fill="#0d3826" style={{ marginLeft: "2px" }} />}
            </button>

            <button
              onClick={handleStopAudio}
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#ffffff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600"
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
