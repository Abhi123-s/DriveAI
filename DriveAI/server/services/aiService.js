/**
 * AI Service — Rule-Based Intent Parser (Server Side)
 *
 * This service parses user text queries and maps them to structured
 * "intent" objects that the frontend can act upon.
 *
 * Intent types:
 *  - FILTER_CARS      → filter car list by type / price
 *  - COMPARE_CARS     → open comparison table
 *  - BOOK_TEST_DRIVE  → prefill booking form
 *  - RECOMMEND_CAR    → recommend a car with reasoning
 *  - CHANGE_CURRENCY  → switch displayed currency
 *  - NAVIGATE         → scroll to a section
 */

// Simple keyword → section name mapping for navigation
const SECTION_KEYWORDS = {
  hero: ["hero", "home", "top", "start", "beginning"],
  models: ["models", "cars", "vehicles", "fleet", "lineup", "catalogue"],
  features: ["features", "feature", "highlights", "specs", "capabilities"],
  comparison: ["compare", "comparison", "versus", "vs", "difference"],
  pricing: ["pricing", "price", "cost", "budget", "afford", "cheap", "rate"],
  booking: ["book", "test drive", "schedule", "appointment", "reserve", "drive"],
  contact: ["contact", "reach", "call", "support", "help", "touch"],
};

// Currency keywords
const CURRENCY_KEYWORDS = {
  USD: ["dollar", "dollars", "usd", "us dollar", "$"],
  EUR: ["euro", "euros", "eur", "€"],
  INR: ["rupee", "rupees", "inr", "rs", "₹"],
};

// Car type keywords
const TYPE_KEYWORDS = {
  SUV: ["suv", "sports utility", "off road", "offroad", "4x4"],
  Sedan: ["sedan", "saloon", "family sedan"],
  Hatchback: ["hatchback", "hatch", "compact"],
  Coupe: ["coupe", "sports car", "sporty"],
  Electric: ["electric", "ev", "battery", "zero emission"],
};

/**
 * Extract price limit from query string
 * Handles: "under 20 lakhs", "below 30 lakh", "less than 15 lakhs"
 */
const extractPrice = (query) => {
  // Match patterns like "20 lakhs", "20L", "20 lakh"
  const lakhMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l\b)/i);
  if (lakhMatch) {
    return parseFloat(lakhMatch[1]) * 100000; // Convert lakhs to INR
  }

  // Match crore patterns like "1 crore"
  const croreMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:crore|cr\b)/i);
  if (croreMatch) {
    return parseFloat(croreMatch[1]) * 10000000;
  }

  return null;
};

/**
 * Main parser function — takes a text query and returns a structured intent
 * @param {string} query - User's natural language input
 * @returns {Object} - Parsed intent object
 */
