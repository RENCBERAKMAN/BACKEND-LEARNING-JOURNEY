const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("✅ MongoDB bağlantısı kuruldu"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// ROUTES
const mainRoute = require("./routes/mainRoute");
const userRoute = require("./user/userRoute");

app.use("/", mainRoute);
app.use("/user", userRoute);

// SUNUCU
app.listen(3000, () => {
  console.log("🚀 Sunucu 3000 portunda dinlemede...");
});