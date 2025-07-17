const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // .env dosyasını yükler
require("dotenv").config({ path: "../.env" });
const app = express();

// Middleware
app.use(express.json());

// MongoDB Bağlantısı (env üzerinden)
mongoose.connect(process.env.MONGO_URI)
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