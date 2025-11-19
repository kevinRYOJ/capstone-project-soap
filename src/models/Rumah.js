const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Properti = require("./Properti");

const Rumah = sequelize.define("Rumah", {
    id_rumah: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tipe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lb: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lt: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    jml_kamar: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jml_lantai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },
    id_properti: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "properti",
            key: "id_properti",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
}, {
    tableName: "rumah",
    timestamps: true, // sesuai diagram (nggak ada created_at / updated_at)
}
);

Rumah.hasMany(Properti, { foreignKey: "id_properti" });
Properti.belongsTo(Rumah, { foreignKey: "id_properti" });

module.exports = Rumah;