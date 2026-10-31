import React, { useState } from "react";
import {
  Heart,
  Volume2,
  Copy,
  Check,
  CheckCircle2,
  Info,
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  User,
  Users,
  Compass,
  AlertCircle
} from "lucide-react";

export const PRAYERS_DATA = [
  {
    id: "fajr",
    name: "Fajr (فجر)",
    time: "Dawn to Sunrise",
    portions: [
      {
        id: "fajr-sunnat",
        name: "2 Rakat Sunnat-e-Muakkadah",
        rakats: 2,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Fajr ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Fajr, the Sunnah of the Messenger of Allah, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Fajr ki do sunnatein sabhi sunnato me sabse zyada muakkadah (taakeedi) hain. Ise akele hi padha jata hai."
      },
      {
        id: "fajr-farz",
        name: "2 Rakat Farz",
        rakats: 2,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْفَجْرِ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Fajr ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Fajr, Obligatory (Farz) for the sake of Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Agar jamat se padhein to dil me 'Peeche is Imam ke' ka irada zaroori hai."
      }
    ]
  },
  {
    id: "zuhr",
    name: "Zuhr (ظہر)",
    time: "Midday after Zenith",
    portions: [
      {
        id: "zuhr-sunnat-1",
        name: "4 Rakat Sunnat (Qabl-az-Farz)",
        rakats: 4,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الظُّهْرِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Zuhr ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Zuhr Sunnah before Farz, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Farz se pehle 4 rakat sunnat-e-muakkadah padhna nihayat barkat wala hai."
      },
      {
        id: "zuhr-farz",
        name: "4 Rakat Farz",
        rakats: 4,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الظُّهْرِ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Zuhr ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Zuhr Farz, for the sake of Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Imam ke peeche qira'at nahi ki jati, bas khamoshi se sunte ya qiyam me rehte hain."
      },
      {
        id: "zuhr-sunnat-2",
        name: "2 Rakat Sunnat (Ba'd-az-Farz)",
        rakats: 2,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الظُّهْرِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Zuhr ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Zuhr Sunnah after Farz, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Farz ke baad foran 2 rakat sunnat padhi jati hai."
      },
      {
        id: "zuhr-nafl",
        name: "2 Rakat Nafl",
        rakats: 2,
        type: "Nafl",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ النَّفْلِ مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz nafl ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of voluntary (Nafl) prayer, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Nafl namaz hasool-e-sawaab ke liye mustahabb hai."
      }
    ]
  },
  {
    id: "asr",
    name: "Asr (عصر)",
    time: "Late Afternoon",
    portions: [
      {
        id: "asr-sunnat",
        name: "4 Rakat Sunnat (Ghair Muakkadah)",
        rakats: 4,
        type: "Sunnat Ghair Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الْعَصْرِ سُنَّةً مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Asr ki sunnat, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Asr Sunnah, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Hadees me hai: 'Allah us shakhs par raham farmaye jo Asr se pehle 4 rakat padhe'."
      },
      {
        id: "asr-farz",
        name: "4 Rakat Farz",
        rakats: 4,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الْعَصْرِ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Asr ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Asr Farz, for the sake of Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Asr ki namaz ko 'Salat-ul-Wusta' bhi kaha gaya hai, iski pabandi nihayat ahem hai."
      }
    ]
  },
  {
    id: "maghrib",
    name: "Maghrib (مغرب)",
    time: "Sunset to Dusk",
    portions: [
      {
        id: "maghrib-farz",
        name: "3 Rakat Farz",
        rakats: 3,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى ثَلَاثَ رَكَعَاتٍ صَلَاةِ الْمَغْرِبِ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 3 rakat namaz-e-Maghrib ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 3 Rak'ats of Maghrib Farz, for the sake of Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Maghrib me sabse pehle 3 rakat Farz padhe jaate hain."
      },
      {
        id: "maghrib-sunnat",
        name: "2 Rakat Sunnat-e-Muakkadah",
        rakats: 2,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْمَغْرِبِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Maghrib ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Maghrib Sunnah, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Farz ke foran baad 2 rakat sunnat padhna masnoon hai."
      },
      {
        id: "maghrib-nafl",
        name: "2 Rakat Nafl (Awwabeen)",
        rakats: 2,
        type: "Nafl",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ النَّفْلِ مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz nafl ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Nafl (Awwabeen), for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Maghrib ke baad 2 se lekar 6 rakat nafl (Salat-ul-Awwabeen) padhna bada afzal hai."
      }
    ]
  },
  {
    id: "isha",
    name: "Isha (عشاء)",
    time: "Night until Fajr",
    portions: [
      {
        id: "isha-sunnat-1",
        name: "4 Rakat Sunnat (Ghair Muakkadah)",
        rakats: 4,
        type: "Sunnat Ghair Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الْعِشَاءِ سُنَّةً مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Isha ki sunnat, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Isha Sunnah, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Isha ke farz se pehle 4 rakat sunnat padhna mustahabb hai."
      },
      {
        id: "isha-farz",
        name: "4 Rakat Farz",
        rakats: 4,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الْعِشَاءِ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Isha ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Isha Farz, for the sake of Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Isha ke farz ki pehli do rakato me Imam buland aawaz se qira'at karta hai."
      },
      {
        id: "isha-sunnat-2",
        name: "2 Rakat Sunnat-e-Muakkadah",
        rakats: 2,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْعِشَاءِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Isha ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Isha Sunnah after Farz, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Farz ke baad 2 rakat sunnat-e-muakkadah padhna zaroori hai."
      },
      {
        id: "isha-witr",
        name: "3 Rakat Witr Wajib",
        rakats: 3,
        type: "Wajib",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى ثَلَاثَ رَكَعَاتٍ صَلَاةِ الْوِتْرِ وَاجِبًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 3 rakat namaz-e-Witr ki, Wajib Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 3 Rak'ats of Witr Wajib, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Teesri rakat me Surah Fatiha aur Surah ke baad kaano tak haath utha kar Allahu Akbar kehte hain aur Dua-e-Qunoot padhte hain."
      },
      {
        id: "isha-nafl",
        name: "2 Rakat Nafl",
        rakats: 2,
        type: "Nafl",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ النَّفْلِ مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz nafl ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Nafl after Witr, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Witr ke baad 2 rakat nafl baith kar padhna bhi Sunnat se saabit hai."
      }
    ]
  },
  {
    id: "jummah",
    name: "Jummah Mubarak (جمعہ)",
    time: "Friday Zuhr Time",
    portions: [
      {
        id: "jummah-sunnat-1",
        name: "4 Rakat Sunnat Qabl-az-Jummah",
        rakats: 4,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ الْجُمُعَةِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz Jummah ki sunnat (farz se pehle), Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats Sunnah before Friday prayer, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Khutbah shuru hone se pehle 4 rakat sunnat padh leni chahiye."
      },
      {
        id: "jummah-farz",
        name: "2 Rakat Farz Jummah (Ba-Jamat)",
        rakats: 2,
        type: "Farz",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ فَرْضِ الْجُمُعَةِ لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، إِقْتَدَيْتُ بِهَذَا الْإِمَامِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Jummah ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, peeche is Imam ke, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Friday Farz prayer, for the sake of Allah, facing the Ka'bah, behind this Imam, Allahu Akbar.",
        note: "Jummah Farz sirf Jamat ke saath ada hota hai, isme akele namaz nahi hoti."
      },
      {
        id: "jummah-sunnat-2",
        name: "4 Rakat Sunnat Ba'd-az-Jummah",
        rakats: 4,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ سُنَّةَ الْجُمُعَةِ لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz-e-Jummah ki sunnat (farz ke baad), Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats Sunnah after Friday prayer, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Farz ke baad 4 rakat aur uske baad 2 rakat sunnat padhi jaati hai."
      }
    ]
  },
  {
    id: "eid",
    name: "Eidain — Eid-ul-Fitr & Eid-ul-Adha (عیدین)",
    time: "Morning after Ishraq",
    portions: [
      {
        id: "eid-fitr",
        name: "2 Rakat Eid-ul-Fitr Wajib (6 Zayed Takbeerat)",
        rakats: 2,
        type: "Wajib",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ عِيدِ الْفِطْرِ مَعَ سِتِّ تَكْبِيرَاتٍ وَاجِبًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، إِقْتَدَيْتُ بِهَذَا الْإِمَامِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Eid-ul-Fitr ki, ma' 6 zayed Takbeeron ke, Wajib Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, peeche is Imam ke, Allahu Akbar.",
        english: "I intend to pray 2 Rak'ats of Eid-ul-Fitr Wajib with 6 additional Takbeers, for Allah, facing the Ka'bah, behind this Imam, Allahu Akbar.",
        note: "Pehli rakat me Sana ke baad 3 zayed takbeerat, aur doosri rakat me ruku se pehle 3 zayed takbeerat kahi jaati hain."
      },
      {
        id: "eid-adha",
        name: "2 Rakat Eid-ul-Adha Wajib (6 Zayed Takbeerat)",
        rakats: 2,
        type: "Wajib",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ عِيدِ الْأَضْحَى مَعَ سِتِّ تَكْبِيرَاتٍ وَاجِبًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، إِقْتَدَيْتُ بِهَذَا الْإِمَامِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Eid-ul-Adha ki, ma' 6 zayed Takbeeron ke, Wajib Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, peeche is Imam ke, Allahu Akbar.",
        english: "I intend to pray 2 Rak'ats of Eid-ul-Adha Wajib with 6 additional Takbeers, for Allah, facing the Ka'bah, behind this Imam, Allahu Akbar.",
        note: "Eid-ul-Adha ki namaz ke baad khutbah sunna aur Takbeer-e-Tashreeq padhna masnoon hai."
      }
    ]
  },
  {
    id: "janazah",
    name: "Namaz-e-Janazah (نماز جنازہ)",
    time: "Funeral Prayer",
    portions: [
      {
        id: "janazah-prayer",
        name: "4 Takbeerat Farz-e-Kifayah (Bila Ruku wa Sajdah)",
        rakats: 0,
        type: "Farz-e-Kifayah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى صَلَاةَ الْجَنَازَةِ أَرْبَعَ تَكْبِيرَاتٍ فَرْضَ الْكِفَايَةِ، الثَّنَاءُ لِلَّهِ تَعَالَى، وَالصَّلَاةُ عَلَى النَّبِيِّ ﷺ، وَالدُّعَاءُ لِهَذَا الْمَيِّتِ، مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، إِقْتَدَيْتُ بِهَذَا الْإِمَامِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine namaz-e-janazah ki, 4 takbeeron ke saath, Farz-e-Kifayah, Sana waaste Allah Ta'ala ke, Durood waaste Rasoolullah ﷺ ke, aur Dua is mayyit ke liye, mu-nha mera Kaaba Shareef ki taraf, peeche is Imam ke, Allahu Akbar.",
        english: "I intend to offer the funeral prayer (Janazah) with 4 Takbeers as Farz-e-Kifayah: praise for Allah, Durood for the Prophet ﷺ, and supplication for this deceased, facing the Ka'bah, behind this Imam, Allahu Akbar.",
        note: "Janazah me ruku aur sajdah nahi hota, sirf khade hokar 4 takbeerat kahi jaati hain: 1st ke baad Sana, 2nd ke baad Durood-e-Ibrahim, 3rd ke baad Dua-e-Janazah, 4th ke baad Salaam."
      }
    ]
  },
  {
    id: "special",
    name: "Taraweeh, Tahajjud & Nafl (تراویح، تہجد و نفل)",
    time: "Night & Special Occasions",
    portions: [
      {
        id: "taraweeh",
        name: "2 Rakat Taraweeh (Ramadan Nightly)",
        rakats: 2,
        type: "Sunnat-e-Muakkadah",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ التَّرَاوِيحِ سُنَّةَ رَسُولِ اللَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ (إِقْتَدَيْتُ بِهَذَا الْإِمَامِ)، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Taraweeh ki, Sunnat Rasoolullah ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, [agar jamat me ho to: peeche is Imam ke], Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Taraweeh prayer, Sunnah of the Prophet, for Allah, facing the Ka'bah [behind this Imam], Allahu Akbar.",
        note: "Ramadan me har 2 rakat par naye sire se niyyat karke kul 20 rakat padhi jaati hai."
      },
      {
        id: "tahajjud",
        name: "2 Rakat Tahajjud (Salat-ul-Layl)",
        rakats: 2,
        type: "Sunnat / Mustahabb",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ التَّهَجُّدِ مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz-e-Tahajjud ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Tahajjud night prayer, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Raat ko sokar uthne ke baad aakhri pehar me padhna sabse afzal nafl namaz hai."
      },
      {
        id: "qaza",
        name: "Qaza Namaz (Chhooti Hui Namaz)",
        rakats: 4,
        type: "Farz (Qaza)",
        arabic: "نَوَيْتُ أَنْ أُقْضِيَ صَلَاةَ (الْفَجْرِ / الظُّهْرِ / الْعَصْرِ / الْمَغْرِبِ / الْعِشَاءِ) الْفَائِتَةَ فَرْضًا لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine apni sabse pehli (ya sabse aakhri) chhooti hui [Fajr/Zuhr/Asr/Maghrib/Isha] ki, Farz Allah Ta'ala ke, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to make up the first (or last) missed obligatory prayer of [Prayer Name], for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Qaza-e-Umri ke liye ta'ayyun zaroori hai, isliye 'sabse pehli chhooti hui' ya 'sabse aakhri chhooti hui' ka irada kiya jata hai."
      },
      {
        id: "hajat",
        name: "2 Rakat Salatul Hajat (Needs & Dua)",
        rakats: 2,
        type: "Nafl",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى رَكْعَتَيْ صَلَاةِ الْحَاجَةِ مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 2 rakat namaz Salatul Hajat ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 2 Rak'ats of Salatul Hajat (Prayer of Need), for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Jab bhi koi zarurat ya mushkil darpesh ho to wudu karke do rakat padhein aur dua maangein."
      },
      {
        id: "tasbih",
        name: "4 Rakat Salatul Tasbih (Gunahon Ki Maafi)",
        rakats: 4,
        type: "Nafl",
        arabic: "نَوَيْتُ أَنْ أُصَلِّيَ لِلَّهِ تَعَالَى أَرْبَعَ رَكَعَاتٍ صَلَاةِ التَّسْبِيحِ لِلَّهِ تَعَالَى مُتَوَجِّهًا إِلَى جِهَةِ الْكَعْبَةِ الشَّرِيفَةِ، اللهُ أَكْبَرُ",
        hinglish: "Niyyat ki maine 4 rakat namaz Salatul Tasbih ki, waaste Allah Ta'ala ke, mu-nha mera Kaaba Shareef ki taraf, Allahu Akbar.",
        english: "I intend to offer 4 Rak'ats of Salatul Tasbih, for the sake of Allah, facing the Ka'bah, Allahu Akbar.",
        note: "Isme kul 300 martaba teesra kalima 'Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu akbar' padha jata hai."
      }
    ]
  }
];

