const express = require("express");
const router = express.Router();

// Middlewares
const isAuth = require("../middlewares/Auth");

// Controllers
const {
  getOrders,
  createOrder,
  getOrderDetails,
  updateOrderPayment,
} = require("../controllers/orderControllers");

router.route("/me").get(isAuth, getOrders);
router.route("/createorder").post(isAuth, createOrder);
router.route("/:id").get(isAuth, getOrderDetails);
router.route("/:id/pay").put(isAuth, updateOrderPayment);

module.exports = router;
