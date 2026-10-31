/**
 * NoorLife — Astronomical Prayer Time Calculator (2026 Global Edition)
 * Calculates accurate solar prayer times for any city, state, or country worldwide.
 * Supports online API fetching (Aladhan API & Open-Meteo), GPS browser auto-detection,
 * and high-precision offline astronomical calculations.
 */

import { getHijriDate } from "./islamicDate";

// Global Cities & States with coordinates, flags, timezones and methods
export const WORLD_CITIES_DATA = [
  // Sacred & Middle East
  {
    id: "makkah",
    city: "Makkah",
    country: "Saudi Arabia",
    state: "Hejaz",
    lat: 21.4225,
    lng: 39.8262,
    timezone: "Asia/Riyadh",
    tzName: "AST (UTC+3)",
    flag: "🇸🇦",
    method: 4, // Umm al-Qura University, Makkah
    defaultTimings: { Fajr: "05:07 AM", Sunrise: "06:24 AM", Zuhr: "12:04 PM", Asr: "03:22 PM", Maghrib: "05:47 PM", Isha: "07:17 PM" }
  },
  {
    id: "madinah",
    city: "Madinah",
    country: "Saudi Arabia",
    state: "Hejaz",
    lat: 24.4672,
    lng: 39.6111,
    timezone: "Asia/Riyadh",
    tzName: "AST (UTC+3)",
    flag: "🇸🇦",
    method: 4,
    defaultTimings: { Fajr: "05:08 AM", Sunrise: "06:26 AM", Zuhr: "12:07 PM", Asr: "03:22 PM", Maghrib: "05:47 PM", Isha: "07:17 PM" }
  },
  {
    id: "riyadh",
    city: "Riyadh",
    country: "Saudi Arabia",
    state: "Najd",
    lat: 24.7136,
    lng: 46.6753,
    timezone: "Asia/Riyadh",
    tzName: "AST (UTC+3)",
    flag: "🇸🇦",
    method: 4,
    defaultTimings: { Fajr: "04:52 AM", Sunrise: "06:09 AM", Zuhr: "11:47 AM", Asr: "03:04 PM", Maghrib: "05:28 PM", Isha: "06:58 PM" }
  },
  {
    id: "jeddah",
    city: "Jeddah",
    country: "Saudi Arabia",
    state: "Makkah Region",
    lat: 21.5433,
    lng: 39.1728,
    timezone: "Asia/Riyadh",
    tzName: "AST (UTC+3)",
    flag: "🇸🇦",
    method: 4,
    defaultTimings: { Fajr: "05:09 AM", Sunrise: "06:27 AM", Zuhr: "12:07 PM", Asr: "03:26 PM", Maghrib: "05:50 PM", Isha: "07:20 PM" }
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    state: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    timezone: "Asia/Dubai",
    tzName: "GST (UTC+4)",
    flag: "🇦🇪",
    method: 8,
    defaultTimings: { Fajr: "05:06 AM", Sunrise: "06:23 AM", Zuhr: "12:03 PM", Asr: "03:24 PM", Maghrib: "05:42 PM", Isha: "07:12 PM" }
  },
  {
    id: "abu-dhabi",
    city: "Abu Dhabi",
    country: "UAE",
    state: "Abu Dhabi",
    lat: 24.4539,
    lng: 54.3773,
    timezone: "Asia/Dubai",
    tzName: "GST (UTC+4)",
    flag: "🇦🇪",
    method: 8,
    defaultTimings: { Fajr: "05:10 AM", Sunrise: "06:27 AM", Zuhr: "12:07 PM", Asr: "03:28 PM", Maghrib: "05:46 PM", Isha: "07:16 PM" }
  },
  {
    id: "doha",
    city: "Doha",
    country: "Qatar",
    state: "Doha",
    lat: 25.2854,
    lng: 51.5310,
    timezone: "Asia/Qatar",
    tzName: "AST (UTC+3)",
    flag: "🇶🇦",
    method: 8,
    defaultTimings: { Fajr: "04:36 AM", Sunrise: "05:53 AM", Zuhr: "11:32 AM", Asr: "02:51 PM", Maghrib: "05:12 PM", Isha: "06:42 PM" }
  },
  {
    id: "cairo",
    city: "Cairo",
    country: "Egypt",
    state: "Cairo",
    lat: 30.0444,
    lng: 31.2357,
    timezone: "Africa/Cairo",
    tzName: "EEST (UTC+3)",
    flag: "🇪🇬",
    method: 5,
    defaultTimings: { Fajr: "04:44 AM", Sunrise: "06:06 AM", Zuhr: "11:39 AM", Asr: "02:48 PM", Maghrib: "05:13 PM", Isha: "06:32 PM" }
  },
  {
    id: "istanbul",
    city: "Istanbul",
    country: "Turkey",
    state: "Marmara",
    lat: 41.0082,
    lng: 28.9784,
    timezone: "Europe/Istanbul",
    tzName: "TRT (UTC+3)",
    flag: "🇹🇷",
    method: 13,
    defaultTimings: { Fajr: "05:52 AM", Sunrise: "07:22 AM", Zuhr: "12:51 PM", Asr: "03:44 PM", Maghrib: "06:10 PM", Isha: "07:34 PM" }
  },

  // Major Indian States & Capitals
  {
    id: "new-delhi",
    city: "New Delhi",
    country: "India",
    state: "Delhi",
    lat: 28.6139,
    lng: 77.2090,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1, // University of Islamic Sciences, Karachi
    defaultTimings: { Fajr: "05:06 AM", Sunrise: "06:28 AM", Zuhr: "12:08 PM", Asr: "03:19 PM", Maghrib: "05:48 PM", Isha: "07:10 PM" }
  },
  {
    id: "patna",
    city: "Patna",
    country: "India",
    state: "Bihar",
    lat: 25.5941,
    lng: 85.1376,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "04:38 AM", Sunrise: "05:58 AM", Zuhr: "11:33 AM", Asr: "02:49 PM", Maghrib: "05:11 PM", Isha: "06:31 PM" }
  },
  {
    id: "lucknow",
    city: "Lucknow",
    country: "India",
    state: "Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "04:54 AM", Sunrise: "06:15 AM", Zuhr: "11:54 AM", Asr: "03:06 PM", Maghrib: "05:34 PM", Isha: "06:55 PM" }
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    state: "Maharashtra",
    lat: 19.0760,
    lng: 72.8777,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "05:22 AM", Sunrise: "06:40 AM", Zuhr: "12:26 PM", Asr: "03:43 PM", Maghrib: "06:11 PM", Isha: "07:29 PM" }
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    state: "Telangana",
    lat: 17.3850,
    lng: 78.4867,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "04:58 AM", Sunrise: "06:13 AM", Zuhr: "12:01 PM", Asr: "03:20 PM", Maghrib: "05:50 PM", Isha: "07:04 PM" }
  },
  {
    id: "kolkata",
    city: "Kolkata",
    country: "India",
    state: "West Bengal",
    lat: 22.5726,
    lng: 88.3639,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "04:22 AM", Sunrise: "05:40 AM", Zuhr: "11:24 AM", Asr: "02:38 PM", Maghrib: "05:09 PM", Isha: "06:27 PM" }
  },
  {
    id: "srinagar",
    city: "Srinagar",
    country: "India",
    state: "Jammu & Kashmir",
    lat: 34.0837,
    lng: 74.7973,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "05:14 AM", Sunrise: "06:45 AM", Zuhr: "12:17 PM", Asr: "03:21 PM", Maghrib: "05:51 PM", Isha: "07:20 PM" }
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    state: "Karnataka",
    lat: 12.9716,
    lng: 77.5946,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "05:01 AM", Sunrise: "06:12 AM", Zuhr: "12:04 PM", Asr: "03:24 PM", Maghrib: "05:57 PM", Isha: "07:08 PM" }
  },
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    country: "India",
    state: "Gujarat",
    lat: 23.0225,
    lng: 72.5714,
    timezone: "Asia/Kolkata",
    tzName: "IST (UTC+5:30)",
    flag: "🇮🇳",
    method: 1,
    defaultTimings: { Fajr: "05:22 AM", Sunrise: "06:42 AM", Zuhr: "12:27 PM", Asr: "03:41 PM", Maghrib: "06:11 PM", Isha: "07:31 PM" }
  },

  // Pakistan & Bangladesh
  {
    id: "karachi",
    city: "Karachi",
    country: "Pakistan",
    state: "Sindh",
    lat: 24.8607,
    lng: 67.0011,
    timezone: "Asia/Karachi",
    tzName: "PKT (UTC+5)",
    flag: "🇵🇰",
    method: 1,
    defaultTimings: { Fajr: "05:18 AM", Sunrise: "06:36 AM", Zuhr: "12:18 PM", Asr: "03:34 PM", Maghrib: "05:59 PM", Isha: "07:17 PM" }
  },
  {
    id: "lahore",
    city: "Lahore",
    country: "Pakistan",
    state: "Punjab",
    lat: 31.5204,
    lng: 74.3587,
    timezone: "Asia/Karachi",
    tzName: "PKT (UTC+5)",
    flag: "🇵🇰",
    method: 1,
    defaultTimings: { Fajr: "05:02 AM", Sunrise: "06:23 AM", Zuhr: "11:59 AM", Asr: "03:09 PM", Maghrib: "05:35 PM", Isha: "06:56 PM" }
  },
  {
    id: "dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    state: "Dhaka",
    lat: 23.8103,
    lng: 90.4125,
    timezone: "Asia/Dhaka",
    tzName: "BST (UTC+6)",
    flag: "🇧🇩",
    method: 1,
    defaultTimings: { Fajr: "04:44 AM", Sunrise: "05:58 AM", Zuhr: "11:42 AM", Asr: "02:55 PM", Maghrib: "05:26 PM", Isha: "06:41 PM" }
  },

  // Europe
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    state: "England",
    lat: 51.5074,
    lng: -0.1278,
    timezone: "Europe/London",
    tzName: "GMT/BST (UTC+0)",
    flag: "🇬🇧",
    method: 3,
    defaultTimings: { Fajr: "04:54 AM", Sunrise: "06:44 AM", Zuhr: "11:44 AM", Asr: "02:15 PM", Maghrib: "04:41 PM", Isha: "06:32 PM" }
  },
  {
    id: "paris",
    city: "Paris",
    country: "France",
    state: "Île-de-France",
    lat: 48.8566,
    lng: 2.3522,
    timezone: "Europe/Paris",
    tzName: "CET (UTC+1)",
    flag: "🇫🇷",
    method: 3,
    defaultTimings: { Fajr: "05:42 AM", Sunrise: "07:28 AM", Zuhr: "12:35 PM", Asr: "03:14 PM", Maghrib: "05:41 PM", Isha: "07:27 PM" }
  },
  {
    id: "berlin",
    city: "Berlin",
    country: "Germany",
    state: "Berlin",
    lat: 52.5200,
    lng: 13.4050,
    timezone: "Europe/Berlin",
    tzName: "CET (UTC+1)",
    flag: "🇩🇪",
    method: 3,
    defaultTimings: { Fajr: "04:57 AM", Sunrise: "06:50 AM", Zuhr: "11:50 AM", Asr: "02:18 PM", Maghrib: "04:48 PM", Isha: "06:39 PM" }
  },

  // North America
  {
    id: "new-york",
    city: "New York",
    country: "USA",
    state: "New York",
    lat: 40.7128,
    lng: -74.0060,
    timezone: "America/New_York",
    tzName: "EDT/EST (UTC-4)",
    flag: "🇺🇸",
    method: 2,
    defaultTimings: { Fajr: "05:48 AM", Sunrise: "07:20 AM", Zuhr: "12:40 PM", Asr: "03:35 PM", Maghrib: "06:00 PM", Isha: "07:25 PM" }
  },
  {
    id: "houston",
    city: "Houston (Texas)",
    country: "USA",
    state: "Texas",
    lat: 29.7604,
    lng: -95.3698,
    timezone: "America/Chicago",
    tzName: "CDT/CST (UTC-5)",
    flag: "🇺🇸",
    method: 2,
    defaultTimings: { Fajr: "06:11 AM", Sunrise: "07:34 AM", Zuhr: "01:05 PM", Asr: "04:15 PM", Maghrib: "06:39 PM", Isha: "07:58 PM" }
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    country: "USA",
    state: "California",
    lat: 34.0522,
    lng: -118.2437,
    timezone: "America/Los_Angeles",
    tzName: "PDT/PST (UTC-7)",
    flag: "🇺🇸",
    method: 2,
    defaultTimings: { Fajr: "05:52 AM", Sunrise: "07:11 AM", Zuhr: "12:44 PM", Asr: "03:47 PM", Maghrib: "06:14 PM", Isha: "07:33 PM" }
  },
  {
    id: "toronto",
    city: "Toronto",
    country: "Canada",
    state: "Ontario",
    lat: 43.6532,
    lng: -79.3832,
    timezone: "America/Toronto",
    tzName: "EDT/EST (UTC-4)",
    flag: "🇨🇦",
    method: 2,
    defaultTimings: { Fajr: "06:05 AM", Sunrise: "07:43 AM", Zuhr: "01:07 PM", Asr: "03:53 PM", Maghrib: "06:21 PM", Isha: "07:47 PM" }
  },

  // Asia Pacific & Oceania
  {
    id: "kuala-lumpur",
    city: "Kuala Lumpur",
    country: "Malaysia",
    state: "Federal Territory",
    lat: 3.1390,
    lng: 101.6869,
    timezone: "Asia/Kuala_Lumpur",
    tzName: "MYT (UTC+8)",
    flag: "🇲🇾",
    method: 11,
    defaultTimings: { Fajr: "05:48 AM", Sunrise: "07:01 AM", Zuhr: "01:01 PM", Asr: "04:22 PM", Maghrib: "07:02 PM", Isha: "08:12 PM" }
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    state: "Kanto",
    lat: 35.6762,
    lng: 139.6503,
    timezone: "Asia/Tokyo",
    tzName: "JST (UTC+9)",
    flag: "🇯🇵",
    method: 3,
    defaultTimings: { Fajr: "04:31 AM", Sunrise: "05:55 AM", Zuhr: "11:25 AM", Asr: "02:32 PM", Maghrib: "04:53 PM", Isha: "06:15 PM" }
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    state: "New South Wales",
    lat: -33.8688,
    lng: 151.2093,
    timezone: "Australia/Sydney",
    tzName: "AEDT (UTC+11)",
    flag: "🇦🇺",
    method: 3,
    defaultTimings: { Fajr: "04:32 AM", Sunrise: "05:58 AM", Zuhr: "12:39 PM", Asr: "04:16 PM", Maghrib: "07:17 PM", Isha: "08:39 PM" }
  }
];

