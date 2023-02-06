const InvitationController = require('../controllers/invitationController.js')
const router = require('express').Router()
const authenticationUser = require('../middlewares/authenUser')


// Your route here
router.get('/', authenticationUser, InvitationController.getAllInvitation)
router.post('/', authenticationUser, InvitationController.createInvitation)
router.get('/:id', InvitationController.getInvitationById)
router.put('/:id', authenticationUser, InvitationController.editInvitation)


module.exports = router