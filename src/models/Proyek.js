// file: models/Proyek.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");
const Member = require("./Member");
const Cabuy = require("./Cabuy");

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
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Admin,
        key: "id_admin",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    id_cabuy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cabuy,
        key: "id_cabuy",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "survey", // jika tabel di DB memang bernama 'survey'
    timestamps: false, // nonaktifkan created_at & updated_at
  }
);

//
// 🔗 Relasi antar model
//
Admin.hasMany(Proyek, { foreignKey: "id_admin" });
Proyek.belongsTo(Admin, { foreignKey: "id_admin" });

Member.hasMany(Proyek, { foreignKey: "id_member" });
Proyek.belongsTo(Member, { foreignKey: "id_member" });

Cabuy.hasMany(Proyek, { foreignKey: "id_cabuy" });
Proyek.belongsTo(Cabuy, { foreignKey: "id_cabuy" });

//
// 🚀 Export model
//
module.exports = Proyek;
