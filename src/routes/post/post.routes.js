const express = require("express");
const router = express.Router();

// Post işlemleri için controller fonksiyonları
const {
  createPost,   // Yeni post oluşturur
  getPosts,     // Tüm postları getirir
  updatePost,   // Belirli postu günceller
  deletePost,   // Belirli postu siler
} = require("../../controllers/post.controller");

// Validation kuralları ve hata kontrolü
const { postValidationRules } = require("../../middlewares/postValidator");
const { validationResult } = require("express-validator");

// Token doğrulama middleware (sadece giriş yapanlar işlem yapabilir)
const { protect } = require("../../middlewares/authMiddleware");

// Yeni post oluşturma endpointi
// POST /post → sadece giriş yapan kullanıcı, valid veriyle post oluşturabilir
router.post("/", protect, postValidationRules, (req, res, next) => {
  const errors = validationResult(req); // Gelen veriyi kontrol et
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() }); // Hatalıysa durdur
  }
  next(); // Veri doğruysa createPost fonksiyonuna geç
}, createPost);

// Tüm postları listeleme endpointi
// GET /post → Herkes erişebilir
router.get("/", getPosts);

// Post güncelleme endpointi
// PUT /post/:id → sadece giriş yapan kullanıcı güncelleyebilir
router.put("/:id", protect, updatePost);

// Post silme endpointi
// DELETE /post/:id → sadece giriş yapan kullanıcı silebilir
router.delete("/:id", protect, deletePost);

module.exports = router;