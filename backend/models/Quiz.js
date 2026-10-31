const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      default: "Islamic GK",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      default: "easy",
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswerIndex: {
      type: Number,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: "Verified NoorLife Islamic Education Bank",
    },
  },
  { timestamps: true }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      default: "Mixed",
    },
    difficulty: {
      type: String,
      default: "easy",
    },
    answers: [
      {
        questionId: String,
        selectedOption: Number,
        isCorrect: Boolean,
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

module.exports = {
  QuizQuestion,
  QuizAttempt,
};
