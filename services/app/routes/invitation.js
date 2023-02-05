const InvitationController = require('../controllers/invitationController.js')
const router = require('express').Router()


// Your route here
router.get('/', InvitationController.getAllInvitation)
router.post('/', InvitationController.createInvitation)
router.get('/:id', InvitationController.getInvitationById)
router.put('/:id', InvitationController.editInvitation)


module.exports = router