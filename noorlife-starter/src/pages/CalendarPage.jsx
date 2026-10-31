import React, { useState, useEffect } from "react";
import {
  CalendarDays, Plus, Clock, Tag, Trash2, Sparkles, Search, Filter, Bookmark, Check,
  Calendar as CalendarIcon, Heart, Compass, ChevronLeft, ChevronRight, Globe, RotateCcw
} from "lucide-react";
import { fetchIslamicFestivalsAPI } from "../services/api";

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

// Master Festival Templates defined on the Hijri Lunar Calendar
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
    id: "eid-ul-fitr",
    title: "Eid-ul-Fitr (Festival of Breaking the Fast)",
    arabic: "عيد الفطر السعيد",
    hMonth: 10,
    hDay: 1,
    type: "Major Festival",
    category: "Islamic Celebration",
    color: "#e76f51",
    description: "Joyous day of celebration thanking Allah for enabling the completion of Ramadan fasting. Characterized by congregational Eid prayer, sharing feasts, and gift-giving.",
    sunnahs: ["Paying Zakat al-Fitr before Eid Salah", "Taking Ghusl & wearing best clean clothes", "Eating an odd number of dates before prayer", "Chanting Eid Takbeerat"],
  },
  {
    id: "day-of-arafah",
    title: "Day of Arafah (Hajj Peak & Day of Repentance)",
    arabic: "يوم عرفة",
    hMonth: 12,
    hDay: 9,
    type: "Sacred Fasting",
    category: "Sacred Day",
    color: "#2a7c4f",
    description: "The pinnacle of the sacred Hajj pilgrimage. For non-pilgrims, fasting on this day expiates sins of the previous year and the coming year.",
    sunnahs: ["Fasting for non-pilgrims (Sunnah Mu'akkadah)", "Abundant Dua and Takbeer", "Reciting Tahleel", "Generous charity"],
  },
  {
    id: "eid-ul-adha",
    title: "Eid-ul-Adha (Feast of the Sacrifice & Qurbani)",
    arabic: "عيد الأضحى المبارك",
    hMonth: 12,
    hDay: 10,
    type: "Major Festival",
    category: "Islamic Celebration",
    color: "#d97706",
    description: "Honoring the historic devotion of Prophet Ibrahim (AS) and Prophet Ismail (AS). Marked by Eid congregational prayer, Qurbani (sacrifice), and sharing meat.",
    sunnahs: ["Abstaining from cutting hair/nails in Dhul-Hijjah until sacrifice", "Performing Eid Salah", "Performing Udhiyah/Qurbani", "Takbeerat Tashreeq after every Fardh prayer"],
  },
  {
    id: "islamic-new-year",
    title: "Islamic New Year (1 Muharram)",
    arabic: "رأس السنة الهجرية",
    hMonth: 1,
    hDay: 1,
    type: "Sacred Month Opening",
    category: "New Year",
    color: "#1e3a8a",
    description: "The start of the Hijri lunar year, commemorating the historic Hijrah (migration) of Prophet Muhammad ﷺ and the Sahaba from Makkah to Madinah.",
    sunnahs: ["Reflecting on life's journey & spiritual goals", "Setting Quran & good deed intentions", "Increasing voluntary prayers in the sacred month of Muharram"],
  },
  {
    id: "day-of-ashura",
    title: "Day of Ashura (10 Muharram)",
    arabic: "يوم عاشوراء",
    hMonth: 1,
    hDay: 10,
    type: "Sacred Fasting",
    category: "Historical Deliverance",
    color: "#6b21a8",
    description: "The day Allah delivered Prophet Musa (AS) and Bani Israel from the tyranny of Pharaoh by parting the Red Sea. Prophet Muhammad ﷺ fasted and recommended believers to fast.",
    sunnahs: ["Fasting on the 9th and 10th of Muharram (or 10th and 11th)", "Being generous to one's family and household", "Reciting Dua-e-Ashura"],
  },
  {
    id: "mawlid-an-nabi",
    title: "Mawlid an-Nabi (Prophet's Birth)",
    arabic: "المولد النبوي الشريف",
    hMonth: 3,
    hDay: 12,
    type: "Holy Occasion",
    category: "Seerah & Gratitude",
    color: "#047857",
    description: "Commemoration of the birth of the final Messenger, Muhammad ﷺ, the Mercy to all creations. Marked with study of the Seerah, reciting Salawat, and charity.",
    sunnahs: ["Reciting abundant Salawat upon the Prophet ﷺ", "Reading and teaching the Seerah (Prophetic biography)", "Feeding the poor and neighbors", "Fasting on Mondays (Sunnah)"],
  }
];

