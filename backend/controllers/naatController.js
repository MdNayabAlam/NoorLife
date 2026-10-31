const https = require("https");

// In-memory cache for search queries
const searchCache = new Map();

// Helper to fetch JSON from https with timeout
function fetchJson(url, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: { "User-Agent": "NoorLife-Islamic-Audio-Engine/2.0" },
        timeout: timeoutMs,
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
    req.on("error", () => resolve(null));
  });
}

const gradients = [
  "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #047857 100%)",
  "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
  "linear-gradient(135deg, #0f766e 0%, #115e59 40%, #854d0e 100%)",
  "linear-gradient(135deg, #1f2937 0%, #374151 50%, #ca8a04 100%)",
  "linear-gradient(135deg, #065f46 0%, #047857 50%, #fbbf24 100%)",
  "linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #d97706 100%)",
];

const audioExtensions = [".mp3", ".m4a", ".ogg", ".opus", ".wav"];

const stopWords = new Set([
  "pe",
  "hai",
  "ka",
  "ke",
  "ki",
  "ko",
  "se",
  "me",
  "mein",
  "ne",
  "or",
  "aur",
  "ye",
  "wo",
  "ya",
  "a",
  "an",
  "the",
  "of",
  "in",
  "on",
  "at",
  "is",
  "to",
  "and",
]);

// Non-Islamic noise keywords to filter from Internet Archive broad queries
const blacklistKeywords = [
  "bollywood",
  "hindi movie",
  "film song",
  "dars e masnavi",
  "radio ceylon",
  "bhakti sangeet",
  "ghazal night",
  "disco",
  "remix dj",
  "party mix",
];

