const Admin = require("../models/Admin");

// GET all admins
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll();
        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST create admin
exports.createAdmin = async (req, res) => {
    try {
        const { nama_admin, email, password } = req.body;
        const newAdmin = await Admin.create({ nama_admin, email, password });
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
