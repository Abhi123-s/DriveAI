/**
 * aiParser.js — Client-side AI Intent Parser
 *
 * Mirrors the server-side logic but runs entirely in the browser.
 * This makes the AI feel instant (no network round-trip needed).
 *
 * Returns a structured intent object that AppContext uses
 * to trigger UI changes.
 */

// ── Keyword maps ─────────────────────────────────────────────
const SECTION_KEYWORDS = {
  hero:       ["hero", "home", "top", "start", "beginning", "intro"],
  models:     ["models", "cars", "vehicles", "fleet", "lineup", "catalogue", "catalog", "all cars"],
  features:   ["features", "feature", "highlights", "capabilities", "what can"],
  comparison: ["compare", "comparison", "versus", "vs", "difference", "side by side"],
  pricing:    ["pricing", "price", "cost", "budget", "afford", "cheap", "expensive", "rate", "how much"],
  booking:    ["book", "test drive", "schedule", "appointment", "reserve", "drive"],
  contact:    ["contact", "reach", "call", "support", "help", "touch", "email"],
};

const CURRENCY_KEYWORDS = {
  USD: ["dollar", "dollars", "usd", "$"],
  EUR: ["euro", "euros", "eur", "€"],
  INR: ["rupee", "rupees", "inr", "rs", "₹", "indian"],
};

const TYPE_KEYWORDS = {
  SUV:       ["suv", "sports utility", "off road", "offroad", "4x4", "crossover"],
  Sedan:     ["sedan", "saloon"],
  Hatchback: ["hatchback", "hatch", "compact"],
  Coupe:     ["coupe", "sports car", "sporty"],
  Electric:  ["electric", "ev", "battery", "zero emission", "zephyr"],
};

// Extracts a price in INR from natural language
const extractPrice = (query) => {
  const lakhMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l\b)/i);
  if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000;

  const croreMatch = query.match(/(\d+(?:\.\d+)?)\s*(?:crore|cr\b)/i);
  if (croreMatch) return parseFloat(croreMatch[1]) * 10000000;

  return null;
};

/**
 * Main client-side parser
 * @param {string} query - Raw user text
 * @returns {Object} intent object
 */
