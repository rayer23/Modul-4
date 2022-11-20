const router = require("express").Router();
const { admin } = require("../controllers/index");

router.post("/register", admin.register);
router.post("/login", admin.login);
router.get("/keepLogin", admin.keepLogin);

module.exports = router;
