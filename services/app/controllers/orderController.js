const { Order, Vendor, User, Product } = require('../models/index')
class OrderController {
    static async getOrdersFilter(req, res, next) {
        try {
            let userId = req.user.id
            let { paymentStatus } = req.params
            let orders = await Order.findAll({
                where: {
                    UserId: userId,
                    paymentStatus: paymentStatus
                },
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
            }
            )
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }
    static async getOrdersUser(req, res, next) {
        try {
            let userId = req.user.id
            let orders = await Order.findAll(
                {
                    where: {
                        UserId: userId
                    },
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
    static async getAllOrdersByVendor(req, res, next) {
        try {
            let vendorId = req.vendor.id
            let orders = await Order.findAll(
                {
                    where: {
                        VendorId: vendorId
                    },
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
                }
            )
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }
    static async getOrdersFilterByVendor(req, res, next) {
        try {
            let vendorId = req.vendor.id
            let { paymentStatus } = req.params
            let orders = await Order.findAll(
                {
                    where: {
                        VendorId: vendorId,
                        paymentStatus
                    },
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
    static async getOrderVendor(req, res, next) {
        try {
            let { orderId } = req.params
            let vendorId = req.vendor.id
            let order = await Order.findOne({
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
                ],
                where: {
                    id: orderId,
                    VendorId: vendorId
                }
            })
            if (!order) {
                throw { name: 'Data not found' }
            }
            res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }
    static async getOrderUser(req, res, next) {
        try {
            let { orderId } = req.params
            let userId = req.user.id
            let order = await Order.findOne({
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
                ],
                where: {
                    id: orderId,
                    UserId: userId
                }
            })
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
            let userId = req.user.id
            let { productId } = req.params
            let chosenProduct = await Product.findByPk(productId)
            if (!chosenProduct) {
                throw { name: 'Data not found' }
            }
            let { reservationDate, paymentStatus, downPayment, quantity, notes } = req.body
            let fullPayment = chosenProduct.price * quantity
            let newOrder = await Order.create({
                UserId: userId,
                VendorId: chosenProduct.VendorId,
                ProductId: productId,
                reservationDate,
                paymentStatus,
                fullPayment: fullPayment,
                downPayment,
                quantity,
                notes,
                rescheduleDate: null,
                rescheduleStatus: null
            })

            res.status(201).json({ message: `Order with reservationDate ${newOrder.reservationDate} has been made` })
        } catch (error) {
            next(error)
        }
    }
    // static async deleteOrder(req, res, next) {
    //     try {
    //         let { orderId } = req.params
    //         let order = await Order.findByPk(orderId)
    //         if (!order) {
    //             throw { name: 'Data not found' }
    //         }
    //         await Order.destroy({
    //             where: {
    //                 id: orderId
    //             }
    //         })
    //         res.status(200).json({ message: 'Order has been deleted' })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    static async updateOrderUser(req, res, next) {
        try {
            let { orderId } = req.params
            let userId = req.user.id
            let { paymentStatus, rescheduleStatus } = req.body
            let findOrder = await Order.findByPk(orderId)
            if (!findOrder) {
                throw { name: 'Data not found' }
            }

            let order = await Order.update({
                paymentStatus: paymentStatus,
                rescheduleStatus: rescheduleStatus
            }, {
                where: {
                    id: orderId,
                    UserId: userId
                }
            })
            res.status(200).json({ message: `Order status has been updated to ${paymentStatus}` })
        } catch (error) {
            next(error)
        }
    }
    static async updateOrderVendor(req, res, next) {
        try {
            let { orderId } = req.params
            let vendorId = req.vendor.id
            let { paymentStatus, rescheduleStatus } = req.body
            let findOrder = await Order.findByPk(orderId)
            if (!findOrder) {
                throw { name: 'Data not found' }
            }
            let order = await Order.update({
                paymentStatus: paymentStatus,
                rescheduleStatus: rescheduleStatus
            }, {
                where: {
                    id: orderId,
                    VendorId: vendorId
                }
            })
            res.status(200).json({ message: `Reschedule Status is ${paymentStatus}` })
        } catch (error) {
            next(error)
        }
    }

    static async reschedule(req, res, next) {
        try {
            let { orderId } = req.params
            let userId = req.user.id
            let { paymentStatus, rescheduleDate, rescheduleStatus } = req.body
            let findOrder = await Order.findByPk(orderId)
            if (!findOrder) {
                throw { name: 'Data not found' }
            }
            let order = await Order.update({
                paymentStatus: paymentStatus,
                rescheduleDate: rescheduleDate,
                rescheduleStatus: rescheduleStatus
            }, {
                where: {
                    id: orderId,
                    UserId: userId
                }
            })
            res.status(200).json({ message: `Reschedule Status is ${paymentStatus}` })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = OrderController