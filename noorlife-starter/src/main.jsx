import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Components
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { PrayerTimesWidget } from "./components/PrayerTimesWidget";
import { DailyDuaWidget } from "./components/DailyDuaWidget";
import { QuranTrackerWidget } from "./components/QuranTrackerWidget";
import { AIAssistantWidget } from "./components/AIAssistantWidget";
import { Toast } from "./components/Toast";

// Modals
import { AddTaskModal } from "./components/Modals/AddTaskModal";
import { AddGroceryModal } from "./components/Modals/AddGroceryModal";
import { RecipeModal } from "./components/Modals/RecipeModal";
import { QuizModal } from "./components/Modals/QuizModal";
import { QuranGoalModal } from "./components/Modals/QuranGoalModal";
import { AIChatModal } from "./components/Modals/AIChatModal";

// Pages
import { DashboardPage } from "./pages/DashboardPage";
import { TasksPage } from "./pages/TasksPage";
import { GroceryMealsPage } from "./pages/GroceryMealsPage";
import { QuizPage } from "./pages/QuizPage";
import { NamazGuidePage } from "./pages/NamazGuidePage";
import { PrayerTimesPage } from "./pages/PrayerTimesPage";
import { DailyDeenPage } from "./pages/DailyDeenPage";
import { CalendarPage } from "./pages/CalendarPage";
import { BudgetPage } from "./pages/BudgetPage";
import { QuranTrackerPage } from "./pages/QuranTrackerPage";
import { RewardsPage } from "./pages/RewardsPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { SettingsPage } from "./pages/SettingsPage";

// Initial datasets
import {
  initialTasks,
  initialGroceries,
  weeklyMealsData,
  namazStepsData,
  familyEventsData,
  dailyDuasData,
} from "./data/initialData";
import { defaultQuranProgress } from "./data/quranData";

