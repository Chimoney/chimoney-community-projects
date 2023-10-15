const express = require("express");
const app = express();
const morgan = require("morgan");
const webhookRouter = require("./routes/webhooks");

// Router handlers
app.use("/webhooks", webhookRouter);
app.use(morgan("tiny"));

module.exports = app;
