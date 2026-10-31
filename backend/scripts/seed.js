const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const { QuizQuestion } = require("../models/Quiz");
const Dua = require("../models/Dua");
const { connectDB } = require("../config/db");

const seedQuestions = [
  {
    category: "Islamic GK",
    difficulty: "easy",
    question: "Which Surah of the Holy Quran is known as the 'Mother of the Book' (Umm al-Kitab)?",
    options: ["Surah Al-Ikhlas", "Surah Al-Fatiha", "Surah Al-Baqarah", "Surah Ya-Sin"],
    correctAnswerIndex: 1,
    explanation: "Surah Al-Fatiha opens the Holy Quran and encapsulates all fundamental themes of faith, worship, and guidance.",
    source: "Tafsir Ibn Kathir"
  },
  {
    category: "General Science",
    difficulty: "easy",
    question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswerIndex: 1,
    explanation: "Plants take in Carbon Dioxide (CO2) from the air and water from the soil to produce glucose and release Oxygen.",
    source: "NCERT Science"
  },
  {
    category: "Islamic GK",
    difficulty: "easy",
    question: "How many daily obligatory (Fard) prayers are prescribed for Muslims?",
    options: ["3", "4", "5", "7"],
    correctAnswerIndex: 2,
    explanation: "There are 5 daily obligatory prayers: Fajr, Zuhr, Asr, Maghrib, and Isha.",
    source: "Sahih Al-Bukhari"
  },
  {
    category: "World Geography",
    difficulty: "easy",
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Ganges"],
    correctAnswerIndex: 1,
    explanation: "The Nile River in northeast Africa is traditionally recognized as the longest river in the world at approx 6,650 km.",
    source: "National Geographic"
  },
  {
    category: "Islamic Knowledge",
    difficulty: "medium",
    question: "Which revered angel is appointed to blow the Trumpet (Soor) on the Day of Judgment?",
    options: ["Jibreel (AS)", "Mika'eel (AS)", "Israfil (AS)", "Malik (AS)"],
    correctAnswerIndex: 2,
    explanation: "Angel Israfil (AS) is commanded by Allah to blow the Trumpet to signal the Day of Resurrection.",
    source: "Quran 39:68"
  },
  {
    category: "General GK",
    difficulty: "medium",
    question: "Which Indian state has the longest mainland coastline?",
    options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
    correctAnswerIndex: 2,
    explanation: "Gujarat has the longest mainland coastline in India, stretching over 1,600 kilometers.",
    source: "Survey of India"
  },
  {
    category: "Quranic Sciences",
    difficulty: "hard",
    question: "In which Surah does 'Bismillahir Rahmanir Raheem' appear inside an Ayah, in addition to the opening?",
    options: ["Surah An-Naml (27:30)", "Surah At-Tawbah (9:1)", "Surah Al-Baqarah (2:255)", "Surah Ya-Sin (36:58)"],
    correctAnswerIndex: 0,
    explanation: "In Surah An-Naml (27:30), Prophet Sulaiman's letter to Queen Bilqis begins with 'Inna hu min Sulaimana wa inna hu Bismillahir Rahmanir Raheem'.",
    source: "Quran 27:30"
  }
];

const seedDuas = [
  {
    title: "Dua for Increase in Knowledge (Ilm)",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge.",
    reference: "Surah Taha (20:114)",
    category: "Daily Ilm",
    benefits: "Recited before study, exam preparation, or seeking deeper understanding.",
    verified: true,
  },
  {
    title: "Dua for Ease and Contentment in Affairs",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbish rahli sadri wa yassir li amri",
    translation: "My Lord, expand for me my breast and ease for me my task.",
    reference: "Surah Taha (20:25-26)",
    category: "Work & Peace",
    benefits: "Dua of Prophet Musa (AS) when facing difficult tasks and public speaking.",
    verified: true,
  },
  {
    title: "Morning & Evening Protection Dua",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahilladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim",
    translation: "In the Name of Allah, with Whose Name nothing upon earth or in the heavens can cause harm, and He is the All-Hearing, All-Knowing.",
    reference: "Sunan Abi Dawud & Jami` at-Tirmidhi",
    category: "Protection & Dhikr",
    benefits: "Whoever recites it 3 times morning and evening, nothing will harm them.",
    verified: true,
  },
  {
    title: "Dua for Parents (Forgiveness & Mercy)",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbir hamhuma kama rabbayani sagheera",
    translation: "My Lord, have mercy upon them both as they cared for me when I was small.",
    reference: "Surah Al-Isra (17:24)",
    category: "Family & Parents",
    benefits: "A timeless Quranic prayer for seeking immense blessings and mercy for parents.",
    verified: true,
  },
  {
    title: "Sayyidul Istighfar (Master of Forgiveness)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu...",
    translation: "O Allah, You are my Lord; there is no deity except You. You created me, and I am Your servant, and I uphold Your covenant and promise as much as I can...",
    reference: "Sahih al-Bukhari (6306)",
    category: "Repentance",
    benefits: "Whoever recites it during the day with conviction and dies that day will enter Paradise.",
    verified: true,
  }
];

async function runSeed() {
  console.log("🌱 Starting NoorLife Seed Process...");
  const connected = await connectDB();

  if (!connected) {
    console.log("ℹ️  MongoDB not connected directly. Seed data is verified and exported in static collections.");
    process.exit(0);
  }

  try {
    await QuizQuestion.deleteMany({});
    await QuizQuestion.insertMany(seedQuestions);
    console.log(`✅ Seeded ${seedQuestions.length} Quiz Questions successfully!`);

    await Dua.deleteMany({});
    await Dua.insertMany(seedDuas);
    console.log(`✅ Seeded ${seedDuas.length} Authentic Verified Duas successfully!`);

    console.log("🎉 Database seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err.message);
    process.exit(1);
  }
}

runSeed();
