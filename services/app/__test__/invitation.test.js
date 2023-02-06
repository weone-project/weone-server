const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Invitations, Musics, Order, User, Greets, GuestBook } = require('../models')
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1NjczNzYyfQ.3O3ksy45sn71X7eqqNIEA8rZnbRiQkq_J7u74MYKlsY'

beforeAll(async () => {
  try {
    let greetJSON = require('../json/greet.json')
    userJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Greets', greetJSON)

    let invitationJSON = require('../json/invitation.json')
    invitationJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Invitations', invitationJSON)

    let musicJSON = require('../json/music.json')
    musicJSON.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Musics', musicJSON)

  } catch (error) {
    console.log(error, '<---- error beforeAll user');
  }
});


afterAll(async () => {
  await Greets.destroy({
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
})

// INVITATION CRU
describe('/invitations -  CRU', () => {
  describe("SUCCESS CASE: ", () => {
    it('should return 201 - Create Invitation', async () => {
      try {
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
        expect(res.body).toHaveProperty('id');
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
  });
})