const Admin = require("../models/Admin");

// GET all admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
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