export const GLOBAL_CITIES = WORLD_CITIES_DATA;

// Helper: Convert degrees to radians and vice-versa
const d2r = (d) => (d * Math.PI) / 180.0;
const r2d = (r) => (r * 180.0) / Math.PI;

// Calculate Qibla direction towards Kaaba (21.4225° N, 39.8262° E)
export function calculateQibla(lat, lng) {
  const kaabaLat = d2r(21.4225);
  const kaabaLng = d2r(39.8262);
  const userLat = d2r(lat);
  const userLng = d2r(lng);

  const deltaLng = kaabaLng - userLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(deltaLng);
  let qibla = r2d(Math.atan2(y, x));
  qibla = (qibla + 360) % 360;

  const compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const compassIndex = Math.round(qibla / 22.5) % 16;
  return `${Math.round(qibla)}° ${compassPoints[compassIndex]}`;
}

// Format 24h string to 12h AM/PM
export function formatTo12Hour(timeStr) {
  if (!timeStr) return "--:--";
  const clean = timeStr.split(" ")[0].trim();
  const [hStr, mStr] = clean.split(":");
  let hour = parseInt(hStr, 10);
  const min = mStr || "00";
  if (isNaN(hour)) return timeStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  const hourPadded = hour < 10 ? `0${hour}` : `${hour}`;
  return `${hourPadded}:${min} ${ampm}`;
}

