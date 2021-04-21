const express = require("express");
const router = express.Router();

// Middlewares
const isAuth = require("../middlewares/Auth");
const isAdmin = require("../middlewares/Admin");

const {
  getAdminOrderDetails,
  getAdminOrders,
} = require("../controllers/adminOrderControllers");

router.route("/").get(isAuth, isAdmin, getAdminOrders);
router.route("/:id").get(isAuth, isAdmin, getAdminOrderDetails);

module.exports = router;
