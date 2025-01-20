const express = require ('express')
const router = express.Router()
const doctorsController = require('../controllers/doctorsController')

router.get('/', doctorsController.index)

module.exports = router