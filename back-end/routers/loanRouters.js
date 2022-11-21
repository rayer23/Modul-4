const router = require("express").Router();
const { loan } = require("../controllers/index");

router.post("/", loan.addLoan)
router.get("/:NIM", loan.getLoanActive)
router.patch("/:inv", loan.cancelLoan)

module.exports = router;