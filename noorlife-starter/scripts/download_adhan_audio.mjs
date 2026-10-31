import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../public/audio/adhan');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const adhams = [
  {
    name: 'adhan_makkah.mp3',
    url: 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Ali_Ibn_Ahmad_Mala_HQ.mp3'
  },
  {
    name: 'adhan_madinah.mp3',
    url: 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Adhan_Al_Haram_Al_Madani_-_Al_Madinah_1_(%D8%A3%D8%B0%D8%A7%D9%86_%D8%A7%D9%84%D8%AD%D8%B1%D9%85_%D8%A7%D9%84%D9%85%D8%AF%D9%86%D9%8A_-_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9).mp3'
  },
  {
    name: 'adhan_alafasy.mp3',
    url: 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Mishary_Rashid_Alafasy_1_-_Kuwait_(%D9%85%D8%B4%D8%A7%D8%B1%D9%8A_%D8%B1%D8%A7%D8%B4%D8%AF_%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A_-_%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA).mp3'
  },
  {
    name: 'adhan_fajr.mp3',
    url: 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Adhan_Fajr_Al_Haram_Al_Maki_(%D8%A3%D8%B0%D8%A7%D9%86_%D8%A7%D9%84%D9%81%D8%AC%D8%B1_%D8%A7%D9%84%D8%AD%D8%B1%D9%85_%D8%A7%D9%84%D9%85%D9%83%D9%8A).mp3'
  }
];

async function start() {
  console.log("Downloading authentic adhan files into:", targetDir);
  for (const a of adhams) {
    const dest = path.join(targetDir, a.name);
    try {
      console.log(`Downloading ${a.name}...`);
      await download(a.url, dest);
      const stats = fs.statSync(dest);
      console.log(`[SUCCESS] ${a.name} saved! Size: ${stats.size} bytes`);
    } catch (err) {
      console.error(`[ERROR] ${a.name}:`, err.message);
    }
  }
  console.log("Done downloading Adhans!");
}

start();
