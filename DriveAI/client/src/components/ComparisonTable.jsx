/**
 * ComparisonTable.jsx — Side-by-side car comparison
 */
import { useApp } from "../context/AppContext";

const SPEC_ROWS = [
  { label: "Engine",          key: "engine" },
  { label: "Mileage / Range", key: "mileage" },
  { label: "Power",           key: "power" },
  { label: "Top Speed",       key: "topSpeed" },
  { label: "Seating",         key: "seating", format: (v) => `${v} seats` },
  { label: "Transmission",    key: "transmission" },
];

const COMPARISON_STYLES = `
  .comparison-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 20px;
  }
  .comparison-table {
    min-width: 560px;
    background: rgba(19,19,26,0.90);
    border: 1px solid #1e1e2e;
    border-radius: 20px;
    overflow: hidden;
  }
`;

const cellHead = {
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#94a3b8",
  padding: "1rem 1.25rem",
  borderBottom: "1px solid #1e1e2e",
  textAlign: "left",
};

const ComparisonTable = () => {
  const {
    compareList,
    setCompareList,
    cars,
    convertPrice,
    scrollToSection,
    highlightedSection,
  } = useApp();

  const isEmpty = compareList.length === 0;

  const addToCompare = (car) => {
    if (compareList.length >= 2) return;
    setCompareList((prev) => [...prev, car]);
  };

  return (
    <>
      <style>{COMPARISON_STYLES}</style>

      <section
        id="comparison"
        className={`section-padding ${highlightedSection === "comparison" ? "ai-highlight" : ""}`}
        style={{ background: "#0d0d15" }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(6,182,212,0.10)", border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
            }}>
              <span style={{ color: "#67e8f9", fontSize: "0.875rem", fontWeight: 500 }}>⚖️ Compare</span>
            </div>

            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900,
              color: "#f8fafc", marginBottom: "1rem",
            }}>
              Side-by-<span className="gradient-text">Side</span>
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "1.0625rem", lineHeight: 1.65, maxWidth: "480px", margin: "0 auto" }}>
              Select two cars using the <strong style={{ color: "#f8fafc" }}>+</strong> button on any car card, or ask the AI to compare them.
            </p>
          </div>

          {/* ── Empty state ── */}
          {isEmpty && (
            <div style={{
              background: "rgba(19,19,26,0.85)", border: "1px solid #1e1e2e",
              borderRadius: "20px", padding: "4rem 2rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚗 🆚 🚗</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.75rem" }}>
                No cars selected yet
              </h3>
              <p style={{ color: "#94a3b8", maxWidth: "400px", margin: "0 auto 1.75rem", lineHeight: 1.65 }}>
                Add cars to compare by clicking the <strong style={{ color: "#f8fafc" }}>+</strong> button on any car card,
                or ask the AI: <em style={{ color: "#a5b4fc" }}>"Compare top two cars"</em>
              </p>
              <button
                onClick={() => scrollToSection("models")}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white", fontWeight: 700, fontSize: "0.9375rem",
                  padding: "0.75rem 1.75rem", borderRadius: "10px", border: "none", cursor: "pointer",
                }}
              >
                Browse Cars
              </button>
            </div>
          )}

          {/* ── Comparison table ── */}
          {!isEmpty && (
            <div className="comparison-scroll">
              <div className="comparison-table">

                {/* Car header row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1e1e2e" }}>
                  <div style={{ ...cellHead, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem" }}>
                    Specification
                  </div>

                  {[compareList[0], compareList[1]].map((car, ci) => (
                    <div key={ci} style={{ padding: "1.25rem", borderLeft: "1px solid #1e1e2e", textAlign: "center" }}>
                      {car ? (
                        <>
                          <img
                            src={car.image}
                            alt={car.name}
                            style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "10px", marginBottom: "0.75rem" }}
                          />
                          <div className="font-display" style={{ fontWeight: 800, color: "#f8fafc", fontSize: "1.0625rem" }}>
                            {car.name}
                          </div>
                          <div style={{ fontWeight: 700, color: ci === 0 ? "#a5b4fc" : "#c4b5fd", fontSize: "0.9375rem", marginTop: "4px" }}>
                            {convertPrice(car.price)}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {car.type}
                          </div>
                        </>
                      ) : (
                        <div style={{
                          height: "110px", border: "2px dashed #2a2a3a", borderRadius: "10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#475569", fontSize: "0.875rem",
                        }}>
                          Select a car
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Spec rows */}
                {SPEC_ROWS.map((row, idx) => {
                  const val1 = compareList[0]?.specs?.[row.key];
                  const val2 = compareList[1]?.specs?.[row.key];
                  const fmt1 = val1 ? (row.format ? row.format(val1) : val1) : "—";
                  const fmt2 = val2 ? (row.format ? row.format(val2) : val2) : "—";
                  const diff = fmt1 !== fmt2 && val1 && val2;

                  return (
                    <div
                      key={row.label}
                      style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                        borderBottom: "1px solid #1e1e2e",
                        background: diff ? "rgba(99,102,241,0.04)" : idx % 2 === 0 ? "rgba(255,255,255,0.006)" : "transparent",
                      }}
                    >
                      <div style={{ padding: "0.875rem 1.25rem", color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500 }}>
                        {row.label}
                      </div>
                      <div style={{ padding: "0.875rem 1.25rem", borderLeft: "1px solid #1e1e2e", textAlign: "center", fontSize: "0.875rem", fontWeight: 600, color: diff ? "#a5b4fc" : "#f8fafc" }}>
                        {fmt1}{diff && <span style={{ marginLeft: "5px", color: "#6366f1", fontSize: "0.7rem" }}>●</span>}
                      </div>
                      <div style={{ padding: "0.875rem 1.25rem", borderLeft: "1px solid #1e1e2e", textAlign: "center", fontSize: "0.875rem", fontWeight: 600, color: diff ? "#c4b5fd" : "#f8fafc" }}>
                        {fmt2}{diff && <span style={{ marginLeft: "5px", color: "#8b5cf6", fontSize: "0.7rem" }}>●</span>}
                      </div>
                    </div>
                  );
                })}

                {/* Rating row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1e1e2e" }}>
                  <div style={{ padding: "0.875rem 1.25rem", color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500 }}>
                    User Rating
                  </div>
                  <div style={{ padding: "0.875rem 1.25rem", borderLeft: "1px solid #1e1e2e", textAlign: "center", fontSize: "0.875rem", fontWeight: 700, color: "#fbbf24" }}>
                    {compareList[0]?.rating ? `⭐ ${compareList[0].rating}/5` : "—"}
                  </div>
                  <div style={{ padding: "0.875rem 1.25rem", borderLeft: "1px solid #1e1e2e", textAlign: "center", fontSize: "0.875rem", fontWeight: 700, color: "#fbbf24" }}>
                    {compareList[1]?.rating ? `⭐ ${compareList[1].rating}/5` : "—"}
                  </div>
                </div>

                {/* Remove buttons row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "1rem 1.25rem", gap: "0.75rem" }}>
                  <div style={{ fontSize: "0.7rem", color: "#475569", display: "flex", alignItems: "center" }}>
                    <span>● = values differ</span>
                  </div>
                  {[0, 1].map((ci) => (
                    <div key={ci} style={{ textAlign: "center" }}>
                      {compareList[ci] && (
                        <button
                          onClick={() => setCompareList((prev) => prev.filter((_, i) => i !== ci))}
                          style={{ fontSize: "0.8125rem", color: "#64748b", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

              </div>{/* /comparison-table */}
            </div>
          )}{/* /!isEmpty */}

          {/* Quick-add bar */}
          {!isEmpty && compareList.length < 2 && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1rem" }}>Add another car to compare:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                {cars
                  .filter((c) => !compareList.find((comp) => (comp._id || comp.name) === (c._id || c.name)))
                  .slice(0, 4)
                  .map((car) => (
                    <button
                      key={car._id || car.name}
                      onClick={() => addToCompare(car)}
                      style={{
                        background: "rgba(19,19,26,0.85)", border: "1px solid #1e1e2e",
                        borderRadius: "10px", padding: "0.5rem 1rem",
                        fontSize: "0.875rem", color: "#94a3b8", cursor: "pointer",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.40)"; e.currentTarget.style.color = "#f8fafc"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      + {car.name}
                    </button>
                  ))}
              </div>
            </div>
          )}

        </div>{/* /max-width container */}
      </section>
    </>
  );
};

export default ComparisonTable;
