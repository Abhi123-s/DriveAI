/**
 * HeroSection.jsx — Full-screen landing hero
 * Fixed: floating cards anchored to image wrapper, not the column div.
 * Left text column properly ordered and proportioned.
 */
import { useApp } from "../context/AppContext";

const STATS = [
  { value: "6+",    label: "Models"     },
  { value: "450km", label: "EV Range"   },
  { value: "5★",    label: "Rating"     },
  { value: "AI",    label: "Powered"    },
];

const HeroSection = () => {
  const { scrollToSection, highlightedSection } = useApp();

  return (
    <section
      id="hero"
      className={highlightedSection === "hero" ? "ai-highlight" : ""}
      style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: "#0a0a0f", overflow: "hidden" }}
    >
      {/* ── Injected CSS ── */}
      <style>{`
        @keyframes heroFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes heroPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.65;transform:scale(1.06)} }
        @keyframes heroBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-7px)} }

        /* Two-column hero grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Right image column — hidden on mobile, flex on desktop */
        .hero-img-col {
          display: none;
          position: relative;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .hero-img-col { display: flex; }
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position:"absolute", top:"15%", left:"5%", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", animation:"heroPulse 5s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:"15%", right:"5%", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", animation:"heroPulse 5s ease-in-out infinite 2s" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.035, backgroundImage:`linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)`, backgroundSize:"64px 64px" }} />
      </div>

      {/* Main content */}
      <div style={{ position:"relative", zIndex:10, maxWidth:"1280px", margin:"0 auto", padding:"6rem 1.5rem 3rem", width:"100%" }}>
        <div className="hero-grid">

          {/* ══════════════ LEFT: Text Column ══════════════ */}
          <div className="fade-in-up">

            {/* 1. AI badge pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(99,102,241,0.10)", border:"1px solid rgba(99,102,241,0.30)", borderRadius:"999px", padding:"0.375rem 1rem", marginBottom:"1.25rem" }}>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#818cf8", display:"inline-block", animation:"heroPulse 2s ease-in-out infinite", flexShrink:0 }} />
              <span style={{ color:"#a5b4fc", fontSize:"0.875rem", fontWeight:500, whiteSpace:"nowrap" }}>AI-Powered Car Discovery</span>
            </div>

            {/* 2. Main headline */}
            <h1 className="font-display" style={{ fontSize:"clamp(2.75rem, 5.5vw, 5rem)", fontWeight:900, lineHeight:1.06, letterSpacing:"-0.02em", color:"#f8fafc", marginBottom:"1.25rem", margin:"0 0 1.25rem 0" }}>
              Drive the<br />
              <span className="gradient-text">Future.</span><br />
              Today.
            </h1>

            {/* 3. Subheading */}
            <p style={{ color:"#94a3b8", fontSize:"1rem", lineHeight:1.75, maxWidth:"480px", marginBottom:"2rem" }}>
              Meet <strong style={{ color:"#f8fafc" }}>VelocityAI Motors</strong> — where our AI assistant
              helps you find, compare, and book your perfect car in seconds.
              Powered by intelligence. Built for speed.
            </p>

            {/* 4. CTA buttons */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.875rem", marginBottom:"2.5rem" }}>
              <button
                onClick={() => scrollToSection("models")}
                className="btn-neon"
                style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"white", fontWeight:700, fontSize:"0.9375rem", padding:"0.8125rem 1.875rem", borderRadius:"12px", border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(99,102,241,0.40)", transition:"transform .2s,box-shadow .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(99,102,241,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(99,102,241,0.40)"; }}
              >
                Explore Models
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                style={{ background:"transparent", color:"#f8fafc", fontWeight:700, fontSize:"0.9375rem", padding:"0.8125rem 1.875rem", borderRadius:"12px", border:"1px solid rgba(148,163,184,0.30)", cursor:"pointer", transition:"background .2s,border-color .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(99,102,241,0.50)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(148,163,184,0.30)"; }}
              >
                Book Test Drive
              </button>
            </div>

            {/* 5. Stats row */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"2rem", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"1.5rem" }}>
              {STATS.map((stat) => (
                <div key={stat.label} style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
                  <span className="font-display" style={{ fontSize:"1.625rem", fontWeight:900, color:"#f8fafc", lineHeight:1 }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize:"0.68rem", color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT: Car Image Column ══════════════ */}
          <div className="hero-img-col">
            {/* Outer glow rings — centered behind image */}
            <div style={{ position:"absolute", width:"360px", height:"360px", borderRadius:"50%", border:"1px solid rgba(99,102,241,0.18)", background:"radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", animation:"heroPulse 4s ease-in-out infinite", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
            <div style={{ position:"absolute", width:"260px", height:"260px", borderRadius:"50%", border:"1px solid rgba(139,92,246,0.15)", background:"radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)", animation:"heroPulse 4s ease-in-out infinite 1.5s", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />

            {/* ── Image wrapper — ALL floating cards anchored here ── */}
            <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"480px", animation:"heroFloat 6s ease-in-out infinite" }}>

              {/* Main car image */}
              <img
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&auto=format&fit=crop&q=80"
                alt="VelocityAI Titan Pro flagship SUV"
                style={{ width:"100%", objectFit:"cover", borderRadius:"18px", display:"block", filter:"drop-shadow(0 0 50px rgba(99,102,241,0.50))" }}
              />

              {/* Floating info card — bottom-left corner of image */}
              {/* <div style={{
                position:"absolute", bottom:"-12px", left:"12px",
                background:"rgba(13,13,21,0.92)",
                backdropFilter:"blur(16px)",
                border:"1px solid rgba(99,102,241,0.25)",
                borderRadius:"12px",
                padding:"0.625rem 1rem",
                display:"flex", alignItems:"center", gap:"0.625rem",
                boxShadow:"0 8px 24px rgba(0,0,0,0.40)",
              }}>
                <span style={{ width:"9px", height:"9px", borderRadius:"50%", background:"#34d399", animation:"heroPulse 2s ease-in-out infinite", display:"inline-block", flexShrink:0 }} />
                <div>
                  <div style={{ color:"#f8fafc", fontSize:"0.8125rem", fontWeight:700, lineHeight:1.3 }}>Titan Pro</div>
                  <div style={{ color:"#94a3b8", fontSize:"0.7rem", lineHeight:1.3 }}>Flagship SUV · ₹24.99L</div>
                </div>
              </div> */}

              {/* Floating AI badge — top-right corner of image */}
              <div style={{
                position:"absolute", top:"12px", right:"12px",
                background:"rgba(13,13,21,0.92)",
                backdropFilter:"blur(16px)",
                border:"1px solid rgba(6,182,212,0.30)",
                borderRadius:"8px",
                padding:"0.375rem 0.75rem",
                boxShadow:"0 4px 12px rgba(0,0,0,0.30)",
              }}>
                <span style={{ color:"#22d3ee", fontSize:"0.75rem", fontWeight:700, whiteSpace:"nowrap" }}>⚡ AI Powered</span>
              </div>
            </div>
          </div>

        </div>{/* /hero-grid */}
      </div>{/* /content */}

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:"1.5rem", left:"50%", animation:"heroBounce 2s ease-in-out infinite", display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
        <span style={{ color:"#2d3748", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.15em" }}>Scroll</span>
        <svg width="14" height="14" fill="none" stroke="#2d3748" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
