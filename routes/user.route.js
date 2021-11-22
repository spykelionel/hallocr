const express = require('express')
const router = express.Router()

const auth = require('../auth/verify')
const user = require('../controllers/user.controller')

// router.all('*', ()=>{
//     // authenticate for any route benieth this route
// })
// router.get('/', user.getAll)
// router.get('/uploads/:img', user.getImg)
// router.get('/:id', user.getOne)
// router.post('/',auth, user.upload, user.create)
// router.delete('/:id',auth, user.deleteOne)
// router.delete('/',auth, user.deleteAll)
// router.patch('/:id',auth, auth,user.update)

router.route('/').get(user.getAll).post(auth, user.create).delete(auth, user.deleteAll)
router.route('/:id').get(user.getOne).patch(auth, user.update).delete(auth, user.deleteOne)
router.post('/login', user.login)

module.exports = router