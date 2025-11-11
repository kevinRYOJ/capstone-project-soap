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
    
    },
    {
        tableName: "cabuy",
        timestamps: false, // sesuai diagram (nggak ada created_at / updated_at)
    }
);



module.exports = Cabuy;
