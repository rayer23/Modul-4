const user = require("./userRouters");
const book = require("./bookRouters");
const cart = require("./cartRouters");
const admin = require("./adminRouters");

module.exports = {
  user,
  book,
  cart,
  admin
};
