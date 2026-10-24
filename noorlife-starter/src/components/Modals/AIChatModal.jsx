import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, Send, Mic, Bot, User, Trash2 } from "lucide-react";
import { askNoorLifeAI } from "../../data/aiAssistantService";

export function AIChatModal({ isOpen, onClose, initialPrompt = "" }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Assalamu Alaikum! Main aapka **NoorLife AI Assistant** hoon 🌿\n\nAap mujhse ghar ke kaam, meal ideas, grocery budget, ya Deen aur Duas ke baare mein kuch bhi pooch sakte hain.",
      time: "Just now"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  async function sendMessage(textToSend) {
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
          text: "Maaf kijiye, abhi response process karne mein dikkat aayi. Kripya dobara prayaas karein.",
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
        sendMessage(transcript);
      };
      recognition.start();
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "620px", height: "80vh", display: "flex", flexDirection: "column" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="ai-sparkle-icon">
              <Sparkles size={16} />
            </div>
            <div>
              <h3>NoorLife AI Assistant</h3>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Islamic Lifestyle & Home Management Companion
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              className="action-icon-btn"
              title="Clear chat"
              onClick={() => setMessages([messages[0]])}
            >
              <Trash2 size={16} />
            </button>
            <button className="action-icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div
          className="modal-body"
          style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}
        >
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
                  gap: "10px",
                  maxWidth: "85%",
                  flexDirection: m.sender === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: m.sender === "user" ? "var(--primary-green)" : "#f5f3ff",
                    color: m.sender === "user" ? "#ffffff" : "#7c3aed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {m.sender === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>

                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "var(--radius-lg)",
                    background: m.sender === "user" ? "var(--primary-green)" : "var(--bg-subtle)",
                    color: m.sender === "user" ? "#ffffff" : "var(--text-main)",
                    fontSize: "12.5px",
                    lineHeight: "1.55",
                    whiteSpace: "pre-wrap",
                    border: m.sender === "user" ? "none" : "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {m.text}
                </div>
              </div>

              {/* Follow-up suggestions */}
              {m.quickFollowUps && m.quickFollowUps.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px", marginLeft: "40px" }}>
                  {m.quickFollowUps.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      className="ai-prompt-chip"
                      style={{ padding: "4px 10px", fontSize: "10.5px" }}
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <span style={{ fontSize: "9.5px", color: "var(--text-light)", marginTop: "3px", marginInline: "40px" }}>
                {m.time}
              </span>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "10px" }}>
              <div className="ai-sparkle-icon" style={{ width: "24px", height: "24px" }}>
                <Sparkles size={13} />
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>
                NoorLife AI is thinking...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border-color)" }}>
          <form
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputVal);
            }}
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              aria-label="Voice input"
              style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}
            >
              <Mic size={16} />
            </button>

            <input
              type="text"
              placeholder="Ask anything (e.g. 'Aaj ke ghar ke kaam ka plan banao')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
            />

            <button
              type="submit"
              className="ai-send-btn"
              disabled={loading}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
