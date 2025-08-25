const Order = require("../models/order");
const Restaurant = require("../models/restaurant");

// Create or update an order (add item to cart)
const createOrder = async (data) => {
  try {
    const restaurant = await Restaurant.findById(data.restaurant);
    if (!restaurant) throw new Error("Restaurant not found");

    let order;

    // If order exists, fetch and validate it
    if (data.order) {
      order = await Order.findById(data.order);
      if (!order) throw new Error("Order not found");
      if (order.status !== "cart") {
        console.warn("Order cannot be modified once placed");
        return order;
      }
    } else {
      order = new Order({ user: data.user, status: "cart" });
    }

    // Add food item if it belongs to the restaurant
    for (const foodItem of restaurant.food) {
      if (foodItem.equals(data.food)) {
        order.food.push(foodItem);
        break;
      }
    }

    await order.save();
    return order;
  } catch (err) {
    console.error("Error in createOrder:", err);
    throw err;
  }
};

// Get order by ID with food details
const getOrder = async (id) => {
  try {
    return await Order.findById(id).populate("food");
  } catch (err) {
    console.error("Error in getOrder:", err);
    throw err;
  }
};

// Calculate total price of order
const totalPrice = async (id) => {
  try {
    const order = await Order.findById(id).populate("food");
    if (!order) throw new Error("Order not found");

    return order.food.reduce((sum, item) => sum + item.price, 0);
  } catch (err) {
    console.error("Error in totalPrice:", err);
    throw err;
  }
};

// Update order status
const updateOrder = async (id, data) => {
  try {
    const order = await Order.findById(id);
    if (!order) throw new Error("Order not found");

    order.status = data.status;
    await order.save();
    return order;
  } catch (err) {
    console.error("Error in updateOrder:", err);
    throw err;
  }
};

// Delete item from order
const deleteItemFromOrder = async (data) => {
  try {
    const order = await Order.findById(data.id);
    if (!order) throw new Error("Order not found");

    order.food = order.food.filter(
      (foodItem) => !foodItem.equals(data.food)
    );

    await order.save();
    return order;
  } catch (err) {
    console.error("Error in deleteItemFromOrder:", err);
    throw err;
  }
};

module.exports = {
  createOrder,
  getOrder,
  totalPrice,
  updateOrder,
  deleteItemFromOrder,
};
