const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')

router.get('/', user.getAll)
router.get('/:id', user.getOne)
router.post('/', user.create)
router.delete('/:id', user.deleteOne)
router.delete('/', user.deleteAll)
router.patch('/:id', user.update)

module.exports = router