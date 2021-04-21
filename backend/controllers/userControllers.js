const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const getToken = require("../utils/jwtToken");

exports.getUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: "User not Found",
    });
  }
});

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 12);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  }
});

exports.userLogin = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
      return;
    }
  }
  res.status(401).send({
    message: "Invalid Email or Password",
  });
});

exports.userRegister = expressAsyncHandler(async (req, res, next) => {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hashSync(password, 12);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).json({
      message: "Invalid User Data",
    });
  }
});
