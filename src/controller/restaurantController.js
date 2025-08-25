const crud = require("../services/crudService");
const Restaurant = require("../models/restaurant");

// Create a new restaurant
const create = async (req, res) => {
  try {
    const restaurant = await crud.create(Restaurant, req.body);
    return res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (err) {
    console.error("Error in create restaurant:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Delete a restaurant by ID
const destroy = async (req, res) => {
  try {
    const restaurant = await crud.destroy(Restaurant, req.params.id);
    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (err) {
    console.error("Error in delete restaurant:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get all food items for a restaurant
const getAllFoodItems = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("food");
    return res.status(200).json({
      success: true,
      message: "Food items fetched successfully",
      data: restaurant,
    });
  } catch (err) {
    console.error("Error in getAllFoodItems:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  create,
  destroy,
  getAllFoodItems,
};
