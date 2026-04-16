/**
 * AIAssistant.jsx — Persistent AI chat widget (bottom-right)
 */
import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import useAI from "../hooks/useAI";

const QUICK_CHIPS = [
  "Show SUVs under 20 lakhs",
  "Compare top two cars",
  "Best car for family",
  "Show prices in dollars",
  "Book test drive",
  "Show features",
];

/* Render **bold** markdown inline */
const renderText = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "#f8fafc" }}>{part}</strong>
      : part
  );
};

const AIAssistant = () => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [input,       setInput]       = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  const { aiMessages, aiLoading } = useApp();
  const { processQuery }          = useAI();

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, aiLoading]);

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const handleSend = () => {
    const q = input.trim();
    if (!q || aiLoading) return;
    setInput("");
    processQuery(q);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Voice input not supported. Please use Chrome."); return; }
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;
    setIsListening(true);
    rec.onresult = (ev) => { setIsListening(false); processQuery(ev.results[0][0].transcript); };
    rec.onerror = () => setIsListening(false);
    rec.onend   = () => setIsListening(false);
    rec.start();
  };

  return (
    <div className="ai-widget">

      {/* ── Chat window ── */}
      {isOpen && (
        <div style={{
          marginBottom: "1rem",
          width: "360px",
          maxWidth: "calc(100vw - 3rem)",
          background: "rgba(13,13,21,0.97)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.70)",
          display: "flex",
          flexDirection: "column",
          height: "520px",
        }}>

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.875rem 1.125rem",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.25rem",
                }}>🤖</div>
                <div style={{
                  position: "absolute", bottom: "-1px", right: "-1px",
                  width: "11px", height: "11px", borderRadius: "50%",
                  background: "#34d399", border: "2px solid #4f46e5",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
              </div>
              <div>
                <div className="font-display" style={{ color: "white", fontWeight: 700, fontSize: "0.9375rem", lineHeight: 1.3 }}>
                  VelocityAI Assistant
                </div>
                <div style={{ color: "rgba(199,210,254,0.80)", fontSize: "0.75rem" }}>Always online · Instant response</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.70)", fontSize: "1.25rem", lineHeight: 1, padding: "4px", borderRadius: "6px", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "white"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.70)"}
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {aiMessages.map((msg, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>

                {/* Bot avatar */}
                {msg.role === "assistant" && (
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", marginRight: "8px", flexShrink: 0, alignSelf: "flex-start", marginTop: "2px",
                  }}>🤖</div>
                )}

                <div style={{
                  maxWidth: "78%",
                  padding: "0.625rem 0.9375rem",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.07)",
                  color: msg.role === "user" ? "white" : "#cbd5e1",
                  border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {aiLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", flexShrink: 0,
                }}>🤖</div>
                <div style={{
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)",
                  padding: "0.625rem 0.9375rem", borderRadius: "18px 18px 18px 4px",
                  display: "flex", alignItems: "center", gap: "5px",
                }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "#818cf8",
                      animation: "bounce 0.8s ease-in-out infinite",
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                  <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          {aiMessages.length <= 1 && (
            <div style={{ padding: "0 0.75rem 0.75rem", display: "flex", flexWrap: "wrap", gap: "0.375rem", flexShrink: 0 }}>
              {QUICK_CHIPS.slice(0, 4).map((chip) => (
                <button
                  key={chip}
                  onClick={() => processQuery(chip)}
                  style={{
                    background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.25)",
                    color: "#a5b4fc", fontSize: "0.75rem", fontWeight: 500,
                    padding: "0.3125rem 0.75rem", borderRadius: "999px",
                    cursor: "pointer", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.22)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.10)"}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div style={{
            display: "flex", alignItems: "flex-end", gap: "8px",
            padding: "0.75rem",
            borderTop: "1px solid #1e1e2e",
            flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask me anything about cars..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid #2a2a3a",
                borderRadius: "12px",
                padding: "0.625rem 0.875rem",
                color: "#f8fafc",
                fontSize: "0.875rem",
                fontFamily: "inherit",
                outline: "none",
                resize: "none",
                minHeight: "42px",
                maxHeight: "100px",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.60)"}
              onBlur={e => e.target.style.borderColor = "#2a2a3a"}
            />

            {/* Voice */}
            <button
              onClick={handleVoice}
              title="Voice input"
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: `1px solid ${isListening ? "rgba(239,68,68,0.50)" : "#2a2a3a"}`,
                background: isListening ? "rgba(239,68,68,0.15)" : "transparent",
                color: isListening ? "#f87171" : "#64748b",
                cursor: "pointer",
                fontSize: "1rem",
                flexShrink: 0,
                transition: "all 0.2s",
                animation: isListening ? "pulse 1s ease-in-out infinite" : "none",
              }}
            >
              🎤
            </button>

            {/* Send */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || aiLoading}
              style={{
                padding: "10px",
                borderRadius: "10px",
                background: !input.trim() || aiLoading
                  ? "rgba(99,102,241,0.30)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                cursor: !input.trim() || aiLoading ? "not-allowed" : "pointer",
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: !input.trim() || aiLoading ? "none" : "0 4px 12px rgba(99,102,241,0.40)",
                transition: "all 0.2s",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle FAB ── */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => setIsOpen((o) => !o)}
          style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem",
            boxShadow: isOpen ? "0 8px 24px rgba(99,102,241,0.50)" : "0 8px 32px rgba(99,102,241,0.45)",
            transition: "transform 0.25s, box-shadow 0.25s",
            position: "relative",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.10)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          aria-label="Toggle AI assistant"
        >
          {/* Ping ring when closed */}
          {!isOpen && (
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#6366f1", opacity: 0.25,
              animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
            }} />
          )}
          <style>{`@keyframes ping { 75%,100%{transform:scale(2);opacity:0} } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }`}</style>
          <span style={{ position: "relative", zIndex: 1 }}>{isOpen ? "✕" : "🤖"}</span>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
