const router = require("express").Router();
const { book } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/admin");
const { multerUpload } = require("../helpers/multer");

router.get("/", book.findAll);
router.get("/filter2", book.filter);
router.get("/searchb", book.searchBook);
router.post("/", book.addBook);
router.patch("/:id", book.updateBook);
router.delete("/:id", book.deleteBook);
router.patch("/uploaded/:id", multerUpload.single("file"), book.uploadBook);
router.get("/search", book.search);
router.get("/sort", book.sortBy);
router.get("/details/:id", book.details);
router.get("/filter", book.getBy);

module.exports = router;
