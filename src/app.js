const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // koneksi Sequelize
const app = express();

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Test koneksi ke database ======
sequelize
    .authenticate()
    .then(() => console.log("✅ Koneksi database Sequelize berhasil"))
    .catch((err) => console.error("❌ Gagal koneksi database:", err.message));

// ====== Routes ======
const authRoutes = require("./routes/auth"); // untuk login admin & member
const adminRoutes = require("./routes/adminRoutes"); // untuk CRUD admin
const memberRoutes = require("./routes/memberRoutes"); // untuk CRUD admin
const kinerjaRoutes = require("./routes/kinerjaMemberRoutes");
const cabuyRoutes = require("./routes/cabuyRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const proyekRoutes = require("./routes/proyekRoutes");
const rekomendasiaiRoutes = require("./routes/rekomendasiaiRoutes");
const crmRoutes = require("./routes/crmRoutes");
const rumahRoutes = require("./routes/rumahRoutes");
const propertiRoutes = require("./routes/propertiRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/kinerja-member", kinerjaRoutes);
app.use("/api/cabuy", cabuyRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/proyek", proyekRoutes);
app.use("/api/rekomendasiai", rekomendasiaiRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/rumah", rumahRoutes);
app.use("/api/properti", propertiRoutes);


// ====== Root Endpoint ======
app.get("/", (req, res) => {
    res.send("🚀 API CP SOAP berjalan dengan baik!");
});

// ====== Jalankan Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server berjalan di http://localhost:${PORT}`));
