const router = require("express").Router();

const bodyparser = require("body-parser");
const { handleWebhook } = require("../controllers/webhook.controller");

router.post("/", bodyparser.raw({ type: "application/json" }), handleWebhook);

module.exports = router;
