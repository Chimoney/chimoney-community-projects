const router = require("express").Router();
const controller = require("../controllers/transaction.controller");

router.get("/", controller.handleGetTransactions);
router.get("/:transactionId", controller.handleGetTransactionById);
router.post("/", controller.handleCreateTransaction);
router.patch("/:transactionId", controller.handleEditTransaction);

module.exports = router;
