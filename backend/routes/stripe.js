const express = require("express");
const router = express.Router();

const { getStripeConfig } = require("../controllers/stripeControllers");

router.route("/config").get(getStripeConfig);

module.exports = router;
