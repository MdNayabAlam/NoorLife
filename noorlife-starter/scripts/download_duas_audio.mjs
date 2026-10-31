// Script to download authentic Arabic audio for all 26 Masnoon Duas
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/audio/duas');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 26 Authentic Duas
const DUAS = [
  {
    id: 1,
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ"
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا"
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ"
  },
  {
    id: 4,
    arabic: "غُفْرَانَكَ ، الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي"
  },
  {
    id: 5,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    quranUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
  },
  {
    id: 6,
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ"
  },
  {
    id: 7,
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ"
  },
  {
    id: 8,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ"
  },
  {
    id: 9,
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ"
  },
  {
    id: 10,
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا"
  },
  {
    id: 11,
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ"
  },
  {
    id: 12,
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ"
  },
  {
    id: 13,
    arabic: "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ"
  },
  {
    id: 14,
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ"
  },
  {
    id: 15,
    arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي"
  },
  {
    id: 16,
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ"
  },
  {
    id: 17,
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    quranUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2570.mp3"
  },
  {
    id: 18,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ"
  },
  {
    id: 19,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    quranUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2462.mp3"
  },
  {
    id: 20,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    quranUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3"
  },
  {
    id: 21,
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    quranUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2053.mp3"
  },
  {
    id: 22,
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ"
  },
  {
    id: 23,
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ"
  },
  {
    id: 24,
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"
  },
  {
    id: 25,
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ"
  },
  {
    id: 26,
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا"
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting audio download for 26 duas into ${targetDir}...`);
  for (const dua of DUAS) {
    const filePath = path.join(targetDir, `dua_${dua.id}.mp3`);
    let url = dua.quranUrl;
    if (!url) {
      // Clean Arabic text for TTS
      const cleanArabic = dua.arabic.replace(/[،؛]/g, ' ');
      url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanArabic)}&tl=ar&client=tw-ob`;
    }
    try {
      await downloadFile(url, filePath);
      const size = fs.statSync(filePath).size;
      console.log(`[OK] Dua #${dua.id} saved (${size} bytes)`);
    } catch (err) {
      console.error(`[FAIL] Dua #${dua.id}:`, err.message);
    }
  }
  console.log("Download complete!");
}

run();
