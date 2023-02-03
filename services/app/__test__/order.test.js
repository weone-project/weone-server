const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Order, User, Category, Product, Vendor } = require('../models')

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
        it('should return 200 - GET Orders', async () => {
            const res = await request(app).get("/orders")
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 200 - GET Order by orderId', async () => {
            const res = await request(app).get("/orders/1")
            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('notes', 'User', 'Product', 'Vendor')
        })

        it('should return 201 - POST order', async () => {
            const res = await request(app)
                .post('/orders/1')
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

        it('should return 200 - Patch order', async () => {
            const res = await request(app)
                .patch('/orders/1')
            // .set("access_token", access_token)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - DELETE order', async () => {
            const res = await request(app)
                .delete('/orders/1')
            // .set("access_token", access_token)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })
    })

    describe('FAILED CASE: ', () => {
        it('should return 404 - Data not found (wrong id)', async () => {
            const res = await request(app)
                .delete('/orders/999')
            // .set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - reservation Date is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .send({
                    reservationDate: ''
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - productId is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .send({
                    productId: ''
                })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - userId is required', async () => {
            const res = await request(app)
                .post('/orders/1')
                .send({
                    userId: ''
                })
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - vendorId is wrong', async () => {
            const res = await request(app)
                .post('/orders/999')
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })
    })
})