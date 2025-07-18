const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post", // varsa post modeliyle ilişkilendirilir
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    default: "", // ✅ yorumun başlığı (soru/fikir)
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000, // ✅ uzun yorum desteği
  },
  language: {
    type: String,
    enum: ["tr", "en"],
    default: "tr", // ✅ yorumun dili (Türkçe/İngilizce)
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // ✅ yanıt sistemi için (null → ana yorum)
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      likedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ], // ✅ beğeni listesi: kim ne zaman beğendi
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);