const express = require("express");
const router = express.Router();

const { getPaypalConfig } = require("../controllers/paypalControllers");

router.route("/config").get(getPaypalConfig);

module.exports = router;
