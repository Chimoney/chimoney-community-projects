const express = require("express");
const app = express();

app.use(express.json());

// Handle webhook here
app.post("/", (req, res) => {
  res.status(200);
});

module.exports = app;
