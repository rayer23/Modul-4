const router = require("express").Router();
const { book } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/user");

router.get("/", book.findAll);
router.get("/filter", book.filter);
router.get("/search", book.searchBook);
router.post("/",verifyToken, checkRole, book.addBook);
router.patch("/:id",verifyToken, checkRole, book.updateBook);
router.delete("/:id",verifyToken, checkRole, book.deleteBook);



module.exports = router;