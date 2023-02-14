const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Invitations, Musics, Order, User, Greets, GuestBook, Category, Vendor } = require('../models')
const { createToken } = require('../helpers/jwt')
const { hashPassword } = require('../helpers/bcrypt')
let access_token
let musicJSON = require('../json/music.json')
let userJSON = require('../json/users.json')
let orderJSON = require('../json/order.json')
let invitationJSON = require('../json/invitation.json')
let greetJSON = require('../json/greet.json')
let categoryJSON = require('../json/categories.json')
let productJSON = require('../json/products.json')
let vendorJSON = require('../json/vendors.json')

beforeAll(async () => {
  try {
    // let userJSON = require('../json/users.json')
    userJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
    })
    access_token = createToken({ id: 1 })
    await queryInterface.bulkInsert('Users', userJSON, {})


    // let musicJSON = require('../json/music.json')
    musicJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Musics', musicJSON, {})

    //  let categoryJSON = require('../json/categories.json')
    categoryJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Categories', categoryJSON)

    // let vendorJSON = require('../json/vendors.json')
    vendorJSON.forEach(el => {
      const hashedPassword = hashPassword(el.password)
      el.password = hashedPassword
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Vendors', vendorJSON)

    // let productJSON = require('../json/products.json')
    productJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Products', productJSON)


    // let orderJSON = require('../json/order.json')
    orderJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Orders', orderJSON, {})

    // let invitationJSON = require('../json/invitation.json')
    invitationJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Invitations', invitationJSON, {})
    console.log('masukkkk');
    console.log(invitationJSON, 'inininininininini');

    // let greetJSON = require('../json/greet.json')
    greetJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Greets', greetJSON, {})

    let guestBook = {
      name: "Rubi",
      InvitationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await queryInterface.bulkInsert('GuestBooks', guestBook, {})

  } catch (error) {
    console.log(error, '<---- error beforeAll user');
  }
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })

  await Greets.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })

  await Order.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })

  await Invitations.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })

  await Musics.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })

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

  await GuestBook.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true
  })
})

