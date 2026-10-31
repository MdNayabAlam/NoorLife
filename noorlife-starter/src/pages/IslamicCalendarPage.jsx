import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Sparkles,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Globe,
  RotateCcw,
  Moon,
  Clock,
  Compass,
  CheckCircle2,
  Calendar as CalendarIcon,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { fetchIslamicFestivalsAPI } from "../services/api";
import { getHijriDate, getGregorianDate } from "../utils/islamicDate";

// High-precision astronomical calculation for any Gregorian year
function hijriToGregorian(year, month, day) {
  const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
  let l = jd + 68569;
  let n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  let i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  let j = Math.floor((80 * l) / 2447);
  let gDay = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  let gMonth = j + 2 - 12 * l;
  let gYear = 100 * (n - 49) + i + l;
  return new Date(gYear, gMonth - 1, gDay);
}

function gregorianToHijri(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let m = month + 1;
  let y = year;
  if (m < 3) { y -= 1; m += 12; }
  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
  let z = jd - 1948440 + 10632;
  let n = Math.floor((z - 1) / 10631);
  z = z - 10631 * n + 354;
  let j = (Math.floor((10985 - z) / 5316)) * (Math.floor((50 * z) / 17719)) + (Math.floor(z / 5670)) * (Math.floor((43 * z) / 15238));
  z = z - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  let hMonth = Math.floor((24 * z) / 709);
  let hDay = z - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;
  return { year: hYear, month: hMonth, day: hDay };
}

const HIJRI_MONTH_NAMES = [
  "", "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah"
];

