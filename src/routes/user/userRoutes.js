const express = require("express");
const router = express.Router();

// Controller fonksiyonlarını çağırıyoruz
const {
  registerUser,   // Yeni kullanıcı oluşturur ve doğrulama kodu gönderir
  loginUser,      // Giriş yapar (sadece doğrulanmış kullanıcı)
  verifyEmail     // E-posta doğrulama kodunu kontrol eder
} = require("../../controllers/user.controller");

// Test endpointi (sistemin çalıştığını görmek için)
// GET /user → sadece kontrol amaçlı
router.get("/", (req, res) => {
  res.json({ message: "✅ User route çalışıyor" });
});

// Kullanıcı kaydı endpointi
// POST /user/register → username, password, email alır
// Kullanıcı oluşturur ve doğrulama kodu gönderir
router.post("/register", registerUser);

// Kullanıcı girişi endpointi
// POST /user/login → username ve password alır
// Sadece doğrulanmış kullanıcı giriş yapabilir
router.post("/login", loginUser);

// E-posta doğrulama endpointi
// POST /user/verify → email ve kod alır
// Kod doğruysa isVerified: true yapılır
router.post("/verify", verifyEmail);

module.exports = router;