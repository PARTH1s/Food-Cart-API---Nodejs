const crud = require("../services/crudService");
const Food = require("../models/food");
const Restaurant = require("../models/restaurant");

// Create new food item and link it to a restaurant
const create = async (req, res) => {
    try {
        const food = await crud.create(Food, req.body);
        const restaurant = await crud.getById(Restaurant, req.body.restaurant);

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        restaurant.food.push(food);
        await restaurant.save();

        return res.status(201).json({
            success: true,
            message: "Food item created successfully",
            data: food,
        });
    } catch (err) {
        console.error("Error creating food:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create food item",
            error: err.message,
        });
    }
};

// Delete food item and unlink it from restaurant
const destroy = async (req, res) => {
    try {
        const restaurant = await crud.getById(Restaurant, req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        const foodIndex = restaurant.food.findIndex(
            (foodItem) => foodItem._id.toString() === req.params.id
        );

        if (foodIndex === -1) {
            return res.status(404).json({ success: false, message: "Food item not found in restaurant" });
        }

        restaurant.food.splice(foodIndex, 1);
        await restaurant.save();

        const food = await crud.destroy(Food, req.params.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found in database" });
        }

        return res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
            data: food,
        });
    } catch (err) {
        console.error("Error deleting food:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete food item",
            error: err.message,
        });
    }
};

module.exports = { create, destroy };
