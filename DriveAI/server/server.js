/**
 * server.js — Main entry point for DriveAI backend
 *
 * Responsibilities:
 *  1. Load environment variables from .env
 *  2. Connect to MongoDB
 *  3. Configure Express middleware (CORS, JSON parsing)
 *  4. Register all API routes
 *  5. Start the server on the configured port
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env variables first

// Import route files
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Import AI service for the AI endpoint
const { parseIntent } = require("./services/aiService");

// ────────────────────────────────────────────────
// Create Express app
// ────────────────────────────────────────────────
const app = express();

// ────────────────────────────────────────────────
// Middleware
// ────────────────────────────────────────────────

// Allow cross-origin requests from our React frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://drive-ai-gwhg.vercel.app"],
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ────────────────────────────────────────────────
// API Routes
// ────────────────────────────────────────────────

// Cars endpoint
app.use("/api/cars", carRoutes);

// Bookings endpoint
app.use("/api/bookings", bookingRoutes);

// AI endpoint — accepts user query and returns structured intent
app.post("/api/ai/parse", (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Query cannot be empty",
    });
  }

  // Parse the query using our rule-based AI service
  const intent = parseIntent(query);

  res.status(200).json({
    success: true,
    query,
    intent,
  });
});

// Health check endpoint — useful for verifying the server is running
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "DriveAI server is running! 🚗",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for unknown routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ────────────────────────────────────────────────
// Connect to MongoDB then Start Server
// ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/driveai";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Only start the server after DB connection is established
    app.listen(PORT, () => {
      console.log(`🚀 DriveAI server running at http://localhost:${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
