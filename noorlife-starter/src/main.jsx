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
import { MobileBottomNav } from "./components/MobileBottomNav";
import { AdhanAlertBanner } from "./components/AdhanAlertBanner";
import { adhanService } from "./services/adhanService";
import { notificationService } from "./services/notificationService";

// Modals
import { AddTaskModal } from "./components/Modals/AddTaskModal";
import { AddGroceryModal } from "./components/Modals/AddGroceryModal";
import { RecipeModal } from "./components/Modals/RecipeModal";
import { QuizModal } from "./components/Modals/QuizModal";
import { QuranGoalModal } from "./components/Modals/QuranGoalModal";
import { AIChatModal } from "./components/Modals/AIChatModal";
import { AuthModal } from "./components/Modals/AuthModal";
import { AdhanModal } from "./components/Modals/AdhanModal";
import { LocationModal } from "./components/Modals/LocationModal";

// Pages
import { DashboardPage } from "./pages/DashboardPage";
import { TasksPage } from "./pages/TasksPage";
import { GroceryMealsPage } from "./pages/GroceryMealsPage";
import { SunnahDishesPage } from "./pages/SunnahDishesPage";
import { QuizPage } from "./pages/QuizPage";
import { NamazGuidePage } from "./pages/NamazGuidePage";
import { NamazNiyyahPage } from "./pages/NamazNiyyahPage";
import { PrayerTimesPage } from "./pages/PrayerTimesPage";
import { DailyDeenPage } from "./pages/DailyDeenPage";
import { NaatSharifPage } from "./pages/NaatSharifPage";
import { CalendarPage } from "./pages/CalendarPage";
import { IslamicCalendarPage } from "./pages/IslamicCalendarPage";
import { FamilyCalendarPage } from "./pages/FamilyCalendarPage";
import { BudgetPage } from "./pages/BudgetPage";
import { QuranReaderPage } from "./pages/QuranReaderPage";
import { QuranTrackerPage } from "./pages/QuranTrackerPage";
import { RewardsPage } from "./pages/RewardsPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { SettingsPage } from "./pages/SettingsPage";

import {
  initialTasks,
  initialGroceries,
  weeklyMealsData,
  namazStepsData,
  familyEventsData,
  dailyDuasData,
} from "./data/initialData";
import { defaultQuranProgress } from "./data/quranData";

// Backend API services
import {
  fetchTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  fetchGroceriesAPI,
  createGroceryAPI,
  updateGroceryAPI,
  deleteGroceryAPI,
  fetchMealsAPI,
  createMealAPI,
  fetchEventsAPI,
  createEventAPI,
  deleteEventAPI,
  fetchQuranProgressAPI,
  updateQuranProgressAPI,
  fetchCurrentUserAPI,
  logoutAPI,
  fetchPrayerTimesAPI,
  fetchIslamicFestivalsAPI,
} from "./services/api";

