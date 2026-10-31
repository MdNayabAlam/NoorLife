# 🌿 NoorLife — Full-Stack Personal & Family Dashboard

> **Ghar • Deen • Ilm • Behtar Zindagi**  
> An all-in-one personal and family dashboard combining home management, learning, Islamic lifestyle tools, and progress tracking. Inspired by the NoorLife reference design with an ultra-premium forest-green, cream, and gold aesthetic.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 6 | Pure responsive CSS design system, Lucide icons, Canvas Confetti |
| **Backend** | Node.js + Express.js REST API | Modular MVC architecture with versioned prefix `/api/v1` |
| **Database** | MongoDB Atlas + Mongoose | Automatic graceful fallback in-memory store for instant offline development |
| **Authentication** | JWT + bcrypt password hashing | Protected API endpoints, token verification, and Auth UI |
| **AI Integration**| Server-Side Proxy (`/api/v1/assistant/chat`) | Clearly labeled Demo Mode with optional provider API key |

---

## 📁 Repository Structure

```text
noorlife/
├── backend/
│   ├── config/              # MongoDB connection & fallback status
│   ├── controllers/         # Auth, Tasks, Groceries, Meals, Quiz, Learning, Calendar, Budget, Quran, Rewards, Prayer, Assistant
│   ├── middleware/          # JWT protect middleware & demo user fallback
│   ├── models/              # User, Task, GroceryItem, MealPlan, Quiz, LearningProgress, CalendarEvent, BudgetEntry, QuranProgress, Reward, Dua
│   ├── routes/              # Versioned API routes mounted on /api/v1
│   ├── scripts/             # Database seed script (seed.js)
│   ├── server.js            # Express entry point
│   ├── package.json
│   ├── .env
│   └── .env.example
├── noorlife-starter/        # Frontend Client
│   ├── public/              # Optimized images (mosque, brain, meal thali, quran)
│   ├── src/
│   │   ├── components/      # Header, Sidebar, Widgets, MobileBottomNav
│   │   ├── components/Modals/# AuthModal, AddTaskModal, EditTaskModal, AddMealModal, AddGroceryModal, RecipeModal, QuizModal, QuranGoalModal, AIChatModal
│   │   ├── data/            # Domain initial data, surahs, AI assistant knowledge base
│   │   ├── pages/           # Dashboard, Tasks, Grocery & Meals, GK Quiz, Namaz Guide, Prayer Times, Daily Deen, Calendar, Budget, Quran, Rewards, AI, Settings
│   │   ├── services/        # api.js client service with automatic authentication
│   │   ├── main.jsx         # Root app orchestrator & state manager
│   │   └── styles.css       # Complete responsive CSS design tokens
│   ├── package.json
│   ├── .env.example
│   └── index.html
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18+ or v20+ (tested on Node v25)
- **npm**: v9+

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# (Optional) Seed verified quiz questions and authentic Duas
npm run seed

# Start development server
npm run dev
# Or standard start
npm start
```
*Backend runs at `http://localhost:5000` with API health endpoint at `http://localhost:5000/api/v1/health`.*

### 3. Frontend Setup
```bash
# In a new terminal, navigate to the frontend directory
cd noorlife-starter

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Open your browser at `http://localhost:5173/`.*

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
AI_API_KEY=optional_secret
```

### Frontend (`noorlife-starter/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 📡 REST API Reference (`/api/v1`)

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Register new user account |
| | `POST` | `/auth/login` | Login and obtain JWT token |
| | `POST` | `/auth/logout` | Logout active session |
| | `GET` | `/auth/me` | Get authenticated user profile |
| | `PATCH` | `/auth/me` | Update name, email, location & preferences |
| | `POST` | `/auth/change-password` | Secure password update |
| | `POST` | `/auth/delete-account` | Permanent account deletion |
| **Tasks** | `GET` | `/tasks` | List user's tasks |
| | `POST` | `/tasks` | Create task with priority & category |
| | `PATCH` | `/tasks/:id` | Toggle done or edit task fields |
| | `DELETE`| `/tasks/:id` | Delete task |
| **Groceries** | `GET` | `/groceries` | List shopping checklist items |
| | `POST` | `/groceries` | Add grocery item |
| | `PATCH` | `/groceries/:id` | Update purchased status / price |
| | `DELETE`| `/groceries/:id` | Remove grocery item |
| **Meals** | `GET` | `/meals` | Get weekly halal meal plan |
| | `POST` | `/meals` | Add custom dish with ingredients & recipe |
| | `PATCH` | `/meals/:id` | Update meal details |
| | `DELETE`| `/meals/:id` | Delete meal |
| **GK Quiz** | `GET` | `/quiz/questions` | Get questions for selected difficulty |
| | `POST` | `/quiz/attempts` | **Server-side calculated scoring** & answer review |
| | `GET` | `/quiz/attempts` | Fetch user's historical quiz attempts |
| **Learning** | `GET` | `/learning/modules` | Summary of Salah and Wudu learning tracks |
| | `GET` | `/learning/progress` | Get checklist & resume position |
| | `PATCH` | `/learning/progress` | Save completed step IDs and progress |
| **Calendar** | `GET` | `/events` | List family events & observances |
| | `POST` | `/events` | Schedule family event |
| | `DELETE`| `/events/:id` | Delete event |
| **Budget** | `GET` | `/budget/summary` | Monthly income, expense, balance & savings rate |
| | `POST` | `/budget/entries` | Add validated transaction entry |
| | `DELETE`| `/budget/entries/:id` | Delete transaction record |
| **Quran** | `GET` | `/quran/progress` | Get current Surah, page, and reading history |
| | `PATCH` | `/quran/progress` | Update reading log, pages read, and reflection notes |
| **Rewards** | `GET` | `/rewards` | Fetch streak days, points, and unlocked badges |
| | `POST` | `/rewards/activity` | Claim milestone bonus (prevents duplicates) |
| **Prayer** | `GET` | `/prayer-times` | Astronomical prayer timings and live countdown |
| **AI Assistant** | `POST` | `/assistant/chat` | Server proxy with domain knowledge & demo labeling |

---

## 📱 Responsive Experience & Visual Excellence

- **Desktop**: 3-column architecture (Left Navigation + Center Dashboard Cards + Right Prayer/Dua/Quran/AI Panel).
- **Tablet**: Fluid collapsible navigation with stacked dual-column layout.
- **Mobile**: Responsive top header, slide-out drawer, dedicated bottom thumb navigation bar (Dashboard, Tasks, Namaz, Quran, AI Helper), and zero horizontal scroll.
- **Dark Mode**: Eye-soothing emerald dark mode with persistent user preference.
- **Islamic Authenticity**: Real Arabic calligraphy rendered with Google's *Amiri* font, verified Hadith/Quranic citations, and live ticking prayer countdown.

---

## 🛡️ Definition of Done & QA Verification

- [x] All 13 sidebar modules open their dedicated pages with active indicators.
- [x] Responsive layout tested for Desktop (1536px), Tablet (768px), and Mobile (375px/412px).
- [x] Complete CRUD operations functional for Tasks, Groceries, Meals, Events, and Budget.
- [x] Server-side safe scoring calculation for the GK Quiz preventing client tampering.
- [x] Duplicate milestone bonus claims prevented on backend.
- [x] AI Assistant clearly labeled as "Demo Mode (Server Integration Active)".
- [x] Production build passes cleanly with `npm run build`.
