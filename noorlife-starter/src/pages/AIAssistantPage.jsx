import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, Bot, User, Trash2 } from "lucide-react";
import { askNoorLifeAI } from "../data/aiAssistantService";

export function AIAssistantPage({ showToast }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Assalamu Alaikum! Main aapka **NoorLife AI Assistant** hoon 🌿\n\nAap mujhse ghar ke kaamon ka routine, ₹500 ke andar smart grocery list, poshtik halal recipes, ya Islamic knowledge aur Duas ke baare mein kuch bhi pooch sakte hain.",
      time: "Just now",
      quickFollowUps: [
        "Aaj ke ghar ke kaam ka plan banao",
        "₹500 mein grocery list banao",
        "Mujhe 10 GK questions do",
        "Halal nutritious lunch recipe batao"
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(textToSend) {
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      const response = await askNoorLifeAI(textToSend);
      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.text,
        quickFollowUps: response.quickFollowUps,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Maaf kijiye, server connection mein dikkat aayi. Kripya dobara prayaas karein.",
          time: "Now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleVoiceInput() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };
      recognition.start();
    } else {
      if (showToast) showToast("Voice recognition simulated");
    }
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>NoorLife AI Assistant</h2>
          <p>Your intelligent, faith-inspired companion for domestic harmony and learning.</p>
        </div>
        <button
          className="action-icon-btn"
          style={{ width: "auto", padding: "8px 14px", borderRadius: "var(--radius-md)", display: "flex", gap: "6px" }}
          onClick={() => setMessages([messages[0]])}
        >
          <Trash2 size={14} /> Clear Chat
        </button>
      </div>

      <div
        className="dashboard-card"
        style={{
          height: "68vh",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Chat message history */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  maxWidth: "80%",
                  flexDirection: m.sender === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: m.sender === "user" ? "var(--primary-green)" : "#f5f3ff",
                    color: m.sender === "user" ? "#ffffff" : "#7c3aed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {m.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "var(--radius-lg)",
                    background: m.sender === "user" ? "var(--primary-green)" : "var(--bg-subtle)",
                    color: m.sender === "user" ? "#ffffff" : "var(--text-main)",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                    border: m.sender === "user" ? "none" : "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {m.text}
                </div>
              </div>

              {/* Quick follow-ups */}
              {m.quickFollowUps && m.quickFollowUps.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px", marginLeft: "46px" }}>
                  {m.quickFollowUps.map((q, idx) => (
                    <button
                      key={idx}
                      className="ai-prompt-chip"
                      onClick={() => handleSend(q)}
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              )}

              <span style={{ fontSize: "10px", color: "var(--text-light)", marginTop: "4px", marginInline: "46px" }}>
                {m.time}
              </span>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "14px" }}>
              <div className="ai-sparkle-icon" style={{ width: "26px", height: "26px" }}>
                <Sparkles size={14} />
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>
                NoorLife AI is crafting your personalized answer...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Form */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <form
            className="ai-chat-input-bar"
            style={{ padding: "6px 8px 6px 16px" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              aria-label="Voice input"
              style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}
            >
              <Mic size={17} />
            </button>

            <input
              type="text"
              placeholder="Ask anything... (e.g. '₹500 mein grocery list banao')"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ fontSize: "13px" }}
            />

            <button
              type="submit"
              className="ai-send-btn"
              style={{ width: "36px", height: "36px" }}
              disabled={loading}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