function App() {
  // Navigation & Theme
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("noorlife_theme") || "light");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // User Profile (Nayab or NS, or null if signed out)
  const [user, setUser] = useState(() => {
    const isSignedOut = localStorage.getItem("noorlife_signed_out") === "true";
    if (isSignedOut) return null;

    const saved = localStorage.getItem("noorlife_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.name || parsed.displayName)) {
          if (parsed.displayName !== "NS") {
            parsed.avatarImg = "/images/user_nayab.png";
          }
          return parsed;
        }
      } catch (e) {
        // ignore
      }
    }
    const defaultUser = {
      name: "Md Nayab Alam",
      displayName: "Nayab",
      email: "alamnayab718@gmail.com",
      avatarImg: "/images/user_nayab.png",
      isPro: true,
    };
    localStorage.setItem("noorlife_user", JSON.stringify(defaultUser));
    return defaultUser;
  });

  // Core Data States (persistent with fallback)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("noorlife_tasks_v3");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [groceries, setGroceries] = useState(() => {
    const saved = localStorage.getItem("noorlife_groceries");
    return saved ? JSON.parse(saved) : initialGroceries;
  });

  const [namazSteps, setNamazSteps] = useState(namazStepsData);
  const [weeklyMeals, setWeeklyMeals] = useState(weeklyMealsData);
  const [calendarEvents, setCalendarEvents] = useState(() => {
    const saved = localStorage.getItem("noorlife_family_events");
    return saved ? JSON.parse(saved) : familyEventsData;
  });
  const [quranProgress, setQuranProgress] = useState(defaultQuranProgress);
  const [quranActivePara, setQuranActivePara] = useState(1);
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdhanModalOpen, setIsAdhanModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Global Location, Prayer Times & Islamic Festivals State
  const [currentLocation, setCurrentLocation] = useState(() => localStorage.getItem("noorlife_location") || "New Delhi, India");
  const [prayerData, setPrayerData] = useState(null);
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [islamicFestivals, setIslamicFestivals] = useState([]);

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("noorlife_theme", theme);
  }, [theme]);

  // Persist user, tasks & groceries
  useEffect(() => {
    if (user) {
      localStorage.setItem("noorlife_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("noorlife_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("noorlife_tasks_v3", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("noorlife_groceries", JSON.stringify(groceries));
  }, [groceries]);

  useEffect(() => {
    localStorage.setItem("noorlife_family_events", JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Global location change handler (supports city name, state, country or GPS coords)
  const handleLocationChange = (newCity, method = "1", coords = null) => {
    setPrayerLoading(true);
    fetchPrayerTimesAPI(newCity, method, coords)
      .then((data) => {
        if (data) {
          const finalCity = data.city || newCity;
          setCurrentLocation(finalCity);
          setPrayerData(data);
          localStorage.setItem("noorlife_location", finalCity);
          showToast(`Location synced to ${finalCity.split(",")[0]} 📍 (${data.timezone || "Global"})`);
        }
      })
      .catch((err) => {
        console.warn("Prayer times update failed:", err);
      })
      .finally(() => setPrayerLoading(false));
  };

  // Sync with backend API on mount
  useEffect(() => {
    fetchTasksAPI()
      .then((data) => {
        if (data && data.length > 0) setTasks(data);
      })
      .catch(() => {});

    fetchGroceriesAPI()
      .then((data) => {
        if (data && data.length > 0) setGroceries(data);
      })
      .catch(() => {});

    fetchMealsAPI()
      .then((data) => {
        if (data && data.length > 0) {
          const map = {};
          data.forEach((m) => {
            if (m.day) map[m.day] = m;
          });
          setWeeklyMeals((prev) => ({ ...prev, ...map }));
        }
      })
      .catch(() => {});

    fetchEventsAPI()
      .then((data) => {
        if (data && data.length > 0) setCalendarEvents(data);
      })
      .catch(() => {});

    fetchQuranProgressAPI()
      .then((data) => {
        if (data) setQuranProgress((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});

    // Initial prayer times & Islamic festivals fetch
    fetchPrayerTimesAPI(currentLocation, "1")
      .then((data) => {
        if (data) setPrayerData(data);
      })
      .catch(() => {});

    fetchIslamicFestivalsAPI()
      .then((fList) => {
        if (fList && fList.length > 0) setIslamicFestivals(fList);
      })
      .catch(() => {});
  }, []);

  // Background Real-Time Azaan & Prayer Time Checker
  useEffect(() => {
    if (!prayerData) return;
    const interval = setInterval(() => {
      adhanService.checkAndTriggerPrayer(prayerData, (triggeredPrayer) => {
        showToast(`🕌 Waqt ho gaya hai ${triggeredPrayer} namaz ka! Azaan is playing.`);
        setIsAdhanModalOpen(true);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [prayerData]);

  // Real-time Family Calendar reminder checker (today's events & exact scheduled times)
  useEffect(() => {
    if (!calendarEvents || calendarEvents.length === 0) return;

    notificationService.checkFamilyCalendarAlerts(calendarEvents, (alertInfo) => {
      if (alertInfo.type === "exact_time") {
        showToast(`⏰ Waqt ho gaya: "${alertInfo.title}" (${alertInfo.time})! 🔔`);
      } else {
        showToast(`📅 Reminder: "${alertInfo.title}" is scheduled for TODAY! 🔔`);
      }
    });

    const interval = setInterval(() => {
      notificationService.checkFamilyCalendarAlerts(calendarEvents, (alertInfo) => {
        if (alertInfo.type === "exact_time") {
          showToast(`⏰ Waqt ho gaya: "${alertInfo.title}" (${alertInfo.time})! 🔔`);
        } else {
          showToast(`📅 Reminder: "${alertInfo.title}" is scheduled for TODAY! 🔔`);
        }
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [calendarEvents]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  // Auth actions
  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("noorlife_user");
    localStorage.setItem("noorlife_signed_out", "true");
    setUser(null);
    setActiveTab("Dashboard");
    showToast("Signed out of NoorLife successfully. Assalamu Alaikum! 🌿");
  };

  // Task actions
  const toggleTask = (id) => {
    const current = tasks.find((t) => t.id === id);
    const updatedDone = current ? !current.done : false;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: updatedDone } : t))
    );

    updateTaskAPI(id, { done: updatedDone }).catch(() => {});
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task added: "${newTask.title}"`);
    createTaskAPI(newTask).catch(() => {});
  };

  const handleEditTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast("Task updated successfully!");
    updateTaskAPI(id, updates).catch(() => {});
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast("Task removed");
    deleteTaskAPI(id).catch(() => {});
  };

  // Grocery actions
  const toggleGrocery = (id) => {
    const current = groceries.find((g) => g.id === id);
    const updatedDone = current ? !current.done : false;

    setGroceries((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: updatedDone } : g))
    );

    updateGroceryAPI(id, { done: updatedDone }).catch(() => {});
  };

  const handleAddGrocery = (newItem) => {
    setGroceries((prev) => [...prev, newItem]);
    showToast(`Added to grocery: "${newItem.name}"`);
    createGroceryAPI(newItem).catch(() => {});
  };

  const handleDeleteGrocery = (id) => {
    setGroceries((prev) => prev.filter((g) => g.id !== id));
    showToast("Item deleted from groceries");
    deleteGroceryAPI(id).catch(() => {});
  };

  // Meal Planner actions
  const handleAddCustomMeal = (newMeal) => {
    setWeeklyMeals((prev) => ({
      ...prev,
      [newMeal.day]: newMeal,
    }));
    showToast(`Added ${newMeal.title} for ${newMeal.day}! 🍲`);
    createMealAPI(newMeal).catch(() => {});
  };

  // Namaz step toggle
  const toggleNamazStep = (id) => {
    setNamazSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  // Calendar actions
  const handleAddEvent = (newEvent) => {
    setCalendarEvents((prev) => [newEvent, ...prev]);

    // Real-time notification & alert triggering
    notificationService.onEventCreated(newEvent, (alertInfo) => {
      if (alertInfo.isToday) {
        showToast(`🚨 Alert: "${alertInfo.title}" scheduled for TODAY! 📅🔔`);
      } else {
        showToast(`Event scheduled: "${alertInfo.title}" for ${alertInfo.date} 📅`);
      }
    });

    createEventAPI(newEvent).catch(() => {});
  };

  const handleDeleteEvent = (id) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast("Event removed from calendar");
    deleteEventAPI(id).catch(() => {});
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

  // Quran Progress updater
  const handleUpdateQuranProgress = (updatedData) => {
    setQuranProgress(updatedData);
    updateQuranProgressAPI(updatedData).catch(() => {});
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
      {/* Global Adhan Alert Banner (Triggers automatically when prayer time arrives or user plays) */}
      <AdhanAlertBanner onOpenAdhanModal={() => setIsAdhanModalOpen(true)} />

      <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingBottom: "70px" }}>
        {/* Top Header */}
        <Header
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          setTheme={setTheme}
          tasks={tasks}
          duas={dailyDuasData}
          currentLocation={currentLocation}
          toggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
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
                user={user}
                theme={theme}
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
                prayerData={prayerData}
              />
            )}

            {activeTab === "Home Tasks" && (
              <TasksPage
                tasks={tasks}
                toggleTask={toggleTask}
                deleteTask={handleDeleteTask}
                onAddTaskClick={() => setIsAddTaskOpen(true)}
                onEditTask={handleEditTask}
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
                onAddCustomMeal={handleAddCustomMeal}
              />
            )}

            {activeTab === "Sunnah Dishes" && (
              <SunnahDishesPage
                onAddGroceryItem={handleAddGrocery}
                onNavigateMeals={() => setActiveTab("Grocery & Meals")}
                showToast={showToast}
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
                showToast={showToast}
              />
            )}

            {activeTab === "Namaz Ki Niyyat" && (
              <NamazNiyyahPage
                onNavigateGuide={() => setActiveTab("Namaz Guide")}
                showToast={showToast}
              />
            )}

            {activeTab === "Prayer Times" && (
              <PrayerTimesPage
                currentCity={currentLocation}
                onCityChange={handleLocationChange}
                prayerData={prayerData}
                loading={prayerLoading}
                onOpenAdhanModal={() => setIsAdhanModalOpen(true)}
              />
            )}

            {activeTab === "Daily Deen" && (
              <DailyDeenPage showToast={showToast} />
            )}

            {activeTab === "Naat Sharif" && (
              <NaatSharifPage showToast={showToast} />
            )}

            {activeTab === "Islamic Calendar" && (
              <IslamicCalendarPage
                onAddEventToFamily={handleAddEvent}
                showToast={showToast}
                onNavigateFamily={() => setActiveTab("Family Calendar")}
              />
            )}

            {activeTab === "Family Calendar" && (
              <FamilyCalendarPage
                events={calendarEvents}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                showToast={showToast}
                onNavigateIslamic={() => setActiveTab("Islamic Calendar")}
              />
            )}

            {activeTab === "Budget Manager" && (
              <BudgetPage showToast={showToast} />
            )}

            {activeTab === "Quran Reader" && (
              <QuranReaderPage
                targetPara={quranActivePara}
                onNavigateTracker={() => setActiveTab("Quran Tracker")}
                showToast={showToast}
              />
            )}

            {activeTab === "Quran Tracker" && (
              <QuranTrackerPage
                quranProgress={quranProgress}
                onUpdateProgress={handleUpdateQuranProgress}
                onOpenGoalModal={() => setIsQuranGoalOpen(true)}
                onNavigateReader={(paraNum) => {
                  if (paraNum) setQuranActivePara(paraNum);
                  setActiveTab("Quran Reader");
                }}
                showToast={showToast}
              />
            )}

            {activeTab === "Rewards & Streaks" && (
              <RewardsPage showToast={showToast} />
            )}

            {activeTab === "AI Assistant" && (
              <AIAssistantPage showToast={showToast} />
            )}

            {activeTab === "Settings" && (
              <SettingsPage
                user={user}
                onUpdateUser={setUser}
                theme={theme}
                setTheme={setTheme}
                onLogout={handleLogout}
                showToast={showToast}
              />
            )}

            {/* Right Panel Widgets (always available on Dashboard) */}
            {activeTab === "Dashboard" && (
              <aside className="right-sidebar-panel">
                <PrayerTimesWidget
                  currentCity={currentLocation}
                  prayerData={prayerData}
                  loading={prayerLoading}
                  onOpenPrayerSettings={() => setIsLocationModalOpen(true)}
                  onOpenAdhanModal={() => setIsAdhanModalOpen(true)}
                  onNavigateToPrayerPage={() => setActiveTab("Prayer Times")}
                  onCityChange={handleLocationChange}
                />

                <DailyDuaWidget
                  duas={dailyDuasData}
                  onViewAllDuas={() => setActiveTab("Daily Deen")}
                  showToast={showToast}
                />

                <AIAssistantWidget
                  onPromptSelect={handleAIPromptSelect}
                  onSendMessage={handleAISendMessage}
                />
              </aside>
            )}
          </main>
        </div>

        {/* Subtle, Crisp Botanical Foliage in bottom right corner resting neatly underneath content */}
        <div className="bottom-corner-foliage" aria-hidden="true">
          <svg viewBox="0 0 160 120" fill="none" width="160" height="120">
            <path d="M160 120 C130 90 100 65 60 50 C40 42 20 40 0 45 C30 35 60 40 90 55 C120 70 145 95 160 120 Z" fill="#2d6a4f" opacity="0.65" />
            <path d="M160 105 C135 80 110 50 85 30 C105 45 130 75 160 105 Z" fill="#40916c" opacity="0.6" />
            <path d="M160 120 C140 85 115 55 75 35 C65 30 50 25 35 25 C55 22 75 25 100 35 C130 50 150 85 160 120 Z" fill="#1b4332" opacity="0.75" />
          </svg>
        </div>
      </div>

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

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
          handleUpdateQuranProgress(updated);
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(newUser) => {
          localStorage.removeItem("noorlife_signed_out");
          localStorage.setItem("noorlife_user", JSON.stringify(newUser));
          setUser(newUser);
        }}
        showToast={showToast}
      />

      <AdhanModal
        isOpen={isAdhanModalOpen}
        onClose={() => setIsAdhanModalOpen(false)}
        currentCity={currentLocation}
        prayerName={prayerData?.nextPrayer?.name || "Adhan"}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentCity={currentLocation}
        onSelectCity={handleLocationChange}
        onNavigateToPrayerPage={() => setActiveTab("Prayer Times")}
        loading={prayerLoading}
      />

      {/* Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
