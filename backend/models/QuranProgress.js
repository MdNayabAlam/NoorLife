const mongoose = require("mongoose");

const quranProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    currentSurah: {
      type: String,
      default: "Surah Al-Baqarah",
    },
    surahNumber: {
      type: Number,
      default: 2,
    },
    currentPage: {
      type: Number,
      default: 45,
    },
    totalPages: {
      type: Number,
      default: 286,
    },
    dailyGoalPages: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuranProgress", quranProgressSchema);
