const Product = require("../models/Product");
const expressAsyncHandler = require("express-async-handler");

const APIFeatures = require("../utils/apiFeatures");

// Get all products
exports.getProducts = expressAsyncHandler(async (req, res, next) => {
  const resPerPage = 12;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .pagination()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.pagination(resPerPage);

  products = await apiFeatures.query;

  res.send({
    products,
    resPerPage,
    productsCount,
    filteredProductsCount,
  });
});

// Get one product
exports.getSingleProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not Found",
    });
  }
});
