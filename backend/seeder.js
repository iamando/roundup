const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const productsData = require("./data/products");
const usersData = require("./data/users");
const connectDB = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(usersData);

    await Product.deleteMany({});
    await Product.insertMany(productsData);

    console.log("Data Import Success");
    process.exit();
  } catch (error) {
    console.log("Error with Data Import");
    console.log(error);
    process.exit(1);
  }
};

importData();
