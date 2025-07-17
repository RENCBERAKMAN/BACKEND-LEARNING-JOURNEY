require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı kuruldu"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// ROUTES
const mainRoutes = require("./routes/mainRoutes.js");
const userRoutes = require("./routes/user/userRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js"); // ✅ yorum route'u eklendi
const topRoutes = require("./routes/topRoutes.js"); // ✅ ayın bilgeleri route'u eklendi

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/comments", commentRoutes); // ✅ yorum endpointi aktif
app.use("/", topRoutes); // ✅ ayın bilgeleri endpointi aktif

// SUNUCU
app.listen(3000, () => {
  console.log("🚀 Sunucu 3000 portunda dinlemede...");
});