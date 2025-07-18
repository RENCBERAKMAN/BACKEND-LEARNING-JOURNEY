const express = require("express");
const router = express.Router();
const { addComment, getComments, likeComment } = require("../controllers/comment.controller");
const { protect } = require("../middlewares/authMiddleware");

// Yorum ekleme → sadece giriş yapmış kullanıcılar
router.post("/:postId", protect, addComment);

// Yorumları listeleme → herkese açık
// Dil filtresi desteklenir: /comments/:postId?lang=tr
router.get("/:postId", getComments);

// Yorum beğenme → sadece giriş yapmış kullanıcılar
router.post("/:id/like", protect, likeComment);

module.exports = router;