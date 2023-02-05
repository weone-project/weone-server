const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category, Vendor, Product } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjAxMzgxfQ.R-fjSfLkRNyZFXikqevmRItqcwA4NnTxX5KqwPRSuuI'


beforeAll(async () => {
    try {
        let categoryJSON = require('../json/categories.json')
        categoryJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Categories', categoryJSON)

        let vendorJSON = require('../json/vendors.json')
        vendorJSON.forEach(el => {
            const hashedPassword = hashPassword(el.password)
            el.password = hashedPassword
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

    } catch (error) {
        console.log(error, '<---- error beforeAll category, vendor, product');
    }
});


afterAll(async () => {
    await Category.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })

    await Vendor.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })

    await Product.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


// PRODUCT
describe('/products -  CRUD', () => {
    describe('SUCCESS CASE: ', () => {
        it('should return 200 - GET products', async () => {
            const res = await request(app).get('/products').set("access_token", access_token)

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('imgUrl')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('estimatedDay')
            expect(res.body[0]).toHaveProperty('rating')
            expect(res.body[0]).toHaveProperty('dpPrice')
            expect(res.body[0]).toHaveProperty('VendorId')
            expect(res.body[0]).toHaveProperty('CategoryId')
        })

        it('should return 200 - GET products only Active status', async () => {
            const res = await request(app)
                .get('/products/active')
                .set("access_token", access_token)

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('description')
            expect(res.body[0]).toHaveProperty('imgUrl')
            expect(res.body[0]).toHaveProperty('price')
            expect(res.body[0]).toHaveProperty('estimatedDay')
            expect(res.body[0]).toHaveProperty('rating')
            expect(res.body[0]).toHaveProperty('dpPrice')
            expect(res.body[0]).toHaveProperty('VendorId')
            expect(res.body[0]).toHaveProperty('CategoryId')
        })

        it('should return 200 - GET product By Id', async () => {
            const res = await request(app).get('/products/1')

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('description')
            expect(res.body).toHaveProperty('imgUrl')
            expect(res.body).toHaveProperty('price')
            expect(res.body).toHaveProperty('estimatedDay')
            expect(res.body).toHaveProperty('rating')
            expect(res.body).toHaveProperty('dpPrice')
            expect(res.body).toHaveProperty('VendorId')
            expect(res.body).toHaveProperty('CategoryId')
        })

        it('should return 201 - POST products', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'Barang Testing',
                    description: 'Desikripsi Barang testing',
                    imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
                    price: '100000',
                    estimatedDat: 2,
                    // rating: 1, // emang ga ada rating, default nya 1
                    dpPrice: 20000,
                    VendorId: 1,
                    CategoryId: 1,
                })

            // console.log(res.body, '<---- BODY');
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 201 - PUT product By Id', async () => {
            const res = await request(app)
                .put('/products/2')
                .send({
                    name: 'Barang Testing EDIT',
                    description: 'Desikripsi Barang testing EDIT',
                    imgUrl: 'https://via.placeholder.com/300.png/09f/fff',
                    price: '100000',
                    estimatedDat: 2,
                    // rating: 1, // emang ga ada rating, default nya 1
                    dpPrice: 20000,
                    VendorId: 1,
                    CategoryId: 1,
                })

            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - DELETE product By Id', async () => {
            const res = await request(app)
                .delete('/products/1')
                .set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })
    })

    describe('FAILED CASE: ', () => {
        it('should return 401 - GET Product - Invalid token', async () => {
            const res = await request(app)
                .get('/products')

            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - PUT product By Id - Data not found', async () => {
            const res = await request(app).put('/products/999').set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - GET products By Id - Data not found', async () => {
            const res = await request(app).get('/products/999').set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - DELETE products By Id - Data not found', async () => {
            const res = await request(app).delete('/products/999').set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 400 - POST product - empty product name', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    // name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    estimatedDay: 1,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Product Name is required');
        });

        it('should return 400 - POST product - empty product description', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    // description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    estimatedDay: 1,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Description is required');
        });

        it('should return 400 - POST product - empty imgUrl', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    // imgUrl: 'test',
                    price: 10000,
                    estimatedDay: 1,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Img Url is required');
        });

        it('should return 400 - POST product - empty price', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    // price: 10000,
                    estimatedDay: 1,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Price is required');
        });

        it('should return 400 - POST product - empty CategoryId', async () => {
            const res = await request(app)
                .post('/products')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    // CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Category Id is required');
        });

        it('should return 400 - PUT product - empty product name', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    // name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Product Name is required');
        });

        it('should return 400 - PUT product - empty description', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    // description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Description is required');
        });

        it('should return 400 - PUT product - empty imgUrl', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    // imgUrl: 'test',
                    price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Img Url is required');
        });

        it('should return 400 - PUT product - empty price', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    // price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Price is required');
        });

        it('should return 400 - PUT product - empty CategoryId', async () => {
            const res = await request(app)
                .put('/products/2')
                .set("access_token", access_token)
                .send({
                    name: 'test',
                    description: 'test',
                    imgUrl: 'test',
                    price: 10000,
                    //* estimatedDay: 1 // default value 1 day,
                    //* rating, // default value is 1
                    //* dpPrice, // default value i 0 if user not choose "DP option"
                    VendorId: 1,
                    // CategoryId: 1
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Category Id is required');
        });
    })
})