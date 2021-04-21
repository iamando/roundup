const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

// Get all Users
exports.getAdminUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.send(users);
});

// Get User details
exports.getAdminUserDetails = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (User) {
    return res.send(user);
  } else {
    return res.status(404).send({
      message: "User not Found",
    });
  }
});
