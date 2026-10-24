export const initialTasks = [
  { id: 1, title: "Kitchen cleaning", time: "08:00 AM", category: "Kitchen", priority: "Medium", done: true },
  { id: 2, title: "Prepare lunch", time: "11:00 AM", category: "Kitchen", priority: "High", done: true },
  { id: 3, title: "Laundry", time: "02:00 PM", category: "Chores", priority: "Low", done: true },
  { id: 4, title: "Room cleaning", time: "04:00 PM", category: "Home", priority: "Medium", done: true },
  { id: 5, title: "Help kids with study", time: "06:00 PM", category: "Family", priority: "High", done: false },
  { id: 6, title: "Plan tomorrow's meals", time: "08:00 PM", category: "Kitchen", priority: "Low", done: false },
];

export const initialGroceries = [
  { id: 1, name: "Milk", quantity: "2 Litres", category: "Dairy", done: true, estimatedPrice: 120 },
  { id: 2, name: "Eggs", quantity: "1 Dozen", category: "Dairy", done: true, estimatedPrice: 84 },
  { id: 3, name: "Onions", quantity: "2 kg", category: "Vegetables", done: false, estimatedPrice: 70 },
  { id: 4, name: "Tomatoes", quantity: "1.5 kg", category: "Vegetables", done: false, estimatedPrice: 60 },
  { id: 5, name: "Rice", quantity: "5 kg", category: "Pantry", done: false, estimatedPrice: 320 },
  { id: 6, name: "Cooking Oil", quantity: "2 Litres", category: "Pantry", done: false, estimatedPrice: 280 },
  { id: 7, name: "Chicken", quantity: "1 kg", category: "Meat", done: false, estimatedPrice: 240 },
  { id: 8, name: "Spices", quantity: "Assorted pack", category: "Spices", done: false, estimatedPrice: 150 },
];

export const quizQuestionsData = {
  easy: [
    {
      id: 1,
      category: "Islamic GK",
      question: "Which Surah of the Quran is known as the 'Mother of the Book' (Umm al-Kitab)?",
      options: ["Surah Al-Ikhlas", "Surah Al-Fatiha", "Surah Al-Baqarah", "Surah Ya-Sin"],
      correct: 1,
      explanation: "Surah Al-Fatiha is referred to as Umm al-Kitab because it opens the Quran and encapsulates its primary themes."
    },
    {
      id: 2,
      category: "General Science",
      question: "Which gas do plants primarily absorb from the atmosphere for photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
      explanation: "Plants absorb Carbon Dioxide (CO2) and release Oxygen during photosynthesis."
    },
    {
      id: 3,
      category: "Islamic GK",
      question: "How many daily obligatory (Fard) prayers are there for Muslims?",
      options: ["3", "4", "5", "7"],
      correct: 2,
      explanation: "There are 5 daily obligatory prayers: Fajr, Zuhr, Asr, Maghrib, and Isha."
    },
    {
      id: 4,
      category: "Geography",
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Ganges"],
      correct: 1,
      explanation: "The Nile River in Africa is traditionally recognized as the longest river in the world, spanning approx. 6,650 km."
    },
    {
      id: 5,
      category: "Islamic History",
      question: "In which city was Prophet Muhammad (PBUH) born?",
      options: ["Medina", "Makkah", "Jerusalem", "Taif"],
      correct: 1,
      explanation: "Prophet Muhammad (PBUH) was born in Makkah in the Year of the Elephant (570 CE)."
    }
  ],
  medium: [
    {
      id: 6,
      category: "Islamic Knowledge",
      question: "What is the name of the angel appointed to blow the Trumpet (Soor) on the Day of Judgment?",
      options: ["Jibreel (AS)", "Mika'eel (AS)", "Israfil (AS)", "Malik (AS)"],
      correct: 2,
      explanation: "Angel Israfil (AS) is assigned by Allah to blow the Soor signaling the Day of Resurrection."
    },
    {
      id: 7,
      category: "General GK",
      question: "Which Indian state has the longest coastline?",
      options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
      correct: 2,
      explanation: "Gujarat has the longest mainland coastline in India, extending over 1,600 kilometers."
    },
    {
      id: 8,
      category: "Quranic Knowledge",
      question: "Which Surah does not start with Bismillahir Rahmanir Raheem?",
      options: ["Surah At-Tawbah", "Surah An-Naml", "Surah Al-Kahf", "Surah Maryam"],
      correct: 0,
      explanation: "Surah At-Tawbah (Surah 9) is the only Surah in the Quran that does not begin with the Basmalah."
    },
    {
      id: 9,
      category: "Science",
      question: "What is the powerhouse of the human cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
      correct: 2,
      explanation: "Mitochondria generate most of the cell's chemical energy supply (ATP)."
    },
    {
      id: 10,
      category: "Islamic Calendar",
      question: "Which is the first month of the Islamic Hijri calendar?",
      options: ["Ramadan", "Muharram", "Shawwal", "Rabi' al-Awwal"],
      correct: 1,
      explanation: "Muharram is the first month of the Islamic lunar calendar and one of the four sacred months."
    }
  ],
  hard: [
    {
      id: 11,
      category: "Quranic Sciences",
      question: "In which Surah does the word 'Bismillahir Rahmanir Raheem' appear inside an Ayah (in addition to the start)?",
      options: ["Surah An-Naml (Ayah 30)", "Surah Al-Baqarah (Ayah 255)", "Surah Ya-Sin (Ayah 58)", "Surah Ar-Rahman (Ayah 1)"],
      correct: 0,
      explanation: "In Surah An-Naml (27:30), Prophet Sulaiman's letter to Queen Bilqis is quoted: 'Innahu min Sulaimana wa innahu Bismillahir Rahmanir Raheem'."
    },
    {
      id: 12,
      category: "Islamic Jurisprudence",
      question: "What is the minimum threshold of wealth upon which Zakat becomes obligatory called?",
      options: ["Sadaqah", "Nisab", "Khums", "Fidyah"],
      correct: 1,
      explanation: "Nisab is the minimum amount of wealth a Muslim must possess for one lunar year before becoming eligible to pay Zakat."
    },
    {
      id: 13,
      category: "World History",
      question: "In which year was the Treaty of Hudaybiyyah signed?",
      options: ["2 AH", "4 AH", "6 AH", "8 AH"],
      correct: 2,
      explanation: "The Treaty of Hudaybiyyah was signed in the 6th year of Hijrah between the Muslims of Medina and the Quraysh of Makkah."
    }
  ]
};

