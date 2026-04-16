/**
 * BookingForm.jsx — Test Drive Booking Form
 */
import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

const CAR_OPTIONS = ["Apex Lite", "Nova Pulse", "Titan Pro", "Zephyr EV", "Eclipse GT", "Horizon X"];
const CITY_OPTIONS = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune",
  "Kolkata", "Ahmedabad", "Jaipur", "Kochi", "Surat", "Noida",
  "Gurgaon", "Chandigarh", "Lucknow",
];

const inputStyle = (hasError) => ({
  display: "block",
  width: "100%",
  padding: "0.8125rem 1rem",
  background: "rgba(255,255,255,0.05)",
  border: `1px solid ${hasError ? "rgba(239,68,68,0.60)" : "#1e1e2e"}`,
  borderRadius: "10px",
  color: "#f8fafc",
  fontSize: "0.9375rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
});

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "0.5rem",
};

const BookingForm = () => {
  const { bookingPrefill, setBookingPrefill, highlightedSection } = useApp();

  const [form, setForm] = useState({ name: "", email: "", phone: "", carModel: "", city: "", date: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    if (Object.keys(bookingPrefill).length > 0) {
      setForm((prev) => ({ ...prev, ...bookingPrefill }));
      setBookingPrefill({});
    }
  }, [bookingPrefill, setBookingPrefill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) errs.phone = "Enter a valid 10-digit phone";
    if (!form.carModel) errs.carModel = "Please select a car model";
    if (!form.city)     errs.city     = "Please select a city";
    if (!form.date)     errs.date     = "Please choose a date";
    else {
      const sel = new Date(form.date), today = new Date();
      today.setHours(0, 0, 0, 0);
      if (sel < today) errs.date = "Date must be today or later";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await axios.post("/api/bookings", form);
      setStatus("success");
      setResponseMsg(res.data.message || "Test drive booked successfully!");
      setForm({ name: "", email: "", phone: "", carModel: "", city: "", date: "", message: "" });
    } catch (err) {
      if (!err.response) {
        setStatus("success");
        setResponseMsg("🎉 Booking received! (Demo mode — backend offline). We'll contact you soon.");
      } else {
        setStatus("error");
        setResponseMsg(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const focusStyle = (e) => {
    e.target.style.borderColor = "rgba(99,102,241,0.60)";
    e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.12)";
  };
  const blurStyle = (e, fieldName) => {
    e.target.style.borderColor = errors[fieldName] ? "rgba(239,68,68,0.60)" : "#1e1e2e";
    e.target.style.boxShadow   = "none";
  };

  return (
    <section
      id="booking"
      className={`section-padding ${highlightedSection === "booking" ? "ai-highlight" : ""}`}
      style={{ background: "#0a0a0f" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "999px", padding: "0.375rem 1rem", marginBottom: "1rem",
          }}>
            <span style={{ color: "#a5b4fc", fontSize: "0.875rem", fontWeight: 500 }}>🚗 Free Test Drive</span>
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900, color: "#f8fafc", marginBottom: "1rem" }}>
            Book Your <span className="gradient-text">Test Drive</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.0625rem", lineHeight: 1.65 }}>
            No commitment. Just pure driving joy. Our team will confirm within 24 hours.
          </p>
        </div>

        {/* ── Success state ── */}
        {status === "success" ? (
          <div style={{
            background: "rgba(19,19,26,0.90)", border: "1px solid #1e1e2e",
            borderRadius: "20px", padding: "4rem 2rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
            <h3 className="font-display" style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f8fafc", marginBottom: "0.75rem" }}>You're All Set!</h3>
            <p style={{ color: "#cbd5e1", fontSize: "1.0625rem", marginBottom: "2rem", lineHeight: 1.65 }}>{responseMsg}</p>
            <button
              onClick={() => setStatus("idle")}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white", fontWeight: 700, fontSize: "1rem",
                padding: "0.875rem 2rem", borderRadius: "12px", border: "none", cursor: "pointer",
              }}
            >
              Book Another Drive
            </button>
          </div>
        ) : (
          /* ── Form card ── */
          <div style={{
            background: "rgba(19,19,26,0.90)",
            border: "1px solid #1e1e2e",
            borderRadius: "20px",
            padding: "2.5rem",
          }}>
            {/* AI prefill notice */}
            {(form.carModel || form.city || form.date) && (
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.20)",
                borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.75rem",
              }}>
                <span style={{ color: "#a5b4fc", fontSize: "0.875rem" }}>🤖 AI pre-filled some fields for you!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}
                className="form-row">
                <style>{`.form-row { grid-template-columns: 1fr 1fr; } @media(max-width:560px){.form-row{grid-template-columns:1fr!important;}}`}</style>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="John Doe" style={inputStyle(errors.name)}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "name")} />
                  {errors.name && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com" style={inputStyle(errors.email)}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "email")} />
                  {errors.email && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.email}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }} className="form-row">
                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="9876543210" style={inputStyle(errors.phone)}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "phone")} />
                  {errors.phone && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.phone}</p>}
                </div>
                {/* Car model */}
                <div>
                  <label style={labelStyle}>Car Model *</label>
                  <select name="carModel" value={form.carModel} onChange={handleChange}
                    style={{ ...inputStyle(errors.carModel), cursor: "pointer" }}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "carModel")}>
                    <option value="" disabled>Select a model</option>
                    {CAR_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.carModel && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.carModel}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }} className="form-row">
                {/* City */}
                <div>
                  <label style={labelStyle}>Preferred City *</label>
                  <select name="city" value={form.city} onChange={handleChange}
                    style={{ ...inputStyle(errors.city), cursor: "pointer" }}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "city")}>
                    <option value="" disabled>Select city</option>
                    {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.city}</p>}
                </div>
                {/* Date */}
                <div>
                  <label style={labelStyle}>Preferred Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange}
                    min={todayStr} style={{ ...inputStyle(errors.date), cursor: "pointer" }}
                    onFocus={focusStyle} onBlur={(e) => blurStyle(e, "date")} />
                  {errors.date && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "5px" }}>{errors.date}</p>}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={labelStyle}>Additional Notes (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Any specific requirements, questions, or preferences..."
                  style={{ ...inputStyle(false), resize: "none" }}
                  onFocus={focusStyle} onBlur={(e) => blurStyle(e, "message")} />
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div style={{
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.30)",
                  borderRadius: "10px", padding: "0.875rem 1rem", marginBottom: "1.25rem",
                  color: "#fca5a5", fontSize: "0.875rem",
                }}>
                  {responseMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-neon"
                style={{
                  width: "100%",
                  background: status === "loading" ? "rgba(99,102,241,0.50)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white", fontWeight: 700, fontSize: "1rem",
                  padding: "1rem", borderRadius: "12px", border: "none",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.boxShadow = "0 10px 32px rgba(99,102,241,0.55)"; }}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.35)"}
              >
                {status === "loading" ? (
                  <>
                    <div className="spinner" style={{ width: "20px", height: "20px" }} />
                    <span>Booking your test drive...</span>
                  </>
                ) : "Confirm Test Drive Booking →"}
              </button>

              <p style={{ textAlign: "center", color: "#334155", fontSize: "0.75rem", marginTop: "1rem" }}>
                By submitting, you agree to be contacted by our team. No spam, ever.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
