const { QuizQuestion, QuizAttempt } = require("../models/Quiz");
const { getDBStatus } = require("../config/db");

const questionsBank = {
  easy: [
    {
      id: "q-1",
      category: "Islamic GK",
      question: "Which Surah of the Holy Quran is known as the 'Mother of the Book' (Umm al-Kitab)?",
      options: ["Surah Al-Ikhlas", "Surah Al-Fatiha", "Surah Al-Baqarah", "Surah Ya-Sin"],
      correctAnswerIndex: 1,
      explanation: "Surah Al-Fatiha opens the Holy Quran and encapsulates all fundamental themes of faith, worship, and guidance.",
      source: "Tafsir Ibn Kathir"
    },
    {
      id: "q-2",
      category: "General Science",
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswerIndex: 1,
      explanation: "Plants take in Carbon Dioxide (CO2) from the air and water from the soil to produce glucose and release Oxygen.",
      source: "NCERT Science"
    },
    {
      id: "q-3",
      category: "Islamic GK",
      question: "How many daily obligatory (Fard) prayers are prescribed for Muslims?",
      options: ["3", "4", "5", "7"],
      correctAnswerIndex: 2,
      explanation: "There are 5 daily obligatory prayers: Fajr, Zuhr, Asr, Maghrib, and Isha.",
      source: "Sahih Al-Bukhari"
    },
    {
      id: "q-4",
      category: "World Geography",
      question: "Which is the longest river in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Ganges"],
      correctAnswerIndex: 1,
      explanation: "The Nile River in northeast Africa is traditionally recognized as the longest river in the world at approx 6,650 km.",
      source: "National Geographic"
    },
    {
      id: "q-5",
      category: "Islamic History",
      question: "In which Islamic month did the Prophet Muhammad (PBUH) make the Hijrah to Madinah?",
      options: ["Ramadan", "Muharram", "Rabi' al-Awwal", "Rajab"],
      correctAnswerIndex: 2,
      explanation: "The Prophet (PBUH) arrived in Quba and entered Madinah during the month of Rabi' al-Awwal.",
      source: "Ar-Raheeq Al-Makhtum"
    }
  ],
  medium: [
    {
      id: "q-6",
      category: "Islamic Knowledge",
      question: "Which revered angel is appointed to blow the Trumpet (Soor) on the Day of Judgment?",
      options: ["Jibreel (AS)", "Mika'eel (AS)", "Israfil (AS)", "Malik (AS)"],
      correctAnswerIndex: 2,
      explanation: "Angel Israfil (AS) is commanded by Allah to blow the Trumpet to signal the Day of Resurrection.",
      source: "Quran 39:68"
    },
    {
      id: "q-7",
      category: "General GK",
      question: "Which Indian state has the longest mainland coastline?",
      options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
      correctAnswerIndex: 2,
      explanation: "Gujarat has the longest mainland coastline in India, stretching over 1,600 kilometers.",
      source: "Survey of India"
    },
    {
      id: "q-8",
      category: "Quranic Sciences",
      question: "Which is the longest Ayah (verse) in the entire Holy Quran?",
      options: ["Ayatul Kursi (2:255)", "Ayat al-Dayn (2:282)", "Ayat an-Noor (24:35)", "Ayat al-Amanah (33:72)"],
      correctAnswerIndex: 1,
      explanation: "Ayat al-Dayn (Surah Al-Baqarah 2:282), known as the Verse of Debt/Contracts, is the longest single verse in the Quran.",
      source: "Quran 2:282"
    },
    {
      id: "q-9",
      category: "General Science",
      question: "What is the primary power house organelle of a human cell?",
      options: ["Ribosome", "Mitochondria", "Nucleus", "Endoplasmic Reticulum"],
      correctAnswerIndex: 1,
      explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions (ATP).",
      source: "Cell Biology Fundamentals"
    },
    {
      id: "q-10",
      category: "Islamic History",
      question: "Who was chosen as the first Caliph of Islam after Prophet Muhammad (PBUH)?",
      options: ["Umar ibn Al-Khattab (RA)", "Abu Bakr As-Siddiq (RA)", "Uthman ibn Affan (RA)", "Ali ibn Abi Talib (RA)"],
      correctAnswerIndex: 1,
      explanation: "Abu Bakr As-Siddiq (RA) was elected as the first righteous Caliph (Khalifah) by the consensus of the Sahabah.",
      source: "Tarikh at-Tabari"
    }
  ],
  hard: [
    {
      id: "q-11",
      category: "Quranic Sciences",
      question: "In which Surah does 'Bismillahir Rahmanir Raheem' appear inside an Ayah, in addition to the opening?",
      options: ["Surah An-Naml (27:30)", "Surah At-Tawbah (9:1)", "Surah Al-Baqarah (2:255)", "Surah Ya-Sin (36:58)"],
      correctAnswerIndex: 0,
      explanation: "In Surah An-Naml (27:30), Prophet Sulaiman's letter to Queen Bilqis begins with 'Inna hu min Sulaimana wa inna hu Bismillahir Rahmanir Raheem'.",
      source: "Quran 27:30"
    },
    {
      id: "q-12",
      category: "Islamic Jurisprudence",
      question: "How many Sujud at-Tilawah (prostrations of recitation) are there in the standard Quranic text?",
      options: ["11", "14", "17", "21"],
      correctAnswerIndex: 1,
      explanation: "There are 14 agreed-upon prostrations of recitation (Sujud at-Tilawah) across the Holy Quran.",
      source: "Fiqh us-Sunnah"
    },
    {
      id: "q-13",
      category: "World History",
      question: "The historic House of Wisdom (Bayt al-Hikmah) was established during which Islamic Golden Age dynasty in Baghdad?",
      options: ["Umayyad Caliphate", "Abbasid Caliphate", "Ottoman Empire", "Fatimid Caliphate"],
      correctAnswerIndex: 1,
      explanation: "Bayt al-Hikmah was founded by Caliph Harun al-Rashid and flourished under Caliph Al-Ma'mun during the Abbasid dynasty.",
      source: "History of Islamic Civilization"
    }
  ]
};

