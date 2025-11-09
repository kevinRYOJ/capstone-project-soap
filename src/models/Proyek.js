const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
      allowNull: true,
      references: {
        model: "member",
        key: "id_member",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "proyek",
    timestamps: false,
  }
);

module.exports = Proyek;
