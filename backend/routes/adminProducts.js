const express = require("express");
const router = express.Router();

// Middlewares
const isAuth = require("../middlewares/Auth");
const isAdmin = require("../middlewares/Admin");

const {
  getAdminProducts,
  getAdminSingleProduct,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} = require("../controllers/adminProductControllers");

// Product
router.route("/").get(isAuth, isAdmin, getAdminProducts);
router.route("/:id").get(isAuth, isAdmin, getAdminSingleProduct);
router.route("/create").post(isAuth, isAdmin, createAdminProduct);
router.route("/update/:id").put(isAuth, isAdmin, updateAdminProduct);
router.route("/delete/:id").delete(isAuth, isAdmin, deleteAdminProduct);

module.exports = router;
