/**
 * useAI.js — Custom Hook for AI Processing
 *
 * This hook connects user input to the AI parser
 * and triggers the correct UI actions via AppContext.
 *
 * Usage: const { processQuery } = useAI();
 */

import { useApp } from "../context/AppContext";
import { parseIntent } from "../utils/aiParser";

const useAI = () => {
  const {
    addMessage,
    setAiLoading,
    setFilters,
    setCompareList,
    cars,
    setBookingPrefill,
    scrollToSection,
    setCurrency,
    setRecommendedCar,
  } = useApp();

  /**
   * Main function — call with user's text query
   * Parses intent and triggers the appropriate UI action
   */
  const processQuery = async (userQuery) => {
    if (!userQuery.trim()) return;

    // 1. Add user message to chat
    addMessage("user", userQuery);

    // 2. Show typing indicator
    setAiLoading(true);

    // Small delay to simulate AI "thinking" (feels more natural)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 3. Parse the intent using our rule-based parser
    const intent = parseIntent(userQuery);

    setAiLoading(false);

    // 4. Add AI response message
    addMessage("assistant", intent.message);

    // 5. Execute the corresponding UI action
    switch (intent.type) {

      // ─── FILTER CARS ─────────────────────────────────
      case "FILTER_CARS": {
        // Update filters in global state (AppContext auto-filters)
        setFilters({
          type: intent.filters.type || "",
          maxPrice: intent.filters.maxPrice || null,
        });
        // Navigate to models section
        setTimeout(() => scrollToSection("models"), 300);
        break;
      }

      // ─── COMPARE CARS ────────────────────────────────
      case "COMPARE_CARS": {
        // Auto-select top 2 featured cars for comparison
        const featured = cars.filter((c) => c.isFeatured).slice(0, 2);
        if (featured.length < 2) {
          // If not enough featured, just take first 2
          setCompareList(cars.slice(0, 2));
        } else {
          setCompareList(featured);
        }
        // Scroll to comparison section
        setTimeout(() => scrollToSection("comparison"), 300);
        break;
      }

      // ─── BOOK TEST DRIVE ─────────────────────────────
      case "BOOK_TEST_DRIVE": {
        // Set form prefill data
        setBookingPrefill(intent.prefill || {});
        // Scroll to booking form
        setTimeout(() => scrollToSection("booking"), 300);
        break;
      }

      // ─── RECOMMEND CAR ───────────────────────────────
      case "RECOMMEND_CAR": {
        // Find the car by name and set as recommended (triggers highlight)
        const match = cars.find((c) =>
          c.name.toLowerCase().includes(intent.carName.toLowerCase())
        );
        if (match) {
          setRecommendedCar(match._id || match.name);
          // Clear highlight after 5 seconds
          setTimeout(() => setRecommendedCar(null), 5000);
        }
        // Scroll to models section to show the highlighted car
        setTimeout(() => scrollToSection("models"), 300);
        break;
      }

      // ─── CHANGE CURRENCY ─────────────────────────────
      case "CHANGE_CURRENCY": {
        setCurrency(intent.currency);
        break;
      }

      // ─── NAVIGATE ────────────────────────────────────
      case "NAVIGATE": {
        setTimeout(() => scrollToSection(intent.section), 300);
        break;
      }

      // ─── UNKNOWN ─────────────────────────────────────
      case "UNKNOWN":
      default:
        // Message already added above, nothing more to do
        break;
    }
  };

  return { processQuery };
};

export default useAI;
