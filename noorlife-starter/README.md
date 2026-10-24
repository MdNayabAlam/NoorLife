# NoorLife — Ghar • Deen • Ilm • Behtar Zindagi
> All-in-one personal and family dashboard combining home management, learning, Islamic lifestyle tools, and progress tracking.

Built faithfully to match the reference design with a rich forest-green, cream, and gold palette, responsive 3-column desktop layout, collapsible tablet/mobile navigation, and rich interactive features.

---

## 🌟 Key Features

### 1. **Header & Global Navigation**
- **Brand Identity**: NoorLife wordmark with mosque dome icon and subtitle *"Ghar • Deen • Ilm • Behtar Zindagi"*.
- **Global Search**: Instant search dropdown filtering across tasks, duas, surahs, and recipes.
- **Theme Switcher**: Smooth toggle between Light and Dark mode with persistent `localStorage` preference.
- **Notification Center**: Dropdown with badge counter (3) for upcoming prayer alerts, streaks, and calendar events.
- **Profile Chip**: User pill greeting (*"Assalamu Alaikum, Ayesha"*) with avatar and profile menu.

### 2. **Left Navigation Sidebar**
- Active state highlighted in deep forest green (`#174232`) with crisp iconography.
- Navigation links for all modules:
  - 🏠 **Dashboard** (Master overview matching the reference image)
  - ✅ **Home Tasks** (Task management with filters, categories, and times)
  - 🛒 **Grocery & Meals** (Shopping checklist & weekly halal meal planner)
  - 🧠 **GK Quiz** (10-question mixed categories with difficulty toggles)
  - 📖 **Namaz Guide** (Step-by-step wudu and salah guides with Arabic and illustrations)
  - ⏰ **Prayer Times** (5 daily prayers with live ticking countdown clock)
  - 🤲 **Daily Deen** (Masnoon duas with Arabic calligraphy, audio, and Hadith sources)
  - 📅 **Family Calendar** (School events, bills, and Islamic observances)
  - 💰 **Budget Manager** (Income vs. expense tracker with monthly analytics)
  - 📖 **Quran Tracker** (Surah directory, page reader, and Khatam goal calculator)
  - 🔥 **Rewards & Streaks** (7-day streak tracker, badges, and points ledger)
  - ✨ **AI Assistant** (Interactive Islamic lifestyle & home helper)
  - ⚙️ **Settings** (User profile, prayer calculation method, theme, notifications)
- **Footer Card**: *"Knowledge + Action = A Better Tomorrow / NoorLife"* with elegant mosque silhouette graphic.

### 3. **Hero Banner**
- Forest green gradient background with Sheikh Zayed style grand mosque imagery blending smoothly with sunset light.
- Personalized greeting (*"Assalamu Alaikum, Ayesha! 🌸"*).
- Bold headline: *"Aaj ka din behtar banayein"*.
- Subtitle: *"Ghar ke kaam, ilm aur ibadat ko ek jagah manage karein."*
- Quranic quote pill: *“Indeed, with hardship comes ease.” — Surah Ash-Sharh (94:6)*.
- Date card: Gregorian (*Thursday, 15 May 2025*) & Islamic Hijri (*17 Dhul-Qadah 1446*).

### 4. **Quick Action Shortcuts**
- 6 colorful rounded cards with pastel badges:
  - **Home Tasks** (*Manage daily work*)
  - **Grocery & Meals** (*Plan & shop smart*)
  - **GK Quiz** (*Test your knowledge*)
  - **Namaz Guide** (*Learn step-by-step*)
  - **Prayer Times** (*Never miss a prayer*)
  - **Daily Deen** (*Duas & Articles*)

### 5. **Central Dashboard Cards**
- **Today's Tasks**: 6 scheduled tasks with time pills (`08:00 AM`, `11:00 AM`, etc.), checkboxes, progress bar, and "+ Add Task" modal.
- **Today's GK Quiz**: 3D purple brain mascot on books, Easy/Medium/Hard pills, and full interactive modal with questions, explanations, and celebratory confetti.
- **Learn Namaz**: 2/8 progress bar, worshipper illustration in prayer posture, checklist of steps, and "Continue Learning" button.
- **Meal Plan (This Week)**: Mon–Sun tabs (Thursday active), lunch thali photo (Yellow Dal Tadka, Steamed Rice, Cucumber Salad, Roti), and "View Recipe" modal.
- **Grocery List**: 2-column checklist (Milk, Eggs, Onions, Tomatoes, Rice, Cooking Oil, Chicken, Spices) with "+ Add Item" modal.
- **Family Calendar**: Upcoming events with colored category badges (15 May Parent-Teacher Meeting, 16 May Electricity Bill Due, 18 May Sister's Birthday).
- **Your Progress**: 4 circular animated SVG progress rings:
  - Home Tasks: 66% (4/6 completed)
  - GK Quiz: 80% (8/10 correct)
  - Namaz Learning: 25% (2/8 completed)
  - Quran Reading: 16% (45/286 pages)
- **Rewards & Streaks**: 7-day flame streak, Mon–Sun completion dots, and "+50 pts" bonus claim button with confetti animation.

### 6. **Right Panel Widgets**
- **Prayer Times Widget**:
  - Location pill: *New Delhi, India ⚙️*
  - Fajr (04:23 AM ✓), Zuhr (12:12 PM active with *2h 15m* countdown badge), Asr (03:38 PM), Maghrib (06:52 PM), Isha (08:19 PM).
  - Highlight box: Mosque icon with real live ticking countdown clock (*Zuhr 2h 15m 30s*).
- **Daily Dua Widget**:
  - Authentic Arabic text: *رَبِّ زِدْنِي عِلْمًا*
  - Transliteration: *Rabbi zidni 'ilma*
  - Translation: *My Lord, increase me in knowledge.*
  - Pagination `< 1/5 >`, copy to clipboard button with toast alert, and Arabic audio pronunciation player.
- **Quran Tracker Widget**:
  - 3D Quran book cover illustration.
  - *Surah Al-Baqarah*, Page 45/286 (16%), and "Set Goal" modal.
- **AI Assistant Widget**:
  - Suggested prompts:
    - *"Aaj ke ghar ke kaam ka plan banao"*
    - *"₹500 mein grocery list banao"*
    - *"Mujhe 10 GK questions do"*
  - Voice input simulation, chat bar, and instant conversational responses.

---

## 🚀 Running Locally

From the `noorlife-starter` folder:

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit: `http://localhost:5173/`

To create production build:
```bash
npm run build
```

---

## 🎨 Design System & Technologies

- **Framework**: React 18 + Vite 6
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & CSS keyframes
- **Fonts**: Google Fonts (*Plus Jakarta Sans*, *Outfit*, *Amiri* for authentic Arabic calligraphy)
- **Styling**: Pure CSS with CSS Custom Properties and dark mode support
