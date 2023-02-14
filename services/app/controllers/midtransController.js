const { Order, User,Product } = require('../models')
const midtransClient = require('midtrans-client');
// const sendEmailOrderDp = require('../helpers/nodemailer_order_dp');
// const sendEmailOrderFull = require('../helpers/nodemailer_order_full');

class MidtransController {
    static async midtransToken(req, res, next) {
        try {
            let userId = req.user.id
            let { status } = req.params
            let { reservationDate, paymentStatus, downPayment, quantity, notes, productId, fullPayment, orderId } = req.body
            let chosenProduct = await Product.findByPk(productId)
            let dataUser = await User.findByPk(userId)
            // fullPayment 
            if (!chosenProduct) {
                throw { name: 'Data not found' }
            }
            let dataOrder = {}
            if (!orderId) {
                dataOrder = await Order.create({
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
            } else if(orderId) {                
                await Order.update({
                    paymentStatus: paymentStatus,
                },
                    {
                        where: {
                            id: orderId
                        }
                    }
                )
                dataOrder = await Order.findByPk(orderId)
            }

            // const [order, created] = await Order.findOrCreate({
            //     where: { id: orderId },
            //     defaults: {
            //         UserId: userId,
            //         VendorId: chosenProduct.VendorId,
            //         ProductId: productId,
            //         reservationDate,
            //         paymentStatus,
            //         fullPayment: fullPayment,
            //         downPayment,
            //         quantity,
            //         notes,
            //         rescheduleDate: null,
            //         rescheduleStatus: null
            //     }
            // })
            // console.log(order, created);
            // const dataOrder = await Order.findOne({ where: { id: orderId }, include: [User] })
            // if (!dataOrder) throw { name: 'Data not found' }

            // // console.log(dataOrder, '<==== dataOrder');
            // // res.json(dataOrder)
            let amount = 0
            if (status === 'full') {
                amount = dataOrder.fullPayment
                // sendEmailOrderDp(dataUser.email, chosenProduct.name, paymentStatus, dataOrder.fullPayment)
            } else if (status === 'dp') {
                amount = dataOrder.downPayment
                // sendEmailOrderFull(dataUser.email, chosenProduct.name, paymentStatus, dataOrder.downPayment)
            } else {
                amount = dataOrder.fullPayment - dataOrder.downPayment
            }


            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            let dataorderdetail
            if (status === 'full' || status === 'dp') {
                dataorderdetail = dataOrder.id
            } else {
                dataorderdetail = dataOrder.id + ' - ' + status
            } 
            let parameter = {
                transaction_details: {
                    order_id: dataorderdetail,
                    // order_id:"Transaction_" + Math.floor(9000000 + Math.random() * 9000000),
                    // "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: +amount
                    // dataOrder.fullPayments
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    name: User.name,
                    email: User.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, '<---- midtransToken');
            res.status(201).json(midtransToken);


        } catch (error) {
            // console.log(error, '<---- error midtrans');
            next(error)
        }
    }
}

module.exports = MidtransController