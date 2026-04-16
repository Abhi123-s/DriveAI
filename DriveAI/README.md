# DriveAI — AI-Navigated Car Dealership Website

> **Brand:** VelocityAI Motors &nbsp;|&nbsp; **Stack:** MERN + Tailwind CSS &nbsp;|&nbsp; **AI:** Rule-based Intent Parser

![DriveAI Banner](https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&auto=format&fit=crop&q=80)

---

## 🌐 Live URL

> **Placeholder:** `https://driveai.velocityaimotors.com` *(Deploy to Render + Vercel)*

---

## 📖 Project Overview

DriveAI is a full-stack, AI-powered car dealership website where an intelligent assistant **dynamically controls the UI** in response to natural language queries.

Users can:
- Ask the AI to **filter cars** ("Show SUVs under 20 lakhs")
- **Compare** two models side-by-side automatically
- **Book a test drive** with AI-assisted form pre-filling
- Get **personalized car recommendations**
- **Switch currencies** (INR / USD / EUR) on demand
- **Navigate** to any section with a voice or text command

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 6 |
| Styling | Tailwind CSS v4 |
| State Management | React Context API |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| AI Engine | Rule-based NLP Intent Parser |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
DriveAI/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── HeroSection.jsx
│       │   ├── CarCard.jsx
│       │   ├── CarModels.jsx
│       │   ├── FeaturesSection.jsx
│       │   ├── ComparisonTable.jsx
│       │   ├── PricingSection.jsx
│       │   ├── BookingForm.jsx
│       │   ├── ContactSection.jsx
│       │   └── AIAssistant.jsx
│       ├── pages/
│       │   └── Home.jsx
│       ├── context/
│       │   └── AppContext.jsx  # Global state (React Context)
│       ├── hooks/
│       │   └── useAI.js        # AI processing hook
│       ├── utils/
│       │   └── aiParser.js     # Intent parser (NLP)
│       └── data/
│           └── carsData.js     # Local fallback car data
│
└── server/                    # Node.js backend
    ├── models/
    │   ├── Car.js
    │   └── Booking.js
    ├── controllers/
    │   ├── carController.js
    │   └── bookingController.js
    ├── routes/
    │   ├── carRoutes.js
    │   └── bookingRoutes.js
    ├── services/
    │   └── aiService.js        # Server-side intent parser
    ├── utils/
    │   └── seedData.js         # DB seed script
    └── server.js               # Express entry point
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas URI
- npm v9+

---

### 1. Clone and Navigate
```bash
git clone https://github.com/your-username/DriveAI.git
cd DriveAI
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file (already included, edit if needed)
# MONGO_URI=mongodb://localhost:27017/driveai
# PORT=5000

# Seed the database with 6 car models
npm run seed

# Start the backend
npm run dev
```
> Backend runs at: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ../client
npm install

# Start the frontend
npm run dev
```
> Frontend runs at: `http://localhost:5173`

### 4. Open in Browser
Navigate to `http://localhost:5173` and start chatting with the AI assistant!

---

## 🤖 AI Query Examples (Try These!)

| Query | What Happens |
|---|---|
| `Show SUVs under 20 lakhs` | Filters cars by type + price, scrolls to models, highlights results |
| `Compare top two cars` | Populates comparison table with top 2 featured cars |
| `Book test drive for Titan in Mumbai Saturday` | Prefills booking form with car, city, and date |
| `Best car for family of five` | Highlights Titan Pro (7-seater), explains reasoning |
| `Show prices in dollars` | Converts all prices from INR to USD instantly |
| `Show features` | Smooth scrolls to Features section, triggers highlight glow |
| `Recommend a car for city driving` | Suggests Apex Lite with reasoning |
| `Find electric cars` | Filters to show only EV models |
| `Take me to pricing` | Scrolls to Pricing section |
| `Compare vs Eclipse GT` | Loads comparison table |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cars` | Get all cars (supports `?type=SUV&maxPrice=2000000`) |
| `GET` | `/api/cars/:id` | Get single car by ID |
| `POST` | `/api/bookings` | Create test drive booking |
| `GET` | `/api/bookings` | List all bookings |
| `POST` | `/api/ai/parse` | Parse AI query (server-side) |
| `GET` | `/api/health` | Health check |

---

## 🔮 Future Improvements

- [ ] **OpenAI GPT-4o integration** — Replace rule-based parser with real LLM
- [ ] **EMI Calculator** — Let users calculate monthly payments
- [ ] **360° Car View** — Three.js or Spline 3D car viewer
- [ ] **Showroom Locator** — Google Maps integration for nearest showroom
- [ ] **User Accounts** — Login, saved favourites, booking history
- [ ] **Live Chat** — Socket.io real-time support chat
- [ ] **AR Preview** — See the car in your driveway via AR (WebXR)
- [ ] **Admin Dashboard** — Manage bookings, add cars, view analytics
- [ ] **Push Notifications** — Test drive reminders
- [ ] **Multi-language** — Hindi, Tamil, Bengali support

---

## 👨‍💻 Author

Built with ❤️ as an evaluation project demonstrating full-stack MERN skills with AI-driven UI control.