const FESTIVAL_TEMPLATES = [
  {
    id: "shab-e-miraj",
    title: "Isra & Mi'raj (The Night Journey & Ascension)",
    arabic: "الإسراء والمعراج",
    hMonth: 7,
    hDay: 27,
    type: "Night of Worship",
    category: "Sacred Night",
    color: "#2a9d8f",
    description: "The miraculous night journey of Prophet Muhammad ﷺ from Makkah to Jerusalem, and ascension through the seven heavens where 5 daily prayers were gifted.",
    sunnahs: ["Voluntary night prayers (Tahajjud)", "Recitation of Surah Al-Isra", "Dhikr & Istighfar", "Fasting the following day (Mustahabb)"],
  },
  {
    id: "shab-e-barat",
    title: "Shab-e-Barat (Night of Forgiveness & Records)",
    arabic: "ليلة البراءة / نصف شعبان",
    hMonth: 8,
    hDay: 15,
    type: "Night of Forgiveness",
    category: "Spiritual Night",
    color: "#40916c",
    description: "The blessed night of divine pardon and repentance. Believers spend the night in prayers seeking Allah's mercy and blessings for the coming year.",
    sunnahs: ["Seeking forgiveness (Sayyidul Istighfar)", "Recitation of Surah Yasin", "Fasting the 15th of Sha'ban (Ayyam al-Beed)", "Charity to the needy"],
  },
  {
    id: "ramadan-start",
    title: "First Day of Ramadan (Beginning of Blessed Fasting)",
    arabic: "غرة شهر رمضان المبارك",
    hMonth: 9,
    hDay: 1,
    type: "Holy Month",
    category: "Obligatory Fasting",
    color: "#1b4332",
    description: "Beginning of the blessed month of fasting, intense Quran recitation, nightly Taraweeh prayers, self-restraint, and multiplication of rewards.",
    sunnahs: ["Intention for Sawm (Fasting)", "Suhoor meal before Fajr", "Nightly Taraweeh prayer", "Completing at least one Quran Khatam"],
  },
  {
    id: "laylatul-qadr",
    title: "Laylatul Qadr (The Night of Power & Destiny)",
    arabic: "ليلة القدر المباركة",
    hMonth: 9,
    hDay: 27,
    type: "Priceless Worship",
    category: "Night of Power",
    color: "#c6a256",
    description: "Better than a thousand months (Surah Al-Qadr). The night when the Holy Quran was revealed from the Preserved Tablet to the lowest heaven.",
    sunnahs: ["Dua: 'Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni'", "Itikaf in the Masjid", "Giving generous Sadaqah", "Continuous Tahajjud until Fajr"],
  },
  {
    id: "eid-al-fitr",
    title: "Eid al-Fitr (Festival of Breaking the Fast)",
    arabic: "عيد الفطر المبارك",
    hMonth: 10,
    hDay: 1,
    type: "Major Festival",
    category: "Celebration",
    color: "#2d6a4f",
    description: "The joy of completing Ramadan. Muslims unite in Eid Salah, pay Zakat al-Fitr before prayer, embrace family, and share meals with the community.",
    sunnahs: ["Eating dates (odd number) before prayer", "Ghusl and wearing best/clean clothes", "Reciting Takbeerat on the way", "Paying Zakat al-Fitr before Eid Salah"],
  },
  {
    id: "day-of-arafah",
    title: "Day of Arafah (Apex of Hajj Pilgrimage)",
    arabic: "يوم عرفة المبارك",
    hMonth: 12,
    hDay: 9,
    type: "Sunnah Fasting",
    category: "Sacred Day",
    color: "#e76f51",
    description: "The most sacred day of the Islamic year. Pilgrims stand at the plains of Mount Arafat. Fasting this day expiates sins of the previous and coming year.",
    sunnahs: ["Fasting for non-pilgrims (huge expiation)", "Reciting Dua Arafah repeatedly", "Excessive Istighfar & Supplication", "Takbeerat Tashreeq after every Fard prayer"],
  },
  {
    id: "eid-al-adha",
    title: "Eid al-Adha (Festival of Sacrifice & Qurbani)",
    arabic: "عيد الأضحى المبارك",
    hMonth: 12,
    hDay: 10,
    type: "Major Festival",
    category: "Celebration & Qurbani",
    color: "#174232",
    description: "Commemorating Prophet Ibrahim's (AS) supreme devotion to Allah. Marked by Eid Salah, performing Qurbani (sacrifice), and sharing meat with the poor.",
    sunnahs: ["Delaying breakfast until after Eid Salah", "Performing Qurbani/Udhiyah sacrifice", "Distributing meat in 3 equal parts (poor, relatives, self)", "Takbeerat-e-Tashreeq until 13th Dhul-Hijjah"],
  },
  {
    id: "islamic-new-year",
    title: "Islamic New Year (1st of Muharram)",
    arabic: "رأس السنة الهجرية",
    hMonth: 1,
    hDay: 1,
    type: "Sacred Month",
    category: "New Year",
    color: "#264653",
    description: "Marks the beginning of the Hijri lunar year, commemorating the historic migration (Hijrah) of Prophet Muhammad ﷺ from Makkah to Madinah.",
    sunnahs: ["Making Dua for a blessed new year", "Reflecting on time and personal accountability", "Voluntary fasting in Muharram (best fast after Ramadan)"],
  },
  {
    id: "tasua-ashura",
    title: "Tasu'a & Day of Ashura (9th & 10th Muharram)",
    arabic: "يوم عاشوراء وتاسوعاء",
    hMonth: 1,
    hDay: 10,
    type: "Sunnah Fasting",
    category: "Sacred Fast",
    color: "#52796f",
    description: "The day Allah delivered Prophet Musa (AS) and the Children of Israel from Pharaoh. Fasting Ashura expiates the sins of the past year.",
    sunnahs: ["Fasting on the 9th and 10th (or 10th and 11th) Muharram", "Spending generously on one's family on Ashura", "Offering voluntary prayers"],
  },
  {
    id: "mawlid-al-nabi",
    title: "Mawlid al-Nabi (Birth of Prophet Muhammad ﷺ)",
    arabic: "المولد النبوي الشريف",
    hMonth: 3,
    hDay: 12,
    type: "Blessed Remembrance",
    category: "Remembrance",
    color: "#2b9348",
    description: "Remembering the blessed arrival of the Mercy to the Worlds (Rahmatul-lil-'Alameen), Prophet Muhammad ﷺ, studying his Seerah and sending abundant Salawat.",
    sunnahs: ["Sending abundant Durood & Salawat upon Rasulullah ﷺ", "Studying the Prophet's Shamail & noble character", "Feeding the poor and needy", "Fasting on Mondays (the day the Prophet was born)"],
  }
];

function calculateClientFestivals(gregorianYear) {
  const jan1Hijri = gregorianToHijri(new Date(gregorianYear, 0, 1)).year;
  const dec31Hijri = gregorianToHijri(new Date(gregorianYear, 11, 31)).year;
  const results = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let hYear = jan1Hijri - 1; hYear <= dec31Hijri + 1; hYear++) {
    for (const t of FESTIVAL_TEMPLATES) {
      const gDate = hijriToGregorian(hYear, t.hMonth, t.hDay);
      if (gDate.getFullYear() === gregorianYear) {
        const diffDays = Math.round((gDate - today) / (1000 * 60 * 60 * 24));
        let status = "";
        if (diffDays === 0) status = "Today!";
        else if (diffDays === 1) status = "Tomorrow";
        else if (diffDays > 1) status = `In ${diffDays} days`;
        else status = `Passed (${Math.abs(diffDays)} days ago)`;

        results.push({
          ...t,
          uniqueKey: `${t.id}-${hYear}-${gregorianYear}`,
          hijriYear: hYear,
          hijriDate: `${t.hDay} ${HIJRI_MONTH_NAMES[t.hMonth]} ${hYear} AH`,
          gregorianDate: gDate.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
          rawDate: gDate.toISOString().split("T")[0],
          daysRemaining: diffDays,
          status,
        });
      }
    }
  }

  return results.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
}

