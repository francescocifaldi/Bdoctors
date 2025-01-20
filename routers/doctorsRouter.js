const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");

router.get("/", doctorsController.index);

router.get("/:id", doctorsController.show);

router.post("/:id/review", doctorsController.storeReview);

router.post("/", doctorsController.storeDoctors);

module.exports = router;
