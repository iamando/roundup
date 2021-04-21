const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

module.exports = getToken;
