const TestimonyController = require("../controllers/testimonyController")
// const {authentication} = require('../middlewares/authentication') INI DI HAPUS AJA YAT, GANTI AUTHEN BARU (TAPI DI CEK DULU)

const router = require('express').Router()

router.post('/', TestimonyController.createTestimony)
router.get('/:productId', TestimonyController.showTestimonies)
router.delete('/:testimonyId', TestimonyController.deleteTestimony)
router.patch('/:testimonyId', TestimonyController.updateTestimony)

module.exports = router
