const router = require("express").Router();
const transactionRouter = require("./transaction.route");

router.use("/transactions", transactionRouter);

module.exports = router;
