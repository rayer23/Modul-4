const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) throw "token is empty";

      token = token.split(" ")[1];

      if (token === null) throw "unauthorized request";

      let verifiedUser = jwt.verify(token, process.env.SECRET_KEY);

      if (!verifiedUser) throw "Verify token failed";
      console.log(verifiedUser)
      req.admin = verifiedUser;
    //   req.user = verifiedUser;

      next();
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  checkRole: async (req, res, next) => {
    if (req.admin.isValid) return next();
    res.status(400).send("You are not authorized to access this page");
  },
};