export const parseIntent = (query) => {
  const q = query.toLowerCase().trim();

  // ── 1. CURRENCY CHANGE ───────────────────────────────
  for (const [currency, keywords] of Object.entries(CURRENCY_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      return {
        type: "CHANGE_CURRENCY",
        currency,
        message: `Done! All prices are now shown in ${currency}.`,
      };
    }
  }

  // ── 2. BOOK TEST DRIVE ───────────────────────────────
  if (
    q.includes("book") ||
    q.includes("test drive") ||
    q.includes("schedule") ||
    q.includes("reserve") ||
    q.includes("appointment")
  ) {
    const intent = {
      type: "BOOK_TEST_DRIVE",
      prefill: {},
      message: "Heading to the booking form! I've pre-filled what I could detect from your message.",
    };

    const carNames = ["apex", "nova", "titan", "zephyr", "eclipse", "horizon"];
    const carFullNames = {
      apex: "Apex Lite",
      nova: "Nova Pulse",
      titan: "Titan Pro",
      zephyr: "Zephyr EV",
      eclipse: "Eclipse GT",
      horizon: "Horizon X",
    };

    for (const car of carNames) {
      if (q.includes(car)) {
        intent.prefill.carModel = carFullNames[car];
        break;
      }
    }

    const cities = ["mumbai", "delhi", "bangalore", "bengaluru", "chennai", "hyderabad", "pune", "kolkata", "kochi", "jaipur", "ahmedabad", "surat", "noida", "gurgaon"];
    for (const city of cities) {
      if (q.includes(city)) {
        intent.prefill.city = city.charAt(0).toUpperCase() + city.slice(1);
        break;
      }
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    for (const day of days) {
      if (q.includes(day)) {
        const today = new Date();
        const targetDay = days.indexOf(day);
        const diff = (targetDay - today.getDay() + 7) % 7 || 7;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);
        intent.prefill.date = targetDate.toISOString().split("T")[0];
        break;
      }
    }

    if (q.includes("today")) {
      intent.prefill.date = new Date().toISOString().split("T")[0];
    } else if (q.includes("tomorrow")) {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      intent.prefill.date = t.toISOString().split("T")[0];
    }

    return intent;
  }

  // ── 3. COMPARE ───────────────────────────────────────
  if (
    q.includes("compare") ||
    q.includes("versus") ||
    q.includes(" vs ") ||
    q.includes("difference between") ||
    q.includes("side by side")
  ) {
    return {
      type: "COMPARE_CARS",
      message: "Loading the comparison table with our top-rated models for you!",
    };
  }

  // ── 4. RECOMMENDATION ────────────────────────────────
  if (
    q.includes("best car") ||
    q.includes("recommend") ||
    q.includes("suggest") ||
    q.includes("which car") ||
    q.includes("what car") ||
    q.includes("good car") ||
    q.includes("for me") ||
    (q.includes("family") && !q.includes("filter")) ||
    q.includes("good for")
  ) {
    let carName = "Titan Pro";
    let reason = "a versatile and comfortable car for any need";

    if (q.includes("family") || q.includes("five") || q.includes("5") || q.includes("kids") || q.includes("spacious") || q.includes("large")) {
      carName = "Titan Pro";
      reason = "a 7-seater SUV perfect for large families, with ample boot space and top safety ratings";
    } else if (q.includes("sport") || q.includes("fast") || q.includes("performance") || q.includes("speed") || q.includes("thrill")) {
      carName = "Eclipse GT";
      reason = "our flagship performance coupe — 280 bhp and 0–100 in just 5.2 seconds";
    } else if (q.includes("fuel") || q.includes("mileage") || q.includes("efficient") || q.includes("economical") || q.includes("budget")) {
      carName = "Nova Pulse";
      reason = "an affordable hatchback with 24 km/l — best mileage in our entire lineup";
    } else if (q.includes("electric") || q.includes("ev") || q.includes("green") || q.includes("eco") || q.includes("zero")) {
      carName = "Zephyr EV";
      reason = "our fully electric car with 450 km range, fast charging, and zero emissions";
    } else if (q.includes("city") || q.includes("urban") || q.includes("traffic") || q.includes("parking") || q.includes("compact")) {
      carName = "Apex Lite";
      reason = "a compact sedan that's agile in traffic and easy to park in the city";
    } else if (q.includes("off road") || q.includes("adventure") || q.includes("trek") || q.includes("mountain") || q.includes("trip")) {
      carName = "Horizon X";
      reason = "a capable SUV with terrain response for all your off-road adventures";
    }

    return {
      type: "RECOMMEND_CAR",
      carName,
      message: `I recommend the **${carName}** — ${reason}. I've highlighted it below! ✨`,
    };
  }

  // ── 5. FILTER CARS ───────────────────────────────────
  const hasFilterKeyword =
    q.includes("show") ||
    q.includes("filter") ||
    q.includes("find") ||
    q.includes("list") ||
    q.includes("under") ||
    q.includes("below") ||
    q.includes("less than") ||
    Object.values(TYPE_KEYWORDS).flat().some((kw) => q.includes(kw));

  if (hasFilterKeyword) {
    const intent = {
      type: "FILTER_CARS",
      filters: {},
      message: "",
    };

    for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
      if (keywords.some((kw) => q.includes(kw))) {
        intent.filters.type = type;
        break;
      }
    }

    const maxPrice = extractPrice(q);
    if (maxPrice) intent.filters.maxPrice = maxPrice;

    // Build natural response
    const parts = [];
    if (intent.filters.type) parts.push(intent.filters.type + "s");
    if (intent.filters.maxPrice) parts.push(`under ₹${(intent.filters.maxPrice / 100000).toFixed(0)} lakhs`);
    intent.message = parts.length ? `Showing all ${parts.join(" ")} from our lineup!` : "Showing all available cars!";

    return intent;
  }

  // ── 6. NAVIGATION ────────────────────────────────────
  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      const labels = {
        hero: "Home",
        models: "Car Models",
        features: "Features",
        comparison: "Comparison",
        pricing: "Pricing",
        booking: "Test Drive Booking",
        contact: "Contact",
      };
      return {
        type: "NAVIGATE",
        section,
        message: `Navigating to the ${labels[section] || section} section!`,
      };
    }
  }

  // ── FALLBACK ──────────────────────────────────────────
  return {
    type: "UNKNOWN",
    message: "I didn't quite catch that! Try: 'Show SUVs under 20 lakhs', 'Compare top cars', 'Book test drive', or 'Show features'.",
  };
};