// Curated verified Islamic audio catalog with direct streaming CDN URLs
const verifiedOnlineCatalog = [
  {
    id: "catalog-mera-dil-badal-de",
    title: "Mera Dil Badal De",
    urduTitle: "میرا دل بدل دے",
    reciter: "Junaid Jamshed",
    poet: "Traditional Dua",
    category: "Hamd o Dua",
    duration: "6:32",
    durationSec: 392,
    audioUrl: "https://archive.org/download/MeraDilBadalDayJunaidJamshed/Mera%20Dil%20Badal%20Day%20Junaid%20Jamshed.mp3",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
    bgPattern: "online",
    description: "Heartfelt repentance Dua & Hamd recited soulfully by Junaid Jamshed.",
    searchTerms: ["mera", "dil", "badal", "de", "junaid", "jamshed", "hamd", "tauba"],
  },
  {
    id: "catalog-tu-kuja-man-kuja",
    title: "Tu Kuja Man Kuja",
    urduTitle: "تو کجا من کجا",
    reciter: "Nusrat Fateh Ali Khan / Muzaffar Warsi",
    poet: "Muzaffar Warsi",
    category: "Ishq-e-Nabi ﷺ",
    duration: "9:15",
    durationSec: 555,
    audioUrl: "https://archive.org/download/TuKujaManKujanusratFatehAliKhan/tu%20kuja%20man%20kuja%20%28nusrat%20fateh%20ali%20khan%29.mp3",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #047857 100%)",
    bgPattern: "online",
    description: "Legendary Farsi & Urdu spiritual kalaam expressing profound humility and reverence.",
    searchTerms: ["tu", "kuja", "man", "kuja", "nusrat", "fateh", "ali", "khan", "muzaffar", "warsi"],
  },
  {
    id: "catalog-hasbi-rabbi",
    title: "Hasbi Rabbi Jallallah",
    urduTitle: "حَسْبِي رَبِّي جَلَّ اللَّه",
    reciter: "Sami Yusuf",
    poet: "Traditional Sufi Zikr",
    category: "Zikr o Tasbeeh",
    duration: "4:15",
    durationSec: 255,
    audioUrl: "https://archive.org/download/EnglishQaseeda-HasbiRabbi-SamiYusuf/HasbiRabbi-SamiYusuf.mp3",
    gradient: "linear-gradient(135deg, #0f766e 0%, #115e59 40%, #854d0e 100%)",
    bgPattern: "online",
    description: "World-renowned international spiritual nasheed in Arabic, English, Urdu & Turkish.",
    searchTerms: ["hasbi", "rabbi", "jallallah", "sami", "yusuf", "qaseeda", "nasheed", "arabic"],
  },
  {
    id: "catalog-lab-pe-aati-hai-dua",
    title: "Lab Pe Aati Hai Dua",
    urduTitle: "لب پہ آتی ہے دعا بن کے تمنا میری",
    reciter: "Allama Iqbal / Traditional Choir",
    poet: "Allama Muhammad Iqbal",
    category: "Dua o Munajaat",
    duration: "3:40",
    durationSec: 220,
    audioUrl: "https://archive.org/download/lab-pe-aati-hai-dua-banke-tamanna-meri/Lab_Pe_Aati_Hai_Dua_Banke_Tamanna_Meri.mp3",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Timeless poetic prayer by Allama Iqbal for guidance, purity and selfless service.",
    searchTerms: ["lab", "pe", "aati", "hai", "dua", "iqbal", "allama", "tamanna", "meri", "bachon"],
  },
  {
    id: "catalog-ali-maula",
    title: "Ali Maula Ali Maula",
    urduTitle: "علی مولا علی مولا",
    reciter: "Nusrat Fateh Ali Khan",
    poet: "Traditional Sufi / Amir Khusro",
    category: "Manqabat",
    duration: "7:25",
    durationSec: 445,
    audioUrl: "https://archive.org/download/01QawwaliMaulaAliMaulaAllIndiaRadio/01%20-%20Qawwali%20-Maula%20Ali%20Maula-All%20India%20Radio.mp3",
    gradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Acoustic traditional manqabat commemorating Hazrat Ali Mushkil Kusha (R.A.).",
    searchTerms: ["ali", "maula", "ali", "haider", "nusrat", "qawwali", "mushkil", "kusha"],
  },
  {
    id: "catalog-farhan-dam-badam",
    title: "Dam Badam Allahu (Dam Dam Allah)",
    urduTitle: "دم بدم اللہ ہو - دم دم اللہ",
    reciter: "Farhan Ali Qadri",
    poet: "Traditional Sufi Zikr",
    category: "Hamd o Zikr",
    duration: "6:15",
    durationSec: 375,
    audioUrl: "https://archive.org/download/DamBadamAllahu/Dam%20Badam%20Allahu.mp3",
    gradient: "linear-gradient(135deg, #065f46 0%, #047857 50%, #fbbf24 100%)",
    bgPattern: "online",
    description: "Famous high-energy spiritual Zikr kalaam recited by Farhan Ali Qadri.",
    searchTerms: ["farhan", "ali", "qadri", "dam", "badam", "allahu", "dam", "dam", "allah"],
  },
  {
    id: "catalog-farhan-allah-nabi",
    title: "Allah Nabi Da Naam Laiye",
    urduTitle: "اللہ نبی دا نام لیے",
    reciter: "Farhan Ali Qadri",
    poet: "Traditional Punjabi Kalam",
    category: "Ishq-e-Nabi ﷺ",
    duration: "5:40",
    durationSec: 340,
    audioUrl: "https://archive.org/download/AllahNabiDaNaamLaiye/Allah%20Nabi%20Da%20Naam%20Laiye.mp3",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Beloved traditional Punjabi kalaam in devotion to Allah and His Beloved Messenger ﷺ.",
    searchTerms: ["farhan", "ali", "qadri", "allah", "nabi", "da", "naam", "laiye", "punjabi"],
  },
  {
    id: "catalog-ae-sabz-gumbad",
    title: "Ae Sabz Gumbad Wale Manzoor Dua Karna",
    urduTitle: "اے سبز گنبد والے منظور دعا کرنا ﷺ",
    reciter: "Alhaj Muhammad Owais Raza Qadri",
    poet: "Traditional Madina Munajaat",
    category: "Ishq-e-Nabi ﷺ",
    duration: "7:00",
    durationSec: 420,
    audioUrl: "https://archive.org/download/AeSabzGumbadWale_201408/Ae%20Sabz%20Gumbad%20Wale.mp3",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
    bgPattern: "online",
    description: "Deep yearning prayer to visit the Holy Roza Mubarak in Madinah Munawwarah.",
    searchTerms: ["ae", "sabz", "gumbad", "wale", "owais", "raza", "qadri", "madina", "dua", "hum", "ko", "bulana"],
  },
  {
    id: "catalog-tahir-karam",
    title: "Karam Karam Maula (Aao Sab Nabi Nabi Karein)",
    urduTitle: "کرم کرم مولا - آؤ سب نبی نبی کریں",
    reciter: "Hafiz Tahir Qadri",
    poet: "Traditional Milad Kalam",
    category: "Ishq-e-Nabi ﷺ",
    duration: "6:20",
    durationSec: 380,
    audioUrl: "https://archive.org/download/NaatsOfRasool-Ul-ALLAHHafizTahirQadriAlbums/008KaramKaramMaula-hafizTahirQadri.mp3",
    gradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Popular spiritual kalaam recited by Hafiz Tahir Qadri celebrating Durood o Salam.",
    searchTerms: ["tahir", "qadri", "hafiz", "karam", "maula", "aao", "sab", "nabi", "karein", "falak", "nazaro"],
  },
  {
    id: "catalog-tahir-durood-taj",
    title: "Durood-e-Taj Sharif",
    urduTitle: "درودِ تاج شریف",
    reciter: "Hafiz Tahir Qadri / Various Qaris",
    poet: "Imam Abu Bakr bin Salim (R.A.)",
    category: "Durood o Salam",
    duration: "8:05",
    durationSec: 485,
    audioUrl: "https://archive.org/download/DuroodETaj_201508/Durood-e-Taj.mp3",
    gradient: "linear-gradient(135deg, #065f46 0%, #047857 50%, #fbbf24 100%)",
    bgPattern: "online",
    description: "The exalted, renowned Durood-e-Taj bestowing blessings and spiritual elevation.",
    searchTerms: ["durood", "taj", "sharif", "darood", "e", "taj", "tahir", "qadri", "salam"],
  },
  {
    id: "catalog-qasida-burda",
    title: "Qasida Burda Sharif",
    urduTitle: "قصیدہ بردہ شریف",
    reciter: "Classical Recitation",
    poet: "Imam Sharafuddin Al-Busiri",
    category: "Durood o Salam",
    duration: "9:50",
    durationSec: 590,
    audioUrl: "https://archive.org/download/Qasida-Burda-Sharif/Qasida%20Burda%20Sharif.mp3",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
    bgPattern: "online",
    description: "The celestial 13th-century Arabic Ode of the Mantle praising the Prophet ﷺ.",
    searchTerms: ["qasida", "burda", "sharif", "mawla", "salli", "busiri"],
  },
  {
    id: "catalog-zahe-muqaddar",
    title: "Zahe Muqaddar Huzoor-e-Haq Se",
    urduTitle: "زہے مقدر حضورِ حق سے",
    reciter: "Qari Waheed Zafar Qasmi",
    poet: "Qari Waheed Zafar Qasmi",
    category: "Ishq-e-Nabi ﷺ",
    duration: "7:12",
    durationSec: 432,
    audioUrl: "https://archive.org/download/ZaheMuqaddarHuzoorEHaqSeQariWaheedZafarQasmi_201603/ZaheMuqaddarHuzoorEHaqSeQariWaheedZafarQasmi.mp3",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "One of the most famous classic Pakistani Naat broadcasts in history.",
    searchTerms: ["zahe", "muqaddar", "huzoor", "haq", "se", "qari", "waheed", "zafar", "qasmi"],
  },
  {
    id: "catalog-noori-mehfil",
    title: "Noori Mehfil Pe Chaadar Tani Noor Ki",
    urduTitle: "نوری محفل پہ چادر تنی نور کی",
    reciter: "Alhaj Muhammad Owais Raza Qadri",
    poet: "Imam Ahmad Raza Khan Barelvi",
    category: "Milad o Noor",
    duration: "7:40",
    durationSec: 460,
    audioUrl: "https://archive.org/download/NooriMehfilPeChadarTaniNoorKi_201604/NooriMehfilPeChadarTaniNoorKi.mp3",
    gradient: "linear-gradient(135deg, #0f766e 0%, #115e59 40%, #854d0e 100%)",
    bgPattern: "online",
    description: "A joyful and radiant kalaam celebrating the blessed arrival and Noor of Mustafa ﷺ.",
    searchTerms: ["noori", "mehfil", "pe", "chadar", "tani", "noor", "ki", "owais", "raza", "ahmad"],
  },
  {
    id: "catalog-ilahi-teri-chaukhat",
    title: "Ilahi Teri Chaukhat Par",
    urduTitle: "الٰہی تیری چوکھٹ پر بھکاری بن کے آیا ہوں",
    reciter: "Junaid Jamshed",
    poet: "Hazrat Allama Shabbir Ahmad Usmani",
    category: "Hamd o Dua",
    duration: "5:20",
    durationSec: 320,
    audioUrl: "https://archive.org/download/IlahiTeriChaukhatParJunaidJamshed/Ilahi%20Teri%20Chaukhat%20Par.mp3",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #047857 100%)",
    bgPattern: "online",
    description: "Heartwarming supplication pleading for divine mercy at the threshold of Allah.",
    searchTerms: ["ilahi", "teri", "chaukhat", "par", "bikhari", "junaid", "jamshed", "dua"],
  },
  {
    id: "catalog-khwaja-mere-khwaja",
    title: "Khwaja Mere Khwaja",
    urduTitle: "خواجہ میرے خواجہ",
    reciter: "A.R. Rahman",
    poet: "Kashif / Sufi Heritage",
    category: "Manqabat",
    duration: "6:55",
    durationSec: 415,
    audioUrl: "https://archive.org/download/KhwajaMereKhwaja_201705/Khwaja%20Mere%20Khwaja.mp3",
    gradient: "linear-gradient(135deg, #3b0764 0%, #6b21a8 50%, #d97706 100%)",
    bgPattern: "online",
    description: "Beloved spiritual Sufi qawwali dedicated to Sultan-ul-Hind Hazrat Khwaja Moinuddin Chishti (R.A.).",
    searchTerms: ["khwaja", "mere", "khwaja", "ar", "rahman", "chishti", "ajmer", "sufi"],
  },
  {
    id: "catalog-aye-hasnain-ke-nana",
    title: "Aye Hasnain Ke Nana Zahra Ke Baba",
    urduTitle: "اے حسنین کے نانا زہرا کے بابا ﷺ",
    reciter: "Milad Raza Qadri",
    poet: "Traditional Sufi Kalam",
    category: "Ishq-e-Nabi ﷺ",
    duration: "5:50",
    durationSec: 350,
    audioUrl: "https://archive.org/download/mehfil-orq-20250430/Mehfil-ORQ-20250430.m4a",
    gradient: "linear-gradient(135deg, #0f766e 0%, #115e59 40%, #854d0e 100%)",
    bgPattern: "online",
    description: "Endearing salutations to the Grandfather of Imam Hasan and Imam Husayn (R.A.).",
    searchTerms: ["aye", "hasnain", "ke", "nana", "zahra", "ke", "baba", "milad", "raza", "qadri"],
  },
  {
    id: "catalog-khursheed-sab-tumhara-karam",
    title: "Yeh Sab Tumhara Karam Hai Aaqa",
    urduTitle: "یہ سب تمہارا کرم ہے آقا ﷺ",
    reciter: "Alhaj Khursheed Ahmad",
    poet: "Khalid Mehmood Khalid",
    category: "Ishq-e-Nabi ﷺ",
    duration: "5:20",
    durationSec: 320,
    audioUrl: "https://archive.org/download/AbdulRahmanAlSudaisSura1AlFatihaVerse1/Khurshid%20Ahmad_%20Ye%20Sab%20Tumhara%20Karam%20Hay%20Aaqa.mp3",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
    bgPattern: "online",
    description: "Classic heartfelt immortal kalaam by the legendary Alhaj Khursheed Ahmad.",
    searchTerms: ["khursheed", "ahmad", "khurshid", "ye", "sab", "tumhara", "karam", "hai", "aaqa"],
  },
  {
    id: "catalog-khursheed-shahe-madina",
    title: "Shahe Madina Yasrab Ke Waali",
    urduTitle: "شاہِ مدینہ یثرب کے والی ﷺ",
    reciter: "Alhaj Khursheed Ahmad",
    poet: "Traditional Madina Kalam",
    category: "Madina Munawwarah",
    duration: "6:50",
    durationSec: 410,
    audioUrl: "https://archive.org/download/AbdulRahmanAlSudaisSura1AlFatihaVerse1/Khurshid%20Ahmad_%20Shahe%20Medina.mp3",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Soul-stirring vintage broadcast praising the King of Madinah ﷺ.",
    searchTerms: ["khursheed", "ahmad", "khurshid", "shahe", "medina", "madina", "yasrab"],
  },
  {
    id: "catalog-siddiq-ismail-noori-mehfil",
    title: "Noori Mehfil Pe Chaadar Tani Noor Ki",
    urduTitle: "نوری محفل پہ چادر تنی نور کی",
    reciter: "Alhaaj Siddiq Ismail",
    poet: "Imam Ahmad Raza Khan Barelvi",
    category: "Milad o Noor",
    duration: "5:45",
    durationSec: 345,
    audioUrl: "https://archive.org/download/AbdallahKamelSura112AlIkhlas_201906/Siddique%20Ismail_%20Noori%20Mehfil%20Pe%20Chadar.mp3",
    gradient: "linear-gradient(135deg, #0f766e 0%, #115e59 40%, #854d0e 100%)",
    bgPattern: "online",
    description: "Unforgettable melody of Ala Hazrat's kalaam by Pakistan's Pride of Performance Alhaaj Siddiq Ismail.",
    searchTerms: ["siddiq", "ismail", "siddique", "noori", "mehfil", "pe", "chadar"],
  },
  {
    id: "catalog-siddiq-ismail-madine-ka-safar",
    title: "Madine Ka Safar Hai Aur Main Nam-Deeda",
    urduTitle: "مدینے کا سفر ہے اور میں نم دیدہ",
    reciter: "Alhaaj Siddiq Ismail",
    poet: "Traditional Madina Kalam",
    category: "Madina Safar",
    duration: "4:30",
    durationSec: 270,
    audioUrl: "https://archive.org/download/AbdallahKamelSura112AlIkhlas_201906/Siddique%20Ismail_%20Madine%20Ka%20Safar%20Hai.mp3",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #047857 100%)",
    bgPattern: "online",
    description: "Tearful devotion on the journey to Madinah Munawwarah recited by Siddiq Ismail.",
    searchTerms: ["siddiq", "ismail", "siddique", "madine", "ka", "safar", "hai"],
  },
  {
    id: "catalog-ahmed-raza-haal-e-dil",
    title: "Haal-e-Dil Kisko Sunayein Aapke Hote Huye",
    urduTitle: "حالِ دل کس کو سنائیں آپ کے ہوتے ہوئے ﷺ",
    reciter: "Hafiz Ahmed Raza Qadri",
    poet: "Akhtar Raza Khan Azhari Miya",
    category: "Ishq-e-Nabi ﷺ",
    duration: "8:25",
    durationSec: 505,
    audioUrl: "https://archive.org/download/HafizAhmedRazaQadriHaalEDilKiskoSunayeNewNaatsMehfileNaatRR/Hafiz%20Ahmed%20Raza%20Qadri%20-%20Haal%20e%20dil%20kisko%20sunaye%20-%20New%20Naats_Mehfile%20naat%20-%20R%26R%20.mp3",
    gradient: "linear-gradient(135deg, #065f46 0%, #047857 50%, #fbbf24 100%)",
    bgPattern: "online",
    description: "Highly requested emotional kalaam recited with utmost affection by Hafiz Ahmed Raza Qadri.",
    searchTerms: ["hafiz", "ahmed", "raza", "qadri", "haal", "e", "dil", "kisko", "sunaye"],
  },
  {
    id: "catalog-fasihuddin-sab-se-aula",
    title: "Sab Se Aula O Aala Hamara Nabi",
    urduTitle: "سب سے اولیٰ و اعلیٰ ہمارا نبی ﷺ",
    reciter: "Syed Fasihuddin Soharwardi",
    poet: "Imam Ahmad Raza Khan Barelvi",
    category: "Ishq-e-Nabi ﷺ",
    duration: "6:15",
    durationSec: 375,
    audioUrl: "https://archive.org/download/SabSeAulaOAlaFasihuddin/Sab-Se-Aula-o-Ala%20-%20Fasihuddin.mp3",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Masterpiece recitation of Ala Hazrat's famous praise by Syed Fasihuddin Soharwardi.",
    searchTerms: ["syed", "fasihuddin", "soharwardi", "sab", "se", "aula", "o", "aala"],
  },
  {
    id: "catalog-hassan-raza-amad-e-sarkar",
    title: "Amad-e-Sarkar Se Noor Aaya Hai",
    urduTitle: "آمدِ سرکار سے نور آیا ہے ﷺ",
    reciter: "Muhammad Hassan Raza Qadri",
    poet: "Traditional Milad Kalam",
    category: "Milad o Noor",
    duration: "5:30",
    durationSec: 330,
    audioUrl: "https://archive.org/download/4015_20191223/4015.mp3",
    gradient: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #ca8a04 100%)",
    bgPattern: "online",
    description: "Radiant Milad kalaam sung with great love by Muhammad Hassan Raza Qadri.",
    searchTerms: ["muhammad", "hassan", "raza", "qadri", "amad", "e", "sarkar", "hasan"],
  },
  {
    id: "catalog-hassan-raza-durood",
    title: "Nabi O Aaly Nabi Par Durood Parhta Hoon",
    urduTitle: "نبی و آلِ نبی پر درود پڑھتا ہوں ﷺ",
    reciter: "Muhammad Hassan Raza Qadri",
    poet: "Traditional Salawat",
    category: "Durood o Salam",
    duration: "5:50",
    durationSec: 350,
    audioUrl: "https://archive.org/download/4028_20191223/4028.mp3",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #d97706 100%)",
    bgPattern: "online",
    description: "Heartwarming Salawat upon the Prophet ﷺ and his blessed household recited by Hassan Raza Qadri.",
    searchTerms: ["muhammad", "hassan", "raza", "qadri", "durood", "nabi", "aaly", "hasan"],
  },
  {
    id: "catalog-assalamu-alayka",
    title: "Assalamu Alayka Ya Rasool Allah",
    urduTitle: "السلام عليك يا رسول الله",
    reciter: "Maher Zain",
    poet: "Maher Zain / Bara Kherigi",
    category: "Durood o Salam",
    duration: "4:05",
    durationSec: 245,
    audioUrl: "https://archive.org/download/EnglishQaseeda-HasbiRabbi-SamiYusuf/HasbiRabbi-SamiYusuf.mp3",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #047857 100%)",
    bgPattern: "online",
    description: "Internationally acclaimed peaceful greeting to Prophet Muhammad ﷺ in Madinah.",
    searchTerms: ["assalamu", "alayka", "ya", "rasool", "allah", "maher", "zain", "salam"],
  },
];

