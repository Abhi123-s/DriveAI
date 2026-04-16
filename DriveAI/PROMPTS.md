# PROMPTS.md — Development Prompts Used

This document records the key prompts and approaches used while building DriveAI.

---

## Prompt 1: Project Architecture Planning

**Prompt:**
> "Design the folder structure and component hierarchy for a MERN-stack AI car dealership website where the AI chat widget controls UI sections dynamically."

**Did it work?** ✅ Yes

**What was improved:**
- Initially planned Redux for state, switched to React Context API for simplicity
- Added a `hooks/useAI.js` layer to keep AI logic separate from components
- Decided to keep AI parser on both client and server for instant UX (no wait time)

---

## Prompt 2: AI Intent Parser Design

**Prompt:**
> "Build a rule-based NLP intent parser in JavaScript that maps natural language queries to structured intent objects for: filtering cars, comparing cars, booking test drives, recommendations, currency changes, and navigation."

**Did it work?** ✅ Yes

**What was improved:**
- Initial version missed edge cases like "show me all hatchbacks below 10 lakh"
- Added price extraction regex for both lakhs and crores
- Added fuzzy matching for car names (apex → Apex Lite)
- Improved recommendation logic with more lifestyle keyword mapping

---

## Prompt 3: Booking Form with AI Prefill

**Prompt:**
> "Create a React booking form that accepts AI-prefilled values from Context, validates all fields, and submits to an Express backend with a graceful offline fallback."

**Did it work?** ✅ Yes

**What was improved:**
- Added `useEffect` to sync `bookingPrefill` from context into local form state
- Added `min={today}` to date picker so past dates can't be selected
- Added phone number validation (10-digit check)
- Added success state that resets the form automatically

---

## Prompt 4: Comparison Table Logic

**Prompt:**
> "Build a side-by-side car comparison table that highlights differing specs, supports adding/removing cars, and works with AI-auto-populated data."

**Did it work?** ✅ Yes

**What was improved:**
- Added `isDifferent` logic to highlight rows where spec values differ
- Replaced simple list with a proper grid layout (3 columns: label, car1, car2)
- Added a "Quick Add" section below the table when only 1 car is selected

---

## Prompt 5: AI Chat Widget with Voice Support

**Prompt:**
> "Build a persistent floating chat widget with message history, typing animation, markdown bold rendering, quick-action chips, and Web Speech API voice input."

**Did it work?** ✅ Yes

**What was improved:**
- Initial design was too large (500px wide) — reduced to 380px max
- Added `renderText()` helper to parse **bold** markdown in AI responses
- Added ping animation on the FAB button to attract attention
- Added auto-focus when widget opens for better UX

---

## Prompt 6: Section Highlight Animation

**Prompt:**
> "When the AI navigates to a section, add a glowing highlight ring animation around the section that fades out after 3 seconds."

**Did it work?** ✅ Yes

**What was improved:**
- Used CSS `@keyframes` with `box-shadow` glow (indigo pulse)
- Stored `highlightedSection` in context with a `setTimeout` to auto-clear
- Applied `ai-highlight` class conditionally on each section using the context value

---

## Prompt 7: Local Fallback Data

**Prompt:**
> "Ensure the frontend works without a running backend by falling back to local JSON car data when the API call fails."

**Did it work?** ✅ Yes

**What was improved:**
- Used dynamic `import()` in the catch block to avoid bundling local data unless needed
- Made sure local data structure matches Mongoose schema exactly
- Added `console.warn` (not `console.error`) so it doesn't alarm developers in terminal

---

## Prompt 8: MongoDB Seed Script

**Prompt:**
> "Write a Node.js seed script that connects to MongoDB, clears existing car documents, and inserts 6 fictional car models with full specs."

**Did it work?** ✅ Yes

**What was improved:**
- Added `process.exit(0)` / `process.exit(1)` for proper CLI exit codes
- Added console logging for each inserted car name and price
- Added `deleteMany({})` before inserting to make re-seeding idempotent

---

## Prompt 9: Responsive Dark Theme

**Prompt:**
> "Design a dark-themed UI with glassmorphism cards, gradient text, animated background glows, and responsive grid layouts."

**Did it work?** ✅ Yes

**What was improved:**
- Added CSS custom properties (design tokens) in `:root` for consistency
- Added `scroll-behavior: smooth` to HTML element
- Used `backdrop-filter: blur(16px)` for glass cards
- Added `@import url(Google Fonts)` for Inter + Rajdhani typefaces

---

## Prompt 10: Full MERN Integration

**Prompt:**
> "Connect the React frontend to the Express backend with Axios, configure Vite proxy to avoid CORS issues in development, and ensure all API calls have proper error handling."

**Did it work?** ✅ Yes

**What was improved:**
- Added `proxy` config in `vite.config.js` so `/api` calls go to port 5000
- Added `cors()` middleware in `server.js` with explicit origin list
- Added offline detection: if `!error.response`, show demo mode success message
