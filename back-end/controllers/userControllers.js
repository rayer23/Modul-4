const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body);
      const { NIM, username, email, password, confirmPassword } =
        req.body;

      if (password !== confirmPassword) throw "password lu salah";

      if (password.length < 8) throw "Password min 8 character";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        NIM,
        username,
        email,
        password: hashPass,
        // isAdmin :true
      });
      // console.log(data.id);

      const token = jwt.sign({ NIM: data.NIM }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        username,
        link: `http://localhost:3000/verification/${token}`,
      });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Verification User",
        html: tempResult,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const { data, password } = req.body;

      const isUserExist = await user.findOne({
        where: {
          [Op.or]: {
            // NIM: data,
            NIM: data ? data : "",
            username: data ? data : "",
            email: data ? data : "",
          },
        },
        raw: true,
      });
      // console.log(isUserExist);

      if (!isUserExist) throw "User not found";

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) {
        throw `Wrong Password !`;
      }

      const token = jwt.sign({ 
          NIM: isUserExist.NIM,
          username: isUserExist.username, 
          isAdmin : isUserExist.isAdmin,
          isVerified:isUserExist.isVerified
        },process.env.SECRET_KEY
      );

      res.status(200).send({
        user: {
          username: isUserExist.username,
          NIM: isUserExist.NIM,
        },
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, process.env.SECRET_KEY);
      // console.log(verify);
      const result = await user.findAll({
        where: {
          NIM: verify.NIM,
        },
      });

      res.status(200).send({
        NIM: result[0].NIM,
        username: result[0].username,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);

      await user.update(
        {
          profilePic: fileUploaded.filename,
        },
        {
          where: {
            NIM: req.params.id,
          },
        }
      );
      const getUser = await user.findOne({
        where: {
          NIM: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        NIM: getUser.NIM,
        username: getUser.username,
        profilePic: getUser.profilePic,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, process.env.SECRET_KEY);
      // console.log(verify);

      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            NIM: verify.NIM,
          },
        }
      );
      res.status(200).send("Success Verification");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
