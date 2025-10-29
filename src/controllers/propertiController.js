const Properti = require("../models/Properti");
const Rumah = require("../models/Rumah");
const multer = require("multer");

// simpan file di memori, bukan disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//
// 📄 GET semua properti
//
exports.getAllProperti = async (req, res) => {
    try {
        const data = await Properti.findAll({
            include: [
                {
                    model: Rumah,
                    attributes: ["id_rumah", "alamat", "tipe_rumah", "luas_bangunan", "jumlah_kamar", "status_rumah", "harga"],
                },
            ],
            order: [["id_properti", "DESC"]],
        });

        // 🔧 Ubah buffer (BLOB) ke base64
        const result = data.map((item) => ({
            ...item.toJSON(),
            image: item.image
                ? `data:image/jpeg;base64,${item.image.toString("base64")}`
                : null,
        }));

        res.status(200).json({
            success: true,
            message: "Data properti berhasil diambil",
            data: result,
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
// 📄 GET properti berdasarkan ID (jika image disimpan sebagai BLOB)
exports.getPropertiById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Properti.findByPk(id, {
            include: [
                {
                    model: Rumah,
                    attributes: ["id_rumah", "alamat", "tipe_rumah", "luas_bangunan", "jumlah_kamar", "status_rumah", "harga"],
                },
            ],
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Properti tidak ditemukan",
            });
        }

        const propertiData = data.toJSON();

        // 🔄 Konversi Buffer ke Base64
        if (propertiData.image) {
            propertiData.image = `data:image/jpeg;base64,${propertiData.image.toString("base64")}`;
        }

        res.status(200).json({
            success: true,
            data: propertiData,
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
exports.createProperti = [
    upload.single("image"), // nama field form di React
    async (req, res) => {
        try {
            const { nama_properti, deskripsi, id_rumah } = req.body;

            const newProperti = await Properti.create({
                nama_properti,
                deskripsi,
                image: req.file.buffer, // <-- simpan binary data di DB
                id_rumah: id_rumah || null,
            });

            res.status(201).json({ message: "Properti berhasil dibuat", data: newProperti });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Gagal menyimpan properti", error });
        }
    },
];

//
// ✏️ UPDATE properti berdasarkan ID
//
exports.updateProperti = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_properti, deskripsi, image } = req.body;

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
            image,
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