// Convert time to minutes from midnight
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(" ");
  let [h, m] = parts[0].split(":").map(Number);
  if (parts[1]) {
    if (parts[1].toUpperCase() === "PM" && h !== 12) h += 12;
    if (parts[1].toUpperCase() === "AM" && h === 12) h = 0;
  }
  return h * 60 + m;
}

// Calculate timezone offset hours using native Intl
export function getTimezoneOffsetHours(tzName, date = new Date()) {
  try {
    const dStr = date.toLocaleString("en-US", { timeZone: tzName, hour12: false });
    const localInTz = new Date(dStr);
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC", hour12: false }));
    return (localInTz.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  } catch (e) {
    return -date.getTimezoneOffset() / 60;
  }
}

/**
 * Astronomical Solar Calculation for exact local prayer times anywhere on Earth.
 */
export function calculateAstronomicalPrayers(lat, lng, date = new Date(), timezoneOffsetHours = null) {
  const tzOffset = timezoneOffsetHours !== null ? timezoneOffsetHours : -date.getTimezoneOffset() / 60;

  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const b = (360 / 365) * (dayOfYear - 81);
  const bRad = d2r(b);
  const eot = 9.87 * Math.sin(2 * bRad) - 7.53 * Math.cos(bRad) - 1.5 * Math.sin(bRad);
  const declination = 23.45 * Math.sin(bRad);

  const solarNoonHours = 12 + tzOffset - lng / 15 - eot / 60;

  const hourAngle = (alpha) => {
    const latRad = d2r(lat);
    const decRad = d2r(declination);
    const cosHA = (Math.sin(d2r(alpha)) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosHA < -1) return 180;
    if (cosHA > 1) return 0;
    return r2d(Math.acos(cosHA));
  };

  const fajrHA = hourAngle(-18);
  const fajrHours = solarNoonHours - fajrHA / 15;
  const sunriseHA = hourAngle(-0.833);
  const sunriseHours = solarNoonHours - sunriseHA / 15;
  const zuhrHours = solarNoonHours + 2 / 60;
  const asrAlt = r2d(Math.atan(1 / (1 + Math.tan(d2r(Math.abs(lat - declination))))));
  const asrHA = hourAngle(asrAlt);
  const asrHours = solarNoonHours + asrHA / 15;
  const maghribHours = solarNoonHours + sunriseHA / 15;
  const ishaHours = solarNoonHours + fajrHA / 15;

  const toTimeStr = (h) => {
    let normalized = (h % 24 + 24) % 24;
    let hours = Math.floor(normalized);
    let mins = Math.round((normalized - hours) * 60);
    if (mins >= 60) {
      hours += 1;
      mins -= 60;
    }
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    const hh = h12 < 10 ? `0${h12}` : `${h12}`;
    const mm = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hh}:${mm} ${ampm}`;
  };

  return {
    Fajr: toTimeStr(fajrHours),
    Sunrise: toTimeStr(sunriseHours),
    Zuhr: toTimeStr(zuhrHours),
    Asr: toTimeStr(asrHours),
    Maghrib: toTimeStr(maghribHours),
    Isha: toTimeStr(ishaHours),
    Midnight: toTimeStr(solarNoonHours + 12),
  };
}

// Compute next prayer & countdown seconds
export function getNextPrayerData(timings, nowInCity) {
  const nowMins = nowInCity.getHours() * 60 + nowInCity.getMinutes();
  const prayerList = [
    { name: "Fajr", time: timings.Fajr, mins: timeToMinutes(timings.Fajr) },
    { name: "Sunrise", time: timings.Sunrise, mins: timeToMinutes(timings.Sunrise) },
    { name: "Zuhr", time: timings.Zuhr, mins: timeToMinutes(timings.Zuhr) },
    { name: "Asr", time: timings.Asr, mins: timeToMinutes(timings.Asr) },
    { name: "Maghrib", time: timings.Maghrib, mins: timeToMinutes(timings.Maghrib) },
    { name: "Isha", time: timings.Isha, mins: timeToMinutes(timings.Isha) },
  ];

  let next = null;
  let diffMinutes = 0;

  for (const p of prayerList) {
    if (p.name !== "Sunrise" && p.mins > nowMins) {
      next = p;
      diffMinutes = p.mins - nowMins;
      break;
    }
  }

  if (!next) {
    const fajrMins = timeToMinutes(timings.Fajr);
    diffMinutes = (24 * 60 - nowMins) + fajrMins;
    next = { name: "Fajr", time: timings.Fajr };
  }

  const remainingSeconds = Math.max(diffMinutes * 60 - nowInCity.getSeconds(), 60);

  return {
    name: next.name,
    time: next.time,
    remainingSeconds,
  };
}

/**
 * 1-Click Browser GPS Auto-Detection
 * Gets exact latitude & longitude, then reverse-geocodes to City, State, Country.
 */
export async function autoDetectUserLocation() {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Fast reverse-geocoding via BigDataCloud client API
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const city = data.city || data.locality || "Current Location";
            const state = data.principalSubdivision ? `, ${data.principalSubdivision}` : "";
            const country = data.countryName ? `, ${data.countryName}` : "";
            const fullName = `${city}${state}${country}`;
            resolve({
              cityName: fullName,
              lat,
              lng,
              country: data.countryName || "",
              state: data.principalSubdivision || "",
            });
            return;
          }
        } catch (e) {
          // fallback to coordinates name
        }

        resolve({
          cityName: `Local (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
          lat,
          lng,
        });
      },
      (error) => {
        reject(error);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  });
}

