const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyOTMxNTA2fQ.SwrY-SWcyCldGPrneHEYzXcDQ5yUwOdxEPBSJbRBEDc'

beforeAll(async () => {
    try {
        let categoryJSON = require('../json/categories.json')
        categoryJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Categories', categoryJSON)
    } catch (error) {
        console.log(error, '<---- error beforeAll category');
    }
});


afterAll(async () => {
    await Category.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


// CATEGORY
describe('/categories -  CRUD', () => {
    describe('SUCCESS CASE: ', () => {
        it('should return 200 - GET category', async () => {
            const res = await request(app).get('/categories')

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('name')
        })

        it('should return 201 - POST category', async () => {
            const res = await request(app)
                .post('/categories')
                .send({
                    name: 'Gedung Testing'
                })

            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - DELETE category', async () => {
            const res = await request(app)
                .delete('/categories/1')
                .set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })
    })

    describe('FAILED CASE: ', () => {
        it('should return 404 - Data not found (wrong id)', async () => {
            const res = await request(app)
                .delete('/categories/999')
                .set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - Name is required', async () => {
            const res = await request(app)
                .post('/categories')
                .send({
                    name: ''
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message')
        })
    })
})
