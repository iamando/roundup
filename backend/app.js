const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

// Import routes
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const paypal = require("./routes/paypal");
const stripe = require("./routes/stripe");
const adminProducts = require("./routes/adminProducts");
const adminOrders = require("./routes/adminOrders");
const adminUsers = require("./routes/adminUsers");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/products", products);
app.use("/api/v1/users", users);
app.use("/api/v1/orders", orders);
app.use("/api/v1/paypal", paypal);
app.use("/api/v1/stripe", stripe);
app.use("/api/v1/admin/products", adminProducts);
app.use("/api/v1/admin/orders", adminOrders);
app.use("/api/v1/admin/users", adminUsers);

// Middlewares
app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  });
});

module.exports = app;
