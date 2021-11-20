const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')

// router.all('*', ()=>{
//     // authenticate for any route benieth this route
// })
router.get('/', user.getAll)
// router.get('/uploads/:img', user.getImg)
router.get('/:id', user.getOne)
router.post('/', user.isValid, user.upload, user.create)
router.delete('/:id', user.deleteOne)
router.delete('/', user.deleteAll)
router.patch('/:id', user.update)

module.exports = router