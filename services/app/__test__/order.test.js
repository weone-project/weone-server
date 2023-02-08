const request = require('supertest')
const app = require('../app')
const { createToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Order, User, Category, Product, Vendor } = require('../models')
let validTokenVendor
let validTokenUser
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
        await queryInterface.bulkInsert('Users', userJSON)
        validTokenUser = createToken({
            id: 1
        })
        invalidToken =
        '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
        let vendorJSON = require('../json/vendors.json')
        vendorJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        validTokenVendor = createToken({
            id: 1
        })
        await queryInterface.bulkInsert('Vendors', vendorJSON)

        let productJSON = require('../json/products.json')
        productJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Products', productJSON)

        let orderJSON = require('../json/order.json')
        orderJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Orders', orderJSON)

    } catch (error) {
        console.log(error, '<---- error beforeAll testimony');
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

describe('orders -  CRUD', () => {
    describe('SUCCESS CASE', () => {
        it('should return 200 - GET Orders from user', async () => {
            const res = await request(app)
                .get("/orders/user")
                .set("access_token", validTokenUser)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET Orders from vendor', async () => {
            const res = await request(app)
                .get("/orders/vendor")
                .set("access_token", validTokenVendor)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET Order by orderId from User', async () => {
            const res = await request(app)
                .get("/orders/1/user")
                .set("access_token", validTokenUser)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET Order by orderId from Vendor', async () => {
            const res = await request(app)
                .get("/orders/1/vendor")
                .set("access_token", validTokenVendor)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET filtered Orders from user', async () => {
            const res = await request(app)
                .get("/orders/user/Belum lunas")
                .set("access_token", validTokenUser)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET filtered Orders from vendor', async () => {
            const res = await request(app)
                .get("/orders/vendor/Belum lunas")
                .set("access_token", validTokenVendor)
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 201 - POST order', async () => {
            const res = await request(app)
                .post('/orders/1')
                .set("access_token", validTokenUser)
                .send({
                    UserId: 1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy"
                })
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - Patch order user request reschedule', async () => {
            const res = await request(app)
                .patch('/orders/1/userSchedule')
                .set("access_token", validTokenUser)
                .send({
                    paymentStatus:'Done',
                    rescheduleDate:'2023-05-05',
                    rescheduleStatus : 'reschedule requested'
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - Patch order vendor approved reschedule', async () => {
            const res = await request(app)
                .patch('/orders/1/vendorSchedule')
                .set("access_token", validTokenVendor)
                .send({
                    rescheduleStatus : 'reschedule accepted'
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - Patch order user approved and choose date', async () => {
            const res = await request(app)
                .patch('/orders/1/userAllowed')
                .set("access_token", validTokenUser)
                .send({
                    rescheduleStatus : 'reschedule accepted',
                    rescheduleDate:'2023-05-05'
                })
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        // it('should return 200 - DELETE order', async () => {
        //     const res = await request(app)
        //         .delete('/orders/1')
        //     // .set("access_token", access_token)
        //     expect(res.status).toBe(200)
        //     expect(res.body).toHaveProperty('message')
        // })
    })

    describe('FAILED CASE: ', () => {
        it('should return 401 - Data found with invalid token from user', async () => {
            const res = await request(app)
                .get('/orders/user')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Data found with invalid token from vendor', async () => {
            const res = await request(app)
                .get('/orders/vendor')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Data filtered found with invalid token from user', async () => {
            const res = await request(app)
                .get('/orders/user/belum lunas')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Data filtered found with invalid token from vendor', async () => {
            const res = await request(app)
                .get('/orders/vendor/belum lunas')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - Data not found (wrong id)', async () => {
            const res = await request(app)
                .get('/orders/999/user')
            .set("access_token", validTokenUser)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Data found with invalid token from user', async () => {
            const res = await request(app)
                .get('/orders/1/user')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - Data not found (wrong id) from vendor', async () => {
            const res = await request(app)
                .get('/orders/999/vendor')
            .set("access_token", validTokenVendor)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Data found with invalid token from vendor', async () => {
            const res = await request(app)
                .get('/orders/1/vendor')
            .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - reservation Date is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .set("access_token", validTokenUser)
                .send({
                    reservationDate: ''
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - productId is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .set("access_token", validTokenUser)
                .send({
                    productId: ''
                })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - userId is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .set("access_token", validTokenUser)
                .send({
                    userId: ''
                })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - vendorId is wrong', async () => {
            const res = await request(app)
                .post('/orders/999')
                .set("access_token", validTokenUser)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - POST order', async () => {
            const res = await request(app)
                .post('/orders/1')
                .set("access_token", invalidToken)
                .send({
                    UserId: 1,
                    reservationDate: "2023-02-03",
                    paymentStatus: "Belum lunas",
                    downPayment: 12987,
                    quantity: 6,
                    notes: "bayar woy"
                })
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 401 - Patch order user request reschedule with invalid token user', async () => {
            const res = await request(app)
                .patch('/orders/1/userSchedule')
                .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - Patch order user request with order data not found (wrong Id)', async () => {
            const res = await request(app)
                .patch('/orders/999/userSchedule')
                .set("access_token", validTokenUser)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })
        
        it('should return 401 - Patch order vendor approved reschedule with invalid token vendor', async () => {
            const res = await request(app)
                .patch('/orders/1/vendorSchedule')
                .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - Patch order vendor approved reschedule with order data not found (wrong Id)', async () => {
            const res = await request(app)
                .patch('/orders/999/vendorSchedule')
                .set("access_token", validTokenVendor)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })
        
        it('should return 401 - Patch order user approved and choose date token invalid user', async () => {
            const res = await request(app)
                .patch('/orders/1/userAllowed')
                .set("access_token", invalidToken)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - Patch order user approved with order data not found (wrong Id)', async () => {
            const res = await request(app)
                .patch('/orders/999/userAllowed')
                .set("access_token", validTokenUser)
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })
    })
}) 