function calculateClientFestivals(targetYear) {
  const gYear = parseInt(targetYear, 10) || new Date().getFullYear();
  const startH = gregorianToHijri(new Date(gYear, 0, 1)).year;
  const endH = gregorianToHijri(new Date(gYear, 11, 31)).year;
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const results = [];
  for (let hy = startH - 1; hy <= endH + 1; hy++) {
    for (const t of FESTIVAL_TEMPLATES) {
      const gDate = hijriToGregorian(hy, t.hMonth, t.hDay);
      if (gDate.getFullYear() === gYear) {
        const diffTime = gDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status = "";
        if (diffDays === 0) status = "Today / Active Festival 🎉";
        else if (diffDays > 0) status = `Upcoming in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
        else status = `Passed (${Math.abs(diffDays)} days ago)`;

        const gFormatted = gDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        results.push({
          id: `${t.id}-${hy}`,
          templateId: t.id,
          title: `${t.title} (${hy} AH)`,
          arabic: t.arabic,
          hijriDate: `${t.hDay < 10 ? "0" + t.hDay : t.hDay} ${HIJRI_MONTH_NAMES[t.hMonth]} ${hy} AH`,
          gregorianDate: gFormatted,
          rawDate: gDate.toISOString().split("T")[0],
          type: t.type,
          category: t.category,
          color: t.color,
          description: t.description,
          sunnahs: t.sunnahs,
          daysRemaining: diffDays,
          status,
          year: gYear,
          hijriYear: hy
        });
      }
    }
  }

  return results.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
}

export function CalendarPage({ events = [], onAddEvent, onDeleteEvent, showToast }) {
  const currentSystemYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentSystemYear);
  const [yearInput, setYearInput] = useState(String(currentSystemYear));
  const [activeTab, setActiveTab] = useState("festivals"); // "all", "festivals", "family"
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchFestivalQuery, setSearchFestivalQuery] = useState("");
  const [festivalCategoryFilter, setFestivalCategoryFilter] = useState("all");
  const [festivalsList, setFestivalsList] = useState(() => calculateClientFestivals(currentSystemYear));
  const [loadingFestivals, setLoadingFestivals] = useState(false);

  // Form states for adding custom family event
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(`${currentSystemYear}-05-20`);
  const [time, setTime] = useState("11:00 AM");
  const [category, setCategory] = useState("Family");

  // Popular year presets
  const yearPresets = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // Load festivals whenever selectedYear changes
  useEffect(() => {
    // Immediate instantaneous astronomical calculation
    const calculated = calculateClientFestivals(selectedYear);
    setFestivalsList(calculated);

    // Also sync with backend API
    setLoadingFestivals(true);
    fetchIslamicFestivalsAPI(selectedYear)
      .then((data) => {
        if (data && data.length > 0) {
          setFestivalsList(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingFestivals(false));
  }, [selectedYear]);

  const handleYearSubmit = (e) => {
    e.preventDefault();
    const y = parseInt(yearInput.trim(), 10);
    if (!isNaN(y) && y >= 1900 && y <= 2100) {
      setSelectedYear(y);
      if (showToast) showToast(`Calculated Islamic Festivals for Year ${y} 🗓️`);
    } else {
      alert("Please enter a valid Gregorian year between 1900 and 2100.");
    }
  };

  const changeYearBy = (delta) => {
    const newY = selectedYear + delta;
    if (newY >= 1900 && newY <= 2100) {
      setSelectedYear(newY);
      setYearInput(String(newY));
      if (showToast) showToast(`Showing festivals for ${newY} 🗓️`);
    }
  };

  const handlePresetYear = (y) => {
    setSelectedYear(y);
    setYearInput(String(y));
    if (showToast) showToast(`Showing festivals for ${y} 🗓️`);
  };

  // Filtered festivals based on search and category
  const filteredFestivals = festivalsList.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchFestivalQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchFestivalQuery.toLowerCase()) ||
      f.hijriDate.toLowerCase().includes(searchFestivalQuery.toLowerCase()) ||
      f.gregorianDate.toLowerCase().includes(searchFestivalQuery.toLowerCase());

    const matchesCat =
      festivalCategoryFilter === "all" ||
      (festivalCategoryFilter === "eids" && (f.id.includes("eid") || f.type.includes("Major Festival"))) ||
      (festivalCategoryFilter === "ramadan" && (f.id.includes("ramadan") || f.id.includes("qadr"))) ||
      (festivalCategoryFilter === "fasting" && f.type.toLowerCase().includes("fasting")) ||
      (festivalCategoryFilter === "nights" && f.type.toLowerCase().includes("night"));

    return matchesSearch && matchesCat;
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const formattedDate = new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" });
    onAddEvent({
      id: Date.now(),
      title: title.trim(),
      date: formattedDate,
      fullDate: date,
      time,
      category,
      color: category === "School" ? "#1b4332" : category === "Bills" ? "#e76f51" : category === "Deen" ? "#c6a256" : "#2a9d8f"
    });
    setTitle("");
    setShowAddForm(false);
    if (showToast) showToast(`Added "${title.trim()}" to Family Calendar!`);
  }

  function handleAddFestivalToCalendar(f) {
    if (onAddEvent) {
      onAddEvent({
        id: Date.now(),
        title: `🌙 ${f.title}`,
        date: f.gregorianDate.split(" ").slice(1, 3).join(" "),
        fullDate: f.rawDate || f.gregorianDate,
        time: "All Day",
        category: "Deen",
        color: f.color || "#1b4332"
      });
      if (showToast) showToast(`Added "${f.title}" to Family Calendar! 🌿`);
    }
  }

  // Calculate overlapping Hijri Years for display
  const startHijri = gregorianToHijri(new Date(selectedYear, 0, 1)).year;
  const endHijri = gregorianToHijri(new Date(selectedYear, 11, 31)).year;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <h2>Universal Islamic Calendar & Festivals (Any Year)</h2>
          <p>
            Real astronomical calculation for any Gregorian or Hijri year. Search any year to discover exact dates of Ramadan, Eid, and holy days.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="card-action-btn-green"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>{showAddForm ? "Close Form" : "Add Family Event"}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC YEAR SELECTOR & CONTROLLER CARD */}
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
              <span>ASTRONOMICAL MULTI-YEAR FESTIVAL ENGINE</span>
            </div>
            <h3 style={{ fontSize: "26px", color: "#ffffff", fontWeight: "800", marginTop: "4px" }}>
              Year {selectedYear} CE ({startHijri} - {endHijri} AH)
            </h3>
            <p style={{ fontSize: "12.5px", color: "#cce0d2", marginTop: "2px" }}>
              Total <strong>{festivalsList.length} major Islamic observances</strong> calculated for {selectedYear}
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

      {/* Tabs Row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "18px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("festivals")}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-pill)",
            border: "none",
            background: activeTab === "festivals" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "festivals" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Sparkles size={14} color={activeTab === "festivals" ? "var(--accent-gold)" : "var(--text-muted)"} />
          <span>Islamic Festivals {selectedYear} ({festivalsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("all")}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-pill)",
            border: "none",
            background: activeTab === "all" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "all" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CalendarIcon size={14} />
          <span>Combined Timeline ({events.length + festivalsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("family")}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-pill)",
            border: "none",
            background: activeTab === "family" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "family" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CalendarDays size={14} />
          <span>Family & Tasks ({events.length})</span>
        </button>
      </div>

      {/* Add Event Inline Drawer */}
      {showAddForm && (
        <div className="dashboard-card" style={{ padding: "20px", background: "var(--bg-subtle)", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "15px", marginBottom: "14px", color: "var(--text-heading)" }}>Create New Family Event</h3>
          <form onSubmit={handleSubmit} className="calendar-add-event-form">
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Doctor's appointment, School exam, Eid Shopping"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="text"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Family">Family</option>
                <option value="School">School</option>
                <option value="Bills">Bills</option>
                <option value="Deen">Deen / Islamic</option>
              </select>
            </div>
            <button type="submit" className="card-action-btn-green" style={{ padding: "10px 20px", height: "42px" }}>
              Save Event
            </button>
          </form>
        </div>
      )}

      {/* ISLAMIC FESTIVALS SECTION */}
      {(activeTab === "festivals" || activeTab === "all") && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h3 style={{ fontSize: "18px", color: "var(--text-heading)", fontWeight: "800" }}>
                Islamic Festivals Directory for {selectedYear}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Authentic dates calculated according to the astronomical Hijri lunar cycle.
              </p>
            </div>

            {/* Festival Search & Category Filter */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", width: "220px" }}>
                <Search size={14} color="var(--text-muted)" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: "32px", paddingRight: "10px", height: "34px", fontSize: "12px" }}
                  placeholder="Filter festival by name..."
                  value={searchFestivalQuery}
                  onChange={(e) => setSearchFestivalQuery(e.target.value)}
                />
              </div>

              <select
                className="form-select"
                style={{ height: "34px", fontSize: "12px", width: "auto" }}
                value={festivalCategoryFilter}
                onChange={(e) => setFestivalCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="eids">Major Eids</option>
                <option value="ramadan">Ramadan & Qadr</option>
                <option value="fasting">Fasting Days</option>
                <option value="nights">Sacred Nights</option>
              </select>
            </div>
          </div>

          {/* Festival Cards Grid */}
          <div className="festival-cards-grid">
            {filteredFestivals.map((f) => (
              <div
                key={f.id}
                className="dashboard-card"
                style={{
                  padding: "18px",
                  borderLeft: `5px solid ${f.color || "var(--primary-green)"}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                          padding: "2px 8px",
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
                        fontSize: "16px",
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "10px", fontSize: "12px" }}>
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
                        padding: "3px 8px",
                        borderRadius: "var(--radius-pill)",
                        background: f.daysRemaining === 0 ? "#fef3c7" : f.daysRemaining > 0 ? "var(--accent-cream)" : "#f1f5f9",
                        color: f.daysRemaining === 0 ? "#b45309" : f.daysRemaining > 0 ? "var(--primary-green)" : "#64748b",
                      }}
                    >
                      {f.status}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px", lineHeight: "1.4" }}>
                    {f.description}
                  </p>

                  {/* Sunnahs Tags */}
                  {f.sunnahs && (
                    <div style={{ marginTop: "10px", background: "var(--bg-subtle)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                      <span style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--text-heading)" }}>
                        Recommended Sunnahs:
                      </span>
                      <ul style={{ margin: "4px 0 0 16px", padding: 0, fontSize: "11px", color: "var(--text-muted)" }}>
                        {f.sunnahs.slice(0, 3).map((s, idx) => (
                          <li key={idx} style={{ marginBottom: "2px" }}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => handleAddFestivalToCalendar(f)}
                    className="card-action-btn-green"
                    style={{
                      padding: "6px 14px",
                      fontSize: "11px",
                      borderRadius: "var(--radius-pill)",
                      gap: "5px",
                    }}
                    title={`Add ${f.title} to your personal family calendar`}
                  >
                    <Plus size={12} strokeWidth={3} />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAMILY EVENTS SECTION */}
      {(activeTab === "family" || activeTab === "all") && (
        <div className="dashboard-card" style={{ padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "17px", color: "var(--text-heading)", fontWeight: "700" }}>
              Family & Personal Calendar ({events.length} items)
            </h3>
            <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
              Includes household tasks, school events & scheduled Islamic dates
            </span>
          </div>

          {events.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--text-muted)" }}>
              <CalendarDays size={36} color="var(--border-color)" style={{ marginBottom: "8px" }} />
              <p>No family events scheduled. Click "Add Family Event" to schedule an appointment or reminder.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {events.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 18px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div className="event-date-chip" style={{ minWidth: "68px", textAlign: "center", fontWeight: "700" }}>
                      {ev.date}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                        <Clock size={11} style={{ display: "inline", marginRight: "4px" }} />
                        {ev.time} • <Tag size={10} style={{ display: "inline", marginRight: "2px" }} /> {ev.category}
                      </div>
                    </div>
                  </div>

                  {onDeleteEvent && (
                    <button
                      className="action-icon-btn"
                      style={{ width: "32px", height: "32px", color: "#dc2626" }}
                      onClick={() => onDeleteEvent(ev.id)}
                      title="Delete event"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
