// Car Routes - maps URL endpoints to controller functions
const express = require("express");
const router = express.Router();
const { getAllCars, getCarById } = require("../controllers/carController");

// GET /api/cars          → get all cars (supports ?type=SUV&maxPrice=2000000)
router.get("/", getAllCars);

// GET /api/cars/:id      → get single car by ID
router.get("/:id", getCarById);

module.exports = router;
