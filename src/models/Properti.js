const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Properti = sequelize.define("Properti", {
    id_properti: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nama_properti: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },


}, {
    tableName: "properti",
    timestamps: true, // sesuai diagram (nggak ada created_at / updated_at)
}
);

module.exports = Properti;