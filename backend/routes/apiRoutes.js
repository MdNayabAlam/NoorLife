const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth");
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController");
const groceryController = require("../controllers/groceryController");
const calendarController = require("../controllers/calendarController");
const budgetController = require("../controllers/budgetController");
const quizController = require("../controllers/quizController");
const quranController = require("../controllers/quranController");
const prayerController = require("../controllers/prayerController");
const assistantController = require("../controllers/assistantController");

// Health check
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date(),
    uptime: process.uptime(),
    service: "NoorLife REST API v1",
  });
});

// Auth Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", protect, authController.getMe);
router.patch("/auth/me", protect, authController.updateMe);

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

// Quran Progress Routes
router.route("/quran/progress")
  .get(protect, quranController.getQuranProgress)
  .patch(protect, quranController.updateQuranProgress);

// Prayer Times Route
router.get("/prayer-times", prayerController.getPrayerTimes);

// Assistant Chat Route
router.post("/assistant/chat", assistantController.chatAssistant);

module.exports = router;
