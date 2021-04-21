const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

exports.getPaypalConfig = expressAsyncHandler(async (req, res, next) => {
  const paypal = process.env.PAYPAL_CLIENT_ID || "sb";
  res.send(paypal);
});
