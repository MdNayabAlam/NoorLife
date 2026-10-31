const Reward = require("../models/Reward");
const { getDBStatus } = require("../config/db");

let memoryReward = {
  points: 350,
  currentStreak: 7,
  lastActivityDate: new Date(),
  claimedMilestones: ["7_day_milestone"],
  badges: [
    { title: "7-Day Consistency Master", desc: "Maintained active daily streak for 7 consecutive days", earned: true, category: "Streak" },
    { title: "Namaz Seeker", desc: "Completed 5 daily prayers on time", earned: true, category: "Ibadah" },
    { title: "Quran Explorer", desc: "Read 40+ pages of Surah Al-Baqarah", earned: true, category: "Ilm" },
    { title: "Home Task Champion", desc: "Checked off all planned household chores before Maghrib", earned: true, category: "Ghar" },
    { title: "Quiz Prodigy", desc: "Scored 100% on a Hard difficulty GK quiz", earned: false, category: "Knowledge" },
    { title: "Khatam Finisher", desc: "Complete the entire Holy Quran reading", earned: false, category: "Milestone" },
  ],
};

// @desc    Get user's rewards, points & streak
// @route   GET /api/v1/rewards
exports.getRewards = async (req, res) => {
  try {
    if (getDBStatus()) {
      let reward = await Reward.findOne({ userId: req.user._id });
      if (!reward) {
        reward = await Reward.create({
          userId: req.user._id,
          points: memoryReward.points,
          currentStreak: memoryReward.currentStreak,
          badges: memoryReward.badges,
        });
      }
      return res.json({ success: true, data: reward });
    }
    return res.json({ success: true, data: memoryReward });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Log activity or claim milestone (prevent duplicate reward claims)
// @route   POST /api/v1/rewards/activity
exports.logRewardActivity = async (req, res) => {
  try {
    const { action, milestoneId, pointsEarned = 10 } = req.body;

    // Check duplicate milestone claims
    if (action === "claim_milestone") {
      if (memoryReward.claimedMilestones.includes(milestoneId)) {
        return res.status(400).json({
          success: false,
          message: "You have already claimed this milestone reward! Duplicate claims are prevented.",
        });
      }

      memoryReward.claimedMilestones.push(milestoneId);
      memoryReward.points += pointsEarned || 50;

      return res.json({
        success: true,
        message: `Successfully claimed +${pointsEarned || 50} milestone points! 🌟`,
        data: memoryReward,
      });
    }

    // Daily activity increment
    memoryReward.points += pointsEarned;
    memoryReward.lastActivityDate = new Date();

    return res.json({
      success: true,
      message: `Points updated! +${pointsEarned} points awarded.`,
      data: memoryReward,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
