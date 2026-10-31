// NoorLife API Client Service
import { fetchGlobalPrayerTimes } from "../utils/prayerCalculator";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Auth token helper
export function getAuthToken() {
  return localStorage.getItem("noorlife_auth_token") || "";
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("noorlife_auth_token", token);
  } else {
    localStorage.removeItem("noorlife_auth_token");
  }
}

// Generic request helper with automatic token and fallback
async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[NoorLife API fallback] ${endpoint}:`, err.message);
    throw err;
  }
}

// Auth API
export async function loginAPI(credentials) {
  const res = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (res.token) setAuthToken(res.token);
  return res;
}

export async function registerAPI(userData) {
  const res = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  if (res.token) setAuthToken(res.token);
  return res;
}

export async function logoutAPI() {
  setAuthToken(null);
  try {
    return await request("/auth/logout", { method: "POST" });
  } catch (e) {
    return { success: true };
  }
}

export async function fetchCurrentUserAPI() {
  const res = await request("/auth/me");
  return res.user;
}

export async function updateProfileAPI(profileData) {
  const res = await request("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });
  return res.user;
}

export async function changePasswordAPI(passwordData) {
  return await request("/auth/change-password", {
    method: "POST",
    body: JSON.stringify(passwordData),
  });
}

export async function deleteAccountAPI(confirmation) {
  return await request("/auth/delete-account", {
    method: "POST",
    body: JSON.stringify({ confirmation }),
  });
}

// Tasks API
export async function fetchTasksAPI() {
  const res = await request("/tasks");
  return res.data;
}

export async function createTaskAPI(task) {
  const res = await request("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
  return res.data;
}

export async function updateTaskAPI(id, updates) {
  const res = await request(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return res.data;
}

export async function deleteTaskAPI(id) {
  return await request(`/tasks/${id}`, {
    method: "DELETE",
  });
}

// Groceries API
export async function fetchGroceriesAPI() {
  const res = await request("/groceries");
  return res.data;
}

export async function createGroceryAPI(item) {
  const res = await request("/groceries", {
    method: "POST",
    body: JSON.stringify(item),
  });
  return res.data;
}

export async function updateGroceryAPI(id, updates) {
  const res = await request(`/groceries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return res.data;
}

export async function deleteGroceryAPI(id) {
  return await request(`/groceries/${id}`, {
    method: "DELETE",
  });
}

// Meals API (Weekly Meal Planner)
export async function fetchMealsAPI() {
  const res = await request("/meals");
  return res.data;
}

export async function createMealAPI(meal) {
  const res = await request("/meals", {
    method: "POST",
    body: JSON.stringify(meal),
  });
  return res.data;
}

export async function updateMealAPI(id, updates) {
  const res = await request(`/meals/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  return res.data;
}

export async function deleteMealAPI(id) {
  return await request(`/meals/${id}`, {
    method: "DELETE",
  });
}

// Calendar Events API
export async function fetchEventsAPI() {
  const res = await request("/events");
  return res.data;
}

export async function createEventAPI(event) {
  const res = await request("/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
  return res.data;
}

export async function deleteEventAPI(id) {
  return await request(`/events/${id}`, {
    method: "DELETE",
  });
}

// Budget API
export async function fetchBudgetSummaryAPI() {
  const res = await request("/budget/summary");
  return res.data;
}

export async function createBudgetEntryAPI(entry) {
  const res = await request("/budget/entries", {
    method: "POST",
    body: JSON.stringify(entry),
  });
  return res.data;
}

export async function deleteBudgetEntryAPI(id) {
  return await request(`/budget/entries/${id}`, {
    method: "DELETE",
  });
}

// Quiz API (Server-side score calculation)
export async function fetchQuizQuestionsAPI(difficulty = "easy") {
  const res = await request(`/quiz/questions?difficulty=${difficulty}`);
  return res.data;
}

export async function submitQuizAttemptAPI(submission) {
  const res = await request("/quiz/attempts", {
    method: "POST",
    body: JSON.stringify(submission),
  });
  return res.data;
}

export async function fetchQuizAttemptsAPI() {
  const res = await request("/quiz/attempts");
  return res.data;
}

// Learning Progress API (Namaz & Wudu)
export async function fetchLearningProgressAPI(module = "salah") {
  const res = await request(`/learning/progress?module=${module}`);
  return res.data;
}

export async function updateLearningProgressAPI(progressData) {
  const res = await request("/learning/progress", {
    method: "PATCH",
    body: JSON.stringify(progressData),
  });
  return res.data;
}

// Quran Progress API
export async function fetchQuranProgressAPI() {
  const res = await request("/quran/progress");
  return res.data;
}

export async function updateQuranProgressAPI(data) {
  const res = await request("/quran/progress", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return res.data;
}

// Rewards API
export async function fetchRewardsAPI() {
  const res = await request("/rewards");
  return res.data;
}

export async function claimRewardMilestoneAPI(milestoneId) {
  return await request("/rewards/activity", {
    method: "POST",
    body: JSON.stringify({ action: "claim_milestone", milestoneId }),
  });
}

// Prayer Times API
export async function fetchPrayerTimesAPI(city, method = "1", coords = null) {
  const params = new URLSearchParams();
  if (city) params.append("city", city);
  if (method) params.append("method", method);
  if (coords && coords.lat && coords.lng) {
    params.append("lat", coords.lat);
    params.append("lng", coords.lng);
  }
  const qs = params.toString() ? `?${params.toString()}` : "";

  try {
    const res = await request(`/prayer-times${qs}`);
    if (res && res.data) return res.data;
  } catch (err) {
    // If backend is unreachable or offline, perform universal client-side resolution
    console.info("Using NoorLife universal client-side prayer calculator:", err.message);
  }

  return await fetchGlobalPrayerTimes(city, method, coords);
}

export async function fetchIslamicFestivalsAPI(year) {
  const query = year ? `?year=${year}` : "";
  const res = await request(`/prayer-times/festivals${query}`);
  return res.festivals || [];
}

export async function fetchMonthlyCalendarAPI(city, month, year) {
  const params = new URLSearchParams();
  if (city) params.append("city", city);
  if (month) params.append("month", month);
  if (year) params.append("year", year);
  const res = await request(`/prayer-times/calendar?${params.toString()}`);
  return res;
}

// Assistant API
export async function askServerAssistantAPI(prompt) {
  const res = await request("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return res.data;
}

// Global Online Naat Search API
export async function searchNaatsOnlineAPI(query) {
  try {
    const res = await request(`/naats/search?q=${encodeURIComponent(query)}`);
    return res.data || [];
  } catch (err) {
    console.warn("Online Naat search failed:", err);
    return [];
  }
}
