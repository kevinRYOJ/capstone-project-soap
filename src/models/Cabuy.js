const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Member = require("./Member");

const Cabuy = sequelize.define(
    "Cabuy",
    {
        id_cabuy: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_cabuy: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        kontak: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Baru", "Follow Up", "Closing", "Lost"),
            defaultValue: "Baru",
            allowNull: false,
        },
        tanggal_follow_up: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tanggal_masuk: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_member: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Member,
                key: "id_member",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "cabuy",
        timestamps: false, // sesuai diagram (nggak ada created_at / updated_at)
    }
);

Member.hasMany(Cabuy, { foreignKey: "id_member" });
Cabuy.belongsTo(Member, { foreignKey: "id_member" });


module.exports = Cabuy;
