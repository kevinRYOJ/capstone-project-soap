const express = require("express");
const router = express.Router();
const { getProperti, createProperti } = require("../controllers/propertiController");

// Routes CRUD Member
router.get("/", getProperti);
router.post("/", createProperti);

module.exports = router;
