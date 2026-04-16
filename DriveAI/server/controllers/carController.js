// Car Controller - handles all car-related API requests
const Car = require("../models/Car");

// GET /api/cars - fetch all cars with optional filters
const getAllCars = async (req, res) => {
  try {
    const { type, maxPrice, minPrice } = req.query;

    // Build a filter object dynamically based on query params
    const filter = {};

    if (type) {
      filter.type = type; // e.g., ?type=SUV
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    // Fetch cars from MongoDB, sorted by price ascending
    const cars = await Car.find(filter).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cars",
    });
  }
};

// GET /api/cars/:id - fetch a single car by its MongoDB ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching car",
    });
  }
};

module.exports = { getAllCars, getCarById };
