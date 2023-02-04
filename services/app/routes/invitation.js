const InvitationController = require('../controllers/invitationController.js')
const router = require('express').Router()


// Your route here
router.get('/', InvitationController.getAllInvitation)
router.get('/:id', InvitationController.getInvitationById)


module.exports = router