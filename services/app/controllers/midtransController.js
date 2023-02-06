const { Order, User,Product } = require('../models')
const midtransClient = require('midtrans-client');

class MidtransController {
    static async midtransToken(req, res, next) {
        try {
            let userId = req.user.id
            let { status } = req.params
            let { reservationDate, paymentStatus, downPayment, quantity, notes, productId, fullPayment, orderId } = req.body
            let chosenProduct = await Product.findByPk(productId)
            console.log(status, orderId);
            // fullPayment 
            if (!chosenProduct) {
                throw { name: 'Data not found' }
            }
            let dataOrder = {}
            if (!orderId) {
                console.log('<<<<<<<<<<<<<<<<<<');
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
            } else {
                dataOrder = await Order.findByPk(orderId)
            }
            console.log(dataOrder, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

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
            } else if (status === 'dp') {
                amount = dataOrder.downPayment
            } else {
                amount = dataOrder.fullPayment - dataOrder.downPayment
            }
            console.log(amount, "<<<<<<<<<<<");


            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                    order_id: dataOrder.id,
                    // "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: amount
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