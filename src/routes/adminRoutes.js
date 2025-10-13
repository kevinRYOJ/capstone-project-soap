const express = require("express");
const router = express.Router();
const { getAdmin, createAdmin } = require("../controllers/adminController");

router.get("/", getAdmin);
router.post("/", createAdmin);

module.exports = router;
