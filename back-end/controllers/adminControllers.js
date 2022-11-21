const db = require("../models");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const book = db.Book;

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // if (password != confirmPassword) throw "Wrong Password";

      if (password.length < 8) throw "Minimum 8 characters";
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = await admin.create({
        username,
        email,
        password: hashPass,
      });

      const token = jwt.sign({ username: username }, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      res.status(200).send({
        message: "Register Success",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const isUserExist = await admin.findOne({
        where: {
        [Op.or]: {
          username: username ? username : "",
          email: username ? username : "",
        }
      },
        raw: true,
      });
      // console.log(isUserExist)

      if (!isUserExist) throw "User not found";
      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Wrong password`;

      const token = jwt.sign(
        {
            username: isUserExist.username,
            email: isUserExist.email,
            isValid: isUserExist.isValid,
        },
        process.env.SECRET_KEY
      );

      res.status(200).send({
        message: "Login Success",
        isUserExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, process.env.SECRET_KEY);
      // console.log(verify);
      const result = await admin.findOne({
        where: {
          username: verify.username,
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
