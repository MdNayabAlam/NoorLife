const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 350,
    },
    currentStreak: {
      type: Number,
      default: 7,
    },
    lastActivityDate: {
      type: Date,
      default: Date.now,
    },
    badges: [
      {
        title: String,
        earned: Boolean,
        earnedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reward", rewardSchema);
