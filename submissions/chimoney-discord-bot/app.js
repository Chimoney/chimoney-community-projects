const express = require("express");
const app = express();
const webhookRouter = require("./routes/webhooks");

// Router handlers
app.use("/webhooks", webhookRouter);

module.exports = app;
