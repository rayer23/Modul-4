const user = require("./userControllers");
const book = require("./bookControllers");
const cart = require("./cartControllers");
const admin = require("./adminControllers");

const loan = require("./loanControllers");


module.exports = {
  user,
  book,
  cart,

  admin,
  loan

};
