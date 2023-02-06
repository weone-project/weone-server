const MidtransController = require('../controllers/midtransController')
const authenticationUser = require('../middlewares/authenUser')
const router = require('express').Router()


// Your route here
router.post('/:status',authenticationUser, MidtransController.midtransToken)
// router.get('/:id', InvitationController.getInvitationById)


module.exports = router