export const namazStepsData = [
  { id: 1, title: "Wuzu ka tarika", desc: "Ablution step-by-step: Washing hands, mouth, nose, face, arms, wiping head & washing feet", done: true },
  { id: 2, title: "Namaz ki niyyat", desc: "Make sincere intention in heart for the specific prayer (Fajr, Zuhr, etc.) facing Qibla", done: true },
  { id: 3, title: "Takbeer-e-Tahreema", desc: "Raise hands up to earlobes saying 'Allahu Akbar' and fold hands below navel or on chest", done: false },
  { id: 4, title: "Qiyam (Standing)", desc: "Recite Thana, Surah Al-Fatiha, followed by another Surah with calm focus", done: false },
  { id: 5, title: "Ruku (Bowing)", desc: "Bow with hands on knees, back straight, repeating 'Subhana Rabbiyal Azeem' 3 times", done: false },
  { id: 6, title: "Qaumah (Standing up)", desc: "Rise saying 'Sami Allahu Liman Hamidah', followed by 'Rabbana lakal hamd'", done: false },
  { id: 7, title: "Sujud (Prostration)", desc: "Prostrate with 7 limbs touching ground, saying 'Subhana Rabbiyal A'la' 3 times", done: false },
  { id: 8, title: "Tashahhud & Salam", desc: "Sit for At-Tahiyyat, Durood Ibrahim, Dua, then turn head right and left with Salam", done: false }
];

