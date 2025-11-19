const Member = require("./Member");
const Properti = require("./Properti");
const Rumah = require("./Rumah");
const Admin = require("./Admin");

/* ======== RELASI ADMIN → MEMBER ========= */
Admin.hasMany(Member, {
    foreignKey: "id_admin",
    as: "seniorLeaders",
    scope: { jabatan: "Senior leader" },
});
Member.belongsTo(Admin, {
    foreignKey: "id_admin",
    as: "admin",
});

/* ======== RELASI MEMBER SELF-REFERENCE ========= */
Member.belongsTo(Member, { foreignKey: "leader_id", as: "leader" });

/* ======== RELASI MEMBER → PROPERTI ========= */
Member.hasMany(Properti, { foreignKey: "id_member" });
Properti.belongsTo(Member, { foreignKey: "id_member" });

/* ======== RELASI PROPERTI → RUMAH ========= */
Properti.hasMany(Rumah, { foreignKey: "id_properti" });
Rumah.belongsTo(Properti, { foreignKey: "id_properti" });

module.exports = { Member, Properti, Rumah, Admin };
