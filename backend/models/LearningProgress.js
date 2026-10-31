const mongoose = require("mongoose");

const learningProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    module: {
      type: String,
      enum: ["salah", "wudu"],
      required: true,
    },
    completedStepIds: [
      {
        type: String,
      },
    ],
    currentStep: {
      type: Number,
      default: 0,
    },
    totalSteps: {
      type: Number,
      default: 8,
    },
  },
  { timestamps: true }
);

learningProgressSchema.index({ userId: 1, module: 1 }, { unique: true });

module.exports = mongoose.model("LearningProgress", learningProgressSchema);
