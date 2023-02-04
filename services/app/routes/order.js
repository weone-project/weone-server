const OrderController = require('../controllers/orderController')
// const { vendo, authentication } = require('../middlewares/authentication') 
//! NOTES: AUTHENTICATION NYA DI CEK DULU YAT SEBELUM LU PASANG, KALI AJA BELOM GW UBAH (CEK DI FOLDER MIDDLEWARES)

const router = require('express').Router()


router.get('/user', OrderController.getOrdersUser)
router.get('/vendor', OrderController.getAllOrdersByVendor)
router.get('/user/:paymentStatus', OrderController.getOrdersFilter)
router.get('/vendor/:paymentStatus', OrderController.getOrdersFilterByVendor)
router.get('/:orderId/vendor', OrderController.getOrderVendor)
router.get('/:orderId/user', OrderController.getOrderUser)
// router.delete('/:orderId',OrderController.deleteOrder)
router.patch('/:orderId/userSchedule', OrderController.updateOrderVendor)
router.patch('/:orderId/vendorSchedule', OrderController.updateOrderUser)
router.patch(':orderId/userAllowed', OrderController.reschedule)

router.post('/:productId', OrderController.addOrder)

module.exports = router