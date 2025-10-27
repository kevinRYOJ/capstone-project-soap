const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");

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
                model: "member", // ⚡ gunakan nama tabel string, bukan variabel model
                key: "id_member",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL", // lebih aman supaya jika leader dihapus, anak tidak ikut terhapus
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
    },
    {
        tableName: "member",
        timestamps: false,
    }
);

// Relasi: Admin memiliki banyak Member
Admin.hasMany(Member, { foreignKey: "id_admin" });
Member.belongsTo(Admin, { foreignKey: "id_admin" });

// 🧩 Self-referencing relationship
Member.hasMany(Member, { as: "Anggota", foreignKey: "leader_id" });
Member.belongsTo(Member, { as: "Leader", foreignKey: "leader_id" });

module.exports = Member;
