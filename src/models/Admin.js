const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const Admin = sequelize.define(
    "Admin",
    {
        id_admin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_admin: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "admin",
        timestamps: false,
    }
);

// 🔒 Hash password sebelum create
Admin.beforeCreate(async (admin) => {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
});

// 🔒 Hash password sebelum update (kalau diubah)
Admin.beforeUpdate(async (admin) => {
    if (admin.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
    }
});

// 🔐 Method tambahan untuk verifikasi password
Admin.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = Admin;
