/**
 * NoorLife — Authentic Azaan Audio & Prayer Alert Service
 * Handles live automatic prayer detection, audio streaming, Web Audio fallback,
 * browser notifications, and user preferences.
 */

export const ADHAN_VOICES = [
  {
    id: "makkah",
    name: "Makkah Al-Mukarramah",
    muezzin: "Sheikh Ali Ibn Ahmad Mullah (Masjid al-Haram)",
    url: "/audio/adhan/adhan_makkah.mp3",
    badge: "Most Popular 🕋"
  },
  {
    id: "madinah",
    name: "Madinah Al-Munawwarah",
    muezzin: "Al-Haram Al-Madani (Prophet's Mosque)",
    url: "/audio/adhan/adhan_madinah.mp3",
    badge: "Peaceful 🕌"
  },
  {
    id: "alafasy",
    name: "Sheikh Mishary Rashid Alafasy",
    muezzin: "Mishary Alafasy (Kuwait)",
    url: "/audio/adhan/adhan_alafasy.mp3",
    badge: "Melodious 🌿"
  },
  {
    id: "fajr",
    name: "Fajr Special (Makkah)",
    muezzin: "Masjid al-Haram (With As-Salatu Khayrun Minan Nawm)",
    url: "/audio/adhan/adhan_fajr.mp3",
    badge: "Dawn Call 🌅"
  }
];

class AdhanService {
  constructor() {
    this.audio = null;
    this.listeners = new Set();
    this.state = {
      isPlaying: false,
      currentPrayer: null,
      currentVoice: this.getSavedVoice(),
      currentTime: 0,
      duration: 0,
      isAutoEnabled: this.getSavedAutoEnabled(),
      volume: this.getSavedVolume(),
      isMuted: false,
      autoplayBlocked: false,
      activePhraseIndex: 0
    };

    if (typeof window !== "undefined") {
      this.initAudio();
    }
  }

  getSavedVoice() {
    if (typeof localStorage === "undefined") return "makkah";
    return localStorage.getItem("noorlife_adhan_voice") || "makkah";
  }

  getSavedAutoEnabled() {
    if (typeof localStorage === "undefined") return true;
    const val = localStorage.getItem("noorlife_adhan_auto");
    return val === null ? true : val === "true";
  }

  getSavedVolume() {
    if (typeof localStorage === "undefined") return 1.0;
    const val = localStorage.getItem("noorlife_adhan_volume");
    return val ? parseFloat(val) : 1.0;
  }

  initAudio() {
    try {
      this.audio = new Audio();
      this.audio.preload = "auto";
      this.audio.volume = this.state.volume;

      this.audio.addEventListener("play", () => {
        this.updateState({ isPlaying: true, autoplayBlocked: false });
      });

      this.audio.addEventListener("pause", () => {
        this.updateState({ isPlaying: false });
      });

      this.audio.addEventListener("ended", () => {
        this.updateState({ isPlaying: false, currentTime: 0, activePhraseIndex: 0 });
      });

      this.audio.addEventListener("timeupdate", () => {
        if (!this.audio) return;
        const ct = this.audio.currentTime;
        const dur = this.audio.duration || 0;
        // Estimate phrase index based on fraction of recitation (7 phases)
        const progress = dur > 0 ? ct / dur : 0;
        const phraseIdx = Math.min(Math.floor(progress * 7), 6);
        this.updateState({
          currentTime: ct,
          duration: dur,
          activePhraseIndex: phraseIdx
        });
      });

      this.audio.addEventListener("error", (e) => {
        console.warn("Adhan audio load/playback notice:", e);
        // Play melodic Web Audio synthesizer chime if MP3 fails
        this.playWebAudioChime();
      });
    } catch (e) {
      console.warn("Audio init warning:", e);
    }
  }

