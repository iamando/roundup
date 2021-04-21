const express = require("express");
const router = express.Router();

// Middlewares
const isAuth = require("../middlewares/Auth");
const isAdmin = require("../middlewares/Admin");

const {
  getAdminUserDetails,
  getAdminUsers,
} = require("../controllers/adminUserControllers");

router.route("/").get(isAuth, isAdmin, getAdminUsers);
router.route("/:id").get(isAuth, isAdmin, getAdminUserDetails);

module.exports = router;
