const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");
const Proyek = require("./Proyek");

const Member = sequelize.define(
    "Member",
    {
        id_member: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_member: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        jabatan: {
            type: DataTypes.ENUM("Member", "Leader", "Senior leader"),
            defaultValue: "Member",
            allowNull: false,
        },
        kontak: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        leader_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "member",
                key: "id_member",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Admin,
                key: "id_admin",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        // ⚠️ id_proyek dihapus karena FK harus ada di tabel proyek
    },
    {
        tableName: "member",
        timestamps: false,
    }
);

/* RELASI */

// Member → Admin (banyak member di bawah 1 admin)
Admin.hasMany(Member, { foreignKey: "id_admin" });
Member.belongsTo(Admin, { foreignKey: "id_admin" });

// Member → Leader (self reference)
Member.belongsTo(Member, { foreignKey: "leader_id", as: "leader" });

// ✅ Member → Proyek (One-to-Many)
Member.hasMany(Proyek, { foreignKey: "id_member" });
Proyek.belongsTo(Member, { foreignKey: "id_member" });

module.exports = Member;
