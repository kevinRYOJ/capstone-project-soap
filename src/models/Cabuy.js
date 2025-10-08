const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "cabuy",
        timestamps: false, // sesuai diagram (nggak ada created_at / updated_at)
    }
);
module.exports = Cabuy;
