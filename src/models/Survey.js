// file: models/Survey.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Member = require("./Member");
const Cabuy = require("./Cabuy");
const Proyek = require("./Proyek");

const Survey = sequelize.define(
  "Survey",
  {
    id_survey: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cabuy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cabuy,
        key: "id_cabuy",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    status_survey: {
      type: DataTypes.ENUM("Sudah", "Belum"),
      defaultValue: "Belum",
    },
    tanggal_survey: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "survey",
    timestamps: false, // tidak pakai created_at / updated_at
  }
);

//
// 🔗 Relasi antar model
//

// Member memiliki banyak Survey
Member.hasMany(Survey, { foreignKey: "id_member" });
Survey.belongsTo(Member, { foreignKey: "id_member" });

// Cabuy memiliki banyak Survey
Cabuy.hasMany(Survey, { foreignKey: "id_cabuy" });
Survey.belongsTo(Cabuy, { foreignKey: "id_cabuy" });

// Proyek memiliki banyak Survey
Proyek.hasMany(Survey, { foreignKey: "id_proyek" });
Survey.belongsTo(Proyek, { foreignKey: "id_proyek" });

module.exports = Survey;