export function NamazNiyyahPage({ onNavigateGuide, showToast }) {
  const [selectedPrayerId, setSelectedPrayerId] = useState("fajr");
  const [selectedPortionId, setSelectedPortionId] = useState("fajr-farz");
  const [isJammat, setIsJammat] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activePrayer = PRAYERS_DATA.find((p) => p.id === selectedPrayerId) || PRAYERS_DATA[0];
  const activePortion =
    activePrayer.portions.find((pt) => pt.id === selectedPortionId) || activePrayer.portions[0];

  const handleSelectPrayer = (pId) => {
    setSelectedPrayerId(pId);
    const p = PRAYERS_DATA.find((item) => item.id === pId);
    if (p && p.portions.length > 0) {
      setSelectedPortionId(p.portions[0].id);
    }
  };

  const getCustomHinglishNiyyah = () => {
    let text = activePortion.hinglish;
    if (isJammat) {
      text = text.replace(/\[agar jamat me ho to: peeche is Imam ke\]/g, "peeche is Imam ke");
    } else {
      text = text.replace(/\[agar jamat me ho to: peeche is Imam ke\]/g, "");
    }
    return text.replace(/\s+/g, " ").trim();
  };

  const getCustomArabicNiyyah = () => {
    let text = activePortion.arabic;
    if (isJammat) {
      text = text.replace(/\(إِقْتَدَيْتُ بِهَذَا الْإِمَامِ\)/g, "إِقْتَدَيْتُ بِهَذَا الْإِمَامِ");
    } else {
      text = text.replace(/\(إِقْتَدَيْتُ بِهَذَا الْإِمَامِ\)/g, "");
    }
    return text.replace(/\s+/g, " ").trim();
  };

  const handleCopyNiyyah = () => {
    const textToCopy = `${activePortion.name}\nArabic: ${getCustomArabicNiyyah()}\nUrdu/Hinglish: ${getCustomHinglishNiyyah()}\nEnglish: ${activePortion.english}\n— NoorLife Namaz Guide`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    if (showToast) showToast(`Niyyat copied to clipboard! 📋`);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakNiyyah = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(getCustomHinglishNiyyah());
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = "hi-IN";
      window.speechSynthesis.speak(utterance);
      if (showToast) showToast("Playing Niyyah pronunciation 🔊");
    } else {
      if (showToast) showToast("Audio speech not supported in this browser.");
    }
  };

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      {/* Page Header */}
      <div className="page-view-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "20px" }}>🤲</span>
            <h2 style={{ margin: 0 }}>Har Namaz Ki Niyyat (All Prayers Intention Guide)</h2>
          </div>
          <p>
            5 Farz Namazein, Jummah, Witr, Taraweeh, Eidain, Janazah, aur Qaza Namaz ki sahih aur masnoon niyyat ka mukammal tarika.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {onNavigateGuide && (
            <button
              className="card-action-btn-green"
              onClick={onNavigateGuide}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border-color)",
                boxShadow: "none"
              }}
            >
              <BookOpen size={15} color="var(--primary-green)" />
              <span>Step-by-Step Namaz Guide</span>
            </button>
          )}
        </div>
      </div>

      {/* CORE RULE CARD: NIYYAT KA SHAR'I MASLA */}
      <div
        className="dashboard-card"
        style={{
          padding: "16px 20px",
          background: "linear-gradient(135deg, #174232 0%, #266b4f 100%)",
          color: "#ffffff",
          marginBottom: "18px",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 4px 16px rgba(23, 66, 50, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(198, 162, 86, 0.25)",
              border: "1px solid var(--accent-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Heart size={18} color="var(--accent-gold-light)" fill="var(--accent-gold-light)" />
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "14.5px", fontWeight: "800", color: "#ffffff" }}>
              Niyyat Ka Bunyadi Masla (Dil Ka Pakka Irada)
            </h4>
            <p style={{ margin: 0, fontSize: "12px", color: "#e2ede6", lineHeight: "1.5" }}>
              Niyyat asal me <strong>dil ke pakke irade</strong> ka naam hai. Agar zuban se arbi me na kahein, balke apni aam zuban (Hindi/Urdu) me kahein ya sirf dil me irada rakhein ke <em>"Main Allah ke liye Fajr ki 2 rakat farz padh raha hoon"</em>, to namaz bila shubah sahih ho jati hai. Zuban se ada karna mustahabb hai taaki dil aur zuban dono mutawajjah rahein.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE NIYYAH BUILDER TOOL */}
      <div className="dashboard-card" style={{ padding: "22px", marginBottom: "22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h3 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-heading)", margin: 0 }}>
              Interactive Niyyah Finder (Niyyat Generator)
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
              Namaz select karein, Farz/Sunnat chunein, aur Akele ya Jamat ka option choose karein.
            </p>
          </div>

          {/* Jamat Switcher Pill */}
          <div
            style={{
              display: "inline-flex",
              background: "var(--bg-subtle)",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              border: "1px solid var(--border-color)",
            }}
          >
            <button
              onClick={() => setIsJammat(false)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: !isJammat ? "var(--primary-green)" : "transparent",
                color: !isJammat ? "#ffffff" : "var(--text-heading)",
                fontSize: "12px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <User size={13} />
              <span>Akele (Munfarid)</span>
            </button>
            <button
              onClick={() => setIsJammat(true)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                background: isJammat ? "var(--primary-green)" : "transparent",
                color: isJammat ? "#ffffff" : "var(--text-heading)",
                fontSize: "12px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Users size={13} />
              <span>Imam Ke Peeche (Ba-Jamat)</span>
            </button>
          </div>
        </div>

        {/* Step 1: Prayer Selection Tabs */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
            1. Select Prayer (Namaz Ka Intekhab Karein):
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {PRAYERS_DATA.map((p) => {
              const isSelected = selectedPrayerId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPrayer(p.id)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-pill)",
                    border: isSelected ? "1.5px solid var(--primary-green)" : "1px solid var(--border-color)",
                    background: isSelected ? "var(--primary-green)" : "var(--bg-subtle)",
                    color: isSelected ? "#ffffff" : "var(--text-heading)",
                    fontWeight: isSelected ? "800" : "600",
                    fontSize: "12.5px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Portion / Rakat Selection */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
            2. Select Portion / Rakat (Farz, Sunnat ya Wajib):
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {activePrayer.portions.map((pt) => {
              const isSelected = selectedPortionId === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPortionId(pt.id)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "var(--radius-md)",
                    border: isSelected ? "1.5px solid var(--accent-gold)" : "1px solid var(--border-color)",
                    background: isSelected ? "var(--accent-cream)" : "var(--bg-card)",
                    color: isSelected ? "var(--primary-green)" : "var(--text-heading)",
                    fontWeight: isSelected ? "800" : "500",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>{pt.name}</span>
                  {isSelected && <Check size={13} color="var(--primary-green)" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: GENERATED NIYYAH OUTPUT DISPLAY BOX */}
        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1.5px solid var(--primary-green)",
            borderRadius: "var(--radius-lg)",
            padding: "22px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
            <div>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: "800",
                  background: "var(--primary-green)",
                  color: "#ffffff",
                  padding: "3px 9px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {activePortion.type} • {isJammat ? "👥 Ba-Jamat (Behind Imam)" : "👤 Akele (Munfarid)"}
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", marginTop: "6px" }}>
                {activePortion.name} Ki Niyyat
              </h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={speakNiyyah}
                className="action-icon-btn"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--primary-green)",
                }}
                title="Listen Niyyah Pronunciation"
              >
                <Volume2 size={16} />
              </button>

              <button
                onClick={handleCopyNiyyah}
                className="card-action-btn-green"
                style={{ padding: "6px 14px", fontSize: "11.5px", gap: "5px" }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied!" : "Copy Niyyah"}</span>
              </button>
            </div>
          </div>

          {/* 1. Arabic Niyyah */}
          <div
            style={{
              fontFamily: "var(--font-arabic)",
              fontSize: "24px",
              lineHeight: "1.8",
              textAlign: "right",
              direction: "rtl",
              color: "var(--primary-green)",
              padding: "12px 14px",
              background: "var(--bg-card)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              marginBottom: "12px",
            }}
          >
            {getCustomArabicNiyyah()}
          </div>

          {/* 2. Roman Hinglish & Urdu Lafzi Niyyat */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-md)",
              padding: "14px 18px",
              borderLeft: "4px solid var(--accent-gold)",
              marginBottom: "10px",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              Urdu / Hinglish Niyyat (Bolne Ka Alfaaz):
            </div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-heading)", lineHeight: "1.6" }}>
              "{getCustomHinglishNiyyah()}"
            </div>
          </div>

          {/* 3. English Meaning */}
          <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", padding: "0 6px" }}>
            <strong>English:</strong> {activePortion.english}
          </div>

          {/* Note / Hadith tip */}
          {activePortion.note && (
            <div
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "rgba(198, 162, 86, 0.12)",
                border: "1px solid rgba(198, 162, 86, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--text-heading)",
              }}
            >
              <Info size={14} color="#b45309" style={{ flexShrink: 0 }} />
              <span>{activePortion.note}</span>
            </div>
          )}
        </div>
      </div>

      {/* QUICK BROWSE MASTER DIRECTORY CARDS */}
      <div style={{ marginBottom: "26px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-heading)", marginBottom: "14px" }}>
          All Namaz Niyyah Directory (Sabhi Namazo Ki Niyyat)
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "16px" }}>
          {PRAYERS_DATA.map((prayer) => (
            <div
              key={prayer.id}
              className="dashboard-card"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderTop: "4px solid var(--primary-green)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", margin: 0 }}>
                    {prayer.name}
                  </h4>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{prayer.time}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                  {prayer.portions.map((pt) => (
                    <div
                      key={pt.id}
                      style={{
                        padding: "10px 12px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--primary-green)" }}>
                          {pt.name}
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", background: "var(--bg-card)", padding: "2px 6px", borderRadius: "var(--radius-pill)" }}>
                          {pt.type}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-heading)", lineHeight: "1.45" }}>
                        "{pt.hinglish.replace(/\[agar jamat me ho to: peeche is Imam ke\]/g, "")}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => {
                    handleSelectPrayer(prayer.id);
                    window.scrollTo({ top: 180, behavior: "smooth" });
                  }}
                  className="card-action-btn-green"
                  style={{ padding: "5px 12px", fontSize: "11px", gap: "4px" }}
                >
                  <span>Open in Niyyah Builder</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP-BY-STEP RULES: HOW TO PROPERLY MAKE NIYYAH */}
      <div
        className="dashboard-card"
        style={{
          padding: "22px",
          background: "var(--bg-card)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", marginBottom: "14px" }}>
          Niyyat Karne Ka Sahi Aur Masnoon Tarika (4 Steps)
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          <div style={{ padding: "14px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary-green)" }}>STEP 1: QIBLA RUKH</div>
            <h5 style={{ margin: "4px 0 6px", fontSize: "13.5px", color: "var(--text-heading)" }}>Qibla Ki Taraf Khade Hon</h5>
            <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
              Ba-wudu hokar paak jagah par Kaaba Shareef ki taraf rukh karke ba-adab khade hon. Dono paon ke darmiyan 4 ungliyon ka faasla rakhein.
            </p>
          </div>

          <div style={{ padding: "14px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary-green)" }}>STEP 2: DIL KA IRADA</div>
            <h5 style={{ margin: "4px 0 6px", fontSize: "13.5px", color: "var(--text-heading)" }}>Dil Me Niyyat Haazir Karein</h5>
            <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
              Apne dil me pukhta irada karein ke main is waqt Allah ke liye kis waqt ki namaz (Farz ya Sunnat) padh raha hoon.
            </p>
          </div>

          <div style={{ padding: "14px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary-green)" }}>STEP 3: ZUBAN SE ALFAAZ</div>
            <h5 style={{ margin: "4px 0 6px", fontSize: "13.5px", color: "var(--text-heading)" }}>Zuban Se Bolna (Mustahabb)</h5>
            <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
              Dil ke irade ko zuban se aahista keh lena behtar hai, jaise: <em>"Niyyat ki maine 2 rakat Fajr farz waaste Allah Ta'ala ke..."</em>
            </p>
          </div>

          <div style={{ padding: "14px", background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--primary-green)" }}>STEP 4: TAKBEER-E-TAHREEMA</div>
            <h5 style={{ margin: "4px 0 6px", fontSize: "13.5px", color: "var(--text-heading)" }}>Allahu Akbar Kah Kar Haath Bandhein</h5>
            <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
              Niyyat karte hi dono haath kaano tak uthayein aur <strong>Allahu Akbar</strong> keh kar naaf ke neeche (auratein seene par) bandh lein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
