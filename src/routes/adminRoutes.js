const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ====== ROUTES ADMIN ======

// Ambil semua admin
router.get("/", adminController.getAllAdmins);

// Ambil 1 admin berdasarkan ID
router.get("/:id", adminController.getAdminById);

// Tambah admin baru
router.post("/", adminController.createAdmin);

// Update data admin
router.put("/:id", adminController.updateAdmin);

// Hapus admin
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
