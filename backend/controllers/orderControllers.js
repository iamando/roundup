const Order = require("../models/Order");
const expressAsyncHandler = require("express-async-handler");

exports.getOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

exports.createOrder = expressAsyncHandler(async (req, res, next) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({
      message: "Cart is empty",
    });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingInfo: req.body.shippingInfo,
      paymentInfo: req.body.paymentInfo,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({
      message: "New Order Created",
      order: createdOrder,
    });
  }
});

exports.getOrderDetails = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: "Order not Found",
    });
  }
});

exports.updateOrderPayment = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({
      message: "Order Paid",
      order: updatedOrder,
    });
  } else {
    res.status(404).send({
      message: "Order not Found",
    });
  }
});
