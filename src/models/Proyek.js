// file: models/Proyek.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Member = require("./Member");
const Rumah = require("./Rumah");
//
// 🧩 Definisi Model Proyek
//
const Proyek = sequelize.define(
  "Proyek",
  {
    id_proyek: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_proyek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Proses", "Tersedia", "Dibatalkan", "Tidak Tersedia"),
      defaultValue: "Proses",
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
    id_rumah: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rumah,
        key: "id_rumah",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "proyek", // jika tabel di DB memang bernama 'survey'
    timestamps: false, // nonaktifkan created_at & updated_at
  }
);

//
// 🔗 Relasi antar model
//
Member.hasMany(Proyek, { foreignKey: "id_member" });
Proyek.belongsTo(Member, { foreignKey: "id_member" });

Rumah.hasMany(Proyek, { foreignKey: "id_rumah" });
Proyek.belongsTo(Rumah, { foreignKey: "id_rumah" });

module.exports = Proyek;