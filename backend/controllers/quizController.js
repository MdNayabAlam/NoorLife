const QuizAttempt = require("../models/Quiz");
const { getDBStatus } = require("../config/db");

const questionsBank = {
  easy: [
    {
      id: 1,
      category: "Islamic GK",
      question: "Which Surah of the Quran is known as the 'Mother of the Book' (Umm al-Kitab)?",
      options: ["Surah Al-Ikhlas", "Surah Al-Fatiha", "Surah Al-Baqarah", "Surah Ya-Sin"],
      correctAnswerIndex: 1,
      explanation: "Surah Al-Fatiha opens the Holy Quran and encapsulates all fundamental themes."
    },
    {
      id: 2,
      category: "General Science",
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswerIndex: 1,
      explanation: "Plants take in Carbon Dioxide and release Oxygen."
    },
    {
      id: 3,
      category: "Islamic GK",
      question: "How many daily obligatory (Fard) prayers are there for Muslims?",
      options: ["3", "4", "5", "7"],
      correctAnswerIndex: 2,
      explanation: "There are 5 daily obligatory prayers."
    }
  ],
  medium: [
    {
      id: 4,
      category: "Islamic Knowledge",
      question: "Which angel is appointed to blow the Trumpet (Soor) on the Day of Judgment?",
      options: ["Jibreel (AS)", "Mika'eel (AS)", "Israfil (AS)", "Malik (AS)"],
      correctAnswerIndex: 2,
      explanation: "Angel Israfil (AS) is commanded by Allah to blow the Trumpet."
    },
    {
      id: 5,
      category: "General GK",
      question: "Which Indian state has the longest coastline?",
      options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
      correctAnswerIndex: 2,
      explanation: "Gujarat has a coastline exceeding 1,600 km."
    }
  ],
  hard: [
    {
      id: 6,
      category: "Quranic Sciences",
      question: "In which Surah does 'Bismillahir Rahmanir Raheem' appear inside an Ayah?",
      options: ["Surah An-Naml (Ayah 30)", "Surah Al-Baqarah (Ayah 255)", "Surah Ya-Sin (Ayah 58)", "Surah Ar-Rahman (Ayah 1)"],
      correctAnswerIndex: 0,
      explanation: "In Surah An-Naml (27:30), Prophet Sulaiman's letter begins with Bismillah."
    }
  ]
};

let memoryAttempts = [];

exports.getQuestions = (req, res) => {
  const difficulty = req.query.difficulty || "easy";
  const questions = questionsBank[difficulty] || questionsBank.easy;
  // Return questions without exposing correctAnswerIndex directly to client as specified in rule
  const safeQuestions = questions.map(({ correctAnswerIndex, ...rest }) => rest);
  res.json({ success: true, count: safeQuestions.length, data: safeQuestions });
};

exports.submitAttempt = async (req, res) => {
  try {
    const { category, difficulty, answers, score, totalQuestions } = req.body;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    if (getDBStatus()) {
      const attempt = await QuizAttempt.create({
        userId: req.user._id,
        category: category || "Mixed",
        difficulty: difficulty || "easy",
        score: Number(score) || 0,
        totalQuestions: Number(totalQuestions) || 0,
        percentage,
      });
      return res.status(201).json({ success: true, data: attempt });
    }

    const attempt = {
      id: Date.now().toString(),
      category: category || "Mixed",
      difficulty: difficulty || "easy",
      score,
      totalQuestions,
      percentage,
      completedAt: new Date(),
    };
    memoryAttempts.unshift(attempt);
    return res.status(201).json({ success: true, data: attempt });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAttempts = async (req, res) => {
  try {
    if (getDBStatus()) {
      const attempts = await QuizAttempt.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, data: attempts });
    }
    return res.json({ success: true, data: memoryAttempts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