  updateState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setAutoEnabled(enabled) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("noorlife_adhan_auto", enabled ? "true" : "false");
    }
    this.updateState({ isAutoEnabled: enabled });
  }

  setVoice(voiceId) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("noorlife_adhan_voice", voiceId);
    }
    this.updateState({ currentVoice: voiceId });
    if (this.state.isPlaying) {
      this.playAdhan(this.state.currentPrayer, voiceId);
    }
  }

  setVolume(vol) {
    const clamped = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = clamped;
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("noorlife_adhan_volume", clamped.toString());
    }
    this.updateState({ volume: clamped, isMuted: clamped === 0 });
  }

  toggleMute() {
    if (!this.audio) return;
    if (this.state.isMuted) {
      const restore = this.getSavedVolume() || 0.8;
      this.audio.volume = restore;
      this.updateState({ volume: restore, isMuted: false });
    } else {
      this.audio.volume = 0;
      this.updateState({ isMuted: true });
    }
  }

  // Melodic Web Audio synthesizer fallback chime
  playWebAudioChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      // Islamic Maqam Bayati harmonious chords
      const notes = [293.66, 349.23, 440.0, 523.25, 587.33]; // D minor modal
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.22);
        osc.stop(ctx.currentTime + 3.5);
      });
    } catch (e) {
      // ignore
    }
  }

  // Request browser notification permission
  async requestNotificationPermission() {
    if (typeof window === "undefined" || !("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }

  // Show desktop notification
  showDesktopNotification(prayerName, city) {
    try {
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(`🕌 Azaan Time: ${prayerName}`, {
          body: `Waqt ho gaya hai ${prayerName} namaz ka in ${city || "your area"}. Hayya 'alas-Salah!`,
          icon: "/images/hero_mosque.jpg",
          badge: "/images/hero_mosque.jpg",
          silent: false
        });
      }
    } catch (e) {
      // ignore
    }
  }

  // Main playback trigger
  async playAdhan(prayerName = "Zuhr", voiceOverride = null) {
    if (!this.audio) this.initAudio();

    // Determine voice: Fajr default to special Fajr adhan unless custom chosen
    let voiceId = voiceOverride || this.state.currentVoice;
    if (prayerName === "Fajr" && (!voiceOverride || voiceOverride === "fajr")) {
      voiceId = "fajr";
    }

    const voiceObj = ADHAN_VOICES.find((v) => v.id === voiceId) || ADHAN_VOICES[0];

    try {
      this.audio.src = voiceObj.url;
      this.audio.currentTime = 0;
      this.audio.volume = this.state.volume;

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.updateState({
          isPlaying: true,
          currentPrayer: prayerName,
          currentVoice: voiceId,
          autoplayBlocked: false
        });
        return { success: true };
      }
    } catch (err) {
      console.warn("Browser autoplay restriction detected:", err.message);
      // Autoplay blocked by browser policy until user interacts
      this.updateState({
        isPlaying: false,
        currentPrayer: prayerName,
        currentVoice: voiceId,
        autoplayBlocked: true
      });
      // Try playing melodic synthesizer chime as light fallback
      this.playWebAudioChime();
      return { success: false, blockedByAutoplay: true };
    }
    return { success: true };
  }

  stopAdhan() {
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
      } catch (e) {
        // ignore
      }
    }
    this.updateState({
      isPlaying: false,
      currentTime: 0,
      activePhraseIndex: 0,
      autoplayBlocked: false
    });
  }

  /**
   * Prayer Time Checker (called by interval timer)
   * Converts timings and local time to check if a prayer time has arrived
   */
  checkAndTriggerPrayer(prayerData, onTriggerCallback) {
    if (!this.state.isAutoEnabled || !prayerData?.timings) return;

    const timings = prayerData.timings;
    const keyPrayers = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"];
    
    // Get current city time in 12-hour format "05:06 AM" or similar
    let currentCityDate = new Date();
    if (prayerData.timezone) {
      try {
        currentCityDate = new Date(new Date().toLocaleString("en-US", { timeZone: prayerData.timezone }));
      } catch (e) {
        currentCityDate = new Date();
      }
    }

    const currentHours = currentCityDate.getHours();
    const currentMins = currentCityDate.getMinutes();
    const currentTotalMins = currentHours * 60 + currentMins;

    // Date stamp for today
    const dateKey = `${currentCityDate.getFullYear()}-${currentCityDate.getMonth() + 1}-${currentCityDate.getDate()}`;
    const storageKey = `noorlife_adhan_triggered_${dateKey}`;

    let triggeredToday = [];
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) triggeredToday = JSON.parse(saved);
    } catch (e) {
      triggeredToday = [];
    }

    for (const prayer of keyPrayers) {
      const prayerTimeStr = timings[prayer];
      if (!prayerTimeStr) continue;

      const prayerMins = this.parseTimeStringToMinutes(prayerTimeStr);
      if (prayerMins === null) continue;

      // If current time matches within the current minute (and not triggered yet today)
      if (currentTotalMins === prayerMins && !triggeredToday.includes(prayer)) {
        // Mark triggered
        triggeredToday.push(prayer);
        try {
          localStorage.setItem(storageKey, JSON.stringify(triggeredToday));
        } catch (e) {}

        console.log(`[AdhanService] 🕌 Azaan Time Arrived for ${prayer} at ${prayerTimeStr}! Triggering...`);

        // Trigger desktop push notification
        this.showDesktopNotification(prayer, prayerData.city);

        // Attempt playback
        this.playAdhan(prayer);

        // Notify app to show visual modal / banner alert
        if (onTriggerCallback) {
          onTriggerCallback(prayer);
        }
        break;
      }
    }
  }

  parseTimeStringToMinutes(timeStr) {
    if (!timeStr) return null;
    const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3] ? match[3].toUpperCase() : null;

    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }
}

export const adhanService = new AdhanService();

