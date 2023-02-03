const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Testimony, User, Category, Product, Vendor } = require('../models')

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


        let testimonyJSON = require('../json/testimony.json')
        testimonyJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Testimonies', testimonyJSON)


    } catch (error) {
        console.log(error, '<---- error beforeAll testimony');
    }
});

afterAll(async () => {
    await Testimony.destroy({
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


describe('testimonies -  CRUD', () => {
    describe('Get /testimonies/:productId ', () => {
        it('should return 200 - GET testimonies', async () => {
            const res = await request(app).get("/testimonies/1")
            console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('testimony')
        })

        it('should return 201 - POST testimony', async () => {
            const res = await request(app)
                .post('/testimonies')
                .send({
                    testimony: 'Mantap',
                    productId: 1,
                    vendorId: 1,
                    UserId: 1
                })
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })
        
        it('should return 200 - Patch testimony', async () => {
            const res = await request(app)
                .patch('/testimonies/1')
                .send({
                    testimony: 'Mantap',
                })
            // .set("access_token", access_token)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - DELETE testimony', async () => {
            const res = await request(app)
                .delete('/testimonies/1')
            // .set("access_token", access_token)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })
    })
})

//testimony without authentication