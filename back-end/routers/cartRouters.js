const router = require("express").Router();
const { cart } = require("../controllers/index");

router.post("/", cart.add)
router.delete("/:id", cart.delete)
router.get("/:NIM", cart.getCartBy)

module.exports = router;