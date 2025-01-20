const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');

router.get('/', doctorsController.index);

router.post('/:id/review', doctorsController.storeReview);

module.exports = router;
