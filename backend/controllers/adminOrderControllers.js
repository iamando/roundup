const Order = require("../models/Order");
const expressAsyncHandler = require("express-async-handler");

// Get all orders
exports.getAdminOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.send(orders);
});

// Get order details
exports.getAdminOrderDetails = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    return res.send(order);
  } else {
    return res.status(404).send({
      message: "Order not Found",
    });
  }
});
