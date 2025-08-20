const express = require("express");
const router = express.Router();

// Mount versioned routes
router.use("/v1", require("./v1"));

module.exports = router;