function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("noorlife_theme") || "light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Core Data States (persistent with fallback)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("noorlife_tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [groceries, setGroceries] = useState(() => {
    const saved = localStorage.getItem("noorlife_groceries");
    return saved ? JSON.parse(saved) : initialGroceries;
  });

  const [namazSteps, setNamazSteps] = useState(namazStepsData);
  const [weeklyMeals, setWeeklyMeals] = useState(weeklyMealsData);
  const [calendarEvents, setCalendarEvents] = useState(familyEventsData);
  const [quranProgress, setQuranProgress] = useState(defaultQuranProgress);
  const [userScore, setUserScore] = useState(80);

  // Modals state
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddGroceryOpen, setIsAddGroceryOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState("easy");
  const [isQuranGoalOpen, setIsQuranGoalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatPrompt, setAiChatPrompt] = useState("");

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("noorlife_theme", theme);
  }, [theme]);

  // Persist tasks & groceries
  useEffect(() => {
    localStorage.setItem("noorlife_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("noorlife_groceries", JSON.stringify(groceries));
  }, [groceries]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  // Task actions
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task added: "${newTask.title}"`);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Task removed");
  };

  // Grocery actions
  const toggleGrocery = (id) => {
    setGroceries((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  };

  const handleAddGrocery = (newItem) => {
    setGroceries((prev) => [...prev, newItem]);
    showToast(`Added to grocery: "${newItem.name}"`);
  };

  const handleDeleteGrocery = (id) => {
    setGroceries((prev) => prev.filter((g) => g.id !== id));
    showToast("Item deleted from groceries");
  };

  // Namaz step toggle
  const toggleNamazStep = (id) => {
    setNamazSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  // Calendar actions
  const handleAddEvent = (newEvent) => {
    setCalendarEvents((prev) => [...prev, newEvent]);
    showToast(`Event scheduled: "${newEvent.title}"`);
  };

  const handleDeleteEvent = (id) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast("Event removed from calendar");
  };

  // Quiz launcher
  const handleStartQuiz = (difficulty = "easy") => {
    setQuizDifficulty(difficulty);
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (score, total) => {
    const calculatedPercent = Math.round((score / total) * 100);
    setUserScore(calculatedPercent);
    showToast(`Quiz completed! You scored ${score}/${total} ⭐`);
  };

  // AI Prompts
  const handleAIPromptSelect = (promptText) => {
    setAiChatPrompt(promptText);
    setIsAIChatOpen(true);
  };

  const handleAISendMessage = (userText) => {
    setAiChatPrompt(userText);
    setIsAIChatOpen(true);
  };

  return (
    <div className="app-container">
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          setTheme={setTheme}
          tasks={tasks}
          duas={dailyDuasData}
          toggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />

        <div style={{ display: "flex", flex: 1 }}>
          {/* Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            taskCount={tasks.filter((t) => !t.done).length}
            isMobileOpen={isMobileNavOpen}
            closeMobileNav={() => setIsMobileNavOpen(false)}
          />

          {/* Main Viewport Shell */}
          <main className="main-viewport">
            {/* View Switcher: Dashboard or Dedicated Module Page */}
            {activeTab === "Dashboard" && (
              <DashboardPage
                tasks={tasks}
                toggleTask={toggleTask}
                onAddTaskClick={() => setIsAddTaskOpen(true)}
                onStartQuiz={handleStartQuiz}
                namazSteps={namazSteps}
                toggleNamazStep={toggleNamazStep}
                onContinueNamaz={() => setActiveTab("Namaz Guide")}
                weeklyMeals={weeklyMeals}
                onViewRecipe={(meal) => setSelectedRecipe(meal)}
                onViewAllMeals={() => setActiveTab("Grocery & Meals")}
                groceries={groceries}
                toggleGrocery={toggleGrocery}
                onAddGroceryClick={() => setIsAddGroceryOpen(true)}
                calendarEvents={calendarEvents}
                onViewAllCalendar={() => setActiveTab("Family Calendar")}
                quranProgress={quranProgress}
                onSelectModule={(tabName) => setActiveTab(tabName)}
                onViewRewards={() => setActiveTab("Rewards & Streaks")}
              />
            )}

            {activeTab === "Home Tasks" && (
              <TasksPage
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={handleDeleteTask}
                onAddTaskClick={() => setIsAddTaskOpen(true)}
              />
            )}

            {activeTab === "Grocery & Meals" && (
              <GroceryMealsPage
                groceries={groceries}
                toggleGrocery={toggleGrocery}
                deleteGrocery={handleDeleteGrocery}
                onAddGroceryClick={() => setIsAddGroceryOpen(true)}
                weeklyMeals={weeklyMeals}
                onViewRecipe={(meal) => setSelectedRecipe(meal)}
              />
            )}

            {activeTab === "GK Quiz" && (
              <QuizPage
                onStartQuiz={handleStartQuiz}
                userScore={userScore}
              />
            )}

            {activeTab === "Namaz Guide" && (
              <NamazGuidePage
                steps={namazSteps}
                toggleStep={toggleNamazStep}
              />
            )}

            {activeTab === "Prayer Times" && <PrayerTimesPage />}

            {activeTab === "Daily Deen" && (
              <DailyDeenPage showToast={showToast} />
            )}

            {activeTab === "Family Calendar" && (
              <CalendarPage
                events={calendarEvents}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            )}

            {activeTab === "Budget Manager" && (
              <BudgetPage showToast={showToast} />
            )}

            {activeTab === "Quran Tracker" && (
              <QuranTrackerPage
                quranProgress={quranProgress}
                onUpdateProgress={setQuranProgress}
                onOpenGoalModal={() => setIsQuranGoalOpen(true)}
              />
            )}

            {activeTab === "Rewards & Streaks" && (
              <RewardsPage streakDays={7} points={350} showToast={showToast} />
            )}

            {activeTab === "AI Assistant" && (
              <AIAssistantPage showToast={showToast} />
            )}

            {activeTab === "Settings" && (
              <SettingsPage theme={theme} setTheme={setTheme} showToast={showToast} />
            )}

            {/* Right Panel Widgets (always available on Dashboard, or responsive) */}
            {activeTab === "Dashboard" && (
              <aside className="right-sidebar-panel">
                <PrayerTimesWidget
                  onOpenPrayerSettings={() => setActiveTab("Prayer Times")}
                />

                <DailyDuaWidget
                  duas={dailyDuasData}
                  onViewAllDuas={() => setActiveTab("Daily Deen")}
                  showToast={showToast}
                />

                <QuranTrackerWidget
                  quranData={quranProgress}
                  onOpenGoalModal={() => setIsQuranGoalOpen(true)}
                />

                <AIAssistantWidget
                  onPromptSelect={handleAIPromptSelect}
                  onSendMessage={handleAISendMessage}
                />
              </aside>
            )}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />

      <AddGroceryModal
        isOpen={isAddGroceryOpen}
        onClose={() => setIsAddGroceryOpen(false)}
        onAddGrocery={handleAddGrocery}
      />

      <RecipeModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        meal={selectedRecipe}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        initialDifficulty={quizDifficulty}
        onQuizComplete={handleQuizComplete}
      />

      <QuranGoalModal
        isOpen={isQuranGoalOpen}
        onClose={() => setIsQuranGoalOpen(false)}
        currentData={quranProgress}
        onUpdateGoal={(updated) => {
          setQuranProgress(updated);
          showToast("Quran reading goal saved!");
        }}
      />

      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => {
          setIsAIChatOpen(false);
          setAiChatPrompt("");
        }}
        initialPrompt={aiChatPrompt}
      />

      {/* Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
