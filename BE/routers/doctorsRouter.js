const express = require("express");
const router = express.Router();
const doctorsController = require("../controllers/doctorsController");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "uploads", "img"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.get("/", doctorsController.index);

router.get("/search", doctorsController.index);

router.get("/spec", doctorsController.uniqueSpec);

router.get("/:slug", doctorsController.show);

router.post("/:slug/review", doctorsController.storeReview);

router.post("/register", upload.single('file'), doctorsController.storeDoctor);

router.post("/:slug/contact", doctorsController.contact);

module.exports = router;
