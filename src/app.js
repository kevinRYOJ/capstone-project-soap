const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const app = express();

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Test koneksi ke database ======
sequelize
    .authenticate()
    .then(() => console.log("✅ Koneksi database Sequelize berhasil"))
    .catch((err) => console.error("❌ Gagal koneksi database:", err.message));

// 🔄 Sinkronisasi model dengan database
// sequelize
//     .sync({ alter: true }) // ⬅️ tambahkan alter: true sementara
//     .then(() => {
//         console.log("✅ Database synchronized successfully (with alter mode)!");
//         console.log("💡 Cek tabel rumah, kolom harga seharusnya sudah muncul.");
//     })
//     .catch((err) => {
//         console.error("❌ Error syncing database:", err);
//     });

// ====== Routes ======
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const memberRoutes = require("./routes/memberRoutes");
const kinerjaMemberRoutes = require("./routes/kinerjaMemberRoutes");
const cabuyRoutes = require("./routes/cabuyRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const proyekRoutes = require("./routes/proyekRoutes");
const rekomendasiaiRoutes = require("./routes/rekomendasiaiRoutes");
const crmRoutes = require("./routes/crmRoutes");
const propertiRoutes = require("./routes/propertiRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const memberDashboardRoutes = require("./routes/memberDashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/kinerja-member", kinerjaMemberRoutes);
app.use("/api/cabuy", cabuyRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/proyek", proyekRoutes);
app.use("/api/rekomendasiai", rekomendasiaiRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/properti", propertiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/member-dashboard", memberDashboardRoutes);

// ====== Root Endpoint ======
app.get("/", (req, res) => {
    res.send("🚀 API CP SOAP berjalan dengan baik!");
});

// ====== Jalankan Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server berjalan di http://localhost:${PORT}`)
);
