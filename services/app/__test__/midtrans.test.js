const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category, User, Vendor, Product, Order } = require('../models')
const { createToken } = require('../helpers/jwt')
let validToken
let invalidToken

beforeAll(async () => {
    try {
        let categoryJSON = require('../json/categories.json')
        categoryJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Categories', categoryJSON)

        let userJSON = require('../json/users.json')
        userJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        validToken=createToken({
            id:1
        })
        invalidToken =
      '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
        await queryInterface.bulkInsert('Users', userJSON)

        let vendorJSON = require('../json/vendors.json')
        vendorJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Vendors', vendorJSON)

        let productJSON = require('../json/products.json')
        productJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Products', productJSON)

        // let orderJSON = require('../json/order.json')
        // orderJSON.forEach(el => {
        //     el.createdAt = new Date()
        //     el.updatedAt = new Date()
        // })
        // await queryInterface.bulkInsert('Orders', orderJSON)

    } catch (error) {
        console.log(error, '<---- error beforeAll midtranssss');
    }
});


afterAll(async () => {
    await Order.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await User.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Product.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Vendor.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Category.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


// MIDTRANS
describe('/categories -  CRUD', () => {
    describe('SUCCESS CASE: ', () => {
        it('should return 201 - POST midtrans token with new order', async () => {
            const res = await request(app)
                .post('/midtrans/dp')
                .set("access_token", validToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    fullPayment:10000000,
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('redirect_url')
        })

        it('should return 201 - POST midtrans token with order id', async () => {
            const res = await request(app)
                .post('/midtrans/remaining')
                .set("access_token", validToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    orderId:1,
                    fullPayment:10000000
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('redirect_url')
        })

        it('should return 201 - POST midtrans token with order id fullpayment', async () => {
            const res = await request(app)
                .post('/midtrans/full')
                .set("access_token", validToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-05",
                    paymentStatus: "Belum lunas",
                    downPayment: 0,
                    quantity: 6,
                    notes: "bayar woy",
                    // orderId:1,
                    fullPayment:100000
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('redirect_url')
        })

        it('should return 201 - POST midtrans token with order id', async () => {
            const res = await request(app)
                .post('/midtrans/remaining')
                .set("access_token", validToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    orderId:1,
                    fullPayment:10000000
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('redirect_url')
        })
    })

    describe('FAILED CASE: ', () => {
        it('should return 404 - POST midtrans - wrong product id', async () => {
            const res = await request(app)
                .post('/midtrans/dp')
                .set("access_token", validToken)
                .send({
                    UserId: 1,
                    productId:999,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy"
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST midtrans token with new order but invalid token', async () => {
            const res = await request(app)
                .post('/midtrans/dp')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy"
                })

            // console.log(res.body, '<---- BODY');
            expect(res.body).toBeInstanceOf(Object)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST midtrans token with order id but invalid token', async () => {
            const res = await request(app)
                .post('/midtrans/dp')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    orderId:1
                })

            // console.log(res.body, '<---- BODY');
            expect(res.body).toBeInstanceOf(Object)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST midtrans token with new order and full payment but invalid token', async () => {
            const res = await request(app)
                .post('/midtrans/full')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                })
            // console.log(res.body, '<---- BODY');
            expect(res.body).toBeInstanceOf(Object)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST midtrans token with order id but invalid token and full payment', async () => {
            const res = await request(app)
                .post('/midtrans/full')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    orderId:1
                })

            // console.log(res.body, '<---- BODY');
            expect(res.body).toBeInstanceOf(Object)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST midtrans token with order id and remaining payment but invalid token', async () => {
            const res = await request(app)
                .post('/midtrans/remaining')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    productId:1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy",
                    orderId:1
                })

            // console.log(res.body, '<---- BODY');
            expect(res.body).toBeInstanceOf(Object)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })
    })
})
