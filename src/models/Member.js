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
                model: "member",
                key: "id_member",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        id_admin: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

// HOOK: Hanya Senior Leader yang boleh terhubung ke Admin
Member.addHook("beforeSave", (member) => {
    if (member.jabatan !== "Senior leader" && member.id_admin !== null) {
        throw new Error("Hanya Senior Leader yang boleh terhubung ke Admin!");
    }
});

module.exports = Member;
