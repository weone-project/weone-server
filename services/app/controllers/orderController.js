const { Order, Vendor, User, Product } = require('../models/index')
class OrderController {
    static async getOrders(req, res, next) {
        try {
            let orders = await Order.findAll({
                include: [
                    {
                        model: Vendor
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: Product
                    }
                ]
            })
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }
    static async getOrder(req, res, next) {
        try {
            let { orderId } = req.params
            let order = await Order.findByPk(orderId)
            if (!order) {
                throw { name: 'Data not found' }
            }
            res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }
    static async addOrder(req, res, next) {
        try {
            // let userId=req.user.id
            let userId = 1
            let { productId, vendorId } = req.params
            let chosenProduct = await Product.findByPk(productId)
            let { reservationDate, paymentStatus, downPayment, quantity, notes } = req.body
            let fullPayment = chosenProduct.price * quantity
            let newOrder = await Order.create({
                UserId: userId,
                VendorId: vendorId,
                ProductId: productId,
                reservationDate,
                paymentStatus,
                fullPayment: fullPayment,
                downPayment,
                quantity,
                notes
            })
            res.status(201).json({ message: `Order with reservationDate ${newOrder.reservationDate} has been made` })
        } catch (error) {
            next(error)
        }
    }
    static async deleteOrder(req, res, next) {
        try {
            let { orderId } = req.params
            let order = await Order.findByPk(orderId)
            if (!order) {
                throw { name: 'Data not found' }
            }
            await Order.destroy({
                where: {
                    id: orderId
                }
            })
            res.status(200).json({ message: 'Order has been deleted' })
        } catch (error) {
            next(error)
        }
    }
    static async updateOrder(req, res, next) {
        try {
            let { orderId } = req.params
            let { paymentStatus, downPayment } = req.body
            let order = await Order.update({
                paymentStatus, downPayment
            }, {
                where: {
                    id: orderId
                }
            })
            res.status(200).json({ message: `Order status has been updated to ${paymentStatus}` })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = OrderController