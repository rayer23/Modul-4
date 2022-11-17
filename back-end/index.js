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

const { user,book } = require("./routers");
server.use("/users", user);
server.use("/books", book);

server.listen(PORT, () => {
  db.sequelize.sync({ alter: true });
  console.log("Success Running at PORT: " + PORT);
});
