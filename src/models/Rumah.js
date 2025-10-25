const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Properti = require("./Properti");

const Rumah = sequelize.define("Rumah", {
    id_rumah: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipe_rumah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    luas_bangunan: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    jumlah_kamar: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_rumah: {
        type: DataTypes.ENUM("tersedia", "terjual"),
        allowNull: false,
    },
    id_properti: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Properti,
            key: "id_properti",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

}, {
    tableName: "rumah",
    timestamps: true, // sesuai diagram (nggak ada created_at / updated_at)
}
);

// Relasi: Admin memiliki banyak Member
Properti.hasMany(Rumah, { foreignKey: "id_properti" });
Rumah.belongsTo(Properti, { foreignKey: "id_properti" });

module.exports = Rumah;