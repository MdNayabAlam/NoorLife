import { MASNOON_DUAS } from "./masnoonDuasData";

export const initialTasks = [
  { id: 1, title: "Kitchen cleaning", time: "08:00 AM", category: "Kitchen", priority: "Medium", done: true },
  { id: 2, title: "Prepare lunch", time: "11:00 AM", category: "Kitchen", priority: "High", done: true },
  { id: 3, title: "Laundry", time: "02:00 PM", category: "Chores", priority: "Low", done: true },
  { id: 4, title: "Room cleaning", time: "04:00 PM", category: "Home", priority: "Medium", done: false },
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
    image: "/images/meal_mon.jpg",
    translations: {
      en: {
        title: "Rajma Masala with Jeera Rice",
        subtitle: "Rajma, Basmati Rice, Mint Raita, Salad",
        ingredients: [
          "1.5 cups Red Kidney Beans (soaked)",
          "2 medium onions (pureed)",
          "2 ripe tomatoes (pureed)",
          "1 tbsp Ginger-garlic paste",
          "1 tsp Cumin seeds",
          "1 tsp Garam Masala & Coriander powder",
          "Fresh coriander leaves for garnish"
        ],
        steps: [
          "Pressure cook soaked rajma with salt and turmeric for 5-6 whistles until tender.",
          "In a pan, heat ghee/oil, splutter cumin seeds, add onion puree and sauté until golden brown.",
          "Add ginger-garlic paste, tomato puree, spices and cook until oil separates.",
          "Add boiled rajma with water, simmer on low heat for 15-20 mins. Garnish with fresh coriander."
        ]
      },
      hi: {
        title: "राजमा मसाला और जीरा राइस",
        subtitle: "स्वादिष्ट राजमा, बासमती चावल, पुदीना रायता और सलाद",
        ingredients: [
          "1.5 कप लाल राजमा (रात भर भिगोया हुआ)",
          "2 मध्यम प्याज (बारीक पिसा हुआ पेस्ट)",
          "2 पके टमाटर (ताज़ा प्यूरी)",
          "1 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
          "1 छोटा चम्मच जीरा और 1 चुटकी हींग",
          "1 छोटा चम्मच गरम मसाला, हल्दी और धनिया पाउडर",
          "बारीक कटा ताजा हरा धनिया गार्निश के लिए"
        ],
        steps: [
          "भिगोए हुए राजमा को नमक और हल्दी के साथ कुकर में 5-6 सीटी आने तक अच्छी तरह उबालें।",
          "कड़ाही में 2 चम्मच देसी घी या तेल गरम करें, जीरा चटकाएं और प्याज का पेस्ट डालकर सुनहरा भूरा होने तक भूनें।",
          "अदरक-लहसुन का पेस्ट, टमाटर की प्यूरी और सभी मसाले डालकर तब तक पकाएं जब तक कि तेल अलग न होने लगे।",
          "उबला हुआ राजमा पानी सहित मिलाएं और धीमी आंच पर 15-20 मिनट पकने दें। ऊपर से ताजा हरा धनिया डालकर गरमा-गरम जीरा राइस के साथ परोसें।"
        ]
      },
      ur: {
        title: "راجما مصالحہ اور زیرہ چاول",
        subtitle: "لذیذ راجما، باسمتی چاول، پودینہ رائتہ اور تازہ سلاد",
        ingredients: [
          "1.5 کپ سرخ راجما (رات بھر بھیگا ہوا)",
          "2 عدد درمیانی پیاز (پسی ہوئی پیوری)",
          "2 عدد سرخ ٹماٹر (تازہ پیوری)",
          "1 چمچ ادرک لہسن پیسٹ",
          "1 چائے کا چمچ زیرہ اور چٹکی بھر ہینگ",
          "1 چائے کا چمچ گرم مصالحہ، ہلدی اور دھنیا پاؤڈر",
          "تازہ ہرا دھنیا گارنش کے لیے"
        ],
        steps: [
          "بھیگے ہوئے راجما کو نمک اور ہلدی کے ساتھ پریشر ککر میں 5 سے 6 سیٹیاں دے کر نرم گلا لیں۔",
          "پین میں 2 چمچ دیسی گھی گرم کریں، زیرہ کڑکڑائیں اور پیاز کا پیسٹ ڈال کر سنہری بھون لیں۔",
          "ادرک لہسن پیسٹ، ٹماٹر کی پیوری اور مصالحہ جات شامل کریں اور تیل الگ ہونے تک اچھی طرح بھونیں۔",
          "ابلا ہوا راجما پانی سمیت ڈال کر دھیمی آنچ پر 15-20 منٹ دم دیں۔ تازہ ہرے دھنیے سے سجا کر گرما گرم زیرہ چاول کے ساتھ پیش کریں۔"
        ]
      }
    },
    recipe: {
      ingredients: ["1.5 cups Red Kidney Beans (soaked)", "2 medium onions (pureed)", "2 ripe tomatoes (pureed)", "1 tbsp Ginger-garlic paste", "1 tsp Cumin seeds", "1 tsp Garam Masala", "Coriander leaves"],
      steps: ["Pressure cook soaked rajma with salt and turmeric for 5-6 whistles until soft.", "In a pan, heat ghee/oil, splutter cumin seeds, add onion puree and sauté until golden brown.", "Add ginger-garlic paste, tomato puree, spices and cook until oil separates.", "Add boiled rajma with water, simmer on low heat for 15-20 mins. Garnish with fresh coriander."]
    }
  },
  Tue: {
    day: "Tuesday",
    mealType: "Lunch",
    title: "Chicken Bhuna & Warm Phulkas",
    subtitle: "Tender Chicken Bhuna, 3 Phulkas, Curd, Pickle",
    prepTime: "35 mins",
    calories: "520 kcal",
    image: "/images/meal_tue.jpg",
    translations: {
      en: {
        title: "Chicken Bhuna & Warm Phulkas",
        subtitle: "Tender Chicken Bhuna, 3 Phulkas, Curd, Pickle",
        ingredients: [
          "500g Halal Chicken",
          "3 Onions thinly sliced",
          "2 ripe Tomatoes pureed",
          "1.5 tbsp Ginger-Garlic paste",
          "Garam Masala & Kasuri Methi",
          "Fresh whole wheat flour for Phulkas"
        ],
        steps: [
          "Heat mustard oil in kadai, brown sliced onions until deep golden.",
          "Add ginger-garlic paste, spices and tomato puree; sauté until oil releases.",
          "Add chicken pieces and roast on medium flame until thick, rich gravy coats the chicken.",
          "Serve steaming hot with soft, puffed whole wheat phulkas."
        ]
      },
      hi: {
        title: "चिकन भुना और गरम फुल्के",
        subtitle: "मसालेदार चिकन भुना, 3 नरम फुल्के, ताज़ा दही और अचार",
        ingredients: [
          "500 ग्राम हलाल चिकन",
          "3 प्याज (बारीक लच्छेदार कटे हुए)",
          "2 पके टमाटर की ताज़ा प्यूरी",
          "1.5 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
          "गरम मसाला, हल्दी, कश्मीरी लाल मिर्च और कसूरी मेथी",
          "फुल्के के लिए ताज़ा गेहूं का आटा"
        ],
        steps: [
          "कड़ाही में सरसों का तेल या घी गरम करें और कटे हुए प्याज को गहरा सुनहरा होने तक भूनें।",
          "अदरक-लहसुन पेस्ट, टमाटर प्यूरी और सभी सूखे मसाले डालकर तेल छूटने तक अच्छी तरह भूनें।",
          "चिकन के टुकड़े डालें और मध्यम आंच पर तब तक भूनें जब तक गाढ़ी भुनी हुई ग्रेवी चिकन पर अच्छे से लिपट न जाए।",
          "गैस बंद करके कसूरी मेथी छिड़कें और गरमा-गरम फूली हुई रोटियों (फुल्के) के साथ दस्तरख्वान पर पेश करें।"
        ]
      },
      ur: {
        title: "چکن بھنا اور گرم پھلکے",
        subtitle: "ذائقہ دار چکن بھنا، 3 نرم پھلکے، دہی اور چٹپٹا اچار",
        ingredients: [
          "500 گرام حلال چکن",
          "3 عدد باریک کٹی ہوئی پیاز",
          "2 عدد سرخ ٹماٹر کی پیوری",
          "1.5 کھانے کا چمچ ادرک لہسن پیسٹ",
          "گرم مصالحہ، کشمیری لال مرچ اور قصوری میتھی",
          "پھلکوں کے لیے گندم کا خالص آٹا"
        ],
        steps: [
          "کڑاہی میں سرسوں کا تیل یا گھی گرم کریں اور پیاز کو خوبصورت سنہری ہونے تک فرائی کریں۔",
          "ادرک لہسن کا پیسٹ، ٹماٹر کی پیوری اور تمام مصالحے ڈال کر تیل چھوٹنے تک خوب بھونیں۔",
          "چکن کے ٹکڑے شامل کریں اور درمیانی آنچ پر مسلسل بھونیں یہاں تک کہ چکن گل جائے اور مصالحہ چکن پر لپٹ جائے۔",
          "قصوری میتھی چھڑک کر نرم گرم روٹیوں اور دہی کے ساتھ لطف اٹھائیں۔"
        ]
      }
    },
    recipe: {
      ingredients: ["500g Halal Chicken", "3 Onions thinly sliced", "2 ripe Tomatoes pureed", "1.5 tbsp Ginger-Garlic paste", "Garam Masala & Kasuri Methi", "Fresh whole wheat flour for Phulkas"],
      steps: ["Heat mustard oil in kadai, brown sliced onions until deep golden.", "Add ginger-garlic paste, spices and tomato puree; sauté until oil releases.", "Add chicken pieces and roast on medium flame until thick, rich gravy coats the chicken.", "Serve steaming hot with soft, puffed whole wheat phulkas."]
    }
  },
  Wed: {
    day: "Wednesday",
    mealType: "Lunch",
    title: "Palak Paneer with Garlic Naan",
    subtitle: "Fresh Palak Paneer, 2 Garlic Naan / Roti, Jeera Rice",
    prepTime: "35 mins",
    calories: "580 kcal",
    image: "/images/meal_wed.jpg",
    translations: {
      en: {
        title: "Palak Paneer with Garlic Naan",
        subtitle: "Fresh Palak Paneer, 2 Garlic Naan / Roti, Jeera Rice",
        ingredients: [
          "250g Paneer cubes",
          "500g Fresh spinach blanched",
          "2 green chilies",
          "1 tbsp Kasuri methi",
          "Fresh cream 2 tbsp",
          "Cumin & garam masala"
        ],
        steps: [
          "Blanch spinach and blend into smooth puree with green chilies.",
          "Sauté aromatics in butter/ghee, pour pureed spinach, cook for 8 mins.",
          "Toss fresh paneer cubes and finish with a swirl of fresh cream and crushed kasuri methi."
        ]
      },
      hi: {
        title: "पालक पनीर और गार्लिक नान",
        subtitle: "ताज़ा पालक पनीर, 2 गार्लिक नान या रोटी, जीरा राइस",
        ingredients: [
          "250 ग्राम ताज़ा पनीर के टुकड़े",
          "500 ग्राम ताज़ा पालक (उबाला हुआ)",
          "2 हरी मिर्च और लहसुन की कलियां",
          "1 बड़ा चम्मच कसूरी मेथी",
          "2 बड़े चम्मच ताज़ा मलाई (क्रीम)",
          "जीरा, गरम मसाला और मक्खन/घी"
        ],
        steps: [
          "पालक को 2 मिनट उबलते पानी में डालकर ठंडे पानी में निकालें, फिर हरी मिर्च के साथ पीसकर मुलायम प्यूरी बना लें।",
          "कड़ाही में मक्खन या घी गरम करके जीरा और लहसुन भूनें, फिर पालक की प्यूरी डालकर 8 मिनट तक पकाएं।",
          "पनीर के टुकड़े मिलाएं और ऊपर से ताज़ा मलाई व भुनी हुई कसूरी मेथी डालकर गरमा-गरम नान या रोटी के साथ परोसें।"
        ]
      },
      ur: {
        title: "پالک پنیر اور گارلک نان",
        subtitle: "تازہ پالک پنیر، 2 عدد گارلک نان یا تندوری روٹی، زیرہ چاول",
        ingredients: [
          "250 گرام تازہ پنیر کیوبز",
          "500 گرام تازہ پالک (ابلی ہوئی)",
          "2 عدد ہری مرچیں اور لہسن",
          "1 چمچ قصوری میتھی",
          "2 چمچ تازہ بالائی (کریم)",
          "مکھن یا دیسی گھی اور گرم مصالحہ"
        ],
        steps: [
          "پالک کو ابلتے پانی میں 2 منٹ ڈال کر فورا ٹھنڈے پانی میں ڈالیں، پھر ہری مرچوں کے ساتھ باریک پیس لیں۔",
          "پین میں مکھن یا گھی گرم کر کے لہسن اور زیرہ کڑکڑائیں، پھر پسی ہوئی پالک ڈال کر 8 منٹ پکائیں۔",
          "پنیر کے ٹکڑے شامل کریں اور اوپر سے تازہ کریم اور قصوری میتھی چھڑک کر نان کے ساتھ پیش کریں۔"
        ]
      }
    },
    recipe: {
      ingredients: ["250g Paneer cubes", "500g Fresh spinach blanched", "2 green chilies", "1 tbsp Kasuri methi", "Fresh cream 2 tbsp", "Cumin & garam masala"],
      steps: ["Blanch spinach and blend into smooth puree with green chilies.", "Sauté aromatics in butter/ghee, pour pureed spinach, cook for 8 mins.", "Toss fresh paneer cubes and finish with a swirl of fresh cream and crushed kasuri methi."]
    }
  },
  Thu: {
    day: "Thursday",
    mealType: "Lunch",
    title: "Yellow Dal Tadka, Steamed Rice & Salad",
    subtitle: "Yellow Dal Tadka, Steamed Basmati Rice, Cucumber Salad, 2 Roti",
    prepTime: "25 mins",
    calories: "390 kcal",
    image: "/images/meal_thu.jpg",
    translations: {
      en: {
        title: "Yellow Dal Tadka, Steamed Rice & Salad",
        subtitle: "Yellow Dal Tadka, Steamed Basmati Rice, Cucumber Salad, 2 Roti",
        ingredients: [
          "1 cup Toor / Arhar Dal (washed)",
          "1 medium tomato chopped",
          "2 green chilies slit",
          "Tadka: 2 tbsp Desi Ghee, 1 tsp Cumin, 4 garlic cloves minced, 2 dry red chilies, pinch of Hing",
          "Finely sliced cucumber and red onion for salad",
          "Freshly puffed whole wheat rotis"
        ],
        steps: [
          "Boil toor dal in pressure cooker with turmeric, salt and water for 3 whistles.",
          "Prepare the fragrant tadka in hot desi ghee with cumin, minced garlic, hing and dried red chilies.",
          "Pour sizzing tadka over the dal and cover immediately to trap aromas.",
          "Serve steaming hot with fragrant basmati rice, warm ghee rotis and crisp kachumber salad."
        ]
      },
      hi: {
        title: "पीली दाल तड़का, बासमती चावल और सलाद",
        subtitle: "देसी घी तड़का दाल, खिले हुए चावल, खीरा-प्याज सलाद और 2 गरम रोटियां",
        ingredients: [
          "1 कप अरहर / तूर दाल (धुली हुई)",
          "1 बारीक कटा टमाटर और 2 हरी मिर्च",
          "तड़के के लिए: 2 बड़े चम्मच देसी घी, 1 चम्मच जीरा, 4 लहसुन की कलियां, 2 सूखी लाल मिर्च, चुटकी भर हींग",
          "सलाद के लिए कटा खीरा, प्याज, नींबू",
          "गरम-गरम गेहूं की रोटियां"
        ],
        steps: [
          "प्रेशर कुकर में अरहर दाल को पानी, हल्दी और नमक के साथ 3 सीटी आने तक अच्छी तरह पकाएं।",
          "तड़का पैन में देसी घी गरम करें, उसमें जीरा, कटा लहसुन, हींग और सूखी लाल मिर्च डालकर तड़कने दें।",
          "गरमा-गरम तड़के को दाल के ऊपर डालें और खुशबू बनाए रखने के लिए तुरंत ढक्कन बंद कर दें।",
          "गरम बासमती चावल, घी लगी रोटियों और नींबू वाले कचुम्बर सलाद के साथ परोसें।"
        ]
      },
      ur: {
        title: "پیلی دال تڑکا، ابلے ہوئے چاول اور سلاد",
        subtitle: "دیسی گھی سے لگی تڑکا دال، خوشبودار چاول، ککڑی پیاز سلاد اور 2 روٹیاں",
        ingredients: [
          "1 کپ تور / ارہر کی دال (دھلی ہوئی)",
          "1 عدد کٹا ہوا ٹماٹر اور 2 ہری مرچیں",
          "تڑکے کے لیے: 2 کھانے کے چمچ دیسی گھی، 1 چمچ زیرہ، 4 جوئے کٹا لہسن، 2 گول لال مرچیں، چٹکی بھر ہینگ",
          "سلاد کے لیے ککڑی، پیاز اور لیموں",
          "گرم گرم پھلی ہوئی روٹیاں"
        ],
        steps: [
          "ارہر کی دال کو نمک اور ہلدی کے ساتھ پریشر ککر میں 3 سیٹیاں آنے تک نرم پکا لیں۔",
          "چھوٹے پین میں دیسی گھی گرم کر کے زیرہ، کٹا ہوا لہسن، ہینگ اور سرخ مرچوں کا خوشبودار تڑکا تیار کریں۔",
          "گرما گرم تڑکا دال میں ڈالیں اور خوشبو کو برقرار رکھنے کے لیے فورا ڈھکن بند کر دیں۔",
          "باسمتی چاول، گھی لگی نرم روٹی اور تازہ سلاد کے ساتھ نوش فرمائیں۔"
        ]
      }
    },
    recipe: {
      ingredients: ["1 cup Toor / Arhar Dal (washed)", "1 medium tomato chopped", "2 green chilies slit", "Tadka: 2 tbsp Desi Ghee, 1 tsp Cumin, 4 garlic cloves minced, 2 dry red chilies, pinch of Hing", "Finely sliced cucumber and red onion for salad", "Freshly puffed whole wheat rotis"],
      steps: ["Boil toor dal in pressure cooker with turmeric, salt and water for 3 whistles.", "Prepare the fragrant tadka in hot desi ghee with cumin, minced garlic, hing and dried red chilies.", "Pour sizzing tadka over the dal and cover immediately to trap aromas.", "Serve steaming hot with fragrant basmati rice, warm ghee rotis and crisp kachumber salad."]
    }
  },
  Fri: {
    day: "Friday",
    mealType: "Lunch",
    title: "Jumu'ah Special Royal Dum Biryani",
    subtitle: "Fragrant Dum Biryani, Mirchi ka Salan, Burani Raita",
    prepTime: "60 mins",
    calories: "720 kcal",
    image: "/images/meal_fri.jpg",
    translations: {
      en: {
        title: "Jumu'ah Special Royal Dum Biryani",
        subtitle: "Fragrant Dum Biryani, Mirchi ka Salan, Burani Raita",
        ingredients: [
          "500g Halal Chicken",
          "2 cups aged Basmati rice (soaked 30 mins)",
          "1 cup fried onions (birista)",
          "1/2 cup yogurt",
          "Biryani masala & whole garam masalas",
          "Saffron soaked in warm milk, mint & coriander"
        ],
        steps: [
          "Marinate chicken with yogurt, ginger-garlic paste, red chili, biryani spices and half the fried onions for 1 hour.",
          "Boil rice with whole spices until 70% cooked.",
          "Layer chicken and rice alternately in heavy-bottom pot, top with saffron milk, mint and ghee.",
          "Seal with dough or foil, cook on high 5 mins, then dum on low heat for 25 mins."
        ]
      },
      hi: {
        title: "जुमा स्पेशल शाही दम बिरयानी",
        subtitle: "खुशबूदार दम बिरयानी, मिर्ची का सालन और बुरानी रायता",
        ingredients: [
          "500 ग्राम हलाल चिकन",
          "2 कप पुराना बासमती चावल (30 मिनट भिगोया)",
          "1 कप तला हुआ प्याज (बरिस्ता)",
          "आधा कप गाढ़ा दही",
          "शाही बिरयानी मसाला और खड़े गरम मसाले",
          "गुनगुने दूध में भीगा केसर, पुदीना, हरा धनिया और देसी घी"
        ],
        steps: [
          "चिकन को दही, अदरक-लहसुन, लाल मिर्च, बिरयानी मसाला और आधे तले प्याज के साथ 1 घंटे के लिए मैरीनेट करें।",
          "एक बड़े बर्तन में पानी, खड़े मसाले और नमक डालकर चावल को 70% (एक कनी) तक उबाल लें।",
          "भारी तले के बर्तन में पहले चिकन की परत और ऊपर से चावल की परत लगाएं। ऊपर से केसर का दूध, पुदीना और देसी घी डालें।",
          "आटे या फॉयल से सील करके 5 मिनट तेज आंच पर, फिर तवे के ऊपर रखकर 25 मिनट धीमी आंच पर दम दें।"
        ]
      },
      ur: {
        title: "جمعہ اسپیشل شاہی دم بریانی",
        subtitle: "خوشبودار چکن دم بریانی، مرچی کا سالن اور لہسنی برانی رائتہ",
        ingredients: [
          "500 گرام حلال چکن",
          "2 کپ پرانا باسمتی چاول (30 منٹ بھیگا ہوا)",
          "1 کپ براؤن تلی ہوئی پیاز (برستہ)",
          "آدھا کپ گاڑھا دہی",
          "بریانی مصالحہ اور ثابت گرم مصالحہ جات",
          "زعفران گھلا گرم دودھ، تازہ پودینہ اور دیسی گھی"
        ],
        steps: [
          "چکن کو دہی، ادرک لہسن، لال مرچ، بریانی مصالحہ اور آدھی تلی پیاز کے ساتھ 1 گھنٹہ میرینیٹ کریں۔",
          "ایک دیگچی میں پانی اور ثابت گرم مصالحوں کے ساتھ چاول کو 70 فیصد (ایک کنی) ابال لیں۔",
          "بھاری تلے والی دیگچی میں نیچے چکن اور اوپر ابلے چاولوں کی تہہ بچھائیں۔ اوپر سے زعفرانی دودھ، پودینہ اور گھی ڈالیں۔",
          "ڈھکن پر آٹا لگا کر یا فوائل پیپر سے سیل کریں، 5 منٹ تیز آنچ پر اور پھر 25 منٹ ہلکی آنچ پر دم دیں۔"
        ]
      }
    },
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
    image: "/images/meal_sat.jpg",
    translations: {
      en: {
        title: "Chole Bhature with Pickled Onions",
        subtitle: "Amritsari Chole, 2 Puffed Bhature, Green Chutney",
        ingredients: [
          "2 cups Kabuli Chana (boiled with tea bag)",
          "Anardana powder, chole masala, amchur",
          "Maida & semolina dough fermented with curd",
          "Ginger juliennes and fried green chilies"
        ],
        steps: [
          "Cook chana with aromatic black spices and tea bag infusion for authentic dark color.",
          "Fry fluffy golden bhaturas in hot oil and serve immediately with spicy chole."
        ]
      },
      hi: {
        title: "अमृतसरी छोले भटूरे और सिरके वाले प्याज",
        subtitle: "चटपटे पिंडी छोले, 2 फूले हुए भटूरे, तीखी हरी चटनी और अचार",
        ingredients: [
          "2 कप काबुली चना (चाय की पोटली के साथ उबला)",
          "अनारदाना पाउडर, छोले मसाला, अमचूर और कसूरी मेथी",
          "दही और सूजी से गूंथा हुआ मैदा भटूरों के लिए",
          "बारीक कटे अदरक के लच्छे और तली हुई हरी मिर्चें"
        ],
        steps: [
          "काबुली चने को तेजपत्ता, लौंग, नमक और चाय पत्ती की पोटली के साथ कुकर में अच्छी तरह उबालें।",
          "कड़ाही में घी/तेल गरम करके अदरक, हरी मिर्च, टमाटर और अनारदाना मसाला भूनें, फिर उबले छोले डालकर गाढ़ा पकाएं।",
          "गरम तेल में भटूरों को फुलाकर सुनहरा तलें और तीखे छोलों व हरी चटनी के साथ पेश करें।"
        ]
      },
      ur: {
        title: "امرتسری چھولے بھٹورے اور اچاری پیاز",
        subtitle: "چٹپٹے لاہوری چھولے، 2 پھولے ہوئے بھٹورے، ہری چٹنی اور سلاد",
        ingredients: [
          "2 کپ سفید چنے (چائے کی پوٹلی کے ساتھ ابلے ہوئے)",
          "انار دانہ، چھولے مصالحہ، آمچور اور زیرہ پاؤڈر",
          "میدہ اور سوجی کا دہی سے گندھا ہوا خمیری آٹا",
          "ادرک کے باریک لچھے اور تلی ہوئی ہری مرچیں"
        ],
        steps: [
          "سفید چنوں کو نمک اور چائے کی پتی کی پوٹلی کے ساتھ پریشر ککر میں نرم گلا لیں۔",
          "کڑاہی میں گھی گرم کر کے ادرک لہسن، ٹماٹر اور انار دانہ چھولے مصالحہ بھونیں اور چنے شامل کر کے دھیمی آنچ پر پکائیں۔",
          "گرم تیل میں گول خستہ بھٹورے تلیں اور گرما گرم چٹپٹے چھولوں کے ساتھ پیش کریں۔"
        ]
      }
    },
    recipe: {
      ingredients: ["2 cups Kabuli Chana (boiled with tea bag)", "Anardana powder, chole masala, amchur", "Maida & semolina dough fermented with curd", "Ginger juliennes and fried green chilies"],
      steps: ["Cook chana with aromatic black spices and tea bag infusion for authentic dark color.", "Fry fluffy golden bhaturas in hot oil and serve immediately with spicy chole."]
    }
  },
  Sun: {
    day: "Sunday",
    mealType: "Lunch",
    title: "Punjabi Kadhi Pakora with Veg Pulao",
    subtitle: "Mixed Veg Pulao, Punjabi Besan Kadhi with Soft Pakoras",
    prepTime: "40 mins",
    calories: "510 kcal",
    image: "/images/meal_sun.jpg",
    translations: {
      en: {
        title: "Punjabi Kadhi Pakora with Veg Pulao",
        subtitle: "Mixed Veg Pulao, Punjabi Besan Kadhi with Soft Pakoras",
        ingredients: [
          "Sour curd and besan whisked smooth",
          "Spiced onion pakoras deep fried",
          "Methi seeds, mustard seeds, curry leaves tadka",
          "Rice with carrots, peas, and green beans"
        ],
        steps: [
          "Simmer kadhi gently for 30 minutes until thick and velvety.",
          "Drop crispy warm onion pakoras into kadhi, temper with curry leaves and Kashmiri chili.",
          "Pair with hot aromatic vegetable pulao."
        ]
      },
      hi: {
        title: "पंजाबी कढ़ी पकोड़ा और वेज पुलाव",
        subtitle: "सब्जियों वाला पुलाव, कुरकुरे प्याज के पकोड़े वाली मलाईदार कढ़ी",
        ingredients: [
          "खट्टा दही और बेसन (अच्छी तरह फेंटा हुआ)",
          "प्याज, अजवाइन और हरी मिर्च के तले हुए कुरकुरे पकोड़े",
          "मेथी दाना, राई, करी पत्ता और कश्मीरी लाल मिर्च का तड़का",
          "गाजर, मटर और बीन्स वाला खुशबूदार पुलाव"
        ],
        steps: [
          "दही और बेसन के घोल में हल्दी और नमक डालकर धीमी आंच पर 30 मिनट तक लगातार चलाते हुए पकाएं।",
          "दूसरे पैन में प्याज के स्वादिष्ट पकोड़े तलकर तैयार कढ़ी में डालें।",
          "देसी घी में राई, मेथी दाना, करी पत्ता और सूखी लाल मिर्च का तड़का कढ़ी पर लगाएं और गरमा-गरम वेज पुलाव के साथ परोसें।"
        ]
      },
      ur: {
        title: "پنجابی کڑھی پکوڑا اور سبزی پلاؤ",
        subtitle: "خوشبودار سبزیوں کا پلاؤ، نرم پکوڑوں والی گاڑھی ذائقہ دار کڑھی",
        ingredients: [
          "کھٹا دہی اور بیسن (اچھی طرح پھینٹا ہوا)",
          "پیاز، اجوائن اور ہری مرچوں کے خستہ پکوڑے",
          "میتھی دانہ، رائی، کڑی پتہ اور کشمیری لال مرچ کا تڑکا",
          "گاجر، مٹر اور پھلیوں سے بنا گرما گرم پلاؤ"
        ],
        steps: [
          "دہی اور بیسن کے آمیزے کو نمک اور ہلدی کے ساتھ ہلکی آنچ پر 30 منٹ پکائیں تاکہ کڑھی خوب گاڑھی اور ملائم ہو جائے۔",
          "پیاز کے خستہ تلے ہوئے پکوڑے کڑھی میں شامل کریں۔",
          "دیسی گھی میں رائی، کڑی پتہ اور لال مرچ کا تڑکا لگائیں اور گرما گرم سبزی پلاؤ کے ساتھ پیش کریں۔"
        ]
      }
    },
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

export const dailyDuasData = MASNOON_DUAS;

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
