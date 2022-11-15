const express = require("express");
const cors = require("cors");
const PORT = 2000;
const server = express();
const db = require("./models");
const bearerToken = require("express-bearer-token");
require("dotenv").config();

server.use(express.json());
server.use(cors());
server.use(express.static("./Public"));
server.use(bearerToken());

const { user } = require("./routers");
server.use("/users", user);

console.log("login");
console.log("register");
server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
