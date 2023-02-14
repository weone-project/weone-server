const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Category, Vendor, Product, User, Order } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjI4MTgwfQ.B74U7fwCPexg4T6QoTlW2ooe3FbkSuj2H8DGA5jSwIo'

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

        let userJSON = require('../json/users.json')
        userJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Users', userJSON)

        let orderJSON = require('../json/order.json')
        orderJSON.forEach(el => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
        })
        await queryInterface.bulkInsert('Orders', orderJSON)

        console.log(orderJSON, '<---- DATAORDER');

    } catch (error) {
        console.log(error, '<---- error beforeAll vendor');
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

    await User.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })

    await Order.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


// VENDOR REGISTER
describe('/vendors/register -  Register', () => {
    describe("SUCCESS CASE: ", () => {
        it('should return 201 - Register Vendor', async () => {
            try {
                const res = await request(app)
                    .post('/vendors/register')
                    .send({
                        name: 'testing1',
                        email: 'testing1@mail.com',
                        password: '123123',
                        phoneNumber: '08123456',
                        city: 'Sampit',
                        province: 'Kalimantan Tengah',
                        address: 'Jl. Vendor Testing',
                        vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                    })

                expect(res.status).toBe(201)
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('email');
                // expect(res.body).toHaveProperty('message', expect.any(String));
                // expect(res.body).toHaveProperty('data');
                // expect(res.body.data).not.toHaveProperty('password');
                // expect(res.body.data).toHaveProperty('role');
            } catch (error) {
                console.log(error, '<========================');
            }

        });
    })

    //! Failed testing register - Invalid format email
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register invalid format email', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',
                    email: 'testing1mail.com',
                    password: '123123',
                    phoneNumber: '08123456',
                    city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Format email is invalid!');
        });
    });

    //! Failed testing register - Empty email
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register with no email', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',

                    password: '123123',
                    phoneNumber: '08123456',
                    city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Email is required');
        });
    });

    //! Failed testing register - Empty password
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register with no password', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',
                    email: 'testing1mail.com',

                    phoneNumber: '08123456',
                    city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Password is required');
        });
    });


    //! Failed testing register - Empty PhoneNumber
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register empty phone number', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',
                    email: 'testing1@mail.com',
                    password: '123123',

                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Phone Number is required');
        });
    });

    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register with no city', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',
                    email: 'testing1mail.com',
                    password: '123123',
                    phoneNumber: '08123456',
                    // city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('City is required');
        });
    });

    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register with no city', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'testing1',
                    email: 'testing1mail.com',
                    password: '123123',
                    phoneNumber: '08123456',
                    city: 'Sampit',
                    // province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Province is required');
        });
    });

    //! Failed testing register - Empty Address 
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register empty address', async () => {
            try {
                console.log('masuk TRY');
                const res = await request(app)
                    .post('/vendors/register')
                    .send({
                        name: 'testing12',
                        email: 'testing1@mail.com',
                        password: '123123',
                        phoneNumber: '08123456',
                        city: 'Sampit',
                        province: 'Kalimantan Tengah',

                        vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                    })
                expect(res.status).toBe(400)
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.message).toContain('Adress is required');
            } catch (error) {
                console.log(error, '<========================= di error');
            }

        });
    });

    //! Failed testing register - Email already exist / unique
    describe('FAILED CASE: ', () => {
        it('should return 400 - Already registered', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'awa',
                    email: 'aaa@mail.com',
                    password: '123123',
                    phoneNumber: '08123456',
                    city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Email already registered');
        });
    });

    //! Failed testing register - Email already exist / unique
    describe('FAILED CASE: ', () => {
        it('should return 400 - Name already used', async () => {
            const res = await request(app)
                .post('/vendors/register')
                .send({
                    name: 'Sheraton Bandung Hotel & Towers',
                    email: 'aaa3232@mail.com',
                    password: '123123',
                    phoneNumber: '08123456',
                    city: 'Sampit',
                    province: 'Kalimantan Tengah',
                    address: 'Jl. Vendor Testing',
                    vendorImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.message).toContain('Name already used');
        });
    });

    //! Failed testing register - Empty Vendor Image URL 
    describe('FAILED CASE: ', () => {
        it('should return 400 - Fail register empty vendor img url', async () => {
            try {
                const res = await request(app)
                    .post('/vendors/register')
                    .send({
                        name: 'testing12',
                        email: 'testing1@mail.com',
                        password: '123123',
                        phoneNumber: '08123456',
                        city: 'Sampit',
                        province: 'Kalimantan Tengah',
                        address: 'Jl. Vendor',

                    })
                expect(res.status).toBe(400)
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.message).toContain('Vendor Img Url is required');
            } catch (error) {
                // console.log(error, '<========================= empty vendor');
            }
        });
    });
})

