/**
 * PricingSection.jsx — Pricing cards for all models
 */
import { useApp } from "../context/AppContext";

/* Injected responsive grid styles */
const PRICING_GRID_STYLES = `
  .pricing-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 640px) {
    .pricing-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 1024px) {
    .pricing-grid { grid-template-columns: 1fr 1fr 1fr; }
  }
`;

const PricingSection = () => {
  const { cars, convertPrice, scrollToSection, setBookingPrefill, highlightedSection, currency } = useApp();

  const getBadge = (car) => {
    if (car.isFeatured && car.type === "Electric") return { label: "🔋 Most Advanced", bg: "#0891b2" };
    if (car.isFeatured && car.type === "Coupe")    return { label: "🏁 Performance King", bg: "#dc2626" };
    if (car.isFeatured)                             return { label: "⭐ Most Popular",    bg: "#6366f1" };
    if (cars.length && car.price === Math.min(...cars.map((c) => c.price))) return { label: "💚 Best Value", bg: "#059669" };
    return null;
  };

  const handleBook = (car) => {
    setBookingPrefill({ carModel: car.name });
    setTimeout(() => scrollToSection("booking"), 300);
  };

  const sortedCars = [...cars].sort((a, b) => a.price - b.price);

  return (
    <>
      <style>{PRICING_GRID_STYLES}</style>
      <section
        id="pricing"
      className={`section-padding ${highlightedSection === "pricing" ? "ai-highlight" : ""}`}
      style={{ background: "linear-gradient(180deg, #0d0d15 0%, #0a0a0f 100%)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
          }}>
            <span style={{ color: "#fcd34d", fontSize: "0.875rem", fontWeight: 500 }}>💰 Pricing</span>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900, color: "#f8fafc", marginBottom: "1rem" }}>
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.0625rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
            No hidden costs. What you see is what you pay. Prices shown in{" "}
            <span style={{ color: "#a5b4fc", fontWeight: 600 }}>{currency}</span>.
            Ask the AI to switch currency anytime.
          </p>
        </div>

        {/* ── Pricing cards grid ── */}
        <div className="pricing-grid">
          {sortedCars.map((car, idx) => {
            const badge     = getBadge(car);
            const isFeatured = car.isFeatured;

            return (
              <div
                key={car._id || car.name}
                className="fade-in-up"
                style={{ animationDelay: `${idx * 0.07}s`, display: "flex" }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(19,19,26,0.90)",
                    border: `1px solid ${isFeatured ? "rgba(99,102,241,0.35)" : "#1e1e2e"}`,
                    borderRadius: "20px",
                    padding: "1.75rem",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isFeatured ? "0 0 40px rgba(99,102,241,0.10)" : "none",
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isFeatured ? "0 0 40px rgba(99,102,241,0.10)" : "none"; }}
                >
                  {/* Badge */}
                  {badge && (
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      background: badge.bg, color: "white",
                      fontSize: "0.7rem", fontWeight: 700,
                      padding: "5px 14px", borderRadius: "0 18px 0 12px",
                    }}>
                      {badge.label}
                    </div>
                  )}

                  {/* Glow blob for featured */}
                  {isFeatured && (
                    <div style={{
                      position: "absolute", top: "-40px", right: "-40px",
                      width: "120px", height: "120px", borderRadius: "50%",
                      background: car.accentColor || "#6366f1",
                      opacity: 0.12, filter: "blur(24px)", pointerEvents: "none",
                    }} />
                  )}

                  {/* Type + Name */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                      {car.type}
                    </div>
                    <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", lineHeight: 1.2, marginBottom: "6px" }}>
                      {car.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>{car.tagline}</p>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div
                      className="font-display"
                      style={{ fontSize: "2.25rem", fontWeight: 900, color: car.accentColor || "#6366f1", lineHeight: 1 }}
                    >
                      {convertPrice(car.price)}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#475569", marginTop: "5px" }}>Ex-showroom · onwards</div>
                  </div>

                  {/* Features list */}
                  <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {(car.features || []).slice(0, 5).map((feat) => (
                      <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.875rem", color: "#cbd5e1" }}>
                        <span style={{ color: "#818cf8", marginTop: "1px", flexShrink: 0 }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Spec mini row */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0.5rem", padding: "0.875rem 0",
                    borderTop: "1px solid #1e1e2e", borderBottom: "1px solid #1e1e2e",
                    marginBottom: "1.25rem",
                  }}>
                    {[
                      { icon: "⛽", v: car.specs?.mileage },
                      { icon: "⚡", v: car.specs?.power },
                      { icon: "👥", v: car.specs?.seating ? `${car.specs.seating}s` : "—" },
                    ].map((s) => (
                      <div key={s.icon} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.875rem" }}>{s.icon}</div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", marginTop: "2px" }}>{s.v || "—"}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBook(car)}
                    className={isFeatured ? "btn-neon" : ""}
                    style={{
                      width: "100%", padding: "0.8125rem",
                      borderRadius: "12px", fontWeight: 700, fontSize: "0.9375rem",
                      cursor: "pointer", transition: "all 0.2s",
                      background: isFeatured ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                      color: isFeatured ? "white" : "#94a3b8",
                      border: isFeatured ? "none" : "1px solid #2a2a3a",
                      boxShadow: isFeatured ? "0 6px 20px rgba(99,102,241,0.35)" : "none",
                    }}
                    onMouseEnter={e => {
                      if (!isFeatured) { e.currentTarget.style.borderColor = "rgba(99,102,241,0.40)"; e.currentTarget.style.color = "#f8fafc"; }
                      else e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.55)";
                    }}
                    onMouseLeave={e => {
                      if (!isFeatured) { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.color = "#94a3b8"; }
                      else e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)";
                    }}
                  >
                    Book Test Drive →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: "center", color: "#334155", fontSize: "0.75rem", marginTop: "2.5rem", lineHeight: 1.6 }}>
          * All prices are ex-showroom. On-road prices may vary by city. GST, registration, and insurance are extra.
          Ask our AI assistant for detailed pricing in your city.
        </p>
      </div>
    </section>
    </>
  );
};

export default PricingSection;
