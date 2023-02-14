const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjczNzYyfQ.3O3ksy45sn71X7eqqNIEA8rZnbRiQkq_J7u74MYKlsY'

beforeAll(async () => {
  try {
    let userJSON = require('../json/users.json')
    userJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', userJSON)

  } catch (error) {
    console.log(error, '<---- error beforeAll user');
  }
});


afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })
})

// USER REGISTER
describe('/users/register -  Register', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 201 - Register User', async () => {
      try {
        const res = await request(app)
          .post('/users/register')
          .send({
            name: 'testing1',
            email: 'testing1@mail.com',
            password: '123123',
            phoneNumber: '08123456',
            address: 'Jl. Vendor Testing',
            userImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
          })

        expect(res.status).toBe(201)
        expect(res.body).toBeInstanceOf(Object);
        // expect(res.body).toHaveProperty('id');
        // expect(res.body).toHaveProperty('name');
        // expect(res.body).toHaveProperty('email');
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
        .post('/users/register')
        .send({
          name: 'testing1',
          email: 'testing1mail.com',
          password: '123123',
          phoneNumber: '08123456',
          address: 'Jl. Vendor Testing',
          userImgUrl: 'https://via.placeholder.com/300.png/09f/fff'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Format email is invalid!');
    });
  });
})

// USER LOGIN
describe('/users/login -  Login', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 200 - Register User', async () => {
      try {
        const res = await request(app)
          .post('/users/login')
          .send({
            email: 'testing1@mail.com',
            password: '123123'
          })

        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object);
        // expect(res.body).toHaveProperty('id');
        // expect(res.body).toHaveProperty('name');
        // expect(res.body).toHaveProperty('email');
        // expect(res.body).toHaveProperty('message', expect.any(String));
        // expect(res.body).toHaveProperty('data');
        // expect(res.body.data).not.toHaveProperty('password');
        // expect(res.body.data).toHaveProperty('role');
      } catch (error) {
        console.log(error, '<========================');
      }

    });
  })

  //! Failed testing login - Email is required
  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Email is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          password: '123123'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Email is required');
    });
  });

  //! Failed testing login - Password is required
  describe('FAILED CASE: ', () => {
    it('should return 400 - Fail login Password is required', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'testing1@mail.com'
        })
      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toContain('Password is required');
    });
  });
})

// USERS
describe('/users - READ', () => {
  describe('SUCCESS CASE:', () => {
    it('should return 200 - GET users', async () => {
      const res = await request(app)
        .get('/users')
        .set("access_token", access_token)

      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body[0]).toHaveProperty('name')
      expect(res.body[0]).toHaveProperty('email')
    })

    it('should return 200 - GET user By Id', async () => {
      const res = await request(app)
        .get('/users/1')
        .set("access_token", access_token)

      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('email')
    })

  })

  describe('FAILED CASE:', () => {

    it('should return 404 - GET user By Id - Data not found', async () => {
      const res = await request(app)
        .get('/users/999')
        .set("access_token", access_token)

      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('message')
    })
  })
})