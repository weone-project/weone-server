const UserController = require('../controllers/UserController.js')
const router = require('express').Router()
const authenticationUser = require('../middlewares/authenUser')


// Your route here
router.get('/', authenticationUser, UserController.getAllUsers)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/google-login', UserController.googleLogin)
router.get('/:id', authenticationUser, UserController.getUserById)


module.exports = router