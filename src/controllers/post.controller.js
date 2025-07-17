const Post = require("../models/post.model");

// Yeni post oluştur
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Tüm postları getir
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Post güncelle
exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Post bulunamadı" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Post sil
exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Post bulunamadı" });
    }
    res.json({ success: true, message: "Post silindi" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};