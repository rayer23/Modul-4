const db = require("../models");
const bcrypt = require("bcrypt");
const user = db.User;
const profile = db.Profile;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body);
      const { NIM, username, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword)
        throw "your password is different than confirmPassword";

      if (password.length < 8) throw "Password min 8 character";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        NIM,
        username,
        email,
        password: hashPass,
      });

      await profile.create({
        UserNIM: NIM,
      });
      const token = jwt.sign({ NIM: data.NIM }, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });

      // const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      // const tempCompile = handlebars.compile(tempEmail);
      // const tempResult = tempCompile({
      //   username,
      //   link: `http://localhost:3000/verification/${token}`,
      // });

      // await transporter.sendMail({
      //   from: "Admin",
      //   to: email,
      //   subject: "Verification User",
      //   html: tempResult,
      // });

      res.status(200).send({
        message: "Register Success",
        data,
        token,
      });
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
            NIM: data ? data : "",
            // username: data ? data : "",
            // email: data ? data : "",
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

      const token = jwt.sign(
        {
          NIM: isUserExist.NIM,
          // username: isUserExist.username,
          // isAdmin: isUserExist.isAdmin,
          // isVerified: isUserExist.isVerified,
        },
        process.env.SECRET_KEY
      );

      res.status(200).send({

        message: "Login Success",
        isUserExist,

        token,
        message: "Welcome back!",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      console.log(req.token);
      const verify = jwt.verify(req.token, process.env.SECRET_KEY);

      // console.log(verify);
      const result = await user.findOne({

        where: {
          NIM: verify.NIM,
        },
        raw: true,
      });


      const isProfileExist = await db.Profile.findOne({
        where: {
          UserNIM: result.NIM,
        },
        raw: true,

      });

      result.profilePic = isProfileExist.profilePic;

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  verification: async (req, res) => {
    try {
      const { code_otp } = req.body;
      // console.log(req.body);

      const isAccountExist = await user.findOne({
        where: {
          NIM: req.user.NIM,
        },
        raw: true,
      });

      // console.log(isAccountExist)

      const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

      if (!isValid) throw `Wrong Code !`;

      await user.update(
        { isVerified: true },
        {
          where: {
            NIM: req.user.NIM,
          },
        }
      );
      res.status(200).send({
        message: "Success Verification",
        data: isAccountExist,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  changeOtp: async (req, res) => {
    try {
      const { NIM } = req.body;

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.update(
        { code_otp: hashOtp },
        {
          where: {
            NIM,
          },
        }
      );

      const isAccountExist = await user.findOne({
        where: { NIM },
        raw: true,
      });

      const token = jwt.sign({ NIM }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        username: isAccountExist.username,
        code_otp,
      });

      await transporter.sendMail({
        from: "Admin",
        to: isAccountExist.email,
        subject: "Verification Account",
        html: tempResult,
      });

      res.status(200).send({
        message: "Check Your Email, code otp send success",
        data,
        token,
      });
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
