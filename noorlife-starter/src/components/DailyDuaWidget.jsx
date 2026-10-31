import React from "react";

export function DailyDuaWidget({ onViewAllDuas, showToast }) {
  const currentDua = {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma.",
    translation: "My Lord, increase me in knowledge.",
    source: "Surah Ta-Ha (20:114)",
  };

  return (
    <div className="dua-widget">
      {/* Photorealistic Botanical Olive Branch on Left */}
      <img
        src="/images/dua_olive_branch.png"
        alt="Olive branch"
        className="dua-botanical-left-img"
        aria-hidden="true"
      />

      {/* Photorealistic Botanical Purple Grapes on Right */}
      <img
        src="/images/dua_grape_cluster.png"
        alt="Purple grape cluster"
        className="dua-botanical-right-img"
        aria-hidden="true"
      />

      {/* Header Row */}
      <div className="card-header-row dua-header-row">
        <h3 className="dua-widget-title">Daily Dua</h3>
        <button className="card-text-link dua-see-all-btn" onClick={onViewAllDuas}>
          See All
        </button>
      </div>

      {/* Dua Center Content */}
      <div className="dua-content-box">
        <div className="dua-arabic-text">{currentDua.arabic}</div>
        <div className="dua-translit">{currentDua.transliteration}</div>
        <div className="dua-translation">{currentDua.translation}</div>
      </div>

      {/* View Explanation / Tafsir CTA Button */}
      <button
        className="dua-tafsir-btn"
        onClick={() => {
          if (showToast) showToast("Surah Ta-Ha (20:114): Dua of Prophet Muhammad ﷺ for increase in beneficial knowledge.");
          if (onViewAllDuas) onViewAllDuas();
        }}
      >
        View Explanation/Tafsir
      </button>
    </div>
  );
}
