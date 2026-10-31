import React, { useState, useEffect } from "react";
import {
  BookOpen, Check, Volume2, ArrowRight, Play, CheckCircle2, RotateCcw,
  User, Sparkles, AlertCircle, Info, VolumeX, Square, Languages
} from "lucide-react";
import { fetchLearningProgressAPI, updateLearningProgressAPI } from "../services/api";
import { NamazNiyyahPage } from "./NamazNiyyahPage";
import { namazVoiceService } from "../services/namazVoiceService";

export function NamazGuidePage({ steps, toggleStep, showToast, initialTab = "men" }) {
  // Navigation mode: "men", "women", "differences", "wudu", "niyyah"
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(["men-1", "men-2"]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceState, setVoiceState] = useState(namazVoiceService);

  useEffect(() => {
    const unsub = namazVoiceService.subscribe((state) => {
      setVoiceState({ ...state });
      setIsPlayingAudio(state.isPlaying);
    });
    return () => {
      unsub();
      namazVoiceService.stop();
    };
  }, []);

  // Stop audio whenever step or tab changes
  useEffect(() => {
    namazVoiceService.stop();
  }, [selectedStepIdx, activeTab]);

  // Sync with learning progress API for the active guide
  useEffect(() => {
    setSelectedStepIdx(0);
    const moduleName = activeTab === "men" ? "salah-men" : activeTab === "women" ? "salah-women" : activeTab;
    fetchLearningProgressAPI(moduleName)
      .then((data) => {
        if (data && data.completedStepIds) {
          setCompletedSteps(data.completedStepIds);
          if (data.currentStep !== undefined) setSelectedStepIdx(data.currentStep);
        }
      })
      .catch(() => {});
  }, [activeTab]);

  // ==========================================
  // MEN'S NAMAZ DATA (MARDON KA TARIKA)
  // ==========================================
  const menSalahSteps = [
    {
      id: "men-1",
      title: "1. Niyyah (Niyyat & Qibla Rukh)",
      position: "Niyyah (Intention)",
      arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ فَرْضًا مُسْتَقْبِلَ الْقِبْلَةِ",
      transliteration: "Nawaytu an usalliya lillahi ta'ala rak'atay salat...",
      meaning: "Maine dil se Allah Ta'ala ke liye Qibla rukh hokar is namaz ki niyyat ki.",
      postureRule: "Dono paon ke darmiyan 4 ungliyon ka faasla rakhein. Dil me pakka irada karein aur ba-adab Qibla rukh khade hon.",
      genderSpecific: "👨 Mardon ke liye: Khade hone me dono paon ke darmiyan lagbhag 4 ungliyon ka faasla rakhna masnoon hai.",
      simpleHindi: "सबसे पहले दिल में नमाज़ की नियत करें। दोनों पाँव के बीच 4 उंगलियों का फासला रखकर बा-अदब सीधे खड़े हों। दिल में पक्का इरादा करें: मैंने दिल से अल्लाह तआला के लिए क़िबला रुख होकर नमाज़ की नियत की।",
      hindiSpeech: "पहला क़दम: नमाज़ की नियत। दोनों पाँव के बीच लगभग चार उंगलियों का फासला रखकर बा-अदब क़िबला रुख सीधे खड़े हों। दिल में पक्का इरादा करें: मैंने दिल से अल्लाह तआला के लिए क़िबला रुख होकर नमाज़ की नियत की।",
    },
    {
      id: "men-2",
      title: "2. Takbeer-e-Tehreema (Haath Kaanon Tak Uthana)",
      position: "Takbeer-e-Tehreema",
      arabic: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      meaning: "Allah Sabse Bada Hai.",
      postureRule: "Dono haathon ko kaano ki low (earlobes) tak uthayein. Anguthe kaano ki low ko chhu jayein. Hatheliyan Qibla rukh aur ungliyan aam halat me khuli rahein.",
      genderSpecific: "👨 Mardon ke liye Farq: Haath kaano ki low (earlobes) tak uthana masnoon hai. Chadar/kurte se haath bahar nikaal kar uthayein.",
      simpleHindi: "दोनों हाथ कानों की लौ तक उठाएं, अंगूठे कानों को छुएं और कहें 'अल्लाहु अकबर' (अल्लाह सबसे बड़ा है)।",
      hindiSpeech: "दूसरा क़दम: तकबीर-ए-तहरीमा। दोनों हाथों को कानों की लौ तक उठाएं, अंगूठे कानों को छुएं और कहें: अल्लाहु अकबर। इसका मतलब है: अल्लाह सबसे बड़ा है।",
    },
    {
      id: "men-3",
      title: "3. Qiyam & Haath Bandhna (Naaf Ke Neeche)",
      position: "Qiyam & Hand Placement",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk",
      meaning: "Aye Allah! Tu paak hai aur teri taareef hai, tera naam barkat wala hai, teri shaan buland hai aur tere siwa koi mabood nahi.",
      postureRule: "Dahini (right) hatheli ko baayein (left) kalayi par rakhein. Anguthe aur chhoti ungli se kalayi ke gird ring banayein aur baki 3 ungliyan kalayi par sidhi rakhein. Haath naaf ke theek neeche bandhein.",
      genderSpecific: "👨 Mardon ke liye Farq: Haath Naaf ke theek neeche (below navel) bandhein. Ring (halka) bana kar kalayi pakadna masnoon hai.",
      simpleHindi: "नाफ़ के ठीक नीचे दाहिना हाथ बाएं हाथ पर बांधें और सना पढ़ें: 'सुबहाना-कल्लाहुम्मा व बि-हम्दिका...'",
      hindiSpeech: "तीसरा क़दम: क़ियाम और हाथ बांधना। नाफ़ के ठीक नीचे दाहिना हाथ बाएं हाथ पर बांधें और सना पढ़ें: सुबहाना-कल्लाहुम्मा व बि-हम्दिका, व तबारा कस्मुका, व तआला जद्दुका, व ला इलाहा गैरुक। तर्जुमा: ऐ अल्लाह! तू पाक है, तेरी तारीफ़ है, तेरा नाम बरकत वाला है, और तेरे सिवा कोई माबूद नहीं।",
    },
    {
      id: "men-4",
      title: "4. Ruku (Pura Jhukna & Peeth Sidhi)",
      position: "Ruku (Bowing)",
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal 'Azeem (3 times)",
      meaning: "Paak hai mera Parwardigar jo bada azmat wala hai.",
      postureRule: "Pura jhukein, kamar aur sar ek barabar sidha rahe (agar peeth par paani ka pyala rakha jaye toh na gire). Ghutnon ko ungliyan phaila kar mazbooti se pakadein. Kohniyan pehluon se alag rakhein.",
      genderSpecific: "👨 Mardon ke liye Farq: Kamar bilkul sidhi aur ufuqi (horizontal) rahegi. Kohniyan aur baazu pehluon se alag taan kar rakhein, ungliyan ghutnon par khoob khuli rahein.",
      simpleHindi: "रुकू में पूरा झुकें और पीठ बिल्कुल सीधी रखें। दोनों घुटनों को पकड़कर तीन बार कहें: 'सुबहाना रब्बियल अज़ीम' (पाक है मेरा परवरदिगार जो बड़ी अज़मत वाला है)।",
      hindiSpeech: "चौथा क़दम: रुकू। रुकू में पूरा झुकें और पीठ बिल्कुल सीधी रखें। दोनों घुटनों को पकड़कर तीन बार कहें: सुबहाना रब्बियल अज़ीम। यानी: पाक है मेरा परवरदिगार जो बड़ी अज़मत वाला है।",
    },
    {
      id: "men-5",
      title: "5. Qaumah (Ruku Se Sidha Khada Hona)",
      position: "Qaumah (Standing Straight)",
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
      transliteration: "Sami' Allahu liman hamidah • Rabbana lakal hamd hamdan kaseeran tayyiban mubarakan feeh",
      meaning: "Allah ne uski sun li jisne uski taareef ki • Aye hamare Rab! Tere hi liye saari taareefein hain, bahut zyada, paak aur barkat wali taareefein.",
      postureRule: "Ruku se itminan ke sath sidha khade ho jayein, haath bagal me latkate hue. Kam se kam ek tasbeeh ki miqdaar thehrein.",
      genderSpecific: "👨 Mardon ke liye: Itminan se sidha khada hona wujub ke darje me hai.",
      simpleHindi: "रुकू से सीधे खड़े होते हुए कहें 'समिअल्लाहु लिमन हमिदह' और सीधे खड़े होकर कहें 'रब्बना लकल हम्द'।",
      hindiSpeech: "पांचवां क़दम: क़ौमा। रुकू से सीधे खड़े होते हुए कहें: समिअल्लाहु लिमन हमिदह। फिर सीधे खड़े होकर कहें: रब्बना लकल हम्द। यानी: अल्लाह ने उसकी सुन ली जिसने उसकी तारीफ़ की, ऐ हमारे रब! तेरे ही लिए सारी तारीफ़ें हैं।",
    },
    {
      id: "men-6",
      title: "6. Sajdah (Khula & Buland Sajda)",
      position: "Sajdah (Prostration)",
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la (3 times)",
      meaning: "Paak hai mera Rab jo sabse aala aur buland hai.",
      postureRule: "7 aaza par sajda karein: Peshani aur naak, dono hatheliyan, dono ghutne aur dono paon ke panje. Kohniyan zameen aur pehlu se alag rahein. Pait raano se bilkul alag rahe. Dono paon ki ungliyan Qibla rukh khadi hon.",
      genderSpecific: "👨 Mardon ke liye Farq: Pait raano se alag, kohniyan zameen aur pehlu se dur uthi hui rahein. Kutta jaisa zameen par baazu bichana mana hai.",
      simpleHindi: "ज़मीन पर दोनों घुटने, दोनों हाथ, नाक और पेशानी रखकर सजदा करें। कोहनियां ज़मीन और पेट से दूर रखें। तीन बार कहें: 'सुबहाना रब्बियल आला'।",
      hindiSpeech: "छठा क़दम: सजदा। ज़मीन पर पेशानी और नाक रखकर सजदा करें। कोहनियां ज़मीन और पसलियों से अलग रखें। तीन बार कहें: सुबहाना रब्बियल आला। यानी: पाक है मेरा रब जो सबसे आला और बुलंद है।",
    },
    {
      id: "men-7",
      title: "7. Jalsa & Tashahhud (Baayan Paon Bichhana - Iftirash)",
      position: "Qa'dah / Tashahhud Sitting",
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat, as-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh...",
      meaning: "Tamaam qawli, badani aur maali ibadatein Allah hi ke liye hain. Salam ho aap par aye Nabi aur Allah ki rehmat aur uski barkatein...",
      postureRule: "Baayan (left) paon bicha kar us par baithein aur daayan (right) paon khada rakhein jiski ungliyan Qibla rukh hon (Iftirash). Haath dono raano par rakhein. Ash-hadu alla ilaha par shahadat ki ungli se ishaara karein.",
      genderSpecific: "👨 Mardon ke liye Farq: Mardon ke liye Iftirash masnoon hai (baayein paon par baithna aur daayein paon ko khada rakhna).",
      simpleHindi: "बाएं पाँव पर बैठें, दायां पाँव खड़ा रखें। अत्तहिय्यात पढ़ें और 'अशहदु अल्ला इलाहा' पर शहादत की उंगली से तौहीद का इशारा करें।",
      hindiSpeech: "सातवां क़दम: जलसा और तशह्हुद। बाएं पाँव को बिछाकर उस पर बैठें और दायां पाँव खड़ा रखें। अत्तहिय्यात पढ़ें: अत्तहिय्यातु लिल्लाहि वस्सलवातु वत्तय्यिबात, अस्सलामु अलैका अय्युहन्नबिय्यु व रहमतुल्लाहि व बरकातुह, अस्सलामु अलैना व अला इबादिल्लाहिस्सालिहीन। अशहदु अल्ला इलाहा इल्लल्लाहु व अशहदु अन्ना मुहम्मदन अब्दुहू व रसूलुह।",
    },
    {
      id: "men-8",
      title: "8. Durood-e-Ibrahim & Dua-e-Masura",
      position: "Durood & Supplication",
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ... • اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad... • Allahumma inni zalamtu nafsi zulman kaseeran...",
      meaning: "Aye Allah! Rehmat nazil farma Muhammad (ﷺ) par aur unki aal par... • Aye Allah! Maine apni jaan par bada zulm kiya aur tere siwa koi gunah nahi bakhsh sakta.",
      postureRule: "Tashahhud ke baad khushu ke sath Durood-e-Ibrahim padhein aur uske baad Dua-e-Masura padhkar maghfirat mangein.",
      genderSpecific: "👨 Mardon ke liye: Jahri namazon me imam ke peeche aahista padhein, akele padhte waqt masnoon aawaz.",
      simpleHindi: "तशह्हुद के बाद दुरूद-ए-इब्राहिम पढ़ें: 'अल्लाहुम्मा सल्ली अला मुहम्मद...' और फिर दुआ-ए-मासूरा पढ़कर मग़फ़िरत मांगें।",
      hindiSpeech: "आठवां क़दम: दुरूद-ए-इब्राहिम और दुआ। अत्तहिय्यात के बाद पढ़ें: अल्लाहुम्मा सल्ली अला मुहम्मदिव्व अला आलि मुहम्मद... ऐ अल्लाह! मुहम्मद सल्लल्लाहु अलैहि वसल्लम और उनकी आल पर रहमत नाज़िल फ़रमा। इसके बाद दुआ-ए-मासूरा पढ़ें।",
    },
    {
      id: "men-9",
      title: "9. Tasleem (Salam Pherna)",
      position: "Tasleem (Concluding Salam)",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "Assalamu 'Alaikum wa Rahmatullah",
      meaning: "Aap par Allah ki salamti aur uski rehmat ho.",
      postureRule: "Pehle dahini (right) taraf chehra pherein, itna ke dahine taraf ka gaal peeche wale ko dikhe. Phir baayein (left) taraf chehra pherein.",
      genderSpecific: "👨 Mardon ke liye: Salam pherte waqt farishton aur sath namaz padhne wale momineen ki niyyat karein.",
      simpleHindi: "नमाज़ पूरी करने के लिए पहले दाहिनी तरफ चेहरा फेरकर कहें: 'अस्सलामु अलैकुम व रहमतुल्लाह', फिर बाईं तरफ कहें।",
      hindiSpeech: "नौवां क़दम: सलाम फेरना। नमाज़ मुकम्मल करने के लिए पहले दाहिनी तरफ चेहरा फेरें और कहें: अस्सलामु अलैकुम व रहमतुल्लाह। फिर बाईं तरफ चेहरा फेरें और कहें: अस्सलामु अलैकुम व रहमतुल्लाह।",
    }
  ];

  // ==========================================
  // WOMEN'S NAMAZ DATA (AURATON KA TARIKA)
  // ==========================================
  const womenSalahSteps = [
    {
      id: "women-1",
      title: "1. Niyyah, Libas & Qibla (Parda & Khushu)",
      position: "Niyyah (Intention & Hijab)",
      arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ فَرْضًا مُسْتَقْبِلَ الْقِبْلَةِ",
      transliteration: "Nawaytu an usalliya lillahi ta'ala rak'atay salat...",
      meaning: "Maine dil se Allah Ta'ala ke liye Qibla rukh hokar is namaz ki niyyat ki.",
      postureRule: "Aurat ke liye pura jism (siwaye chehre, dono hatheliyon aur dono paon ke takhno ke neeche) satr hai aur dhaka hona shart hai. Dono paon ko bilkul milakar ya aapas me kareeb rakh kar khadi hon.",
      genderSpecific: "🧕 Auraton ke liye Farq: Dono paon aapas me milakar ya bilkul kareeb rakh kar khadi hon (mardon ki tarah faasla na rakhein). Parda mukammal hona shart hai.",
      simpleHindi: "दोनों पाँव आपस में मिलाकर या बिल्कुल करीब रखकर क़िबला रुख सीधी खड़ी हों। दिल में पक्की नियत करें: मैंने दिल से अल्लाह तआला के लिए क़िबला रुख होकर नमाज़ की नियत की।",
      hindiSpeech: "पहला क़दम: खवातीन की नियत और पर्दा। दोनों पाँव आपस में मिलाकर या बिल्कुल करीब रखकर क़िबला रुख सीधी खड़ी हों। दिल में पक्की नियत करें: मैंने दिल से अल्लाह तआला के लिए क़िबला रुख होकर नमाज़ की नियत की।",
    },
    {
      id: "women-2",
      title: "2. Takbeer-e-Tehreema (Haath Kandhon Tak Uthana)",
      position: "Takbeer-e-Tehreema",
      arabic: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      meaning: "Allah Sabse Bada Hai.",
      postureRule: "Khawateen haath kaano tak NA uthayein, balki sirf kandhon (shoulders) ya seene ki unchayi tak uthayein. Haath chaadar ya dupatte ke andar hi rahein, bahar na nikalein. Ungliyan aapas me mili rahein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Haath kaano ki low tak nahi, balki kandhon (shoulders) tak uthayein. Dupatte/chaadar ke andar se hi haath uthana parda ke lihaz se zaroori hai.",
      simpleHindi: "हाथ कानों तक नहीं, बल्कि सिर्फ अपने कंधों तक उठाएं। हाथ चादर या दुपट्टे के अंदर ही रखें और कहें: 'अल्लाहु अकबर' (अल्लाह सबसे बड़ा है)।",
      hindiSpeech: "दूसरा क़दम: खवातीन की तकबीर। हाथ कानों तक नहीं, बल्कि सिर्फ अपने कंधों तक उठाएं। हाथ चादर या दुपट्टे के अंदर ही रखें और कहें: अल्लाहु अकबर। यानी अल्लाह सबसे बड़ा है।",
    },
    {
      id: "women-3",
      title: "3. Qiyam & Haath Bandhna (Seene Par)",
      position: "Qiyam & Hand Placement",
      arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
      transliteration: "Subhanaka Allahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk",
      meaning: "Aye Allah! Tu paak hai aur teri taareef hai, tera naam barkat wala hai, teri shaan buland hai aur tere siwa koi mabood nahi.",
      postureRule: "Dono haath seene (chest) par bandhein. Dahini hatheli ko baayein haath ki pusht par sirf rakh dein, kalayi ko pakadna ya ring banana nahi hai. Khub simat kar khadi hon.",
      genderSpecific: "🧕 Auraton ke liye Farq: Haath naaf ke neeche nahi, balki SEENE (chest) par rakhein. Kalayi ko pakadna nahi hai balki sirf dahini hatheli baayein haath par rakh deni hai.",
      simpleHindi: "दोनों हाथ सीने पर रखें, दाहिनी हथेली बाएं हाथ की पुश्त पर रखें। फिर सना पढ़ें: 'सुबहाना-कल्लाहुम्मा व बि-हम्दिका...'",
      hindiSpeech: "तीसरा क़दम: सीने पर हाथ बांधना। दोनों हाथ सीने पर रखें, दाहिनी हथेली बाएं हाथ की पुश्त पर रखें। फिर सना पढ़ें: सुबहाना-कल्लाहुम्मा व बि-हम्दिका, व तबारा कस्मुका, व तआला जद्दुका, व ला इलाहा गैरुक।",
    },
    {
      id: "women-4",
      title: "4. Ruku (Sirf Ghutnon Tak Jhukna - Simat Kar)",
      position: "Ruku (Modest Bowing)",
      arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal 'Azeem (3 times)",
      meaning: "Paak hai mera Parwardigar jo bada azmat wala hai.",
      postureRule: "Mardon ki tarah pura nahi jhukna hai. Sirf itna jhukein ke dono haath ghutnon tak pahunch jayein (half bow). Ungliyan khol kar nahi balki aapas me milakar ghutnon par rakhein. Kohniyan pehluon se chipka kar rakhein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Pura nahi jhukna, peeth bilkul sidhi nahi karni. Kohniyan pehluon se chipki hon aur ungliyan milakar ghutnon par rakhein taaki jism simta rahe.",
      simpleHindi: "सिर्फ इतना झुकें कि दोनों हाथ घुटनों तक पहुँच जाएं। कोहनियां पसलियों से चिपका कर रखें और तीन बार कहें: 'सुबहाना रब्बियल अज़ीम'।",
      hindiSpeech: "चौथा क़दम: खवातीन का रुकू। सिर्फ इतना झुकें कि दोनों हाथ घुटनों तक पहुँच जाएं। कोहनियां पसलियों से चिपका कर रखें और तीन बार कहें: सुबहाना रब्बियल अज़ीम। यानी: पाक है मेरा परवरदिगार जो बड़ी अज़मत वाला है।",
    },
    {
      id: "women-5",
      title: "5. Qaumah (Ruku Se Sidha Khada Hona)",
      position: "Qaumah (Standing Up)",
      arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
      transliteration: "Sami' Allahu liman hamidah • Rabbana lakal hamd...",
      meaning: "Allah ne uski sun li jisne uski taareef ki • Aye hamare Rab! Tere hi liye saari taareefein hain.",
      postureRule: "Ruku se aahista sidhi khadi ho jayein, baazu aazad latkate hue itminan se thehrein.",
      genderSpecific: "🧕 Auraton ke liye: Hamesha tameez aur parda ke sath itminan se sidhi khadi hon.",
      simpleHindi: "रुकू से आहिस्ता सीधी खड़ी हों और कहें 'समिअल्लाहु लिमन हमिदह, रब्बना लकल हम्द'।",
      hindiSpeech: "पांचवां क़दम: क़ौमा। रुकू से आहिस्ता सीधी खड़ी हों और कहें: समिअल्लाहु लिमन हमिदह, रब्बना लकल हम्द।",
    },
    {
      id: "women-6",
      title: "6. Sajdah (Zameen Se Chipak Kar & Simat Kar)",
      position: "Sajdah (Compact Prostration)",
      arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      transliteration: "Subhana Rabbiyal A'la (3 times)",
      meaning: "Paak hai mera Rab jo sabse aala aur buland hai.",
      postureRule: "Auratein khub simat kar zameen se chipak kar sajda karein. Pait ko raano se mila kar rakhein, kohniyan zameen par bicha dein aur pehluon se chipka lein. Dono paon khade nahi karein, balki dahini (right) taraf nikaal kar zameen par bicha dein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Zameen se chipak kar sajda karein. Pait raano se aur kohniyan zameen se mili hon. Dono paon dahini taraf nikaal kar bicha diye jayein (Satr aur parda ke mutabiq).",
      simpleHindi: "पूरी तरह सिमट कर ज़मीन से चिपक कर सजदा करें। पेट को रानों से मिलाकर रखें, कोहनियां ज़मीन पर बिछाएं और दोनों पाँव दाहिनी तरफ निकाल दें। तीन बार कहें: 'सुबहाना रब्बियल आला'।",
      hindiSpeech: "छठा क़दम: खवातीन का सजदा। पूरी तरह सिमट कर ज़मीन से चिपक कर सजदा करें। पेट को रानों से मिलाकर रखें, कोहनियां ज़मीन पर बिछाएं और दोनों पाँव दाहिनी तरफ निकाल दें। तीन बार कहें: सुबहाना रब्बियल आला।",
    },
    {
      id: "women-7",
      title: "7. Jalsa & Qa'dah (Tawarruk - Dono Paon Right Side Nikaal Kar Baithna)",
      position: "Qa'dah / Tashahhud Sitting",
      arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat...",
      meaning: "Tamaam qawli, badani aur maali ibadatein Allah hi ke liye hain...",
      postureRule: "Zameen par baayein kuleen (left hip) par baithein aur dono paon dahini (right) taraf nikaal dein (Tawarruk). Haath dono raano par milakar rakhein, ungliyan aapas me judi hon. Tashahhud padhein aur ungli se ishaara karein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Auraton ke liye Tawarruk masnoon hai (paon par baithna nahi hai, balki dono paon dahini taraf nikaal kar zameen par baithna hai).",
      simpleHindi: "ज़मीन पर बाएं कूल्हे पर बैठें और दोनों पाँव दाहिनी तरफ निकाल दें। धीमी आवाज़ में अत्तहिय्यात पढ़ें और शहादत की उंगली से इशारा करें।",
      hindiSpeech: "सातवां क़दम: तवर्रुक से बैठना। ज़मीन पर बाएं कूल्हे पर बैठें और दोनों पाँव दाहिनी तरफ निकाल दें। आहिस्ता आवाज़ में अत्तहिय्यात पढ़ें। अशहदु अल्ला इलाहा पर शहादत की उंगली से इशारा करें।",
    },
    {
      id: "women-8",
      title: "8. Durood-e-Ibrahim & Dua-e-Masura",
      position: "Durood & Supplication",
      arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ... • اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad...",
      meaning: "Aye Allah! Rehmat nazil farma Muhammad (ﷺ) par aur unki aal par...",
      postureRule: "Tashahhud ke baad aahista aawaz me Durood-e-Ibrahim aur Dua-e-Masura padhein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Aurat ki saari qira'at aur duayein sirri (sirf itni aawaz jisse khud sun sakein) honi chahiye, buland aawaz me padhna mana hai.",
      simpleHindi: "धीमी आवाज़ में दुरूद-ए-इब्राहिम और दुआ-ए-मासूरा पढ़ें। औरत के लिए नमाज़ में आवाज़ धीमी रखना ज़रूरी है।",
      hindiSpeech: "आठवां क़दम: दुरूद-ए-इब्राहिम और दुआ। आहिस्ता आवाज़ में दुरूद-ए-इब्राहिम और दुआ-ए-मासूरा पढ़ें। औरत के लिए नमाज़ में आवाज़ धीमी रखना ज़रूरी है।",
    },
    {
      id: "women-9",
      title: "9. Tasleem (Aahista Salam Pherna)",
      position: "Tasleem (Concluding Salam)",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "Assalamu 'Alaikum wa Rahmatullah",
      meaning: "Aap par Allah ki salamti aur uski rehmat ho.",
      postureRule: "Pehle dahini (right) taraf aur phir baayein (left) taraf aahista aawaz me salam pherein.",
      genderSpecific: "🧕 Auraton ke liye Farq: Salam pherte waqt aawaz buland na karein, sirri aawaz me salam karein.",
      simpleHindi: "पहले दाहिनी तरफ धीमी आवाज़ में कहें: 'अस्सलामु अलैकुम व रहमतुल्लाह', फिर बाईं तरफ कहें।",
      hindiSpeech: "नौवां क़दम: सलाम फेरना। पहले दाहिनी तरफ आहिस्ता सलाम कहें: अस्सलामु अलैकुम व रहमतुल्लाह। फिर बाईं तरफ आहिस्ता सलाम कहें: अस्सलामु अलैकुम व रहमतुल्लाह।",
    }
  ];

  // ==========================================
  // KEY DIFFERENCES COMPARATIVE MATRIX
  // ==========================================
  const keyDifferencesList = [
    {
      id: 1,
      aspect: "Takbeer-e-Tehreema (Haath Uthana)",
      men: "Haath kaano ki low (earlobes) tak uthate hain. Anguthe kaan ki low ko chhoote hain aur chadar se haath bahar nikale jaate hain.",
      women: "Haath sirf kandhon (shoulders) ya seene tak uthati hain. Haath chadar/dupatte ke andar hi rehte hain, bahar nahi nikale jaate."
    },
    {
      id: 2,
      aspect: "Qiyam Me Haath Bandhna",
      men: "Naaf ke theek neeche (below navel) haath bandhte hain. Anguthe aur chhoti ungli se kalayi ka ring (halka) banate hain.",
      women: "Seene (chest) par haath rakhti hain. Dahini hatheli ko baayein haath ki pusht par sirf rakhti hain, pakadti nahi hain."
    },
    {
      id: 3,
      aspect: "Khade Hone Me Paon Ka Faasla",
      men: "Dono paon ke darmiyan lagbhag 4 ungliyon ka faasla rakhna masnoon hai.",
      women: "Dono paon ko aapas me milakar ya bilkul kareeb rakh kar khadi hoti hain."
    },
    {
      id: 4,
      aspect: "Ruku (Jhukne Ka Tarika)",
      men: "Pura jhukte hain, kamar aur sar barabar sidhi rehti hai. Ghutnon ko ungliyan phaila kar pakadte hain aur kohniyan pehluon se alag rehti hain.",
      women: "Sirf itna jhukti hain ke haath ghutnon tak pahunchein (half bow). Ungliyan milakar ghutnon par rakhti hain aur kohniyan pehluon se chipka kar simat kar jhukti hain."
    },
    {
      id: 5,
      aspect: "Sajdah (Sajda Karne Ka Tarika)",
      men: "Kohniyan zameen aur pehlu se alag, pet raano se alag, dono paon ki ungliyan Qibla rukh khadi rehti hain.",
      women: "Zameen se chipak kar sajda karti hain. Pet raano se aur kohniyan zameen se mili rehti hain. Dono paon dahini taraf nikaal kar zameen par bicha deti hain."
    },
    {
      id: 6,
      aspect: "Baithne Ka Tarika (Qa'dah & Jalsa)",
      men: "Iftirash: Baayan paon bicha kar uspar baithte hain aur daayan paon khada rakhte hain.",
      women: "Tawarruk: Zameen par baayein kuleen par baithti hain aur dono paon dahini (right) taraf nikaal kar bicha deti hain."
    },
    {
      id: 7,
      aspect: "Qira'at Ki Aawaz (Voice in Prayer)",
      men: "Jahri namazon (Fajr, Maghrib, Isha) me imam ya akele buland aawaz se padh sakte hain.",
      women: "Hamesha sirri (aahista) aawaz me qira'at karti hain, itni aawaz jisse sirf khud sun sakein."
    },
    {
      id: 8,
      aspect: "Satr (Awrah / Parda)",
      men: "Naaf se lekar ghutne ke neeche tak satr hai.",
      women: "Chehre, dono hatheliyon aur dono paon ke takhno ke neeche ke alawa pura jism aur sar ke baal dhake hona shart hai."
    }
  ];

  // Wudu steps
  const wuduSteps = [
    { id: "wudu-1", title: "1. Niyyah & Bismillah", desc: "Begin with sincere intention in the heart and say 'Bismillah'." },
    { id: "wudu-2", title: "2. Washing Hands", desc: "Wash both hands thoroughly up to the wrists 3 times, including between fingers." },
    { id: "wudu-3", title: "3. Rinsing Mouth", desc: "Rinse mouth 3 times with right hand, swishing water inside." },
    { id: "wudu-4", title: "4. Sniffing Water into Nose", desc: "Gently inhale water into nostrils 3 times with right hand and blow out with left hand." },
    { id: "wudu-5", title: "5. Washing Face", desc: "Wash entire face 3 times, from hairline to bottom of chin and ear to ear." },
    { id: "wudu-6", title: "6. Washing Arms", desc: "Wash both arms 3 times from fingertips up to and including the elbows, starting with right." },
    { id: "wudu-7", title: "7. Masah (Wiping Head & Ears)", desc: "Wipe damp hands once over head from front to back and wipe inside and outside of ears." },
    { id: "wudu-8", title: "8. Washing Feet", desc: "Wash right foot up to the ankle 3 times, then left foot, ensuring heels and toes are washed." }
  ];

  // Current active step list based on tab
  const currentStepList = activeTab === "men" ? menSalahSteps : activeTab === "women" ? womenSalahSteps : [];
  const currentStep = currentStepList[selectedStepIdx] || currentStepList[0] || {};

  function handleStepToggle(stepId) {
    const isDone = completedSteps.includes(stepId);
    let updated;
    if (isDone) {
      updated = completedSteps.filter((id) => id !== stepId);
    } else {
      updated = [...completedSteps, stepId];
    }
    setCompletedSteps(updated);

    const moduleName = activeTab === "men" ? "salah-men" : activeTab === "women" ? "salah-women" : activeTab;
    updateLearningProgressAPI({
      module: moduleName,
      completedStepIds: updated,
      currentStep: selectedStepIdx
    }).catch(() => {});

    if (showToast) {
      showToast(isDone ? "Step marked incomplete" : "Step marked complete! 🌿");
    }
  }

  function handleResumeProgress() {
    const firstIncomplete = currentStepList.findIndex((s) => !completedSteps.includes(s.id));
    if (firstIncomplete !== -1) {
      setSelectedStepIdx(firstIncomplete);
      if (showToast) showToast(`Resumed to: ${currentStepList[firstIncomplete].title}`);
    } else {
      setSelectedStepIdx(0);
      if (showToast) showToast("Masha'Allah! All steps completed. Starting from beginning.");
    }
  }

  function handlePlayAudio(mode = null) {
    const targetMode = mode || voiceState.voiceMode || "hindi";
    if (voiceState.isPlaying && voiceState.voiceMode === targetMode) {
      namazVoiceService.stop();
    } else {
      if (mode) namazVoiceService.setVoiceMode(mode);
      namazVoiceService.speakStep(currentStep, targetMode);
    }
  }

  const completionPercent = currentStepList.length > 0 ? Math.round((completedSteps.length / currentStepList.length) * 100) : 0;

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <h2>Namaz Guide — Men & Women (Mardon Aur Auraton Ki Namaz)</h2>
          <p>Authentic Sunnah rules, step-by-step prayer postures, recitations, and key differences.</p>
        </div>
      </div>

      {/* Main Mode Switcher Navigation Pills */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("men")}
          style={{
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: activeTab === "men" ? "none" : "1px solid var(--border-color)",
            background: activeTab === "men" ? "linear-gradient(135deg, #174232 0%, #266b4f 100%)" : "var(--bg-card)",
            color: activeTab === "men" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            boxShadow: activeTab === "men" ? "0 4px 14px rgba(23, 66, 50, 0.25)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>👨</span>
          <span>Mardon Ka Tarika (Men's Guide)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("women")}
          style={{
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: activeTab === "women" ? "none" : "1px solid var(--border-color)",
            background: activeTab === "women" ? "linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)" : "var(--bg-card)",
            color: activeTab === "women" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            boxShadow: activeTab === "women" ? "0 4px 14px rgba(27, 67, 50, 0.25)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>🧕</span>
          <span>Auraton Ka Tarika (Women's Guide)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("differences")}
          style={{
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: activeTab === "differences" ? "none" : "1px solid var(--border-color)",
            background: activeTab === "differences" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "differences" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <span>⚖️</span>
          <span>Key Differences (Farq & Ahkaam)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("wudu")}
          style={{
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: activeTab === "wudu" ? "none" : "1px solid var(--border-color)",
            background: activeTab === "wudu" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "wudu" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <span>💧</span>
          <span>Wudu (Ablution) Guide</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("niyyah")}
          style={{
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: activeTab === "niyyah" ? "none" : "1px solid var(--border-color)",
            background: activeTab === "niyyah" ? "var(--primary-green)" : "var(--bg-card)",
            color: activeTab === "niyyah" ? "#ffffff" : "var(--text-heading)",
            fontWeight: "700",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            boxShadow: activeTab === "niyyah" ? "0 4px 14px rgba(23, 66, 50, 0.25)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          <span>🤲</span>
          <span>Har Namaz Ki Niyyat (Niyyah Guide)</span>
        </button>
      </div>

      {/* =========================================================================
          MEN OR WOMEN STEP-BY-STEP INTERACTIVE GUIDE
         ========================================================================= */}
      {(activeTab === "men" || activeTab === "women") && (
        <div>
          {/* Informational Guidance Banner */}
          <div className={`gender-guide-banner ${activeTab === "men" ? "men" : "women"}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>{activeTab === "men" ? "👨" : "🧕"}</span>
              <div>
                <strong style={{ fontSize: "13.5px", color: "var(--text-heading)" }}>
                  {activeTab === "men" ? "Mardon Ki Namaz Ka Mukammal Masnoon Tarika" : "Khawateen (Auraton) Ki Namaz Ka Masnoon Tarika"}
                </strong>
                <p style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                  {activeTab === "men"
                    ? "Mardon ke liye takbeer me kaano tak haath uthana, naaf ke neeche bandhna, kamar sidhi rakh kar ruku aur khula sajda masnoon hai."
                    : "Khawateen ke liye parda aur satr mukammal rakhna, kandhon tak haath uthana, seene par bandhna, aur simat kar sajda karna masnoon hai."}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-green)" }}>
                Progress: {completedSteps.length}/{currentStepList.length} ({completionPercent}%)
              </span>
              <button
                className="action-icon-btn"
                style={{ width: "auto", padding: "5px 12px", fontSize: "11px", gap: "4px" }}
                onClick={handleResumeProgress}
              >
                <Play size={11} fill="currentColor" />
                <span>Resume Next</span>
              </button>
            </div>
          </div>

          {/* 2-Column Grid: Step List on Left, Active Step Detail on Right */}
          <div className="namaz-steps-layout">
            {/* Steps Checklist Column */}
            <div className="dashboard-card" style={{ padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)" }}>
                  Postures & Steps ({currentStepList.length})
                </h4>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {currentStepList.map((s, idx) => {
                  const isSelected = selectedStepIdx === idx;
                  const isDone = completedSteps.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-md)",
                        background: isSelected ? "var(--accent-cream)" : "var(--bg-subtle)",
                        border: `1px solid ${isSelected ? "var(--primary-green)" : "var(--border-color)"}`,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      onClick={() => setSelectedStepIdx(idx)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          className={`task-checkbox-custom ${isDone ? "checked" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStepToggle(s.id);
                          }}
                          title={isDone ? "Mark incomplete" : "Mark step completed"}
                        >
                          {isDone && <Check size={11} color="white" strokeWidth={3} />}
                        </div>
                        <div>
                          <strong style={{ fontSize: "13px", color: isSelected ? "var(--primary-green)" : "var(--text-heading)", display: "block" }}>
                            {s.title}
                          </strong>
                          <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                            {s.position}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary-green)" }}>
                          Active →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Step Detailed Card */}
            <div className="dashboard-card" style={{ padding: "26px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: "11px", color: "var(--primary-green)", fontWeight: "700", background: "var(--accent-cream)", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>
                    STEP {selectedStepIdx + 1} OF {currentStepList.length} • {activeTab === "men" ? "MEN'S GUIDELINE" : "WOMEN'S GUIDELINE"}
                  </span>

                  {/* Audio Controls Bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    {/* Aasan Hindi Voice Button */}
                    <button
                      type="button"
                      onClick={() => handlePlayAudio("hindi")}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--radius-pill)",
                        border: isPlayingAudio && voiceState.voiceMode === "hindi" ? "1.5px solid #16a34a" : "1px solid var(--border-color)",
                        background: isPlayingAudio && voiceState.voiceMode === "hindi" ? "#dcfce7" : "var(--primary-green)",
                        color: isPlayingAudio && voiceState.voiceMode === "hindi" ? "#166534" : "#ffffff",
                        fontWeight: "700",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        transition: "all 0.15s ease"
                      }}
                      title="Suniye aasan Hindi/Urdu aawaz me samajhdaar tarika"
                    >
                      {isPlayingAudio && voiceState.voiceMode === "hindi" ? (
                        <>
                          <Square size={12} fill="#166534" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={13} color="var(--accent-gold)" />
                          <span>🗣️ Aasan Voice Suniye</span>
                        </>
                      )}
                    </button>

                    {/* Arabic Recitation Button */}
                    {currentStep.arabic && (
                      <button
                        type="button"
                        onClick={() => handlePlayAudio("arabic")}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "var(--radius-pill)",
                          border: isPlayingAudio && voiceState.voiceMode === "arabic" ? "1.5px solid #c6a256" : "1px solid var(--border-color)",
                          background: isPlayingAudio && voiceState.voiceMode === "arabic" ? "var(--accent-cream)" : "var(--bg-subtle)",
                          color: isPlayingAudio && voiceState.voiceMode === "arabic" ? "var(--primary-green)" : "var(--text-heading)",
                          fontWeight: "700",
                          fontSize: "11.5px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                        title="Listen to pure Arabic recitation"
                      >
                        {isPlayingAudio && voiceState.voiceMode === "arabic" ? (
                          <>
                            <Square size={11} fill="currentColor" />
                            <span>Stop Arabic</span>
                          </>
                        ) : (
                          <>
                            <Languages size={12} />
                            <span>📖 Arabic Recitation</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Speed Toggle (Normal / Dheere) */}
                    <button
                      type="button"
                      onClick={() => {
                        const newSpeed = voiceState.speed === 0.88 ? 0.75 : 0.88;
                        namazVoiceService.setSpeed(newSpeed);
                        if (showToast) showToast(newSpeed === 0.75 ? "Aawaz Dheere & Saaf (Slow Mode) 🐢" : "Aawaz Normal Pace ⚡");
                      }}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "var(--radius-pill)",
                        border: "1px solid var(--border-color)",
                        background: voiceState.speed === 0.75 ? "#fef3c7" : "var(--bg-subtle)",
                        color: voiceState.speed === 0.75 ? "#92400e" : "var(--text-muted)",
                        fontWeight: "700",
                        fontSize: "10.5px",
                        cursor: "pointer"
                      }}
                      title="Toggle voice speed: Slow & Clear / Normal"
                    >
                      <span>{voiceState.speed === 0.75 ? "🐢 Slow (Dheere)" : "⚡ Normal"}</span>
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-heading)", marginTop: "4px" }}>
                  {currentStep.title}
                </h3>

                {/* Aasan Hindi / Urdu Spoken Guide Box */}
                {currentStep.simpleHindi && (
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(22, 163, 74, 0.08)",
                      border: "1px dashed rgba(22, 163, 74, 0.35)",
                      marginTop: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px"
                    }}
                  >
                    <Sparkles size={16} color="var(--primary-green)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary-green)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Aasan Bhasha Me Samjhein (Easy Voice Guide):
                      </div>
                      <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "var(--text-heading)", lineHeight: "1.5", fontWeight: "500" }}>
                        {currentStep.simpleHindi}
                      </p>
                    </div>
                  </div>
                )}

                {/* Specific Gender Posture Rule Callout Box */}
                <div className={`gender-callout-box ${activeTab === "men" ? "men" : "women"}`}>
                  <strong style={{ fontSize: "12.5px", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Info size={14} color={activeTab === "men" ? "var(--primary-green)" : "var(--accent-gold)"} />
                    <span>{activeTab === "men" ? "Mardon Ka Khas Masnoon Tarika:" : "Khawateen (Auraton) Ka Khas Masnoon Tarika:"}</span>
                  </strong>
                  <p style={{ fontSize: "12.5px", color: "var(--text-heading)", marginTop: "6px", lineHeight: "1.5" }}>
                    {currentStep.genderSpecific}
                  </p>
                </div>

                {/* Arabic Script Box */}
                {currentStep.arabic && (
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-color)",
                      textAlign: "right",
                      margin: "14px 0",
                    }}
                  >
                    <div style={{ fontSize: "21px", fontFamily: "Traditional Arabic, Scheherazade, serif", fontWeight: "700", color: "var(--primary-green)", lineHeight: "1.8", direction: "rtl" }}>
                      {currentStep.arabic}
                    </div>
                  </div>
                )}

                {/* Transliteration & English/Urdu Meaning */}
                {currentStep.transliteration && (
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                      Transliteration (Pronunciation):
                    </span>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-heading)", marginTop: "2px", fontStyle: "italic" }}>
                      "{currentStep.transliteration}"
                    </p>
                  </div>
                )}

                {currentStep.meaning && (
                  <div style={{ marginBottom: "14px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                      Meaning / Tarjuma:
                    </span>
                    <p style={{ fontSize: "13px", color: "var(--text-heading)", marginTop: "2px", lineHeight: "1.4" }}>
                      {currentStep.meaning}
                    </p>
                  </div>
                )}

                {/* Physical Action Instructions */}
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Physical Posture Instructions:
                  </span>
                  <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.5" }}>
                    {currentStep.postureRule}
                  </p>
                </div>
              </div>

              {/* Step Navigation Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "22px", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
                <button
                  type="button"
                  className="card-action-btn-green"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-heading)", border: "1px solid var(--border-color)", padding: "8px 16px" }}
                  disabled={selectedStepIdx === 0}
                  onClick={() => setSelectedStepIdx(Math.max(0, selectedStepIdx - 1))}
                >
                  ← Previous Step
                </button>

                <button
                  type="button"
                  onClick={() => handleStepToggle(currentStep.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-pill)",
                    border: "none",
                    background: completedSteps.includes(currentStep.id) ? "var(--primary-green)" : "var(--accent-cream)",
                    color: completedSteps.includes(currentStep.id) ? "#ffffff" : "var(--primary-green)",
                    fontWeight: "700",
                    fontSize: "12.5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>{completedSteps.includes(currentStep.id) ? "Completed ✓" : "Mark as Done"}</span>
                </button>

                <button
                  type="button"
                  className="card-action-btn-green"
                  style={{ padding: "8px 18px" }}
                  disabled={selectedStepIdx === currentStepList.length - 1}
                  onClick={() => setSelectedStepIdx(Math.min(currentStepList.length - 1, selectedStepIdx + 1))}
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          KEY DIFFERENCES COMPARISON TAB (MARDON AUR AURATON KI NAMAZ ME FARQ)
         ========================================================================= */}
      {activeTab === "differences" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="dashboard-card" style={{ padding: "22px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", marginBottom: "4px" }}>
              Mardon Aur Auraton Ki Namaz Me Farq (Key Jurisprudential Differences)
            </h3>
            <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginBottom: "18px" }}>
              Namaz ke arkaan (Fajr, Zuhr wagera ki raka'atein, Surah Al-Fatiha, Ruku, Sajdah, Tashahhud) dono ke liye barabar hain. Farq sirf <strong>jism ki he'yat (posture) aur satr (parda)</strong> ke aitebar se hai, jisse khawateen ka parda behtar rahe.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {keyDifferencesList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{ background: "var(--primary-green)", color: "#ffffff", width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800" }}>
                      {item.id}
                    </span>
                    <strong style={{ fontSize: "14.5px", color: "var(--text-heading)" }}>
                      {item.aspect}
                    </strong>
                  </div>

                  <div className="differences-grid">
                    {/* Men's Rule */}
                    <div className="difference-box-men">
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-green)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <span>👨</span>
                        <span>Mardon Ke Liye (Men):</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--text-heading)", lineHeight: "1.45" }}>
                        {item.men}
                      </p>
                    </div>

                    {/* Women's Rule */}
                    <div className="difference-box-women">
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent-gold)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <span>🧕</span>
                        <span>Khawateen Ke Liye (Women):</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--text-heading)", lineHeight: "1.45" }}>
                        {item.women}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          WUDU (ABLUTION) GUIDE TAB
         ========================================================================= */}
      {activeTab === "wudu" && (
        <div className="dashboard-card" style={{ padding: "22px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", marginBottom: "4px" }}>
            Wudu (Ablution) Step-by-Step Guide
          </h3>
          <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginBottom: "18px" }}>
            Wudu is the mandatory ritual purification before touching the prayer mat or reciting the Holy Quran.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
            {wuduSteps.map((ws, idx) => (
              <div
                key={ws.id}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "var(--primary-green)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "12px",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <strong style={{ fontSize: "13.5px", color: "var(--text-heading)" }}>
                    {ws.title}
                  </strong>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.4" }}>
                    {ws.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          HAR NAMAZ KI NIYYAT (ALL PRAYERS INTENTION DIRECTORY)
         ========================================================================= */}
      {activeTab === "niyyah" && (
        <NamazNiyyahPage
          onNavigateGuide={() => setActiveTab("men")}
          showToast={showToast}
        />
      )}
    </div>
  );
}
