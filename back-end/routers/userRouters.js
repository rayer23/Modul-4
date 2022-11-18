const router = require("express").Router();

const { user } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");
const { multerUpload } = require("../helpers/multer");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/keepLogin", user.keepLogin);
// router.post(
//   "/single-uploaded/:id",
//   multerUpload.single("file"),
//   user.uploadFile
// );
router.post("/verification", verifyToken, user.verification);
router.post("/changeotp", user.changeOtp);

router.get("/", verifyToken, checkRole, user.findAllUser);

module.exports = router;
