const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const connectDatabase = require("./db");
connectDatabase();

// const check = () => {
//   const date = new Date().toISOString();
//   console.log(date);
//   console.log(date.substr(0, 10));
//   console.log(date.substr(0, 10));
// };

// check();

// Server app
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT} in ${ENV}`);
});
