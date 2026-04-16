/**
 * CarCard.jsx — Individual car listing card
 */
import { useApp } from "../context/AppContext";

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        width="13" height="13"
        fill={star <= Math.round(rating) ? "#facc15" : "#334155"}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.461c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span style={{ color: "#64748b", fontSize: "0.7rem", marginLeft: "3px" }}>{rating}</span>
  </div>
);

const TYPE_COLORS = {
  SUV:      { bg: "rgba(16,185,129,0.12)",  text: "#6ee7b7", border: "rgba(16,185,129,0.25)"  },
  Sedan:    { bg: "rgba(99,102,241,0.12)",  text: "#a5b4fc", border: "rgba(99,102,241,0.25)"  },
  Hatchback:{ bg: "rgba(245,158,11,0.12)",  text: "#fcd34d", border: "rgba(245,158,11,0.25)"  },
  Coupe:    { bg: "rgba(239,68,68,0.12)",   text: "#fca5a5", border: "rgba(239,68,68,0.25)"   },
  Electric: { bg: "rgba(6,182,212,0.12)",   text: "#67e8f9", border: "rgba(6,182,212,0.25)"   },
};

const CarCard = ({ car }) => {
  const { toggleCompare, compareList, scrollToSection, setBookingPrefill, convertPrice, recommendedCar } = useApp();

  const isCompared    = compareList.some((c) => (c._id || c.name) === (car._id || car.name));
  const isRecommended = recommendedCar === car._id || recommendedCar === car.name;
  const typeStyle     = TYPE_COLORS[car.type] || { bg: "rgba(100,116,139,0.12)", text: "#94a3b8", border: "rgba(100,116,139,0.25)" };

  const handleBooking = () => {
    setBookingPrefill({ carModel: car.name });
    setTimeout(() => scrollToSection("booking"), 300);
  };

  return (
    <div
      className={isRecommended ? "car-recommended" : ""}
      style={{
        background: "rgba(19,19,26,0.90)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${isCompared ? "rgba(139,92,246,0.50)" : isRecommended ? "rgba(99,102,241,0.65)" : "#1e1e2e"}`,
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.50)";
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.40)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = isCompared ? "rgba(139,92,246,0.50)" : isRecommended ? "rgba(99,102,241,0.65)" : "#1e1e2e";
      }}
    >
      {/* ── Image area ── */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "#0d0d15" }}>
        <img
          src={car.image}
          alt={`${car.name} – VelocityAI Motors`}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onError={(e) => { e.target.style.display = "none"; e.target.parentNode.style.background = `linear-gradient(135deg, ${car.accentColor}22, ${car.accentColor}44)`; }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,21,0.85) 0%, transparent 55%)" }} />

        {/* Featured badge */}
        {car.isFeatured && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white", fontSize: "0.7rem", fontWeight: 700,
            padding: "3px 10px", borderRadius: "999px",
            boxShadow: "0 2px 8px rgba(99,102,241,0.45)",
          }}>
            ⭐ Featured
          </div>
        )}

        {/* AI recommended badge */}
        {isRecommended && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            color: "white", fontSize: "0.7rem", fontWeight: 700,
            padding: "3px 10px", borderRadius: "999px",
            animation: "pulse 2s ease-in-out infinite",
          }}>
            🤖 AI Pick
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.75rem" }}>

        {/* Type + Rating row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px",
            background: typeStyle.bg, color: typeStyle.text, border: `1px solid ${typeStyle.border}`,
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            {car.type}
          </span>
          <StarRating rating={car.rating} />
        </div>

        {/* Name + tagline */}
        <div>
          <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1.2, marginBottom: "4px" }}>
            {car.name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.4 }}>{car.tagline}</p>
        </div>

        {/* Price */}
        <div>
          <span className="font-display gradient-text" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
            {convertPrice(car.price)}
          </span>
          <span style={{ fontSize: "0.7rem", color: "#475569", marginLeft: "6px" }}>onwards</span>
        </div>

        {/* Specs mini grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { icon: "⚙️", label: "Engine",  value: car.specs?.engine?.split(" ")[0] || "—" },
            { icon: "⛽", label: "Mileage", value: car.specs?.mileage || "—" },
            { icon: "👥", label: "Seats",   value: `${car.specs?.seating || 5}` },
          ].map((spec) => (
            <div key={spec.label} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px", padding: "8px 4px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1rem", marginBottom: "2px" }}>{spec.icon}</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#f1f5f9" }}>{spec.value}</div>
              <div style={{ fontSize: "0.6rem", color: "#475569", marginTop: "1px" }}>{spec.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
          <button
            onClick={handleBooking}
            className="btn-neon"
            style={{
              flex: 1, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white", fontWeight: 700, fontSize: "0.875rem",
              padding: "0.6rem 1rem", borderRadius: "10px", border: "none",
              cursor: "pointer", boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.55)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.35)"}
          >
            Book Drive
          </button>
          <button
            onClick={() => toggleCompare(car)}
            title={isCompared ? "Remove from comparison" : "Compare"}
            style={{
              padding: "0.6rem 1rem", borderRadius: "10px", fontWeight: 700, fontSize: "0.875rem",
              border: `1px solid ${isCompared ? "rgba(139,92,246,0.50)" : "rgba(51,65,85,0.80)"}`,
              background: isCompared ? "rgba(139,92,246,0.15)" : "transparent",
              color: isCompared ? "#c4b5fd" : "#64748b",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (!isCompared) { e.currentTarget.style.borderColor = "rgba(99,102,241,0.40)"; e.currentTarget.style.color = "#f8fafc"; }}}
            onMouseLeave={e => { if (!isCompared) { e.currentTarget.style.borderColor = "rgba(51,65,85,0.80)"; e.currentTarget.style.color = "#64748b"; }}}
          >
            {isCompared ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
