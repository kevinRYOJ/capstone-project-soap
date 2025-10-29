const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Proyek = require("./Proyek");

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
    harga: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    status_rumah: {
        type: DataTypes.ENUM("tersedia", "terjual"),
        allowNull: false,
    },
    id_proyek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proyek,
            key: "id_proyek",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

}, {
    tableName: "rumah",
    timestamps: true, // sesuai diagram (nggak ada created_at / updated_at)
}
);

// Relasi: Admin memiliki banyak Rumah
Proyek.hasMany(Rumah, { foreignKey: "id_proyek" });
Rumah.belongsTo(Proyek, { foreignKey: "id_proyek" });

module.exports = Rumah;