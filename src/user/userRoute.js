const express = require("express");
const router = express.Router();
const { getUserList } = require("./userController");

router.get("/", getUserList);

module.exports = router; // 🚨 Bu satır çok önemli