const parseIntent = (query) => {
  const q = query.toLowerCase().trim();

  // ─────────────────────────────────────────────────────────
  // 1. CURRENCY CHANGE — "Show prices in dollars"
  // ─────────────────────────────────────────────────────────
  for (const [currency, keywords] of Object.entries(CURRENCY_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      if (q.includes("dollar") || q.includes("euro") || q.includes("rupee") || q.includes("inr") || q.includes("usd") || q.includes("eur")) {
        return {
          type: "CHANGE_CURRENCY",
          currency,
          message: `Done! Switching all prices to ${currency}.`,
        };
      }
    }
  }

  // ─────────────────────────────────────────────────────────
  // 2. BOOK TEST DRIVE — "Book test drive for Apex in Mumbai"
  // ─────────────────────────────────────────────────────────
  if (q.includes("book") || q.includes("test drive") || q.includes("schedule") || q.includes("reserve")) {
    const intent = {
      type: "BOOK_TEST_DRIVE",
      prefill: {},
      message: "I'll take you to the booking form! Let me pre-fill what I can.",
    };

    // Try to extract car model name from the query
    const carNames = ["apex", "nova", "titan", "zephyr", "pulse", "eclipse"];
    for (const car of carNames) {
      if (q.includes(car)) {
        intent.prefill.carModel = car.charAt(0).toUpperCase() + car.slice(1);
        break;
      }
    }

    // Try to extract city name
    const cities = ["mumbai", "delhi", "bangalore", "bengaluru", "chennai", "hyderabad", "pune", "kolkata", "kochi", "jaipur", "ahmedabad", "surat"];
    for (const city of cities) {
      if (q.includes(city)) {
        intent.prefill.city = city.charAt(0).toUpperCase() + city.slice(1);
        break;
      }
    }

    // Try to extract day of week for date
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    for (const day of days) {
      if (q.includes(day)) {
        // Find next occurrence of this weekday
        const today = new Date();
        const targetDay = days.indexOf(day);
        const diff = (targetDay - today.getDay() + 7) % 7 || 7;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);
        intent.prefill.date = targetDate.toISOString().split("T")[0];
        break;
      }
    }

    // Check for "today" or "tomorrow"
    if (q.includes("today")) {
      intent.prefill.date = new Date().toISOString().split("T")[0];
    } else if (q.includes("tomorrow")) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      intent.prefill.date = tomorrow.toISOString().split("T")[0];
    }

    return intent;
  }

  // ─────────────────────────────────────────────────────────
  // 3. COMPARE CARS — "Compare top two cars"
  // ─────────────────────────────────────────────────────────
  if (q.includes("compare") || q.includes("versus") || q.includes(" vs ") || q.includes("difference between")) {
    return {
      type: "COMPARE_CARS",
      message: "Great idea! I'm loading the comparison table with our top models.",
    };
  }

  // ─────────────────────────────────────────────────────────
  // 4. RECOMMENDATION — "Best car for family of five / road trips"
  // ─────────────────────────────────────────────────────────
  if (
    q.includes("best car") ||
    q.includes("recommend") ||
    q.includes("suggest") ||
    q.includes("which car") ||
    q.includes("what car") ||
    q.includes("family") ||
    q.includes("good for")
  ) {
    let recommendedCar = "Titan Pro"; // Default recommendation
    let reason = "a versatile and comfortable car for any need";

    if (q.includes("family") || q.includes("five") || q.includes("5") || q.includes("kids") || q.includes("spacious")) {
      recommendedCar = "Titan Pro";
      reason = "a 7-seater SUV perfect for large families, with ample boot space and top safety ratings";
    } else if (q.includes("sport") || q.includes("fast") || q.includes("performance") || q.includes("speed")) {
      recommendedCar = "Eclipse GT";
      reason = "our flagship performance coupe with 280 bhp and a 0–100 time of just 5.2 seconds";
    } else if (q.includes("fuel") || q.includes("mileage") || q.includes("efficient") || q.includes("economical") || q.includes("budget")) {
      recommendedCar = "Nova Pulse";
      reason = "an affordable hatchback delivering 24 km/l — the best mileage in our lineup";
    } else if (q.includes("electric") || q.includes("ev") || q.includes("eco") || q.includes("green")) {
      recommendedCar = "Zephyr EV";
      reason = "our fully electric car with 450 km and zero emissions";
    } else if (q.includes("city") || q.includes("urban") || q.includes("parking") || q.includes("compact")) {
      recommendedCar = "Apex Lite";
      reason = "a compact sedan perfect for city driving with easy parking and great fuel economy";
    }

    return {
      type: "RECOMMEND_CAR",
      carName: recommendedCar,
      message: `I recommend the **${recommendedCar}** — ${reason}. I've highlighted it for you below!`,
    };
  }

  // ─────────────────────────────────────────────────────────
  // 5. FILTER CARS — "Show SUVs under 20 lakhs"
  // ─────────────────────────────────────────────────────────
  const isFilterQuery =
    q.includes("show") ||
    q.includes("filter") ||
    q.includes("find") ||
    q.includes("list") ||
    q.includes("under") ||
    q.includes("below") ||
    q.includes("less than") ||
    Object.values(TYPE_KEYWORDS).flat().some((kw) => q.includes(kw));

  if (isFilterQuery) {
    const intent = {
      type: "FILTER_CARS",
      filters: {},
      message: "Filtering cars for you...",
    };

    // Detect car type
    for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
      if (keywords.some((kw) => q.includes(kw))) {
        intent.filters.type = type;
        break;
      }
    }

    // Detect price ceiling
    const maxPrice = extractPrice(q);
    if (maxPrice) {
      intent.filters.maxPrice = maxPrice;
    }

    // Build human-readable message
    const parts = [];
    if (intent.filters.type) parts.push(intent.filters.type + "s");
    if (intent.filters.maxPrice) parts.push(`under ₹${(intent.filters.maxPrice / 100000).toFixed(0)} lakhs`);
    intent.message = parts.length
      ? `Showing ${parts.join(" ")} from our lineup.`
      : "Showing all available cars!";

    return intent;
  }

  // ─────────────────────────────────────────────────────────
  // 6. NAVIGATION — "Show features" / "Take me to pricing"
  // ─────────────────────────────────────────────────────────
  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      const sectionLabels = {
        hero: "Home",
        models: "Car Models",
        features: "Features",
        comparison: "Comparison",
        pricing: "Pricing",
        booking: "Test Drive Booking",
        contact: "Contact Us",
      };
      return {
        type: "NAVIGATE",
        section,
        message: `Navigating to the ${sectionLabels[section] || section} section!`,
      };
    }
  }

  // ─────────────────────────────────────────────────────────
  // DEFAULT — could not understand
  // ─────────────────────────────────────────────────────────
  return {
    type: "UNKNOWN",
    message:
      "I didn't quite catch that. Try asking me to: show SUVs, compare cars, book a test drive, or navigate to pricing!",
  };
};

module.exports = { parseIntent };
