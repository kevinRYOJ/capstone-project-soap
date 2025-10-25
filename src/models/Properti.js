const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Rumah = require("./Rumah");

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
    id_rumah: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Rumah,
            key: "id_rumah",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

}, {
    tableName: "properti",
    timestamps: true, // sesuai diagram (nggak ada created_at / updated_at)
}
);

Rumah.hasMany(Properti, { foreignKey: "id_rumah" });
Properti.belongsTo(Rumah, { foreignKey: "id_rumah" });

module.exports = Properti;