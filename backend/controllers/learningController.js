const LearningProgress = require("../models/LearningProgress");
const { getDBStatus } = require("../config/db");

let memoryProgress = {
  "salah-men": {
    module: "salah-men",
    completedStepIds: ["men-1", "men-2"],
    currentStep: 2,
    totalSteps: 9,
  },
  "salah-women": {
    module: "salah-women",
    completedStepIds: ["women-1", "women-2"],
    currentStep: 2,
    totalSteps: 9,
  },
  salah: {
    module: "salah",
    completedStepIds: ["salah-1", "salah-2"],
    currentStep: 2,
    totalSteps: 9,
  },
  wudu: {
    module: "wudu",
    completedStepIds: ["wudu-1", "wudu-2", "wudu-3"],
    currentStep: 3,
    totalSteps: 8,
  },
};

// @desc    Get all learning modules summary
// @route   GET /api/v1/learning/modules
exports.getModules = (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: "salah",
        title: "Learn Salah (Namaz)",
        subtitle: "Step-by-step prayer postures, Arabic recitations, and meanings",
        totalSteps: 8,
        category: "Ibadah",
      },
      {
        id: "wudu",
        title: "Learn Wudu (Ablution)",
        subtitle: "Purification steps before approaching the prayer mat",
        totalSteps: 8,
        category: "Taharah",
      },
    ],
  });
};

// @desc    Get user's learning progress
// @route   GET /api/v1/learning/progress
exports.getProgress = async (req, res) => {
  try {
    const { module = "salah" } = req.query;

    if (getDBStatus()) {
      let progress = await LearningProgress.findOne({
        userId: req.user._id,
        module,
      });

      if (!progress) {
        progress = await LearningProgress.create({
          userId: req.user._id,
          module,
          completedStepIds: memoryProgress[module]?.completedStepIds || [],
          currentStep: memoryProgress[module]?.currentStep || 0,
          totalSteps: 8,
        });
      }

      return res.json({ success: true, data: progress });
    }

    return res.json({
      success: true,
      data: memoryProgress[module] || memoryProgress.salah,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update learning progress (mark steps done, resume progress)
// @route   PATCH /api/v1/learning/progress
exports.updateProgress = async (req, res) => {
  try {
    const { module = "salah", completedStepIds, currentStep } = req.body;

    if (getDBStatus()) {
      let progress = await LearningProgress.findOne({
        userId: req.user._id,
        module,
      });

      if (!progress) {
        progress = new LearningProgress({
          userId: req.user._id,
          module,
          completedStepIds: completedStepIds || [],
          currentStep: currentStep !== undefined ? currentStep : 0,
        });
      } else {
        if (completedStepIds) progress.completedStepIds = completedStepIds;
        if (currentStep !== undefined) progress.currentStep = currentStep;
      }

      const updated = await progress.save();
      return res.json({ success: true, data: updated });
    }

    if (!memoryProgress[module]) {
      memoryProgress[module] = { module, completedStepIds: [], currentStep: 0, totalSteps: 8 };
    }

    if (completedStepIds) memoryProgress[module].completedStepIds = completedStepIds;
    if (currentStep !== undefined) memoryProgress[module].currentStep = currentStep;

    return res.json({ success: true, data: memoryProgress[module] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
