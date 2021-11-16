const express = require('express')
const router = express.Router()

const student = require('../controllers/student.controller')

router.get('/', student.getAll)
router.get('/:id', student.getOne)
router.post('/', student.create)
router.delete('/:id', student.deleteOne)
router.delete('/', student.deleteAll)
router.patch('/:id', student.update)

module.exports = router