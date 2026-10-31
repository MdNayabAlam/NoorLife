const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const groceryController = require("../controllers/groceryController");
const mealController = require("../controllers/mealController");
const calendarController = require("../controllers/calendarController");
const budgetController = require("../controllers/budgetController");
const quizController = require("../controllers/quizController");
const learningController = require("../controllers/learningController");
const quranController = require("../controllers/quranController");
const rewardController = require("../controllers/rewardController");
const prayerController = require("../controllers/prayerController");
const assistantController = require("../controllers/assistantController");
const naatController = require("../controllers/naatController");

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date(),
    uptime: process.uptime(),
    service: "NoorLife REST API v1",
    author: "NoorLife Full-Stack Team",
  });
});

// Auth Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.get("/auth/me", protect, authController.getMe);
router.patch("/auth/me", protect, authController.updateMe);
router.post("/auth/change-password", protect, authController.changePassword);
router.post("/auth/delete-account", protect, authController.deleteAccount);

// Task Routes
router.route("/tasks")
  .get(protect, taskController.getTasks)
  .post(protect, taskController.createTask);

router.route("/tasks/:id")
  .patch(protect, taskController.updateTask)
  .delete(protect, taskController.deleteTask);

// Grocery Routes
router.route("/groceries")
  .get(protect, groceryController.getGroceries)
  .post(protect, groceryController.createGrocery);

router.route("/groceries/:id")
  .patch(protect, groceryController.updateGrocery)
  .delete(protect, groceryController.deleteGrocery);

// Meal Planner Routes
router.route("/meals")
  .get(protect, mealController.getMeals)
  .post(protect, mealController.createMeal);

router.route("/meals/:id")
  .patch(protect, mealController.updateMeal)
  .delete(protect, mealController.deleteMeal);

// Calendar Events Routes
router.route("/events")
  .get(protect, calendarController.getEvents)
  .post(protect, calendarController.createEvent);

router.route("/events/:id")
  .delete(protect, calendarController.deleteEvent);

// Budget Routes
router.get("/budget/summary", protect, budgetController.getBudgetSummary);
router.post("/budget/entries", protect, budgetController.createBudgetEntry);
router.delete("/budget/entries/:id", protect, budgetController.deleteBudgetEntry);

// Quiz Routes
router.get("/quiz/questions", quizController.getQuestions);
router.post("/quiz/attempts", protect, quizController.submitAttempt);
router.get("/quiz/attempts", protect, quizController.getAttempts);

// Learning Progress Routes (Namaz & Wudu)
router.get("/learning/modules", learningController.getModules);
router.get("/learning/progress", protect, learningController.getProgress);
router.patch("/learning/progress", protect, learningController.updateProgress);

// Quran Progress Routes
router.route("/quran/progress")
  .get(protect, quranController.getQuranProgress)
  .patch(protect, quranController.updateQuranProgress);

// Rewards & Streaks Routes
router.get("/rewards", protect, rewardController.getRewards);
router.post("/rewards/activity", protect, rewardController.logRewardActivity);

// Prayer Times & Islamic Calendar Routes
router.get("/prayer-times", prayerController.getPrayerTimes);
router.get("/prayer-times/festivals", prayerController.getIslamicFestivals);
router.get("/prayer-times/calendar", prayerController.getMonthlyCalendar);

// Assistant Chat Route
router.post("/assistant/chat", assistantController.chatAssistant);

// Global Naat Search Route
router.get("/naats/search", naatController.searchNaats);

module.exports = router;
