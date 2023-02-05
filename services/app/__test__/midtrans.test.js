const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category, User, Vendor, Product, Order } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyOTMxNTA2fQ.SwrY-SWcyCldGPrneHEYzXcDQ5yUwOdxEPBSJbRBEDc'

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
        it('should return 201 - POST midtrans token', async () => {
            const res = await request(app)
                .post('/midtrans/1')

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('redirect_url')
        })
    })

    describe('FAILED CASE: ', () => {
        it('should return 404 - POST midtrans - no order id', async () => {
            const res = await request(app)
                .post('/midtrans/999')

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })
    })
})
