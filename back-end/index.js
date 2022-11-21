const express = require("express");
const cors = require("cors");
require("dotenv").config();
const server = express();
const db = require("./models");
const bearerToken = require("express-bearer-token");

const PORT = process.env.PORT;

server.use(express.json());
server.use(cors());
server.use(express.static("./upload"));
server.use(bearerToken());

const { user,book,cart,admin,loan } = require("./routers");
server.use("/users", user);
server.use("/books", book);
server.use("/carts", cart);
server.use("/admins", admin);
server.use("/loans", loan);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
