const express = require("express");
const router = express.Router();

const helpController = require("../../controllers/helpController");
const foodController = require("../../controllers/foodController");
const restaurantController = require("../../controllers/restaurantController");
const orderController = require("../../controllers/orderController");

// Help API
router.get("/help", helpController.helpDetails);

// Food APIs
router.post("/food", foodController.create);
router.delete("/food/:id/:restaurantId", foodController.destroy);

// Restaurant APIs
router.post("/restaurant", restaurantController.create);
router.get("/restaurant/:id", restaurantController.getAllFoodItems);
router.delete("/restaurant/:id", restaurantController.destroy);

// Order APIs
router.post("/order", orderController.addItem);
router.get("/order/:id", orderController.getOrder);
router.get("/order/:id/total", orderController.orderTotal);
router.patch("/order/:id", orderController.updateOrder);
router.delete("/order", orderController.deleteItemFromOrder);  

module.exports = router;
