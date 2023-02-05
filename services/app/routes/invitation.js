const InvitationController = require('../controllers/invitationController.js')
const router = require('express').Router()
const authenticationUser = require('../middlewares/authenUser')


// Your route here
router.use(authenticationUser)
router.get('/', InvitationController.getAllInvitation)
router.post('/', InvitationController.createInvitation)
router.get('/:id', InvitationController.getInvitationById)
router.put('/:id', InvitationController.editInvitation)


module.exports = router