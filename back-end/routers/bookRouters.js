const router = require("express").Router();
const { book } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");
const { multerUpload } = require("../helpers/multer");

router.get("/", book.findAll);
router.get("/filter", book.filter);
router.get("/searchb", book.searchBook);
router.post("/", verifyToken, checkRole, book.addBook);
router.patch("/:id", verifyToken, checkRole, book.updateBook);
router.delete("/:id", verifyToken, checkRole, book.deleteBook);
router.patch("/uploaded/:id", multerUpload.single("file"), book.uploadBook);
router.get("/search", book.search);
router.get("/sort", book.sortBy);
router.get("/details/:id", book.details);

module.exports = router;
