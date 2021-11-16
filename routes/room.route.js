const express = require('express')
const router = express.Router()

const room = require('../controllers/room.controller')

router.get('/', room.getAll)
router.get('/:id', room.getOne)
router.post('/', room.create)
router.delete('/:id', room.deleteOne)
router.delete('/', room.deleteAll)
router.patch('/:id', room.update)

module.exports = router