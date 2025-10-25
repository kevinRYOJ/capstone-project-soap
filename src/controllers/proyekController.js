// file: controllers/proyekController.js
const Proyek = require("../models/Proyek");
const Member = require("../models/Member");
const Rumah = require("../models/Rumah");

//
// 📄 GET semua proyek
//
exports.getAllProyek = async (req, res) => {
    try {
        const data = await Proyek.findAll({
            include: [
                { model: Member, attributes: ["id_member", "nama_member"] },
            ],
            order: [["id_proyek", "DESC"]],
        });

        res.status(200).json({
            success: true,
            message: "Data proyek berhasil diambil",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data proyek",
        });
    }
};

//
// 📄 GET proyek berdasarkan ID
//
exports.getProyekById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Proyek.findByPk(id, {
            include: [
                { model: Member, attributes: ["id_member", "nama_member"] },

            ],
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Proyek tidak ditemukan",
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
            message: "Terjadi kesalahan saat mengambil data proyek",
        });
    }
};

//
// ➕ TAMBAH proyek baru
//
exports.createProyek = async (req, res) => {
    try {
        const {
            nama_proyek,
            lokasi,
            tipe,
            harga,
            status,
            id_member,
        } = req.body;

        const proyek = await Proyek.create({
            nama_proyek,
            lokasi,
            tipe,
            harga,
            status,
            id_member,
        });

        res.status(201).json({
            success: true,
            message: "Proyek berhasil ditambahkan",
            data: proyek,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan proyek",
        });
    }
};

//
// ✏️ UPDATE proyek berdasarkan ID
//
exports.updateProyek = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama_proyek,
            lokasi,
            tipe,
            harga,
            status,
            id_member,

        } = req.body;

        const proyek = await Proyek.findByPk(id);
        if (!proyek) {
            return res.status(404).json({
                success: false,
                message: "Proyek tidak ditemukan",
            });
        }

        await proyek.update({
            nama_proyek,
            lokasi,
            tipe,
            harga,
            status,
            id_member,

        });

        res.status(200).json({
            success: true,
            message: "Proyek berhasil diperbarui",
            data: proyek,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui proyek",
        });
    }
};

//
// 🗑️ HAPUS proyek berdasarkan ID
//
exports.deleteProyek = async (req, res) => {
    try {
        const { id } = req.params;

        const proyek = await Proyek.findByPk(id);
        if (!proyek) {
            return res.status(404).json({
                success: false,
                message: "Proyek tidak ditemukan",
            });
        }

        await proyek.destroy();

        res.status(200).json({
            success: true,
            message: "Proyek berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menghapus proyek",
        });
    }
};
