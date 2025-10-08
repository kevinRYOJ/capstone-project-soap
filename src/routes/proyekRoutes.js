const express = require("express");
const router = express.Router();
const proyekController = require("../controllers/proyekController");

// Routes CRUD Member
router.get("/", proyekController.getAllProyeks);
router.get("/:id", proyekController.getProyekById);
router.post("/", proyekController.createProyek);
router.put("/:id", proyekController.updateProyek);
router.delete("/:id", proyekController.deleteProyek);

module.exports = router;
