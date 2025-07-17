const Comment = require("../models/comment.model");
const User = require("../models/user.model");

// Ayın bilgelerini getir
exports.getTopUsersOfMonth = async (req, res) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Tüm yorumları çek
    const comments = await Comment.find({}).populate("user", "username email");

    const userLikeMap = {};

    // Her yorumun beğenilerini kontrol et
    comments.forEach((comment) => {
      comment.likes.forEach((like) => {
        // Sadece bu ay içinde yapılmış beğenileri say
        if (like.likedAt >= monthStart && like.likedAt < monthEnd) {
          const userId = comment.user._id.toString();
          userLikeMap[userId] = (userLikeMap[userId] || 0) + 1;
        }
      });
    });

    // Kullanıcıları toplam beğeniye göre sırala
    const sortedUsers = Object.entries(userLikeMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100); // ilk 100 kullanıcı

    // Kullanıcı bilgilerini ve rozetlerini ekle
    const topUsers = await Promise.all(
      sortedUsers.map(async ([userId, totalLikes], index) => {
        const user = await User.findById(userId).select("username email");
        return {
          user,
          totalLikes,
          rank: index + 1,
          badge: index < 20 ? "gold" : "silver", // ✅ rozet belirleme
        };
      })
    );

    res.json({ success: true, topUsers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};