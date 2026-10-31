import React, { useState } from "react";
import { Bot, Mic, Send, Sparkles } from "lucide-react";

export function AIAssistantWidget({ onPromptSelect, onSendMessage }) {
  const [inputVal, setInputVal] = useState("");

  const suggestions = [
    "Aaj ke ghar ke kaam ka plan...",
    "$500 mein grocery list banayein",
    "Mujhe 10 GK questions do",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSendMessage(inputVal.trim());
    setInputVal("");
  }

  function handleVoiceInput() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        onSendMessage(transcript);
      };
      recognition.start();
    } else {
      onSendMessage("Aaj ke ghar ke kaam ka schedule banayein");
    }
  }

  return (
    <div className="ai-widget ai-widget-exact">
      {/* Header Tag with Cute Robot Head Badge */}
      <div className="ai-header-tag-exact">
        <div className="ai-robot-badge-pill">
          {/* Glowing cyan robot head */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="14" rx="7" fill="#0d4734" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx="8.5" cy="12.5" r="1.8" fill="#22d3ee" />
            <circle cx="15.5" cy="12.5" r="1.8" fill="#22d3ee" />
            <path d="M10.5 15.5 Q12 17 13.5 15.5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="2" x2="12" y2="6" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx="12" cy="2" r="1.2" fill="#22d3ee" />
          </svg>
        </div>
        <div className="ai-header-titles">
          <span className="ai-title-exact">AI Assistant</span>
        </div>
      </div>

      <p className="ai-subtext-exact">Ask anything about Deen, task...</p>

      {/* Main Body: 3 Speech Bubbles on Left, 3D Robot on Right */}
      <div className="ai-widget-body-exact">
        <div className="ai-prompt-bubbles-col-exact">
          {suggestions.map((prompt, idx) => (
            <button
              key={idx}
              className="ai-speech-bubble-chip-exact"
              onClick={() => onPromptSelect(prompt)}
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* 3D Floating Robot with Ambient Thruster Glow */}
        <div className="ai-robot-container-exact">
          <img
            src="/images/ai_robot_avatar.png"
            alt="NoorLife 3D Friendly AI Robot"
            className="ai-robot-floating-img-exact"
          />
        </div>
      </div>

      {/* Subtle diamond flare in center */}
      <div className="ai-center-star-flare">✦</div>

      {/* Bottom Chat Bar */}
      <form className="ai-chat-input-bar-exact" onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={handleVoiceInput}
          className="ai-mic-btn-exact"
          title="Voice input"
          aria-label="Voice input"
        >
          <Mic size={14} color="#0d3d2c" />
        </button>

        <input
          type="text"
          placeholder="Type your question..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />

        <button
          type="submit"
          className="ai-send-btn-exact"
          title="Send"
          aria-label="Send"
        >
          <Send size={11} color="#ffffff" />
        </button>
      </form>
    </div>
  );
}
