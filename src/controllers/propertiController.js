const Properti = require("../models/Properti");

// GET all Props
exports.getProperti = async (req, res) => {
    try {
        const properti = await Properti.findAll();
        res.json(properti);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST create properti
exports.createProperti = async (req, res) => {
    try {
        const { nama_propert, deskripsi } = req.body;
        const newProperti = await Properti.create({ nama_propert, deskripsi });
        res.status(201).json(newProperti);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
