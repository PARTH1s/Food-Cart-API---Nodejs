const OrderService = require("../services/orderService");

// Add an item to order
const addItem = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);
    return res.status(200).json({
      success: true,
      message: "Item added to order",
      data: order,
    });
  } catch (err) {
    console.error("Error in addItem:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get an order by ID
const getOrder = async (req, res) => {
  try {
    const order = await OrderService.getOrder(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error in getOrder:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get total price of an order
const orderTotal = async (req, res) => {
  try {
    const price = await OrderService.totalPrice(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Total price calculated",
      data: price,
    });
  } catch (err) {
    console.error("Error in orderTotal:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error in updateOrder:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Delete an item from order
const deleteItemFromOrder = async (req, res) => {
  try {
    const order = await OrderService.deleteItemFromOrder(req.body);
    return res.status(200).json({
      success: true,
      message: "Item deleted from order",
      data: order,
    });
  } catch (err) {
    console.error("Error in deleteItemFromOrder:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addItem,
  getOrder,
  orderTotal,
  updateOrder,
  deleteItemFromOrder,
};
