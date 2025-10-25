const Properti = require("../models/Properti");
const Rumah = require("../models/Rumah");

//
// 📄 GET semua properti
//
exports.getAllProperti = async (req, res) => {
    try {
        const data = await Properti.findAll({
            include: [
                { model: Rumah, attributes: ["id_rumah", "alamat", "tipe_rumah"] },
            ],
            order: [["id_properti", "DESC"]],
        });

        res.status(200).json({
            success: true,
            message: "Data properti berhasil diambil",
            data,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data properti",
        });
    }
};

//
// 📄 GET properti berdasarkan ID
//
exports.getPropertiById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Properti.findByPk(id, {
            include: [
                { model: Rumah, attributes: ["id_rumah", "alamat", "tipe_rumah"] },
            ],
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Properti tidak ditemukan",
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
            message: "Terjadi kesalahan saat mengambil data properti",
        });
    }
};

//
// ➕ TAMBAH properti baru
//
exports.createProperti = async (req, res) => {
    try {
        const { nama_properti, deskripsi } = req.body;

        const properti = await Properti.create({
            nama_properti,
            deskripsi,
        });

        res.status(201).json({
            success: true,
            message: "Properti berhasil ditambahkan",
            data: properti,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan properti",
        });
    }
};

//
// ✏️ UPDATE properti berdasarkan ID
//
exports.updateProperti = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_properti, deskripsi } = req.body;

        const properti = await Properti.findByPk(id);
        if (!properti) {
            return res.status(404).json({
                success: false,
                message: "Properti tidak ditemukan",
            });
        }

        await properti.update({
            nama_properti,
            deskripsi,
        });

        res.status(200).json({
            success: true,
            message: "Properti berhasil diperbarui",
            data: properti,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal memperbarui properti",
        });
    }
};

//
// 🗑️ HAPUS properti berdasarkan ID
//
exports.deleteProperti = async (req, res) => {
    try {
        const { id } = req.params;

        const properti = await Properti.findByPk(id);
        if (!properti) {
            return res.status(404).json({
                success: false,
                message: "Properti tidak ditemukan",
            });
        }

        await properti.destroy();

        res.status(200).json({
            success: true,
            message: "Properti berhasil dihapus",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Gagal menghapus properti",
        });
    }
};
