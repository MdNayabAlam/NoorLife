import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Heart, ArrowRight, Sparkles, Volume2 } from "lucide-react";
import { naatSharifData } from "../data/naatSharifData";

export function NaatSharifCard({ onNavigateNaat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNaatIndex, setActiveNaatIndex] = useState(0);
  const audioRef = useRef(null);

  const featuredNaats = naatSharifData.slice(0, 3);
  const currentNaat = featuredNaats[activeNaatIndex] || featuredNaats[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const toggleMiniPlay = (e, index) => {
    e.stopPropagation();
    if (activeNaatIndex !== index) {
      setActiveNaatIndex(index);
      if (audioRef.current) {
        audioRef.current.src = featuredNaats[index].audioUrl;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  };

  return (
    <div className="dashboard-card naat-dashboard-card">
      <audio
        ref={audioRef}
        src={currentNaat.audioUrl}
        preload="none"
      />

      {/* Decorative Corner Shimmer */}
      <div className="naat-card-glow-accent" />

      {/* Header */}
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="naat-header-icon-box">
            <Music size={16} color="#e5b84c" />
          </div>
          <div>
            <h3 className="naat-dash-title">Naat Sharif</h3>
            <div className="naat-dash-subtitle">نعتِ پاک • Roohani Sukoon</div>
          </div>
        </div>

        <div className="naat-count-badge">
          <Sparkles size={11} color="#eab308" />
          <span>14 Naats</span>
        </div>
      </div>

      {/* Mini Player Highlight */}
      <div className="naat-mini-player-box" onClick={onNavigateNaat}>
        <div className="mini-player-left">
          <div className="mini-art-disc">
            <Music size={16} color="#15803d" />
          </div>
          <div className="mini-meta">
            <span className="mini-badge">{currentNaat.category}</span>
            <div className="mini-title">{currentNaat.title}</div>
            <div className="mini-reciter">{currentNaat.reciter}</div>
          </div>
        </div>

        <button
          className="mini-play-toggle-btn"
          onClick={(e) => toggleMiniPlay(e, activeNaatIndex)}
          title={isPlaying ? "Pause" : "Play Naat"}
        >
          {isPlaying ? <Pause size={16} fill="#052e16" color="#052e16" /> : <Play size={16} fill="#052e16" color="#052e16" style={{ marginLeft: "2px" }} />}
        </button>
      </div>

      {/* Quick Select 3 Popular Naats */}
      <div className="naat-quick-list">
        {featuredNaats.map((naat, idx) => (
          <div
            key={naat.id}
            className={`naat-quick-item ${activeNaatIndex === idx ? "active-quick" : ""}`}
            onClick={(e) => toggleMiniPlay(e, idx)}
          >
            <div className="quick-item-number">#{idx + 1}</div>
            <div className="quick-item-info">
              <span className="quick-item-title">{naat.title}</span>
              <span className="quick-item-reciter">{naat.reciter}</span>
            </div>
            <span className="quick-item-duration">{naat.duration}</span>
          </div>
        ))}
      </div>

      {/* Card Footer Button */}
      <button className="naat-view-all-btn" onClick={onNavigateNaat}>
        <span>Open Naat Sharif Section (All 14 Kalaam)</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
