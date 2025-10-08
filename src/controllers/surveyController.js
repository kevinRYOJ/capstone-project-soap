const Survey = require("../models/survey");
const Admin = require("../models/Admin");
const Member = require("../models/Member");
const Cabuy = require("../models/Cabuy");
const Proyek = require("../models/Proyek");


//
// 🔹 GET semua data survey
//
exports.getAllSurvey = async (req, res) => {
    try {
        const data = await Survey.findAll({
            include: [
                {
                    model: Admin,
                    attributes: ["id_admin", "nama_admin"],
                },
                {
                    model: Member,
                    attributes: ["id_member", "nama_member", "level", "kontak"],
                },
                {
                    model: Cabuy,
                    attributes: ["id_cabuy", "nama_cabuy"],
                },
                {
                    model: Proyek,
                    attributes: ["id_proyek", "nama_proyek", "status_proyek"],
                },
            ],
            order: [["id_survey", "ASC"]],
        });

        res.status(200).json({
            message: "Data survey berhasil diambil",
            data,
        });
    } catch (error) {
        console.error("Error getAllSurvey:", error);
        res.status(500).json({ message: "Gagal mengambil data survey" });
    }
};

//
// 🔹 GET satu data survey berdasarkan id_survey
//
exports.getSurveyById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Survey.findByPk(id, {
            include: [

                { model: Member, attributes: ["id_member", "nama_member"] },
                { model: Cabuy, attributes: ["id_cabuy", "nama_cabuy"] },
                { model: Proyek, attributes: ["id_proyek", "nama_proyek"] },
            ],
        });

        if (!data)
            return res.status(404).json({ message: "Survey tidak ditemukan" });

        res.status(200).json(data);
    } catch (error) {
        console.error("Error getSurveyById:", error);
        res.status(500).json({ message: "Gagal mengambil data survey" });
    }
};

//
// 🔹 CREATE data survey baru
//
exports.createSurvey = async (req, res) => {
    try {
        const { id_cabuy, id_member, id_proyek, status_survey, tanggal_survey, id_admin } = req.body;

        // Validasi foreign key
        const admin = await Admin.findByPk(id_admin);
        const member = await Member.findByPk(id_member);
        const cabuy = await Cabuy.findByPk(id_cabuy);
        const proyek = await Proyek.findByPk(id_proyek);

        if (!admin || !member || !cabuy || !proyek) {
            return res.status(400).json({ message: "Data relasi tidak valid" });
        }

        const newSurvey = await Survey.create({
            id_cabuy,
            id_member,
            id_proyek,
            status_survey,
            tanggal_survey,
            id_admin,
        });

        res.status(201).json({
            message: "Data survey berhasil ditambahkan",
            data: newSurvey,
        });
    } catch (error) {
        console.error("Error createSurvey:", error);
        res.status(500).json({ message: "Gagal menambahkan data survey" });
    }
};

//
// 🔹 UPDATE data survey
//
exports.updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cabuy, id_member, id_proyek, status_survey, tanggal_survey, id_admin } = req.body;

        const survey = await Survey.findByPk(id);
        if (!survey)
            return res.status(404).json({ message: "Data survey tidak ditemukan" });

        await survey.update({
            id_cabuy,
            id_member,
            id_proyek,
            status_survey,
            tanggal_survey,
            id_admin,
        });

        res.status(200).json({
            message: "Data survey berhasil diperbarui",
            data: survey,
        });
    } catch (error) {
        console.error("Error updateSurvey:", error);
        res.status(500).json({ message: "Gagal memperbarui data survey" });
    }
};

//
// 🔹 DELETE data survey
//
exports.deleteSurvey = async (req, res) => {
    try {
        const { id } = req.params;

        const survey = await Survey.findByPk(id);
        if (!survey)
            return res.status(404).json({ message: "Data survey tidak ditemukan" });

        await survey.destroy();

        res.status(200).json({ message: "Data survey berhasil dihapus" });
    } catch (error) {
        console.error("Error deleteSurvey:", error);
        res.status(500).json({ message: "Gagal menghapus data survey" });
    }
};

