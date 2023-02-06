const InvitationController = require('../controllers/invitationController.js')
const router = require('express').Router()
const authenticationUser = require('../middlewares/authenUser')


// Your route here
router.get('/', authenticationUser, InvitationController.getAllInvitation)
router.post('/', authenticationUser, InvitationController.createInvitation)
router.get('/musics', InvitationController.getAllMusic)
router.get('/:id', InvitationController.getInvitationById)
router.put('/:id', authenticationUser, InvitationController.editInvitation)
router.post('/:id/greets', InvitationController.createGreeting)
router.get('/:id/greets', authenticationUser, InvitationController.getGreetingsByInvitation)
router.post('/:id/guestsBook', InvitationController.inputGuestBookByInvitation)
router.get('/:id/guestsBook', authenticationUser, InvitationController.getGuestBookByInvitation)


module.exports = router