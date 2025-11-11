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
            allowNull: true,
        },
        tanggal_follow_up: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tanggal_masuk: {
            type: DataTypes.DATE,
            allowNull: true,
        },
<<<<<<< HEAD
    
=======
        id_member: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Member,
                key: "id_member",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
>>>>>>> b8ddb53b0e6b10d42bb043164b7f546a2be7fa9e
    },
    {
        tableName: "cabuy",
        timestamps: false, // sesuai diagram (nggak ada created_at / updated_at)
    }
);



module.exports = Cabuy;
