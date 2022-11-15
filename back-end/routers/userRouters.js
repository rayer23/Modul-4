const router = require("express").Router();
const { user } = require("../controllers");

router.post("/register", user.register);
router.get("/login", user.login);
module.exports = router;
