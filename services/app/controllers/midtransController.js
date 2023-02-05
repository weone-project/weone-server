const { Order, User } = require('../models')
const midtransClient = require('midtrans-client');

class MidtransController {
    static async midtransToken(req, res, next) {
        try {
            const { orderId } = req.params
            const dataOrder = await Order.findOne({ where: { id: orderId }, include: [User] })
            if(!dataOrder) throw {name: 'Data not found'}

            // console.log(dataOrder, '<==== dataOrder');
            // res.json(dataOrder)


            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                    order_id: dataOrder.id,
                    // "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: dataOrder.fullPayment
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