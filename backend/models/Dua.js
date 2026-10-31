const mongoose = require("mongoose");

const duaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    arabic: {
      type: String,
      required: true,
      trim: true,
    },
    transliteration: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Daily Morning/Evening",
    },
    benefits: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dua", duaSchema);
