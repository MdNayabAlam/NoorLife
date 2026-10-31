import React, { useState, useEffect } from "react";
import { X, Volume2, VolumeX, Play, Pause, Bell, Sparkles, Check, Square, Radio, ShieldCheck } from "lucide-react";
import { adhanService, ADHAN_VOICES } from "../../services/adhanService";

export function AdhanModal({ isOpen, onClose, currentCity = "Makkah", prayerName = "Adhan" }) {
  const [serviceState, setServiceState] = useState(adhanService.state);

  useEffect(() => {
    const unsubscribe = adhanService.subscribe((state) => {
      setServiceState({ ...state });
    });
    return () => unsubscribe();
  }, []);

  // Authentic Adhan phrases with Arabic, Transliteration, and English meaning
  const adhanPhrases = [
    { ar: "اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ", tr: "Allahu Akbar, Allahu Akbar (x2)", en: "Allah is the Greatest, Allah is the Greatest" },
    { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", tr: "Ash-hadu alla ilaha illallah (x2)", en: "I bear witness that there is no deity except Allah" },
    { ar: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ", tr: "Ash-hadu anna Muhammadar-Rasulullah (x2)", en: "I bear witness that Muhammad is the Messenger of Allah" },
    { ar: "حَيَّ عَلَى الصَّلَاةِ", tr: "Hayya 'alas-Salah (x2)", en: "Come to prayer, Come to prayer" },
    { ar: prayerName === "Fajr" || serviceState.currentVoice === "fajr" ? "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ" : "حَيَّ عَلَى الْفَلَاحِ",
      tr: prayerName === "Fajr" || serviceState.currentVoice === "fajr" ? "As-salatu khayrum-minan-nawm (x2)" : "Hayya 'alal-Falah (x2)",
      en: prayerName === "Fajr" || serviceState.currentVoice === "fajr" ? "Prayer is better than sleep (x2)" : "Come to success, Come to success"
    },
    { ar: "اللَّهُ أَكْبَرُ ، اللَّهُ أَكْبَرُ", tr: "Allahu Akbar, Allahu Akbar", en: "Allah is the Greatest, Allah is the Greatest" },
    { ar: "لَا إِلَهَ إِلَّا اللَّهُ", tr: "La ilaha illallah", en: "There is no deity except Allah" }
  ];

  const togglePlay = () => {
    if (serviceState.isPlaying) {
      adhanService.stopAdhan();
    } else {
      adhanService.playAdhan(prayerName, serviceState.currentVoice);
    }
  };

  const handleVoiceSelect = (voiceId) => {
    adhanService.setVoice(voiceId);
  };

  const handleToggleAuto = () => {
    adhanService.setAutoEnabled(!serviceState.isAutoEnabled);
  };

  const formatSeconds = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!isOpen) return null;

  const currentVoiceObj = ADHAN_VOICES.find((v) => v.id === serviceState.currentVoice) || ADHAN_VOICES[0];
  const progressPercent = serviceState.duration > 0
    ? Math.min(100, (serviceState.currentTime / serviceState.duration) * 100)
    : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "580px", padding: "0", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
            color: "white",
            padding: "24px",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            className="action-icon-btn"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              color: "white",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold-light)", fontSize: "12px", fontWeight: "700" }}>
            <Sparkles size={14} />
            <span>LIVE PRAYER CALL & VERIFIED RECITATION</span>
          </div>

          <h2 style={{ fontSize: "22px", color: "#ffffff", marginTop: "6px" }}>
            {prayerName !== "Adhan" ? `${prayerName} Prayer — Call to Prayer (Azaan)` : "Call to Prayer (Azaan)"}
          </h2>
          <p style={{ fontSize: "13px", color: "#cce0d2", marginTop: "2px" }}>
            Location: <strong>{currentCity}</strong> • Islamic astronomical timetable
          </p>

          {/* Autoplay blocked notification if browser paused background sound */}
          {serviceState.autoplayBlocked && (
            <div
              style={{
                marginTop: "12px",
                background: "rgba(234, 179, 8, 0.2)",
                border: "1px solid rgba(234, 179, 8, 0.5)",
                borderRadius: "var(--radius-sm)",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#fef08a",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px"
              }}
            >
              <span>Browser autoplay paused audio. Tap below to listen instantly:</span>
              <button
                onClick={togglePlay}
                style={{
                  background: "#eab308",
                  color: "#133927",
                  border: "none",
                  fontWeight: "700",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "11px"
                }}
              >
                Play Audio Now 🔊
              </button>
            </div>
          )}

          {/* Audio Player Controls Box */}
          <div
            style={{
              marginTop: "16px",
              background: "rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-md)",
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button
                  onClick={togglePlay}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: serviceState.isPlaying ? "#ef4444" : "var(--accent-gold)",
                    border: "none",
                    color: serviceState.isPlaying ? "#ffffff" : "#174232",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(198, 162, 86, 0.4)",
                    transition: "transform 0.15s ease",
                  }}
                  title={serviceState.isPlaying ? "Stop Adhan" : "Play Adhan Audio"}
                >
                  {serviceState.isPlaying ? (
                    <Square size={20} fill="#ffffff" />
                  ) : (
                    <Play size={22} fill="#174232" style={{ marginLeft: "2px" }} />
                  )}
                </button>

                <div>
                  <strong style={{ fontSize: "14px", color: "#ffffff" }}>
                    {serviceState.isPlaying ? "Azaan Audio Playing..." : "Click to Play Azaan"}
                  </strong>
                  <div style={{ fontSize: "12px", color: "var(--accent-gold-light)", marginTop: "2px" }}>
                    Voice: {currentVoiceObj.name} ({currentVoiceObj.muezzin})
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => adhanService.toggleMute()}
                  className="action-icon-btn"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none" }}
                  title={serviceState.isMuted ? "Unmute" : "Mute"}
                >
                  {serviceState.isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>

            {/* Audio Timeline Bar */}
            {serviceState.duration > 0 && (
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: "100%",
                      background: "var(--accent-gold)",
                      transition: "width 0.2s linear"
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "#d1fae5", marginTop: "4px" }}>
                  <span>{formatSeconds(serviceState.currentTime)}</span>
                  <span>{formatSeconds(serviceState.duration)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Voice Selector Chips */}
          <div style={{ marginTop: "14px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Select Muezzin Voice:
            </span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
              {ADHAN_VOICES.map((v) => {
                const isSelected = serviceState.currentVoice === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVoiceSelect(v.id)}
                    style={{
                      background: isSelected ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.14)",
                      color: isSelected ? "#133927" : "#ffffff",
                      border: "none",
                      borderRadius: "var(--radius-pill)",
                      padding: "5px 12px",
                      fontSize: "11.5px",
                      fontWeight: isSelected ? "700" : "500",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <span>{v.name.split(" ")[0]}</span>
                    <span style={{ fontSize: "10px", opacity: 0.85 }}>({v.badge})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Adhan Words & Translation Flow */}
        <div style={{ padding: "20px", maxHeight: "280px", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h4 style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
              Words of the Azaan (Call to Prayer)
            </h4>

            {/* Auto-Azaan Switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                Auto-Azaan at prayer time:
              </span>
              <button
                type="button"
                onClick={handleToggleAuto}
                style={{
                  background: serviceState.isAutoEnabled ? "#dcfce7" : "#f1f5f9",
                  color: serviceState.isAutoEnabled ? "#166534" : "#64748b",
                  border: `1px solid ${serviceState.isAutoEnabled ? "#86efac" : "#cbd5e1"}`,
                  borderRadius: "var(--radius-pill)",
                  padding: "2px 8px",
                  fontSize: "10.5px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                {serviceState.isAutoEnabled ? "Enabled 🔔" : "Off 🔕"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {adhanPhrases.map((phrase, idx) => {
              const isCurrent = serviceState.isPlaying && serviceState.activePhraseIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    background: isCurrent ? "var(--accent-cream)" : "var(--bg-subtle)",
                    border: `1.5px solid ${isCurrent ? "var(--accent-gold)" : "var(--border-color)"}`,
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: isCurrent ? "var(--primary-green)" : "var(--text-muted)" }}>
                      Step {idx + 1}
                    </span>
                    <span style={{ fontSize: "18px", fontFamily: "Traditional Arabic, Scheherazade, serif", fontWeight: "700", color: "var(--text-heading)", direction: "rtl" }}>
                      {phrase.ar}
                    </span>
                  </div>
                  <div style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--text-heading)", marginTop: "4px" }}>
                    {phrase.tr}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                    "{phrase.en}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dua After Adhan */}
          <div
            style={{
              marginTop: "16px",
              padding: "14px 16px",
              background: "#f4f8f5",
              border: "1px solid #d1e7dd",
              borderRadius: "var(--radius-md)",
            }}
          >
            <strong style={{ fontSize: "12.5px", color: "var(--primary-green)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={14} /> Dua After Azaan (Sunnah)
            </strong>
            <p style={{ fontSize: "14px", fontFamily: "serif", direction: "rtl", textAlign: "right", marginTop: "6px", color: "#174232", lineHeight: "1.6" }}>
              اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ ، وَالصَّلَاةِ الْقَائِمَةِ ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ
            </p>
            <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "4px" }}>
              "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and distinction, and raise him to the praised station which You promised." (Sahih al-Bukhari)
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: "14px 20px", background: "var(--bg-subtle)", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "5px" }}>
            <ShieldCheck size={14} color="var(--primary-green)" />
            <span>Pure authentic recitation from Masjid al-Haram & Muezzins</span>
          </div>

          <button className="card-action-btn-green" onClick={onClose} style={{ padding: "8px 20px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
