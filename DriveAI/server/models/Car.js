// Car Model - defines the shape of a car document in MongoDB
const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    // Car display name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Type of car: SUV, Sedan, Hatchback, etc.
    type: {
      type: String,
      required: true,
      enum: ["SUV", "Sedan", "Hatchback", "Coupe", "Electric"],
    },

    // Price in Indian Rupees (INR)
    price: {
      type: Number,
      required: true,
    },

    // Short tagline shown on card
    tagline: {
      type: String,
      default: "",
    },

    // List of key selling features
    features: {
      type: [String],
      default: [],
    },

    // Technical specifications
    specs: {
      engine: { type: String, default: "" },
      mileage: { type: String, default: "" },
      seating: { type: Number, default: 5 },
      transmission: { type: String, default: "Automatic" },
      topSpeed: { type: String, default: "" },
      power: { type: String, default: "" },
    },

    // Color options available
    colors: {
      type: [String],
      default: [],
    },

    // Image URL (using placeholder gradient colors for demo)
    image: {
      type: String,
      default: "",
    },

    // Accent color for UI card highlight
    accentColor: {
      type: String,
      default: "#6366f1",
    },

    // Whether this is a featured/flagship model
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Star rating out of 5
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", CarSchema);
