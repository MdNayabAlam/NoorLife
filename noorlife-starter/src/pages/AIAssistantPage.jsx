import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, Bot, User, Trash2, ShieldCheck, Check } from "lucide-react";
import { askServerAssistantAPI } from "../services/api";
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
      // First attempt server-side proxy
      let replyText = "";
      let followUps = [];

      try {
        const serverData = await askServerAssistantAPI(textToSend);
        if (serverData && serverData.reply) {
          replyText = serverData.reply;
          followUps = serverData.suggestions || [];
        }
      } catch (serverErr) {
        // Fallback to intelligent local model
        const fallbackRes = await askNoorLifeAI(textToSend);
        replyText = fallbackRes.text;
        followUps = fallbackRes.quickFollowUps || [];
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: replyText || "Assalamu Alaikum! NoorLife AI assistant aapki har roze ki zarooraton mein madad ke liye yahan hai.",
        quickFollowUps: followUps.length > 0 ? followUps : [
          "Aaj ke ghar ke kaam ka plan banao",
          "₹500 mein grocery list banao",
          "Halal lunch recipe batao"
        ],
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
      if (showToast) showToast("Voice input simulated (listening...)");
    }
  }

  return (
    <div className="center-content-area" style={{ maxWidth: "100%" }}>
      <div className="page-view-header">
        <div>
          <h2>NoorLife AI Assistant</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Faith-inspired domestic harmony, meal planning, and Islamic knowledge.
            </span>
            <span
              className="search-badge"
              style={{
                background: "#ecfdf5",
                color: "#047857",
                border: "1px solid #a7f3d0",
                fontSize: "10.5px",
                padding: "2px 8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              Demo Mode (Server Integration Active)
            </span>
          </div>
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
                  maxWidth: "85%",
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
                    background: m.sender === "user" ? "var(--primary-green)" : "var(--bg-subtle)",
                    color: m.sender === "user" ? "#ffffff" : "var(--text-heading)",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-lg)",
                    border: m.sender === "user" ? "none" : "1px solid var(--border-color)",
                    fontSize: "13px",
                    lineHeight: "1.55",
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.text}
                </div>
              </div>

              {/* Quick suggestions pills */}
              {m.quickFollowUps && m.quickFollowUps.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px", marginLeft: "46px" }}>
                  {m.quickFollowUps.map((promptText, idx) => (
                    <button
                      key={idx}
                      className="search-badge"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        color: "var(--primary-green)",
                        cursor: "pointer",
                        padding: "5px 12px",
                        fontSize: "11px",
                        fontWeight: "600",
                        transition: "all 0.15s ease",
                      }}
                      onClick={() => handleSend(promptText)}
                    >
                      {promptText}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "46px", color: "var(--text-muted)", fontSize: "12px" }}>
              <Sparkles size={14} className="pulse-animation" color="var(--primary-green)" />
              <span>NoorLife AI soch raha hai...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border-color)", background: "var(--bg-card)" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <button
              type="button"
              className="action-icon-btn"
              onClick={handleVoiceInput}
              title="Voice Input"
              style={{ color: "var(--primary-green)" }}
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              className="form-input"
              style={{ flex: 1, borderRadius: "var(--radius-pill)", padding: "10px 18px" }}
              placeholder="Poochiye... jaise: '₹500 mein grocery plan' ya 'Bachon ki parvarish tips'..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="card-action-btn-green"
              style={{
                borderRadius: "var(--radius-pill)",
                padding: "10px 20px",
                opacity: inputVal.trim() && !loading ? 1 : 0.5,
              }}
            >
              <Send size={15} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
