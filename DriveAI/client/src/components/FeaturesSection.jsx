/**
 * FeaturesSection.jsx — Brand feature highlights
 */
import { useApp } from "../context/AppContext";

/* Injected responsive grid styles */
const GRID_STYLES = `
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 640px) {
    .features-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 1024px) {
    .features-grid { grid-template-columns: 1fr 1fr 1fr; }
  }
`;

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Powered Assistance",
    description: "Our intelligent assistant understands natural language to help you filter cars, compare models, and book test drives — all with a single message.",
    accent: "#6366f1",
    tag: "Core Feature",
  },
  {
    icon: "⚡",
    title: "Electric & Hybrid Lineup",
    description: "Future-ready vehicles with up to 450 km real-world range, DC fast charging in 30 minutes, and over-the-air software updates.",
    accent: "#06b6d4",
    tag: "Eco-Friendly",
  },
  {
    icon: "🛡️",
    title: "Level 2 ADAS Safety",
    description: "Advanced Driver Assistance Systems including adaptive cruise control, lane keeping, automatic emergency braking, and 360° camera.",
    accent: "#10b981",
    tag: "Safety",
  },
  {
    icon: "🔧",
    title: "5-Year Warranty",
    description: "Industry-leading 5-year / 1,50,000 km comprehensive warranty on all models, with 24×7 roadside assistance across India.",
    accent: "#f59e0b",
    tag: "Peace of Mind",
  },
  {
    icon: "📱",
    title: "Connected Car Tech",
    description: "Real-time vehicle diagnostics, remote locking, climate pre-conditioning, and trip analytics — all from your smartphone.",
    accent: "#8b5cf6",
    tag: "Smart Tech",
  },
  {
    icon: "🏁",
    title: "Performance Heritage",
    description: "Born from motorsport DNA, our Eclipse GT delivers 280 bhp and 0–100 in 5.2 seconds while remaining road-legal and daily-driver friendly.",
    accent: "#ef4444",
    tag: "Performance",
  },
];

const FeaturesSection = () => {
  const { highlightedSection } = useApp();

  return (
    <>
      <style>{GRID_STYLES}</style>
    <section
      id="features"
      className={`section-padding ${highlightedSection === "features" ? "ai-highlight" : ""}`}
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d15 100%)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
          }}>
            <span style={{ color: "#c4b5fd", fontSize: "0.875rem", fontWeight: 500 }}>✨ Why VelocityAI Motors</span>
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900,
            color: "#f8fafc", marginBottom: "1rem",
          }}>
            Built for the <span className="gradient-text">Future You</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.0625rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.65 }}>
            Every VelocityAI vehicle is engineered with cutting-edge technology, top-tier safety, and AI intelligence — standard.
          </p>
        </div>

        {/* ── Feature Cards grid ── */}
        <div className="features-grid" style={{ marginBottom: "3rem" }}>
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className="fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div
                style={{
                  height: "100%",
                  background: "rgba(19,19,26,0.85)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${feature.accent}22`,
                  borderRadius: "16px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.40)`;
                  e.currentTarget.style.borderColor = `${feature.accent}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${feature.accent}22`;
                }}
              >
                {/* Subtle corner glow */}
                <div style={{
                  position: "absolute", top: "-30px", right: "-30px",
                  width: "100px", height: "100px", borderRadius: "50%",
                  background: feature.accent, opacity: 0.06, filter: "blur(20px)",
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{ fontSize: "2.25rem", lineHeight: 1 }}>{feature.icon}</div>

                {/* Tag */}
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, color: "#64748b",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {feature.tag}
                </span>

                {/* Title */}
                <h3 className="font-display" style={{ fontSize: "1.1875rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.3 }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, flex: 1 }}>
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  height: "2px", width: "40px", borderRadius: "1px",
                  background: feature.accent, marginTop: "0.25rem", opacity: 0.6,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid rgba(99,102,241,0.20)",
          borderRadius: "20px",
          padding: "3rem 2rem",
          textAlign: "center",
        }}>
          <h3 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f8fafc", marginBottom: "0.75rem" }}>
            Experience it yourself
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "1.75rem", maxWidth: "440px", margin: "0 auto 1.75rem" }}>
            Book a free test drive at your nearest VelocityAI showroom. No commitment needed.
          </p>
          <button
            onClick={() => { document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-neon"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white", fontWeight: 700, fontSize: "1rem",
              padding: "0.875rem 2.25rem", borderRadius: "12px", border: "none",
              cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.40)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(99,102,241,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.40)"; }}
          >
            Book Free Test Drive →
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturesSection;
