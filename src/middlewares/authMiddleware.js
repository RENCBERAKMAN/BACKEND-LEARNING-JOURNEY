const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Bu middleware, gelen istekteki token'ı kontrol eder
// Eğer token geçerliyse req.user içine tam kullanıcı nesnesini ekler
// Geçersizse 401 hatası döner
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token yoksa reddet
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Yetkisiz erişim: Token yok" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token'ı doğrula ve kullanıcı ID'sini al
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı veritabanından bul
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    // Kullanıcıyı req.user içine ekle
    req.user = user;
    next(); // İşleme devam et
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token geçersiz veya süresi dolmuş." });
  }
};

module.exports = { protect };