const express = require("express");
const router = express.Router();
const { getTopUsersOfMonth } = require("../controllers/top.controller");

// Ayın bilgeleri → herkese açık
router.get("/top-users-of-month", getTopUsersOfMonth);

module.exports = router;