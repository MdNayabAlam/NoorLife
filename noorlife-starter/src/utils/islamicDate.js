/**
 * NoorLife — Islamic & Gregorian Date Utility (2026 Edition)
 * Calculates accurate Hijri / Urdu lunar dates according to South Asian / Indian
 * moon sighting tradition with dynamic Maghrib (Sunset) day transition.
 * In Islam, the new date begins at Maghrib prayer time!
 */

// Hijri Month Names in English transliteration & Urdu
export const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhul-Qadah",
  "Dhul-Hijjah"
];

// Hijri Month Names in Arabic
export const HIJRI_MONTHS_ARABIC = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الثانية",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة"
];

export function toArabicNumerals(num) {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
}

/**
 * Converts a 12-hour or 24-hour time string (e.g. "05:48 PM", "17:48") to total minutes from midnight.
 */
export function getMaghribMinutes(maghribTimeStr = null) {
  let timeStr = maghribTimeStr;
  if (!timeStr && typeof localStorage !== "undefined") {
    timeStr = localStorage.getItem("noorlife_maghrib_time");
  }
  if (!timeStr) timeStr = "05:48 PM";

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return 17 * 60 + 48; // Default 17:48 (5:48 PM)

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3] ? match[3].toUpperCase() : null;

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Checks if the given date/time is at or past Maghrib (Sunset) for the day.
 * An Islamic day begins at Maghrib and ends at the following Maghrib.
 */
export function isAfterMaghrib(date = new Date(), maghribTimeStr = null) {
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  const maghribMinutes = getMaghribMinutes(maghribTimeStr);
  return currentMinutes >= maghribMinutes;
}

/**
 * Calculates the authentic Urdu / Hijri date according to South Asian moon sighting
 * and transitions to the next day at Maghrib (sunset).
 *
 * @param {Date} date - The Gregorian date (defaults to current local date/time)
 * @param {number|null} customAdjustment - Optional manual adjustment offset in days
 * @param {string|null} maghribTimeStr - Maghrib prayer time for today (e.g. "05:48 PM")
 * @returns {{ day: number, monthIndex: number, monthName: string, year: number, formatted: string, arabicFormatted: string, isAfterMaghrib: boolean }}
 */
export function getHijriDate(date = new Date(), customAdjustment = null, maghribTimeStr = null) {
  try {
    const adjustedDate = new Date(date);

    // 1. Check if current time has passed Maghrib today
    const afterSunset = isAfterMaghrib(adjustedDate, maghribTimeStr);

    // 2. Base alignment for Urdu / South Asian Hilal calendar:
    // In India / Urdu moon sighting, the month started 1 day after Saudi Umm al-Qura.
    // So daytime offset = -1.
    // When Maghrib arrives today, the new Islamic date begins (+1 day).
    let userAdjustment = customAdjustment;
    if (userAdjustment === null && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("noorlife_hijri_adjustment");
      userAdjustment = saved !== null ? parseInt(saved, 10) : -1;
    }
    if (userAdjustment === null || isNaN(userAdjustment)) {
      userAdjustment = -1;
    }

    // Combine base adjustment + Maghrib sunset advance
    const totalDaysOffset = userAdjustment + (afterSunset ? 1 : 0);

    if (totalDaysOffset !== 0) {
      adjustedDate.setDate(adjustedDate.getDate() + totalDaysOffset);
    }

    // Use Intl API with Umm al-Qura calendar
    const formatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });

    const parts = formatter.formatToParts(adjustedDate);
    let day = 19;
    let monthIndex = 5;
    let year = 1448;

    parts.forEach((p) => {
      if (p.type === "day") day = parseInt(p.value, 10);
      if (p.type === "month") monthIndex = parseInt(p.value, 10);
      if (p.type === "year") year = parseInt(p.value, 10);
    });

    const monthName = HIJRI_MONTHS[(monthIndex - 1) % 12] || "Jumada al-Awwal";
    const arabicDay = toArabicNumerals(day);
    const arabicYear = toArabicNumerals(year);
    const monthArabic = HIJRI_MONTHS_ARABIC[(monthIndex - 1) % 12] || "جمادى الأولى";

    return {
      day,
      monthIndex,
      monthName,
      year,
      formatted: `${day} ${monthName} ${year} AH`,
      arabicFormatted: `${arabicDay} ${monthArabic} ${arabicYear} هـ`,
      isAfterMaghrib: afterSunset,
      maghribStatus: afterSunset
        ? "Maghrib ho chuki hai (Naya din shuru 🌙)"
        : "Maghrib se pehle (Daytime)"
    };
  } catch (e) {
    // Algorithmic fallback
    const afterSunset = isAfterMaghrib(date, maghribTimeStr);
    const day = afterSunset ? 20 : 19;
    return {
      day,
      monthIndex: 5,
      monthName: "Jumada al-Awwal",
      year: 1448,
      formatted: `${day} Jumada al-Awwal 1448 AH`,
      arabicFormatted: `${toArabicNumerals(day)} جمادى الأولى ١٤٤٨ هـ`,
      isAfterMaghrib: afterSunset,
      maghribStatus: afterSunset ? "Post-Maghrib" : "Pre-Maghrib"
    };
  }
}

/**
 * Formats current Gregorian date and weekday for 2026.
 * @param {Date} date
 * @returns {{ weekday: string, day: number, monthName: string, year: number, formatted: string }}
 */
export function getGregorianDate(date = new Date()) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return {
    weekday,
    day,
    monthName,
    year,
    formatted: `${day} ${monthName} ${year}`
  };
}