/**
 * Free geocoding via Open-Meteo for any city, state, or country
 */
export async function geocodeCityClient(query) {
  try {
    const clean = query.replace(/[^\w\s,]/gi, "").trim();
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(clean)}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.results && data.results.length > 0) {
        const r = data.results[0];
        const stateName = r.admin1 ? `, ${r.admin1}` : "";
        const countryName = r.country ? `, ${r.country}` : "";
        return {
          name: `${r.name}${stateName}${countryName}`,
          lat: r.latitude,
          lng: r.longitude,
          timezone: r.timezone || "UTC",
          country: r.country || "",
        };
      }
    }
  } catch (e) {
    // fallback
  }
  return null;
}

/**
 * Universal Global Prayer Times Fetcher
 * Tries AlAdhan API directly from browser; falls back to local astronomical calculator.
 */
export async function fetchGlobalPrayerTimes(locationInput, method = "1", coords = null) {
  let lat = coords?.lat;
  let lng = coords?.lng;
  let locName = typeof locationInput === "string" ? locationInput : "New Delhi, India";
  let tz = "Asia/Kolkata";

  // Check matching city in presets
  const foundPreset = WORLD_CITIES_DATA.find((c) =>
    locName.toLowerCase().includes(c.city.toLowerCase()) ||
    locName.toLowerCase().includes(c.country.toLowerCase()) ||
    (c.state && locName.toLowerCase().includes(c.state.toLowerCase()))
  );

  if (foundPreset && (!lat || !lng)) {
    lat = foundPreset.lat;
    lng = foundPreset.lng;
    tz = foundPreset.timezone;
    locName = `${foundPreset.city}, ${foundPreset.state ? foundPreset.state + ", " : ""}${foundPreset.country}`;
  } else if (!lat || !lng) {
    // Geocode unknown query
    const geocoded = await geocodeCityClient(locName);
    if (geocoded) {
      lat = geocoded.lat;
      lng = geocoded.lng;
      tz = geocoded.timezone;
      locName = geocoded.name;
    } else {
      // Fallback New Delhi
      lat = 28.6139;
      lng = 77.2090;
      tz = "Asia/Kolkata";
      locName = "New Delhi, India";
    }
  }

  const qibla = calculateQibla(lat, lng);

  // Try live AlAdhan coordinate API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.timings) {
        const d = json.data;
        const apiTz = d.meta?.timezone || tz;
        const timings = {
          Fajr: formatTo12Hour(d.timings.Fajr),
          Sunrise: formatTo12Hour(d.timings.Sunrise),
          Zuhr: formatTo12Hour(d.timings.Dhuhr || d.timings.Zuhr),
          Asr: formatTo12Hour(d.timings.Asr),
          Maghrib: formatTo12Hour(d.timings.Maghrib),
          Isha: formatTo12Hour(d.timings.Isha),
          Midnight: formatTo12Hour(d.timings.Midnight || "00:00"),
        };

        const nowInCity = new Date(new Date().toLocaleString("en-US", { timeZone: apiTz }));
        const nextPrayer = getNextPrayerData(timings, nowInCity);

        // Store Maghrib time and calculate accurate Maghrib-aligned Urdu/Hijri date
        if (typeof localStorage !== "undefined" && timings.Maghrib) {
          localStorage.setItem("noorlife_maghrib_time", timings.Maghrib);
        }
        const hijriData = getHijriDate(nowInCity, null, timings.Maghrib);

        return {
          city: locName,
          timezone: apiTz,
          localTime: nowInCity.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          method: d.meta?.method?.name || "Global Astronomical Method",
          date: d.date?.readable || nowInCity.toDateString(),
          hijriDate: hijriData.formatted,
          hijriArabic: hijriData.arabicFormatted,
          isAfterMaghrib: hijriData.isAfterMaghrib,
          qiblaDirection: qibla,
          coordinates: { lat, lng },
          timings,
          nextPrayer,
          provider: "AlAdhan Global Live API",
          isLive: true,
        };
      }
    }
  } catch (e) {
    // offline or timed out, fall through to astronomical
  }

  // Resilient Solar Astronomical Almanac Fallback
  const tzOffset = getTimezoneOffsetHours(tz);
  const now = new Date();
  const nowInCity = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const timings = calculateAstronomicalPrayers(lat, lng, nowInCity, tzOffset);
  const nextPrayer = getNextPrayerData(timings, nowInCity);

  if (typeof localStorage !== "undefined" && timings.Maghrib) {
    localStorage.setItem("noorlife_maghrib_time", timings.Maghrib);
  }
  const hijriFallback = getHijriDate(nowInCity, null, timings.Maghrib);

  return {
    city: locName,
    timezone: tz,
    localTime: nowInCity.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    method: "Universal Astronomical Solar Calculation",
    date: nowInCity.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    hijriDate: hijriFallback.formatted,
    hijriArabic: hijriFallback.arabicFormatted,
    isAfterMaghrib: hijriFallback.isAfterMaghrib,
    qiblaDirection: qibla,
    coordinates: { lat, lng },
    timings,
    nextPrayer,
    provider: "Solar Astronomical Almanac (Offline Active)",
    isLive: false,
  };
}

/**
 * Backward-compatibility helper
 */
export async function getVerifiedPrayerTimes(cityObj, date = new Date()) {
  return await fetchGlobalPrayerTimes(cityObj.city || cityObj.name || "New Delhi, India");
}
