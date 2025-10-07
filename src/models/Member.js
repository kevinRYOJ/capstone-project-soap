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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        level: {
            type: DataTypes.ENUM("Aktif", "Nonaktif"),
            defaultValue: ("Aktif"),
        },
        kontak: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        timestamps: false, // sesuai diagram (nggak ada created_at / updated_at)
    }
);

// Relasi: Admin memiliki banyak Member
Admin.hasMany(Member, { foreignKey: "id_admin" });
Member.belongsTo(Admin, { foreignKey: "id_admin" });

module.exports = Member;
