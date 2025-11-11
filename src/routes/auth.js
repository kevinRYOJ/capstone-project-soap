const express = require("express");
const db = require("../config/db"); // ✅ pastikan ini sesuai path file db kamu
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "secret123"; // pakai .env lebih aman

// --- LOGIN ADMIN ---
router.post("/login-admin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🔹 Gunakan Sequelize QueryTypes.SELECT (bukan destructuring)
        const rows = await db.query(
            "SELECT * FROM admin WHERE email = :email",
            {
                replacements: { email },
                type: db.QueryTypes.SELECT,
            }
        );

        if (rows.length === 0)
            return res.status(401).json({ message: "Email tidak ditemukan" });

        const admin = rows[0];

        const validPass = await bcrypt.compare(password, admin.password);
        if (!validPass)
            return res.status(401).json({ message: "Password salah" });

        const token = jwt.sign(
            { id: admin.id_admin, role: "admin" },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: admin.id_admin,
                nama: admin.nama_admin,
                email: admin.email,
                role: "admin",
            },
        });
    } catch (err) {
        console.error("❌ Login admin error:", err);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error: err.message });
    }
});


// --- LOGIN MEMBER ---
router.post("/login-member", async (req, res) => {
    try {
        const { email, password, jabatan } = req.body;
        // console.log("🟢 Data login:", email, jabatan);

        // ✅ Sequelize query dengan replacements
        const rows = await db.query(
            "SELECT * FROM member WHERE email = :email AND jabatan = :jabatan",
            {
                replacements: { email, jabatan },
                type: db.QueryTypes.SELECT,
            }
        );

        // console.log("🔹 Query result:", rows);

        // ✅ rows sudah array biasa, tanpa destructuring
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "Akun tidak ditemukan" });
        }

        const user = rows[0];

        // 🔐 Bandingkan password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        // 🎫 Buat token JWT
        const token = jwt.sign(
            { id: user.id_member, role: user.jabatan.toLowerCase() },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        // ✅ Respon sukses
        res.json({
            token,
            user: {
                id_member: user.id_member,
                nama_member: user.nama_member,
                kontak: user.kontak,
                id_admin: user.id_admin,
                jabatan: user.jabatan,
                leader_id: user.leader_id,
                email: user.email,
                role: user.jabatan.toLowerCase(),
            },
        });

    } catch (err) {
        console.error("❌ Error login-member:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



module.exports = router;