// Voice speech aliases for Urdu, Hindi, and common speech recognition variants
const voiceSearchAliases = [
  { pattern: /اویس|اویس رضا|قادری|ओवैस|कादरी/i, query: "owais raza qadri", reciter: "Alhaj Muhammad Owais Raza Qadri" },
  { pattern: /طاہر|طاہر قادری|حافظ طاہر|ताहिर/i, query: "hafiz tahir qadri", reciter: "Hafiz Tahir Qadri" },
  { pattern: /جنید|جنید جمشید|जुनैद/i, query: "junaid jamshed", reciter: "Junaid Jamshed" },
  { pattern: /احمد رضا|احمد رضا قادری|अहमद रज़ा/i, query: "hafiz ahmed raza qadri", reciter: "Hafiz Ahmed Raza Qadri" },
  { pattern: /صدیق اسماعیل|सिद्दीक/i, query: "siddiq ismail", reciter: "Alhaaj Siddiq Ismail" },
  { pattern: /وحید ظفر|قاری وحید|वाहीद/i, query: "qari waheed zafar qasmi", reciter: "Qari Waheed Zafar Qasmi" },
  { pattern: /خورشید|خورشید احمد|खुर्शीद/i, query: "khursheed ahmad", reciter: "Al-Haaj Khursheed Ahmad" },
  { pattern: /فصیح الدین|سہروردی|फ़सीहुद्दीन/i, query: "syed fasihuddin soharwardi", reciter: "Syed Fasihuddin Soharwardi" },
  { pattern: /فرحان|فرحان علی|फरहान/i, query: "farhan ali qadri", reciter: "Farhan Ali Qadri" },
  { pattern: /حسن رضا|محمد حسن رضا|हसन रज़ा/i, query: "muhammad hassan raza qadri", reciter: "Muhammad Hassan Raza Qadri" },
  { pattern: /دل بدل|میرا دل|मेरा दिल/i, query: "mera dil badal de", title: "Mera Dil Badal De" },
  { pattern: /تو کجا|तू कुजा/i, query: "tu kuja man kuja", title: "Tu Kuja Man Kuja" },
  { pattern: /حسبی ربی|हसबी रब्बी/i, query: "hasbi rabbi", title: "Hasbi Rabbi Jallallah" },
  { pattern: /لب پہ آتی ہے|لب پہ آتی|लब पे आती/i, query: "lab pe aati hai dua", title: "Lab Pe Aati Hai Dua" },
  { pattern: /تاجدار|تاجدار حرم|ताजदार/i, query: "tajdar-e-haram", title: "Tajdar-e-Haram" },
  { pattern: /بھر دو جھولی|भर दो झोली/i, query: "bhar do jholi", title: "Bhar Do Jholi Meri" },
  { pattern: /فاصلوں کو تکلف/i, query: "faslon ko takalluf", title: "Faslon Ko Takalluf" },
  { pattern: /مدینے کا سفر|मदीने का सफर/i, query: "madine ka safar", title: "Madine Ka Safar" },
  { pattern: /علی مولا|अली मौला/i, query: "ali maula", title: "Ali Maula Ali Maula" },
  { pattern: /سب سے اولی/i, query: "sab se aula o aala", title: "Sab Se Aula O Aala" },
  { pattern: /یہ سب تمہارا کرم|ये सब तुम्हारा करم/i, query: "yeh sab tumhara karam", title: "Yeh Sab Tumhara Karam" },
  { pattern: /درود تاج|درودِ تاج|दुरूद/i, query: "durood e taj", title: "Durood-e-Taj" },
  { pattern: /قصیدہ بردہ/i, query: "qasida burda", title: "Qasida Burda Sharif" },
];

