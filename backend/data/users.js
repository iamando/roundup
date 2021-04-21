const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@roundup.com",
    password: bcrypt.hashSync("admin@roundup.com", 12),
    isAdmin: true,
  },
  {
    name: "John",
    email: "john@doe.fr",
    password: bcrypt.hashSync("john@doe.fr", 12),
    isAdmin: false,
  },
];

module.exports = users;
