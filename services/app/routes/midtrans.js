const MidtransController = require('../controllers/midtransController')
const router = require('express').Router()


// Your route here
router.post('/:orderId', MidtransController.midtransToken)
// router.get('/:id', InvitationController.getInvitationById)


module.exports = router