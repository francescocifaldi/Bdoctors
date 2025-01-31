const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");

router.get("/", doctorsController.index);

router.get("/search", doctorsController.index);

router.get("/spec", doctorsController.uniqueSpec);

router.get("/:slug", doctorsController.show);

router.post("/:slug/review", doctorsController.storeReview);

router.post("/register", doctorsController.storeDoctor);

router.post("/:slug/contact", doctorsController.contact);

module.exports = router;