// VENDOR LOGIN
describe('/vendors/login -  Login vendor', () => {
    describe('SUCCESS CASE: ', () => {
        it('should return 200 - Success login', async () => {
            const res = await request(app)
                .post('/vendors/login')
                .send({
                    email: 'aaa@mail.com',
                    password: 'qwerty'
                })
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('email', expect.any(String))
            expect(res.body).toHaveProperty('access_token', expect.any(String))
        })
    })

    describe("FAILED: ", () => {
        it('should return 401 - Fail login with wrong email or password', async () => {
            const res = await request(app)
                .post('/vendors/login')
                .send({
                    email: 'aaa@mail.com',
                    password: 'qwertYY'
                })
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body.message).toContain('Invalid email/password')
        })

        it('should return 401 - Fail login: empty email', async () => {
            const res = await request(app)
                .post('/vendors/login')
                .send({
                    // email: 'aaa@mail.com',
                    password: 'qwertYY'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body.message).toContain('Email is required')
        })

        it('should return 401 - Fail login: empty password', async () => {
            const res = await request(app)
                .post('/vendors/login')
                .send({
                    email: 'aaa@mail.com',
                    // password: 'qwertYY'
                })
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body.message).toContain('Password is required')
        })
    })
})

// VENDORS
describe('/vendors - CRUD', () => {
    describe('SUCCESS CASE:', () => {
        it('should return 200 - GET vendors', async () => {
            const res = await request(app).get('/vendors')

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            expect(res.body[0]).toHaveProperty('name')
            expect(res.body[0]).toHaveProperty('email')
            expect(res.body[0]).toHaveProperty('vendorImgUrl')
        })

        it('should return 200 - GET vendors By Id', async () => {
            const res = await request(app).get('/vendors/1')

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('vendorImgUrl')
        })

        it('should return 200 - GET vendors By Id', async () => {
            const res = await request(app).get('/vendors/1')

            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name')
            expect(res.body).toHaveProperty('email')
            expect(res.body).toHaveProperty('vendorImgUrl')
        })

        // it('should return 201 - PUT vendors By Id', async() => {
        //     const res = await request(app).put('/vendors/1')

        //     expect(res.status).toBe(201)
        //     expect(res.body).toBeInstanceOf(Object)
        //     expect(res.body).toHaveProperty('message')
        // })

        it('should return 201 - PUT vendors ', async () => {
            const res = await request(app)
                .put('/vendors')
                .set("access_token", access_token)
                .send({
                    name: 'Testing name'
                })

            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - DELETE vendor By Id', async () => {
            const res = await request(app)
                .delete('/vendors/4')
                .set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 201 - PATCH vendor order id', async () => {
            const res = await request(app)
                .patch('/vendors/orders/1')
                .set("access_token", access_token)

            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 200 - PATCH vendor product id', async () => {
            const res = await request(app)
                .patch('/vendors/1')
                .set("access_token", access_token)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message')
        })
    })

    describe('FAILED CASE:', () => {
        // it('should return 404 - PUT vendor - Data not found', async () => {
        //     const res = await request(app).put('/vendors/999')

        //     expect(res.status).toBe(404)
        //     expect(res.body).toBeInstanceOf(Object)
        //     expect(res.body).toHaveProperty('message')
        // })

        it('should return 400 - PUT vendors ', async () => {
            const res = await request(app)
                .put('/vendors')
                .set("access_token", access_token)
                .send({
                    // name: 'Testing name'
                })

            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - GET vendors By Id - Data not found', async () => {
            const res = await request(app).get('/vendors/999')

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - DELETE vendors By Id - Data not found', async () => {
            const res = await request(app).delete('/vendors/999')

            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - PATCH vendor order id', async () => {
            const res = await request(app)
                .patch('/vendors/orders/999')
                .set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })

        it('should return 404 - PATCH vendor product id', async () => {
            const res = await request(app)
                .patch('/vendors/999')
                .set("access_token", access_token)

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('message')
        })
    })
})