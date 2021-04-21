const express = require("express");
const router = express.Router();

// Middlewares
const isAuth = require("../middlewares/Auth");

const {
  getUser,
  updateUser,
  userLogin,
  userRegister,
} = require("../controllers/userControllers");

// User
router.route("/:id").get(isAuth, getUser);
router.route("/profile").put(isAuth, updateUser);
router.route("/signin").post(userLogin);
router.route("/register").post(userRegister);

module.exports = router;
