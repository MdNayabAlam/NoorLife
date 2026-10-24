import React, { useState } from "react";
import { BookOpen, Check, Volume2, ArrowRight } from "lucide-react";

export function NamazGuidePage({ steps, toggleStep }) {
  const [activeTab, setActiveTab] = useState("salah");
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);

  const salahDetails = [
    {
      title: "1. Niyyah (Intention)",
      arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ",
      transliteration: "Nawaytu an usalliya lillahi ta'ala rak'atay salat...",
      meaning: "I intend to perform for the sake of Allah the prayer facing the Qiblah.",
      action: "Make sincere intention in your heart without whispering loudly, facing the Ka'bah."
    },
    {
      title: "2. Takbeer-e-Tahreema",
      arabic: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      meaning: "Allah is the Greatest.",
      action: "Raise both hands to earlobe level (or shoulder level) and begin the prayer by closing off worldly distractions."
    },
    {
      title: "3. Qiyam & Recitation",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk",
      meaning: "Glory be to You O Allah, and all praise. Blessed is Your Name, exalted is Your Majesty, and there is no deity besides You.",
      action: "Fold hands respectfully below navel or on chest. Recite Thana, Surah Al-Fatiha, and another Surah."
    },
    {
      title: "4. Ruku (Bowing)",
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal 'Azeem (3 times)",
      meaning: "Glory be to my Lord, the Almighty.",
      action: "Bow with back straight parallel to the ground, palms resting firmly on knees with fingers spread."
    },
    {
      title: "5. Qaumah (Standing Straight)",
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ",
      transliteration: "Sami' Allahu liman hamidah • Rabbana lakal hamd",
      meaning: "Allah hears whoever praises Him • Our Lord, to You belongs all praise.",
      action: "Rise up completely straight with hands by your side."
    },
    {
      title: "6. Sujud (Prostration)",
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la (3 times)",
      meaning: "Glory be to my Lord, the Most High.",
      action: "Prostrate on seven points: forehead and nose, both palms, both knees, and tips of both feet touching the mat."
    },
    {
      title: "7. Tashahhud (At-Tahiyyat)",
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat, as-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh...",
      meaning: "All compliments, prayers and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings...",
      action: "Sit calmly between prostrations and at the end of the second/final rak'ah."
    },
    {
      title: "8. Tasleem (Ending Salam)",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "Assalamu 'Alaikum wa Rahmatullah",
      meaning: "May peace and mercy of Allah be upon you.",
      action: "Turn face to the right shoulder, then to the left shoulder to conclude the prayer."
    }
  ];

  const wuduSteps = [
    { title: "1. Niyyah & Bismillah", desc: "Begin with sincere intention in the heart and say 'Bismillah'." },
    { title: "2. Washing Hands", desc: "Wash both hands thoroughly up to the wrists 3 times, including between fingers." },
    { title: "3. Rinsing Mouth", desc: "Rinse mouth 3 times with right hand, swishing water inside." },
    { title: "4. Sniffing Water into Nose", desc: "Gently inhale water into nostrils 3 times with right hand and blow out with left hand." },
    { title: "5. Washing Face", desc: "Wash entire face 3 times, from hairline to bottom of chin and ear to ear." },
    { title: "6. Washing Arms", desc: "Wash both arms 3 times from fingertips up to and including the elbows, starting with right." },
    { title: "7. Masah (Wiping Head & Ears)", desc: "Wipe damp hands once over head from front to back and wipe inside and outside of ears." },
    { title: "8. Washing Feet", desc: "Wash right foot up to the ankle 3 times, then left foot, ensuring heels and toes are washed." }
  ];

  const currentStep = salahDetails[selectedStepIdx];

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>Namaz & Wudu Guide</h2>
          <p>Learn step-by-step prayer postures, recitations with Arabic text, meanings, and rules.</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className={`difficulty-pill-btn ${activeTab === "salah" ? "active" : ""}`}
            style={{
              background: activeTab === "salah" ? "var(--primary-green)" : "var(--bg-subtle)",
              color: activeTab === "salah" ? "white" : "var(--text-muted)",
              padding: "8px 16px",
            }}
            onClick={() => setActiveTab("salah")}
          >
            Salah (Prayer) Steps
          </button>
          <button
            className={`difficulty-pill-btn ${activeTab === "wudu" ? "active" : ""}`}
            style={{
              background: activeTab === "wudu" ? "var(--primary-green)" : "var(--bg-subtle)",
              color: activeTab === "wudu" ? "white" : "var(--text-muted)",
              padding: "8px 16px",
            }}
            onClick={() => setActiveTab("wudu")}
          >
            Wudu (Ablution) Guide
          </button>
        </div>
      </div>

      {activeTab === "salah" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "20px" }}>
          {/* Step Selector List */}
          <div className="dashboard-card" style={{ padding: "16px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", color: "var(--text-heading)" }}>
              Salah Postures & Steps
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {salahDetails.map((s, idx) => (
                <button
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    background: selectedStepIdx === idx ? "#e8f5ec" : "var(--bg-subtle)",
                    border: `1px solid ${selectedStepIdx === idx ? "#2a7c4f" : "var(--border-color)"}`,
                    color: selectedStepIdx === idx ? "#14532d" : "var(--text-main)",
                    fontWeight: selectedStepIdx === idx ? "700" : "500",
                    fontSize: "12.5px",
                    textAlign: "left",
                  }}
                  onClick={() => setSelectedStepIdx(idx)}
                >
                  <span>{s.title}</span>
                  <ArrowRight size={14} color={selectedStepIdx === idx ? "#2a7c4f" : "var(--text-muted)"} />
                </button>
              ))}
            </div>
          </div>

          {/* Step Detail Card */}
          <div className="dashboard-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309" }}>
                  Step {selectedStepIdx + 1} of {salahDetails.length}
                </span>
                <h3 style={{ fontSize: "20px", color: "var(--text-heading)", marginTop: "6px" }}>
                  {currentStep.title}
                </h3>
              </div>
              <img
                src="/images/namaz_worshipper.jpg"
                alt="Worshipper posture"
                style={{ width: "70px", height: "90px", objectFit: "contain" }}
              />
            </div>

            {/* Arabic Box */}
            <div
              style={{
                background: "#fcfbf7",
                border: "1px solid #f2ede0",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                textAlign: "center",
                marginBottom: "16px",
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
                {currentStep.arabic}
              </div>
              <div style={{ fontSize: "12px", color: "#8c7648", fontWeight: "600", fontStyle: "italic" }}>
                {currentStep.transliteration}
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <h5 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
                English Meaning:
              </h5>
              <p style={{ fontSize: "13px", color: "var(--text-heading)", marginTop: "4px", lineHeight: "1.45" }}>
                "{currentStep.meaning}"
              </p>
            </div>

            <div style={{ background: "var(--bg-subtle)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
              <h5 style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-green)", marginBottom: "4px" }}>
                How to perform posture correctly:
              </h5>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                {currentStep.action}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Wudu Guide */
        <div className="dashboard-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "18px", color: "var(--text-heading)", marginBottom: "16px" }}>
            The 8 Sunnah Steps of Wudu (Ablution)
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
            {wuduSteps.map((w, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--primary-green)", marginBottom: "6px" }}>
                  {w.title}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
