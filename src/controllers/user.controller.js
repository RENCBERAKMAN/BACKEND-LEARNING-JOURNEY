const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Mailtrap SMTP ayarları
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Kullanıcı kaydı (e-posta doğrulama kodu ile)
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Aynı e-posta veya kullanıcı adı var mı?
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Kullanıcı adı veya e-posta zaten kayıtlı." });
    }

    // 6 haneli doğrulama kodu üret
    const verifyCode = crypto.randomInt(100000, 999999).toString();
    const verifyCodeCreatedAt = Date.now(); // Kodun oluşturulma zamanı

    // Yeni kullanıcıyı oluştur
    const user = await User.create({
      username,
      password,
      email,
      verifyCode,
      verifyCodeCreatedAt, // süre kontrolü için ekledik
      isVerified: false,
    });

    // Mail içeriği
    const mailOptions = {
      from: '"MyApp" <no-reply@myapp.com>',
      to: email,
      subject: "E-posta Doğrulama Kodu",
      text: `Merhaba ${username},\n\nDoğrulama kodun: ${verifyCode}\n\nBu kodu sistemde doğrulamak için kullan. Kodun geçerlilik süresi 1 dakikadır.`,
    };

    // Mail gönder
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Kayıt başarılı. E-posta doğrulama kodu gönderildi.",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Kullanıcı girişi (sadece doğrulanmış kullanıcılar)
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    // E-posta doğrulandı mı?
    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "E-posta doğrulanmadı. Giriş yapamazsınız." });
    }

    // Şifreyi kontrol et
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Şifre hatalı." });
    }

    // Token üret
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// E-posta doğrulama endpointi
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    // Kod süresi kontrolü (1 dakika = 60 * 1000 ms)
    const now = Date.now();
    const codeAge = now - user.verifyCodeCreatedAt;
    if (codeAge > 60 * 1000) {
      return res.status(400).json({ success: false, message: "Doğrulama kodunun süresi doldu." });
    }

    // Kod eşleşiyor mu?
    if (user.verifyCode !== code) {
      return res.status(401).json({ success: false, message: "Doğrulama kodu hatalı." });
    }

    // Doğrulama başarılı → kullanıcıyı güncelle
    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeCreatedAt = null;
    await user.save();

    res.json({ success: true, message: "E-posta doğrulandı. Artık giriş yapabilirsiniz." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};