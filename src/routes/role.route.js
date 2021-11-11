const express = require('express')
const router = express.Router()

const role = require('../controllers/role.controller')

router.get('/', role.getAll)
router.get('/:id', role.getOne)
router.post('/', role.create)
router.delete('/:id', role.deleteOne)
router.delete('/', role.deleteAll)
router.patch('/:id', role.update)

module.exports = router