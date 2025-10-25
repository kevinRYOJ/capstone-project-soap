const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Member = require("../models/Member");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cek di tabel admin dulu
        const admin = await Admin.findOne({ where: { email } });
        if (admin) {
            const valid = await bcrypt.compare(password, admin.password);
            if (!valid) return res.status(401).json({ message: "Password salah" });

            const token = jwt.sign({ id: admin.id_admin, source: "admin" }, "SECRET_KEY", { expiresIn: "1d" });
            return res.json({
                token,
                user: {
                    id: admin.id_admin,
                    nama: admin.nama_admin,
                    email: admin.email,
                    source: "admin",
                },
            });
        }

        // Kalau tidak ditemukan di admin, cek di member
        const member = await Member.findOne({ where: { email } });
        if (member) {
            const valid = await bcrypt.compare(password, member.password);
            if (!valid) return res.status(401).json({ message: "Password salah" });

            const token = jwt.sign({ id: member.id_member, source: "member" }, "SECRET_KEY", { expiresIn: "1d" });
            return res.json({
                token,
                user: {
                    id: member.id_member,
                    nama: member.nama_member,
                    email: member.email,
                    source: "member",
                },
            });
        }

        // Jika tidak ditemukan di keduanya
        return res.status(404).json({ message: "User tidak ditemukan di admin maupun member" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
});

module.exports = router;