export const weeklyMealsData = {
  Mon: {
    day: "Monday",
    mealType: "Lunch",
    title: "Rajma Masala with Jeera Rice",
    subtitle: "Rajma, Basmati Rice, Mint Raita, Salad",
    prepTime: "40 mins",
    calories: "520 kcal",
    recipe: {
      ingredients: ["1.5 cups Red Kidney Beans (soaked)", "2 medium onions (pureed)", "2 ripe tomatoes (pureed)", "1 tbsp Ginger-garlic paste", "1 tsp Cumin seeds", "1 tsp Garam Masala", "Coriander leaves"],
      steps: ["Pressure cook soaked rajma with salt and turmeric for 5-6 whistles until soft.", "In a pan, heat ghee/oil, splutter cumin seeds, add onion puree and sauté until golden brown.", "Add ginger-garlic paste, tomato puree, spices and cook until oil separates.", "Add boiled rajma with water, simmer on low heat for 15-20 mins. Garnish with fresh coriander."]
    }
  },
  Tue: {
    day: "Tuesday",
    mealType: "Lunch",
    title: "Aloo Gobi with Warm Phulkas",
    subtitle: "Aloo Gobi dry, 3 Phulkas, Curd, Pickle",
    prepTime: "30 mins",
    calories: "460 kcal",
    recipe: {
      ingredients: ["1 Cauliflower cut into florets", "2 Potatoes cubed", "1 onion sliced", "Turmeric, red chili powder, coriander powder", "Mustard seeds & cumin", "Fresh green chilies"],
      steps: ["Heat mustard oil in kadai, temper with cumin seeds.", "Add potatoes and cauliflower florets with dry spices and sauté on medium flame.", "Cover and cook on low heat for 15 mins until tender. Serve hot with whole wheat phulkas."]
    }
  },
  Wed: {
    day: "Wednesday",
    mealType: "Lunch",
    title: "Palak Paneer with Butter Naan",
    subtitle: "Fresh Palak Paneer, 2 Tandoori Roti / Naan, Kachumber",
    prepTime: "35 mins",
    calories: "580 kcal",
    recipe: {
      ingredients: ["250g Paneer cubes", "500g Fresh spinach blanched", "2 green chilies", "1 tbsp Kasuri methi", "Fresh cream 2 tbsp", "Cumin & garam masala"],
      steps: ["Blanch spinach and blend into smooth puree with green chilies.", "Sauté aromatics in butter/ghee, pour pureed spinach, cook for 8 mins.", "Toss fresh paneer cubes and finish with a swirl of fresh cream and crushed kasuri methi."]
    }
  },
  Thu: {
    day: "Thursday",
    mealType: "Lunch",
    title: "Dal, Rice, Salad, Roti",
    subtitle: "Yellow Dal Tadka, Steamed Basmati Rice, Cucumber Salad, 2 Roti",
    prepTime: "35 mins",
    calories: "490 kcal",
    recipe: {
      ingredients: ["1 cup Toor / Arhar Dal (washed)", "1 medium tomato chopped", "2 green chilies slit", "Tadka: 2 tbsp Desi Ghee, 1 tsp Cumin, 4 garlic cloves minced, 2 dry red chilies, pinch of Hing", "Finely sliced cucumber and red onion for salad", "Freshly puffed whole wheat rotis"],
      steps: ["Boil toor dal in pressure cooker with turmeric, salt and water for 3 whistles.", "Prepare the fragrant tadka in hot desi ghee with cumin, minced garlic, hing and dried red chilies.", "Pour sizzing tadka over the dal and cover immediately to trap aromas.", "Serve steaming hot with fragrant basmati rice, warm ghee rotis and crisp kachumber salad."]
    }
  },
  Fri: {
    day: "Friday",
    mealType: "Lunch",
    title: "Jumu'ah Special Chicken Biryani",
    subtitle: "Fragrant Dum Biryani, Mirchi ka Salan, Burani Raita",
    prepTime: "60 mins",
    calories: "720 kcal",
    recipe: {
      ingredients: ["500g Halal Chicken", "2 cups aged Basmati rice (soaked 30 mins)", "1 cup fried onions (birista)", "1/2 cup yogurt", "Biryani masala & whole garam masalas", "Saffron soaked in warm milk, mint & coriander"],
      steps: ["Marinate chicken with yogurt, ginger-garlic paste, red chili, biryani spices and half the fried onions for 1 hour.", "Boil rice with whole spices until 70% cooked.", "Layer chicken and rice alternately in heavy-bottom pot, top with saffron milk, mint and ghee.", "Seal with dough or foil, cook on high 5 mins, then dum on low heat for 25 mins."]
    }
  },
  Sat: {
    day: "Saturday",
    mealType: "Lunch",
    title: "Chole Bhature with Pickled Onions",
    subtitle: "Amritsari Chole, 2 Puffed Bhature, Green Chutney",
    prepTime: "45 mins",
    calories: "680 kcal",
    recipe: {
      ingredients: ["2 cups Kabuli Chana (boiled with tea bag)", "Anardana powder, chole masala, amchur", "Maida & semolina dough fermented with curd", "Ginger juliennes and fried green chilies"],
      steps: ["Cook chana with aromatic black spices and tea bag infusion for authentic dark color.", "Fry fluffy golden bhaturas in hot oil and serve immediately with spicy chole."]
    }
  },
  Sun: {
    day: "Sunday",
    mealType: "Lunch",
    title: "Vegetable Pulao with Kadhi Pakora",
    subtitle: "Mixed Veg Pulao, Punjabi Besan Kadhi with Soft Pakoras",
    prepTime: "40 mins",
    calories: "510 kcal",
    recipe: {
      ingredients: ["Sour curd and besan whisked smooth", "Spiced onion pakoras deep fried", "Methi seeds, mustard seeds, curry leaves tadka", "Rice with carrots, peas, and green beans"],
      steps: ["Simmer kadhi gently for 30 minutes until thick and velvety.", "Drop crispy warm onion pakoras into kadhi, temper with curry leaves and Kashmiri chili.", "Pair with hot aromatic vegetable pulao."]
    }
  }
};

