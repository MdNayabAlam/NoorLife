const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    fullDate: {
      type: String,
    },
    time: {
      type: String,
      default: "All Day",
    },
    category: {
      type: String,
      default: "Family",
    },
    color: {
      type: String,
      default: "#1b4332",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);
