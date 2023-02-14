const OrderController = require('../controllers/orderController')
const authenticationUser=require('../middlewares/authenUser')
const authenticationVendor=require('../middlewares/authenVendor')
const router = require('express').Router()


router.get('/user',authenticationUser,OrderController.getOrdersUser)
router.get('/vendor',authenticationVendor,OrderController.getAllOrdersByVendor)
router.get('/user/:paymentStatus',authenticationUser,OrderController.getOrdersFilter)
router.get('/vendor/:paymentStatus',authenticationVendor,OrderController.getOrdersFilterByVendor)
router.get('/:orderId/vendor',authenticationVendor,OrderController.getOrderVendor)
router.get('/:orderId/user',authenticationUser,OrderController.getOrderUser)
// router.delete('/:orderId',OrderController.deleteOrder)
router.patch('/:orderId/userSchedule',authenticationUser,OrderController.updateOrderUser)
router.patch('/:orderId/vendorSchedule',authenticationVendor,OrderController.updateOrderVendor)
router.patch('/:orderId/userAllowed',authenticationUser,OrderController.reschedule)

router.post('/:productId',authenticationUser,OrderController.addOrder)

module.exports = router