export const familyEventsData = [
  { id: 1, date: "15 May", fullDate: "2025-05-15", title: "Parent-Teacher Meeting", time: "10:00 AM - 11:00 AM", color: "#1b4332", category: "School" },
  { id: 2, date: "16 May", fullDate: "2025-05-16", title: "Electricity Bill Due", time: "All Day", color: "#e76f51", category: "Bills" },
  { id: 3, date: "18 May", fullDate: "2025-05-18", title: "Sister's Birthday", time: "All Day", color: "#d4a373", category: "Family" },
  { id: 4, date: "22 May", fullDate: "2025-05-22", title: "Monthly Wholesale Grocery", time: "05:00 PM - 07:00 PM", color: "#2a9d8f", category: "Shopping" },
  { id: 5, date: "25 May", fullDate: "2025-05-25", title: "Family Quran Halaqah", time: "07:30 PM", color: "#1b4332", category: "Deen" },
];

export const dailyDuasData = [
  {
    id: 1,
    title: "Dua for Knowledge (Ilm)",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge.",
    source: "Surah Ta-Ha (20:114)",
    context: "Recite frequently before studying, teaching, or seeking wisdom."
  },
  {
    id: 2,
    title: "Dua for Good in Both Worlds",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
    translation: "Our Lord! Grant us that which is good in this life and that which is good in the Hereafter, and protect us from the torment of the Fire.",
    source: "Surah Al-Baqarah (2:201)",
    context: "One of the most comprehensive and frequently recited prayers of Prophet Muhammad (PBUH)."
  },
  {
    id: 3,
    title: "Dua for Relief & Ease in Hardship",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin",
    translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    source: "Surah Al-Anbiya (21:87) - Dua of Prophet Yunus (AS)",
    context: "The Prophet (PBUH) said no Muslim supplicates with this during distress except that Allah responds to him."
  },
  {
    id: 4,
    title: "Dua for Guidance & Sufficiency",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'aluka al-huda wat-tuqa wal-'afafa wal-ghina",
    translation: "O Allah, I ask You for guidance, piety, chastity, and contentment/self-sufficiency.",
    source: "Sahih Muslim (2721)",
    context: "Covers spiritual righteousness, moral dignity, and financial independence."
  },
  {
    id: 5,
    title: "Dua for Protection from Harm",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim",
    translation: "In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
    source: "Sunan Abi Dawud (5088), Sunan At-Tirmidhi (3388)",
    context: "Sunnah morning and evening remembrance (3 times daily)."
  }
];

export const prayerTimesTable = {
  city: "New Delhi, India",
  country: "India",
  method: "Islamic University of Sciences, Karachi (Hanafi)",
  times: [
    { name: "Fajr", time: "04:23 AM", rawMinutes: 263, passed: true },
    { name: "Zuhr", time: "12:12 PM", rawMinutes: 732, active: true, badge: "2h 15m" },
    { name: "Asr", time: "03:38 PM", rawMinutes: 938, passed: false },
    { name: "Maghrib", time: "06:52 PM", rawMinutes: 1132, passed: false },
    { name: "Isha", time: "08:19 PM", rawMinutes: 1219, passed: false },
  ],
  nextPrayer: {
    name: "Zuhr",
    hours: 2,
    minutes: 15,
    seconds: 30
  }
};

export const budgetInitialData = {
  monthlyIncome: 65000,
  entries: [
    { id: 1, type: "income", category: "Salary", amount: 55000, date: "2025-05-01", note: "Monthly Primary Salary" },
    { id: 2, type: "income", category: "Freelance", amount: 10000, date: "2025-05-05", note: "Tutoring & Consultation" },
    { id: 3, type: "expense", category: "Rent & Housing", amount: 16000, date: "2025-05-02", note: "Apartment Rent & Maintenance" },
    { id: 4, type: "expense", category: "Groceries", amount: 9500, date: "2025-05-08", note: "Monthly Ration & Fresh Produce" },
    { id: 5, type: "expense", category: "Utilities & Bills", amount: 3400, date: "2025-05-10", note: "Electricity & High-speed Fiber" },
    { id: 6, type: "expense", category: "Kids Education", amount: 5000, date: "2025-05-11", note: "School Books & Fees" },
    { id: 7, type: "expense", category: "Charity & Sadaqah", amount: 2500, date: "2025-05-12", note: "Local Community Support" }
  ]
};

export const aiSuggestions = [
  "Aaj ke ghar ke kaam ka plan banao",
  "₹500 mein grocery list banao",
  "Mujhe 10 GK questions do",
  "Halal nutritious lunch recipe batao",
  "Namaz mein khushu kaise layein?",
  "Surah Al-Mulk padhne ki fazilat"
];
