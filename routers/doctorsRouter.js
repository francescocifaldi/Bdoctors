const express = require('express')
const router = express.Router()
const doctorsController = require('../controllers/doctorsController')

router.get('/', doctorsController.index)

///show
router.get('/:id', doctorsController.show)

module.exports = router