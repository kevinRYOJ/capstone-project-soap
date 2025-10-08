const express = require("express");
const router = express.Router();
const { getCabuys, createCabuy } = require("../controllers/cabuyController");

router.get("/", getCabuys);
router.post("/", createCabuy);

module.exports = router;
