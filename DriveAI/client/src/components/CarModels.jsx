/**
 * CarModels.jsx — Filterable car listing section
 */
import { useApp } from "../context/AppContext";
import CarCard from "./CarCard";

const CAR_GRID_STYLES = `
  /* Car grid: 1-col on mobile, auto-fill comfortable cols on larger screens */
  .car-models-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  @media (min-width: 480px) {
    .car-models-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  }

  /* Filter pill groups: stack vertically on narrow screens */
  .pill-group {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 6px;
    background: rgba(19,19,26,0.85);
    border: 1px solid #1e1e2e;
    border-radius: 12px;
    backdrop-filter: blur(16px);
  }

  /* Pill button shrinks label on xs */
  @media (max-width: 400px) {
    .pill-btn { padding: 0.375rem 0.625rem !important; font-size: 0.75rem !important; }
  }
`;


const TYPES = ["All", "SUV", "Sedan", "Hatchback", "Coupe", "Electric"];

const PRICE_RANGES = [
  { label: "All Budgets", max: null },
  { label: "Under ₹10L",  max: 1000000 },
  { label: "Under ₹20L",  max: 2000000 },
  { label: "Under ₹30L",  max: 3000000 },
];

/* Shared pill button styles */
const pill = (active) => ({
  padding: "0.4rem 1rem",
  borderRadius: "8px",
  fontSize: "0.8125rem",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s",
  background: active ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
  color: active ? "#ffffff" : "#94a3b8",
  boxShadow: active ? "0 4px 12px rgba(99,102,241,0.40)" : "none",
});

const CarModels = () => {
  const { filteredCars, carsLoading, filters, setFilters, highlightedSection } = useApp();

  const handleType  = (type) => setFilters((p) => ({ ...p, type: type === "All" ? "" : type }));
  const handlePrice = (max)  => setFilters((p) => ({ ...p, maxPrice: max }));
  const activeCount = (filters.type ? 1 : 0) + (filters.maxPrice ? 1 : 0);

  return (
    <>
      <style>{CAR_GRID_STYLES}</style>
      <section
        id="models"
        className={`section-padding ${highlightedSection === "models" ? "ai-highlight" : ""}`}
        style={{ background: "#0a0a0f" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
            }}>
              <span style={{ color: "#6ee7b7", fontSize: "0.875rem", fontWeight: 500 }}>🚗 Our Fleet</span>
            </div>

            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900,
              color: "#f8fafc", marginBottom: "1rem",
            }}>
              Explore <span className="gradient-text">All Models</span>
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "1.0625rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
              From fuel-efficient hatchbacks to fully electric powerhouses — find the car that matches your lifestyle.
            </p>
          </div>

          {/* ── Filter Bar ── */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2rem" }}>

            {/* Type pills */}
            <div className="pill-group">
              {TYPES.map((type) => {
                const active = (type === "All" && !filters.type) || filters.type === type;
                return (
                  <button
                    key={type}
                    onClick={() => handleType(type)}
                    className="pill-btn"
                    style={pill(active)}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#f8fafc"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#94a3b8"; }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Price pills */}
            <div className="pill-group">
              {PRICE_RANGES.map((range) => {
                const active = filters.maxPrice === range.max;
                return (
                  <button
                    key={range.label}
                    onClick={() => handlePrice(range.max)}
                    className="pill-btn"
                    style={pill(active)}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#f8fafc"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#94a3b8"; }}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

        {/* Active filter indicator */}
        {activeCount > 0 && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "999px", padding: "0.375rem 1rem",
            }}>
              <span style={{ color: "#a5b4fc", fontSize: "0.875rem" }}>
                🤖 AI filtered: {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} matched
              </span>
              <button
                onClick={() => setFilters({ type: "", maxPrice: null })}
                style={{ color: "#64748b", fontSize: "0.75rem", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {carsLoading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "6rem 0", gap: "1rem" }}>
            <div className="spinner" style={{ width: "40px", height: "40px" }} />
            <p style={{ color: "#64748b" }}>Loading cars from VelocityAI Motors...</p>
          </div>
        )}

          {/* Car grid */}
          {!carsLoading && filteredCars.length > 0 && (
            <div className="car-models-grid">
              {filteredCars.map((car, idx) => (
                <div
                  key={car._id || car.name}
                  className="fade-in-up"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!carsLoading && filteredCars.length === 0 && (
            <div style={{ textAlign: "center", padding: "6rem 1rem" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.5rem" }}>No cars match your filters</h3>
              <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>Try adjusting your filters or ask the AI assistant for help.</p>
              <button
                onClick={() => setFilters({ type: "", maxPrice: null })}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white", fontWeight: 700, fontSize: "0.9375rem",
                  padding: "0.75rem 1.75rem", borderRadius: "10px", border: "none", cursor: "pointer",
                }}
              >
                Show All Cars
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CarModels;
