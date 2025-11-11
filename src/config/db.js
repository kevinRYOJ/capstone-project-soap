const { Sequelize } = require("sequelize");

const db = new Sequelize("cp_soap", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = db;
