const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");

router.get("/", doctorsController.index);

router.post("/doctors", doctorsController.storeDoctors);

module.exports = router;
