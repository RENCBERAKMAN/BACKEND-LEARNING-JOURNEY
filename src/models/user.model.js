const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Kullanıcı şeması tanımı
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,     // Zorunlu alan: kullanıcı adı girilmeli
    unique: true,       // Aynı kullanıcı adı tekrar edemez
    trim: true,         // Baş/son boşlukları temizler
  },
  password: {
    type: String,
    required: true,     // Zorunlu alan: şifre girilmeli
  },
  email: {
    type: String,
    required: true,     // Zorunlu alan: e-posta girilmeli
    unique: true,       // Aynı e-posta tekrar edemez
    lowercase: true,    // Küçük harfe çevirir
    trim: true,         // Baş/son boşlukları temizler
  },
  isVerified: {
    type: Boolean,
    default: false,     // E-posta doğrulanmadıysa false
  },
  verifyCode: {
    type: String,
    default: null,      // Kod gönderildikten sonra burada tutulur
  },
}, { timestamps: true }); // createdAt ve updatedAt otomatik eklenir

// Şifreyi kaydetmeden önce hash’le
userSchema.pre("save", async function (next) {
  // Eğer şifre değişmediyse hashleme yapma
  if (!this.isModified("password")) return next();

  // Salt üret (şifreyi daha güvenli hale getirir)
  const salt = await bcrypt.genSalt(10);

  // Şifreyi hash’le ve modele kaydet
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifreyi karşılaştırmak için metot
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Girilen şifre ile hash’lenmiş şifreyi karşılaştır
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);