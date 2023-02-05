const UserController = require('../controllers/UserController.js')
const router = require('express').Router()


// Your route here
router.get('/', UserController.getAllUsers)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/:id', UserController.getUserById)


module.exports = router