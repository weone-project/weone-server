const OrderController = require('../controllers/orderController')

const router = require('express').Router()

router.get('/',OrderController.getOrders)
router.get('/:orderId',OrderController.getOrder)
router.delete('/:orderId',OrderController.deleteOrder)
router.patch('/:orderId',OrderController.updateOrder)
router.post('/:productId',OrderController.addOrder)

module.exports=router