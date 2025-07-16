const express = require("express");
const router = express.Router();
const { getHomepage } = require("../controllers/mainController");

router.get("/", getHomepage);

module.exports = router;