let memoryAttempts = [
  {
    id: "att-1",
    category: "Islamic GK & Science",
    difficulty: "easy",
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    completedAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "att-2",
    category: "General GK & Quran",
    difficulty: "medium",
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    completedAt: new Date(Date.now() - 3600000 * 24),
  }
];

// @desc    Get questions for a difficulty (without revealing correctAnswerIndex to prevent cheating)
// @route   GET /api/v1/quiz/questions
exports.getQuestions = (req, res) => {
  const difficulty = req.query.difficulty || "easy";
  const questions = questionsBank[difficulty] || questionsBank.easy;

  // Safe questions without the answer index
  const safeQuestions = questions.map(({ correctAnswerIndex, ...rest }) => rest);
  res.json({
    success: true,
    count: safeQuestions.length,
    difficulty,
    data: safeQuestions
  });
};

// @desc    Submit quiz answers and CALCULATE SCORE SAFELY ON THE SERVER
// @route   POST /api/v1/quiz/attempts
// @note    PDF Requirement: "Quiz scoring is calculated safely on the server; the client cannot choose its own score."
exports.submitAttempt = async (req, res) => {
  try {
    const { difficulty = "easy", userAnswers = [], category = "Mixed Daily Challenge" } = req.body;
    const questions = questionsBank[difficulty] || questionsBank.easy;

    // Server-side safe scoring calculation
    let serverCalculatedScore = 0;
    const answerReview = [];

    questions.forEach((q) => {
      // Find what user selected for this question
      const submitted = userAnswers.find((a) => String(a.questionId) === String(q.id));
      const selectedIndex = submitted !== undefined && submitted.selectedIndex !== undefined ? Number(submitted.selectedIndex) : -1;
      const isCorrect = selectedIndex === q.correctAnswerIndex;

      if (isCorrect) {
        serverCalculatedScore += 1;
      }

      answerReview.push({
        questionId: q.id,
        question: q.question,
        category: q.category,
        options: q.options,
        selectedIndex,
        correctAnswerIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
        source: q.source,
      });
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((serverCalculatedScore / totalQuestions) * 100);
    const pointsEarned = serverCalculatedScore * 10;

    const attemptRecord = {
      id: "att-" + Date.now(),
      category,
      difficulty,
      score: serverCalculatedScore,
      totalQuestions,
      percentage,
      pointsEarned,
      completedAt: new Date(),
      review: answerReview,
    };

    if (getDBStatus()) {
      const saved = await QuizAttempt.create({
        userId: req.user._id,
        category,
        difficulty,
        score: serverCalculatedScore,
        totalQuestions,
        percentage,
        answers: answerReview.map(r => ({
          questionId: r.questionId,
          selectedOption: r.selectedIndex,
          isCorrect: r.isCorrect,
        })),
      });
      return res.status(201).json({
        success: true,
        message: `Quiz scored safely by server! You got ${serverCalculatedScore}/${totalQuestions} (${percentage}%).`,
        data: {
          ...attemptRecord,
          _id: saved._id,
        },
      });
    }

    memoryAttempts.unshift(attemptRecord);

    return res.status(201).json({
      success: true,
      message: `Quiz scored safely by server! You got ${serverCalculatedScore}/${totalQuestions} (${percentage}%).`,
      data: attemptRecord,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user's past quiz attempts & history
// @route   GET /api/v1/quiz/attempts
exports.getAttempts = async (req, res) => {
  try {
    if (getDBStatus()) {
      const dbAttempts = await QuizAttempt.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: dbAttempts.length, data: dbAttempts });
    }
    return res.json({ success: true, count: memoryAttempts.length, data: memoryAttempts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
