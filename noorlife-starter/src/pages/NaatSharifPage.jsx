import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  Search,
  BookOpen,
  Download,
  Share2,
  Sparkles,
  Info,
  Check,
  RotateCcw,
  Music,
  ExternalLink,
  ChevronRight,
  ListMusic,
  Globe,
  Loader2,
  Mic,
  MicOff,
  X
} from "lucide-react";
import { naatSharifData, naatCategories } from "../data/naatSharifData";
import { searchNaatsOnlineAPI } from "../services/api";

export function NaatSharifPage({ showToast }) {
  // Playlist & active track
  const [playlist, setPlaylist] = useState(naatSharifData);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = playlist[currentTrackIndex] || naatSharifData[0];

  // Online Search State
  const [onlineResults, setOnlineResults] = useState([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineSearchQuery, setOnlineSearchQuery] = useState("");
  const [onlineSearchError, setOnlineSearchError] = useState(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTrack.durationSec || 0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("all"); // 'none' | 'one' | 'all'
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Naats");

  // Voice Search State
  const [isListening, setIsListening] = useState(false);
  const [isVoicePanelOpen, setIsVoicePanelOpen] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceLang, setVoiceLang] = useState("ur-PK"); // 'ur-PK' | 'hi-IN' | 'en-US'
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);

  // Favorites (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("noorlife_naat_favorites");
      return saved ? JSON.parse(saved) : ["naat-1", "naat-2", "naat-3"];
    } catch {
      return ["naat-1", "naat-2", "naat-3"];
    }
  });

  // Lyrics Drawer/Modal
  const [lyricsModalTrack, setLyricsModalTrack] = useState(null);
  const [lyricsFontSize, setLyricsFontSize] = useState(18);
  const [copiedLyrics, setCopiedLyrics] = useState(false);

  // Audio Element Ref
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("noorlife_naat_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Could not save favorites to localStorage", e);
    }
  }, [favorites]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentTrack.durationSec || 0);
      setIsLoadingAudio(false);
      setAudioError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleWaiting = () => {
      setIsLoadingAudio(true);
    };

    const handleCanPlay = () => {
      setIsLoadingAudio(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoadingAudio(false);
      setAudioError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        handleNextTrack();
      }
    };

    let retried = false;
    const handleError = () => {
      if (!retried && audio.src) {
        retried = true;
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play().catch(() => {});
          }
        }, 1000);
        return;
      }
      setIsLoadingAudio(false);
      setIsPlaying(false);
      setAudioError("Online audio stream buffer delayed. Click 'Retry' to reconnect.");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrack, repeatMode]);

  // Handle track switch
  const playTrack = (index, autoPlay = true, customList = null) => {
    const list = customList || playlist;
    const target = list[index];
    if (!target) return;

    setCurrentTrackIndex(index);
    setAudioError(null);
    setIsLoadingAudio(true);
    setCurrentTime(0);

    if (audioRef.current) {
      if (audioRef.current.src !== target.audioUrl) {
        audioRef.current.src = target.audioUrl;
      }
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.load();

      if (autoPlay) {
        const p = audioRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
            setIsLoadingAudio(false);
          }).catch((err) => {
            console.warn("Autoplay notice:", err);
            setIsPlaying(false);
            setIsLoadingAudio(false);
          });
        }
      }
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoadingAudio(true);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        })
        .catch((err) => {
          console.warn("Playback error:", err);
          setIsPlaying(false);
          setIsLoadingAudio(false);
          setAudioError("Unable to play stream. Checking fallback link...");
        });
    }
  };

  // Next Track
  const handleNextTrack = () => {
    if (playlist.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      playTrack(randomIndex, true);
    } else {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      playTrack(nextIndex, true);
    }
  };

  // Previous Track
  const handlePrevTrack = () => {
    if (playlist.length === 0) return;
    if (currentTime > 4) {
      // If played more than 4 seconds, restart current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      playTrack(prevIndex, true);
    }
  };

  // Seek bar click
  const handleSeek = (e) => {
    if (!audioRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    const targetTime = clampedPos * (duration || 1);
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // Volume slider
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.8;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Playback rate cycle
  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 0.85];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextIdx];
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
    if (showToast) showToast(`Playback speed set to ${newRate}x`);
  };

  // Toggle Repeat Mode
  const toggleRepeat = () => {
    const modes = ["all", "one", "none"];
    const nextMode = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
    setRepeatMode(nextMode);
    if (showToast) {
      const label = nextMode === "one" ? "Repeat Current Track" : nextMode === "all" ? "Repeat All Tracks" : "Repeat Off";
      showToast(label);
    }
  };

  // Toggle Favorite
  const toggleFavorite = (trackId, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId];
      if (showToast) {
        showToast(next.includes(trackId) ? "Added to Dilpasand (Favorites) ❤️" : "Removed from Favorites");
      }
      return next;
    });
  };

  // Filtered List for 15 Curated Naats
  const filteredNaats = naatSharifData.filter((naat) => {
    const matchesSearch =
      naat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      naat.reciter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      naat.urduTitle.includes(searchQuery) ||
      naat.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "Favorites") {
      return matchesSearch && favorites.includes(naat.id);
    }
    if (selectedCategory !== "All Naats" && selectedCategory !== "🌐 Online Library") {
      return matchesSearch && naat.category === selectedCategory;
    }
    return matchesSearch;
  });

  // Global Online Search Handler
  const handleGlobalSearch = async (queryToSearch, autoPlayFirst = false) => {
    const q = (queryToSearch !== undefined ? queryToSearch : searchQuery).trim();
    setIsSearchingOnline(true);
    setOnlineSearchQuery(q);
    setOnlineSearchError(null);
    try {
      const results = await searchNaatsOnlineAPI(q);
      setOnlineResults(results);
      if (results.length === 0) {
        setOnlineSearchError(`"${q}" ke mutabiq online audio nahi mila. Koi doosra lafz (e.g. Farhan Ali, Junaid, Maher Zain, Owais) try karein.`);
      } else {
        if (showToast) showToast(`Online library se ${results.length} naatein mil gayi hain! 🌐`);
        if (autoPlayFirst && results.length > 0) {
          playOnlineTrack(results[0]);
        }
      }
    } catch (err) {
      setOnlineSearchError("Online search momentarily unavailable.");
    } finally {
      setIsSearchingOnline(false);
    }
  };

  // Voice Search Handlers
  const startVoiceSearch = (lang = voiceLang) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    setIsVoicePanelOpen(true);
    setVoiceError(null);
    setVoiceTranscript("");

    if (!SpeechRecognition) {
      setVoiceError(
        "Aapke browser me Web Speech Recognition supported nahi hai. Kripya Google Chrome, Edge ya Safari use karein, ya neeche diye gaye popular naats par click karein."
      );
      if (showToast) {
        showToast("Voice recognition not supported in this browser. Please use Chrome/Edge.");
      }
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event) => {
        let interimText = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += trans;
          } else {
            interimText += trans;
          }
        }

        const recognized = (finalText || interimText).trim();
        setVoiceTranscript(recognized);

        if (finalText) {
          const cleanQuery = finalText.trim().replace(/[.,?!]+$/, "");
          if (cleanQuery) {
            handleVoiceQuerySubmit(cleanQuery);
          }
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === "no-speech") {
          setVoiceError("Koi aawaz nahi suni gayi. Mic button daba kar dobara bolein ya direct kisi Naat par click karein.");
        } else if (event.error === "not-allowed") {
          setVoiceError("Microphone permission blocked hai. Browser settings me microphone allow karein.");
        } else if (event.error === "audio-capture") {
          setVoiceError("Microphone device nahi mili. Kripya apna mic check karein.");
        } else {
          setVoiceError(`Voice recognition: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      setIsListening(false);
      setVoiceError("Microphone start karne me dikkat aayi. Kripya dobara try karein.");
    }
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopVoiceSearch();
    } else {
      startVoiceSearch(voiceLang);
    }
  };

  const handleVoiceQuerySubmit = (spokenQuery) => {
    if (!spokenQuery || !spokenQuery.trim()) return;
    const clean = spokenQuery.trim().replace(/[.,?!]+$/, "");
    setSearchQuery(clean);
    stopVoiceSearch();
    setIsVoicePanelOpen(false);
    handleGlobalSearch(clean, true);
    if (showToast) {
      showToast(`🎙️ Voice Search: "${clean}"`);
    }
  };

  const handleLanguageChange = (newLang) => {
    setVoiceLang(newLang);
    if (isListening) {
      stopVoiceSearch();
      setTimeout(() => startVoiceSearch(newLang), 150);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  // Play Online Track
  const playOnlineTrack = (track) => {
    // 1. Smoothly scroll player into view
    const playerEl = document.querySelector(".naat-master-player-wrapper");
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // 2. Play immediately in audioRef
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.load();
      setIsLoadingAudio(true);
      setAudioError(null);
      const p = audioRef.current.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        }).catch((err) => {
          console.warn("Autoplay notice:", err);
          setIsPlaying(false);
          setIsLoadingAudio(false);
        });
      }
    }

    // 3. Add to playlist and update index
    setPlaylist((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === track.id || t.audioUrl === track.audioUrl);
      if (existingIdx !== -1) {
        setCurrentTrackIndex(existingIdx);
        return prev;
      } else {
        const nextList = [...prev, track];
        setCurrentTrackIndex(nextList.length - 1);
        return nextList;
      }
    });

    if (showToast) showToast(`Now Streaming: ${track.title} 🎵`);
  };

  // Auto-search online on typing with 400ms debounce
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length >= 2) {
      const timer = setTimeout(() => {
        handleGlobalSearch(q);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // When '🌐 Online Library' category is selected, load default online library if empty
  useEffect(() => {
    if (selectedCategory === "🌐 Online Library" && onlineResults.length === 0 && !isSearchingOnline) {
      handleGlobalSearch("");
    }
  }, [selectedCategory]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Copy lyrics
  const handleCopyLyrics = (naat) => {
    const text = `${naat.title} (${naat.urduTitle})\nReciter: ${naat.reciter}\n\n${naat.lyricsUrdu.join("\n")}\n\nRoman Urdu:\n${naat.lyricsRoman.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
    if (showToast) showToast("Kalaam text copied to clipboard!");
  };

  // Retry playback
  const handleRetry = () => {
    setAudioError(null);
    setIsLoadingAudio(true);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
          if (showToast) showToast("Resumed Naat Sharif stream successfully!");
        })
        .catch(() => {
          setIsLoadingAudio(false);
          setAudioError("Stream reconnecting... You can also download the MP3 directly.");
        });
    }
  };

  // Offline Web Audio Spiritual Tone Synthesizer fallback
  const playSpiritualAmbientDrone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz healing harmonic
      osc.frequency.exponentialRampToValueAtTime(324, ctx.currentTime + 3);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 4.6);
      if (showToast) showToast("Spiritual tone played (Offline Audio Chime)");
    } catch (e) {
      console.warn("Audio synthesizer notice", e);
    }
  };

  // Keyboard shortcut listener (Spacebar = toggle play)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="naat-page-container">
      {/* Hidden HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
      />

      {/* Hero Header Banner */}
      <div className="naat-hero-banner">
        <div className="naat-hero-glow" />
        <div className="naat-hero-content">
          <div className="naat-hero-badge">
            <Sparkles size={14} className="sparkle-anim" />
            <span>Roohani Sukoon • 15 Mustanad Kalaam & Global Search 🌐</span>
          </div>
          <h1 className="naat-hero-title">
            نعت شریف <span className="naat-hero-title-en">— Naat Sharif</span>
          </h1>
          <p className="naat-hero-sub">
            Gumbad-e-Khazra aur Sarkar-e-Do Aalam ﷺ ki yaad me dilkash o noorani naatein.
            15 curated kalaams plus instant global online search for any Naat in the world!
          </p>

          <div className="naat-hero-stats">
            <div className="stat-pill">
              <strong>15</strong>
              <span>Curated Naats</span>
            </div>
            <div className="stat-pill">
              <strong>100%</strong>
              <span>HQ Audio</span>
            </div>
            <div className="stat-pill">
              <strong>{favorites.length}</strong>
              <span>Dilpasand (Favs)</span>
            </div>
            <div className="stat-pill" style={{ background: "rgba(224, 242, 254, 0.25)", borderColor: "rgba(3, 105, 161, 0.4)" }}>
              <Globe size={13} color="#38bdf8" />
              <span>Global Search</span>
            </div>
            <button
              className="stat-pill-btn"
              onClick={() => playTrack(0, true)}
              title="Play from start"
            >
              <Play size={13} fill="currentColor" />
              <span>Play All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Master Audio Player Card */}
      <div className="naat-player-master-card">
        {/* Animated Background Atmosphere */}
        <div
          className="player-ambient-blur"
          style={{ background: currentTrack.gradient || "linear-gradient(135deg, #064e3b, #047857)" }}
        />

        <div className="player-inner-content">
          {/* Left: Album Artwork with Rotating Vinyl Disc */}
          <div className="player-art-wrapper">
            <div className={`player-vinyl-disc ${isPlaying ? "spinning" : ""}`}>
              <div className="vinyl-grooves" />
              <div className="vinyl-center-label">
                <Music size={18} color="#e5b84c" />
              </div>
            </div>

            <div className="player-art-box">
              <div className="player-art-dome-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2 C8 6 5 11 5 17 L19 17 C19 11 16 6 12 2 Z"
                    fill="url(#mp_emerald)"
                  />
                  <line x1="12" y1="2" x2="12" y2="0" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="mp_emerald" x1="5" y1="2" x2="19" y2="17" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="60%" stopColor="#15803d" />
                      <stop offset="100%" stopColor="#052e16" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="player-art-arabic">{currentTrack.urduTitle?.split(" ")[0]}</span>
            </div>
          </div>

          {/* Right: Info, Progress, Controls */}
          <div className="player-details-column">
            {/* Title & Metadata Header */}
            <div className="player-meta-row">
              <div className="player-meta-info">
                <div className="player-category-pill">{currentTrack.category}</div>
                <h2 className="player-current-title">{currentTrack.title}</h2>
                <div className="player-urdu-sub">{currentTrack.urduTitle}</div>
                <div className="player-reciter-name">
                  Reciter: <strong>{currentTrack.reciter}</strong>
                  {currentTrack.poet && <span className="player-poet-tag"> • Kalam: {currentTrack.poet}</span>}
                </div>
              </div>

              {/* Action Buttons: Favorite, Lyrics, Download */}
              <div className="player-side-actions">
                <button
                  className={`player-action-btn ${favorites.includes(currentTrack.id) ? "favorited" : ""}`}
                  onClick={(e) => toggleFavorite(currentTrack.id, e)}
                  title="Bookmark Naat"
                  aria-label="Add to favorites"
                >
                  <Heart
                    size={18}
                    fill={favorites.includes(currentTrack.id) ? "#ef4444" : "none"}
                    color={favorites.includes(currentTrack.id) ? "#ef4444" : "currentColor"}
                  />
                </button>

                <button
                  className="player-action-btn"
                  onClick={() => setLyricsModalTrack(currentTrack)}
                  title="View Kalaam / Lyrics"
                  aria-label="View lyrics"
                >
                  <BookOpen size={18} />
                </button>

                <a
                  href={currentTrack.audioUrl}
                  download={`${currentTrack.title}.mp3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="player-action-btn"
                  title="Download MP3"
                  aria-label="Download MP3"
                >
                  <Download size={18} />
                </a>
              </div>
            </div>

            {/* Error / Buffer status banner */}
            {audioError && (
              <div className="player-error-banner">
                <Info size={15} color="#f87171" />
                <span>{audioError}</span>
                <button className="error-retry-btn" onClick={handleRetry}>
                  <RotateCcw size={12} />
                  <span>Retry</span>
                </button>
                <button className="error-synth-btn" onClick={playSpiritualAmbientDrone}>
                  Chime Fallback
                </button>
              </div>
            )}

            {/* Audio Seek Progress Bar */}
            <div className="player-progress-container">
              <div
                className="player-progress-track"
                ref={progressBarRef}
                onClick={handleSeek}
              >
                <div
                  className="player-progress-fill"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
                <div
                  className="player-progress-thumb"
                  style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              <div className="player-timestamps">
                <span className="timestamp-current">{formatTime(currentTime)}</span>
                {/* Audio visualizer frequency bars */}
                <div className="player-soundwave-bars">
                  {[40, 75, 55, 90, 60, 85, 45, 95, 65, 70, 50, 80].map((h, i) => (
                    <span
                      key={i}
                      className={`soundwave-bar ${isPlaying ? "active" : ""}`}
                      style={{
                        animationDelay: `${i * 0.08}s`,
                        height: isPlaying ? `${Math.max(20, h * 0.9)}%` : "20%"
                      }}
                    />
                  ))}
                </div>
                <span className="timestamp-total">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="player-controls-row">
              {/* Left Secondary Controls: Shuffle, Repeat */}
              <div className="controls-group-left">
                <button
                  className={`ctrl-icon-btn ${isShuffle ? "active" : ""}`}
                  onClick={() => setIsShuffle(!isShuffle)}
                  title={`Shuffle ${isShuffle ? "On" : "Off"}`}
                  aria-label="Toggle shuffle"
                >
                  <Shuffle size={16} />
                </button>

                <button
                  className={`ctrl-icon-btn ${repeatMode !== "none" ? "active" : ""}`}
                  onClick={toggleRepeat}
                  title={`Repeat mode: ${repeatMode}`}
                  aria-label="Toggle repeat"
                >
                  <Repeat size={16} />
                  {repeatMode === "one" && <span className="repeat-badge-one">1</span>}
                </button>

                <button
                  className="ctrl-rate-pill"
                  onClick={cyclePlaybackRate}
                  title="Cycle playback speed"
                >
                  {playbackRate}x
                </button>
              </div>

              {/* Center Primary Controls: Prev, Play/Pause, Next */}
              <div className="controls-group-center">
                <button
                  className="ctrl-transport-btn prev-btn"
                  onClick={handlePrevTrack}
                  title="Previous Naat (or restart)"
                  aria-label="Previous track"
                >
                  <SkipBack size={20} fill="currentColor" />
                </button>

                <button
                  className={`ctrl-play-pause-btn ${isLoadingAudio ? "loading" : ""}`}
                  onClick={togglePlay}
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isLoadingAudio ? (
                    <div className="player-loading-spinner" />
                  ) : isPlaying ? (
                    <Pause size={24} fill="#032418" color="#032418" />
                  ) : (
                    <Play size={24} fill="#032418" color="#032418" style={{ marginLeft: "3px" }} />
                  )}
                </button>

                <button
                  className="ctrl-transport-btn next-btn"
                  onClick={handleNextTrack}
                  title="Next Naat"
                  aria-label="Next track"
                >
                  <SkipForward size={20} fill="currentColor" />
                </button>
              </div>

              {/* Right Secondary Controls: Volume & Mute */}
              <div className="controls-group-right">
                <button
                  className="ctrl-icon-btn volume-btn"
                  onClick={toggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                  aria-label="Toggle mute"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="player-volume-slider"
                  aria-label="Volume slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      {/* Filter Tabs & Search Bar with Online Search Capabilities */}
      <div className="naat-filter-section" style={{ flexDirection: "column", alignItems: "stretch", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          {/* Category Pills */}
          <div className="naat-category-tabs">
            {naatCategories.map((cat) => (
              <button
                key={cat}
                className={`naat-category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "Favorites" ? (
                  <>
                    <Heart size={13} fill="currentColor" />
                    <span>Dilpasand ({favorites.length})</span>
                  </>
                ) : (
                  <span>{cat}</span>
                )}
              </button>
            ))}
          </div>

          {/* Search Form (Supports instant search + global online library search) */}
          <form
            className="naat-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                handleGlobalSearch(searchQuery.trim());
              }
            }}
          >
            <div className="naat-search-wrapper" style={{ flex: 1 }}>
              <Search size={16} className="naat-search-icon" />
              <input
                type="text"
                className="naat-search-input"
                placeholder="Search 15 Naats, or type ANY Naat to search online..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) {
                    setOnlineResults([]);
                    setOnlineSearchQuery("");
                  }
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="naat-search-clear"
                  onClick={() => {
                    setSearchQuery("");
                    setOnlineResults([]);
                    setOnlineSearchQuery("");
                  }}
                  title="Clear search"
                >
                  ×
                </button>
              )}

              {/* Voice Search Button Inside Search Bar */}
              <button
                type="button"
                className={`naat-voice-mic-btn ${isListening ? "active-listening" : ""}`}
                onClick={toggleVoiceSearch}
                title={isListening ? "Sun rahe hain... (Click to stop)" : "Bol kar search karein (Voice Search) 🎙️"}
                aria-label="Voice Search"
              >
                {isListening ? (
                  <MicOff size={16} color="#ffffff" />
                ) : (
                  <Mic size={17} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="naat-search-btn-online"
              disabled={isSearchingOnline || !searchQuery.trim()}
              title="Search millions of online Islamic Naats"
            >
              {isSearchingOnline ? (
                <>
                  <Loader2 size={14} className="spin-anim" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Globe size={14} />
                  <span>Search Online</span>
                </>
              )}
            </button>
          </form>

          {/* Voice Search Interactive Floating Panel */}
          {isVoicePanelOpen && (
            <div className="naat-voice-panel-container">
              <div className="naat-voice-panel">
                <div className="naat-voice-panel-header">
                  <div className="naat-voice-header-left">
                    <span className={`voice-status-dot ${isListening ? "recording" : "idle"}`} />
                    <span className="voice-header-title">
                      {isListening ? "Sun rahe hain... Boliyye 🎙️" : "Voice Search (Bol Kar Dhundhein)"}
                    </span>
                  </div>

                  <div className="naat-voice-header-controls">
                    <div className="naat-voice-lang-picker">
                      <span className="lang-label">Zabaan:</span>
                      <button
                        type="button"
                        className={`lang-pill ${voiceLang === "ur-PK" ? "active" : ""}`}
                        onClick={() => handleLanguageChange("ur-PK")}
                        title="Urdu Voice Recognition"
                      >
                        اردو
                      </button>
                      <button
                        type="button"
                        className={`lang-pill ${voiceLang === "hi-IN" ? "active" : ""}`}
                        onClick={() => handleLanguageChange("hi-IN")}
                        title="Hindi Voice Recognition"
                      >
                        हिन्दी
                      </button>
                      <button
                        type="button"
                        className={`lang-pill ${voiceLang === "en-US" ? "active" : ""}`}
                        onClick={() => handleLanguageChange("en-US")}
                        title="English Voice Recognition"
                      >
                        English
                      </button>
                    </div>

                    <button
                      type="button"
                      className="naat-voice-close-btn"
                      onClick={() => {
                        stopVoiceSearch();
                        setIsVoicePanelOpen(false);
                      }}
                      title="Close Voice Search"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="naat-voice-body">
                  <div className="naat-voice-mic-center">
                    <button
                      type="button"
                      className={`voice-big-mic-btn ${isListening ? "listening" : ""}`}
                      onClick={() => {
                        if (isListening) stopVoiceSearch();
                        else startVoiceSearch(voiceLang);
                      }}
                      title={isListening ? "Stop listening" : "Tap to speak"}
                    >
                      {isListening ? <MicOff size={28} /> : <Mic size={28} />}
                      {isListening && (
                        <>
                          <span className="voice-pulse-circle ring-1" />
                          <span className="voice-pulse-circle ring-2" />
                        </>
                      )}
                    </button>
                  </div>

                  {isListening && (
                    <div className="naat-voice-soundwave">
                      <span className="soundwave-bar bar-1" />
                      <span className="soundwave-bar bar-2" />
                      <span className="soundwave-bar bar-3" />
                      <span className="soundwave-bar bar-4" />
                      <span className="soundwave-bar bar-5" />
                    </div>
                  )}

                  <div className="naat-voice-transcript-box">
                    {voiceTranscript ? (
                      <p className="voice-transcript-text">
                        “{voiceTranscript}”
                      </p>
                    ) : (
                      <p className="voice-transcript-placeholder">
                        {isListening
                          ? "Abhi bolein... jaise 'Owais Raza Qadri', 'Mera Dil Badal De', 'Tajdar-e-Haram'..."
                          : "Mic button dabayein aur bolna shuru karein."}
                      </p>
                    )}
                  </div>

                  {voiceError && (
                    <div className="naat-voice-error-banner">
                      <span>⚠️ {voiceError}</span>
                    </div>
                  )}

                  <div className="naat-voice-suggestions">
                    <span className="suggestions-label">Ya direct bolne ke badle click karein:</span>
                    <div className="suggestions-tags-row">
                      {[
                        "Owais Raza Qadri",
                        "Mera Dil Badal De",
                        "Hafiz Tahir Qadri",
                        "Tajdar-e-Haram",
                        "Khursheed Ahmad",
                        "Junaid Jamshed",
                        "Bhar Do Jholi Meri",
                        "Muhammad Hassan Raza Qadri"
                      ].map((sample) => (
                        <button
                          key={sample}
                          type="button"
                          className="voice-sample-btn"
                          onClick={() => handleVoiceQuerySubmit(sample)}
                        >
                          🎙️ {sample}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Explore: Top 10 Naat Khwans & Popular Kalaams */}
        <div className="naat-explore-block">
          <div className="naat-quick-row">
            <span className="naat-quick-label">
              <Mic size={13} color="var(--primary-green)" />
              Top Naat Khwans:
            </span>
            {[
              "Owais Raza Qadri",
              "Hafiz Tahir Qadri",
              "Junaid Jamshed",
              "Hafiz Ahmed Raza Qadri",
              "Siddiq Ismail",
              "Qari Waheed Zafar Qasmi",
              "Khursheed Ahmad",
              "Syed Fasihuddin Soharwardi",
              "Farhan Ali Qadri",
              "Muhammad Hassan Raza Qadri"
            ].map((name) => (
              <button
                key={name}
                type="button"
                className={`naat-khwan-tag-btn ${searchQuery === name ? "active" : ""}`}
                onClick={() => {
                  setSearchQuery(name);
                  handleGlobalSearch(name);
                }}
              >
                <span>{name}</span>
              </button>
            ))}
          </div>

          <div className="naat-quick-row" style={{ marginTop: "4px" }}>
            <span className="naat-quick-label" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              <Sparkles size={12} color="#0284c7" />
              Trending Kalaams:
            </span>
            {[
              "Mera Dil Badal De",
              "Tu Kuja Man Kuja",
              "Hasbi Rabbi",
              "Lab Pe Aati Hai Dua",
              "Yeh Sab Tumhara Karam",
              "Ae Sabz Gumbad Wale",
              "Haal-e-Dil Kisko Sunayein",
              "Durood-e-Taj",
              "Qasida Burda Sharif",
              "Ali Maula"
            ].map((kalam) => (
              <button
                key={kalam}
                type="button"
                className="naat-kalam-tag-btn"
                onClick={() => {
                  setSearchQuery(kalam);
                  handleGlobalSearch(kalam);
                }}
              >
                {kalam}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC LAYOUT: If user is searching or viewing Online Library, show Online Results FIRST! */}
      {(searchQuery.trim().length > 0 || selectedCategory === "🌐 Online Library") ? (
        <>
          {/* 1. Global Online Results Section (Top Priority when Searching) */}
          <div style={{ marginTop: "16px", marginBottom: "24px" }}>
            <div className="naat-online-section-header">
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={18} color="#0284c7" />
                  <span>Global Online Naat Library Results</span>
                  {(onlineSearchQuery || searchQuery) && (
                    <span style={{ fontSize: "12.5px", color: "var(--text-muted)", fontWeight: "600" }}>
                      for "{onlineSearchQuery || searchQuery}"
                    </span>
                  )}
                </h3>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Instant streaming from world Islamic audio archives & verified high-speed CDN.
                </p>
              </div>

              {onlineResults.length > 0 && (
                <span className="naat-online-badge">
                  <Sparkles size={11} /> {onlineResults.length} Ready to Play
                </span>
              )}
            </div>

            {isSearchingOnline ? (
              <div className="dashboard-card" style={{ padding: "36px", textAlign: "center" }}>
                <Loader2 size={32} className="spin-anim" style={{ margin: "0 auto 12px auto", color: "var(--primary-green)" }} />
                <h4>Searching Worldwide Islamic Archives...</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Online audio streams aur kalaam load ho rahe hain, thoda sa intezar farmayein...
                </p>
              </div>
            ) : onlineSearchError ? (
              <div className="dashboard-card" style={{ padding: "24px", textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: "#dc2626" }}>{onlineSearchError}</p>
                <button
                  className="naat-reset-search-btn"
                  onClick={() => handleGlobalSearch(searchQuery)}
                  style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <RotateCcw size={13} />
                  <span>Retry Search</span>
                </button>
              </div>
            ) : onlineResults.length === 0 ? (
              <div className="dashboard-card" style={{ padding: "28px", textAlign: "center" }}>
                <Music size={32} color="#0284c7" style={{ margin: "0 auto 8px auto" }} />
                <h4>Search for ANY Naat online</h4>
                <p style={{ fontSize: "12.5px", color: "var(--text-muted)", marginTop: "4px" }}>
                  Type a title or reciter name in the search box above to stream any Naat in the world.
                </p>
              </div>
            ) : (
              <div className="naat-cards-grid">
                {onlineResults.map((naat, idx) => {
                  const isCurrent = currentTrack.audioUrl === naat.audioUrl;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  const isFav = favorites.includes(naat.id);

                  return (
                    <div
                      key={naat.id || idx}
                      className={`naat-card ${isCurrent ? "active-playing" : ""}`}
                      onClick={() => playOnlineTrack(naat)}
                      style={{
                        border: isCurrent ? "2px solid #10b981" : "1px solid rgba(2, 132, 199, 0.35)",
                        boxShadow: isCurrent ? "0 0 16px rgba(16, 185, 129, 0.22)" : "none"
                      }}
                    >
                      <div className="naat-card-accent-bar" style={{ background: naat.gradient }} />

                      <div className="naat-card-body">
                        <div className="naat-card-top">
                          <span className="naat-online-badge">
                            <Globe size={10} /> Online Stream
                          </span>
                          <span className="naat-duration-pill">{naat.duration}</span>
                          <button
                            className={`naat-card-fav-btn ${isFav ? "favorited" : ""}`}
                            onClick={(e) => toggleFavorite(naat.id, e)}
                          >
                            <Heart size={15} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "currentColor"} />
                          </button>
                        </div>

                        <div className="naat-card-titles">
                          <h3 className="naat-title-text" style={{ fontSize: "14px" }}>{naat.title}</h3>
                          <div className="naat-urdu-text" style={{ fontSize: "14px" }}>{naat.urduTitle}</div>
                        </div>

                        <div className="naat-card-info-row">
                          <div className="naat-reciter-box">
                            <span className="reciter-label">Reciter:</span>
                            <span className="reciter-name">{naat.reciter}</span>
                          </div>
                        </div>

                        <div className="naat-card-footer" style={{ marginTop: "12px" }}>
                          <button
                            className={`naat-card-play-btn ${isCurrentPlaying ? "playing" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrent) {
                                togglePlay();
                              } else {
                                playOnlineTrack(naat);
                              }
                            }}
                          >
                            {isCurrentPlaying ? (
                              <>
                                <Pause size={14} fill="currentColor" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play size={14} fill="currentColor" />
                                <span>Stream Online</span>
                              </>
                            )}
                          </button>

                          <button
                            className="naat-card-lyrics-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLyricsModalTrack(naat);
                            }}
                          >
                            <BookOpen size={14} />
                            <span>Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Curated 15 Naats Matching Section */}
          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>🌿</span>
                <span>Muntakhab Mustanad Naat Sharif (15 Curated Kalaams)</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginLeft: "4px" }}>
                  ({filteredNaats.length} matching)
                </span>
              </h3>
            </div>

            {filteredNaats.length > 0 && (
              <div className="naat-cards-grid">
                {filteredNaats.map((naat, idx) => {
                  const isCurrent = currentTrack.id === naat.id;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  const isFav = favorites.includes(naat.id);

                  return (
                    <div
                      key={naat.id}
                      className={`naat-card ${isCurrent ? "active-playing" : ""}`}
                      onClick={() => {
                        const pIdx = playlist.findIndex((t) => t.id === naat.id);
                        if (pIdx !== -1) {
                          if (isCurrent) {
                            togglePlay();
                          } else {
                            playTrack(pIdx, true);
                          }
                        }
                      }}
                    >
                      <div className="naat-card-accent-bar" style={{ background: naat.gradient }} />
                      <div className="naat-card-body">
                        <div className="naat-card-top">
                          <span className="naat-track-badge">#{idx + 1}</span>
                          <span className="naat-category-tag">{naat.category}</span>
                          <button
                            className={`naat-card-fav-btn ${isFav ? "favorited" : ""}`}
                            onClick={(e) => toggleFavorite(naat.id, e)}
                          >
                            <Heart size={15} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "currentColor"} />
                          </button>
                        </div>

                        <div className="naat-card-titles">
                          <h3 className="naat-title-text">{naat.title}</h3>
                          <div className="naat-urdu-text">{naat.urduTitle}</div>
                        </div>

                        <div className="naat-card-info-row">
                          <div className="naat-reciter-box">
                            <span className="reciter-label">Reciter:</span>
                            <span className="reciter-name">{naat.reciter}</span>
                          </div>
                          <span className="naat-duration-pill">{naat.duration}</span>
                        </div>

                        <p className="naat-card-desc">{naat.description}</p>

                        <div className="naat-card-footer">
                          <button
                            className={`naat-card-play-btn ${isCurrentPlaying ? "playing" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const pIdx = playlist.findIndex((t) => t.id === naat.id);
                              if (pIdx !== -1) {
                                if (isCurrent) togglePlay();
                                else playTrack(pIdx, true);
                              }
                            }}
                          >
                            {isCurrentPlaying ? (
                              <>
                                <Pause size={14} fill="currentColor" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play size={14} fill="currentColor" />
                                <span>Play</span>
                              </>
                            )}
                          </button>

                          <button
                            className="naat-card-lyrics-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLyricsModalTrack(naat);
                            }}
                          >
                            <BookOpen size={14} />
                            <span>Lyrics</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        /* DEFAULT VIEW (No active search): Curated 15 First, Followed by Global Online Discovery */
        <>
          {/* 1. Primary Curated 15 Naats */}
          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>🌿</span>
                <span>Muntakhab Naat Sharif (15 Curated Kalaams)</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginLeft: "4px" }}>
                  ({filteredNaats.length} total)
                </span>
              </h3>
            </div>

            <div className="naat-cards-grid">
              {filteredNaats.map((naat, idx) => {
                const isCurrent = currentTrack.id === naat.id;
                const isCurrentPlaying = isCurrent && isPlaying;
                const isFav = favorites.includes(naat.id);

                return (
                  <div
                    key={naat.id}
                    className={`naat-card ${isCurrent ? "active-playing" : ""}`}
                    onClick={() => {
                      const pIdx = playlist.findIndex((t) => t.id === naat.id);
                      if (pIdx !== -1) {
                        if (isCurrent) togglePlay();
                        else playTrack(pIdx, true);
                      }
                    }}
                  >
                    <div className="naat-card-accent-bar" style={{ background: naat.gradient }} />
                    <div className="naat-card-body">
                      <div className="naat-card-top">
                        <span className="naat-track-badge">#{idx + 1}</span>
                        <span className="naat-category-tag">{naat.category}</span>
                        <button
                          className={`naat-card-fav-btn ${isFav ? "favorited" : ""}`}
                          onClick={(e) => toggleFavorite(naat.id, e)}
                        >
                          <Heart size={15} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "currentColor"} />
                        </button>
                      </div>

                      <div className="naat-card-titles">
                        <h3 className="naat-title-text">{naat.title}</h3>
                        <div className="naat-urdu-text">{naat.urduTitle}</div>
                      </div>

                      <div className="naat-card-info-row">
                        <div className="naat-reciter-box">
                          <span className="reciter-label">Reciter:</span>
                          <span className="reciter-name">{naat.reciter}</span>
                        </div>
                        <span className="naat-duration-pill">{naat.duration}</span>
                      </div>

                      <p className="naat-card-desc">{naat.description}</p>

                      <div className="naat-card-footer">
                        <button
                          className={`naat-card-play-btn ${isCurrentPlaying ? "playing" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const pIdx = playlist.findIndex((t) => t.id === naat.id);
                            if (pIdx !== -1) {
                              if (isCurrent) togglePlay();
                              else playTrack(pIdx, true);
                            }
                          }}
                        >
                          {isCurrentPlaying ? (
                            <>
                              <Pause size={14} fill="currentColor" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play size={14} fill="currentColor" />
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        <button
                          className="naat-card-lyrics-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLyricsModalTrack(naat);
                          }}
                        >
                          <BookOpen size={14} />
                          <span>Lyrics</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Global Online Discovery Exploration Section */}
          <div style={{ marginTop: "36px", marginBottom: "20px" }}>
            <div className="naat-online-section-header">
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={18} color="#0284c7" />
                  <span>Global Online Naat Library (Millions of Kalaams)</span>
                </h3>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  In 15 ke alawa koi bhi Naat search karke direct online sunein.
                </p>
              </div>

              {onlineResults.length > 0 && (
                <span className="naat-online-badge">
                  <Sparkles size={11} /> {onlineResults.length} Loaded Online
                </span>
              )}
            </div>

            {onlineResults.length > 0 ? (
              <div className="naat-cards-grid">
                {onlineResults.map((naat, idx) => {
                  const isCurrent = currentTrack.audioUrl === naat.audioUrl;
                  const isCurrentPlaying = isCurrent && isPlaying;
                  const isFav = favorites.includes(naat.id);

                  return (
                    <div
                      key={naat.id || idx}
                      className={`naat-card ${isCurrent ? "active-playing" : ""}`}
                      onClick={() => playOnlineTrack(naat)}
                      style={{
                        border: isCurrent ? "2px solid #10b981" : "1px solid rgba(2, 132, 199, 0.35)",
                        boxShadow: isCurrent ? "0 0 16px rgba(16, 185, 129, 0.22)" : "none"
                      }}
                    >
                      <div className="naat-card-accent-bar" style={{ background: naat.gradient }} />
                      <div className="naat-card-body">
                        <div className="naat-card-top">
                          <span className="naat-online-badge">
                            <Globe size={10} /> Online Stream
                          </span>
                          <span className="naat-duration-pill">{naat.duration}</span>
                          <button
                            className={`naat-card-fav-btn ${isFav ? "favorited" : ""}`}
                            onClick={(e) => toggleFavorite(naat.id, e)}
                          >
                            <Heart size={15} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "currentColor"} />
                          </button>
                        </div>

                        <div className="naat-card-titles">
                          <h3 className="naat-title-text" style={{ fontSize: "14px" }}>{naat.title}</h3>
                          <div className="naat-urdu-text" style={{ fontSize: "14px" }}>{naat.urduTitle}</div>
                        </div>

                        <div className="naat-card-info-row">
                          <div className="naat-reciter-box">
                            <span className="reciter-label">Reciter:</span>
                            <span className="reciter-name">{naat.reciter}</span>
                          </div>
                        </div>

                        <div className="naat-card-footer" style={{ marginTop: "12px" }}>
                          <button
                            className={`naat-card-play-btn ${isCurrentPlaying ? "playing" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCurrent) togglePlay();
                              else playOnlineTrack(naat);
                            }}
                          >
                            {isCurrentPlaying ? (
                              <>
                                <Pause size={14} fill="currentColor" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play size={14} fill="currentColor" />
                                <span>Stream Online</span>
                              </>
                            )}
                          </button>

                          <button
                            className="naat-card-lyrics-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLyricsModalTrack(naat);
                            }}
                          >
                            <BookOpen size={14} />
                            <span>Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="dashboard-card"
                style={{
                  padding: "32px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",
                  border: "1px dashed rgba(2, 132, 199, 0.4)"
                }}
              >
                <Globe size={36} color="#0284c7" style={{ margin: "0 auto 10px auto" }} />
                <h4 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-heading)" }}>
                  Koi Bhi Naat Sunna Chahte Hain?
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "520px", margin: "6px auto 16px auto" }}>
                  Aap Farhan Ali Qadri, Junaid Jamshed, Sami Yusuf, Maher Zain ya kisi bhi Naat Khwan ka naam ya kalaam search karein aur direct stream karein.
                </p>
                <button
                  className="naat-reset-search-btn"
                  onClick={() => handleGlobalSearch("")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", fontSize: "13.5px" }}
                >
                  <Sparkles size={15} />
                  <span>Explore Online Trending Naats 🌐</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Lyrics / Kalaam Modal Drawer */}
      {lyricsModalTrack && (
        <div
          className="naat-lyrics-backdrop"
          onClick={() => setLyricsModalTrack(null)}
        >
          <div
            className="naat-lyrics-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="naat-lyrics-header">
              <div className="lyrics-header-titles">
                <span className="lyrics-modal-badge">{lyricsModalTrack.category}</span>
                <h2>{lyricsModalTrack.title}</h2>
                <div className="lyrics-reciter-sub">
                  Kalaam & Recitation: <strong>{lyricsModalTrack.reciter}</strong>
                  {lyricsModalTrack.poet && <span> • Poet: {lyricsModalTrack.poet}</span>}
                </div>
              </div>

              <div className="lyrics-header-actions">
                {/* Font Size Adjusters */}
                <div className="font-adjust-group">
                  <button
                    onClick={() => setLyricsFontSize((f) => Math.max(14, f - 2))}
                    title="Smaller Text"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setLyricsFontSize((f) => Math.min(28, f + 2))}
                    title="Larger Text"
                  >
                    A+
                  </button>
                </div>

                <button
                  className="lyrics-copy-btn"
                  onClick={() => handleCopyLyrics(lyricsModalTrack)}
                  title="Copy Kalaam"
                >
                  {copiedLyrics ? <Check size={16} color="#22c55e" /> : <Share2 size={16} />}
                  <span>{copiedLyrics ? "Copied!" : "Copy"}</span>
                </button>

                <button
                  className="lyrics-close-btn"
                  onClick={() => setLyricsModalTrack(null)}
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="naat-lyrics-body">
              {/* Urdu Nastaliq Section */}
              <div className="lyrics-section urdu-section">
                <h4 className="section-label">اردو اشعار (Urdu Kalaam)</h4>
                <div
                  className="urdu-verses-box"
                  style={{ fontSize: `${lyricsFontSize + 3}px` }}
                >
                  {lyricsModalTrack.lyricsUrdu.map((verse, i) => (
                    <p key={i} className="urdu-verse-line">
                      {verse}
                    </p>
                  ))}
                </div>
              </div>

              {/* Roman Urdu Transliteration */}
              <div className="lyrics-section roman-section">
                <h4 className="section-label">Roman Urdu (Parhne Ke Liye)</h4>
                <div
                  className="roman-verses-box"
                  style={{ fontSize: `${lyricsFontSize}px` }}
                >
                  {lyricsModalTrack.lyricsRoman.map((verse, i) => (
                    <p key={i} className="roman-verse-line">
                      {verse}
                    </p>
                  ))}
                </div>
              </div>

              {/* English Meaning / Roohani Tafseer */}
              <div className="lyrics-section translation-section">
                <h4 className="section-label">English Meaning & Spiritual Context</h4>
                <p className="translation-text">{lyricsModalTrack.translation}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="naat-lyrics-footer">
              <button
                className="lyrics-play-now-btn"
                onClick={() => {
                  const pIdx = playlist.findIndex((t) => t.id === lyricsModalTrack.id);
                  if (pIdx !== -1) {
                    playTrack(pIdx, true);
                    setLyricsModalTrack(null);
                  }
                }}
              >
                <Play size={16} fill="currentColor" />
                <span>Play This Naat Now</span>
              </button>

              <button
                className="lyrics-dismiss-btn"
                onClick={() => setLyricsModalTrack(null)}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
