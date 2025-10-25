const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// ====== GET Semua Admin ======
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            attributes: ["id_admin", "nama_admin", "email"],
        });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====== GET 1 Admin by ID ======
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id, {
            attributes: ["id_admin", "nama_admin", "email"],
        });
        if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====== CREATE Admin Baru ======
exports.createAdmin = async (req, res) => {
    try {
        const { nama_admin, email, password } = req.body;

        // Validasi input
        if (!nama_admin || !email || !password) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }

        // Cek email duplikat
        const existing = await Admin.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            nama_admin,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Admin berhasil dibuat",
            admin: {
                id_admin: newAdmin.id_admin,
                nama_admin: newAdmin.nama_admin,
                email: newAdmin.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====== UPDATE Admin ======
exports.updateAdmin = async (req, res) => {
    try {
        const { nama_admin, email, password } = req.body;
        const admin = await Admin.findByPk(req.params.id);

        if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

        // Update data
        admin.nama_admin = nama_admin || admin.nama_admin;
        admin.email = email || admin.email;

        // Jika password dikirim, hash ulang
        if (password) {
            admin.password = await bcrypt.hash(password, 10);
        }

        await admin.save();

        res.json({
            message: "Data admin berhasil diperbarui",
            admin: {
                id_admin: admin.id_admin,
                nama_admin: admin.nama_admin,
                email: admin.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====== DELETE Admin ======
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

        await admin.destroy();
        res.json({ message: "Admin berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
