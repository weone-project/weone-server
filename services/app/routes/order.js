const OrderController = require('../controllers/orderController')
const { vendorAuthentication, authentication } = require('../middlewares/authentication')

const router = require('express').Router()


router.get('/user',authentication,OrderController.getOrdersUser)
router.get('/vendor',vendorAuthentication,OrderController.getAllOrdersByVendor)
router.get('/user/:paymentStatus',authentication,OrderController.getOrdersFilter)
router.get('/vendor/:paymentStatus',vendorAuthentication,OrderController.getOrdersFilterByVendor)
router.get('/:orderId/vendor',vendorAuthentication,OrderController.getOrderVendor)
router.get('/:orderId/user',authentication,OrderController.getOrderUser)
// router.delete('/:orderId',OrderController.deleteOrder)
router.patch('/:orderId/userSchedule',authentication,OrderController.updateOrderVendor)
router.patch('/:orderId/vendorSchedule',vendorAuthentication,OrderController.updateOrderUser)
router.patch(':orderId/userAllowed',authentication,OrderController.reschedule)

router.post('/:productId',authentication,OrderController.addOrder)

module.exports=router