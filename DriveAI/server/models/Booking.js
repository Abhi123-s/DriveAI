// Booking Model - stores test drive booking requests
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    // Customer full name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Customer email address
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    // Customer phone number
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    // Car model selected for test drive
    carModel: {
      type: String,
      required: [true, "Car model is required"],
    },

    // City where test drive will happen
    city: {
      type: String,
      required: [true, "City is required"],
    },

    // Date of the test drive
    date: {
      type: String,
      required: [true, "Date is required"],
    },

    // Optional message from the customer
    message: {
      type: String,
      default: "",
    },

    // Booking status: pending, confirmed, cancelled
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
