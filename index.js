const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("./src/config/database");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connect();
  console.log("✅ MongoDB connected successfully");
  console.log(`🚀 Server running on port ${PORT}`);
});
