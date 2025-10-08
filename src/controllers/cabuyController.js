// controllers/CabuyController.js
const Cabuy = require("../models/Cabuy");

// ✅ GET semua Cabuy
exports.getCabuys = async (req, res) => {
    try {
        const cabuys = await Cabuy.findAll();
        res.status(200).json(cabuys);
    } catch (err) {
        console.error("Error getCabuys:", err);
        res.status(500).json({ error: "Gagal mengambil data Cabuy", detail: err.message });
    }
};

// ✅ POST buat Cabuy baru
exports.createCabuy = async (req, res) => {
    try {
        const { nama_cabuy, kontak, email, status } = req.body;

        // 🛡️ Validasi input
        if (!nama_cabuy || !kontak || !email || !status) {
            return res.status(400).json({ error: "Semua field wajib diisi" });
        }

        const newCabuy = await Cabuy.create({
            nama_cabuy,
            kontak,
            email,
            status,
        });

        res.status(201).json({
            message: "Cabuy berhasil dibuat",
            data: newCabuy,
        });
    } catch (err) {
        console.error("Error createCabuy:", err);
        res.status(500).json({ error: "Gagal membuat Cabuy", detail: err.message });
    }
};
