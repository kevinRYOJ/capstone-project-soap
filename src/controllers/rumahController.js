// file: controllers/rumahController.js
const Rumah = require("../models/Rumah");
const Proyek = require("../models/Proyek");

//
// 📄 GET semua rumah
//
exports.getAllRumah = async (req, res) => {
    try {
        const data = await Rumah.findAll({
            include: [
                { model: Proyek, attributes: ["id_proyek", "nama_proyek"] },
            ],
            order: [["id_rumah", "DESC"]],
        });

        res.status(200).json({
            success: true,
            message: "Data rumah berhasil diambil",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data rumah",
        });
    }
};

//
// 📄 GET rumah berdasarkan ID
//
exports.getRumahById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Rumah.findByPk(id, {
            include: [
                { model: Proyek, attributes: ["id_proyek", "nama_proyek"] },
            ],
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Rumah tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data rumah",
        });
    }
};

//
// ➕ TAMBAH Rumah baru
//
exports.createRumah = async (req, res) => {
    try {
        const {
            alamat,
            tipe_rumah,
            luas_bangunan,
            jumlah_kamar,
            status_rumah,
            harga,
            id_proyek,
        } = req.body;

        const rumah = await Rumah.create({
            alamat,
            tipe_rumah,
            luas_bangunan,
            jumlah_kamar,
            status_rumah,
            harga,
            id_proyek,
        });

        res.status(201).json({
            success: true,
            message: "Rumah berhasil ditambahkan",
            data: rumah,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan rumah",
        });
    }
};

//
// ✏️ UPDATE rumah berdasarkan ID
//
exports.updateRumah = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            alamat,
            tipe_rumah,
            luas_bangunan,
            jumlah_kamar,
            status_rumah,
            harga,
            id_proyek,
        } = req.body;

        const rumah = await Rumah.findByPk(id);
        if (!rumah) {
            return res.status(404).json({
                success: false,
                message: "Rumah tidak ditemukan",
            });
        }

        await rumah.update({
            alamat,
            tipe_rumah,
            luas_bangunan,
            jumlah_kamar,
            status_rumah,
            harga,
            id_proyek,
        });

        res.status(200).json({
            success: true,
            message: "Rumah berhasil diperbarui",
            data: rumah,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui rumah",
        });
    }
};

//
// 🗑️ HAPUS rumah berdasarkan ID
//
exports.deleteRumah = async (req, res) => {
    try {
        const { id } = req.params;

        const rumah = await Rumah.findByPk(id);
        if (!rumah) {
            return res.status(404).json({
                success: false,
                message: "Rumah tidak ditemukan",
            });
        }

        await rumah.destroy();

        res.status(200).json({
            success: true,
            message: "Rumah berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menghapus rumah",
        });
    }
};
