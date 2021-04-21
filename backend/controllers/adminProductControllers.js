const Product = require("../models/Product");
const expressAsyncHandler = require("express-async-handler");

const APIFeatures = require("../utils/apiFeatures");

// Get all products
exports.getAdminProducts = expressAsyncHandler(async (req, res, next) => {
  const resPerPage = 16;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(
    Product.find().sort({ createdAt: -1 }),
    req.query
  )
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
exports.getAdminSingleProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.send(product);
  } else {
    return res.status(404).send({
      message: "Product not Found",
    });
  }
});

// New product
exports.createAdminProduct = expressAsyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  if (product) {
    return res.status(201).send({
      product,
    });
  }

  return res.status(500).send({
    message: "Error in creating product",
  });
});

// Update product
exports.updateAdminProduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({
      message: "Product not Found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
    useFindAndModify: false,
  });

  res.status(200).send({
    message: "Product Updated",
    product,
  });
});

// Delete product
exports.deleteAdminProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).send({
      message: "Product not Found",
    });
  }

  await product.remove();
  res.status(200).send({
    message: "Product Deleted",
  });
});
