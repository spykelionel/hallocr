const express = require('express')
const router = express.Router()

const hostel = require('../controllers/hostel.controller')


router.get('/', hostel.getAll)
router.get('/:id', hostel.getOne)
router.post('/', hostel.create)

module.exports = router