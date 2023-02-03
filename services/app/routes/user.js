const UserController = require('../controllers/UserController.js')
const router = require('express').Router()


// Your route here
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)


module.exports = router