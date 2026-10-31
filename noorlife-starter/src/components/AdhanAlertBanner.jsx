import React, { useState, useEffect } from "react";
import { Bell, Volume2, VolumeX, Play, Square, X, ExternalLink } from "lucide-react";
import { adhanService } from "../services/adhanService";

export function AdhanAlertBanner({ onOpenAdhanModal }) {
  const [serviceState, setServiceState] = useState(adhanService.state);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const unsub = adhanService.subscribe((state) => {
      setServiceState({ ...state });
      if (state.isPlaying || state.autoplayBlocked) {
        setIsDismissed(false);
      }
    });
    return () => unsub();
  }, []);

  if (isDismissed || (!serviceState.isPlaying && !serviceState.autoplayBlocked)) {
    return null;
  }

  const prayerName = serviceState.currentPrayer || "Prayer";

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "92%",
        maxWidth: "600px",
        background: "linear-gradient(135deg, #133927 0%, #1e5841 100%)",
        color: "white",
        borderRadius: "var(--radius-lg, 16px)",
        padding: "14px 20px",
        boxShadow: "0 12px 36px rgba(19, 57, 39, 0.45), 0 0 0 1px rgba(198, 162, 86, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "14px",
        animation: "slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        {/* Animated Sound Wave or Mosque Icon */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "var(--accent-gold, #c6a256)",
            color: "#133927",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 16px rgba(198, 162, 86, 0.5)"
          }}
        >
          {serviceState.isPlaying ? (
            <Volume2 size={22} className="pulse-animation" />
          ) : (
            <Bell size={22} />
          )}
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--accent-gold-light, #fde047)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              🕌 WAQT HO GAYA HAI
            </span>
          </div>
          <h4 style={{ margin: "2px 0 0 0", fontSize: "15px", fontWeight: "700", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {prayerName} Namaz Time • Azaan Call
          </h4>
          <p style={{ margin: "1px 0 0 0", fontSize: "11.5px", color: "#cce0d2" }}>
            {serviceState.isPlaying
              ? "Hayya 'alas-Salah — Azaan is playing right now"
              : "Click Play to hear authentic Makkah/Madinah Azaan"}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {serviceState.isPlaying ? (
          <button
            onClick={() => adhanService.stopAdhan()}
            style={{
              background: "rgba(239, 68, 68, 0.9)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-pill, 20px)",
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <Square size={13} fill="white" />
            <span>Stop</span>
          </button>
        ) : (
          <button
            onClick={() => adhanService.playAdhan(prayerName)}
            style={{
              background: "var(--accent-gold, #c6a256)",
              color: "#133927",
              border: "none",
              borderRadius: "var(--radius-pill, 20px)",
              padding: "7px 14px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <Play size={14} fill="#133927" />
            <span>Play Azaan</span>
          </button>
        )}

        <button
          onClick={() => {
            if (onOpenAdhanModal) onOpenAdhanModal();
          }}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-pill, 20px)",
            padding: "7px 12px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px"
          }}
          title="View Full Recitation & Translation"
        >
          <span>Words</span>
          <ExternalLink size={12} />
        </button>

        <button
          onClick={() => {
            setIsDismissed(true);
            adhanService.stopAdhan();
          }}
          className="action-icon-btn"
          style={{ color: "rgba(255, 255, 255, 0.7)", background: "transparent", border: "none" }}
          title="Dismiss Alert"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

