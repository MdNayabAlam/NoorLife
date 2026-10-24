// NoorLife API Client Service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Generic request helper with automatic fallback
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[NoorLife API fallback] ${endpoint}:`, err.message);
    throw err;
  }
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

// Prayer Times API
export async function fetchPrayerTimesAPI(city) {
  const query = city ? `?city=${encodeURIComponent(city)}` : "";
  const res = await request(`/prayer-times${query}`);
  return res.data;
}

// User Profile API
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

// Assistant API
export async function askServerAssistantAPI(prompt) {
  const res = await request("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  return res.data;
}
