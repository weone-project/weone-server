
//     try {
//         let testimonyJSON = require('../json/testimony.json')
//         testimonyJSON.forEach(el => {
//             el.createdAt = new Date()
//             el.updatedAt = new Date()
//         })
//         console.log(testimonyJSON)
//         await queryInterface.bulkInsert('Testimonies', testimonyJSON)
//     } catch (error) {
//         console.log(error, '<---- error beforeAll testimony');
//     }
// });

// afterAll(async () => {
//     await Testimony.destroy({
//         restartIdentity: true,
//         truncate: true,
//         cascade: true
//     })
// })


// describe('testimonies -  CRUD', () => {
//     describe('Get /testimonies/:productId ', () => {
//         it('should return 200 - GET testimonies', async () => {
//             const res = await request(app).get("/testimonies/2")
//             // console.log(res.body, '<---- BODY');
//             expect(res.status).toBe(200)
//             expect(res.body).toBeInstanceOf(Array)
//             expect(res.body[0]).toHaveProperty('testimony')
//         })
//     })
// })
// let testimonyJSON = require('../json/testimony.json')
//         testimonyJSON.forEach(el => {
//             el.createdAt = new Date()
//             el.updatedAt = new Date()
//         })
//         console.log(testimonyJSON)