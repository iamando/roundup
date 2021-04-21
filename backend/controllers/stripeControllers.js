const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

exports.getStripeConfig = expressAsyncHandler(async (req, res, next) => {
  const stripe = process.env.STRIPE_PUBLISHABLE_KEY;
  res.send(stripe);
});
