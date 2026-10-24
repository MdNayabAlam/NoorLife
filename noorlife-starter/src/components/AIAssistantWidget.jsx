import React, { useState } from "react";
import { Sparkles, Mic, Send } from "lucide-react";

export function AIAssistantWidget({ onPromptSelect, onSendMessage }) {
  const [inputVal, setInputVal] = useState("");

  const suggestions = [
    "Aaj ke ghar ke kaam ka plan banao",
    "₹500 mein grocery list banao",
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
      alert("Voice input simulated: Ask anything in Hindi, Urdu, or English!");
    }
  }

  return (
    <div className="ai-widget">
      <div className="ai-header-tag">
        <div className="ai-sparkle-icon">
          <Sparkles size={16} />
        </div>
        <span>AI Assistant</span>
      </div>

      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "8px" }}>
        Try these:
      </div>

      <div className="ai-try-prompts">
        {suggestions.map((prompt, idx) => (
          <button
            key={idx}
            className="ai-prompt-chip"
            onClick={() => onPromptSelect(prompt)}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      <form className="ai-chat-input-bar" onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={handleVoiceInput}
          title="Voice input (Microphone)"
          aria-label="Voice input"
          style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}
        >
          <Mic size={15} />
        </button>

        <input
          type="text"
          placeholder="Ask NoorLife AI anything..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />

        <button
          type="submit"
          className="ai-send-btn"
          title="Send question"
          aria-label="Send question"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
