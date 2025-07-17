const express = require("express");
const router = express.Router();

const { getHomepage } = require("../controllers/mainController");
const postRoutes = require("./post/post.routes.js");

router.get("/", getHomepage);         // Ana sayfa
router.use("/post", postRoutes);      // Post işlemleri

module.exports = router;