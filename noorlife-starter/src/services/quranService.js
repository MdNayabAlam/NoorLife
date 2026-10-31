// Quran Data & API Service
// Manages 30 Paras offline bundle, live API fetching, Tajweed HTML parsing, and caching
import { PARA_1_OFFLINE_AYAHS, QURAN_30_PARAS } from "../data/quran30ParasData";

// In-memory cache to avoid redundant API hits during the user session
const memoryCache = {
  1: PARA_1_OFFLINE_AYAHS,
};

/**
 * Fetch all Ayahs for a given Para (1 to 30)
 * Combines Arabic Uthmani, Tajweed markup, Roman Hinglish transliteration, and Urdu/Hindi translation
 */
export async function fetchParaAyahs(paraNumber) {
  const pNum = Number(paraNumber);

  // 1. Check in-memory cache
  if (memoryCache[pNum] && memoryCache[pNum].length > 0) {
    return memoryCache[pNum];
  }

  // 2. Check localStorage cache
  try {
    const cached = localStorage.getItem(`noorlife_para_cache_${pNum}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache[pNum] = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read para cache from localStorage:", e);
  }

  // 3. Special case for Para 1: Return bundled offline data
  if (pNum === 1) {
    memoryCache[1] = PARA_1_OFFLINE_AYAHS;
    return PARA_1_OFFLINE_AYAHS;
  }

  // 4. Fetch from public Quran API in parallel
  try {
    const [uthmaniRes, tajweedRes, transRes, urduRes, hindiRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/juz/${pNum}/quran-uthmani`).then((r) => r.json()),
      fetch(`https://api.alquran.cloud/v1/juz/${pNum}/quran-tajweed`).then((r) => r.json()).catch(() => null),
      fetch(`https://api.alquran.cloud/v1/juz/${pNum}/en.transliteration`).then((r) => r.json()).catch(() => null),
      fetch(`https://api.alquran.cloud/v1/juz/${pNum}/ur.jalandhry`).then((r) => r.json()).catch(() => null),
      fetch(`https://api.alquran.cloud/v1/juz/${pNum}/hi.hindi`).then((r) => r.json()).catch(() => null)
    ]);

    if (!uthmaniRes || !uthmaniRes.data || !Array.isArray(uthmaniRes.data.ayahs)) {
      throw new Error(`Invalid Quran API response for Juz ${pNum}`);
    }

    const uthmani = uthmaniRes.data.ayahs;
    const tajweed = tajweedRes?.data?.ayahs || [];
    const trans = transRes?.data?.ayahs || [];
    const urdu = urduRes?.data?.ayahs || [];
    const hindi = hindiRes?.data?.ayahs || [];

    const merged = uthmani.map((u, i) => ({
      number: u.number,
      numberInSurah: u.numberInSurah,
      surahNumber: u.surah.number,
      surahName: u.surah.name,
      surahEnglish: u.surah.englishName,
      surahMeaning: u.surah.englishNameTranslation,
      revelationType: u.surah.revelationType,
      page: u.page,
      ruku: u.ruku,
      manzil: u.manzil,
      arabic: u.text,
      tajweed: tajweed[i]?.text || u.text,
      transliteration: trans[i]?.text || "",
      urdu: urdu[i]?.text || "",
      hindi: hindi[i]?.text || "",
      audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${u.number}.mp3`
    }));

    // Cache in memory
    memoryCache[pNum] = merged;

    // Persist in localStorage (ignore quota errors)
    try {
      localStorage.setItem(`noorlife_para_cache_${pNum}`, JSON.stringify(merged));
    } catch (quotaError) {
      console.warn("Storage full, keeping in memory only:", quotaError);
    }

    return merged;
  } catch (err) {
    console.error(`Error loading Para ${pNum}:`, err);

    // Fallback stub generator if network is completely down
    const meta = QURAN_30_PARAS.find((p) => p.number === pNum) || QURAN_30_PARAS[0];
    const fallbackAyahs = Array.from({ length: Math.min(meta.ayahsCount || 20, 30) }, (_, i) => ({
      number: i + 1,
      numberInSurah: i + 1,
      surahNumber: 1,
      surahName: meta.arabic,
      surahEnglish: meta.name,
      surahMeaning: meta.surahRange,
      revelationType: "Meccan",
      page: 1 + Math.floor(i / 8),
      ruku: 1,
      manzil: 1,
      arabic: `${meta.arabic} — بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`,
      tajweed: `${meta.arabic} — بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`,
      transliteration: `Para ${meta.number} (${meta.name}) — Tilawat aur mutaala shuru karein`,
      urdu: `${meta.name}: ${meta.description}`,
      hindi: `${meta.name}: ${meta.description}`,
      audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`
    }));

    return fallbackAyahs;
  }
}

/**
 * Group ayahs by page for the 15-line Mushaf Page View (as shown in the PDF)
 */
export function groupAyahsByPage(ayahs) {
  if (!Array.isArray(ayahs) || ayahs.length === 0) return {};
  const pages = {};
  ayahs.forEach((a) => {
    const p = a.page || 1;
    if (!pages[p]) pages[p] = [];
    pages[p].push(a);
  });
  return pages;
}

/**
 * Parse Tajweed bracket markup into colored HTML spans
 * Rule Codes:
 * - h, l, s: Hamzatul wasl & Lam shamsiyyah (Silent / gray)
 * - g, i, f, c: Ghunnah, Ikhfa, Iqlab, Idgham (Nasal / green)
 * - q: Qalqalah (Echo bounce / cyan/blue)
 * - m: Madd Lazim (6 counts / dark red)
 * - w, j: Madd Wajib / Jaiz (4-5 counts / orange/red)
 * - p: Madd Arid / Leen (2-4-6 counts / amber/yellow)
 * - n: Madd Normal / alif khanjariyyah
 */
export function renderTajweedHtml(text) {
  if (!text) return "";

  const ruleMap = {
    h: "tj-silent",
    l: "tj-silent",
    s: "tj-silent",
    g: "tj-ghunnah",
    i: "tj-ghunnah",
    f: "tj-ghunnah",
    c: "tj-ghunnah",
    q: "tj-qalqalah",
    m: "tj-madd-lazim",
    w: "tj-madd-wajib",
    j: "tj-madd-wajib",
    p: "tj-madd-arid",
    n: "tj-madd-normal"
  };

  let result = text;
  let prev;
  let loops = 0;

  do {
    prev = result;
    result = result.replace(/\[([a-z0-9:]+)\[([^\[\]]+)\]/g, (_, tag, inner) => {
      const code = tag.charAt(0);
      const cls = ruleMap[code] || "tj-normal";
      return `<span class="${cls}">${inner}</span>`;
    });
    loops++;
  } while (result !== prev && loops < 12);

  return result;
}

/**
 * Helper to strip tajweed annotations if plain text is required
 */
export function stripTajweedTags(text) {
  if (!text) return "";
  let result = text;
  let prev;
  let loops = 0;
  do {
    prev = result;
    result = result.replace(/\[[a-z0-9:]*\[([^\[\]]+)\]/g, "$1");
    loops++;
  } while (result !== prev && loops < 12);
  return result;
}
