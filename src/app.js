const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");

// Import models
const Admin = require("./models/Admin");
const Member = require("./models/Member");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const memberRoutes = require("./routes/memberRoutes");
const kinerjaRoutes = require("./routes/kinerjaMemberRoutes");
const cabuyRoutes = require("./routes/cabuyRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const proyekRoutes = require("./routes/proyekRoutes");
const rekomendasiaiRoutes = require("./routes/rekomendasiaiRoutes");

// Load env
dotenv.config();

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // harus sebelum route

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/kinerja-member", kinerjaRoutes);
app.use("/api/cabuy", cabuyRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/proyek", proyekRoutes);
app.use("/api/rekomendasiai", rekomendasiaiRoutes);

// Tes koneksi database
sequelize
    .sync({ alter: true }) // alter = update struktur tabel tanpa hapus data
    .then(() => {
        console.log("✅ Database connected & models synced");
    })
    .catch((err) => {
        console.error("❌ DB sync error:", err);
    });

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
