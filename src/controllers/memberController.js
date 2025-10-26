const Member = require("../models/Member");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// ✅ CREATE Member
exports.createMember = async (req, res) => {
    try {
        const { nama_member, email, password, jabatan, kontak, leader_id, id_admin } = req.body;

        // 🔍 Validasi field dasar
        if (!nama_member || !email || !password || !jabatan || !kontak) {
            return res.status(400).json({ message: "Semua field wajib diisi!" });
        }

        // 🔍 Validasi jabatan
        const allowedJabatan = ["Senior leader", "Leader", "Member"];
        if (!allowedJabatan.includes(jabatan)) {
            return res.status(400).json({ message: "Jabatan tidak valid!" });
        }

        // 🔍 Validasi leader_id khusus
        if (jabatan !== "Senior leader" && !leader_id) {
            return res.status(400).json({
                message: "Leader wajib diisi untuk jabatan Leader atau Member!",
            });
        }

        // 🔍 Cek apakah email sudah digunakan
        const existingMember = await Member.findOne({ where: { email } });
        if (existingMember) {
            return res.status(400).json({ message: "Email sudah digunakan!" });
        }

        // 🔐 Hash password sebelum disimpan
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 💾 Simpan ke database
        const newMember = await Member.create({
            nama_member,
            email,
            password: hashedPassword,
            jabatan,
            kontak,
            leader_id: jabatan === "Senior leader" ? null : leader_id,
            id_admin,
        });

        // ✅ Response sukses
        res.status(201).json({
            message: "Member berhasil ditambahkan",
            data: {
                id_member: newMember.id_member,
                nama_member: newMember.nama_member,
                email: newMember.email,
                jabatan: newMember.jabatan,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal menambahkan member",
            error: error.message,
        });
    }
};

// ✅ READ Semua Member
exports.getAllMember = async (req, res) => {
    try {
        const members = await Member.findAll({
            include: [
                {
                    model: Admin,
                    attributes: ["id_admin", "nama_admin", "email"],
                },
            ],
            attributes: { exclude: ["password"] },
        });
        res.status(200).json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data member",
            error: error.message,
        });
    }
};

// ✅ READ By ID
exports.getMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findByPk(id, {
            include: [{ model: Admin, attributes: ["id_admin", "nama_admin", "email"] }],
            attributes: { exclude: ["password"] },
        });

        if (!member)
            return res.status(404).json({ message: "Member tidak ditemukan" });

        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data member",
            error: error.message,
        });
    }
};

// ✅ UPDATE Member
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_member, email, password, jabatan, kontak, leader_id, id_admin } = req.body;

        const member = await Member.findByPk(id);
        if (!member)
            return res.status(404).json({ message: "Member tidak ditemukan" });

        // 🔍 Validasi jabatan
        const allowedJabatan = ["Senior leader", "Leader", "Member"];
        if (jabatan && !allowedJabatan.includes(jabatan)) {
            return res.status(400).json({ message: "Jabatan tidak valid!" });
        }

        // 🔍 Validasi leader_id khusus
        if (jabatan && jabatan !== "Senior leader" && !leader_id) {
            return res.status(400).json({
                message: "Leader wajib diisi untuk jabatan Leader atau Member!",
            });
        }

        // 🔐 Jika ada password baru → hash ulang
        let hashedPassword = member.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // 🧩 Update data
        await member.update({
            nama_member,
            email,
            password: hashedPassword,
            jabatan,
            kontak,
            leader_id: jabatan === "Senior leader" ? null : leader_id,
            id_admin,
        });

        res.status(200).json({
            message: "Data member berhasil diperbarui",
            data: {
                id_member: member.id_member,
                nama_member: member.nama_member,
                email: member.email,
                jabatan: member.jabatan,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal memperbarui data member",
            error: error.message,
        });
    }
};

// ✅ DELETE Member
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findByPk(id);
        if (!member)
            return res.status(404).json({ message: "Member tidak ditemukan" });

        // 🧩 Cek apakah member ini punya anggota di bawahnya
        const hasSubordinates = await Member.findOne({
            where: { leader_id: id },
        });

        if (hasSubordinates) {
            return res.status(400).json({
                message: "Tidak dapat menghapus member yang masih memiliki bawahan!",
            });
        }

        await member.destroy();
        res.status(200).json({ message: "Member berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal menghapus member",
            error: error.message,
        });
    }
};
