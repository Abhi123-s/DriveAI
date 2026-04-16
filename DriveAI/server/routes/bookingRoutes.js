// Booking Routes - maps URL endpoints to controller functions
const express = require("express");
const router = express.Router();
const { createBooking, getAllBookings } = require("../controllers/bookingController");

// POST /api/bookings     → create a new test drive booking
router.post("/", createBooking);

// GET /api/bookings      → list all bookings (for admin/debug)
router.get("/", getAllBookings);

module.exports = router;
