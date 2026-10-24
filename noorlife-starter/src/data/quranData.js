export const surahsList = [
  { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", englishTranslation: "The Opening", verses: 7, revelation: "Meccan", totalPages: 1 },
  { number: 2, name: "Al-Baqarah", arabic: "البقرة", englishTranslation: "The Cow", verses: 286, revelation: "Medinan", totalPages: 48 },
  { number: 3, name: "Ali 'Imran", arabic: "آل عمران", englishTranslation: "Family of Imran", verses: 200, revelation: "Medinan", totalPages: 27 },
  { number: 4, name: "An-Nisa", arabic: "النساء", englishTranslation: "The Women", verses: 176, revelation: "Medinan", totalPages: 29 },
  { number: 5, name: "Al-Ma'idah", arabic: "المائدة", englishTranslation: "The Table Spread", verses: 120, revelation: "Medinan", totalPages: 22 },
  { number: 6, name: "Al-An'am", arabic: "الأنعام", englishTranslation: "The Cattle", verses: 165, revelation: "Meccan", totalPages: 23 },
  { number: 7, name: "Al-A'raf", arabic: "الأعراف", englishTranslation: "The Heights", verses: 206, revelation: "Meccan", totalPages: 26 },
  { number: 8, name: "Al-Anfal", arabic: "الأنفال", englishTranslation: "The Spoils of War", verses: 75, revelation: "Medinan", totalPages: 10 },
  { number: 9, name: "At-Tawbah", arabic: "التوبة", englishTranslation: "The Repentance", verses: 129, revelation: "Medinan", totalPages: 21 },
  { number: 18, name: "Al-Kahf", arabic: "الكهف", englishTranslation: "The Cave", verses: 110, revelation: "Meccan", totalPages: 12 },
  { number: 36, name: "Ya-Sin", arabic: "يس", englishTranslation: "Ya-Sin", verses: 83, revelation: "Meccan", totalPages: 6 },
  { number: 55, name: "Ar-Rahman", arabic: "الرحمن", englishTranslation: "The Beneficent", verses: 78, revelation: "Medinan", totalPages: 4 },
  { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", englishTranslation: "The Inevitable", verses: 96, revelation: "Meccan", totalPages: 4 },
  { number: 67, name: "Al-Mulk", arabic: "الملك", englishTranslation: "The Sovereignty", verses: 30, revelation: "Meccan", totalPages: 3 },
  { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", englishTranslation: "Sincerity", verses: 4, revelation: "Meccan", totalPages: 1 },
  { number: 113, name: "Al-Falaq", arabic: "الفلق", englishTranslation: "The Daybreak", verses: 5, revelation: "Meccan", totalPages: 1 },
  { number: 114, name: "An-Nas", arabic: "الناس", englishTranslation: "Mankind", verses: 6, revelation: "Meccan", totalPages: 1 }
];

export const defaultQuranProgress = {
  currentSurah: "Surah Al-Baqarah",
  surahNumber: 2,
  currentPage: 45,
  totalPages: 286,
  dailyGoalPages: 10,
  targetDays: 30,
  lastReadDate: "Today at 07:15 AM",
  readingHistory: [
    { date: "15 May 2025", pagesRead: 6, surah: "Al-Baqarah (Ayah 142 - 176)" },
    { date: "14 May 2025", pagesRead: 8, surah: "Al-Baqarah (Ayah 90 - 141)" },
    { date: "13 May 2025", pagesRead: 5, surah: "Al-Baqarah (Ayah 50 - 89)" },
  ]
};
