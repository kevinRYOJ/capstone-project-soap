const Member = require("../models/Member");
const Proyek = require("../models/Proyek");
const Survey = require("../models/Survey");
const Properti = require("../models/Properti");
const Crm = require("../models/Crm");

exports.getMemberDashboardStats = async (req, res) => {
    try {
        // Hitung total berdasarkan id_member (kalau perlu filter per member)
        const memberId = req.user?.id_member || req.query.id_member; // opsional

        const crmCount = await Crm.count({
            where: memberId ? { id_member: memberId } : {},
        });

        const projectCount = await Proyek.count({
            where: memberId ? { id_member: memberId } : {},
        });

        const surveyCount = await Survey.count({
            where: memberId ? { id_member: memberId } : {},
        });

        const propertyCount = await Properti.count({
            where: memberId ? { id_member: memberId } : {},
        });

        res.status(200).json({
            crmCount,
            projectCount,
            surveyCount,
            propertyCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data dashboard",
            error: error.message,
        });
    }
};
