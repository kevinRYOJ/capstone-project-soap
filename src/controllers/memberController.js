const Member = require("../models/Member");
const Admin = require("../models/Admin");

// ✅ CREATE
exports.createMember = async (req, res) => {
    try {
        const { nama_member, jabatan, kontak, leader_id, id_admin } = req.body;

        if (!nama_member || !jabatan || !kontak || !leader_id) {
            return res.status(400).json({ message: "Semua field wajib diisi!" });
        }

        const newMember = await Member.create({
            nama_member,
            jabatan,
            kontak,
            leader_id,
            id_admin,
        });

        res.status(201).json({
            message: "Member berhasil ditambahkan",
            data: newMember,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menambahkan member", error });
    }
};

// ✅ READ (Semua Member)
exports.getAllMember = async (req, res) => {
    try {
        const member = await Member.findAll({
            include: [
                {
                    model: Admin,
                    attributes: ["id_admin", "nama_admin", "email"],
                },
            ],
        });
        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengambil data member", error });
    }
};

// ✅ READ (By ID)
exports.getMemberById = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findByPk(id, {
            include: [{ model: Admin, attributes: ["id_admin", "nama_admin", "email"] }],
        });

        if (!member) return res.status(404).json({ message: "Member tidak ditemukan" });

        res.status(200).json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal mengambil data member", error });
    }
};

// ✅ UPDATE
exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_member, jabatan, kontak, leader_id, id_admin } = req.body;

        const member = await Member.findByPk(id);
        if (!member) return res.status(404).json({ message: "Member tidak ditemukan" });

        await member.update({ nama_member, jabatan, kontak, leader_id, id_admin });
        res.status(200).json({ message: "Data member berhasil diperbarui", data: member });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal memperbarui data member", error });
    }
};

// ✅ DELETE
exports.deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findByPk(id);
        if (!member) return res.status(404).json({ message: "Member tidak ditemukan" });

        await member.destroy();
        res.status(200).json({ message: "Member berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal menghapus member", error });
    }
};
