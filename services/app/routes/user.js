const UserController = require('../controllers/UserController.js')
const router = require('express').Router()


// Your route here
router.post('/register', UserController.registerUser)


module.exports = router