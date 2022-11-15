const db = require("../models");
const user = db.User;

module.exports = {
  register: async (req, res) => {
    try {
    } catch {}
  },
  login: async (req, res) => {
    try {
      const { NIK, password } = req.body;

      const isUserExist = await db.User.findOne({
        where: {
          NIK: data ? data : "",
        },
        raw: true,
      });
      console.log(isUserExist);
    } catch {}
  },
};
