import React from "react";
import { HeroBanner } from "../components/HeroBanner";
import { QuickActions } from "../components/QuickActions";
import { TodayTasksCard } from "../components/TodayTasksCard";
import { GKQuizCard } from "../components/GKQuizCard";
import { LearnNamazCard } from "../components/LearnNamazCard";
import { MealPlanCard } from "../components/MealPlanCard";
import { GroceryListCard } from "../components/GroceryListCard";
import { FamilyCalendarCard } from "../components/FamilyCalendarCard";
import { ProgressRingCard } from "../components/ProgressRingCard";
import { RewardsCard } from "../components/RewardsCard";

export function DashboardPage({
  user,
  tasks,
  toggleTask,
  onAddTaskClick,
  onStartQuiz,
  namazSteps,
  toggleNamazStep,
  onContinueNamaz,
  weeklyMeals,
  onViewRecipe,
  onViewAllMeals,
  groceries,
  toggleGrocery,
  onAddGroceryClick,
  calendarEvents,
  onViewAllCalendar,
  quranProgress,
  onSelectModule,
  onViewRewards,
}) {
  const completedTasks = tasks.filter((t) => t.done).length;
  const taskPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const completedNamaz = namazSteps.filter((s) => s.done).length;
  const namazPercent = namazSteps.length > 0 ? Math.round((completedNamaz / namazSteps.length) * 100) : 0;

  return (
    <div className="center-content-area">
      {/* Hero Banner with Mosque Photo Blend */}
      <HeroBanner userName={user?.displayName || "Nayab"} />

      {/* Quick Action Pills Row */}
      <QuickActions onSelectModule={onSelectModule} />

      {/* Central 6-Card Grid */}
      <div className="cards-grid-2col">
        <TodayTasksCard
          tasks={tasks}
          toggleTask={toggleTask}
          onAddTaskClick={onAddTaskClick}
        />

        <GKQuizCard onStartQuiz={onStartQuiz} />

        <LearnNamazCard
          steps={namazSteps}
          toggleStep={toggleNamazStep}
          onContinueLearning={onContinueNamaz}
        />

        <MealPlanCard
          weeklyMeals={weeklyMeals}
          onViewRecipe={onViewRecipe}
          onViewAllMeals={onViewAllMeals}
        />

        <GroceryListCard
          groceries={groceries}
          toggleGrocery={toggleGrocery}
          onAddGroceryClick={onAddGroceryClick}
        />

        <FamilyCalendarCard
          events={calendarEvents}
          onViewAllCalendar={onViewAllCalendar}
        />
      </div>

      {/* Bottom Row: Your Progress (4 circular rings) & Rewards & Streaks */}
      <div className="progress-rewards-grid">
        <ProgressRingCard
          taskProgress={{ completed: completedTasks, total: tasks.length, percent: taskPercent }}
          quizScore={80}
          namazProgress={{ completed: completedNamaz, total: namazSteps.length, percent: namazPercent }}
          quranProgress={16}
        />

        <RewardsCard streakDays={7} onViewRewards={onViewRewards} />
      </div>
    </div>
  );
}
