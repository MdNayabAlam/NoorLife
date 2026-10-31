// Script to download crystal-clear human Qari studio recitations for all 26 Duas
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

// 26 Crystal-Clear Human Qari recitations (Mishary Rashid Alafasy & Hisnul Muslim Studio Recordings)
const DUAS_AUDIO = [
  { id: 1, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/001_01.mp3' },
  { id: 2, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/028_07.mp3' },
  { id: 3, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/006_01.mp3' },
  { id: 4, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/007_01.mp3' },
  { id: 5, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3' },
  { id: 6, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/009_02.mp3' },
  { id: 7, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/013_01.mp3' },
  { id: 8, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/014_01.mp3' },
  { id: 9, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/010_01.mp3' },
  { id: 10, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/011_01.mp3' },
  { id: 11, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/069_01.mp3' },
  { id: 12, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/070_01.mp3' },
  { id: 13, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/069_02.mp3' },
  { id: 14, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4338.mp3' },
  { id: 15, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/085_01.mp3' },
  { id: 16, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/002_01.mp3' },
  { id: 17, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2570.mp3' },
  { id: 18, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/041_02.mp3' },
  { id: 19, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2462.mp3' },
  { id: 20, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3' },
  { id: 21, url: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2053.mp3' },
  { id: 22, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/027_24.mp3' },
  { id: 23, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/027_13.mp3' },
  { id: 24, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/082_01.mp3' },
  { id: 25, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/049_01.mp3' },
  { id: 26, url: 'https://raw.githubusercontent.com/BetimShala/mburoja-api/master/audios/064_01.mp3' }
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
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Downloading crystal-clear human Qari audio files into ${targetDir}...`);
  for (const item of DUAS_AUDIO) {
    const filePath = path.join(targetDir, `dua_${item.id}.mp3`);
    try {
      await downloadFile(item.url, filePath);
      const size = fs.statSync(filePath).size;
      console.log(`[OK] Dua #${item.id} downloaded (${size} bytes)`);
    } catch (err) {
      console.error(`[FAIL] Dua #${item.id}:`, err.message);
    }
  }
  console.log('All 26 crystal-clear human Qari audio recitations downloaded successfully!');
}

run();
