// Booking Controller - handles test drive booking requests
const Booking = require("../models/Booking");

// POST /api/bookings - create a new test drive booking
const createBooking = async (req, res) => {
  try {
    const { name, email, phone, carModel, city, date, message } = req.body;

    // Basic manual validation before saving
    if (!name || !email || !phone || !carModel || !city || !date) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Create new booking document in MongoDB
    const booking = await Booking.create({
      name,
      email,
      phone,
      carModel,
      city,
      date,
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Test drive booked successfully! We will contact you shortly.",
      data: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating booking",
    });
  }
};

// GET /api/bookings - fetch all bookings (admin use)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
    });
  }
};

module.exports = { createBooking, getAllBookings };
