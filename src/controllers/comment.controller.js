const Comment = require("../models/comment.model");

// Yorum ekleme (sadece giriş yapmış kullanıcılar)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    // İçerik boşsa reddet
    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Yorum içeriği boş olamaz." });
    }

    // Yeni yorum oluştur
    const comment = await Comment.create({
      postId,
      user: req.user._id, // protect middleware sayesinde erişiyoruz
      content,
    });

    res.status(201).json({
      success: true,
      message: "Yorum başarıyla eklendi.",
      comment,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Belirli bir post'a ait yorumları getir (herkese açık)
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .populate("user", "username email") // kullanıcı bilgilerini ekle
      .sort({ createdAt: -1 }); // en yeni yorumlar en üstte

    res.json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Yorum beğenme (sadece giriş yapmış kullanıcılar)
exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Yorum bulunamadı." });
    }

    // Aynı kullanıcı daha önce beğenmiş mi kontrol et
    const alreadyLiked = comment.likes.some(
      (like) => like.user.toString() === userId.toString()
    );

    if (alreadyLiked) {
      return res.status(400).json({ success: false, message: "Bu yorumu zaten beğendiniz." });
    }

    // Yeni beğeni ekle
    comment.likes.push({ user: userId, likedAt: new Date() });
    await comment.save();

    res.json({
      success: true,
      message: "Yorum beğenildi.",
      totalLikes: comment.likes.length,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};