export function IslamicCalendarPage({ onAddEventToFamily, showToast, onNavigateFamily }) {
  const currentSystemYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentSystemYear);
  const [yearInput, setYearInput] = useState(String(currentSystemYear));
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [festivalsList, setFestivalsList] = useState(() => calculateClientFestivals(currentSystemYear));
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const todayHijri = getHijriDate(currentTime);
  const todayGregorian = getGregorianDate(currentTime);
  const yearPresets = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  useEffect(() => {
    const calculated = calculateClientFestivals(selectedYear);
    setFestivalsList(calculated);

    setLoading(true);
    fetchIslamicFestivalsAPI(selectedYear)
      .then((data) => {
        if (data && data.length > 0) setFestivalsList(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedYear]);

  const handleYearSubmit = (e) => {
    e.preventDefault();
    const y = parseInt(yearInput.trim(), 10);
    if (!isNaN(y) && y >= 1900 && y <= 2100) {
      setSelectedYear(y);
      if (showToast) showToast(`Calculated Islamic Calendar for Year ${y} 🗓️`);
    } else {
      alert("Please enter a valid year between 1900 and 2100.");
    }
  };

  const changeYearBy = (delta) => {
    const newY = selectedYear + delta;
    if (newY >= 1900 && newY <= 2100) {
      setSelectedYear(newY);
      setYearInput(String(newY));
      if (showToast) showToast(`Showing Islamic events for ${newY} 🌙`);
    }
  };

  const handlePresetYear = (y) => {
    setSelectedYear(y);
    setYearInput(String(y));
    if (showToast) showToast(`Showing Islamic events for ${y} 🌙`);
  };

  const handleAddFestivalToFamilyCalendar = (f) => {
    if (onAddEventToFamily) {
      onAddEventToFamily({
        id: Date.now(),
        title: `🌙 ${f.title}`,
        date: f.gregorianDate.split(" ").slice(1, 3).join(" "),
        fullDate: f.rawDate || f.gregorianDate,
        time: "All Day",
        category: "Deen",
        color: f.color || "#1b4332",
      });
      if (showToast) showToast(`Added "${f.title}" to Family Calendar! 🌿`);
    }
  };

  const filteredFestivals = festivalsList.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.hijriDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.arabic && f.arabic.includes(searchQuery)) ||
      f.gregorianDate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      categoryFilter === "all" ||
      (categoryFilter === "eids" && (f.id.includes("eid") || f.type.includes("Major Festival"))) ||
      (categoryFilter === "ramadan" && (f.id.includes("ramadan") || f.id.includes("qadr"))) ||
      (categoryFilter === "fasting" && f.type.toLowerCase().includes("fasting")) ||
      (categoryFilter === "nights" && f.type.toLowerCase().includes("night"));

    return matchesSearch && matchesCat;
  });

  const startHijri = gregorianToHijri(new Date(selectedYear, 0, 1)).year;
  const endHijri = gregorianToHijri(new Date(selectedYear, 11, 31)).year;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "20px" }}>🌙</span>
            <h2 style={{ margin: 0 }}>Islamic Hijri Calendar & Blessed Events</h2>
          </div>
          <p>
            Astronomically calculated Hijri lunar dates, major Islamic festivals, Ramadan, Eids, and Sunnah fasting days.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {onNavigateFamily && (
            <button
              className="card-action-btn-green"
              onClick={onNavigateFamily}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <CalendarDays size={15} color="var(--primary-green)" />
              <span>Open Family Calendar</span>
            </button>
          )}
        </div>
      </div>

      {/* TODAY'S HIJRI LIVE STATUS BANNER */}
      <div
        className="dashboard-card"
        style={{
          padding: "18px 22px",
          background: "linear-gradient(135deg, #0e291e 0%, #174232 50%, #266b4f 100%)",
          color: "#ffffff",
          marginBottom: "18px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 6px 20px rgba(14, 41, 30, 0.25)",
          border: "1px solid rgba(198, 162, 86, 0.35)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(198, 162, 86, 0.2)",
                border: "1.5px solid var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px"
              }}
            >
              🌙
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--accent-gold-light)", letterSpacing: "0.5px" }}>
                  TODAY'S HIJRI / URDU DATE (HILAL SIGHTING)
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    background: todayHijri.isAfterMaghrib ? "rgba(46, 204, 113, 0.25)" : "rgba(198, 162, 86, 0.25)",
                    border: todayHijri.isAfterMaghrib ? "1px solid #2ecc71" : "1px solid var(--accent-gold)",
                    color: todayHijri.isAfterMaghrib ? "#6ee7b7" : "var(--accent-gold-light)"
                  }}
                >
                  {todayHijri.isAfterMaghrib ? "🌙 Maghrib Passed (Agli Tarikh Shuru)" : "☀️ Daytime (Maghrib par change hogi)"}
                </span>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", margin: "4px 0 0" }}>
                {todayHijri.formatted} AH
              </h3>
              <div style={{ fontSize: "12px", color: "#cce0d2", marginTop: "2px" }}>
                🗓️ {todayGregorian.weekday}, {todayGregorian.formatted} • Islamic day changes after Maghrib sunset 🌅
              </div>
            </div>
          </div>

          {/* Quick Sunnah Fasting Pill */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(6px)",
              padding: "10px 16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <Sparkles size={18} color="var(--accent-gold-light)" />
            <div>
              <div style={{ fontSize: "11px", color: "var(--accent-gold-light)", fontWeight: "700" }}>
                SUNNAH FASTING
              </div>
              <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: "600" }}>
                Ayyam al-Beed: 13, 14, 15 {todayHijri.monthName}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC MULTI-YEAR ASTRONOMICAL ENGINE CARD */}
      <div
        className="dashboard-card"
        style={{
          padding: "20px 24px",
          background: "linear-gradient(135deg, #133927 0%, #1c503b 100%)",
          color: "#ffffff",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold-light)", fontSize: "12px", fontWeight: "700" }}>
              <Globe size={14} />
              <span>ASTRONOMICAL MULTI-YEAR HIJRI ENGINE</span>
            </div>
            <h3 style={{ fontSize: "24px", color: "#ffffff", fontWeight: "800", marginTop: "4px" }}>
              Year {selectedYear} CE ({startHijri} - {endHijri} AH)
            </h3>
            <p style={{ fontSize: "12.5px", color: "#cce0d2", marginTop: "2px" }}>
              Total <strong>{festivalsList.length} major Islamic observances & blessed nights</strong> calculated for {selectedYear}
            </p>
          </div>

          {/* Year Search Form with Prev/Next Controls */}
          <form onSubmit={handleYearSubmit} style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="action-icon-btn"
              onClick={() => changeYearBy(-1)}
              style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "none" }}
              title={`Go to previous year (${selectedYear - 1})`}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", background: "#ffffff", borderRadius: "var(--radius-md)", padding: "2px 8px" }}>
              <input
                type="number"
                min="1900"
                max="2100"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                style={{
                  width: "80px",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#174232",
                  padding: "6px 4px",
                  textAlign: "center",
                }}
                title="Type any year between 1900 and 2100"
              />
              <button
                type="submit"
                style={{
                  background: "var(--primary-green)",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Go
              </button>
            </div>

            <button
              type="button"
              className="action-icon-btn"
              onClick={() => changeYearBy(1)}
              style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "none" }}
              title={`Go to next year (${selectedYear + 1})`}
            >
              <ChevronRight size={18} />
            </button>

            {selectedYear !== currentSystemYear && (
              <button
                type="button"
                onClick={() => handlePresetYear(currentSystemYear)}
                style={{
                  background: "rgba(198, 162, 86, 0.3)",
                  color: "var(--accent-gold-light)",
                  border: "1px solid var(--accent-gold)",
                  padding: "7px 12px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "11.5px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                title="Reset to current year"
              >
                <RotateCcw size={12} />
                <span>Today ({currentSystemYear})</span>
              </button>
            )}
          </form>
        </div>

        {/* Quick Year Presets Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "12px" }}>
          <span style={{ fontSize: "11px", color: "var(--accent-gold-light)", fontWeight: "700" }}>Quick Years:</span>
          {yearPresets.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => handlePresetYear(y)}
              style={{
                fontSize: "11.5px",
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: selectedYear === y ? "var(--accent-gold)" : "rgba(255,255,255,0.15)",
                color: selectedYear === y ? "#174232" : "#ffffff",
                fontWeight: selectedYear === y ? "800" : "600",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {y} {y === currentSystemYear ? "(Current)" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Islamic Events" },
            { id: "eids", label: "Major Eids 🕌" },
            { id: "ramadan", label: "Ramadan & Qadr 🌙" },
            { id: "fasting", label: "Sunnah Fasts 🤲" },
            { id: "nights", label: "Sacred Nights ✨" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              style={{
                padding: "7px 14px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--border-color)",
                background: categoryFilter === cat.id ? "var(--primary-green)" : "var(--bg-card)",
                color: categoryFilter === cat.id ? "#ffffff" : "var(--text-heading)",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", width: "260px" }}>
          <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: "32px", paddingRight: "10px", height: "36px", fontSize: "12px" }}
            placeholder="Search Eid, Ramadan, Ashura..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FESTIVAL CARDS GRID */}
      <div className="festival-cards-grid" style={{ marginBottom: "28px" }}>
        {filteredFestivals.map((f) => (
          <div
            key={f.uniqueKey || f.id}
            className="dashboard-card"
            style={{
              padding: "20px",
              borderLeft: `5px solid ${f.color || "var(--primary-green)"}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--bg-card)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                <div>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "700",
                      background: "var(--bg-subtle)",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-pill)",
                      color: f.color || "var(--primary-green)",
                    }}
                  >
                    {f.type}
                  </span>
                  <h4 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-heading)", marginTop: "6px" }}>
                    {f.title}
                  </h4>
                </div>

                <span
                  style={{
                    fontSize: "17px",
                    fontFamily: "Traditional Arabic, Scheherazade, serif",
                    fontWeight: "700",
                    color: "var(--primary-green)",
                    direction: "rtl",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.arabic}
                </span>
              </div>

              {/* Dates Row */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "12px", fontSize: "12.5px" }}>
                <div style={{ color: "var(--primary-green)", fontWeight: "800" }}>
                  🌙 {f.hijriDate}
                </div>
                <div style={{ color: "var(--text-heading)", fontWeight: "600" }}>
                  🗓️ {f.gregorianDate}
                </div>
              </div>

              {/* Status Badge */}
              <div style={{ marginTop: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "3px 9px",
                    borderRadius: "var(--radius-pill)",
                    background: f.daysRemaining === 0 ? "#fef3c7" : f.daysRemaining > 0 ? "var(--accent-cream)" : "#f1f5f9",
                    color: f.daysRemaining === 0 ? "#b45309" : f.daysRemaining > 0 ? "var(--primary-green)" : "#64748b",
                  }}
                >
                  {f.status}
                </span>
              </div>

              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px", lineHeight: "1.45" }}>
                {f.description}
              </p>

              {/* Recommended Sunnahs */}
              {f.sunnahs && (
                <div style={{ marginTop: "12px", background: "var(--bg-subtle)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--text-heading)" }}>
                    Recommended Sunnahs:
                  </span>
                  <ul style={{ margin: "5px 0 0 16px", padding: 0, fontSize: "11px", color: "var(--text-muted)" }}>
                    {f.sunnahs.slice(0, 3).map((s, idx) => (
                      <li key={idx} style={{ marginBottom: "2px" }}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Action: Add to Family Calendar */}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => handleAddFestivalToFamilyCalendar(f)}
                className="card-action-btn-green"
                style={{
                  padding: "7px 14px",
                  fontSize: "11.5px",
                  borderRadius: "var(--radius-pill)",
                  gap: "5px",
                }}
                title={`Sync ${f.title} to your Family Calendar`}
              >
                <Plus size={13} strokeWidth={3} />
                <span>Add to Family Calendar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SPECIAL EDUCATIONAL SECTION: SUNNAH FASTING GUIDELINES */}
      <div
        className="dashboard-card"
        style={{
          padding: "22px",
          background: "var(--bg-subtle)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-green)", fontWeight: "700", fontSize: "13px" }}>
            <BookOpen size={16} />
            <span>Sunnah Fasting Tradition (Ayyam al-Beed & Weekly Fasts)</span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px", lineHeight: "1.5" }}>
            The Prophet Muhammad ﷺ encouraged fasting the 13th, 14th, and 15th of each lunar month (Ayyam al-Beed - The White Days) as well as every Monday and Thursday.
            <em> "Fasting three days of every month is equivalent to fasting the entire lifetime." (Sahih Bukhari)</em>
          </p>
        </div>

        {onNavigateFamily && (
          <button
            onClick={onNavigateFamily}
            className="card-action-btn-green"
            style={{ padding: "9px 18px", fontSize: "12px", gap: "6px" }}
          >
            <span>Go to Family Calendar</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