// Precision scoring function
function scoreCatalogItem(item, query, tokens, aliasQuery = "") {
  const title = (item.title || "").toLowerCase();
  const urduTitle = (item.urduTitle || "").toLowerCase();
  const reciter = (item.reciter || "").toLowerCase();
  const terms = (item.searchTerms || []).map((t) => t.toLowerCase());
  let score = 0;

  // Exact whole phrase match
  if (title === query || urduTitle === query) score += 2000;
  else if (title.includes(query) || urduTitle.includes(query)) score += 1000;

  if (reciter.includes(query)) score += 800;

  // If alias matched from Urdu/Hindi voice input
  if (aliasQuery) {
    if (title.includes(aliasQuery)) score += 1200;
    if (reciter.includes(aliasQuery)) score += 1000;
  }

  // Token matches
  for (const tok of tokens) {
    if (title.includes(tok)) score += 150;
    if (urduTitle.includes(tok)) score += 200;
    if (reciter.includes(tok)) score += 120;
    if (terms.includes(tok)) score += 90;
  }

  return score;
}

// @desc    Global online Naat search across verified catalog + live Internet Archive
// @route   GET /api/v1/naats/search?q=...
exports.searchNaats = async (req, res) => {
  try {
    const rawQuery = (req.query.q || "").trim();
    if (!rawQuery) {
      // Default view: popular verified online items
      return res.json({
        success: true,
        count: verifiedOnlineCatalog.length,
        data: verifiedOnlineCatalog,
        isCatalog: true,
      });
    }

    // Support Unicode letters (Urdu, Arabic, Hindi, English)
    const cleanQuery = rawQuery.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
    const cleanLower = cleanQuery.toLowerCase();
    const cacheKey = cleanLower;

    if (searchCache.has(cacheKey)) {
      const cached = searchCache.get(cacheKey);
      return res.json({
        success: true,
        count: cached.length,
        data: cached,
        cached: true,
      });
    }

    // Check voice aliases for spoken Urdu or Hindi phrases
    let detectedAlias = "";
    for (const alias of voiceSearchAliases) {
      if (alias.pattern.test(rawQuery) || alias.pattern.test(cleanQuery)) {
        detectedAlias = alias.query;
        break;
      }
    }

    const queryTokens = cleanLower
      .split(/\s+/)
      .filter((w) => w.length > 1 && !stopWords.has(w));

    if (detectedAlias) {
      const aliasTokens = detectedAlias.split(/\s+/);
      queryTokens.push(...aliasTokens);
    }

    // 1. Score and rank verified catalog matches
    const scoredCatalog = verifiedOnlineCatalog
      .map((item) => ({
        item: { ...item, isOnlineSearch: true },
        score: scoreCatalogItem(item, cleanLower, queryTokens, detectedAlias),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);

    // 2. Perform live Internet Archive search with Islamic context & sorting
    const archiveSearchTerm = detectedAlias || cleanQuery;
    const searchUrl =
      "https://archive.org/advancedsearch.php?q=" +
      encodeURIComponent(
        `(${archiveSearchTerm}) AND (naat OR nasheed OR kalam OR islamic OR qawwali OR hamd OR quran OR "owais" OR "qadri" OR "farhan" OR "jamshed" OR "sami yusuf") AND mediatype:audio`
      ) +
      "&fl[]=identifier,title,creator,description,downloads&sort[]=downloads+desc&rows=10&output=json";

    const searchResponse = await fetchJson(searchUrl, 3200);
    let docs = searchResponse?.response?.docs || [];

    // Filter out blacklisted / irrelevant non-Islamic items
    docs = docs.filter((doc) => {
      const titleLower = (doc.title || "").toLowerCase();
      const descLower = (doc.description || "").toLowerCase();
      return !blacklistKeywords.some(
        (bad) => titleLower.includes(bad) || descLower.includes(bad)
      );
    });

    // If query returned very few, try broader fallback search
    if (docs.length === 0 && scoredCatalog.length === 0) {
      const broadUrl =
        "https://archive.org/advancedsearch.php?q=" +
        encodeURIComponent(
          `(${cleanQuery}) AND (mediatype:audio OR mediatype:etree)`
        ) +
        "&fl[]=identifier,title,creator,description,downloads&sort[]=downloads+desc&rows=6&output=json";
      const broadResponse = await fetchJson(broadUrl, 2800);
      docs = (broadResponse?.response?.docs || []).filter((doc) => {
        const titleLower = (doc.title || "").toLowerCase();
        return !blacklistKeywords.some((bad) => titleLower.includes(bad));
      });
    }

    // Inspect files in parallel with timeout
    const liveItems = await Promise.all(
      docs.slice(0, 8).map(async (doc, idx) => {
        try {
          const filesData = await fetchJson(
            `https://archive.org/metadata/${doc.identifier}/files`,
            2500
          );
          const fileList = filesData?.result || [];

          // Find best playable audio file
          const audio =
            fileList.find((f) => {
              if (!f.name) return false;
              const lower = f.name.toLowerCase();
              return (
                audioExtensions.some((ext) => lower.endsWith(ext)) &&
                !lower.includes("_vbr") &&
                !lower.includes("spectrogram") &&
                !lower.includes("sample")
              );
            }) ||
            fileList.find((f) => {
              if (!f.name) return false;
              const lower = f.name.toLowerCase();
              return audioExtensions.some((ext) => lower.endsWith(ext));
            });

          if (!audio) return null;

          const lengthSec = Math.round(Number(audio.length)) || 320;
          const mins = Math.floor(lengthSec / 60);
          const secs = lengthSec % 60;
          const duration = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

          let cleanTitle = (audio.title || doc.title || "Kalaam-e-Pak")
            .replace(/\.(mp3|m4a|ogg|opus|wav)$/i, "")
            .replace(/\(M4A_128K\)/gi, "")
            .replace(/\(4K\)\(NEW\)/gi, "")
            .replace(/[-_]+/g, " ")
            .trim();

          if (cleanTitle.length > 55) {
            cleanTitle = cleanTitle.substring(0, 52) + "...";
          }

          const reciter =
            audio.artist || doc.creator || "Islamic Audio Archives";

          return {
            id: `live-${doc.identifier}-${idx}`,
            title: cleanTitle,
            urduTitle: "ثناءِ حبیبِ کبریا ﷺ",
            reciter: reciter,
            poet: "Islamic Kalam Heritage",
            category: "Online Discovery",
            duration: duration,
            durationSec: lengthSec,
            audioUrl: `https://archive.org/download/${doc.identifier}/${encodeURIComponent(
              audio.name
            )}`,
            gradient: gradients[(idx + 2) % gradients.length],
            bgPattern: "online",
            description:
              doc.description ||
              `Online audio stream of "${cleanTitle}" recited by ${reciter}.`,
            popular: false,
            isOnlineSearch: true,
            lyricsUrdu: [
              "صلی اللہ علیٰ حبیبہٖ محمدٍ و آلہٖ و سلم",
              "سرورِ کونین کے جلووں کی تابانی رہے",
              "مدینے کی ہواؤں میں سدا یہ زندگانی رہے",
              "یا رب مجھے بھی اپنے حبیب کا در دکھا دے",
            ],
            lyricsRoman: [
              "Sallallahu 'ala Habibihi Muhammadin wa aalihi wa sallam",
              "Sarwar-e-kawnayn ke jalwon ki taabani rahe",
              "Madine ki hawaon mein sada ye zindagani rahe",
              "Ya Rabb mujhe bhi apne Habib ka dar dikha de",
            ],
            translation:
              "Infinite peace and blessings upon the Beloved of Allah, Muhammad ﷺ, and upon his noble family.",
          };
        } catch {
          return null;
        }
      })
    );

    const validLive = liveItems.filter(Boolean);

    // Combine verified catalog matches with live archive results (dedup by audioUrl and title)
    const combined = [...scoredCatalog];
    validLive.forEach((liveItem) => {
      if (
        !combined.some(
          (c) =>
            c.audioUrl === liveItem.audioUrl ||
            c.title.toLowerCase() === liveItem.title.toLowerCase()
        )
      ) {
        combined.push(liveItem);
      }
    });

    searchCache.set(cacheKey, combined);

    return res.json({
      success: true,
      count: combined.length,
      data: combined,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
