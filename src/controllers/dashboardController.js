const Admin = require("../models/Admin");
const Member = require("../models/Member");
const Proyek = require("../models/Proyek");
const Survey = require("../models/Survey");
const Properti = require("../models/Properti");

exports.getDashboardStats = async (req, res) => {
  try {
    // Hitung total berdasarkan id_admin (kalau perlu filter per admin)
    const adminId = req.user?.id_admin || req.query.id_admin; // opsional

    const memberCount = await Member.count({
      where: adminId ? { id_admin: adminId } : {},
    });

    const projectCount = await Proyek.count({
      where: adminId ? { id_admin: adminId } : {},
    });

    const surveyCount = await Survey.count({
      where: adminId ? { id_admin: adminId } : {},
    });

    const propertyCount = await Properti.count({
      where: adminId ? { id_admin: adminId } : {},
    });

    res.status(200).json({
      memberCount,
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
