/**
 * ContactSection.jsx — Contact info + quick message form + footer
 */
import { useState } from "react";
import { useApp } from "../context/AppContext";

const CONTACT_INFO = [
  { icon: "📍", title: "Head Office",     value: "VelocityAI Tower, Bandra Kurla Complex, Mumbai 400051" },
  { icon: "📞", title: "Sales Hotline",   value: "+91 1800-VELOCITY (24/7)" },
  { icon: "✉️", title: "Email",           value: "hello@velocityai.motors" },
  { icon: "🕘", title: "Showroom Hours",  value: "Mon–Sat: 9 AM – 8 PM  |  Sun: 10 AM – 6 PM" },
];

const SOCIALS = ["🐦 Twitter", "📸 Instagram", "💼 LinkedIn", "▶️ YouTube"];

const iStyle = {
  display: "block", width: "100%",
  padding: "0.8125rem 1rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid #1e1e2e",
  borderRadius: "10px",
  color: "#f8fafc",
  fontSize: "0.9375rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const ContactSection = () => {
  const { highlightedSection } = useApp();
  const [sent, setSent]   = useState(false);
  const [msg,  setMsg]    = useState({ name: "", email: "", text: "" });

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.name || !msg.email || !msg.text) return;
    setSent(true);
  };

  const onFocus = (e) => { e.target.style.borderColor = "rgba(99,102,241,0.60)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "#1e1e2e"; e.target.style.boxShadow = "none"; };

  return (
    <section
      id="contact"
      className={`section-padding ${highlightedSection === "contact" ? "ai-highlight" : ""}`}
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #060608 100%)" }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(244,63,94,0.10)", border: "1px solid rgba(244,63,94,0.25)",
            borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
          }}>
            <span style={{ color: "#fb7185", fontSize: "0.875rem", fontWeight: 500 }}>📬 Get In Touch</span>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900, color: "#f8fafc", marginBottom: "1rem" }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.0625rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            Our team is ready to answer any questions about our cars, pricing, or financing options.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}
          className="contact-grid">
          <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>

          {/* Left: contact info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {CONTACT_INFO.map((info) => (
              <div
                key={info.title}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  background: "rgba(19,19,26,0.85)", border: "1px solid #1e1e2e",
                  borderRadius: "14px", padding: "1.25rem 1.5rem",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.30)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <span style={{ fontSize: "1.75rem", flexShrink: 0, lineHeight: 1 }}>{info.icon}</span>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{info.title}</div>
                  <div style={{ fontSize: "0.9375rem", color: "#e2e8f0", fontWeight: 500, lineHeight: 1.4 }}>{info.value}</div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{
              background: "rgba(19,19,26,0.85)", border: "1px solid #1e1e2e",
              borderRadius: "14px", padding: "1.25rem 1.5rem",
            }}>
              <div style={{ fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.875rem" }}>
                Follow Us
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {SOCIALS.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "0.8rem", fontWeight: 500,
                      background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a3a",
                      padding: "0.375rem 0.875rem", borderRadius: "999px",
                      color: "#94a3b8", cursor: "pointer",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.40)"; e.currentTarget.style.color = "#f8fafc"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#94a3b8"; }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: quick message form */}
          <div style={{
            background: "rgba(19,19,26,0.90)", border: "1px solid #1e1e2e",
            borderRadius: "20px", padding: "2rem",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💌</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setMsg({ name: "", email: "", text: "" }); }}
                  style={{ fontSize: "0.875rem", color: "#a5b4fc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display" style={{ fontSize: "1.3125rem", fontWeight: 700, color: "#f8fafc", marginBottom: "1.5rem" }}>
                  Send a Quick Message
                </h3>
                <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Your Name</label>
                    <input type="text" placeholder="Your name" value={msg.name}
                      onChange={(e) => setMsg((p) => ({ ...p, name: e.target.value }))}
                      style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Your Email</label>
                    <input type="email" placeholder="Your email" value={msg.email}
                      onChange={(e) => setMsg((p) => ({ ...p, email: e.target.value }))}
                      style={iStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Message</label>
                    <textarea rows={4} placeholder="What's on your mind?" value={msg.text}
                      onChange={(e) => setMsg((p) => ({ ...p, text: e.target.value }))}
                      style={{ ...iStyle, resize: "none" }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <button
                    type="submit"
                    className="btn-neon"
                    style={{
                      width: "100%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white", fontWeight: 700, fontSize: "1rem",
                      padding: "0.875rem", borderRadius: "12px", border: "none", cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div style={{
          marginTop: "4rem", paddingTop: "2rem",
          borderTop: "1px solid #1e1e2e",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "center", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="15" height="15" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ color: "#64748b", fontSize: "0.875rem" }}>
              © 2025 <strong style={{ color: "#e2e8f0" }}>VelocityAI Motors</strong>. All rights reserved.
            </span>
          </div>
          <div style={{ color: "#334155", fontSize: "0.75rem" }}>
            Built with ❤️ using React + Node.js + MongoDB · Powered by DriveAI
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
