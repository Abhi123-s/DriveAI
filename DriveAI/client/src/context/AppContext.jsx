/**
 * AppContext.jsx — Global State Management using React Context API
 *
 * This is the central brain of the frontend.
 * All shared state lives here:
 *   - cars list from backend
 *   - active filters (type, price)
 *   - comparison list
 *   - booking form pre-fill data
 *   - AI response messages
 *   - currency mode
 *   - highlighted/recommended car
 *   - which section the AI navigated to
 */

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context object
const AppContext = createContext(null);

// ─────────────────────────────────────────────────────────
// AppProvider — wrap your entire app with this
// ─────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  // ── Car Data ──────────────────────────────────────────
  const [cars, setCars] = useState([]); // All cars from backend
  const [filteredCars, setFilteredCars] = useState([]); // Filtered view
  const [carsLoading, setCarsLoading] = useState(true);

  // ── Filters ───────────────────────────────────────────
  const [filters, setFilters] = useState({
    type: "",       // "SUV", "Sedan", etc.
    maxPrice: null, // In INR
  });

  // ── Comparison ────────────────────────────────────────
  const [compareList, setCompareList] = useState([]); // Max 2 cars to compare

  // ── Booking Form Prefill ──────────────────────────────
  const [bookingPrefill, setBookingPrefill] = useState({});

  // ── AI State ──────────────────────────────────────────
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hi! I'm your VelocityAI assistant. Ask me to show cars, compare models, book a test drive, or just say 'Show SUVs under 20 lakhs'!",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // ── Currency ──────────────────────────────────────────
  const [currency, setCurrency] = useState("INR"); // INR | USD | EUR

  // ── Highlighted Section (for AI navigation) ──────────
  const [highlightedSection, setHighlightedSection] = useState(null);

  // ── Recommended Car ───────────────────────────────────
  const [recommendedCar, setRecommendedCar] = useState(null);

  // ─────────────────────────────────────────────────────
  // Fetch cars from backend on mount
  // ─────────────────────────────────────────────────────

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchCars = async (params = {}) => {
    try {
      setCarsLoading(true);
      const response = await axios.get(`${API_BASE}/cars`, { params });
      const carData = response.data.data;
      setCars(carData);
      setFilteredCars(carData);
    } catch (error) {
      // Fallback to local data if backend is unavailable
      console.warn("Backend unavailable, using local car data:", error.message);
      const { localCars } = await import("../data/carsData");
      setCars(localCars);
      setFilteredCars(localCars);
    } finally {
      setCarsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCars();
  }, []);

  // ─────────────────────────────────────────────────────
  // Apply filters whenever filters state changes
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    let result = [...cars];

    if (filters.type) {
      result = result.filter((c) => c.type === filters.type);
    }

    if (filters.maxPrice) {
      result = result.filter((c) => c.price <= filters.maxPrice);
    }

    setFilteredCars(result);
  }, [filters, cars]);

  // ─────────────────────────────────────────────────────
  // Scroll to a section by ID and trigger highlight
  // ─────────────────────────────────────────────────────
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Trigger the glowing highlight animation (defined in index.css)
      setHighlightedSection(sectionId);
      setTimeout(() => setHighlightedSection(null), 3500); // Remove after animation
    }
  };

  // ─────────────────────────────────────────────────────
  // Add a car to comparison list (max 2)
  // ─────────────────────────────────────────────────────
  const toggleCompare = (car) => {
    setCompareList((prev) => {
      const exists = prev.find((c) => c._id === car._id);
      if (exists) {
        return prev.filter((c) => c._id !== car._id); // Remove
      }
      if (prev.length >= 2) {
        return [prev[1], car]; // Replace oldest if already 2
      }
      return [...prev, car]; // Add
    });
  };

  // ─────────────────────────────────────────────────────
  // Add AI message to chat history
  // ─────────────────────────────────────────────────────
  const addMessage = (role, text) => {
    setAiMessages((prev) => [...prev, { role, text }]);
  };

  // ─────────────────────────────────────────────────────
  // Currency conversion rates (approximate)
  // ─────────────────────────────────────────────────────
  const EXCHANGE_RATES = {
    INR: 1,
    USD: 0.012,   // 1 INR ≈ 0.012 USD
    EUR: 0.011,   // 1 INR ≈ 0.011 EUR
  };

  const CURRENCY_SYMBOLS = {
    INR: "₹",
    USD: "$",
    EUR: "€",
  };

  // Convert a price from INR to current currency
  const convertPrice = (priceInINR) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const converted = priceInINR * rate;

    if (currency === "INR") {
      // Format in lakhs for INR
      return `₹${(converted / 100000).toFixed(2)}L`;
    }

    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  };

  // Everything available to child components
  const value = {
    // Car data
    cars,
    filteredCars,
    carsLoading,
    fetchCars,

    // Filters
    filters,
    setFilters,

    // Comparison
    compareList,
    setCompareList,
    toggleCompare,

    // Booking prefill
    bookingPrefill,
    setBookingPrefill,

    // AI
    aiMessages,
    aiLoading,
    setAiLoading,
    addMessage,

    // Currency
    currency,
    setCurrency,
    convertPrice,

    // Section navigation
    highlightedSection,
    scrollToSection,

    // Recommended car
    recommendedCar,
    setRecommendedCar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for easy access in any component
export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};

export default AppContext;
