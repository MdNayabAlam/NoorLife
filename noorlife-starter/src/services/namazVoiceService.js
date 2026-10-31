/**
 * NoorLife — Namaz Guide Voice Engine (Aasan & Clear Hindi/Urdu + Arabic Voice)
 * Uses high-quality native Web Speech Synthesis voices to pronounce
 * simple, crystal-clear instructions and Arabic recitations at a calm, natural pace.
 */

class NamazVoiceService {
  constructor() {
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.voiceMode = "hindi"; // "hindi" or "arabic"
    this.speed = 0.88; // Calm, respectful pace for easy understanding
    this.listeners = new Set();

    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({
      isPlaying: this.isPlaying,
      voiceMode: this.voiceMode,
      speed: this.speed,
    });
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      voiceMode: this.voiceMode,
      speed: this.speed,
    };
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  setVoiceMode(mode) {
    this.voiceMode = mode;
    this.notify();
  }

  setSpeed(speedVal) {
    this.speed = speedVal;
    this.notify();
  }

  getBestVoice(langPrefix) {
    if (!this.voices || this.voices.length === 0) {
      this.initVoices();
    }
    // Priority order for Indian Hindi / Urdu
    if (langPrefix === "hi") {
      const preferred = this.voices.find(
        (v) =>
          (v.lang.startsWith("hi") || v.lang.startsWith("ur")) &&
          (v.name.includes("Swara") ||
            v.name.includes("Madhur") ||
            v.name.includes("Google") ||
            v.name.includes("Natural"))
      );
      if (preferred) return preferred;
      return (
        this.voices.find((v) => v.lang.startsWith("hi")) ||
        this.voices.find((v) => v.lang.startsWith("ur")) ||
        this.voices.find((v) => v.lang.startsWith("en-IN")) ||
        null
      );
    }

    if (langPrefix === "ar") {
      return (
        this.voices.find((v) => v.lang.startsWith("ar")) ||
        this.voices.find((v) => v.lang.includes("Arabic")) ||
        null
      );
    }

    return null;
  }

  /**
   * Speak the step in simple, understandable voice
   */
  speakStep(step, modeOverride = null) {
    if (!this.synth) return;

    this.stop();

    const mode = modeOverride || this.voiceMode;
    let textToSpeak = "";
    let lang = "hi-IN";

    if (mode === "arabic") {
      // Clean Arabic text
      textToSpeak = step.arabic || step.transliteration || "";
      lang = "ar-SA";
    } else {
      // Simple Hindi Speech text (easy to understand for everyone)
      textToSpeak = step.hindiSpeech || `${step.title}. ${step.meaning}. ${step.postureRule}`;
      lang = "hi-IN";
    }

    if (!textToSpeak.trim()) return;

    try {
      this.currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
      this.currentUtterance.lang = lang;
      this.currentUtterance.rate = this.speed;
      this.currentUtterance.pitch = 1.0;

      const voice = this.getBestVoice(lang.split("-")[0]);
      if (voice) {
        this.currentUtterance.voice = voice;
      }

      this.currentUtterance.onstart = () => {
        this.isPlaying = true;
        this.notify();
      };

      this.currentUtterance.onend = () => {
        this.isPlaying = false;
        this.currentUtterance = null;
        this.notify();
      };

      this.currentUtterance.onerror = (e) => {
        console.warn("Speech synthesis notice:", e);
        this.isPlaying = false;
        this.currentUtterance = null;
        this.notify();
      };

      this.synth.speak(this.currentUtterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      this.isPlaying = false;
      this.notify();
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.isPlaying = false;
    this.currentUtterance = null;
    this.notify();
  }
}

export const namazVoiceService = new NamazVoiceService();

