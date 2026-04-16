/**
 * Seed Script — Populates MongoDB with 6 fictional VelocityAI Motors car models
 * Run: node utils/seedData.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Car = require("../models/Car");

// ────────────────────────────────────────────────
// 6 fictional car models for VelocityAI Motors
// ────────────────────────────────────────────────
const cars = [
  {
    name: "Apex Lite",
    type: "Sedan",
    price: 899000, // ₹8.99 Lakhs
    tagline: "City-smart, highway-ready",
    features: [
      "10.1\" Touchscreen Infotainment",
      "Android Auto & Apple CarPlay",
      "LED Projector Headlights",
      "6 Airbags",
      "Rear Camera with Parking Sensors",
      "Cruise Control",
    ],
    specs: {
      engine: "1.5L Petrol",
      mileage: "21 km/l",
      seating: 5,
      transmission: "Automatic CVT",
      topSpeed: "175 km/h",
      power: "115 bhp",
    },
    colors: ["Pearl White", "Midnight Black", "Cobalt Blue", "Crimson Red"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
    accentColor: "#6366f1",
    isFeatured: false,
    rating: 4.3,
  },
  {
    name: "Nova Pulse",
    type: "Hatchback",
    price: 649000, // ₹6.49 Lakhs
    tagline: "Zippy, fun & fuel-efficient",
    features: [
      "Best-in-class 24 km/l Mileage",
      "7\" Smart Display",
      "Wireless Charging Pad",
      "Automatic Climate Control",
      "Hill Hold Assist",
      "Voice Command System",
    ],
    specs: {
      engine: "1.2L Petrol Turbo",
      mileage: "24 km/l",
      seating: 5,
      transmission: "5-Speed Manual / AMT",
      topSpeed: "155 km/h",
      power: "88 bhp",
    },
    colors: ["Sunshine Yellow", "Arctic White", "Coral Orange", "Graphite Grey"],
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80",
    accentColor: "#f59e0b",
    isFeatured: false,
    rating: 4.5,
  },
  {
    name: "Titan Pro",
    type: "SUV",
    price: 2499000, // ₹24.99 Lakhs
    tagline: "Conquer every terrain",
    features: [
      "7-Seater Cabin",
      "All-Wheel Drive (AWD)",
      "Panoramic Sunroof",
      "Level 2 ADAS Safety Suite",
      "360° Surround Camera",
      "Ventilated Leather Seats",
      "Air Suspension",
    ],
    specs: {
      engine: "2.0L Turbocharged Diesel",
      mileage: "16 km/l",
      seating: 7,
      transmission: "8-Speed Torque Converter",
      topSpeed: "210 km/h",
      power: "195 bhp",
    },
    colors: ["Stealth Black", "Forest Green", "Glacier White", "Desert Sand"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80",
    accentColor: "#10b981",
    isFeatured: true,
    rating: 4.8,
  },
  {
    name: "Zephyr EV",
    type: "Electric",
    price: 3299000, // ₹32.99 Lakhs
    tagline: "Zero emissions. Infinite possibilities.",
    features: [
      "450 km Real-World Range",
      "DC Fast Charging (30 min 80%)",
      "15.4\" Cinema Display",
      "Over-the-Air Updates",
      "Autopilot Assist Mode",
      "Fingerprint Ignition",
      "Active Noise Cancellation Cabin",
    ],
    specs: {
      engine: "Dual Motor Electric",
      mileage: "450 km",
      seating: 5,
      transmission: "Single-Speed Auto",
      topSpeed: "230 km/h",
      power: "245 bhp",
    },
    colors: ["Lunar Silver", "Deep Ocean Blue", "Obsidian Black", "Pearl White"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
    accentColor: "#06b6d4",
    isFeatured: true,
    rating: 4.9,
  },
  {
    name: "Eclipse GT",
    type: "Coupe",
    price: 4199000, // ₹41.99 Lakhs
    tagline: "Born on the track. Built for the road.",
    features: [
      "280 bhp V6 Turbo Engine",
      "0–100 km/h in 5.2 seconds",
      'Brembo® Performance Brakes',
      "Sport-Tuned Suspension",
      "Carbon Fibre Body Accents",
      "Alcantara Interior Trim",
      "Launch Control Mode",
    ],
    specs: {
      engine: "3.0L V6 Twin Turbo",
      mileage: "11 km/l",
      seating: 4,
      transmission: "7-Speed DCT",
      topSpeed: "280 km/h",
      power: "280 bhp",
    },
    colors: ["Racing Red", "Carbon Black", "Trophy Gold", "Midnight Purple"],
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80",
    accentColor: "#ef4444",
    isFeatured: true,
    rating: 4.7,
  },
  {
    name: "Horizon X",
    type: "SUV",
    price: 1699000, // ₹16.99 Lakhs
    tagline: "Explore beyond limits",
    features: [
      "5-Seater Premium Cabin",
      "12\" Digital Instrument Cluster",
      "Wireless Android Auto/CarPlay",
      "Terrain Response System",
      "Hands-free Power Tailgate",
      "Ambient Interior Lighting",
    ],
    specs: {
      engine: "1.5L Petrol Turbo",
      mileage: "18 km/l",
      seating: 5,
      transmission: "6-Speed DCT",
      topSpeed: "190 km/h",
      power: "160 bhp",
    },
    colors: ["Trekking Brown", "Ocean Teal", "Storm Grey", "Crystal White"],
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
    accentColor: "#8b5cf6",
    isFeatured: false,
    rating: 4.6,
  },
];

// Connect to MongoDB and seed data
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Remove existing car data
    await Car.deleteMany({});
    console.log("🗑️  Cleared existing cars");

    // Insert new seed data
    const inserted = await Car.insertMany(cars);
    console.log(`🚗 Inserted ${inserted.length} car models:`);
    inserted.forEach((car) => console.log(`   - ${car.name} (${car.type}) ₹${(car.price / 100000).toFixed(2)}L`));

    console.log("\n✨ Seed complete! Your DriveAI database is ready.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedDB();
