const QuranProgress = require("../models/QuranProgress");
const { getDBStatus } = require("../config/db");

let memoryQuran = {
  currentSurah: "Surah Al-Baqarah",
  surahNumber: 2,
  currentPage: 45,
  totalPages: 286,
  dailyGoalPages: 10,
  notes: "Reflecting on Ayatul Kursi (2:255) daily",
  readingHistory: [
    { date: "15 May", pagesRead: 5, surah: "Surah Al-Baqarah", notes: "Completed Ruku 5" },
    { date: "14 May", pagesRead: 6, surah: "Surah Al-Baqarah", notes: "Reviewed verses on patience" },
    { date: "13 May", pagesRead: 5, surah: "Surah Al-Baqarah", notes: "Morning Tilawat" }
  ]
};

exports.getQuranProgress = async (req, res) => {
  try {
    if (getDBStatus()) {
      let progress = await QuranProgress.findOne({ userId: req.user._id });
      if (!progress) {
        progress = await QuranProgress.create({
          userId: req.user._id,
          ...memoryQuran,
        });
      }
      return res.json({ success: true, data: progress });
    }
    return res.json({ success: true, data: memoryQuran });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateQuranProgress = async (req, res) => {
  try {
    if (getDBStatus()) {
      let progress = await QuranProgress.findOne({ userId: req.user._id });
      if (!progress) {
        progress = new QuranProgress({ userId: req.user._id, ...req.body });
      } else {
        Object.assign(progress, req.body);
      }
      const updated = await progress.save();
      return res.json({ success: true, data: updated });
    }

    memoryQuran = { ...memoryQuran, ...req.body };
    return res.json({ success: true, data: memoryQuran });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
