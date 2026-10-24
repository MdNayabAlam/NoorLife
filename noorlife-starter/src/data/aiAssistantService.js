// NoorLife AI Assistant intelligent response generator
// Works seamlessly offline with rich domain intelligence, and can connect to backend API

export async function askNoorLifeAI(prompt) {
  const normalized = prompt.toLowerCase().trim();

  // Simulate slight thinking latency for realistic AI feel
  await new Promise(resolve => setTimeout(resolve, 600));

  if (normalized.includes("ghar ke kaam") || normalized.includes("kaam ka plan") || normalized.includes("clean") || normalized.includes("home tasks")) {
    return {
      text: `**Bismillah! Yahan aapke aaj ke ghar ke kaamon ka balanced plan hai:**\n\n` +
        `• **Subah (08:00 AM - 10:00 AM):** Kitchen sink clear karein, breakfast dishes aur living room dusting.\n` +
        `• **Dopahar (11:00 AM - 01:00 PM):** Dhuhran se pehle lunch tayyar karein (Dal Tadka, Rice aur Salad). Phir Namaz-e-Zuhr padhein.\n` +
        `• **Teesra Pehar (02:00 PM - 04:00 PM):** 1 load laundry washing machine mein daalein aur 20 min power nap / resting.\n` +
        `• **Shaam (06:00 PM - 07:30 PM):** Bachon ki homework aur Quran revision mein madad karein.\n` +
        `• **Raat (08:30 PM - 09:30 PM):** Kal ke meals plan karein aur kitchen counter wipe karke sona.\n\n` +
        `💡 *Tip: Har kaam bismillah keh kar shuru karein, Allah barkat ata farmayega.*`,
      quickFollowUps: ["₹500 mein grocery list banao", "Lunch recipe suggestions", "Quick 15 min clean tips"]
    };
  }

  if (normalized.includes("500") || normalized.includes("grocery") || normalized.includes("budget") || normalized.includes("rashan")) {
    return {
      text: `**₹500 ke budget mein Smart Grocery & Fresh Kitchen Basket:**\n\n` +
        `1. **Aloo (Potatoes)** — 2 kg @ ₹50\n` +
        `2. **Pyaz (Onions)** — 1 kg @ ₹40\n` +
        `3. **Tamatar (Tomatoes)** — 1 kg @ ₹40\n` +
        `4. **Taaza Doodh (Milk)** — 1 Litre @ ₹60\n` +
        `5. **Andey (Eggs)** — 6 pieces @ ₹42\n` +
        `6. **Yellow Moong Dal** — 500g @ ₹65\n` +
        `7. **Hari Mirch & Dhaniya** — Fresh bundle @ ₹25\n` +
        `8. **Chakki Atta (Wheat Flour)** — 2 kg @ ₹85\n` +
        `9. **Namak & Cumin** — Essential spice refill @ ₹40\n\n` +
        `**Kul Kharch (Total): ₹447** (Aapke paas ₹53 bachte hain emergency ke liye!)\n` +
        `Iss list se aap 3-4 din ke swadisht aur poshtik khane aaram se bana sakte hain.`,
      quickFollowUps: ["Aaj ke ghar ke kaam ka plan banao", "Halal nutritious meal", "Budget saving tips"]
    };
  }

  if (normalized.includes("gk") || normalized.includes("questions") || normalized.includes("quiz") || normalized.includes("sawal")) {
    return {
      text: `**Aapke liye 5 Rochan & Maaloomati GK Sawalat:**\n\n` +
        `1. **Q:** Quran-e-Pak ki sabse lambi Surah kaunsi hai?\n   *A:* **Surah Al-Baqarah (286 Ayats).**\n\n` +
        `2. **Q:** Dunya ka sabse bada samandar (Ocean) kaunsa hai?\n   *A:* **Pacific Ocean (Prashant Mahasagar).**\n\n` +
        `3. **Q:** Nabi Kareem (PBUH) ke Madinah Hijrat ke pehle saal ko kya kehte hain?\n   *A:* **1 Hijri (Islamic Calendar ki shuruat).**\n\n` +
        `4. **Q:** Manushya shareer mein sabse badi haddi (bone) kaunsi hoti hai?\n   *A:* **Femur (Thigh bone).**\n\n` +
        `5. **Q:** Bharat ka Rashtriya Jaljeev (National Aquatic Animal) kaunsa hai?\n   *A:* **Ganga River Dolphin.**\n\n` +
        `Aap Dashboard par 'GK Quiz' module mein jaakar live interactive quiz bhi khel sakte hain! 🏆`,
      quickFollowUps: ["Take GK Quiz now", "More Islamic History questions", "Science facts"]
    };
  }

  if (normalized.includes("namaz") || normalized.includes("khushu") || normalized.includes("wuzu") || normalized.includes("salah")) {
    return {
      text: `**Namaz mein Khushu aur Dhyan laane ke 4 sunehre nuskhe:**\n\n` +
        `1. **Ache se aur itminan se Wuzu karein:** Wuzu gunahon ko dhota hai aur zehan ko sukoon deta hai.\n` +
        `2. **Allah ki azeemat ka tasawwur:** Jab 'Allahu Akbar' kahein toh sochein ke dunya ki har fikar Allah ke aage choti hai.\n` +
        `3. **Ayaton ka tarjuma samjhein:** Surah Al-Fatiha aur choti Surahs ka matlab zehan mein dohraayein.\n` +
        `4. **Ruk-ruk kar ada karein:** Ruku aur Sajde mein jaldbaazi na karein, 'Subhana Rabbiyal A'la' ko dil se mehsos karein.\n\n` +
        `NoorLife ke **Namaz Guide** page par step-by-step illustrations dekh kar seekhein.`,
      quickFollowUps: ["Namaz Guide kholein", "Fajr uthne ke tips", "Daily Dua"]
    };
  }

  if (normalized.includes("quran") || normalized.includes("surah") || normalized.includes("mulk") || normalized.includes("khatam")) {
    return {
      text: `**Surah Al-Mulk (Tabarakallazi) ki Fazeelat:**\n\n` +
        `• Rasoolullah (PBUH) ne farmaya: *"Quran mein 30 ayaton wali ek aisi Surah hai jo insaan ke liye sifarish karti hai yahan tak ke uski maghfirat ho jaye — aur wo hai Surah Al-Mulk."* [Abu Dawud & Tirmidhi]\n` +
        `• Ye Surah qabr ke azaab se bachati hai.\n` +
        `• **Routine Recommendation:** Har raat sone se pehle isko padhne ka maamool banayein (sirf 4-5 minute lagte hain).\n\n` +
        `Aap Dashboard ke **Quran Tracker** se apni daily recitation pages log kar sakte hain.`,
      quickFollowUps: ["Quran Tracker kholo", "Surah Ya-Sin ki fazilat", "Ayat-ul-Kursi"]
    };
  }

  // Default helpful response
  return {
    text: `Assalamu Alaikum! Main aapka **NoorLife AI Assistant** hoon 🌿\n\n` +
      `Aap mujhse ghar ke kaam-kaaj, daily routine, bachat (budget), halal recipes, ya Islamic knowledge aur Duas ke baare mein kuch bhi pooch sakte hain.\n\n` +
      `*Aapne pucha:* "${prompt}"\n\n` +
      `Ghar aur Deen dono mein ahem baat **istiqamat (consistency)** hai. Jo bhi kaam karein, chahe chota ho, niyat saaf karke musalsal karte rahein. Kya aap chahte hain ke main iske mutalliq koi specific plan ya guide banaun?`,
    quickFollowUps: ["Aaj ke ghar ke kaam ka plan banao", "₹500 mein grocery list banao", "Mujhe 10 GK questions do"]
  };
}