// INVITATION CRU
describe('/invitations -  CRU', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 200 - Get Invitation', async () => {
      // try {
      const res = await request(app)
        .get('/invitations')
        .set("access_token", access_token)
      console.log(res.body, '<<<<<<<');
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach(el => {
        expect(el).toHaveProperty('id');
      })
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      // } catch (error) {
      //   console.log(error, '<========================');
      // }

    })

    it('should return 201 - Create Invitation', async () => {
      // try {
      const res = await request(app)
        .post('/invitations')
        .set("access_token", access_token)
        .send({
          quote: "We really wish you'd come and be the witness of our once in a lifetime experience. Kindly help us to prepare the warmest welcome in our celebration",
          quote_src: "-",
          bride: "Ruth Elysia",
          bride_img: "https://storage.wedew.id/uploads/public/638/764/8a0/thumb_1979204_240_240_0_0_crop.jpeg",
          bride_nick: "Sophia",
          bride_mother: "Mrs. Sri Redjeki Susilorini",
          bride_father: "Mr. Eko Handojo",
          groom: "Irwandi",
          groom_img: "https://storage.wedew.id/uploads/public/638/84f/99a/thumb_1980254_240_240_0_0_crop.jpeg",
          groom_nick: "Michael",
          groom_mother: "Mrs. Herawaty",
          groom_father: "Mr. Lie A Tjui",
          matrimony_name: "Holy Matrimony",
          matrimony_date: "2023-01-01 07:00:00.000 +0700",
          matrimony_time_start: 1,
          matrimony_time_end: 10,
          ceremonial_name: "Wedding Reception",
          ceremonial_date: "2023-01-01 07:00:00.000 +0700",
          ceremonial_time_start: 2,
          ceremonial_time_end: 20,
          map_location: "location",
          address_ceremonial: "Sampit",
          address_matrimony: "Hektip",
          photo: "https://storage.wedew.id/uploads/public/638/763/fa5/thumb_1979197_0_600_0_0_auto.jpeg",
          story: "story",
          story_img: "https://storage.wedew.id/uploads/public/639/03d/24c/thumb_1987950_0_600_0_0_auto.jpeg",
          wallet_bank: "Mandiri",
          wallet_no: 12345678,
          wallet_owner: "Ruth Elysia",
          MusicId: 1,
          OrderId: 1
        })

      expect(res.status).toBe(201)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 200 - GET invitation By Id', async () => {
      // try {
      // console.log(access_token, '<><>><><><>');
      const res = await request(app)
        .get('/invitations/1')
      // console.log(res, 'ini ressssss');
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('groom_nick')
      expect(res.body).toHaveProperty('bride_nick')

      //       } catch (error) {
      //         console.log(error, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
      //       }
    })

    it('should return 200 - PUT invitation', async () => {
      // try {
      const res = await request(app)
        .put('/invitations/1')
        .set("access_token", access_token)
        .send({
          quote: "We really wish you'd come and be the witness of our once in a lifetime experience. Kindly help us to prepare the warmest welcome in our celebration",
          quote_src: "-",
          bride: "Ruth Elysia",
          bride_img: "https://storage.wedew.id/uploads/public/638/764/8a0/thumb_1979204_240_240_0_0_crop.jpeg",
          bride_nick: "Sophia2",
          bride_mother: "Mrs. Sri Redjeki Susilorini",
          bride_father: "Mr. Eko Handojo",
          groom: "Irwandi",
          groom_img: "https://storage.wedew.id/uploads/public/638/84f/99a/thumb_1980254_240_240_0_0_crop.jpeg",
          groom_nick: "Michael2",
          groom_mother: "Mrs. Herawaty",
          groom_father: "Mr. Lie A Tjui",
          matrimony_name: "Holy Matrimony",
          matrimony_date: "2023-01-01 07:00:00.000 +0700",
          matrimony_time_start: 1,
          matrimony_time_end: 10,
          ceremonial_name: "Wedding Reception",
          ceremonial_date: "2023-01-01 07:00:00.000 +0700",
          ceremonial_time_start: 2,
          ceremonial_time_end: 20,
          map_location: "location",
          address_ceremonial: "Sampit",
          address_matrimony: "Hektip",
          photo: "https://storage.wedew.id/uploads/public/638/763/fa5/thumb_1979197_0_600_0_0_auto.jpeg",
          story: "story",
          story_img: "https://storage.wedew.id/uploads/public/639/03d/24c/thumb_1987950_0_600_0_0_auto.jpeg",
          wallet_bank: "Mandiri",
          wallet_no: 12345678,
          wallet_owner: "Ruth Elysia",
          MusicId: 1,
          OrderId: 1
        })
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('message')

      // } catch (error) {
      //   console.log(error);
      // }

    })

    it('should return 201 - Create Greeting', async () => {
      // try {
      const res = await request(app)
        .post('/invitations/1/greets')
        // .set("access_token", access_token)
        .send({
          guest: "Ruth Elysia",
          presence: "Hadir",
          greeting: "Kindly help us to prepare the warmest welcome in our celebration",
          date: "2023-02-01",
          // InvitationId: 1
        })

      expect(res.status).toBe(201)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 200 - Get Greeting By Invitation', async () => {
      // try {
      const res = await request(app)
        .get('/invitations/1/greets')
        .set("access_token", access_token)

      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach(el => {
        expect(el).toHaveProperty('id');
        expect(el).toHaveProperty('guest');
        expect(el).toHaveProperty('presence');
      })
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 201 - Input GuestBook By Invitation', async () => {
      // try {
      const res = await request(app)
        .post('/invitations/1/guestsBook')
        // .set("access_token", access_token)
        .send({
          name: "Russel",
          // InvitationId: 1
        })

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 200 - Get GuestBook By Invitation', async () => {
      // try {
      const res = await request(app)
        .get('/invitations/1/guestsBook')
        .set("access_token", access_token)

      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach(el => {
        expect(el).toHaveProperty('id');
        // expect(el).toHaveProperty('guest');
        // expect(el).toHaveProperty('presence');
      })
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 200 - Get All Musics', async () => {
      // try {
      const res = await request(app)
        .get('/invitations/musics')
      // .set("access_token", access_token)
      // console.log(res.body, '<<<<<<<');
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach(el => {
        expect(el).toHaveProperty('id');
      })
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      // } catch (error) {
      //   console.log(error, '<========================');
      // }

    })
  });

  describe("FAILED CASE: ", () => {
    it('should return 500 - Error Get Invitation', async () => {
      jest
        .spyOn(Invitations, "findAll")
        .mockRejectedValue(() => Promise.reject({ name: "something wrong" }));
      const response = await request(app)
        .get("/invitations")
        .set("access_token", access_token);
      expect(response.status).toBe(500);
    });

    it('should return 400 - Create Invitation - bride_nick empty', async () => {
      // try {
      const res = await request(app)
        .post('/invitations')
        .set("access_token", access_token)
        .send({
          quote: "We really wish you'd come and be the witness of our once in a lifetime experience. Kindly help us to prepare the warmest welcome in our celebration",
          quote_src: "-",
          bride: "Ruth Elysia",
          bride_img: "https://storage.wedew.id/uploads/public/638/764/8a0/thumb_1979204_240_240_0_0_crop.jpeg",
          bride_mother: "Mrs. Sri Redjeki Susilorini",
          bride_father: "Mr. Eko Handojo",
          groom: "Irwandi",
          groom_img: "https://storage.wedew.id/uploads/public/638/84f/99a/thumb_1980254_240_240_0_0_crop.jpeg",
          groom_nick: "Michael",
          groom_mother: "Mrs. Herawaty",
          groom_father: "Mr. Lie A Tjui",
          matrimony_name: "Holy Matrimony",
          matrimony_date: "2023-01-01 07:00:00.000 +0700",
          matrimony_time_start: 1,
          matrimony_time_end: 10,
          ceremonial_name: "Wedding Reception",
          ceremonial_date: "2023-01-01 07:00:00.000 +0700",
          ceremonial_time_start: 2,
          ceremonial_time_end: 20,
          map_location: "location",
          address_ceremonial: "Sampit",
          address_matrimony: "Hektip",
          photo: "https://storage.wedew.id/uploads/public/638/763/fa5/thumb_1979197_0_600_0_0_auto.jpeg",
          story: "story",
          story_img: "https://storage.wedew.id/uploads/public/639/03d/24c/thumb_1987950_0_600_0_0_auto.jpeg",
          wallet_bank: "Mandiri",
          wallet_no: 12345678,
          wallet_owner: "Ruth Elysia",
          MusicId: 1,
          OrderId: 1
        })

      expect(res.status).toBe(400)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      // } catch (error) {
      //   console.log(error, '<========================');
      // }

    })

    it('should return 404 - GET invitation By Id - Data Not Found', async () => {
      // try {
      // console.log(access_token, '<><>><><><>');
      const res = await request(app)
        .get('/invitations/999')
      // console.log(res, 'ini ressssss');
      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object)
      // expect(res.body).toHaveProperty('message')
      // expect(res.body).toHaveProperty('id')
      // expect(res.body).toHaveProperty('groom_nick')
      // expect(res.body).toHaveProperty('bride_nick')

      // } catch (error) {
      //   console.log(error, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
      // }
    })

    it('should return 404 - Edit invitation By Id - Data Not Found', async () => {
      // try {
      // console.log(access_token, '<><>><><><>');
      const res = await request(app)
        .put('/invitations/999')
        .set('access_token', access_token)
      // console.log(res, 'ini ressssss');
      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body).toHaveProperty('message')
      // expect(res.body).toHaveProperty('id')
      // expect(res.body).toHaveProperty('groom_nick')
      // expect(res.body).toHaveProperty('bride_nick')

      // } catch (error) {
      //   console.log(error, '<<<<<<<<<<<<<<<<<<<<<<<<<<');
      // }
    })

    it('should return 404 - Create Greeting - Invitation Not Found', async () => {
      // try {
      const res = await request(app)
        .post('/invitations/999/greets')
        // .set("access_token", access_token)
        .send({
          guest: "Ruth Elysia",
          presence: "Hadir",
          greeting: "Kindly help us to prepare the warmest welcome in our celebration",
          date: "2023-02-01",
          InvitationId: 1
        })

      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 404 - Get Greeting - Invitation Not Found', async () => {
      // try {
      const res = await request(app)
        .get('/invitations/999/greets')
        .set("access_token", access_token)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toBeInstanceOf(Array);
      // res.body.forEach(el => {
      //   expect(el).toHaveProperty('id');
      //   expect(el).toHaveProperty('guest');
      //   expect(el).toHaveProperty('presence');
      // })
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 404 - Input GuestBook - Invitation Not Found', async () => {
      // try {
      const res = await request(app)
        .post('/invitations/999/guestsBook')
        // .set("access_token", access_token)
        .send({
          name: "Russel",
          // InvitationId: 1
        })

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('id');
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 404 - Get GuestBook - Invitation Not Found', async () => {
      // try {
      const res = await request(app)
        .get('/invitations/999/guestsBook')
        .set("access_token", access_token)

      expect(res.status).toBe(404)
      expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toBeInstanceOf(Array);
      // res.body.forEach(el => {
      //   expect(el).toHaveProperty('id');
      //   // expect(el).toHaveProperty('guest');
      //   // expect(el).toHaveProperty('presence');
      // })
      // expect(res.body).toHaveProperty('name');
      // expect(res.body).toHaveProperty('email');
      // expect(res.body).toHaveProperty('data');
      // expect(res.body.data).not.toHaveProperty('password');
      // expect(res.body.data).toHaveProperty('role');
      //       } catch (error) {
      //         console.log(error, '<========================');
      //       }

    })

    it('should return 500 - Error Get All Musics', async () => {
      jest
        .spyOn(Musics, "findAll")
        .mockRejectedValue(() => Promise.reject({ name: "something wrong" }));
      const response = await request(app)
        .get("/invitations/musics")
      // .set("access_token", access_token);
      expect(response.status).toBe(500);
    });

  });
})